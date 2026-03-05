function g(e,t){try{const a=localStorage.getItem(e);if(!a)return t;const s=JSON.parse(a);return s&&typeof s=="object"&&s._v?s._v!=="1.0"?(console.warn(`[ArcRaided] Store version mismatch for ${e}. Clearing cache.`),localStorage.removeItem(e),t):s.data:s}catch{return t}}function y(e,t){try{const a={_v:"1.0",data:t};localStorage.setItem(e,JSON.stringify(a))}catch{console.warn(`[ArcRaided] Failed to save store ${e}`)}}function St(e){return(e.rarity||"common").toLowerCase()}function Mt(e,t="ardb",a){const s=St(e);let i=e.category||"Other";if(!e.category&&e.type){const v=e.type.toLowerCase();["consumable","medical","throwable"].includes(v)?i="Consumables":["weapon","attachment","ammo"].includes(v)?i="Weapons":["armor","helmet","backpack","rig"].includes(v)&&(i="Gear")}const n="https://ardb.app/static",o=(v=>v?v.startsWith("http")?v:n+v:"")(e.icon),l=t==="metaforge"&&e.trader_price,h=a&&i==="Weapons"?a(e.name):"";return`
        <div class="item-card rarity-${s}" data-rarity="${s}" data-category="${i}" data-type="${e.type||""}" data-weapon-type="${e.type?e.type.toLowerCase():""}" data-name="${e.name.toLowerCase()}" data-id="${e.id}" data-source="${t}">
            <div class="rarity-image-wrap item-card-image-wrap">
                <div class="rarity-curve"></div>
                ${o?`<img src="${o}" alt="${e.name}" loading="lazy" class="item-img" />`:`<div style="display:flex;align-items:center;justify-content:center;opacity:0.3;width:100%;height:100%;z-index:2">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                       </div>`}
                ${e.value!=null&&e.value>0?`<div class="item-value-badge">${e.value.toLocaleString()}${l?` <span style="opacity:.6">S: ${e.trader_price.toLocaleString()}</span>`:""}</div>`:""}
            </div>
            <div class="item-card-footer">
                ${h?`<span class="item-type-icon">${h}</span>`:'<span class="item-type-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></span>'}
                <span class="item-card-name">${e.name}</span>
            </div>
        </div>
    `}const Tt="https://ardb.app/static",r=(e,t=document)=>t.querySelector(e),c=(e,t=document)=>[...t.querySelectorAll(e)];function u(e){return e?e.startsWith("http")?e:Tt+e:""}function Bt(e){return e.charAt(0).toUpperCase()+e.slice(1)}function xe(e){const t=e||"common";return`<span class="rarity-badge ${t}">${Bt(t)}</span>`}const q=r("#themeToggle");function rt(e){document.documentElement.setAttribute("data-theme",e?"dark":"light"),q&&(q.textContent=e?"Light Mode":"Dark Mode"),y("theme",e?"dark":"light")}const Ie=g("theme",null),It=Ie?Ie==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;rt(It);q&&q.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-theme")==="dark";rt(!e)});const F=c(".nav-link"),H=c(".nav-dd-item"),dt=c(".content");[...F.filter(e=>e.dataset.section),...H];function Z(e){dt.forEach(s=>{s.id===e?s.style.display="":s.style.display="none"}),F.forEach(s=>s.classList.remove("active")),H.forEach(s=>s.classList.remove("active"));const t=F.filter(s=>s.dataset.section===e);t.length>0&&t.forEach(s=>s.classList.add("active"));const a=H.filter(s=>s.dataset.section===e);a.length>0&&(a.forEach(s=>s.classList.add("active")),a.forEach(s=>{const i=s.closest(".nav-dropdown");if(i){const n=i.querySelector(".nav-dropdown-trigger");n&&n.classList.add("active")}})),c(".nav-dropdown-menu").forEach(s=>s.classList.add("hidden")),window.scrollTo({top:0,behavior:"instant"})}F.forEach(e=>{e.dataset.section&&e.addEventListener("click",()=>Z(e.dataset.section))});H.forEach(e=>{e.addEventListener("click",()=>Z(e.dataset.section))});c(".nav-dropdown-trigger").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const s=e.closest(".nav-dropdown")?.querySelector(".nav-dropdown-menu");s&&(c(".nav-dropdown-menu").forEach(i=>{i!==s&&i.classList.add("hidden")}),s.classList.toggle("hidden"))})});document.addEventListener("click",()=>{c(".nav-dropdown-menu").forEach(e=>e.classList.add("hidden"))});c("[data-section]").forEach(e=>{e.classList.contains("nav-link")||e.classList.contains("nav-dd-item")||e.addEventListener("click",()=>{const t=e.dataset.section;t&&t!=="overview"&&Z(t)})});const je=r("#productSwitcherBtn"),se=r("#productSwitcherDropdown");je&&se&&(je.addEventListener("click",e=>{e.stopPropagation(),se.classList.toggle("hidden")}),document.addEventListener("click",()=>{se.classList.add("hidden")}));const Re=document.getElementById("app-data"),m=Re?JSON.parse(Re.dataset.payload||"{}"):{};let f="ardb";const ot=c("#sourceToggle .source-btn");function ct(){return f==="metaforge"?m.metaforge?.items||[]:m.items||[]}function lt(){return f==="metaforge"?m.metaforge?.quests||[]:m.quests||[]}const jt=["hand cannon","battle rifle","assault rifle","smg","pistol","shotgun","sniper rifle","lmg"];function Ae(e){const t=(e||"").toLowerCase();return t==="weapon"||jt.includes(t)?"Weapons":t==="recyclable"?"Recyclables":t==="blueprint"?"Blueprints":t==="consumable"||t==="quick use"?"Consumables":t==="modification"||t==="mod"?"Mods":t==="trinket"?"Trinkets":t.includes("material")||t==="nature"?"Materials":t==="key"?"Keys":t==="augment"||t==="ammunition"||t==="shield"||t==="special"?"Gear":"Other"}function vt(e){const t=e.toLowerCase();return["stitcher","hairpin","kettle","burletta","bobcat"].includes(t)?'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h2v12H4zm4 0h2v12H8zm4 0h2v12h-2zm4 0h2v12h-2z"/></svg>':["rattler","arpeggio","venator","renegade","osprey","torrente","tempest"].includes(t)?'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v3H3zm0 5h18v3H3zm0 5h18v3H3z"/></svg>':["ferro","anvil","bettina","jupiter"].includes(t)?'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.6 19.4L18 6l-3.4 13.4H4.6z M18 6l2-2c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8l-2 2L18 6z"/></svg>':["vulcano","il toro"].includes(t)?'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>':["hullcracker"].includes(t)?'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 2h4v4h-4zm-2 5h8v2H8zm-1 3h10v12H7z"/></svg>':["equalizer","aphelion"].includes(t)?'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'}function Rt(e){return Mt(e,f,vt)}function At(e){if(f==="metaforge"){const a=e.image||"";return`<div class="quest-card" data-id="${e.id}" data-trader="${e.trader_name||""}" data-name="${(e.title||"").toLowerCase()}" data-maps="" data-source="metaforge">
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
            </div>`}const t=e.trader?.icon?u(e.trader.icon):"";return`<div class="quest-card" data-id="${e.id}" data-trader="${e.trader?.name??""}" data-name="${e.title.toLowerCase()}" data-maps="${e.maps?.map(a=>a.name).join(",").toLowerCase()??""}" data-source="ardb">
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
        </div>`}function zt(){if(!E)return;const e=ct();if(E.innerHTML=e.map(Rt).join(""),N.forEach(t=>{const a=t.dataset.category,s=t.querySelector(".count");if(s){const i=a==="All"?e.length:e.filter(n=>(n.category||Ae(n.type))===a).length;s.textContent=i}}),w.length){const t=e.filter(a=>(a.category||Ae(a.type))==="Weapons");w.forEach(a=>{const s=a.dataset.weaponType,i=a.querySelector(".count");if(i){const n=s==="all"?t.length:t.filter(d=>d.type.toLowerCase()===s).length;i.textContent=n}})}$="All",O="all",j="all",N.forEach(t=>t.classList.toggle("active",t.dataset.category==="All")),he.forEach(t=>t.classList.toggle("active",t.dataset.rarity==="all")),w.forEach(t=>t.classList.toggle("active",t.dataset.weaponType==="all")),x&&x.classList.add("hidden"),I&&(I.value=""),_&&_.classList.add("hidden")}function Dt(){if(!k)return;const e=lt();k.innerHTML=e.map(At).join("");const t=r("#traderFilters"),a=r("#mapFilters");f==="metaforge"?(t&&(t.style.display="none"),a&&(a.style.display="none")):(t&&(t.style.display=""),a&&(a.style.display="")),P="all",Q="all",fe.forEach(s=>s.classList.toggle("active",s.dataset.trader==="all")),me.forEach(s=>s.classList.toggle("active",s.dataset.map==="all")),R&&(R.value=""),G&&G.classList.add("hidden")}function ht(e){c(".nav-link[data-source-only], .nav-dd-item[data-source-only]").forEach(t=>{const a=t.dataset.sourceOnly;t.style.display=a&&a!==e?"none":""})}function pt(e){if(e===f)return;f=e,ot.forEach(a=>a.classList.toggle("active",a.dataset.source===e)),zt(),Dt(),ht(e);const t=dt.find(a=>a.style.display!=="none");t&&t.dataset.sourceOnly&&t.dataset.sourceOnly!==e&&Z("overview"),y("arcraided-source",e)}ot.forEach(e=>{e.addEventListener("click",()=>pt(e.dataset.source))});const I=r("#itemSearch"),E=r("#itemGrid"),N=c("#categoryFilters .cat-filter"),he=c("#rarityFilters .cat-filter"),w=c("#weaponTypeFilters .cat-filter"),x=r("#weaponTypeFilters"),_=r("#noItemResults");let $="All",O="all",j="all";function ee(){if(!E)return;const e=(I?.value||"").toLowerCase().trim(),t=c(".item-card",E);let a=0;t.forEach(s=>{const i=s.dataset.name||"",n=s.dataset.type||"",d=s.dataset.category||"",o=s.dataset.rarity||"",l=s.dataset.weaponType||"",Be=(!e||i.includes(e)||n.toLowerCase().includes(e))&&($==="All"||d===$)&&(O==="all"||o===O)&&(j==="all"||$!=="Weapons"||l===j);s.classList.toggle("hidden",!Be),Be&&a++}),_&&_.classList.toggle("hidden",a>0)}I&&I.addEventListener("input",ee);N.forEach(e=>{e.addEventListener("click",()=>{N.forEach(t=>t.classList.remove("active")),e.classList.add("active"),$=e.dataset.category,x&&($==="Weapons"&&f!=="metaforge"?x.classList.remove("hidden"):(x.classList.add("hidden"),j="all",w.forEach(t=>t.classList.toggle("active",t.dataset.weaponType==="all")))),ee()})});he.forEach(e=>{e.addEventListener("click",()=>{he.forEach(t=>t.classList.remove("active")),e.classList.add("active"),O=e.dataset.rarity,ee()})});w.forEach(e=>{e.addEventListener("click",()=>{w.forEach(t=>t.classList.remove("active")),e.classList.add("active"),j=e.dataset.weaponType,ee()})});const b=r("#itemModal"),qt=r("#closeItemModalBtn"),ze=r("#modalItemDetails");function ft(e){const a=ct().find(d=>d.id===e);if(!a||!b||!ze)return;const s=u(a.icon),i=f==="metaforge";let n="";if(i&&a.stat_block){const d=a.stat_block,o=Object.entries(d).filter(([l,h])=>h&&h!==0&&h!==""&&l!=="value");o.length>0&&(n=`<div class="detail-stats-grid">${o.map(([h,v])=>`
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${v}</div>
                        <div class="detail-stat-label">${h.replace(/([A-Z])/g," $1").trim()}</div>
                    </div>
                `).join("")}</div>`)}n||(n=`
                <div class="detail-stats-grid">
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${a.value!=null?a.value.toLocaleString():"—"}</div>
                        <div class="detail-stat-label">Value</div>
                    </div>
                    ${i&&a.trader_price?`
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
            `),ze.innerHTML=`
            <div class="detail-header">
                <div class="detail-portrait">
                    ${s?`<img src="${s}" alt="${a.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:""}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${a.name}</h3>
                    <div class="detail-tags">
                        ${xe(a.rarity)}
                        <span class="item-card-tag">${a.type}</span>
                        ${a.category?`<span class="item-card-tag">${a.category}</span>`:""}
                    </div>
                    <span class="source-badge ${f}">${f==="metaforge"?"MetaForge":"ARDB"}</span>
                </div>
            </div>
            <p class="detail-desc">${a.description||"No description available."}</p>
            ${n}
        `,b.classList.remove("hidden"),b.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}E&&E.addEventListener("click",e=>{const t=e.target.closest(".item-card");t&&ft(t.dataset.id)});const De=r("#tierGroupsContainer");De&&De.addEventListener("click",e=>{const t=e.target.closest(".item-card");t&&ft(t.dataset.id);const a=e.target.closest(".show-more-tier-btn");a&&a.parentElement&&(a.parentElement.querySelectorAll('.item-card[style*="display: none"]').forEach(i=>{i.style.display=""}),a.remove())});const ie=r("#enemySearch"),pe=r("#enemyGrid"),qe=r("#noEnemyResults"),C=r("#enemyModal"),Ft=r("#closeEnemyModalBtn"),Fe=r("#modalEnemyDetails");ie&&ie.addEventListener("input",()=>{const e=ie.value.toLowerCase().trim(),t=c(".enemy-card",pe);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),qe&&qe.classList.toggle("hidden",a>0)});function Ht(e){const t=(m.enemies||[]).find(n=>n.id===e);if(!t||!C||!Fe)return;const a=u(t.image)||u(t.icon);let s="";t.dropTable&&t.dropTable.length>0&&(s=`
                <div class="drop-table">
                    <h4>Drop Table</h4>
                    <div class="drop-list">${t.dropTable.map(d=>`
                <div class="drop-item rarity-${(d.rarity||"common").toLowerCase()}">
                    <div class="drop-item-icon rarity-image-wrap" style="padding:2px;border-radius:6px;width:32px;height:32px;flex-shrink:0;">
                        <div class="rarity-curve"></div>
                        ${d.icon?`<img src="${u(d.icon)}" alt="${d.name}" class="item-img" style="width:100%;height:100%;object-fit:contain;" />`:'<div style="display:flex;align-items:center;justify-content:center;opacity:0.3;z-index:2;width:100%;height:100%;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>'}
                    </div>
                    <span class="drop-item-name">${d.name}</span>
                    ${xe(d.rarity)}
                </div>
            `).join("")}</div>
                </div>
            `);let i="";t.relatedMaps&&t.relatedMaps.length>0&&(i=`
                <div style="margin-top:1rem">
                    <h4 style="font-family:'Saira',system-ui,sans-serif;font-weight:700;font-size:.9rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 .5rem">Spawn Maps</h4>
                    <div class="rewards-list">
                        ${t.relatedMaps.map(n=>`<span class="reward-chip">${n}</span>`).join("")}
                    </div>
                </div>
            `),Fe.innerHTML=`
            <div class="detail-header">
                <div class="detail-portrait" style="width:120px;height:120px;">
                    ${a?`<img src="${a}" alt="${t.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:""}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${t.name}</h3>
                    <p class="detail-desc">${t.description||"No description available."}</p>
                </div>
            </div>
            ${i}
            ${s}
        `,C.classList.remove("hidden"),C.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}pe&&pe.addEventListener("click",e=>{const t=e.target.closest(".enemy-card");t&&Ht(t.dataset.id)});const R=r("#questSearch"),k=r("#questList"),fe=c("#traderFilters .cat-filter"),me=c("#mapFilters .cat-filter"),G=r("#noQuestResults"),S=r("#questModal"),Nt=r("#closeQuestModalBtn"),ne=r("#modalQuestDetails");let P="all",Q="all";function be(){if(!k)return;const e=(R?.value||"").toLowerCase().trim(),t=c(".quest-card",k);let a=0;t.forEach(s=>{const i=s.dataset.name||"",n=s.dataset.trader||"",d=s.dataset.maps||"",o=!e||i.includes(e)||n.toLowerCase().includes(e)||d.includes(e),l=P==="all"||n===P,h=Q==="all"||d.includes(Q.toLowerCase()),v=o&&l&&h;s.classList.toggle("hidden",!v),v&&a++}),G&&G.classList.toggle("hidden",a>0)}R&&R.addEventListener("input",be);fe.forEach(e=>{e.addEventListener("click",()=>{fe.forEach(t=>t.classList.remove("active")),e.classList.add("active"),P=e.dataset.trader,be()})});me.forEach(e=>{e.addEventListener("click",()=>{me.forEach(t=>t.classList.remove("active")),e.classList.add("active"),Q=e.dataset.map,be()})});function _t(e){const a=lt().find(s=>s.id===e);if(!(!a||!S||!ne)){if(f==="metaforge"){let s="";a.objectives&&a.objectives.length>0&&(s=`<div class="drop-table"><h4>Objectives</h4><div class="drop-list">${a.objectives.map((o,l)=>`
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${l+1}</div>
                        <span class="drop-item-name">${o}</span>
                    </div>
                `).join("")}</div></div>`);let i="";a.rewards&&a.rewards.length>0&&(i=`<div class="drop-table"><h4>Rewards</h4><div class="drop-list">${a.rewards.map(o=>`
                    <div class="drop-item rarity-${(o.item?.rarity||"common").toLowerCase()}">
                        <div class="drop-item-icon rarity-image-wrap" style="padding:2px;border-radius:6px;width:32px;height:32px;flex-shrink:0;">
                            <div class="rarity-curve"></div>
                            ${o.item?.icon?`<img src="${o.item.icon}" alt="${o.item.name}" class="item-img" style="width:100%;height:100%;object-fit:contain;" />`:'<div style="display:flex;align-items:center;justify-content:center;opacity:0.3;z-index:2;width:100%;height:100%;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>'}
                        </div>
                        <span class="drop-item-name">${o.item?.name||o.item_id} x${o.quantity}</span>
                        ${o.item?.rarity?xe(o.item.rarity):""}
                    </div>
                `).join("")}</div></div>`);let n="";a.guide_links&&a.guide_links.length>0&&(n=`<div class="rewards-list" style="margin-top:1rem">${a.guide_links.map(d=>`<a href="${d.url}" target="_blank" rel="noopener noreferrer" class="reward-chip" style="text-decoration:none">${d.label}</a>`).join("")}</div>`),ne.innerHTML=`
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
                ${i}
                ${n}
            `}else{const s=a.trader?.icon?u(a.trader.icon):"";let i="";a.steps&&a.steps.length>0&&(i=`<div class="drop-table"><h4>Steps</h4><div class="drop-list">${a.steps.map((o,l)=>`
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${l+1}</div>
                        <span class="drop-item-name">${o.title}</span>
                        ${o.amount?`<span class="item-card-tag">x${o.amount}</span>`:""}
                    </div>
                `).join("")}</div></div>`);let n="";a.maps&&a.maps.length>0&&(n=`<div class="rewards-list" style="margin-top:1rem">${a.maps.map(d=>`<span class="reward-chip">${d.name||d}</span>`).join("")}</div>`),ne.innerHTML=`
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
                ${n}
                ${i}
            `}S.classList.remove("hidden"),S.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}}k&&k.addEventListener("click",e=>{const t=e.target.closest(".quest-card");t&&_t(t.dataset.id)});const M=r("#traderModal"),Ot=r("#closeTraderModalBtn"),T=r("#skillModal"),Gt=r("#closeSkillModalBtn");function Ce(){[b,C,S,M,T].forEach(t=>{t&&(t.classList.add("hidden"),t.setAttribute("aria-hidden","true"))});const e=r("#loadoutPickerModal");e&&(e.classList.add("hidden"),e.setAttribute("aria-hidden","true")),document.body.style.overflow=""}[qt,Ft,Nt,Ot,Gt].forEach(e=>{e&&e.addEventListener("click",Ce)});[b,C,S,M,T].forEach(e=>{e&&e.addEventListener("click",t=>{t.target===e&&Ce()})});document.addEventListener("keydown",e=>{e.key==="Escape"&&Ce()});const re=r("#traderSearch"),V=r("#traderGrid"),He=r("#noTraderResults");re&&V&&re.addEventListener("input",()=>{const e=re.value.toLowerCase().trim(),t=c(".trader-card",V);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),He&&He.classList.toggle("hidden",a>0)});V&&V.addEventListener("click",e=>{const t=e.target.closest(".trader-card");if(!t||!M)return;const a=t.dataset.id,i=(m.arcTraders||[]).find(h=>h.id===a),n=r("#modalTraderDetails");if(!n)return;const d=i?.name||t.querySelector(".trader-card-name")?.textContent||"Unknown",o=i?.description||t.querySelector(".trader-card-desc")?.textContent||"No description available.",l=i?.image||i?.icon||"";n.innerHTML=`
                <div class="detail-header">
                    <div class="detail-portrait" style="border-radius:50%;">
                        ${l?`<img src="${u(l)}" alt="${d}" style="width:100%;height:100%;object-fit:cover;" />`:""}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${d}</h3>
                        ${i?.type?`<div class="detail-tags"><span class="rarity-badge epic">${i.type}</span></div>`:""}
                    </div>
                </div>
                <p class="detail-desc">${o}</p>
            `,M.classList.remove("hidden"),M.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"});const ue=r("#skillSearch"),W=r("#skillGrid"),Ne=r("#noSkillResults"),_e=c("#skillCategoryFilters .cat-filter");let ge="all";function mt(){if(!W)return;const e=(ue?.value||"").toLowerCase().trim(),t=c(".skill-card",W);let a=0;t.forEach(s=>{const i=s.dataset.name||"",n=s.dataset.category||"",l=(!e||i.includes(e))&&(ge==="all"||n===ge);s.classList.toggle("hidden",!l),l&&a++}),Ne&&Ne.classList.toggle("hidden",a>0)}ue&&ue.addEventListener("input",mt);_e.forEach(e=>{e.addEventListener("click",()=>{_e.forEach(t=>t.classList.remove("active")),e.classList.add("active"),ge=e.dataset.skillCat,mt()})});W&&W.addEventListener("click",e=>{const t=e.target.closest(".skill-card");if(!t||!T)return;const a=t.dataset.id,i=(m.skills||[]).find(l=>l.id===a),n=r("#modalSkillDetails");if(!n)return;const d=i?.name||t.querySelector(".skill-card-name")?.textContent||"Unknown",o=i?.description||"No description available.";n.innerHTML=`
                <div class="detail-header">
                    <div class="detail-portrait">
                        ${i?.icon?`<img src="${i.icon}" alt="${d}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:'<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:.5"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>'}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${d}</h3>
                        <div class="detail-tags">
                            ${i?.category?`<span class="rarity-badge rare">${i.category}</span>`:""}
                            ${i?.tier!=null?`<span class="item-card-tag">Tier ${i.tier}</span>`:""}
                        </div>
                    </div>
                </div>
                <p class="detail-desc">${o}</p>
                ${i?.effects&&i.effects.length>0?`
                    <div class="drop-table"><h4>Effects</h4><div class="drop-list">
                        ${i.effects.map(l=>`<div class="drop-item"><span class="drop-item-name">${l}</span></div>`).join("")}
                    </div></div>
                `:""}
            `,T.classList.remove("hidden"),T.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"});const de=r("#guideSearch"),Oe=r("#guideGrid"),Ge=r("#noGuideResults");de&&Oe&&de.addEventListener("input",()=>{const e=de.value.toLowerCase().trim(),t=c(".guide-card",Oe);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),Ge&&Ge.classList.toggle("hidden",a>0)});const oe=r("#marketSearch"),U=r("#marketTable"),Pe=r("#noMarketResults"),Qe=c("#marketSortFilters .cat-filter");oe&&U&&oe.addEventListener("input",()=>{const e=oe.value.toLowerCase().trim(),t=c(".market-row",U);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),Pe&&Pe.classList.toggle("hidden",a>0)});Qe.forEach(e=>{e.addEventListener("click",()=>{Qe.forEach(i=>i.classList.remove("active")),e.classList.add("active");const t=e.dataset.marketSort;if(!U)return;const a=U.querySelector("tbody");if(!a)return;const s=c(".market-row",a);s.sort((i,n)=>t==="value-desc"?(parseFloat(n.dataset.value)||0)-(parseFloat(i.dataset.value)||0):t==="value-asc"?(parseFloat(i.dataset.value)||0)-(parseFloat(n.dataset.value)||0):t==="name"?(i.dataset.name||"").localeCompare(n.dataset.name||""):0),s.forEach(i=>a.appendChild(i))})});const ut="arcraided-needed",gt="arcraided-found";function K(){return g(ut,[])}function Y(){return g(gt,[])}function yt(e){y(ut,e)}function ye(e){y(gt,e)}function D(){const e=K(),t=Y(),a=r("#neededCount"),s=r("#neededDoneCount"),i=r("#neededRemainingCount"),n=r("#neededProgressFill");a&&(a.textContent=e.length);const d=e.filter(l=>t.includes(l)).length;s&&(s.textContent=d);const o=e.length-d;i&&(i.textContent=o),n&&(n.style.width=e.length>0?`${(d/e.length*100).toFixed(1)}%`:"0%"),c(".needed-item").forEach(l=>{const h=l.dataset.id,v=e.includes(h),te=t.includes(h);l.classList.toggle("is-tracked",v),l.classList.toggle("is-found",te)})}const Ve=r("#neededGrid");Ve&&(Ve.addEventListener("click",e=>{const t=e.target.closest("[data-needed-track]");if(t){const s=t.dataset.neededTrack,i=K(),n=i.indexOf(s);if(n>-1){i.splice(n,1);const d=Y(),o=d.indexOf(s);o>-1&&(d.splice(o,1),ye(d))}else i.push(s);yt(i),D();return}const a=e.target.closest("[data-needed-found]");if(a){const s=a.dataset.neededFound;if(!K().includes(s))return;const n=Y(),d=n.indexOf(s);d>-1?n.splice(d,1):n.push(s),ye(n),D()}}),D());const Le=r("#neededSearch"),We=r("#noNeededResults"),Ue=c("#neededViewFilters .cat-filter");let we="all";function Se(){const e=(Le?.value||"").toLowerCase().trim(),t=K(),a=Y(),s=c(".needed-item");let i=0;s.forEach(n=>{const d=n.dataset.name||"",o=n.dataset.id||"",l=t.includes(o),h=a.includes(o);let v=!0;we==="tracked"&&(v=l),we==="remaining"&&(v=l&&!h);const ae=(!e||d.includes(e))&&v;n.classList.toggle("hidden",!ae),ae&&i++}),We&&We.classList.toggle("hidden",i>0)}Le&&Le.addEventListener("input",Se);Ue.forEach(e=>{e.addEventListener("click",()=>{Ue.forEach(t=>t.classList.remove("active")),e.classList.add("active"),we=e.dataset.neededView,Se()})});const Ke=r("#clearNeededBtn");Ke&&Ke.addEventListener("click",()=>{yt([]),ye([]),D(),Se()});const Lt="arcraided-blueprints";function wt(){return g(Lt,[])}function $t(e){y(Lt,e)}function $e(){const e=wt(),t=c(".bp-card"),a=t.length,s=t.filter(o=>e.includes(o.dataset.id)).length;t.forEach(o=>{o.classList.toggle("is-collected",e.includes(o.dataset.id))});const i=r("#bpCollected"),n=r("#bpRemaining"),d=r("#bpProgressFill");i&&(i.textContent=s),n&&(n.textContent=a-s),d&&(d.style.width=a>0?`${(s/a*100).toFixed(1)}%`:"0%")}const X=r("#bpGrid");X&&(X.addEventListener("click",e=>{const t=e.target.closest("[data-bp-toggle]");if(t){const a=t.dataset.bpToggle,s=wt(),i=s.indexOf(a);i>-1?s.splice(i,1):s.push(a),$t(s),$e()}}),$e());const ce=r("#bpSearch"),Ye=r("#noBpResults");ce&&X&&ce.addEventListener("input",()=>{const e=ce.value.toLowerCase().trim(),t=c(".bp-card",X);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),Ye&&Ye.classList.toggle("hidden",a>0)});const Xe=r("#clearBpBtn");Xe&&Xe.addEventListener("click",()=>{$t([]),$e()});const le=r("#workshopSearch"),Je=r("#workshopGrid"),Ze=r("#noWorkshopResults");le&&Je&&le.addEventListener("input",()=>{const e=le.value.toLowerCase().trim(),t=c("[data-name]",Je);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),Ze&&Ze.classList.toggle("hidden",a>0)});const Et="arcraided-loadouts";function Ee(){return g(Et,[])}function kt(e){y(Et,e)}let Me={};const J=r("#loadoutPickerModal"),A=r("#loadoutPickerGrid"),ve=r("#loadoutPickerSearch"),et=r("#closeLoadoutPicker");let L=null;function Pt(e){if(!J||!A)return;L=e;const t=m.metaforge?.items||[];A.innerHTML=t.map(a=>{const s=(a.rarity||"common").toLowerCase(),i=vt(a.name);return`
            <div class="item-card rarity-${s}" data-id="${a.id}" data-name="${a.name.toLowerCase()}" style="cursor:pointer">
                <div class="rarity-image-wrap item-card-image-wrap">
                    <div class="rarity-curve"></div>
                    ${a.icon?`<img src="${a.icon}" alt="${a.name}" loading="lazy" class="item-img" />`:'<div style="display:flex;align-items:center;justify-content:center;opacity:0.3;width:100%;height:100%">📦</div>'}
                </div>
                <div class="item-card-footer">
                    <span class="item-type-icon">${i}</span>
                    <span class="item-card-name">${a.name}</span>
                </div>
            </div>
            `}).join(""),J.classList.remove("hidden"),document.body.style.overflow="hidden"}A&&A.addEventListener("click",e=>{const t=e.target.closest(".item-card");if(!t||!L)return;const a=t.dataset.id,i=(m.metaforge?.items||[]).find(d=>d.id===a);if(!i)return;Me[L]=i;const n=document.querySelector(`[data-slot-name="${L}"]`);n&&(n.innerHTML=`
                    <div class="rarity-${(i.rarity||"common").toLowerCase()}" style="display:flex;align-items:center;gap:.5rem;padding:.5rem">
                        <div class="rarity-image-wrap" style="padding:4px;border-radius:6px;width:38px;height:38px;flex-shrink:0;">
                            <div class="rarity-curve"></div>
                            ${i.icon?`<img src="${i.icon}" style="width:100%;height:100%;object-fit:contain;z-index:2;" />`:'<div style="display:flex;align-items:center;justify-content:center;opacity:0.3;z-index:2;width:100%;height:100%;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>'}
                        </div>
                        <div>
                            <div style="font-weight:700;font-size:.85rem">${i.name}</div>
                            <span class="rarity-badge ${(i.rarity||"common").toLowerCase()}">${i.rarity}</span>
                        </div>
                    </div>
                `),J.classList.add("hidden"),document.body.style.overflow="",L=null});et&&et.addEventListener("click",()=>{J.classList.add("hidden"),document.body.style.overflow="",L=null});ve&&ve.addEventListener("input",()=>{const e=ve.value.toLowerCase().trim();c(".item-card",A).forEach(a=>{const s=!e||(a.dataset.name||"").includes(e);a.classList.toggle("hidden",!s)})});c(".loadout-slot-picker").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.slotName;t&&Pt(t)})});const tt=r("#saveLoadoutBtn"),ke=r("#loadoutName"),z=r("#savedLoadoutsList");tt&&tt.addEventListener("click",()=>{const e=ke?.value||"Unnamed Loadout",t=Ee();t.push({name:e,slots:{...Me},savedAt:new Date().toISOString()}),kt(t),Te()});function Te(){if(!z)return;const e=Ee();if(e.length===0){z.innerHTML='<p class="muted" style="font-size:.85rem">No saved loadouts yet. Build one above and click Save!</p>';return}z.innerHTML=e.map((t,a)=>`
            <div class="saved-loadout-card">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem">
                    <strong style="font-family:'Saira',system-ui;text-transform:uppercase;letter-spacing:.03em">${t.name}</strong>
                    <button class="btn btn-ghost btn-sm" data-delete-loadout="${a}" type="button" style="font-size:.7rem;padding:.2rem .5rem">Delete</button>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:.4rem">
                    ${Object.entries(t.slots).map(([s,i])=>`
                        <div class="reward-chip">
                            ${i.icon?`<img src="${i.icon}" style="width:16px;height:16px;border-radius:3px" />`:""}
                            <span>${s}: ${i.name}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `).join(""),c("[data-delete-loadout]",z).forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.deleteLoadout,10),s=Ee();s.splice(a,1),kt(s),Te()})})}Te();const at=r("#newLoadoutBtn");at&&at.addEventListener("click",()=>{Me={},ke&&(ke.value="My Loadout"),c(".loadout-slot-picker").forEach(e=>{e.innerHTML='<div class="loadout-slot-empty"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg><span>Click to select</span></div>'})});const B=r("#tierListContainer"),p=r("#tierItemPool"),st=c("#tierListCatFilters .cat-filter"),xt="arcraided-tierlist";function Qt(){return g(xt,{})}function bt(e){y(xt,e)}if(p&&B){let e=function(s){a=s.target.closest(".tier-item"),a&&(s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",a.dataset.id),a.style.opacity="0.4")},t=function(){a&&(a.style.opacity="1"),a=null,c(".tier-drop-zone").forEach(s=>s.classList.remove("drag-over"))},a=null;p.addEventListener("dragstart",e),p.addEventListener("dragend",t),c(".tier-drop-zone",B).forEach(s=>{s.addEventListener("dragover",i=>{i.preventDefault(),i.dataTransfer.dropEffect="move",s.classList.add("drag-over")}),s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s.addEventListener("drop",i=>{if(i.preventDefault(),s.classList.remove("drag-over"),!a)return;const n=s.querySelector(".tier-placeholder");n&&n.remove(),s.appendChild(a),a.style.opacity="1",a.addEventListener("dragstart",e),a.addEventListener("dragend",t)})}),p.addEventListener("dragover",s=>{s.preventDefault(),s.dataTransfer.dropEffect="move"}),p.addEventListener("drop",s=>{s.preventDefault(),a&&(p.appendChild(a),a.style.opacity="1")})}const it=r("#saveTierListBtn");it&&it.addEventListener("click",()=>{const e={};c(".tier-drop-zone").forEach(t=>{const a=t.dataset.tierZone;e[a]=c(".tier-item",t).map(s=>s.dataset.id)}),bt(e)});const nt=r("#resetTierListBtn");nt&&p&&nt.addEventListener("click",()=>{c(".tier-drop-zone .tier-item").forEach(e=>{p.appendChild(e)}),c(".tier-drop-zone").forEach(e=>{if(!e.querySelector(".tier-placeholder")){const t=document.createElement("span");t.className="tier-placeholder",t.textContent="Drag items here",e.appendChild(t)}}),bt({})});if(p&&B){const e=Qt();Object.entries(e).forEach(([t,a])=>{const s=B.querySelector(`[data-tier-zone="${t}"]`);if(!s)return;const i=s.querySelector(".tier-placeholder");i&&a.length>0&&i.remove(),a.forEach(n=>{const d=p.querySelector(`[data-id="${n}"]`)||B.querySelector(`[data-id="${n}"]`);d&&s.appendChild(d)})})}st.forEach(e=>{e.addEventListener("click",()=>{st.forEach(i=>i.classList.remove("active")),e.classList.add("active");const t=e.dataset.tierCat;if(!p)return;const a=m.items||[],s=t==="All"?a:a.filter(i=>i.category===t);c(".tier-drop-zone").forEach(i=>{i.innerHTML='<span class="tier-placeholder">Drag items here</span>'}),p.innerHTML=s.map(i=>`
                <div class="tier-item rarity-image-wrap rarity-${(i.rarity||"common").toLowerCase()}" draggable="true" data-id="${i.id}" data-name="${i.name}" data-category="${i.category}" title="${i.name}">
                    <div class="rarity-curve"></div>
                    ${i.icon?`<img src="${u(i.icon)}" alt="${i.name}" loading="lazy" class="item-img" style="width:100%;height:100%;object-fit:contain;padding:2px;z-index:2;" />`:`<span style="font-size:.6rem;text-align:center;line-height:1.1;z-index:2;color:#fff;">${i.name.slice(0,8)}</span>`}
                </div>
            `).join("")})});function Ct(){const e=Date.now();c("[data-end-ms]").forEach(t=>{const s=parseInt(t.dataset.endMs,10)-e;if(s<=0){t.textContent="Ended";return}const i=Math.floor(s/36e5),n=Math.floor(s%36e5/6e4),d=Math.floor(s%6e4/1e3);t.textContent=`${i}h ${n}m ${d}s`}),c("[data-start-ms]").forEach(t=>{const s=parseInt(t.dataset.startMs,10)-e;if(s<=0){t.textContent="Started!";return}const i=Math.floor(s/864e5),n=Math.floor(s%864e5/36e5),d=Math.floor(s%36e5/6e4),o=Math.floor(s%6e4/1e3);t.textContent=i>0?`${i}d ${n}h ${d}m`:`${n}h ${d}m ${o}s`})}Ct();setInterval(Ct,1e3);const Vt=g("arcraided-source",null);Vt==="metaforge"?pt("metaforge"):ht("ardb");
