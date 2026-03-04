import type {
    ArdbItem,
    ArdbEnemyListItem,
    ArdbEnemy,
    ArdbQuest,
    MetaForgeArc,
    ArcRaidedData,
} from './types';
import { categorizeItem, ARDB_BASE } from './types';

const PROXY = import.meta.env.PUBLIC_API_PROXY_URL
    ?? 'https://arcraided-api-proxy.kubilay12344.workers.dev';

// ---------- Helpers ----------

async function fetchJSON<T>(path: string): Promise<T> {
    const url = `${PROXY}${path}`;
    const res = await fetch(url, {
        headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
        console.warn(`[api] ${res.status} from ${url}`);
        throw new Error(`API ${res.status}: ${url}`);
    }

    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('application/json')) {
        console.warn(`[api] unexpected content-type "${ct}" from ${url}`);
        throw new Error(`Non-JSON response from ${url}`);
    }

    return res.json() as Promise<T>;
}

async function safeJSON<T>(path: string, fallback: T): Promise<T> {
    try {
        return await fetchJSON<T>(path);
    } catch {
        console.warn(`[api] falling back for ${path}`);
        return fallback;
    }
}

// ---------- Items ----------

async function fetchItems(): Promise<ArdbItem[]> {
    const raw = await safeJSON<ArdbItem[]>('/proxy/ardb/api/items', []);
    return raw.map((item) => ({
        ...item,
        category: categorizeItem(item.type),
    }));
}

// ---------- Enemies ----------

async function fetchEnemies(): Promise<ArdbEnemy[]> {
    // Get the list from ARDB
    const list = await safeJSON<ArdbEnemyListItem[]>('/proxy/ardb/api/arc-enemies', []);

    // Fetch each enemy detail in parallel
    const details = await Promise.allSettled(
        list.map((e) => fetchJSON<ArdbEnemy>(`/proxy/ardb/api/arc-enemies/${e.id}`))
    );

    // Also try MetaForge for descriptions + better images
    const metaArcs = await safeJSON<{ data: MetaForgeArc[] }>('/proxy/metaforge/api/arc-raiders/arcs', { data: [] });
    const metaMap = new Map(metaArcs.data.map((a) => [a.id, a]));

    return list.map((item, i) => {
        const result = details[i];
        const detail: Partial<ArdbEnemy> = result.status === 'fulfilled' ? result.value : {};
        const meta = metaMap.get(item.id);

        return {
            id: item.id,
            name: item.name,
            icon: item.icon,
            updatedAt: item.updatedAt,
            image: detail.image ?? meta?.image ?? '',
            dropTable: detail.dropTable ?? [],
            relatedMaps: detail.relatedMaps ?? [],
            description: meta?.description ?? '',
        };
    });
}

// ---------- Quests ----------

async function fetchQuests(): Promise<ArdbQuest[]> {
    return safeJSON<ArdbQuest[]>('/proxy/ardb/api/quests', []);
}

// ---------- Main aggregation ----------

export async function fetchAllData(): Promise<ArcRaidedData> {
    const [items, enemies, quests] = await Promise.all([
        fetchItems(),
        fetchEnemies(),
        fetchQuests(),
    ]);

    // Extract unique maps
    const mapSet = new Set<string>();
    quests.forEach((q) => q.maps?.forEach((m) => mapSet.add(m.name)));
    const maps = [...mapSet].sort();

    // Extract unique traders
    const traderSet = new Set<string>();
    quests.forEach((q) => {
        if (q.trader?.name) traderSet.add(q.trader.name);
    });
    const traders = [...traderSet].sort();

    return {
        items,
        enemies,
        quests,
        maps,
        traders,
        buildInfo: {
            generatedAt: new Date().toISOString(),
            itemCount: items.length,
            enemyCount: enemies.length,
            questCount: quests.length,
            mapCount: maps.length,
            traderCount: traders.length,
        },
    };
}

/**
 * Resolve a relative ARDB icon/image path to a full URL.
 * If path is already absolute, return as-is.
 */
export function resolveArdbImage(path: string | undefined): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${ARDB_BASE}${path}`;
}
