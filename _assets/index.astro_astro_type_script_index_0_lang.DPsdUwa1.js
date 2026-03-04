(function(){const ne="https://ardb.app/static",i=(e,t=document)=>t.querySelector(e),l=(e,t=document)=>[...t.querySelectorAll(e)];function v(e){return e?e.startsWith("http")?e:ne+e:""}function de(e){return e.charAt(0).toUpperCase()+e.slice(1)}function D(e){const t=e||"common";return`<span class="rarity-badge ${t}">${de(t)}</span>`}const T=i("#themeToggle");function N(e){document.documentElement.setAttribute("data-theme",e?"dark":"light"),T&&(T.textContent=e?"Light Mode":"Dark Mode");try{localStorage.setItem("theme",e?"dark":"light")}catch{}}const O=(()=>{try{return localStorage.getItem("theme")}catch{return null}})(),ce=O?O==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;N(ce),T&&T.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-theme")==="dark";N(!e)});const U=l(".nav-link"),le=l(".content");function V(e){le.forEach(t=>{t.id===e?t.style.display="":t.style.display="none"}),U.forEach(t=>{t.classList.toggle("active",t.dataset.section===e)}),window.scrollTo({top:0,behavior:"instant"})}U.forEach(e=>{e.addEventListener("click",()=>V(e.dataset.section))}),l("[data-section]").forEach(e=>{e.classList.contains("nav-link")||e.addEventListener("click",()=>{const t=e.dataset.section;t&&t!=="overview"&&V(t)})});const X=i("#productSwitcherBtn"),H=i("#productSwitcherDropdown");X&&H&&(X.addEventListener("click",e=>{e.stopPropagation(),H.classList.toggle("hidden")}),document.addEventListener("click",()=>{H.classList.add("hidden")}));const J=document.getElementById("app-data"),g=J?JSON.parse(J.dataset.payload||"{}"):{};let o="ardb";const K=l("#sourceToggle .source-btn");function Y(){return o==="metaforge"?g.metaforge?.items||[]:g.items||[]}function Z(){return o==="metaforge"?g.metaforge?.quests||[]:g.quests||[]}const oe=["hand cannon","battle rifle","assault rifle","smg","pistol","shotgun","sniper rifle","lmg"];function ee(e){const t=(e||"").toLowerCase();return oe.includes(t)?"Weapons":t==="recyclable"?"Recyclables":t==="blueprint"?"Blueprints":t==="consumable"||t==="quick use"?"Consumables":t==="modification"||t==="mod"?"Mods":t==="trinket"?"Trinkets":t.includes("material")||t==="nature"?"Materials":t==="key"?"Keys":t==="augment"||t==="ammunition"||t==="shield"||t==="special"?"Gear":"Other"}function me(e){const t=(e.rarity||"common").toLowerCase(),a=e.category||ee(e.type),s=v(e.icon),d=o==="metaforge"&&e.trader_price;return`<div class="item-card rarity-${t}" data-rarity="${t}" data-category="${a}" data-type="${e.type}" data-weapon-type="${e.type.toLowerCase()}" data-name="${e.name.toLowerCase()}" data-id="${e.id}" data-source="${o}">
            ${s?`<img src="${s}" alt="${e.name}" loading="lazy" class="item-card-icon" />`:'<div class="item-card-icon" style="display:flex;align-items:center;justify-content:center;opacity:0.3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>'}
            <div class="item-card-info">
                <div class="item-card-name">${e.name}</div>
                <div class="item-card-meta">
                    <span class="rarity-badge ${t}">${t}</span>
                    <span class="item-card-tag">${e.type}</span>
                </div>
            </div>
            ${e.value!=null&&e.value>0?`<span class="item-value">${e.value.toLocaleString()}${d?` <small style="opacity:.5">sell: ${e.trader_price.toLocaleString()}</small>`:""}</span>`:""}
        </div>`}function pe(e){if(o==="metaforge"){const a=e.image||"";return`<div class="quest-card" data-id="${e.id}" data-trader="${e.trader_name||""}" data-name="${(e.title||"").toLowerCase()}" data-maps="" data-source="metaforge">
                <div class="quest-card-img" style="border-radius:50%;">
                    ${a?`<img src="${a}" alt="${e.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />`:'<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:0.3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>'}
                </div>
                <div class="quest-card-body">
                    <div class="quest-card-title">${e.title}</div>
                    <div class="quest-card-trader">${e.trader_name||"Unknown"}</div>
                    <div class="quest-steps">
                        <span class="quest-step">${e.objectives?.length||0} objectives${e.xp?` · +${e.xp} XP`:""}${e.rewards?.length?` · ${e.rewards.length} rewards`:""}</span>
                    </div>
                </div>
            </div>`}const t=e.trader?.icon?v(e.trader.icon):"";return`<div class="quest-card" data-id="${e.id}" data-trader="${e.trader?.name??""}" data-name="${e.title.toLowerCase()}" data-maps="${e.maps?.map(a=>a.name).join(",").toLowerCase()??""}" data-source="ardb">
            <div class="quest-card-img" style="border-radius:50%;">
                ${t?`<img src="${t}" alt="${e.trader.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />`:'<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:0.3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>'}
            </div>
            <div class="quest-card-body">
                <div class="quest-card-title">${e.title}</div>
                <div class="quest-card-trader">${e.trader?.name??"Unknown"}</div>
                ${e.maps&&e.maps.length>0?`<div class="quest-card-desc">${e.maps.map(a=>a.name).join(", ")}</div>`:""}
                <div class="quest-steps">
                    <span class="quest-step">${e.steps?.length??0} steps${e.xpReward?` · +${e.xpReward} XP`:""}</span>
                </div>
            </div>
        </div>`}function ve(){if(!h)return;const e=Y();h.innerHTML=e.map(me).join(""),x.forEach(t=>{const a=t.dataset.category,s=t.querySelector(".count");if(s){const d=a==="All"?e.length:e.filter(r=>(r.category||ee(r.type))===a).length;s.textContent=d}}),f="All",I="all",w="all",x.forEach(t=>t.classList.toggle("active",t.dataset.category==="All")),_.forEach(t=>t.classList.toggle("active",t.dataset.rarity==="all")),S.forEach(t=>t.classList.toggle("active",t.dataset.weaponType==="all")),$&&$.classList.add("hidden"),y&&(y.value=""),j&&j.classList.add("hidden")}function he(){if(!u)return;const e=Z();u.innerHTML=e.map(pe).join("");const t=i("#traderFilters"),a=i("#mapFilters");o==="metaforge"?(t&&(t.style.display="none"),a&&(a.style.display="none")):(t&&(t.style.display=""),a&&(a.style.display="")),B="all",R="all",z.forEach(s=>s.classList.toggle("active",s.dataset.trader==="all")),q.forEach(s=>s.classList.toggle("active",s.dataset.map==="all")),b&&(b.value=""),A&&A.classList.add("hidden")}function te(e){if(e!==o){o=e,K.forEach(t=>t.classList.toggle("active",t.dataset.source===e)),ve(),he();try{localStorage.setItem("arcraided-source",e)}catch{}}}(()=>{try{return localStorage.getItem("arcraided-source")}catch{return null}})()==="metaforge"&&te("metaforge"),K.forEach(e=>{e.addEventListener("click",()=>te(e.dataset.source))});const y=i("#itemSearch"),h=i("#itemGrid"),x=l("#categoryFilters .cat-filter"),_=l("#rarityFilters .cat-filter"),S=l("#weaponTypeFilters .cat-filter"),$=i("#weaponTypeFilters"),j=i("#noItemResults");let f="All",I="all",w="all";function C(){if(!h)return;const e=(y?.value||"").toLowerCase().trim(),t=l(".item-card",h);let a=0;t.forEach(s=>{const d=s.dataset.name||"",r=s.dataset.type||"",n=s.dataset.category||"",c=s.dataset.rarity||"",m=s.dataset.weaponType||"",re=(!e||d.includes(e)||r.toLowerCase().includes(e))&&(f==="All"||n===f)&&(I==="all"||c===I)&&(w==="all"||f!=="Weapons"||m===w);s.classList.toggle("hidden",!re),re&&a++}),j&&j.classList.toggle("hidden",a>0)}y&&y.addEventListener("input",C),x.forEach(e=>{e.addEventListener("click",()=>{x.forEach(t=>t.classList.remove("active")),e.classList.add("active"),f=e.dataset.category,$&&(f==="Weapons"?$.classList.remove("hidden"):($.classList.add("hidden"),w="all",S.forEach(t=>t.classList.toggle("active",t.dataset.weaponType==="all")))),C()})}),_.forEach(e=>{e.addEventListener("click",()=>{_.forEach(t=>t.classList.remove("active")),e.classList.add("active"),I=e.dataset.rarity,C()})}),S.forEach(e=>{e.addEventListener("click",()=>{S.forEach(t=>t.classList.remove("active")),e.classList.add("active"),w=e.dataset.weaponType,C()})});const L=i("#itemModal"),fe=i("#closeItemModalBtn"),ae=i("#modalItemDetails");function ue(e){const a=Y().find(n=>n.id===e);if(!a||!L||!ae)return;const s=v(a.icon),d=o==="metaforge";let r="";if(d&&a.stat_block){const n=a.stat_block,c=Object.entries(n).filter(([m,p])=>p&&p!==0&&p!==""&&m!=="value");c.length>0&&(r=`<div class="detail-stats-grid">${c.map(([p,M])=>`
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${M}</div>
                        <div class="detail-stat-label">${p.replace(/([A-Z])/g," $1").trim()}</div>
                    </div>
                `).join("")}</div>`)}r||(r=`
                <div class="detail-stats-grid">
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${a.value!=null?a.value.toLocaleString():"—"}</div>
                        <div class="detail-stat-label">Value</div>
                    </div>
                    ${d&&a.trader_price?`
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${a.trader_price.toLocaleString()}</div>
                        <div class="detail-stat-label">Trader Price</div>
                    </div>
                    `:""}
                    ${a.foundIn&&a.foundIn.length>0?`
                    <div class="detail-stat-card" style="grid-column:span 2">
                        <div class="detail-stat-value" style="font-size:1rem">${Array.isArray(a.foundIn)?a.foundIn.join(", "):a.foundIn}</div>
                        <div class="detail-stat-label">Found In</div>
                    </div>
                    `:""}
                </div>
            `),ae.innerHTML=`
            <div class="detail-header">
                <div class="detail-portrait">
                    ${s?`<img src="${s}" alt="${a.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:""}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${a.name}</h3>
                    <div class="detail-tags">
                        ${D(a.rarity)}
                        <span class="item-card-tag">${a.type}</span>
                        ${a.category?`<span class="item-card-tag">${a.category}</span>`:""}
                    </div>
                    <span class="source-badge ${o}">${o==="metaforge"?"MetaForge":"ARDB"}</span>
                </div>
            </div>
            <p class="detail-desc">${a.description||"No description available."}</p>
            ${r}
        `,L.classList.remove("hidden"),L.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}h&&h.addEventListener("click",e=>{const t=e.target.closest(".item-card");t&&ue(t.dataset.id)});const F=i("#enemySearch"),Q=i("#enemyGrid"),se=i("#noEnemyResults"),E=i("#enemyModal"),ge=i("#closeEnemyModalBtn"),ie=i("#modalEnemyDetails");F&&F.addEventListener("input",()=>{const e=F.value.toLowerCase().trim(),t=l(".enemy-card",Q);let a=0;t.forEach(s=>{const d=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!d),d&&a++}),se&&se.classList.toggle("hidden",a>0)});function ye(e){const t=(g.enemies||[]).find(r=>r.id===e);if(!t||!E||!ie)return;const a=v(t.image)||v(t.icon);let s="";t.dropTable&&t.dropTable.length>0&&(s=`
                <div class="drop-table">
                    <h4>Drop Table</h4>
                    <div class="drop-list">${t.dropTable.map(n=>`
                <div class="drop-item">
                    ${n.icon?`<img src="${v(n.icon)}" alt="${n.name}" class="drop-item-icon" />`:""}
                    <span class="drop-item-name">${n.name}</span>
                    ${D(n.rarity)}
                </div>
            `).join("")}</div>
                </div>
            `);let d="";t.relatedMaps&&t.relatedMaps.length>0&&(d=`
                <div style="margin-top:1rem">
                    <h4 style="font-family:'Saira',system-ui,sans-serif;font-weight:700;font-size:.9rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 .5rem">Spawn Maps</h4>
                    <div class="rewards-list">
                        ${t.relatedMaps.map(r=>`<span class="reward-chip">${r}</span>`).join("")}
                    </div>
                </div>
            `),ie.innerHTML=`
            <div class="detail-header">
                <div class="detail-portrait" style="width:120px;height:120px;">
                    ${a?`<img src="${a}" alt="${t.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:""}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${t.name}</h3>
                    <p class="detail-desc">${t.description||"No description available."}</p>
                </div>
            </div>
            ${d}
            ${s}
        `,E.classList.remove("hidden"),E.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}Q&&Q.addEventListener("click",e=>{const t=e.target.closest(".enemy-card");t&&ye(t.dataset.id)});const b=i("#questSearch"),u=i("#questList"),z=l("#traderFilters .cat-filter"),q=l("#mapFilters .cat-filter"),A=i("#noQuestResults"),k=i("#questModal"),$e=i("#closeQuestModalBtn"),P=i("#modalQuestDetails");let B="all",R="all";function W(){if(!u)return;const e=(b?.value||"").toLowerCase().trim(),t=l(".quest-card",u);let a=0;t.forEach(s=>{const d=s.dataset.name||"",r=s.dataset.trader||"",n=s.dataset.maps||"",c=!e||d.includes(e)||r.toLowerCase().includes(e)||n.includes(e),m=B==="all"||r===B,p=R==="all"||n.includes(R.toLowerCase()),M=c&&m&&p;s.classList.toggle("hidden",!M),M&&a++}),A&&A.classList.toggle("hidden",a>0)}b&&b.addEventListener("input",W),z.forEach(e=>{e.addEventListener("click",()=>{z.forEach(t=>t.classList.remove("active")),e.classList.add("active"),B=e.dataset.trader,W()})}),q.forEach(e=>{e.addEventListener("click",()=>{q.forEach(t=>t.classList.remove("active")),e.classList.add("active"),R=e.dataset.map,W()})});function we(e){const a=Z().find(s=>s.id===e);if(!(!a||!k||!P)){if(o==="metaforge"){let s="";a.objectives&&a.objectives.length>0&&(s=`<div class="drop-table"><h4>Objectives</h4><div class="drop-list">${a.objectives.map((c,m)=>`
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${m+1}</div>
                        <span class="drop-item-name">${c}</span>
                    </div>
                `).join("")}</div></div>`);let d="";a.rewards&&a.rewards.length>0&&(d=`<div class="drop-table"><h4>Rewards</h4><div class="drop-list">${a.rewards.map(c=>`
                    <div class="drop-item">
                        ${c.item?.icon?`<img src="${c.item.icon}" alt="${c.item.name}" class="drop-item-icon" />`:""}
                        <span class="drop-item-name">${c.item?.name||c.item_id} x${c.quantity}</span>
                        ${c.item?.rarity?D(c.item.rarity):""}
                    </div>
                `).join("")}</div></div>`);let r="";a.guide_links&&a.guide_links.length>0&&(r=`<div class="rewards-list" style="margin-top:1rem">${a.guide_links.map(n=>`<a href="${n.url}" target="_blank" rel="noopener noreferrer" class="reward-chip" style="text-decoration:none">${n.label}</a>`).join("")}</div>`),P.innerHTML=`
                <div class="detail-header">
                    <div class="detail-portrait" style="border-radius:12px;">
                        ${a.image?`<img src="${a.image}" alt="${a.title}" style="width:100%;height:100%;object-fit:cover;" />`:""}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${a.title}</h3>
                        <div class="detail-tags">
                            <span class="rarity-badge epic">${a.trader_name||"Unknown"}</span>
                            ${a.xp?`<span class="reward-chip">+${a.xp} XP</span>`:""}
                        </div>
                        <span class="source-badge metaforge">MetaForge</span>
                    </div>
                </div>
                ${s}
                ${d}
                ${r}
            `}else{const s=a.trader?.icon?v(a.trader.icon):"";let d="";a.steps&&a.steps.length>0&&(d=`<div class="drop-table"><h4>Steps</h4><div class="drop-list">${a.steps.map((c,m)=>`
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${m+1}</div>
                        <span class="drop-item-name">${c.title}</span>
                        ${c.amount?`<span class="item-card-tag">x${c.amount}</span>`:""}
                    </div>
                `).join("")}</div></div>`);let r="";a.maps&&a.maps.length>0&&(r=`<div class="rewards-list" style="margin-top:1rem">${a.maps.map(n=>`<span class="reward-chip">${n.name||n}</span>`).join("")}</div>`),P.innerHTML=`
                <div class="detail-header">
                    <div class="detail-portrait" style="border-radius:50%;">
                        ${s?`<img src="${s}" alt="${a.trader.name}" style="width:100%;height:100%;object-fit:cover;" />`:""}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${a.title}</h3>
                        <div class="detail-tags">
                            <span class="rarity-badge epic">${a.trader?.name||"Unknown"}</span>
                            ${a.xpReward?`<span class="reward-chip">+${a.xpReward} XP</span>`:""}
                        </div>
                        <span class="source-badge ardb">ARDB</span>
                    </div>
                </div>
                <p class="detail-desc">${a.description||"No description available."}</p>
                ${r}
                ${d}
            `}k.classList.remove("hidden"),k.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}}u&&u.addEventListener("click",e=>{const t=e.target.closest(".quest-card");t&&we(t.dataset.id)});function G(){[L,E,k].forEach(e=>{e&&(e.classList.add("hidden"),e.setAttribute("aria-hidden","true"))}),document.body.style.overflow=""}[fe,ge,$e].forEach(e=>{e&&e.addEventListener("click",G)}),[L,E,k].forEach(e=>{e&&e.addEventListener("click",t=>{t.target===e&&G()})}),document.addEventListener("keydown",e=>{e.key==="Escape"&&G()})})();
