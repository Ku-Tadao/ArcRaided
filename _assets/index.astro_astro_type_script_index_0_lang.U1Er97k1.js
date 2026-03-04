(function(){const V="https://ardb.app/static",s=(e,t=document)=>t.querySelector(e),o=(e,t=document)=>[...t.querySelectorAll(e)];function r(e){return e?e.startsWith("http")?e:V+e:""}function W(e){return e.charAt(0).toUpperCase()+e.slice(1)}function B(e){const t=e||"common";return`<span class="rarity-badge ${t}">${W(t)}</span>`}const v=s("#themeToggle");function q(e){document.documentElement.setAttribute("data-theme",e?"dark":"light"),v&&(v.textContent=e?"Light Mode":"Dark Mode");try{localStorage.setItem("theme",e?"dark":"light")}catch{}}const x=(()=>{try{return localStorage.getItem("theme")}catch{return null}})(),X=x?x==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;q(X),v&&v.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-theme")==="dark";q(!e)});const A=o(".nav-link"),_=o(".content");function D(e){_.forEach(t=>{t.id===e?t.style.display="":t.style.display="none"}),A.forEach(t=>{t.classList.toggle("active",t.dataset.section===e)}),window.scrollTo({top:0,behavior:"instant"})}A.forEach(e=>{e.addEventListener("click",()=>D(e.dataset.section))}),o("[data-section]").forEach(e=>{e.classList.contains("nav-link")||e.addEventListener("click",()=>{const t=e.dataset.section;t&&t!=="overview"&&D(t)})});const Q=s("#productSwitcherBtn"),y=s("#productSwitcherDropdown");Q&&y&&(Q.addEventListener("click",e=>{e.stopPropagation(),y.classList.toggle("hidden")}),document.addEventListener("click",()=>{y.classList.add("hidden")}));const R=document.getElementById("app-data"),g=R?JSON.parse(R.dataset.payload||"{}"):{},L=s("#itemSearch"),p=s("#itemGrid"),C=o("#categoryFilters .cat-filter"),j=o("#rarityFilters .cat-filter"),H=s("#noItemResults");let $="All",E="all";function w(){if(!p)return;const e=(L?.value||"").toLowerCase().trim(),t=o(".item-card",p);let i=0;t.forEach(a=>{const d=a.dataset.name||"",n=a.dataset.type||"",c=a.dataset.category||"",f=a.dataset.rarity||"",O=(!e||d.includes(e)||n.toLowerCase().includes(e))&&($==="All"||c===$)&&(E==="all"||f===E);a.classList.toggle("hidden",!O),O&&i++}),H&&H.classList.toggle("hidden",i>0)}L&&L.addEventListener("input",w),C.forEach(e=>{e.addEventListener("click",()=>{C.forEach(t=>t.classList.remove("active")),e.classList.add("active"),$=e.dataset.category,w()})}),j.forEach(e=>{e.addEventListener("click",()=>{j.forEach(t=>t.classList.remove("active")),e.classList.add("active"),E=e.dataset.rarity,w()})});const l=s("#itemModal"),K=s("#closeItemModalBtn"),z=s("#modalItemDetails");function Y(e){const t=(g.items||[]).find(a=>a.id===e);if(!t||!l||!z)return;const i=r(t.icon);z.innerHTML=`
            <div class="detail-header">
                <div class="detail-portrait">
                    ${i?`<img src="${i}" alt="${t.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:""}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${t.name}</h3>
                    <div class="detail-tags">
                        ${B(t.rarity)}
                        <span class="item-card-tag">${t.type}</span>
                        ${t.category?`<span class="item-card-tag">${t.category}</span>`:""}
                    </div>
                </div>
            </div>
            <p class="detail-desc">${t.description||"No description available."}</p>
            <div class="detail-stats-grid">
                <div class="detail-stat-card">
                    <div class="detail-stat-value">${t.value!=null?t.value.toLocaleString():"—"}</div>
                    <div class="detail-stat-label">Value</div>
                </div>
                ${t.foundIn&&t.foundIn.length>0?`
                <div class="detail-stat-card" style="grid-column:span 2">
                    <div class="detail-stat-value" style="font-size:1rem">${t.foundIn.join(", ")}</div>
                    <div class="detail-stat-label">Found In</div>
                </div>
                `:""}
            </div>
        `,l.classList.remove("hidden"),l.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}p&&p.addEventListener("click",e=>{const t=e.target.closest(".item-card");t&&Y(t.dataset.id)});const M=s("#enemySearch"),b=s("#enemyGrid"),F=s("#noEnemyResults"),m=s("#enemyModal"),Z=s("#closeEnemyModalBtn"),G=s("#modalEnemyDetails");M&&M.addEventListener("input",()=>{const e=M.value.toLowerCase().trim(),t=o(".enemy-card",b);let i=0;t.forEach(a=>{const d=!e||(a.dataset.name||"").includes(e);a.classList.toggle("hidden",!d),d&&i++}),F&&F.classList.toggle("hidden",i>0)});function tt(e){const t=(g.enemies||[]).find(n=>n.id===e);if(!t||!m||!G)return;const i=r(t.image)||r(t.icon);let a="";t.dropTable&&t.dropTable.length>0&&(a=`
                <div class="drop-table">
                    <h4>Drop Table</h4>
                    <div class="drop-list">${t.dropTable.map(c=>`
                <div class="drop-item">
                    ${c.icon?`<img src="${r(c.icon)}" alt="${c.name}" class="drop-item-icon" />`:""}
                    <span class="drop-item-name">${c.name}</span>
                    ${B(c.rarity)}
                </div>
            `).join("")}</div>
                </div>
            `);let d="";t.relatedMaps&&t.relatedMaps.length>0&&(d=`
                <div style="margin-top:1rem">
                    <h4 style="font-family:'Saira',system-ui,sans-serif;font-weight:700;font-size:.9rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 .5rem">Spawn Maps</h4>
                    <div class="rewards-list">
                        ${t.relatedMaps.map(n=>`<span class="reward-chip">${n}</span>`).join("")}
                    </div>
                </div>
            `),G.innerHTML=`
            <div class="detail-header">
                <div class="detail-portrait" style="width:120px;height:120px;">
                    ${i?`<img src="${i}" alt="${t.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:""}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${t.name}</h3>
                    <p class="detail-desc">${t.description||"No description available."}</p>
                </div>
            </div>
            ${d}
            ${a}
        `,m.classList.remove("hidden"),m.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}b&&b.addEventListener("click",e=>{const t=e.target.closest(".enemy-card");t&&tt(t.dataset.id)});const k=s("#questSearch"),u=s("#questList"),N=o("#traderFilters .cat-filter"),P=s("#noQuestResults"),h=s("#questModal"),et=s("#closeQuestModalBtn"),U=s("#modalQuestDetails");let S="all";function J(){if(!u)return;const e=(k?.value||"").toLowerCase().trim(),t=o(".quest-card",u);let i=0;t.forEach(a=>{const d=a.dataset.name||"",n=a.dataset.trader||"",c=a.dataset.maps||"",I=(!e||d.includes(e)||n.toLowerCase().includes(e)||c.includes(e))&&(S==="all"||n===S);a.classList.toggle("hidden",!I),I&&i++}),P&&P.classList.toggle("hidden",i>0)}k&&k.addEventListener("input",J),N.forEach(e=>{e.addEventListener("click",()=>{N.forEach(t=>t.classList.remove("active")),e.classList.add("active"),S=e.dataset.trader,J()})});function st(e){const t=(g.quests||[]).find(n=>n.id===e);if(!t||!h||!U)return;const i=t.trader?.icon?r(t.trader.icon):"";let a="";t.steps&&t.steps.length>0&&(a=`
                <div class="drop-table">
                    <h4>Steps</h4>
                    <div class="drop-list">${t.steps.map((c,f)=>`
                <div class="drop-item">
                    <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                        ${f+1}
                    </div>
                    <span class="drop-item-name">${c.title}</span>
                    ${c.amount?`<span class="item-card-tag">x${c.amount}</span>`:""}
                </div>
            `).join("")}</div>
                </div>
            `);let d="";t.maps&&t.maps.length>0&&(d=`
                <div class="rewards-list" style="margin-top:1rem">
                    ${t.maps.map(n=>`<span class="reward-chip">${n.name||n}</span>`).join("")}
                </div>
            `),U.innerHTML=`
            <div class="detail-header">
                <div class="detail-portrait" style="border-radius:50%;">
                    ${i?`<img src="${i}" alt="${t.trader.name}" style="width:100%;height:100%;object-fit:cover;" />`:""}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${t.title}</h3>
                    <div class="detail-tags">
                        <span class="rarity-badge epic">${t.trader?.name||"Unknown"}</span>
                        ${t.xpReward?`<span class="reward-chip">+${t.xpReward} XP</span>`:""}
                    </div>
                </div>
            </div>
            <p class="detail-desc">${t.description||"No description available."}</p>
            ${d}
            ${a}
        `,h.classList.remove("hidden"),h.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}u&&u.addEventListener("click",e=>{const t=e.target.closest(".quest-card");t&&st(t.dataset.id)});function T(){[l,m,h].forEach(e=>{e&&(e.classList.add("hidden"),e.setAttribute("aria-hidden","true"))}),document.body.style.overflow=""}[K,Z,et].forEach(e=>{e&&e.addEventListener("click",T)}),[l,m,h].forEach(e=>{e&&e.addEventListener("click",t=>{t.target===e&&T()})}),document.addEventListener("keydown",e=>{e.key==="Escape"&&T()})})();
