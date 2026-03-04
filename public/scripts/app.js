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
        return `<span class="reward-chip" style="background:var(--rarity-${r});color:#000;font-weight:600;">${capitalize(r)}</span>`;
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
    const sections = $$('.section');

    function showSection(name) {
        sections.forEach(s => {
            const match = s.dataset.section === name;
            s.classList.toggle('hidden', !match);
        });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.dataset.section === name);
        });
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => showSection(link.dataset.section));
    });

    // Quick link navigation (overview cards)
    $$('[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => showSection(btn.dataset.goto));
    });

    // ---------- Product Switcher ----------
    const switcherBtn = $('#productSwitcherBtn');
    const switcherDropdown = $('#productDropdown');

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
    const DATA = window.__ARCRAIDED_DATA__ || { items: [], enemies: [], quests: [] };

    // ---------- Items: Search & Filter ----------
    const itemSearch = $('#itemSearch');
    const itemGrid = $('#itemGrid');
    const categoryBtns = $$('#categoryFilters .filter-btn');
    const rarityBtns = $$('#rarityFilters .filter-btn');
    const noItemResults = $('#noItemResults');

    let activeCategory = 'All';
    let activeRarity = 'all';

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

            const matchQuery = !query || name.includes(query) || type.includes(query);
            const matchCat = activeCategory === 'All' || cat === activeCategory;
            const matchRarity = activeRarity === 'all' || rarity === activeRarity;

            const show = matchQuery && matchCat && matchRarity;
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

    // ---------- Items: Modal ----------
    const itemModal = $('#itemModal');
    const itemModalClose = $('#itemModalClose');
    const modalItemDetails = $('#modalItemDetails');

    function openItemModal(itemId) {
        const item = DATA.items.find(i => i.id === itemId);
        if (!item || !itemModal || !modalItemDetails) return;

        const imgSrc = resolveImg(item.icon);

        modalItemDetails.innerHTML = `
            <div class="detail-header">
                <div class="detail-portrait">
                    ${imgSrc ? `<img src="${imgSrc}" alt="${item.name}" width="96" height="96" />` : ''}
                </div>
                <div class="detail-info">
                    <h3>${item.name}</h3>
                    <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
                        ${rarityBadge(item.rarity)}
                        <span class="reward-chip">${item.type}</span>
                        ${item.category ? `<span class="reward-chip">${item.category}</span>` : ''}
                    </div>
                </div>
            </div>
            <p style="color:var(--text-secondary);margin:1rem 0;line-height:1.6;">
                ${item.description || 'No description available.'}
            </p>
            <div class="detail-stats">
                <div class="detail-stat">
                    <span class="detail-stat-label">Value</span>
                    <span class="detail-stat-value">${item.value != null ? item.value.toLocaleString() : '—'}</span>
                </div>
                ${item.foundIn && item.foundIn.length > 0 ? `
                <div class="detail-stat">
                    <span class="detail-stat-label">Found In</span>
                    <span class="detail-stat-value">${item.foundIn.join(', ')}</span>
                </div>
                ` : ''}
            </div>
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
    const enemyModalClose = $('#enemyModalClose');
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
        const enemy = DATA.enemies.find(e => e.id === enemyId);
        if (!enemy || !enemyModal || !modalEnemyDetails) return;

        const imgSrc = resolveImg(enemy.image) || resolveImg(enemy.icon);

        let dropTableHTML = '';
        if (enemy.dropTable && enemy.dropTable.length > 0) {
            const rows = enemy.dropTable.map(drop => `
                <div class="drop-row">
                    <div class="drop-row-icon">
                        ${drop.icon ? `<img src="${resolveImg(drop.icon)}" alt="${drop.name}" width="32" height="32" />` : ''}
                    </div>
                    <div class="drop-row-info">
                        <span class="drop-row-name">${drop.name}</span>
                        <span class="drop-row-type">${drop.type || ''}</span>
                    </div>
                    <div>${rarityBadge(drop.rarity)}</div>
                </div>
            `).join('');
            dropTableHTML = `
                <div class="section-header" style="margin-top:1.5rem;">
                    <h4>Drop Table</h4>
                </div>
                <div class="drop-table">${rows}</div>
            `;
        }

        modalEnemyDetails.innerHTML = `
            <div class="detail-header">
                <div class="detail-portrait" style="width:140px;height:140px;">
                    ${imgSrc ? `<img src="${imgSrc}" alt="${enemy.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />` : ''}
                </div>
                <div class="detail-info">
                    <h3>${enemy.name}</h3>
                    <p style="color:var(--text-secondary);line-height:1.6;margin-top:0.5rem;">
                        ${enemy.description || 'No description available.'}
                    </p>
                </div>
            </div>
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
    const traderBtns = $$('#traderFilters .filter-btn');
    const noQuestResults = $('#noQuestResults');
    const questModal = $('#questModal');
    const questModalClose = $('#questModalClose');
    const modalQuestDetails = $('#modalQuestDetails');

    let activeTrader = 'all';

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

            const show = matchQuery && matchTrader;
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

    function openQuestModal(questId) {
        const quest = DATA.quests.find(q => q.id === questId);
        if (!quest || !questModal || !modalQuestDetails) return;

        const traderIcon = quest.trader?.icon ? resolveImg(quest.trader.icon) : '';
        const traderImage = quest.trader?.image ? resolveImg(quest.trader.image) : '';

        let stepsHTML = '';
        if (quest.steps && quest.steps.length > 0) {
            const stepsItems = quest.steps.map((step, i) => `
                <div class="drop-row">
                    <div class="drop-row-icon" style="background:var(--brand);color:#000;font-weight:700;font-size:0.8rem;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;">
                        ${i + 1}
                    </div>
                    <div class="drop-row-info">
                        <span class="drop-row-name">${step.title}</span>
                        ${step.amount ? `<span class="drop-row-type">Amount: ${step.amount}</span>` : ''}
                    </div>
                </div>
            `).join('');
            stepsHTML = `
                <div class="section-header" style="margin-top:1.5rem;">
                    <h4>Steps</h4>
                </div>
                <div class="drop-table">${stepsItems}</div>
            `;
        }

        let mapsHTML = '';
        if (quest.maps && quest.maps.length > 0) {
            mapsHTML = `
                <div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
                    ${quest.maps.map(m => `<span class="reward-chip">${m.name}</span>`).join('')}
                </div>
            `;
        }

        modalQuestDetails.innerHTML = `
            <div class="detail-header">
                <div class="detail-portrait" style="border-radius:50%;">
                    ${traderIcon ? `<img src="${traderIcon}" alt="${quest.trader.name}" style="width:100%;height:100%;object-fit:cover;" />` : ''}
                </div>
                <div class="detail-info">
                    <h3>${quest.title}</h3>
                    <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;margin-top:0.25rem;">
                        <span class="reward-chip" style="background:var(--brand);color:#000;font-weight:600;">${quest.trader?.name || 'Unknown'}</span>
                        ${quest.xpReward ? `<span class="reward-chip">+${quest.xpReward} XP</span>` : ''}
                    </div>
                </div>
            </div>
            <p style="color:var(--text-secondary);margin:1rem 0;line-height:1.6;">
                ${quest.description || 'No description available.'}
            </p>
            ${mapsHTML}
            ${stepsHTML}
        `;

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

    [itemModalClose, enemyModalClose, questModalClose].forEach(btn => {
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
