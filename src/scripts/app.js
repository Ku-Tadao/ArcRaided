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
    const navDdItems = $$('.nav-dd-item');
    const sections = $$('.content');
    const allNavItems = [...navLinks.filter(l => l.dataset.section), ...navDdItems];

    function showSection(name) {
        sections.forEach(s => {
            const match = s.id === name;
            if (match) {
                s.style.display = '';
            } else {
                s.style.display = 'none';
            }
        });
        // Highlight nav: clear all active states
        navLinks.forEach(l => l.classList.remove('active'));
        navDdItems.forEach(l => l.classList.remove('active'));

        // Activate matching direct nav link OR dropdown item
        const directMatch = navLinks.filter(l => l.dataset.section === name);
        if (directMatch.length > 0) {
            directMatch.forEach(l => l.classList.add('active'));
        }
        const ddMatch = navDdItems.filter(l => l.dataset.section === name);
        if (ddMatch.length > 0) {
            ddMatch.forEach(l => l.classList.add('active'));
            // Also highlight the parent dropdown trigger
            ddMatch.forEach(l => {
                const parent = l.closest('.nav-dropdown');
                if (parent) {
                    const trigger = parent.querySelector('.nav-dropdown-trigger');
                    if (trigger) trigger.classList.add('active');
                }
            });
        }

        // Close all dropdown menus
        $$('.nav-dropdown-menu').forEach(m => m.classList.add('hidden'));

        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    navLinks.forEach(link => {
        if (link.dataset.section) {
            link.addEventListener('click', () => showSection(link.dataset.section));
        }
    });

    navDdItems.forEach(link => {
        link.addEventListener('click', () => showSection(link.dataset.section));
    });

    // Nav dropdown toggle
    $$('.nav-dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = trigger.closest('.nav-dropdown');
            const menu = parent?.querySelector('.nav-dropdown-menu');
            if (!menu) return;
            // Close other dropdowns
            $$('.nav-dropdown-menu').forEach(m => {
                if (m !== menu) m.classList.add('hidden');
            });
            menu.classList.toggle('hidden');
        });
    });

    document.addEventListener('click', () => {
        $$('.nav-dropdown-menu').forEach(m => m.classList.add('hidden'));
    });

    // Quick link navigation (overview stat cards & ql-cards)
    $$('[data-section]').forEach(el => {
        if (el.classList.contains('nav-link') || el.classList.contains('nav-dd-item')) return;
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
        if (t === 'weapon') return 'Weapons';
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

        // Update weapon type counts (only meaningful for ARDB)
        if (weaponTypeBtns.length) {
            const weaponItems = items.filter(i => (i.category || categorizeItem(i.type)) === 'Weapons');
            weaponTypeBtns.forEach(btn => {
                const wt = btn.dataset.weaponType;
                const countEl = btn.querySelector('.count');
                if (countEl) {
                    const count = wt === 'all' ? weaponItems.length : weaponItems.filter(i => i.type.toLowerCase() === wt).length;
                    countEl.textContent = count;
                }
            });
        }

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

    function applySourceNavVisibility(source) {
        $$('.nav-link[data-source-only], .nav-dd-item[data-source-only]').forEach(el => {
            const allowed = el.dataset.sourceOnly;
            el.style.display = (allowed && allowed !== source) ? 'none' : '';
        });
    }

    function switchSource(source) {
        if (source === activeSource) return;
        activeSource = source;
        sourceBtns.forEach(b => b.classList.toggle('active', b.dataset.source === source));
        rebuildItemGrid();
        rebuildQuestGrid();

        // Show/hide nav items based on data-source-only attribute
        applySourceNavVisibility(source);

        // If the currently visible section is now hidden, go back to overview
        const visibleSection = sections.find(s => s.style.display !== 'none');
        if (visibleSection && visibleSection.dataset.sourceOnly && visibleSection.dataset.sourceOnly !== source) {
            showSection('overview');
        }

        try { localStorage.setItem('arcraided-source', source); } catch {}
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

            // Show/hide weapon-type sub-filter (hide for MetaForge — no weapon subtypes)
            if (weaponTypeFilters) {
                if (activeCategory === 'Weapons' && activeSource !== 'metaforge') {
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
    const traderModal = $('#traderModal');
    const closeTraderModalBtn = $('#closeTraderModalBtn');
    const skillModal = $('#skillModal');
    const closeSkillModalBtn = $('#closeSkillModalBtn');

    function closeAllModals() {
        [itemModal, enemyModal, questModal, traderModal, skillModal].forEach(modal => {
            if (modal) {
                modal.classList.add('hidden');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
        // Also close loadout picker
        const lpModal = $('#loadoutPickerModal');
        if (lpModal) { lpModal.classList.add('hidden'); lpModal.setAttribute('aria-hidden', 'true'); }
        document.body.style.overflow = '';
    }

    [closeItemModalBtn, closeEnemyModalBtn, closeQuestModalBtn, closeTraderModalBtn, closeSkillModalBtn].forEach(btn => {
        if (btn) btn.addEventListener('click', closeAllModals);
    });

    // Close on backdrop click
    [itemModal, enemyModal, questModal, traderModal, skillModal].forEach(modal => {
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

    // ---------- Trader Section ----------
    const traderSearch = $('#traderSearch');
    const traderGrid = $('#traderGrid');
    const noTraderResults = $('#noTraderResults');

    if (traderSearch && traderGrid) {
        traderSearch.addEventListener('input', () => {
            const query = traderSearch.value.toLowerCase().trim();
            const cards = $$('.trader-card', traderGrid);
            let visible = 0;
            cards.forEach(card => {
                const match = !query || (card.dataset.name || '').includes(query);
                card.classList.toggle('hidden', !match);
                if (match) visible++;
            });
            if (noTraderResults) noTraderResults.classList.toggle('hidden', visible > 0);
        });
    }

    // Trader modal
    if (traderGrid) {
        traderGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.trader-card');
            if (!card || !traderModal) return;
            const traderId = card.dataset.id;
            const arcTraders = DATA.arcTraders || [];
            const trader = arcTraders.find(t => t.id === traderId);
            const modalDetails = $('#modalTraderDetails');
            if (!modalDetails) return;

            const name = trader?.name || card.querySelector('.trader-card-name')?.textContent || 'Unknown';
            const desc = trader?.description || card.querySelector('.trader-card-desc')?.textContent || 'No description available.';
            const img = trader?.image || trader?.icon || '';

            modalDetails.innerHTML = `
                <div class="detail-header">
                    <div class="detail-portrait" style="border-radius:50%;">
                        ${img ? `<img src="${resolveImg(img)}" alt="${name}" style="width:100%;height:100%;object-fit:cover;" />` : ''}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${name}</h3>
                        ${trader?.type ? `<div class="detail-tags"><span class="rarity-badge epic">${trader.type}</span></div>` : ''}
                    </div>
                </div>
                <p class="detail-desc">${desc}</p>
            `;
            traderModal.classList.remove('hidden');
            traderModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    }

    // ---------- Skill Section ----------
    const skillSearch = $('#skillSearch');
    const skillGrid = $('#skillGrid');
    const noSkillResults = $('#noSkillResults');
    const skillCatBtns = $$('#skillCategoryFilters .cat-filter');

    let activeSkillCat = 'all';

    function filterSkills() {
        if (!skillGrid) return;
        const query = (skillSearch?.value || '').toLowerCase().trim();
        const cards = $$('.skill-card', skillGrid);
        let visible = 0;
        cards.forEach(card => {
            const name = card.dataset.name || '';
            const cat = card.dataset.category || '';
            const matchQuery = !query || name.includes(query);
            const matchCat = activeSkillCat === 'all' || cat === activeSkillCat;
            const show = matchQuery && matchCat;
            card.classList.toggle('hidden', !show);
            if (show) visible++;
        });
        if (noSkillResults) noSkillResults.classList.toggle('hidden', visible > 0);
    }

    if (skillSearch) skillSearch.addEventListener('input', filterSkills);
    skillCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeSkillCat = btn.dataset.skillCat;
            filterSkills();
        });
    });

    // Skill modal
    if (skillGrid) {
        skillGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.skill-card');
            if (!card || !skillModal) return;
            const skillId = card.dataset.id;
            const skills = DATA.skills || [];
            const skill = skills.find(s => s.id === skillId);
            const modalDetails = $('#modalSkillDetails');
            if (!modalDetails) return;

            const name = skill?.name || card.querySelector('.skill-card-name')?.textContent || 'Unknown';
            const desc = skill?.description || 'No description available.';

            modalDetails.innerHTML = `
                <div class="detail-header">
                    <div class="detail-portrait">
                        ${skill?.icon ? `<img src="${skill.icon}" alt="${name}" style="max-width:100%;max-height:100%;object-fit:contain;" />` : `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:.5"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>`}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${name}</h3>
                        <div class="detail-tags">
                            ${skill?.category ? `<span class="rarity-badge rare">${skill.category}</span>` : ''}
                            ${skill?.tier != null ? `<span class="item-card-tag">Tier ${skill.tier}</span>` : ''}
                        </div>
                    </div>
                </div>
                <p class="detail-desc">${desc}</p>
                ${skill?.effects && skill.effects.length > 0 ? `
                    <div class="drop-table"><h4>Effects</h4><div class="drop-list">
                        ${skill.effects.map(eff => `<div class="drop-item"><span class="drop-item-name">${eff}</span></div>`).join('')}
                    </div></div>
                ` : ''}
            `;
            skillModal.classList.remove('hidden');
            skillModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    }

    // ---------- Guide Section Search ----------
    const guideSearch = $('#guideSearch');
    const guideGrid = $('#guideGrid');
    const noGuideResults = $('#noGuideResults');

    if (guideSearch && guideGrid) {
        guideSearch.addEventListener('input', () => {
            const query = guideSearch.value.toLowerCase().trim();
            const cards = $$('.guide-card', guideGrid);
            let visible = 0;
            cards.forEach(card => {
                const match = !query || (card.dataset.name || '').includes(query);
                card.classList.toggle('hidden', !match);
                if (match) visible++;
            });
            if (noGuideResults) noGuideResults.classList.toggle('hidden', visible > 0);
        });
    }

    // ---------- Marketplace Search / Sort ----------
    const marketSearch = $('#marketSearch');
    const marketTable = $('#marketTable');
    const noMarketResults = $('#noMarketResults');
    const marketSortBtns = $$('#marketSortFilters .cat-filter');

    if (marketSearch && marketTable) {
        marketSearch.addEventListener('input', () => {
            const query = marketSearch.value.toLowerCase().trim();
            const rows = $$('.market-row', marketTable);
            let visible = 0;
            rows.forEach(row => {
                const match = !query || (row.dataset.name || '').includes(query);
                row.classList.toggle('hidden', !match);
                if (match) visible++;
            });
            if (noMarketResults) noMarketResults.classList.toggle('hidden', visible > 0);
        });
    }

    marketSortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            marketSortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const sort = btn.dataset.marketSort;
            if (!marketTable) return;
            const tbody = marketTable.querySelector('tbody');
            if (!tbody) return;
            const rows = $$('.market-row', tbody);
            rows.sort((a, b) => {
                if (sort === 'value-desc') return (parseFloat(b.dataset.value) || 0) - (parseFloat(a.dataset.value) || 0);
                if (sort === 'value-asc') return (parseFloat(a.dataset.value) || 0) - (parseFloat(b.dataset.value) || 0);
                if (sort === 'name') return (a.dataset.name || '').localeCompare(b.dataset.name || '');
                return 0;
            });
            rows.forEach(r => tbody.appendChild(r));
        });
    });

    // ---------- Needed Items Tracker ----------
    const NEEDED_KEY = 'arcraided-needed';
    const FOUND_KEY = 'arcraided-found';

    function getNeededState() {
        try { return JSON.parse(localStorage.getItem(NEEDED_KEY) || '[]'); } catch { return []; }
    }
    function getFoundState() {
        try { return JSON.parse(localStorage.getItem(FOUND_KEY) || '[]'); } catch { return []; }
    }
    function saveNeededState(ids) {
        try { localStorage.setItem(NEEDED_KEY, JSON.stringify(ids)); } catch {}
    }
    function saveFoundState(ids) {
        try { localStorage.setItem(FOUND_KEY, JSON.stringify(ids)); } catch {}
    }

    function updateNeededUI() {
        const needed = getNeededState();
        const found = getFoundState();
        const countEl = $('#neededCount');
        const doneEl = $('#neededDoneCount');
        const remainEl = $('#neededRemainingCount');
        const fillEl = $('#neededProgressFill');

        if (countEl) countEl.textContent = needed.length;
        const doneCount = needed.filter(id => found.includes(id)).length;
        if (doneEl) doneEl.textContent = doneCount;
        const remaining = needed.length - doneCount;
        if (remainEl) remainEl.textContent = remaining;
        if (fillEl) fillEl.style.width = needed.length > 0 ? `${(doneCount / needed.length * 100).toFixed(1)}%` : '0%';

        $$('.needed-item').forEach(el => {
            const id = el.dataset.id;
            const isNeeded = needed.includes(id);
            const isFound = found.includes(id);
            el.classList.toggle('is-tracked', isNeeded);
            el.classList.toggle('is-found', isFound);
        });
    }

    const neededGrid = $('#neededGrid');
    if (neededGrid) {
        neededGrid.addEventListener('click', (e) => {
            const trackBtn = e.target.closest('[data-needed-track]');
            if (trackBtn) {
                const id = trackBtn.dataset.neededTrack;
                const needed = getNeededState();
                const idx = needed.indexOf(id);
                if (idx > -1) {
                    needed.splice(idx, 1);
                    // Also remove from found
                    const found = getFoundState();
                    const fi = found.indexOf(id);
                    if (fi > -1) { found.splice(fi, 1); saveFoundState(found); }
                } else {
                    needed.push(id);
                }
                saveNeededState(needed);
                updateNeededUI();
                return;
            }
            const foundBtn = e.target.closest('[data-needed-found]');
            if (foundBtn) {
                const id = foundBtn.dataset.neededFound;
                const needed = getNeededState();
                if (!needed.includes(id)) return; // Must be tracked first
                const found = getFoundState();
                const idx = found.indexOf(id);
                if (idx > -1) {
                    found.splice(idx, 1);
                } else {
                    found.push(id);
                }
                saveFoundState(found);
                updateNeededUI();
            }
        });
        updateNeededUI();
    }

    // Needed search
    const neededSearch = $('#neededSearch');
    const noNeededResults = $('#noNeededResults');
    const neededViewBtns = $$('#neededViewFilters .cat-filter');
    let neededView = 'all';

    function filterNeeded() {
        const query = (neededSearch?.value || '').toLowerCase().trim();
        const needed = getNeededState();
        const found = getFoundState();
        const items = $$('.needed-item');
        let visible = 0;
        items.forEach(el => {
            const name = el.dataset.name || '';
            const id = el.dataset.id || '';
            const isTracked = needed.includes(id);
            const isFound = found.includes(id);

            let matchView = true;
            if (neededView === 'tracked') matchView = isTracked;
            if (neededView === 'remaining') matchView = isTracked && !isFound;

            const matchQuery = !query || name.includes(query);
            const show = matchQuery && matchView;
            el.classList.toggle('hidden', !show);
            if (show) visible++;
        });
        if (noNeededResults) noNeededResults.classList.toggle('hidden', visible > 0);
    }

    if (neededSearch) neededSearch.addEventListener('input', filterNeeded);
    neededViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            neededViewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            neededView = btn.dataset.neededView;
            filterNeeded();
        });
    });

    const clearNeededBtn = $('#clearNeededBtn');
    if (clearNeededBtn) {
        clearNeededBtn.addEventListener('click', () => {
            saveNeededState([]);
            saveFoundState([]);
            updateNeededUI();
            filterNeeded();
        });
    }

    // ---------- Blueprint Tracker ----------
    const BP_KEY = 'arcraided-blueprints';

    function getBpState() {
        try { return JSON.parse(localStorage.getItem(BP_KEY) || '[]'); } catch { return []; }
    }
    function saveBpState(ids) {
        try { localStorage.setItem(BP_KEY, JSON.stringify(ids)); } catch {}
    }

    function updateBpUI() {
        const collected = getBpState();
        const bpCards = $$('.bp-card');
        const total = bpCards.length;
        const collectedCount = bpCards.filter(c => collected.includes(c.dataset.id)).length;

        bpCards.forEach(card => {
            card.classList.toggle('is-collected', collected.includes(card.dataset.id));
        });

        const collectedEl = $('#bpCollected');
        const remainEl = $('#bpRemaining');
        const fillEl = $('#bpProgressFill');
        if (collectedEl) collectedEl.textContent = collectedCount;
        if (remainEl) remainEl.textContent = total - collectedCount;
        if (fillEl) fillEl.style.width = total > 0 ? `${(collectedCount / total * 100).toFixed(1)}%` : '0%';
    }

    const bpGrid = $('#bpGrid');
    if (bpGrid) {
        bpGrid.addEventListener('click', (e) => {
            const toggle = e.target.closest('[data-bp-toggle]');
            if (toggle) {
                const id = toggle.dataset.bpToggle;
                const state = getBpState();
                const idx = state.indexOf(id);
                if (idx > -1) state.splice(idx, 1);
                else state.push(id);
                saveBpState(state);
                updateBpUI();
            }
        });
        updateBpUI();
    }

    const bpSearch = $('#bpSearch');
    const noBpResults = $('#noBpResults');
    if (bpSearch && bpGrid) {
        bpSearch.addEventListener('input', () => {
            const query = bpSearch.value.toLowerCase().trim();
            const cards = $$('.bp-card', bpGrid);
            let visible = 0;
            cards.forEach(card => {
                const match = !query || (card.dataset.name || '').includes(query);
                card.classList.toggle('hidden', !match);
                if (match) visible++;
            });
            if (noBpResults) noBpResults.classList.toggle('hidden', visible > 0);
        });
    }

    const clearBpBtn = $('#clearBpBtn');
    if (clearBpBtn) {
        clearBpBtn.addEventListener('click', () => {
            saveBpState([]);
            updateBpUI();
        });
    }

    // ---------- Workshop Search ----------
    const workshopSearch = $('#workshopSearch');
    const workshopGrid = $('#workshopGrid');
    const noWorkshopResults = $('#noWorkshopResults');

    if (workshopSearch && workshopGrid) {
        workshopSearch.addEventListener('input', () => {
            const query = workshopSearch.value.toLowerCase().trim();
            const cards = $$('[data-name]', workshopGrid);
            let visible = 0;
            cards.forEach(card => {
                const match = !query || (card.dataset.name || '').includes(query);
                card.classList.toggle('hidden', !match);
                if (match) visible++;
            });
            if (noWorkshopResults) noWorkshopResults.classList.toggle('hidden', visible > 0);
        });
    }

    // ---------- Loadouts ----------
    const LOADOUT_KEY = 'arcraided-loadouts';

    function getLoadouts() {
        try { return JSON.parse(localStorage.getItem(LOADOUT_KEY) || '[]'); } catch { return []; }
    }
    function saveLoadouts(loadouts) {
        try { localStorage.setItem(LOADOUT_KEY, JSON.stringify(loadouts)); } catch {}
    }

    let currentLoadout = {};

    const loadoutPickerModal = $('#loadoutPickerModal');
    const loadoutPickerGrid = $('#loadoutPickerGrid');
    const loadoutPickerSearch = $('#loadoutPickerSearch');
    const closeLoadoutPicker = $('#closeLoadoutPicker');
    let pickerSlot = null;

    function openLoadoutPicker(slotName) {
        if (!loadoutPickerModal || !loadoutPickerGrid) return;
        pickerSlot = slotName;
        const mfItems = DATA.metaforge?.items || [];
        loadoutPickerGrid.innerHTML = mfItems.map(item => `
            <div class="item-card rarity-${(item.rarity || 'common').toLowerCase()}" data-id="${item.id}" data-name="${item.name.toLowerCase()}" style="cursor:pointer">
                ${item.icon ? `<img src="${item.icon}" alt="${item.name}" loading="lazy" class="item-card-icon" />` : `<div class="item-card-icon" style="display:flex;align-items:center;justify-content:center;opacity:0.3">📦</div>`}
                <div class="item-card-info">
                    <div class="item-card-name">${item.name}</div>
                    <div class="item-card-meta">
                        <span class="rarity-badge ${(item.rarity || 'common').toLowerCase()}">${item.rarity || 'common'}</span>
                        <span class="item-card-tag">${item.type}</span>
                    </div>
                </div>
            </div>
        `).join('');

        loadoutPickerModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    if (loadoutPickerGrid) {
        loadoutPickerGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            if (!card || !pickerSlot) return;
            const id = card.dataset.id;
            const mfItems = DATA.metaforge?.items || [];
            const item = mfItems.find(i => i.id === id);
            if (!item) return;
            currentLoadout[pickerSlot] = item;

            // Update slot display
            const slotEl = document.querySelector(`[data-slot-name="${pickerSlot}"]`);
            if (slotEl) {
                slotEl.innerHTML = `
                    <div style="display:flex;align-items:center;gap:.5rem;padding:.5rem">
                        ${item.icon ? `<img src="${item.icon}" style="width:36px;height:36px;border-radius:8px;object-fit:contain" />` : ''}
                        <div>
                            <div style="font-weight:700;font-size:.85rem">${item.name}</div>
                            <span class="rarity-badge ${(item.rarity || 'common').toLowerCase()}">${item.rarity}</span>
                        </div>
                    </div>
                `;
            }

            loadoutPickerModal.classList.add('hidden');
            document.body.style.overflow = '';
            pickerSlot = null;
        });
    }

    if (closeLoadoutPicker) {
        closeLoadoutPicker.addEventListener('click', () => {
            loadoutPickerModal.classList.add('hidden');
            document.body.style.overflow = '';
            pickerSlot = null;
        });
    }

    if (loadoutPickerSearch) {
        loadoutPickerSearch.addEventListener('input', () => {
            const query = loadoutPickerSearch.value.toLowerCase().trim();
            const cards = $$('.item-card', loadoutPickerGrid);
            cards.forEach(card => {
                const match = !query || (card.dataset.name || '').includes(query);
                card.classList.toggle('hidden', !match);
            });
        });
    }

    // Slot picking
    $$('.loadout-slot-picker').forEach(picker => {
        picker.addEventListener('click', () => {
            const slot = picker.dataset.slotName;
            if (slot) openLoadoutPicker(slot);
        });
    });

    // Save loadout
    const saveLoadoutBtn = $('#saveLoadoutBtn');
    const loadoutNameInput = $('#loadoutName');
    const savedLoadoutsList = $('#savedLoadoutsList');

    if (saveLoadoutBtn) {
        saveLoadoutBtn.addEventListener('click', () => {
            const name = loadoutNameInput?.value || 'Unnamed Loadout';
            const loadouts = getLoadouts();
            loadouts.push({ name, slots: { ...currentLoadout }, savedAt: new Date().toISOString() });
            saveLoadouts(loadouts);
            renderSavedLoadouts();
        });
    }

    function renderSavedLoadouts() {
        if (!savedLoadoutsList) return;
        const loadouts = getLoadouts();
        if (loadouts.length === 0) {
            savedLoadoutsList.innerHTML = '<p class="muted" style="font-size:.85rem">No saved loadouts yet. Build one above and click Save!</p>';
            return;
        }
        savedLoadoutsList.innerHTML = loadouts.map((lo, i) => `
            <div class="saved-loadout-card">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem">
                    <strong style="font-family:'Saira',system-ui;text-transform:uppercase;letter-spacing:.03em">${lo.name}</strong>
                    <button class="btn btn-ghost btn-sm" data-delete-loadout="${i}" type="button" style="font-size:.7rem;padding:.2rem .5rem">Delete</button>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:.4rem">
                    ${Object.entries(lo.slots).map(([slot, item]) => `
                        <div class="reward-chip">
                            ${item.icon ? `<img src="${item.icon}" style="width:16px;height:16px;border-radius:3px" />` : ''}
                            <span>${slot}: ${item.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        // Delete handlers
        $$('[data-delete-loadout]', savedLoadoutsList).forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.deleteLoadout, 10);
                const loadouts = getLoadouts();
                loadouts.splice(idx, 1);
                saveLoadouts(loadouts);
                renderSavedLoadouts();
            });
        });
    }

    renderSavedLoadouts();

    // New loadout button
    const newLoadoutBtn = $('#newLoadoutBtn');
    if (newLoadoutBtn) {
        newLoadoutBtn.addEventListener('click', () => {
            currentLoadout = {};
            if (loadoutNameInput) loadoutNameInput.value = 'My Loadout';
            $$('.loadout-slot-picker').forEach(picker => {
                picker.innerHTML = '<div class="loadout-slot-empty"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg><span>Click to select</span></div>';
            });
        });
    }

    // ---------- Tier Lists ----------
    const tierListContainer = $('#tierListContainer');
    const tierItemPool = $('#tierItemPool');
    const tierListCatBtns = $$('#tierListCatFilters .cat-filter');
    const TIER_KEY = 'arcraided-tierlist';

    function getTierState() {
        try { return JSON.parse(localStorage.getItem(TIER_KEY) || '{}'); } catch { return {}; }
    }
    function saveTierState(state) {
        try { localStorage.setItem(TIER_KEY, JSON.stringify(state)); } catch {}
    }

    // Drag and drop
    if (tierItemPool && tierListContainer) {
        let draggedItem = null;

        function handleDragStart(e) {
            draggedItem = e.target.closest('.tier-item');
            if (draggedItem) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', draggedItem.dataset.id);
                draggedItem.style.opacity = '0.4';
            }
        }

        function handleDragEnd() {
            if (draggedItem) draggedItem.style.opacity = '1';
            draggedItem = null;
            $$('.tier-drop-zone').forEach(z => z.classList.remove('drag-over'));
        }

        tierItemPool.addEventListener('dragstart', handleDragStart);
        tierItemPool.addEventListener('dragend', handleDragEnd);

        $$('.tier-drop-zone', tierListContainer).forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                zone.classList.add('drag-over');
            });
            zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                if (!draggedItem) return;
                // Remove placeholder
                const placeholder = zone.querySelector('.tier-placeholder');
                if (placeholder) placeholder.remove();
                zone.appendChild(draggedItem);
                draggedItem.style.opacity = '1';

                // Also make items in tiers draggable back to pool
                draggedItem.addEventListener('dragstart', handleDragStart);
                draggedItem.addEventListener('dragend', handleDragEnd);
            });
        });

        // Allow dragging back to pool
        tierItemPool.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        tierItemPool.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedItem) {
                tierItemPool.appendChild(draggedItem);
                draggedItem.style.opacity = '1';
            }
        });
    }

    // Save tier list
    const saveTierListBtn = $('#saveTierListBtn');
    if (saveTierListBtn) {
        saveTierListBtn.addEventListener('click', () => {
            const state = {};
            $$('.tier-drop-zone').forEach(zone => {
                const tier = zone.dataset.tierZone;
                state[tier] = $$('.tier-item', zone).map(el => el.dataset.id);
            });
            saveTierState(state);
        });
    }

    // Reset tier list
    const resetTierListBtn = $('#resetTierListBtn');
    if (resetTierListBtn && tierItemPool) {
        resetTierListBtn.addEventListener('click', () => {
            $$('.tier-drop-zone .tier-item').forEach(item => {
                tierItemPool.appendChild(item);
            });
            $$('.tier-drop-zone').forEach(zone => {
                if (!zone.querySelector('.tier-placeholder')) {
                    const span = document.createElement('span');
                    span.className = 'tier-placeholder';
                    span.textContent = 'Drag items here';
                    zone.appendChild(span);
                }
            });
            saveTierState({});
        });
    }

    // Restore tier list state
    if (tierItemPool && tierListContainer) {
        const state = getTierState();
        Object.entries(state).forEach(([tier, ids]) => {
            const zone = tierListContainer.querySelector(`[data-tier-zone="${tier}"]`);
            if (!zone) return;
            const placeholder = zone.querySelector('.tier-placeholder');
            if (placeholder && ids.length > 0) placeholder.remove();
            ids.forEach(id => {
                const item = tierItemPool.querySelector(`[data-id="${id}"]`) ||
                             tierListContainer.querySelector(`[data-id="${id}"]`);
                if (item) zone.appendChild(item);
            });
        });
    }

    // Tier list category filter
    tierListCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tierListCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.tierCat;
            if (!tierItemPool) return;
            const allItems = DATA.items || [];
            const filtered = cat === 'All' ? allItems : allItems.filter(i => i.category === cat);

            // Clear tiers and rebuild pool
            $$('.tier-drop-zone').forEach(zone => {
                zone.innerHTML = '<span class="tier-placeholder">Drag items here</span>';
            });

            tierItemPool.innerHTML = filtered.map(item => `
                <div class="tier-item" draggable="true" data-id="${item.id}" data-name="${item.name}" data-category="${item.category}" title="${item.name}">
                    ${item.icon ? `<img src="${resolveImg(item.icon)}" alt="${item.name}" loading="lazy" />` : `<span style="font-size:.6rem;text-align:center;line-height:1.1">${item.name.slice(0, 8)}</span>`}
                </div>
            `).join('');
        });
    });

    // ---------- Event Countdown Timers ----------
    function updateCountdowns() {
        const now = Date.now();
        $$('[data-end-ms]').forEach(el => {
            const end = parseInt(el.dataset.endMs, 10);
            const diff = end - now;
            if (diff <= 0) { el.textContent = 'Ended'; return; }
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            el.textContent = `${h}h ${m}m ${s}s`;
        });
        $$('[data-start-ms]').forEach(el => {
            const start = parseInt(el.dataset.startMs, 10);
            const diff = start - now;
            if (diff <= 0) { el.textContent = 'Started!'; return; }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            el.textContent = d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m ${s}s`;
        });
    }
    updateCountdowns();
    setInterval(updateCountdowns, 1000);

    // Restore saved source preference (must be after all const declarations)
    const savedSource = (() => { try { return localStorage.getItem('arcraided-source'); } catch { return null; } })();
    if (savedSource === 'metaforge') {
        switchSource('metaforge');
    } else {
        // Apply source-only visibility for default (ardb)
        applySourceNavVisibility('ardb');
    }
})();
