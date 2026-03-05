(function(){const $t="https://ardb.app/static",n=(e,t=document)=>t.querySelector(e),o=(e,t=document)=>[...t.querySelectorAll(e)];function h(e){return e?e.startsWith("http")?e:$t+e:""}function Et(e){return e.charAt(0).toUpperCase()+e.slice(1)}function X(e){const t=e||"common";return`<span class="rarity-badge ${t}">${Et(t)}</span>`}const j=n("#themeToggle");function Te(e){document.documentElement.setAttribute("data-theme",e?"dark":"light"),j&&(j.textContent=e?"Light Mode":"Dark Mode");try{localStorage.setItem("theme",e?"dark":"light")}catch{}}const Me=(()=>{try{return localStorage.getItem("theme")}catch{return null}})(),wt=Me?Me==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;Te(wt),j&&j.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-theme")==="dark";Te(!e)});const D=o(".nav-link"),R=o(".nav-dd-item"),kt=o(".content");[...D.filter(e=>e.dataset.section),...R];function Z(e){kt.forEach(s=>{s.id===e?s.style.display="":s.style.display="none"}),D.forEach(s=>s.classList.remove("active")),R.forEach(s=>s.classList.remove("active"));const t=D.filter(s=>s.dataset.section===e);t.length>0&&t.forEach(s=>s.classList.add("active"));const a=R.filter(s=>s.dataset.section===e);a.length>0&&(a.forEach(s=>s.classList.add("active")),a.forEach(s=>{const i=s.closest(".nav-dropdown");if(i){const d=i.querySelector(".nav-dropdown-trigger");d&&d.classList.add("active")}})),o(".nav-dropdown-menu").forEach(s=>s.classList.add("hidden")),window.scrollTo({top:0,behavior:"instant"})}D.forEach(e=>{e.dataset.section&&e.addEventListener("click",()=>Z(e.dataset.section))}),R.forEach(e=>{e.addEventListener("click",()=>Z(e.dataset.section))}),o(".nav-dropdown-trigger").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const s=e.closest(".nav-dropdown")?.querySelector(".nav-dropdown-menu");s&&(o(".nav-dropdown-menu").forEach(i=>{i!==s&&i.classList.add("hidden")}),s.classList.toggle("hidden"))})}),document.addEventListener("click",()=>{o(".nav-dropdown-menu").forEach(e=>e.classList.add("hidden"))}),o("[data-section]").forEach(e=>{e.classList.contains("nav-link")||e.classList.contains("nav-dd-item")||e.addEventListener("click",()=>{const t=e.dataset.section;t&&t!=="overview"&&Z(t)})});const Be=n("#productSwitcherBtn"),ee=n("#productSwitcherDropdown");Be&&ee&&(Be.addEventListener("click",e=>{e.stopPropagation(),ee.classList.toggle("hidden")}),document.addEventListener("click",()=>{ee.classList.add("hidden")}));const Ie=document.getElementById("app-data"),v=Ie?JSON.parse(Ie.dataset.payload||"{}"):{};let f="ardb";const je=o("#sourceToggle .source-btn");function De(){return f==="metaforge"?v.metaforge?.items||[]:v.items||[]}function Re(){return f==="metaforge"?v.metaforge?.quests||[]:v.quests||[]}const bt=["hand cannon","battle rifle","assault rifle","smg","pistol","shotgun","sniper rifle","lmg"];function Ae(e){const t=(e||"").toLowerCase();return bt.includes(t)?"Weapons":t==="recyclable"?"Recyclables":t==="blueprint"?"Blueprints":t==="consumable"||t==="quick use"?"Consumables":t==="modification"||t==="mod"?"Mods":t==="trinket"?"Trinkets":t.includes("material")||t==="nature"?"Materials":t==="key"?"Keys":t==="augment"||t==="ammunition"||t==="shield"||t==="special"?"Gear":"Other"}function St(e){const t=(e.rarity||"common").toLowerCase(),a=e.category||Ae(e.type),s=h(e.icon),i=f==="metaforge"&&e.trader_price;return`<div class="item-card rarity-${t}" data-rarity="${t}" data-category="${a}" data-type="${e.type}" data-weapon-type="${e.type.toLowerCase()}" data-name="${e.name.toLowerCase()}" data-id="${e.id}" data-source="${f}">
            ${s?`<img src="${s}" alt="${e.name}" loading="lazy" class="item-card-icon" />`:'<div class="item-card-icon" style="display:flex;align-items:center;justify-content:center;opacity:0.3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>'}
            <div class="item-card-info">
                <div class="item-card-name">${e.name}</div>
                <div class="item-card-meta">
                    <span class="rarity-badge ${t}">${t}</span>
                    <span class="item-card-tag">${e.type}</span>
                </div>
            </div>
            ${e.value!=null&&e.value>0?`<span class="item-value">${e.value.toLocaleString()}${i?` <small style="opacity:.5">sell: ${e.trader_price.toLocaleString()}</small>`:""}</span>`:""}
        </div>`}function xt(e){if(f==="metaforge"){const a=e.image||"";return`<div class="quest-card" data-id="${e.id}" data-trader="${e.trader_name||""}" data-name="${(e.title||"").toLowerCase()}" data-maps="" data-source="metaforge">
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
            </div>`}const t=e.trader?.icon?h(e.trader.icon):"";return`<div class="quest-card" data-id="${e.id}" data-trader="${e.trader?.name??""}" data-name="${e.title.toLowerCase()}" data-maps="${e.maps?.map(a=>a.name).join(",").toLowerCase()??""}" data-source="ardb">
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
        </div>`}function Ct(){if(!g)return;const e=De();g.innerHTML=e.map(St).join(""),A.forEach(t=>{const a=t.dataset.category,s=t.querySelector(".count");if(s){const i=a==="All"?e.length:e.filter(d=>(d.category||Ae(d.type))===a).length;s.textContent=i}}),y="All",q="all",k="all",A.forEach(t=>t.classList.toggle("active",t.dataset.category==="All")),te.forEach(t=>t.classList.toggle("active",t.dataset.rarity==="all")),F.forEach(t=>t.classList.toggle("active",t.dataset.weaponType==="all")),w&&w.classList.add("hidden"),E&&(E.value=""),N&&N.classList.add("hidden")}function Tt(){if(!L)return;const e=Re();L.innerHTML=e.map(xt).join("");const t=n("#traderFilters"),a=n("#mapFilters");f==="metaforge"?(t&&(t.style.display="none"),a&&(a.style.display="none")):(t&&(t.style.display=""),a&&(a.style.display="")),P="all",G="all",ie.forEach(s=>s.classList.toggle("active",s.dataset.trader==="all")),ne.forEach(s=>s.classList.toggle("active",s.dataset.map==="all")),x&&(x.value=""),O&&O.classList.add("hidden")}function Fe(e){if(e!==f){f=e,je.forEach(t=>t.classList.toggle("active",t.dataset.source===e)),Ct(),Tt();try{localStorage.setItem("arcraided-source",e)}catch{}}}je.forEach(e=>{e.addEventListener("click",()=>Fe(e.dataset.source))});const E=n("#itemSearch"),g=n("#itemGrid"),A=o("#categoryFilters .cat-filter"),te=o("#rarityFilters .cat-filter"),F=o("#weaponTypeFilters .cat-filter"),w=n("#weaponTypeFilters"),N=n("#noItemResults");let y="All",q="all",k="all";function H(){if(!g)return;const e=(E?.value||"").toLowerCase().trim(),t=o(".item-card",g);let a=0;t.forEach(s=>{const i=s.dataset.name||"",d=s.dataset.type||"",r=s.dataset.category||"",c=s.dataset.rarity||"",l=s.dataset.weaponType||"",Lt=(!e||i.includes(e)||d.toLowerCase().includes(e))&&(y==="All"||r===y)&&(q==="all"||c===q)&&(k==="all"||y!=="Weapons"||l===k);s.classList.toggle("hidden",!Lt),Lt&&a++}),N&&N.classList.toggle("hidden",a>0)}E&&E.addEventListener("input",H),A.forEach(e=>{e.addEventListener("click",()=>{A.forEach(t=>t.classList.remove("active")),e.classList.add("active"),y=e.dataset.category,w&&(y==="Weapons"?w.classList.remove("hidden"):(w.classList.add("hidden"),k="all",F.forEach(t=>t.classList.toggle("active",t.dataset.weaponType==="all")))),H()})}),te.forEach(e=>{e.addEventListener("click",()=>{te.forEach(t=>t.classList.remove("active")),e.classList.add("active"),q=e.dataset.rarity,H()})}),F.forEach(e=>{e.addEventListener("click",()=>{F.forEach(t=>t.classList.remove("active")),e.classList.add("active"),k=e.dataset.weaponType,H()})});const b=n("#itemModal"),Mt=n("#closeItemModalBtn"),Ne=n("#modalItemDetails");function Bt(e){const a=De().find(r=>r.id===e);if(!a||!b||!Ne)return;const s=h(a.icon),i=f==="metaforge";let d="";if(i&&a.stat_block){const r=a.stat_block,c=Object.entries(r).filter(([l,m])=>m&&m!==0&&m!==""&&l!=="value");c.length>0&&(d=`<div class="detail-stats-grid">${c.map(([m,p])=>`
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${p}</div>
                        <div class="detail-stat-label">${m.replace(/([A-Z])/g," $1").trim()}</div>
                    </div>
                `).join("")}</div>`)}d||(d=`
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
            `),Ne.innerHTML=`
            <div class="detail-header">
                <div class="detail-portrait">
                    ${s?`<img src="${s}" alt="${a.name}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:""}
                </div>
                <div class="detail-info">
                    <h3 class="detail-name">${a.name}</h3>
                    <div class="detail-tags">
                        ${X(a.rarity)}
                        <span class="item-card-tag">${a.type}</span>
                        ${a.category?`<span class="item-card-tag">${a.category}</span>`:""}
                    </div>
                    <span class="source-badge ${f}">${f==="metaforge"?"MetaForge":"ARDB"}</span>
                </div>
            </div>
            <p class="detail-desc">${a.description||"No description available."}</p>
            ${d}
        `,b.classList.remove("hidden"),b.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}g&&g.addEventListener("click",e=>{const t=e.target.closest(".item-card");t&&Bt(t.dataset.id)});const ae=n("#enemySearch"),se=n("#enemyGrid"),qe=n("#noEnemyResults"),S=n("#enemyModal"),It=n("#closeEnemyModalBtn"),He=n("#modalEnemyDetails");ae&&ae.addEventListener("input",()=>{const e=ae.value.toLowerCase().trim(),t=o(".enemy-card",se);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),qe&&qe.classList.toggle("hidden",a>0)});function jt(e){const t=(v.enemies||[]).find(d=>d.id===e);if(!t||!S||!He)return;const a=h(t.image)||h(t.icon);let s="";t.dropTable&&t.dropTable.length>0&&(s=`
                <div class="drop-table">
                    <h4>Drop Table</h4>
                    <div class="drop-list">${t.dropTable.map(r=>`
                <div class="drop-item">
                    ${r.icon?`<img src="${h(r.icon)}" alt="${r.name}" class="drop-item-icon" />`:""}
                    <span class="drop-item-name">${r.name}</span>
                    ${X(r.rarity)}
                </div>
            `).join("")}</div>
                </div>
            `);let i="";t.relatedMaps&&t.relatedMaps.length>0&&(i=`
                <div style="margin-top:1rem">
                    <h4 style="font-family:'Saira',system-ui,sans-serif;font-weight:700;font-size:.9rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 .5rem">Spawn Maps</h4>
                    <div class="rewards-list">
                        ${t.relatedMaps.map(d=>`<span class="reward-chip">${d}</span>`).join("")}
                    </div>
                </div>
            `),He.innerHTML=`
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
        `,S.classList.remove("hidden"),S.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}se&&se.addEventListener("click",e=>{const t=e.target.closest(".enemy-card");t&&jt(t.dataset.id)});const x=n("#questSearch"),L=n("#questList"),ie=o("#traderFilters .cat-filter"),ne=o("#mapFilters .cat-filter"),O=n("#noQuestResults"),C=n("#questModal"),Dt=n("#closeQuestModalBtn"),de=n("#modalQuestDetails");let P="all",G="all";function re(){if(!L)return;const e=(x?.value||"").toLowerCase().trim(),t=o(".quest-card",L);let a=0;t.forEach(s=>{const i=s.dataset.name||"",d=s.dataset.trader||"",r=s.dataset.maps||"",c=!e||i.includes(e)||d.toLowerCase().includes(e)||r.includes(e),l=P==="all"||d===P,m=G==="all"||r.includes(G.toLowerCase()),p=c&&l&&m;s.classList.toggle("hidden",!p),p&&a++}),O&&O.classList.toggle("hidden",a>0)}x&&x.addEventListener("input",re),ie.forEach(e=>{e.addEventListener("click",()=>{ie.forEach(t=>t.classList.remove("active")),e.classList.add("active"),P=e.dataset.trader,re()})}),ne.forEach(e=>{e.addEventListener("click",()=>{ne.forEach(t=>t.classList.remove("active")),e.classList.add("active"),G=e.dataset.map,re()})});function Rt(e){const a=Re().find(s=>s.id===e);if(!(!a||!C||!de)){if(f==="metaforge"){let s="";a.objectives&&a.objectives.length>0&&(s=`<div class="drop-table"><h4>Objectives</h4><div class="drop-list">${a.objectives.map((c,l)=>`
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${l+1}</div>
                        <span class="drop-item-name">${c}</span>
                    </div>
                `).join("")}</div></div>`);let i="";a.rewards&&a.rewards.length>0&&(i=`<div class="drop-table"><h4>Rewards</h4><div class="drop-list">${a.rewards.map(c=>`
                    <div class="drop-item">
                        ${c.item?.icon?`<img src="${c.item.icon}" alt="${c.item.name}" class="drop-item-icon" />`:""}
                        <span class="drop-item-name">${c.item?.name||c.item_id} x${c.quantity}</span>
                        ${c.item?.rarity?X(c.item.rarity):""}
                    </div>
                `).join("")}</div></div>`);let d="";a.guide_links&&a.guide_links.length>0&&(d=`<div class="rewards-list" style="margin-top:1rem">${a.guide_links.map(r=>`<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="reward-chip" style="text-decoration:none">${r.label}</a>`).join("")}</div>`),de.innerHTML=`
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
                ${d}
            `}else{const s=a.trader?.icon?h(a.trader.icon):"";let i="";a.steps&&a.steps.length>0&&(i=`<div class="drop-table"><h4>Steps</h4><div class="drop-list">${a.steps.map((c,l)=>`
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${l+1}</div>
                        <span class="drop-item-name">${c.title}</span>
                        ${c.amount?`<span class="item-card-tag">x${c.amount}</span>`:""}
                    </div>
                `).join("")}</div></div>`);let d="";a.maps&&a.maps.length>0&&(d=`<div class="rewards-list" style="margin-top:1rem">${a.maps.map(r=>`<span class="reward-chip">${r.name||r}</span>`).join("")}</div>`),de.innerHTML=`
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
                ${d}
                ${i}
            `}C.classList.remove("hidden"),C.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}}L&&L.addEventListener("click",e=>{const t=e.target.closest(".quest-card");t&&Rt(t.dataset.id)});const T=n("#traderModal"),At=n("#closeTraderModalBtn"),M=n("#skillModal"),Ft=n("#closeSkillModalBtn");function oe(){[b,S,C,T,M].forEach(t=>{t&&(t.classList.add("hidden"),t.setAttribute("aria-hidden","true"))});const e=n("#loadoutPickerModal");e&&(e.classList.add("hidden"),e.setAttribute("aria-hidden","true")),document.body.style.overflow=""}[Mt,It,Dt,At,Ft].forEach(e=>{e&&e.addEventListener("click",oe)}),[b,S,C,T,M].forEach(e=>{e&&e.addEventListener("click",t=>{t.target===e&&oe()})}),document.addEventListener("keydown",e=>{e.key==="Escape"&&oe()});const ce=n("#traderSearch"),_=n("#traderGrid"),Oe=n("#noTraderResults");ce&&_&&ce.addEventListener("input",()=>{const e=ce.value.toLowerCase().trim(),t=o(".trader-card",_);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),Oe&&Oe.classList.toggle("hidden",a>0)}),_&&_.addEventListener("click",e=>{const t=e.target.closest(".trader-card");if(!t||!T)return;const a=t.dataset.id,i=(v.arcTraders||[]).find(m=>m.id===a),d=n("#modalTraderDetails");if(!d)return;const r=i?.name||t.querySelector(".trader-card-name")?.textContent||"Unknown",c=i?.description||t.querySelector(".trader-card-desc")?.textContent||"No description available.",l=i?.image||i?.icon||"";d.innerHTML=`
                <div class="detail-header">
                    <div class="detail-portrait" style="border-radius:50%;">
                        ${l?`<img src="${h(l)}" alt="${r}" style="width:100%;height:100%;object-fit:cover;" />`:""}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${r}</h3>
                        ${i?.type?`<div class="detail-tags"><span class="rarity-badge epic">${i.type}</span></div>`:""}
                    </div>
                </div>
                <p class="detail-desc">${c}</p>
            `,T.classList.remove("hidden"),T.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"});const le=n("#skillSearch"),Q=n("#skillGrid"),Pe=n("#noSkillResults"),Ge=o("#skillCategoryFilters .cat-filter");let me="all";function _e(){if(!Q)return;const e=(le?.value||"").toLowerCase().trim(),t=o(".skill-card",Q);let a=0;t.forEach(s=>{const i=s.dataset.name||"",d=s.dataset.category||"",l=(!e||i.includes(e))&&(me==="all"||d===me);s.classList.toggle("hidden",!l),l&&a++}),Pe&&Pe.classList.toggle("hidden",a>0)}le&&le.addEventListener("input",_e),Ge.forEach(e=>{e.addEventListener("click",()=>{Ge.forEach(t=>t.classList.remove("active")),e.classList.add("active"),me=e.dataset.skillCat,_e()})}),Q&&Q.addEventListener("click",e=>{const t=e.target.closest(".skill-card");if(!t||!M)return;const a=t.dataset.id,i=(v.skills||[]).find(l=>l.id===a),d=n("#modalSkillDetails");if(!d)return;const r=i?.name||t.querySelector(".skill-card-name")?.textContent||"Unknown",c=i?.description||"No description available.";d.innerHTML=`
                <div class="detail-header">
                    <div class="detail-portrait">
                        ${i?.icon?`<img src="${i.icon}" alt="${r}" style="max-width:100%;max-height:100%;object-fit:contain;" />`:'<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;opacity:.5"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>'}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${r}</h3>
                        <div class="detail-tags">
                            ${i?.category?`<span class="rarity-badge rare">${i.category}</span>`:""}
                            ${i?.tier!=null?`<span class="item-card-tag">Tier ${i.tier}</span>`:""}
                        </div>
                    </div>
                </div>
                <p class="detail-desc">${c}</p>
                ${i?.effects&&i.effects.length>0?`
                    <div class="drop-table"><h4>Effects</h4><div class="drop-list">
                        ${i.effects.map(l=>`<div class="drop-item"><span class="drop-item-name">${l}</span></div>`).join("")}
                    </div></div>
                `:""}
            `,M.classList.remove("hidden"),M.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"});const fe=n("#guideSearch"),Qe=n("#guideGrid"),ze=n("#noGuideResults");fe&&Qe&&fe.addEventListener("input",()=>{const e=fe.value.toLowerCase().trim(),t=o(".guide-card",Qe);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),ze&&ze.classList.toggle("hidden",a>0)});const ue=n("#marketSearch"),z=n("#marketTable"),Ue=n("#noMarketResults"),Je=o("#marketSortFilters .cat-filter");ue&&z&&ue.addEventListener("input",()=>{const e=ue.value.toLowerCase().trim(),t=o(".market-row",z);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),Ue&&Ue.classList.toggle("hidden",a>0)}),Je.forEach(e=>{e.addEventListener("click",()=>{Je.forEach(i=>i.classList.remove("active")),e.classList.add("active");const t=e.dataset.marketSort;if(!z)return;const a=z.querySelector("tbody");if(!a)return;const s=o(".market-row",a);s.sort((i,d)=>t==="value-desc"?(parseFloat(d.dataset.value)||0)-(parseFloat(i.dataset.value)||0):t==="value-asc"?(parseFloat(i.dataset.value)||0)-(parseFloat(d.dataset.value)||0):t==="name"?(i.dataset.name||"").localeCompare(d.dataset.name||""):0),s.forEach(i=>a.appendChild(i))})});const We="arcraided-needed",Ve="arcraided-found";function U(){try{return JSON.parse(localStorage.getItem(We)||"[]")}catch{return[]}}function J(){try{return JSON.parse(localStorage.getItem(Ve)||"[]")}catch{return[]}}function Ke(e){try{localStorage.setItem(We,JSON.stringify(e))}catch{}}function pe(e){try{localStorage.setItem(Ve,JSON.stringify(e))}catch{}}function W(){const e=U(),t=J(),a=n("#neededCount"),s=n("#neededDoneCount"),i=n("#neededRemainingCount"),d=n("#neededProgressFill");a&&(a.textContent=e.length);const r=e.filter(l=>t.includes(l)).length;s&&(s.textContent=r);const c=e.length-r;i&&(i.textContent=c),d&&(d.style.width=e.length>0?`${(r/e.length*100).toFixed(1)}%`:"0%"),o(".needed-item").forEach(l=>{const m=l.dataset.id,p=e.includes(m),xe=t.includes(m);l.classList.toggle("is-tracked",p),l.classList.toggle("is-found",xe)})}const Ye=n("#neededGrid");Ye&&(Ye.addEventListener("click",e=>{const t=e.target.closest("[data-needed-track]");if(t){const s=t.dataset.neededTrack,i=U(),d=i.indexOf(s);if(d>-1){i.splice(d,1);const r=J(),c=r.indexOf(s);c>-1&&(r.splice(c,1),pe(r))}else i.push(s);Ke(i),W();return}const a=e.target.closest("[data-needed-found]");if(a){const s=a.dataset.neededFound;if(!U().includes(s))return;const d=J(),r=d.indexOf(s);r>-1?d.splice(r,1):d.push(s),pe(d),W()}}),W());const ve=n("#neededSearch"),Xe=n("#noNeededResults"),Ze=o("#neededViewFilters .cat-filter");let he="all";function ge(){const e=(ve?.value||"").toLowerCase().trim(),t=U(),a=J(),s=o(".needed-item");let i=0;s.forEach(d=>{const r=d.dataset.name||"",c=d.dataset.id||"",l=t.includes(c),m=a.includes(c);let p=!0;he==="tracked"&&(p=l),he==="remaining"&&(p=l&&!m);const Ce=(!e||r.includes(e))&&p;d.classList.toggle("hidden",!Ce),Ce&&i++}),Xe&&Xe.classList.toggle("hidden",i>0)}ve&&ve.addEventListener("input",ge),Ze.forEach(e=>{e.addEventListener("click",()=>{Ze.forEach(t=>t.classList.remove("active")),e.classList.add("active"),he=e.dataset.neededView,ge()})});const et=n("#clearNeededBtn");et&&et.addEventListener("click",()=>{Ke([]),pe([]),W(),ge()});const tt="arcraided-blueprints";function at(){try{return JSON.parse(localStorage.getItem(tt)||"[]")}catch{return[]}}function st(e){try{localStorage.setItem(tt,JSON.stringify(e))}catch{}}function ye(){const e=at(),t=o(".bp-card"),a=t.length,s=t.filter(c=>e.includes(c.dataset.id)).length;t.forEach(c=>{c.classList.toggle("is-collected",e.includes(c.dataset.id))});const i=n("#bpCollected"),d=n("#bpRemaining"),r=n("#bpProgressFill");i&&(i.textContent=s),d&&(d.textContent=a-s),r&&(r.style.width=a>0?`${(s/a*100).toFixed(1)}%`:"0%")}const V=n("#bpGrid");V&&(V.addEventListener("click",e=>{const t=e.target.closest("[data-bp-toggle]");if(t){const a=t.dataset.bpToggle,s=at(),i=s.indexOf(a);i>-1?s.splice(i,1):s.push(a),st(s),ye()}}),ye());const Le=n("#bpSearch"),it=n("#noBpResults");Le&&V&&Le.addEventListener("input",()=>{const e=Le.value.toLowerCase().trim(),t=o(".bp-card",V);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),it&&it.classList.toggle("hidden",a>0)});const nt=n("#clearBpBtn");nt&&nt.addEventListener("click",()=>{st([]),ye()});const $e=n("#workshopSearch"),dt=n("#workshopGrid"),rt=n("#noWorkshopResults");$e&&dt&&$e.addEventListener("input",()=>{const e=$e.value.toLowerCase().trim(),t=o("[data-name]",dt);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),rt&&rt.classList.toggle("hidden",a>0)});const ot="arcraided-loadouts";function Ee(){try{return JSON.parse(localStorage.getItem(ot)||"[]")}catch{return[]}}function ct(e){try{localStorage.setItem(ot,JSON.stringify(e))}catch{}}let we={};const K=n("#loadoutPickerModal"),B=n("#loadoutPickerGrid"),ke=n("#loadoutPickerSearch"),lt=n("#closeLoadoutPicker");let $=null;function Nt(e){if(!K||!B)return;$=e;const t=v.metaforge?.items||[];B.innerHTML=t.map(a=>`
            <div class="item-card rarity-${(a.rarity||"common").toLowerCase()}" data-id="${a.id}" data-name="${a.name.toLowerCase()}" style="cursor:pointer">
                ${a.icon?`<img src="${a.icon}" alt="${a.name}" loading="lazy" class="item-card-icon" />`:'<div class="item-card-icon" style="display:flex;align-items:center;justify-content:center;opacity:0.3">📦</div>'}
                <div class="item-card-info">
                    <div class="item-card-name">${a.name}</div>
                    <div class="item-card-meta">
                        <span class="rarity-badge ${(a.rarity||"common").toLowerCase()}">${a.rarity||"common"}</span>
                        <span class="item-card-tag">${a.type}</span>
                    </div>
                </div>
            </div>
        `).join(""),K.classList.remove("hidden"),document.body.style.overflow="hidden"}B&&B.addEventListener("click",e=>{const t=e.target.closest(".item-card");if(!t||!$)return;const a=t.dataset.id,i=(v.metaforge?.items||[]).find(r=>r.id===a);if(!i)return;we[$]=i;const d=document.querySelector(`[data-slot-name="${$}"]`);d&&(d.innerHTML=`
                    <div style="display:flex;align-items:center;gap:.5rem;padding:.5rem">
                        ${i.icon?`<img src="${i.icon}" style="width:36px;height:36px;border-radius:8px;object-fit:contain" />`:""}
                        <div>
                            <div style="font-weight:700;font-size:.85rem">${i.name}</div>
                            <span class="rarity-badge ${(i.rarity||"common").toLowerCase()}">${i.rarity}</span>
                        </div>
                    </div>
                `),K.classList.add("hidden"),document.body.style.overflow="",$=null}),lt&&lt.addEventListener("click",()=>{K.classList.add("hidden"),document.body.style.overflow="",$=null}),ke&&ke.addEventListener("input",()=>{const e=ke.value.toLowerCase().trim();o(".item-card",B).forEach(a=>{const s=!e||(a.dataset.name||"").includes(e);a.classList.toggle("hidden",!s)})}),o(".loadout-slot-picker").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.slotName;t&&Nt(t)})});const mt=n("#saveLoadoutBtn"),be=n("#loadoutName"),Y=n("#savedLoadoutsList");mt&&mt.addEventListener("click",()=>{const e=be?.value||"Unnamed Loadout",t=Ee();t.push({name:e,slots:{...we},savedAt:new Date().toISOString()}),ct(t),Se()});function Se(){if(!Y)return;const e=Ee();if(e.length===0){Y.innerHTML='<p class="muted" style="font-size:.85rem">No saved loadouts yet. Build one above and click Save!</p>';return}Y.innerHTML=e.map((t,a)=>`
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
        `).join(""),o("[data-delete-loadout]",Y).forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.deleteLoadout,10),s=Ee();s.splice(a,1),ct(s),Se()})})}Se();const ft=n("#newLoadoutBtn");ft&&ft.addEventListener("click",()=>{we={},be&&(be.value="My Loadout"),o(".loadout-slot-picker").forEach(e=>{e.innerHTML='<div class="loadout-slot-empty"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg><span>Click to select</span></div>'})});const I=n("#tierListContainer"),u=n("#tierItemPool"),ut=o("#tierListCatFilters .cat-filter"),pt="arcraided-tierlist";function qt(){try{return JSON.parse(localStorage.getItem(pt)||"{}")}catch{return{}}}function vt(e){try{localStorage.setItem(pt,JSON.stringify(e))}catch{}}if(u&&I){let t=function(s){e=s.target.closest(".tier-item"),e&&(s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",e.dataset.id),e.style.opacity="0.4")},a=function(){e&&(e.style.opacity="1"),e=null,o(".tier-drop-zone").forEach(s=>s.classList.remove("drag-over"))};var Ot=t,Pt=a;let e=null;u.addEventListener("dragstart",t),u.addEventListener("dragend",a),o(".tier-drop-zone",I).forEach(s=>{s.addEventListener("dragover",i=>{i.preventDefault(),i.dataTransfer.dropEffect="move",s.classList.add("drag-over")}),s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s.addEventListener("drop",i=>{if(i.preventDefault(),s.classList.remove("drag-over"),!e)return;const d=s.querySelector(".tier-placeholder");d&&d.remove(),s.appendChild(e),e.style.opacity="1",e.addEventListener("dragstart",t),e.addEventListener("dragend",a)})}),u.addEventListener("dragover",s=>{s.preventDefault(),s.dataTransfer.dropEffect="move"}),u.addEventListener("drop",s=>{s.preventDefault(),e&&(u.appendChild(e),e.style.opacity="1")})}const ht=n("#saveTierListBtn");ht&&ht.addEventListener("click",()=>{const e={};o(".tier-drop-zone").forEach(t=>{const a=t.dataset.tierZone;e[a]=o(".tier-item",t).map(s=>s.dataset.id)}),vt(e)});const gt=n("#resetTierListBtn");if(gt&&u&&gt.addEventListener("click",()=>{o(".tier-drop-zone .tier-item").forEach(e=>{u.appendChild(e)}),o(".tier-drop-zone").forEach(e=>{if(!e.querySelector(".tier-placeholder")){const t=document.createElement("span");t.className="tier-placeholder",t.textContent="Drag items here",e.appendChild(t)}}),vt({})}),u&&I){const e=qt();Object.entries(e).forEach(([t,a])=>{const s=I.querySelector(`[data-tier-zone="${t}"]`);if(!s)return;const i=s.querySelector(".tier-placeholder");i&&a.length>0&&i.remove(),a.forEach(d=>{const r=u.querySelector(`[data-id="${d}"]`)||I.querySelector(`[data-id="${d}"]`);r&&s.appendChild(r)})})}ut.forEach(e=>{e.addEventListener("click",()=>{ut.forEach(i=>i.classList.remove("active")),e.classList.add("active");const t=e.dataset.tierCat;if(!u)return;const a=v.items||[],s=t==="All"?a:a.filter(i=>i.category===t);o(".tier-drop-zone").forEach(i=>{i.innerHTML='<span class="tier-placeholder">Drag items here</span>'}),u.innerHTML=s.map(i=>`
                <div class="tier-item" draggable="true" data-id="${i.id}" data-name="${i.name}" data-category="${i.category}" title="${i.name}">
                    ${i.icon?`<img src="${h(i.icon)}" alt="${i.name}" loading="lazy" />`:`<span style="font-size:.6rem;text-align:center;line-height:1.1">${i.name.slice(0,8)}</span>`}
                </div>
            `).join("")})});function yt(){const e=new Date;o("[data-end-time]").forEach(t=>{const s=new Date(t.dataset.endTime)-e;if(s<=0){t.textContent="Ended";return}const i=Math.floor(s/36e5),d=Math.floor(s%36e5/6e4),r=Math.floor(s%6e4/1e3);t.textContent=`${i}h ${d}m ${r}s`}),o("[data-start-time]").forEach(t=>{const s=new Date(t.dataset.startTime)-e;if(s<=0){t.textContent="Started!";return}const i=Math.floor(s/864e5),d=Math.floor(s%864e5/36e5),r=Math.floor(s%36e5/6e4);t.textContent=i>0?`${i}d ${d}h ${r}m`:`${d}h ${r}m`})}yt(),setInterval(yt,1e3),(()=>{try{return localStorage.getItem("arcraided-source")}catch{return null}})()==="metaforge"&&Fe("metaforge")})();
