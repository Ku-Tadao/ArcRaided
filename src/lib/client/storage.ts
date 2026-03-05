const STORE_VERSION = '1.0';

export function getVersionedStore<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        
        const parsed = JSON.parse(raw);
        // If it's an object with our version signature
        if (parsed && typeof parsed === 'object' && parsed._v) {
            if (parsed._v !== STORE_VERSION) {
                console.warn(`[ArcRaided] Store version mismatch for ${key}. Clearing cache.`);
                localStorage.removeItem(key);
                return fallback;
            }
            return parsed.data as T;
        }
        
        // Legacy data (no version). Try to return as-is, but structure will be missing _v
        return parsed as T;
    } catch {
        return fallback;
    }
}

export function setVersionedStore<T>(key: string, data: T): void {
    try {
        const payload = {
            _v: STORE_VERSION,
            data
        };
        localStorage.setItem(key, JSON.stringify(payload));
    } catch {
        console.warn(`[ArcRaided] Failed to save store ${key}`);
    }
}