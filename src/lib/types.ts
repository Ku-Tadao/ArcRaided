// ========================
// Arc Raiders Type Definitions
// ========================

// ---------- ARDB Item ----------
// Shape: { id, name, description, rarity, type, foundIn[], value, icon?, updatedAt }
export interface ArdbItem {
    id: string;
    name: string;
    type: string;
    rarity: string | null;
    description: string;
    foundIn: string[];
    value: number;
    icon?: string;           // relative path: /items/icons/xxx.webp → prefix with ARDB_BASE
    updatedAt?: string;
    /** Attached at runtime */
    category?: string;
}

// ---------- ARDB Enemy (list) ----------
// Shape: { id, name, icon, updatedAt }
export interface ArdbEnemyListItem {
    id: string;
    name: string;
    icon: string;            // relative: /arc/icons/xxx.svg
    updatedAt?: string;
}

// ---------- ARDB Enemy (detail) ----------
// Shape: { id, name, dropTable[], image, icon, relatedMaps[], updatedAt }
export interface ArdbEnemy extends ArdbEnemyListItem {
    image?: string;           // relative: /arc/images/xxx.webp
    dropTable: DropTableEntry[];
    relatedMaps: string[];
    description?: string;     // may come from MetaForge merge
}

export interface DropTableEntry {
    id: string;
    name: string;
    rarity: string | null;
    type: string;
    foundIn: string[];
    value: number;
    icon?: string;
    updatedAt?: string;
}

// ---------- ARDB Quest ----------
// Shape: { id, maps[], steps[], title, description, trader:{id,name,type,description,image,icon}, requiredItems[], xpReward, updatedAt }
export interface ArdbQuest {
    id: string;
    title: string;
    description: string;
    trader: QuestTrader;
    maps: QuestMap[];
    steps: QuestStep[];
    requiredItems: string[];
    xpReward: number;
    updatedAt?: string;
}

export interface QuestTrader {
    id: string;
    name: string;
    type: string;          // 'Security' | etc.
    description: string;
    image: string;         // /traders/images/xxx.webp
    icon: string;          // /traders/icons/xxx.webp
}

export interface QuestMap {
    id: string;
    name: string;
}

export interface QuestStep {
    title: string;
    amount?: number;
}

// ---------- MetaForge ARC Enemy ----------
export interface MetaForgeArc {
    id: string;
    name: string;
    description: string;
    icon: string;         // full CDN URL from Supabase
    image: string;        // full CDN URL from Supabase
}

// ---------- Unified App Data ----------
export interface ArcRaidedData {
    items: ArdbItem[];
    enemies: ArdbEnemy[];
    quests: ArdbQuest[];
    maps: string[];
    traders: string[];
    buildInfo: BuildInfo;
}

export interface BuildInfo {
    generatedAt: string;
    itemCount: number;
    enemyCount: number;
    questCount: number;
    mapCount: number;
    traderCount: number;
}

// ---------- Rarity helpers ----------
export const RARITY_ORDER: Record<string, number> = {
    common: 0,
    uncommon: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
};

export const WEAPON_TYPES = [
    'hand cannon',
    'battle rifle',
    'assault rifle',
    'SMG',
    'pistol',
    'shotgun',
    'sniper rifle',
    'LMG',
] as const;

export const ITEM_CATEGORIES = [
    'All',
    'Weapons',
    'Recyclables',
    'Blueprints',
    'Consumables',
    'Mods',
    'Trinkets',
    'Materials',
    'Keys',
    'Gear',
    'Other',
] as const;

export type WeaponType = typeof WEAPON_TYPES[number];
export type ItemCategory = typeof ITEM_CATEGORIES[number];

/**
 * Map raw ARDB item type to a display category
 */
export function categorizeItem(type: string): ItemCategory {
    const t = type.toLowerCase();
    if (WEAPON_TYPES.includes(t as WeaponType)) return 'Weapons';
    if (t === 'recyclable') return 'Recyclables';
    if (t === 'blueprint') return 'Blueprints';
    if (t === 'consumable' || t === 'quick use') return 'Consumables';
    if (t === 'modification' || t === 'mod') return 'Mods';
    if (t === 'trinket') return 'Trinkets';
    if (t.includes('material') || t === 'nature') return 'Materials';
    if (t === 'key') return 'Keys';
    if (t === 'augment' || t === 'ammunition' || t === 'shield' || t === 'special') return 'Gear';
    return 'Other';
}

/** Image URL prefix for ARDB relative paths */
export const ARDB_BASE = 'https://ardb.app/static';
