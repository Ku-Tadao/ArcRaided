export function getRarity(item: any): string {
    return (item.rarity || 'common').toLowerCase();
}

/**
 * Renders an Item Card matching the exact `.item-card` styling in Astro.
 */
export function renderItemCard(item: any, activeSource = 'ardb', getWeaponIconSVG?: (name: string) => string): string {
    const r = getRarity(item);
    // Determine category based on item.category or fallback
    let cat = item.category || 'Other';
    if (!item.category && item.type) {
        const t = item.type.toLowerCase();
        if (['consumable', 'medical', 'throwable'].includes(t)) cat = 'Consumables';
        else if (['weapon', 'attachment', 'ammo'].includes(t)) cat = 'Weapons';
        else if (['armor', 'helmet', 'backpack', 'rig'].includes(t)) cat = 'Gear';
    }

    const ARDB_BASE = 'https://ardb.app/static';
    const resolveImg = (path: string) => path ? (path.startsWith('http') ? path : ARDB_BASE + path) : '';
    
    const imgSrc = resolveImg(item.icon);
    const hasTraderPrice = activeSource === 'metaforge' && item.trader_price;
    const iconSvg = getWeaponIconSVG && cat === 'Weapons' ? getWeaponIconSVG(item.name) : '';

    return `
        <div class="item-card rarity-${r}" data-rarity="${r}" data-category="${cat}" data-type="${item.type || ''}" data-weapon-type="${item.type ? item.type.toLowerCase() : ''}" data-name="${item.name.toLowerCase()}" data-id="${item.id}" data-source="${activeSource}">
            <div class="rarity-image-wrap item-card-image-wrap">
                <div class="rarity-curve"></div>
                ${imgSrc 
                    ? `<img src="${imgSrc}" alt="${item.name}" loading="lazy" class="item-img" />` 
                    : `<div style="display:flex;align-items:center;justify-content:center;opacity:0.3;width:100%;height:100%;z-index:2">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                       </div>`
                }
                ${item.value != null && item.value > 0 ? `<div class="item-value-badge">${item.value.toLocaleString()}${hasTraderPrice ? ` <span style="opacity:.6">S: ${item.trader_price.toLocaleString()}</span>` : ''}</div>` : ''}
            </div>
            <div class="item-card-footer">
                ${iconSvg ? `<span class="item-type-icon">${iconSvg}</span>` : `<span class="item-type-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></span>`}
                <span class="item-card-name">${item.name}</span>
            </div>
        </div>
    `;
}