(function(){const tt="https://ardb.app/static",a=(e,t=document)=>t.querySelector(e),o=(e,t=document)=>[...t.querySelectorAll(e)];function l(e){return e?e.startsWith("http")?e:tt+e:""}function et(e){return e.charAt(0).toUpperCase()+e.slice(1)}function C(e){const t=e||"common";return`<span class="rarity-badge ${t}">${et(t)}</span>`}const u=a("#themeToggle");function Q(e){document.documentElement.setAttribute("data-theme",e?"dark":"light"),u&&(u.textContent=e?"Light Mode":"Dark Mode");try{localStorage.setItem("theme",e?"dark":"light")}catch{}}const j=(()=>{try{return localStorage.getItem("theme")}catch{return null}})(),at=j?j==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;Q(at),u&&u.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-theme")==="dark";Q(!e)});const F=o(".nav-link"),st=o(".content");function H(e){st.forEach(t=>{t.id===e?t.style.display="":t.style.display="none"}),F.forEach(t=>{t.classList.toggle("active",t.dataset.section===e)}),window.scrollTo({top:0,behavior:"instant"})}F.forEach(e=>{e.addEventListener("click",()=>H(e.dataset.section))}),o("[data-section]").forEach(e=>{e.classList.contains("nav-link")||e.addEventListener("click",()=>{const t=e.dataset.section;t&&t!=="overview"&&H(t)})});const W=a("#productSwitcherBtn"),E=a("#productSwitcherDropdown");W&&E&&(W.addEventListener("click",e=>{e.stopPropagation(),E.classList.toggle("hidden")}),document.addEventListener("click",()=>{E.classList.add("hidden")}));const z=document.getElementById("app-data"),w=z?JSON.parse(z.dataset.payload||"{}"):{},$=a("#itemSearch"),f=a("#itemGrid"),G=o("#categoryFilters .cat-filter"),N=o("#rarityFilters .cat-filter"),M=o("#weaponTypeFilters .cat-filter"),T=a("#weaponTypeFilters"),P=a("#noItemResults");let r="All",k="all",y="all";function g(){if(!f)return;const e=($?.value||"").toLowerCase().trim(),t=o(".item-card",f);let i=0;t.forEach(s=>{const d=s.dataset.name||"",n=s.dataset.type||"",c=s.dataset.category||"",h=s.dataset.rarity||"",D=s.dataset.weaponType||"",Z=(!e||d.includes(e)||n.toLowerCase().includes(e))&&(r==="All"||c===r)&&(k==="all"||h===k)&&(y==="all"||r!=="Weapons"||D===y);s.classList.toggle("hidden",!Z),Z&&i++}),P&&P.classList.toggle("hidden",i>0)}$&&$.addEventListener("input",g),G.forEach(e=>{e.addEventListener("click",()=>{G.forEach(t=>t.classList.remove("active")),e.classList.add("active"),r=e.dataset.category,T&&(r==="Weapons"?T.classList.remove("hidden"):(T.classList.add("hidden"),y="all",M.forEach(t=>t.classList.toggle("active",t.dataset.weaponType==="all")))),g()})}),N.forEach(e=>{e.addEventListener("click",()=>{N.forEach(t=>t.classList.remove("active")),e.classList.add("active"),k=e.dataset.rarity,g()})}),M.forEach(e=>{e.addEventListener("click",()=>{M.forEach(t=>t.classList.remove("active")),e.classList.add("active"),y=e.dataset.weaponType,g()})});const m=a("#itemModal"),it=a("#closeItemModalBtn"),U=a("#modalItemDetails");function nt(e){const t=(w.items||[]).find(s=>s.id===e);if(!t||!m||!U)return;const i=l(t.icon);U.innerHTML=`
            <div class="detail-header">
                <div class="detail-portrait">
                    ${i?`<img src="${i}" alt="${t.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:""}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${t.name}</h3>
                    <div class="detail-tags">
                        ${C(t.rarity)}
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
        `,m.classList.remove("hidden"),m.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}f&&f.addEventListener("click",e=>{const t=e.target.closest(".item-card");t&&nt(t.dataset.id)});const b=a("#enemySearch"),S=a("#enemyGrid"),J=a("#noEnemyResults"),p=a("#enemyModal"),ct=a("#closeEnemyModalBtn"),O=a("#modalEnemyDetails");b&&b.addEventListener("input",()=>{const e=b.value.toLowerCase().trim(),t=o(".enemy-card",S);let i=0;t.forEach(s=>{const d=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!d),d&&i++}),J&&J.classList.toggle("hidden",i>0)});function dt(e){const t=(w.enemies||[]).find(n=>n.id===e);if(!t||!p||!O)return;const i=l(t.image)||l(t.icon);let s="";t.dropTable&&t.dropTable.length>0&&(s=`
                <div class="drop-table">
                    <h4>Drop Table</h4>
                    <div class="drop-list">${t.dropTable.map(c=>`
                <div class="drop-item">
                    ${c.icon?`<img src="${l(c.icon)}" alt="${c.name}" class="drop-item-icon" />`:""}
                    <span class="drop-item-name">${c.name}</span>
                    ${C(c.rarity)}
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
            `),O.innerHTML=`
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
            ${s}
        `,p.classList.remove("hidden"),p.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}S&&S.addEventListener("click",e=>{const t=e.target.closest(".enemy-card");t&&dt(t.dataset.id)});const I=a("#questSearch"),L=a("#questList"),V=o("#traderFilters .cat-filter"),X=o("#mapFilters .cat-filter"),_=a("#noQuestResults"),v=a("#questModal"),ot=a("#closeQuestModalBtn"),K=a("#modalQuestDetails");let B="all",q="all";function x(){if(!L)return;const e=(I?.value||"").toLowerCase().trim(),t=o(".quest-card",L);let i=0;t.forEach(s=>{const d=s.dataset.name||"",n=s.dataset.trader||"",c=s.dataset.maps||"",h=!e||d.includes(e)||n.toLowerCase().includes(e)||c.includes(e),D=B==="all"||n===B,Y=q==="all"||c.includes(q.toLowerCase()),R=h&&D&&Y;s.classList.toggle("hidden",!R),R&&i++}),_&&_.classList.toggle("hidden",i>0)}I&&I.addEventListener("input",x),V.forEach(e=>{e.addEventListener("click",()=>{V.forEach(t=>t.classList.remove("active")),e.classList.add("active"),B=e.dataset.trader,x()})}),X.forEach(e=>{e.addEventListener("click",()=>{X.forEach(t=>t.classList.remove("active")),e.classList.add("active"),q=e.dataset.map,x()})});function lt(e){const t=(w.quests||[]).find(n=>n.id===e);if(!t||!v||!K)return;const i=t.trader?.icon?l(t.trader.icon):"";let s="";t.steps&&t.steps.length>0&&(s=`
                <div class="drop-table">
                    <h4>Steps</h4>
                    <div class="drop-list">${t.steps.map((c,h)=>`
                <div class="drop-item">
                    <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                        ${h+1}
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
            `),K.innerHTML=`
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
            ${s}
        `,v.classList.remove("hidden"),v.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}L&&L.addEventListener("click",e=>{const t=e.target.closest(".quest-card");t&&lt(t.dataset.id)});function A(){[m,p,v].forEach(e=>{e&&(e.classList.add("hidden"),e.setAttribute("aria-hidden","true"))}),document.body.style.overflow=""}[it,ct,ot].forEach(e=>{e&&e.addEventListener("click",A)}),[m,p,v].forEach(e=>{e&&e.addEventListener("click",t=>{t.target===e&&A()})}),document.addEventListener("keydown",e=>{e.key==="Escape"&&A()})})();
