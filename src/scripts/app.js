// ============================================================
// ArcRaided — Client-side interactivity
// Theme, navigation, search, filters, modals
// ============================================================

(function () {
    'use strict';

    const ARDB_BASE = 'https://ardb.app/static';

    // ---------- Helpers ----------
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    function resolveImg(path) {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return ARDB_BASE + path;
    }

    function capitalize(s) {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function rarityBadge(rarity) {
        const r = rarity || 'common';
        return `<span class="rarity-badge ${r}">${capitalize(r)}</span>`;
    }

    // ---------- Theme ----------
    const themeBtn = $('#themeToggle');
    function applyTheme(dark) {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        if (themeBtn) themeBtn.textContent = dark ? 'Light Mode' : 'Dark Mode';
        try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
    }

    const savedTheme = (() => { try { return localStorage.getItem('theme'); } catch { return null; } })();
    const prefersDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            applyTheme(!isDark);
        });
    }

    // ---------- Navigation ----------
    const navLinks = $$('.nav-link');
    const sections = $$('.content');

    function showSection(name) {
        sections.forEach(s => {
            const match = s.id === name;
            if (match) {
                s.style.display = '';
            } else {
                s.style.display = 'none';
            }
        });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.dataset.section === name);
        });
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => showSection(link.dataset.section));
    });

    // Quick link navigation (overview stat cards & ql-cards)
    $$('[data-section]').forEach(el => {
        if (el.classList.contains('nav-link')) return;
        el.addEventListener('click', () => {
            const target = el.dataset.section;
            if (target && target !== 'overview') showSection(target);
        });
    });

    // ---------- Product Switcher ----------
    const switcherBtn = $('#productSwitcherBtn');
    const switcherDropdown = $('#productSwitcherDropdown');

    if (switcherBtn && switcherDropdown) {
        switcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            switcherDropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', () => {
            switcherDropdown.classList.add('hidden');
        });
    }

    // ---------- Client Data ----------
    const appDataEl = document.getElementById('app-data');
    const DATA = appDataEl ? JSON.parse(appDataEl.dataset.payload || '{}') : {};

    // ---------- Data Source Toggle ----------
    let activeSource = 'ardb';
    const sourceBtns = $$('#sourceToggle .source-btn');

    function getItems() {
        return activeSource === 'metaforge' ? (DATA.metaforge?.items || []) : (DATA.items || []);
    }

    function getQuests() {
        return activeSource === 'metaforge' ? (DATA.metaforge?.quests || []) : (DATA.quests || []);
    }

    // Weapon types for category mapping
    const WEAPON_TYPES = ['hand cannon','battle rifle','assault rifle','smg','pistol','shotgun','sniper rifle','lmg'];

    function categorizeItem(type) {
        const t = (type || '').toLowerCase();
        if (WEAPON_TYPES.includes(t)) return 'Weapons';
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

    function renderItemCard(item) {
        const r = (item.rarity || 'common').toLowerCase();
        const cat = item.category || categorizeItem(item.type);
        const imgSrc = resolveImg(item.icon);
        const hasTraderPrice = activeSource === 'metaforge' && item.trader_price;

        return `<div class="item-card rarity-${r}" data-rarity="${r}" data-category="${cat}" data-type="${item.type}" data-weapon-type="${item.type.toLowerCase()}" data-name="${item.name.toLowerCase()}" data-id="${item.id}" data-source="${activeSource}">
            ${imgSrc ? `<img src="${imgSrc}" alt="${item.name}" loading="lazy" class="item-card-icon" />` : `<div class="item-card-icon" style="display:flex;align-items:center;justify-content:center;opacity:0.3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>`}
            <div class="item-card-info">
                <div class="item-card-name">${item.name}</div>
                <div class="item-card-meta">
                    <span class="rarity-badge ${r}">${r}</span>
                    <span class="item-card-tag">${item.type}</span>
                </div>
            </div>
            ${item.value != null && item.value > 0 ? `<span class="item-value">${item.value.toLocaleString()}${hasTraderPrice ? ` <small style="opacity:.5">sell: ${item.trader_price.toLocaleString()}</small>` : ''}</span>` : ''}
        </div>`;
    }

    function renderQuestCard(quest) {
        if (activeSource === 'metaforge') {
            const img = quest.image || '';
            return `<div class="quest-card" data-id="${quest.id}" data-trader="${quest.trader_name || ''}" data-name="${(quest.title || '').toLowerCase()}" data-maps="" data-source="metaforge">
                <div class="quest-card-img" style="border-radius:50%;">
                    ${img ? `<img src="${img}" alt="${quest.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />` : `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:0.3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>`}
                </div>
                <div class="quest-card-body">
                    <div class="quest-card-title">${quest.title}</div>
                    <div class="quest-card-trader">${quest.trader_name || 'Unknown'}</div>
                    <div class="quest-steps">
                        <span class="quest-step">${quest.objectives?.length || 0} objectives${quest.xp ? ` · +${quest.xp} XP` : ''}${quest.rewards?.length ? ` · ${quest.rewards.length} rewards` : ''}</span>
                    </div>
                </div>
            </div>`;
        }

        // ARDB quest
        const traderIcon = quest.trader?.icon ? resolveImg(quest.trader.icon) : '';
        return `<div class="quest-card" data-id="${quest.id}" data-trader="${quest.trader?.name ?? ''}" data-name="${quest.title.toLowerCase()}" data-maps="${quest.maps?.map(m => m.name).join(',').toLowerCase() ?? ''}" data-source="ardb">
            <div class="quest-card-img" style="border-radius:50%;">
                ${traderIcon ? `<img src="${traderIcon}" alt="${quest.trader.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />` : `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:0.3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>`}
            </div>
            <div class="quest-card-body">
                <div class="quest-card-title">${quest.title}</div>
                <div class="quest-card-trader">${quest.trader?.name ?? 'Unknown'}</div>
                ${quest.maps && quest.maps.length > 0 ? `<div class="quest-card-desc">${quest.maps.map(m => m.name).join(', ')}</div>` : ''}
                <div class="quest-steps">
                    <span class="quest-step">${quest.steps?.length ?? 0} steps${quest.xpReward ? ` · +${quest.xpReward} XP` : ''}</span>
                </div>
            </div>
        </div>`;
    }

    function rebuildItemGrid() {
        if (!itemGrid) return;
        const items = getItems();
        itemGrid.innerHTML = items.map(renderItemCard).join('');

        // Update category counts
        categoryBtns.forEach(btn => {
            const cat = btn.dataset.category;
            const countEl = btn.querySelector('.count');
            if (countEl) {
                const count = cat === 'All' ? items.length : items.filter(i => (i.category || categorizeItem(i.type)) === cat).length;
                countEl.textContent = count;
            }
        });

        // Reset filters
        activeCategory = 'All';
        activeRarity = 'all';
        activeWeaponType = 'all';
        categoryBtns.forEach(b => b.classList.toggle('active', b.dataset.category === 'All'));
        rarityBtns.forEach(b => b.classList.toggle('active', b.dataset.rarity === 'all'));
        weaponTypeBtns.forEach(b => b.classList.toggle('active', b.dataset.weaponType === 'all'));
        if (weaponTypeFilters) weaponTypeFilters.classList.add('hidden');
        if (itemSearch) itemSearch.value = '';
        if (noItemResults) noItemResults.classList.add('hidden');
    }

    function rebuildQuestGrid() {
        if (!questList) return;
        const quests = getQuests();
        questList.innerHTML = quests.map(renderQuestCard).join('');

        // Hide trader/map filters for MetaForge (no trader icons / map data)
        const traderFilters = $('#traderFilters');
        const mapFilters = $('#mapFilters');
        if (activeSource === 'metaforge') {
            if (traderFilters) traderFilters.style.display = 'none';
            if (mapFilters) mapFilters.style.display = 'none';
        } else {
            if (traderFilters) traderFilters.style.display = '';
            if (mapFilters) mapFilters.style.display = '';
        }

        // Reset
        activeTrader = 'all';
        activeMap = 'all';
        traderBtns.forEach(b => b.classList.toggle('active', b.dataset.trader === 'all'));
        mapBtns.forEach(b => b.classList.toggle('active', b.dataset.map === 'all'));
        if (questSearch) questSearch.value = '';
        if (noQuestResults) noQuestResults.classList.add('hidden');
    }

    function switchSource(source) {
        if (source === activeSource) return;
        activeSource = source;
        sourceBtns.forEach(b => b.classList.toggle('active', b.dataset.source === source));
        rebuildItemGrid();
        rebuildQuestGrid();
        try { localStorage.setItem('arcraided-source', source); } catch {}
    }

    // Restore saved source preference
    const savedSource = (() => { try { return localStorage.getItem('arcraided-source'); } catch { return null; } })();
    if (savedSource === 'metaforge') {
        switchSource('metaforge');
    }

    sourceBtns.forEach(btn => {
        btn.addEventListener('click', () => switchSource(btn.dataset.source));
    });

    // ---------- Items: Search & Filter ----------
    const itemSearch = $('#itemSearch');
    const itemGrid = $('#itemGrid');
    const categoryBtns = $$('#categoryFilters .cat-filter');
    const rarityBtns = $$('#rarityFilters .cat-filter');
    const weaponTypeBtns = $$('#weaponTypeFilters .cat-filter');
    const weaponTypeFilters = $('#weaponTypeFilters');
    const noItemResults = $('#noItemResults');

    let activeCategory = 'All';
    let activeRarity = 'all';
    let activeWeaponType = 'all';

    function filterItems() {
        if (!itemGrid) return;
        const query = (itemSearch?.value || '').toLowerCase().trim();
        const cards = $$('.item-card', itemGrid);
        let visible = 0;

        cards.forEach(card => {
            const name = card.dataset.name || '';
            const type = card.dataset.type || '';
            const cat = card.dataset.category || '';
            const rarity = card.dataset.rarity || '';
            const weaponType = card.dataset.weaponType || '';

            const matchQuery = !query || name.includes(query) || type.toLowerCase().includes(query);
            const matchCat = activeCategory === 'All' || cat === activeCategory;
            const matchRarity = activeRarity === 'all' || rarity === activeRarity;
            const matchWeaponType = activeWeaponType === 'all' || activeCategory !== 'Weapons' || weaponType === activeWeaponType;

            const show = matchQuery && matchCat && matchRarity && matchWeaponType;
            card.classList.toggle('hidden', !show);
            if (show) visible++;
        });

        if (noItemResults) noItemResults.classList.toggle('hidden', visible > 0);
    }

    if (itemSearch) itemSearch.addEventListener('input', filterItems);

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;

            // Show/hide weapon-type sub-filter
            if (weaponTypeFilters) {
                if (activeCategory === 'Weapons') {
                    weaponTypeFilters.classList.remove('hidden');
                } else {
                    weaponTypeFilters.classList.add('hidden');
                    activeWeaponType = 'all';
                    weaponTypeBtns.forEach(b => b.classList.toggle('active', b.dataset.weaponType === 'all'));
                }
            }

            filterItems();
        });
    });

    rarityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            rarityBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeRarity = btn.dataset.rarity;
            filterItems();
        });
    });

    weaponTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            weaponTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeWeaponType = btn.dataset.weaponType;
            filterItems();
        });
    });

    // ---------- Items: Modal ----------
    const itemModal = $('#itemModal');
    const closeItemModalBtn = $('#closeItemModalBtn');
    const modalItemDetails = $('#modalItemDetails');

    function openItemModal(itemId) {
        const items = getItems();
        const item = items.find(i => i.id === itemId);
        if (!item || !itemModal || !modalItemDetails) return;

        const imgSrc = resolveImg(item.icon);
        const isMetaForge = activeSource === 'metaforge';

        // Build stats section
        let statsHTML = '';
        if (isMetaForge && item.stat_block) {
            const sb = item.stat_block;
            const interesting = Object.entries(sb).filter(([k, v]) => v && v !== 0 && v !== '' && k !== 'value');
            if (interesting.length > 0) {
                const statCards = interesting.map(([k, v]) => `
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${v}</div>
                        <div class="detail-stat-label">${k.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </div>
                `).join('');
                statsHTML = `<div class="detail-stats-grid">${statCards}</div>`;
            }
        }

        if (!statsHTML) {
            statsHTML = `
                <div class="detail-stats-grid">
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${item.value != null ? item.value.toLocaleString() : '—'}</div>
                        <div class="detail-stat-label">Value</div>
                    </div>
                    ${isMetaForge && item.trader_price ? `
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${item.trader_price.toLocaleString()}</div>
                        <div class="detail-stat-label">Trader Price</div>
                    </div>
                    ` : ''}
                    ${item.foundIn && item.foundIn.length > 0 ? `
                    <div class="detail-stat-card" style="grid-column:span 2">
                        <div class="detail-stat-value" style="font-size:1rem">${Array.isArray(item.foundIn) ? item.foundIn.join(', ') : item.foundIn}</div>
                        <div class="detail-stat-label">Found In</div>
                    </div>
                    ` : ''}
                </div>
            `;
        }

        modalItemDetails.innerHTML = `
            <div class="detail-header">
                <div class="detail-portrait">
                    ${imgSrc ? `<img src="${imgSrc}" alt="${item.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />` : ''}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${item.name}</h3>
                    <div class="detail-tags">
                        ${rarityBadge(item.rarity)}
                        <span class="item-card-tag">${item.type}</span>
                        ${item.category ? `<span class="item-card-tag">${item.category}</span>` : ''}
                    </div>
                    <span class="source-badge ${activeSource}">${activeSource === 'metaforge' ? 'MetaForge' : 'ARDB'}</span>
                </div>
            </div>
            <p class="detail-desc">${item.description || 'No description available.'}</p>
            ${statsHTML}
        `;

        itemModal.classList.remove('hidden');
        itemModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    if (itemGrid) {
        itemGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            if (card) openItemModal(card.dataset.id);
        });
    }

    // ---------- Enemies: Search & Modal ----------
    const enemySearch = $('#enemySearch');
    const enemyGrid = $('#enemyGrid');
    const noEnemyResults = $('#noEnemyResults');
    const enemyModal = $('#enemyModal');
    const closeEnemyModalBtn = $('#closeEnemyModalBtn');
    const modalEnemyDetails = $('#modalEnemyDetails');

    if (enemySearch) {
        enemySearch.addEventListener('input', () => {
            const query = enemySearch.value.toLowerCase().trim();
            const cards = $$('.enemy-card', enemyGrid);
            let visible = 0;
            cards.forEach(card => {
                const match = !query || (card.dataset.name || '').includes(query);
                card.classList.toggle('hidden', !match);
                if (match) visible++;
            });
            if (noEnemyResults) noEnemyResults.classList.toggle('hidden', visible > 0);
        });
    }

    function openEnemyModal(enemyId) {
        const enemy = (DATA.enemies || []).find(e => e.id === enemyId);
        if (!enemy || !enemyModal || !modalEnemyDetails) return;

        const imgSrc = resolveImg(enemy.image) || resolveImg(enemy.icon);

        let dropTableHTML = '';
        if (enemy.dropTable && enemy.dropTable.length > 0) {
            const rows = enemy.dropTable.map(drop => `
                <div class="drop-item">
                    ${drop.icon ? `<img src="${resolveImg(drop.icon)}" alt="${drop.name}" class="drop-item-icon" />` : ''}
                    <span class="drop-item-name">${drop.name}</span>
                    ${rarityBadge(drop.rarity)}
                </div>
            `).join('');
            dropTableHTML = `
                <div class="drop-table">
                    <h4>Drop Table</h4>
                    <div class="drop-list">${rows}</div>
                </div>
            `;
        }

        let mapsHTML = '';
        if (enemy.relatedMaps && enemy.relatedMaps.length > 0) {
            mapsHTML = `
                <div style="margin-top:1rem">
                    <h4 style="font-family:'Saira',system-ui,sans-serif;font-weight:700;font-size:.9rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 .5rem">Spawn Maps</h4>
                    <div class="rewards-list">
                        ${enemy.relatedMaps.map(m => `<span class="reward-chip">${m}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        modalEnemyDetails.innerHTML = `
            <div class="detail-header">
                <div class="detail-portrait" style="width:120px;height:120px;">
                    ${imgSrc ? `<img src="${imgSrc}" alt="${enemy.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />` : ''}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${enemy.name}</h3>
                    <p class="detail-desc">${enemy.description || 'No description available.'}</p>
                </div>
            </div>
            ${mapsHTML}
            ${dropTableHTML}
        `;

        enemyModal.classList.remove('hidden');
        enemyModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    if (enemyGrid) {
        enemyGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.enemy-card');
            if (card) openEnemyModal(card.dataset.id);
        });
    }

    // ---------- Quests: Search, Filter & Modal ----------
    const questSearch = $('#questSearch');
    const questList = $('#questList');
    const traderBtns = $$('#traderFilters .cat-filter');
    const mapBtns = $$('#mapFilters .cat-filter');
    const noQuestResults = $('#noQuestResults');
    const questModal = $('#questModal');
    const closeQuestModalBtn = $('#closeQuestModalBtn');
    const modalQuestDetails = $('#modalQuestDetails');

    let activeTrader = 'all';
    let activeMap = 'all';

    function filterQuests() {
        if (!questList) return;
        const query = (questSearch?.value || '').toLowerCase().trim();
        const cards = $$('.quest-card', questList);
        let visible = 0;

        cards.forEach(card => {
            const name = card.dataset.name || '';
            const trader = card.dataset.trader || '';
            const maps = card.dataset.maps || '';

            const matchQuery = !query || name.includes(query) || trader.toLowerCase().includes(query) || maps.includes(query);
            const matchTrader = activeTrader === 'all' || trader === activeTrader;
            const matchMap = activeMap === 'all' || maps.includes(activeMap.toLowerCase());

            const show = matchQuery && matchTrader && matchMap;
            card.classList.toggle('hidden', !show);
            if (show) visible++;
        });

        if (noQuestResults) noQuestResults.classList.toggle('hidden', visible > 0);
    }

    if (questSearch) questSearch.addEventListener('input', filterQuests);

    traderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            traderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTrader = btn.dataset.trader;
            filterQuests();
        });
    });

    mapBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mapBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeMap = btn.dataset.map;
            filterQuests();
        });
    });

    function openQuestModal(questId) {
        const quests = getQuests();
        const quest = quests.find(q => q.id === questId);
        if (!quest || !questModal || !modalQuestDetails) return;

        if (activeSource === 'metaforge') {
            // MetaForge quest modal
            let objectivesHTML = '';
            if (quest.objectives && quest.objectives.length > 0) {
                const items = quest.objectives.map((obj, i) => `
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i + 1}</div>
                        <span class="drop-item-name">${obj}</span>
                    </div>
                `).join('');
                objectivesHTML = `<div class="drop-table"><h4>Objectives</h4><div class="drop-list">${items}</div></div>`;
            }

            let rewardsHTML = '';
            if (quest.rewards && quest.rewards.length > 0) {
                const items = quest.rewards.map(r => `
                    <div class="drop-item">
                        ${r.item?.icon ? `<img src="${r.item.icon}" alt="${r.item.name}" class="drop-item-icon" />` : ''}
                        <span class="drop-item-name">${r.item?.name || r.item_id} x${r.quantity}</span>
                        ${r.item?.rarity ? rarityBadge(r.item.rarity) : ''}
                    </div>
                `).join('');
                rewardsHTML = `<div class="drop-table"><h4>Rewards</h4><div class="drop-list">${items}</div></div>`;
            }

            let guidesHTML = '';
            if (quest.guide_links && quest.guide_links.length > 0) {
                guidesHTML = `<div class="rewards-list" style="margin-top:1rem">${quest.guide_links.map(g => `<a href="${g.url}" target="_blank" rel="noopener noreferrer" class="reward-chip" style="text-decoration:none">${g.label}</a>`).join('')}</div>`;
            }

            modalQuestDetails.innerHTML = `
                <div class="detail-header">
                    <div class="detail-portrait" style="border-radius:12px;">
                        ${quest.image ? `<img src="${quest.image}" alt="${quest.title}" style="width:100%;height:100%;object-fit:cover;" />` : ''}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${quest.title}</h3>
                        <div class="detail-tags">
                            <span class="rarity-badge epic">${quest.trader_name || 'Unknown'}</span>
                            ${quest.xp ? `<span class="reward-chip">+${quest.xp} XP</span>` : ''}
                        </div>
                        <span class="source-badge metaforge">MetaForge</span>
                    </div>
                </div>
                ${objectivesHTML}
                ${rewardsHTML}
                ${guidesHTML}
            `;
        } else {
            // ARDB quest modal
            const traderIcon = quest.trader?.icon ? resolveImg(quest.trader.icon) : '';

            let stepsHTML = '';
            if (quest.steps && quest.steps.length > 0) {
                const stepsItems = quest.steps.map((step, i) => `
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i + 1}</div>
                        <span class="drop-item-name">${step.title}</span>
                        ${step.amount ? `<span class="item-card-tag">x${step.amount}</span>` : ''}
                    </div>
                `).join('');
                stepsHTML = `<div class="drop-table"><h4>Steps</h4><div class="drop-list">${stepsItems}</div></div>`;
            }

            let mapsHTML = '';
            if (quest.maps && quest.maps.length > 0) {
                mapsHTML = `<div class="rewards-list" style="margin-top:1rem">${quest.maps.map(m => `<span class="reward-chip">${m.name || m}</span>`).join('')}</div>`;
            }

            modalQuestDetails.innerHTML = `
                <div class="detail-header">
                    <div class="detail-portrait" style="border-radius:50%;">
                        ${traderIcon ? `<img src="${traderIcon}" alt="${quest.trader.name}" style="width:100%;height:100%;object-fit:cover;" />` : ''}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${quest.title}</h3>
                        <div class="detail-tags">
                            <span class="rarity-badge epic">${quest.trader?.name || 'Unknown'}</span>
                            ${quest.xpReward ? `<span class="reward-chip">+${quest.xpReward} XP</span>` : ''}
                        </div>
                        <span class="source-badge ardb">ARDB</span>
                    </div>
                </div>
                <p class="detail-desc">${quest.description || 'No description available.'}</p>
                ${mapsHTML}
                ${stepsHTML}
            `;
        }

        questModal.classList.remove('hidden');
        questModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    if (questList) {
        questList.addEventListener('click', (e) => {
            const card = e.target.closest('.quest-card');
            if (card) openQuestModal(card.dataset.id);
        });
    }

    // ---------- Modal Close ----------
    function closeAllModals() {
        [itemModal, enemyModal, questModal].forEach(modal => {
            if (modal) {
                modal.classList.add('hidden');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
        document.body.style.overflow = '';
    }

    [closeItemModalBtn, closeEnemyModalBtn, closeQuestModalBtn].forEach(btn => {
        if (btn) btn.addEventListener('click', closeAllModals);
    });

    // Close on backdrop click
    [itemModal, enemyModal, questModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeAllModals();
            });
        }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });
})();
