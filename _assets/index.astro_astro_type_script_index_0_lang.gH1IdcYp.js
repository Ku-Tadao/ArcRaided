(function(){const Et="https://ardb.app/static",n=(e,t=document)=>t.querySelector(e),o=(e,t=document)=>[...t.querySelectorAll(e)];function h(e){return e?e.startsWith("http")?e:Et+e:""}function wt(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Z(e){const t=e||"common";return`<span class="rarity-badge ${t}">${wt(t)}</span>`}const D=n("#themeToggle");function Te(e){document.documentElement.setAttribute("data-theme",e?"dark":"light"),D&&(D.textContent=e?"Light Mode":"Dark Mode");try{localStorage.setItem("theme",e?"dark":"light")}catch{}}const Be=(()=>{try{return localStorage.getItem("theme")}catch{return null}})(),kt=Be?Be==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;Te(kt),D&&D.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-theme")==="dark";Te(!e)});const R=o(".nav-link"),q=o(".nav-dd-item"),Ie=o(".content");[...R.filter(e=>e.dataset.section),...q];function A(e){Ie.forEach(s=>{s.id===e?s.style.display="":s.style.display="none"}),R.forEach(s=>s.classList.remove("active")),q.forEach(s=>s.classList.remove("active"));const t=R.filter(s=>s.dataset.section===e);t.length>0&&t.forEach(s=>s.classList.add("active"));const a=q.filter(s=>s.dataset.section===e);a.length>0&&(a.forEach(s=>s.classList.add("active")),a.forEach(s=>{const i=s.closest(".nav-dropdown");if(i){const r=i.querySelector(".nav-dropdown-trigger");r&&r.classList.add("active")}})),o(".nav-dropdown-menu").forEach(s=>s.classList.add("hidden")),window.scrollTo({top:0,behavior:"instant"})}R.forEach(e=>{e.dataset.section&&e.addEventListener("click",()=>A(e.dataset.section))}),q.forEach(e=>{e.addEventListener("click",()=>A(e.dataset.section))}),o(".nav-dropdown-trigger").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const s=e.closest(".nav-dropdown")?.querySelector(".nav-dropdown-menu");s&&(o(".nav-dropdown-menu").forEach(i=>{i!==s&&i.classList.add("hidden")}),s.classList.toggle("hidden"))})}),document.addEventListener("click",()=>{o(".nav-dropdown-menu").forEach(e=>e.classList.add("hidden"))}),o("[data-section]").forEach(e=>{e.classList.contains("nav-link")||e.classList.contains("nav-dd-item")||e.addEventListener("click",()=>{const t=e.dataset.section;t&&t!=="overview"&&A(t)})});const je=n("#productSwitcherBtn"),ee=n("#productSwitcherDropdown");je&&ee&&(je.addEventListener("click",e=>{e.stopPropagation(),ee.classList.toggle("hidden")}),document.addEventListener("click",()=>{ee.classList.add("hidden")}));const De=document.getElementById("app-data"),v=De?JSON.parse(De.dataset.payload||"{}"):{};let f="ardb";const Re=o("#sourceToggle .source-btn");function qe(){return f==="metaforge"?v.metaforge?.items||[]:v.items||[]}function Ae(){return f==="metaforge"?v.metaforge?.quests||[]:v.quests||[]}const St=["hand cannon","battle rifle","assault rifle","smg","pistol","shotgun","sniper rifle","lmg"];function te(e){const t=(e||"").toLowerCase();return t==="weapon"||St.includes(t)?"Weapons":t==="recyclable"?"Recyclables":t==="blueprint"?"Blueprints":t==="consumable"||t==="quick use"?"Consumables":t==="modification"||t==="mod"?"Mods":t==="trinket"?"Trinkets":t.includes("material")||t==="nature"?"Materials":t==="key"?"Keys":t==="augment"||t==="ammunition"||t==="shield"||t==="special"?"Gear":"Other"}function bt(e){const t=(e.rarity||"common").toLowerCase(),a=e.category||te(e.type),s=h(e.icon),i=f==="metaforge"&&e.trader_price;return`<div class="item-card rarity-${t}" data-rarity="${t}" data-category="${a}" data-type="${e.type}" data-weapon-type="${e.type.toLowerCase()}" data-name="${e.name.toLowerCase()}" data-id="${e.id}" data-source="${f}">
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
        </div>`}function Ct(){if(!g)return;const e=qe();if(g.innerHTML=e.map(bt).join(""),F.forEach(t=>{const a=t.dataset.category,s=t.querySelector(".count");if(s){const i=a==="All"?e.length:e.filter(r=>(r.category||te(r.type))===a).length;s.textContent=i}}),y.length){const t=e.filter(a=>(a.category||te(a.type))==="Weapons");y.forEach(a=>{const s=a.dataset.weaponType,i=a.querySelector(".count");if(i){const r=s==="all"?t.length:t.filter(d=>d.type.toLowerCase()===s).length;i.textContent=r}})}L="All",O="all",S="all",F.forEach(t=>t.classList.toggle("active",t.dataset.category==="All")),ae.forEach(t=>t.classList.toggle("active",t.dataset.rarity==="all")),y.forEach(t=>t.classList.toggle("active",t.dataset.weaponType==="all")),k&&k.classList.add("hidden"),w&&(w.value=""),N&&N.classList.add("hidden")}function Mt(){if(!$)return;const e=Ae();$.innerHTML=e.map(xt).join("");const t=n("#traderFilters"),a=n("#mapFilters");f==="metaforge"?(t&&(t.style.display="none"),a&&(a.style.display="none")):(t&&(t.style.display=""),a&&(a.style.display="")),G="all",_="all",ne.forEach(s=>s.classList.toggle("active",s.dataset.trader==="all")),re.forEach(s=>s.classList.toggle("active",s.dataset.map==="all")),C&&(C.value=""),P&&P.classList.add("hidden")}function Fe(e){if(e===f)return;f=e,Re.forEach(a=>a.classList.toggle("active",a.dataset.source===e)),Ct(),Mt(),o("[data-source-only]").forEach(a=>{const s=a.dataset.sourceOnly;a.style.display=s&&s!==e?"none":""});const t=Ie.find(a=>a.style.display!=="none");t&&t.dataset.sourceOnly&&t.dataset.sourceOnly!==e&&A("overview");try{localStorage.setItem("arcraided-source",e)}catch{}}Re.forEach(e=>{e.addEventListener("click",()=>Fe(e.dataset.source))});const w=n("#itemSearch"),g=n("#itemGrid"),F=o("#categoryFilters .cat-filter"),ae=o("#rarityFilters .cat-filter"),y=o("#weaponTypeFilters .cat-filter"),k=n("#weaponTypeFilters"),N=n("#noItemResults");let L="All",O="all",S="all";function H(){if(!g)return;const e=(w?.value||"").toLowerCase().trim(),t=o(".item-card",g);let a=0;t.forEach(s=>{const i=s.dataset.name||"",r=s.dataset.type||"",d=s.dataset.category||"",c=s.dataset.rarity||"",l=s.dataset.weaponType||"",$t=(!e||i.includes(e)||r.toLowerCase().includes(e))&&(L==="All"||d===L)&&(O==="all"||c===O)&&(S==="all"||L!=="Weapons"||l===S);s.classList.toggle("hidden",!$t),$t&&a++}),N&&N.classList.toggle("hidden",a>0)}w&&w.addEventListener("input",H),F.forEach(e=>{e.addEventListener("click",()=>{F.forEach(t=>t.classList.remove("active")),e.classList.add("active"),L=e.dataset.category,k&&(L==="Weapons"&&f!=="metaforge"?k.classList.remove("hidden"):(k.classList.add("hidden"),S="all",y.forEach(t=>t.classList.toggle("active",t.dataset.weaponType==="all")))),H()})}),ae.forEach(e=>{e.addEventListener("click",()=>{ae.forEach(t=>t.classList.remove("active")),e.classList.add("active"),O=e.dataset.rarity,H()})}),y.forEach(e=>{e.addEventListener("click",()=>{y.forEach(t=>t.classList.remove("active")),e.classList.add("active"),S=e.dataset.weaponType,H()})});const b=n("#itemModal"),Tt=n("#closeItemModalBtn"),Ne=n("#modalItemDetails");function Bt(e){const a=qe().find(d=>d.id===e);if(!a||!b||!Ne)return;const s=h(a.icon),i=f==="metaforge";let r="";if(i&&a.stat_block){const d=a.stat_block,c=Object.entries(d).filter(([l,m])=>m&&m!==0&&m!==""&&l!=="value");c.length>0&&(r=`<div class="detail-stats-grid">${c.map(([m,u])=>`
                    <div class="detail-stat-card">
                        <div class="detail-stat-value">${u}</div>
                        <div class="detail-stat-label">${m.replace(/([A-Z])/g," $1").trim()}</div>
                    </div>
                `).join("")}</div>`)}r||(r=`
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
                        ${Z(a.rarity)}
                        <span class="item-card-tag">${a.type}</span>
                        ${a.category?`<span class="item-card-tag">${a.category}</span>`:""}
                    </div>
                    <span class="source-badge ${f}">${f==="metaforge"?"MetaForge":"ARDB"}</span>
                </div>
            </div>
            <p class="detail-desc">${a.description||"No description available."}</p>
            ${r}
        `,b.classList.remove("hidden"),b.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}g&&g.addEventListener("click",e=>{const t=e.target.closest(".item-card");t&&Bt(t.dataset.id)});const se=n("#enemySearch"),ie=n("#enemyGrid"),Oe=n("#noEnemyResults"),x=n("#enemyModal"),It=n("#closeEnemyModalBtn"),He=n("#modalEnemyDetails");se&&se.addEventListener("input",()=>{const e=se.value.toLowerCase().trim(),t=o(".enemy-card",ie);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),Oe&&Oe.classList.toggle("hidden",a>0)});function jt(e){const t=(v.enemies||[]).find(r=>r.id===e);if(!t||!x||!He)return;const a=h(t.image)||h(t.icon);let s="";t.dropTable&&t.dropTable.length>0&&(s=`
                <div class="drop-table">
                    <h4>Drop Table</h4>
                    <div class="drop-list">${t.dropTable.map(d=>`
                <div class="drop-item">
                    ${d.icon?`<img src="${h(d.icon)}" alt="${d.name}" class="drop-item-icon" />`:""}
                    <span class="drop-item-name">${d.name}</span>
                    ${Z(d.rarity)}
                </div>
            `).join("")}</div>
                </div>
            `);let i="";t.relatedMaps&&t.relatedMaps.length>0&&(i=`
                <div style="margin-top:1rem">
                    <h4 style="font-family:'Saira',system-ui,sans-serif;font-weight:700;font-size:.9rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 .5rem">Spawn Maps</h4>
                    <div class="rewards-list">
                        ${t.relatedMaps.map(r=>`<span class="reward-chip">${r}</span>`).join("")}
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
        `,x.classList.remove("hidden"),x.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}ie&&ie.addEventListener("click",e=>{const t=e.target.closest(".enemy-card");t&&jt(t.dataset.id)});const C=n("#questSearch"),$=n("#questList"),ne=o("#traderFilters .cat-filter"),re=o("#mapFilters .cat-filter"),P=n("#noQuestResults"),M=n("#questModal"),Dt=n("#closeQuestModalBtn"),de=n("#modalQuestDetails");let G="all",_="all";function oe(){if(!$)return;const e=(C?.value||"").toLowerCase().trim(),t=o(".quest-card",$);let a=0;t.forEach(s=>{const i=s.dataset.name||"",r=s.dataset.trader||"",d=s.dataset.maps||"",c=!e||i.includes(e)||r.toLowerCase().includes(e)||d.includes(e),l=G==="all"||r===G,m=_==="all"||d.includes(_.toLowerCase()),u=c&&l&&m;s.classList.toggle("hidden",!u),u&&a++}),P&&P.classList.toggle("hidden",a>0)}C&&C.addEventListener("input",oe),ne.forEach(e=>{e.addEventListener("click",()=>{ne.forEach(t=>t.classList.remove("active")),e.classList.add("active"),G=e.dataset.trader,oe()})}),re.forEach(e=>{e.addEventListener("click",()=>{re.forEach(t=>t.classList.remove("active")),e.classList.add("active"),_=e.dataset.map,oe()})});function Rt(e){const a=Ae().find(s=>s.id===e);if(!(!a||!M||!de)){if(f==="metaforge"){let s="";a.objectives&&a.objectives.length>0&&(s=`<div class="drop-table"><h4>Objectives</h4><div class="drop-list">${a.objectives.map((c,l)=>`
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${l+1}</div>
                        <span class="drop-item-name">${c}</span>
                    </div>
                `).join("")}</div></div>`);let i="";a.rewards&&a.rewards.length>0&&(i=`<div class="drop-table"><h4>Rewards</h4><div class="drop-list">${a.rewards.map(c=>`
                    <div class="drop-item">
                        ${c.item?.icon?`<img src="${c.item.icon}" alt="${c.item.name}" class="drop-item-icon" />`:""}
                        <span class="drop-item-name">${c.item?.name||c.item_id} x${c.quantity}</span>
                        ${c.item?.rarity?Z(c.item.rarity):""}
                    </div>
                `).join("")}</div></div>`);let r="";a.guide_links&&a.guide_links.length>0&&(r=`<div class="rewards-list" style="margin-top:1rem">${a.guide_links.map(d=>`<a href="${d.url}" target="_blank" rel="noopener noreferrer" class="reward-chip" style="text-decoration:none">${d.label}</a>`).join("")}</div>`),de.innerHTML=`
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
                ${r}
            `}else{const s=a.trader?.icon?h(a.trader.icon):"";let i="";a.steps&&a.steps.length>0&&(i=`<div class="drop-table"><h4>Steps</h4><div class="drop-list">${a.steps.map((c,l)=>`
                    <div class="drop-item">
                        <div style="background:var(--brand);color:#000;font-weight:700;font-size:.75rem;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${l+1}</div>
                        <span class="drop-item-name">${c.title}</span>
                        ${c.amount?`<span class="item-card-tag">x${c.amount}</span>`:""}
                    </div>
                `).join("")}</div></div>`);let r="";a.maps&&a.maps.length>0&&(r=`<div class="rewards-list" style="margin-top:1rem">${a.maps.map(d=>`<span class="reward-chip">${d.name||d}</span>`).join("")}</div>`),de.innerHTML=`
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
                ${i}
            `}M.classList.remove("hidden"),M.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}}$&&$.addEventListener("click",e=>{const t=e.target.closest(".quest-card");t&&Rt(t.dataset.id)});const T=n("#traderModal"),qt=n("#closeTraderModalBtn"),B=n("#skillModal"),At=n("#closeSkillModalBtn");function ce(){[b,x,M,T,B].forEach(t=>{t&&(t.classList.add("hidden"),t.setAttribute("aria-hidden","true"))});const e=n("#loadoutPickerModal");e&&(e.classList.add("hidden"),e.setAttribute("aria-hidden","true")),document.body.style.overflow=""}[Tt,It,Dt,qt,At].forEach(e=>{e&&e.addEventListener("click",ce)}),[b,x,M,T,B].forEach(e=>{e&&e.addEventListener("click",t=>{t.target===e&&ce()})}),document.addEventListener("keydown",e=>{e.key==="Escape"&&ce()});const le=n("#traderSearch"),Q=n("#traderGrid"),Pe=n("#noTraderResults");le&&Q&&le.addEventListener("input",()=>{const e=le.value.toLowerCase().trim(),t=o(".trader-card",Q);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),Pe&&Pe.classList.toggle("hidden",a>0)}),Q&&Q.addEventListener("click",e=>{const t=e.target.closest(".trader-card");if(!t||!T)return;const a=t.dataset.id,i=(v.arcTraders||[]).find(m=>m.id===a),r=n("#modalTraderDetails");if(!r)return;const d=i?.name||t.querySelector(".trader-card-name")?.textContent||"Unknown",c=i?.description||t.querySelector(".trader-card-desc")?.textContent||"No description available.",l=i?.image||i?.icon||"";r.innerHTML=`
                <div class="detail-header">
                    <div class="detail-portrait" style="border-radius:50%;">
                        ${l?`<img src="${h(l)}" alt="${d}" style="width:100%;height:100%;object-fit:cover;" />`:""}
                    </div>
                    <div class="detail-info">
                        <h3 class="detail-name">${d}</h3>
                        ${i?.type?`<div class="detail-tags"><span class="rarity-badge epic">${i.type}</span></div>`:""}
                    </div>
                </div>
                <p class="detail-desc">${c}</p>
            `,T.classList.remove("hidden"),T.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"});const me=n("#skillSearch"),z=n("#skillGrid"),Ge=n("#noSkillResults"),_e=o("#skillCategoryFilters .cat-filter");let fe="all";function Qe(){if(!z)return;const e=(me?.value||"").toLowerCase().trim(),t=o(".skill-card",z);let a=0;t.forEach(s=>{const i=s.dataset.name||"",r=s.dataset.category||"",l=(!e||i.includes(e))&&(fe==="all"||r===fe);s.classList.toggle("hidden",!l),l&&a++}),Ge&&Ge.classList.toggle("hidden",a>0)}me&&me.addEventListener("input",Qe),_e.forEach(e=>{e.addEventListener("click",()=>{_e.forEach(t=>t.classList.remove("active")),e.classList.add("active"),fe=e.dataset.skillCat,Qe()})}),z&&z.addEventListener("click",e=>{const t=e.target.closest(".skill-card");if(!t||!B)return;const a=t.dataset.id,i=(v.skills||[]).find(l=>l.id===a),r=n("#modalSkillDetails");if(!r)return;const d=i?.name||t.querySelector(".skill-card-name")?.textContent||"Unknown",c=i?.description||"No description available.";r.innerHTML=`
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
                <p class="detail-desc">${c}</p>
                ${i?.effects&&i.effects.length>0?`
                    <div class="drop-table"><h4>Effects</h4><div class="drop-list">
                        ${i.effects.map(l=>`<div class="drop-item"><span class="drop-item-name">${l}</span></div>`).join("")}
                    </div></div>
                `:""}
            `,B.classList.remove("hidden"),B.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"});const pe=n("#guideSearch"),ze=n("#guideGrid"),Ue=n("#noGuideResults");pe&&ze&&pe.addEventListener("input",()=>{const e=pe.value.toLowerCase().trim(),t=o(".guide-card",ze);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),Ue&&Ue.classList.toggle("hidden",a>0)});const ue=n("#marketSearch"),U=n("#marketTable"),We=n("#noMarketResults"),Je=o("#marketSortFilters .cat-filter");ue&&U&&ue.addEventListener("input",()=>{const e=ue.value.toLowerCase().trim(),t=o(".market-row",U);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),We&&We.classList.toggle("hidden",a>0)}),Je.forEach(e=>{e.addEventListener("click",()=>{Je.forEach(i=>i.classList.remove("active")),e.classList.add("active");const t=e.dataset.marketSort;if(!U)return;const a=U.querySelector("tbody");if(!a)return;const s=o(".market-row",a);s.sort((i,r)=>t==="value-desc"?(parseFloat(r.dataset.value)||0)-(parseFloat(i.dataset.value)||0):t==="value-asc"?(parseFloat(i.dataset.value)||0)-(parseFloat(r.dataset.value)||0):t==="name"?(i.dataset.name||"").localeCompare(r.dataset.name||""):0),s.forEach(i=>a.appendChild(i))})});const Ve="arcraided-needed",Ke="arcraided-found";function W(){try{return JSON.parse(localStorage.getItem(Ve)||"[]")}catch{return[]}}function J(){try{return JSON.parse(localStorage.getItem(Ke)||"[]")}catch{return[]}}function Ye(e){try{localStorage.setItem(Ve,JSON.stringify(e))}catch{}}function ve(e){try{localStorage.setItem(Ke,JSON.stringify(e))}catch{}}function V(){const e=W(),t=J(),a=n("#neededCount"),s=n("#neededDoneCount"),i=n("#neededRemainingCount"),r=n("#neededProgressFill");a&&(a.textContent=e.length);const d=e.filter(l=>t.includes(l)).length;s&&(s.textContent=d);const c=e.length-d;i&&(i.textContent=c),r&&(r.style.width=e.length>0?`${(d/e.length*100).toFixed(1)}%`:"0%"),o(".needed-item").forEach(l=>{const m=l.dataset.id,u=e.includes(m),Ce=t.includes(m);l.classList.toggle("is-tracked",u),l.classList.toggle("is-found",Ce)})}const Xe=n("#neededGrid");Xe&&(Xe.addEventListener("click",e=>{const t=e.target.closest("[data-needed-track]");if(t){const s=t.dataset.neededTrack,i=W(),r=i.indexOf(s);if(r>-1){i.splice(r,1);const d=J(),c=d.indexOf(s);c>-1&&(d.splice(c,1),ve(d))}else i.push(s);Ye(i),V();return}const a=e.target.closest("[data-needed-found]");if(a){const s=a.dataset.neededFound;if(!W().includes(s))return;const r=J(),d=r.indexOf(s);d>-1?r.splice(d,1):r.push(s),ve(r),V()}}),V());const he=n("#neededSearch"),Ze=n("#noNeededResults"),et=o("#neededViewFilters .cat-filter");let ge="all";function ye(){const e=(he?.value||"").toLowerCase().trim(),t=W(),a=J(),s=o(".needed-item");let i=0;s.forEach(r=>{const d=r.dataset.name||"",c=r.dataset.id||"",l=t.includes(c),m=a.includes(c);let u=!0;ge==="tracked"&&(u=l),ge==="remaining"&&(u=l&&!m);const Me=(!e||d.includes(e))&&u;r.classList.toggle("hidden",!Me),Me&&i++}),Ze&&Ze.classList.toggle("hidden",i>0)}he&&he.addEventListener("input",ye),et.forEach(e=>{e.addEventListener("click",()=>{et.forEach(t=>t.classList.remove("active")),e.classList.add("active"),ge=e.dataset.neededView,ye()})});const tt=n("#clearNeededBtn");tt&&tt.addEventListener("click",()=>{Ye([]),ve([]),V(),ye()});const at="arcraided-blueprints";function st(){try{return JSON.parse(localStorage.getItem(at)||"[]")}catch{return[]}}function it(e){try{localStorage.setItem(at,JSON.stringify(e))}catch{}}function Le(){const e=st(),t=o(".bp-card"),a=t.length,s=t.filter(c=>e.includes(c.dataset.id)).length;t.forEach(c=>{c.classList.toggle("is-collected",e.includes(c.dataset.id))});const i=n("#bpCollected"),r=n("#bpRemaining"),d=n("#bpProgressFill");i&&(i.textContent=s),r&&(r.textContent=a-s),d&&(d.style.width=a>0?`${(s/a*100).toFixed(1)}%`:"0%")}const K=n("#bpGrid");K&&(K.addEventListener("click",e=>{const t=e.target.closest("[data-bp-toggle]");if(t){const a=t.dataset.bpToggle,s=st(),i=s.indexOf(a);i>-1?s.splice(i,1):s.push(a),it(s),Le()}}),Le());const $e=n("#bpSearch"),nt=n("#noBpResults");$e&&K&&$e.addEventListener("input",()=>{const e=$e.value.toLowerCase().trim(),t=o(".bp-card",K);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),nt&&nt.classList.toggle("hidden",a>0)});const rt=n("#clearBpBtn");rt&&rt.addEventListener("click",()=>{it([]),Le()});const Ee=n("#workshopSearch"),dt=n("#workshopGrid"),ot=n("#noWorkshopResults");Ee&&dt&&Ee.addEventListener("input",()=>{const e=Ee.value.toLowerCase().trim(),t=o("[data-name]",dt);let a=0;t.forEach(s=>{const i=!e||(s.dataset.name||"").includes(e);s.classList.toggle("hidden",!i),i&&a++}),ot&&ot.classList.toggle("hidden",a>0)});const ct="arcraided-loadouts";function we(){try{return JSON.parse(localStorage.getItem(ct)||"[]")}catch{return[]}}function lt(e){try{localStorage.setItem(ct,JSON.stringify(e))}catch{}}let ke={};const Y=n("#loadoutPickerModal"),I=n("#loadoutPickerGrid"),Se=n("#loadoutPickerSearch"),mt=n("#closeLoadoutPicker");let E=null;function Ft(e){if(!Y||!I)return;E=e;const t=v.metaforge?.items||[];I.innerHTML=t.map(a=>`
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
        `).join(""),Y.classList.remove("hidden"),document.body.style.overflow="hidden"}I&&I.addEventListener("click",e=>{const t=e.target.closest(".item-card");if(!t||!E)return;const a=t.dataset.id,i=(v.metaforge?.items||[]).find(d=>d.id===a);if(!i)return;ke[E]=i;const r=document.querySelector(`[data-slot-name="${E}"]`);r&&(r.innerHTML=`
                    <div style="display:flex;align-items:center;gap:.5rem;padding:.5rem">
                        ${i.icon?`<img src="${i.icon}" style="width:36px;height:36px;border-radius:8px;object-fit:contain" />`:""}
                        <div>
                            <div style="font-weight:700;font-size:.85rem">${i.name}</div>
                            <span class="rarity-badge ${(i.rarity||"common").toLowerCase()}">${i.rarity}</span>
                        </div>
                    </div>
                `),Y.classList.add("hidden"),document.body.style.overflow="",E=null}),mt&&mt.addEventListener("click",()=>{Y.classList.add("hidden"),document.body.style.overflow="",E=null}),Se&&Se.addEventListener("input",()=>{const e=Se.value.toLowerCase().trim();o(".item-card",I).forEach(a=>{const s=!e||(a.dataset.name||"").includes(e);a.classList.toggle("hidden",!s)})}),o(".loadout-slot-picker").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.slotName;t&&Ft(t)})});const ft=n("#saveLoadoutBtn"),be=n("#loadoutName"),X=n("#savedLoadoutsList");ft&&ft.addEventListener("click",()=>{const e=be?.value||"Unnamed Loadout",t=we();t.push({name:e,slots:{...ke},savedAt:new Date().toISOString()}),lt(t),xe()});function xe(){if(!X)return;const e=we();if(e.length===0){X.innerHTML='<p class="muted" style="font-size:.85rem">No saved loadouts yet. Build one above and click Save!</p>';return}X.innerHTML=e.map((t,a)=>`
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
        `).join(""),o("[data-delete-loadout]",X).forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.deleteLoadout,10),s=we();s.splice(a,1),lt(s),xe()})})}xe();const pt=n("#newLoadoutBtn");pt&&pt.addEventListener("click",()=>{ke={},be&&(be.value="My Loadout"),o(".loadout-slot-picker").forEach(e=>{e.innerHTML='<div class="loadout-slot-empty"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg><span>Click to select</span></div>'})});const j=n("#tierListContainer"),p=n("#tierItemPool"),ut=o("#tierListCatFilters .cat-filter"),vt="arcraided-tierlist";function Nt(){try{return JSON.parse(localStorage.getItem(vt)||"{}")}catch{return{}}}function ht(e){try{localStorage.setItem(vt,JSON.stringify(e))}catch{}}if(p&&j){let t=function(s){e=s.target.closest(".tier-item"),e&&(s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",e.dataset.id),e.style.opacity="0.4")},a=function(){e&&(e.style.opacity="1"),e=null,o(".tier-drop-zone").forEach(s=>s.classList.remove("drag-over"))};var Ht=t,Pt=a;let e=null;p.addEventListener("dragstart",t),p.addEventListener("dragend",a),o(".tier-drop-zone",j).forEach(s=>{s.addEventListener("dragover",i=>{i.preventDefault(),i.dataTransfer.dropEffect="move",s.classList.add("drag-over")}),s.addEventListener("dragleave",()=>s.classList.remove("drag-over")),s.addEventListener("drop",i=>{if(i.preventDefault(),s.classList.remove("drag-over"),!e)return;const r=s.querySelector(".tier-placeholder");r&&r.remove(),s.appendChild(e),e.style.opacity="1",e.addEventListener("dragstart",t),e.addEventListener("dragend",a)})}),p.addEventListener("dragover",s=>{s.preventDefault(),s.dataTransfer.dropEffect="move"}),p.addEventListener("drop",s=>{s.preventDefault(),e&&(p.appendChild(e),e.style.opacity="1")})}const gt=n("#saveTierListBtn");gt&&gt.addEventListener("click",()=>{const e={};o(".tier-drop-zone").forEach(t=>{const a=t.dataset.tierZone;e[a]=o(".tier-item",t).map(s=>s.dataset.id)}),ht(e)});const yt=n("#resetTierListBtn");if(yt&&p&&yt.addEventListener("click",()=>{o(".tier-drop-zone .tier-item").forEach(e=>{p.appendChild(e)}),o(".tier-drop-zone").forEach(e=>{if(!e.querySelector(".tier-placeholder")){const t=document.createElement("span");t.className="tier-placeholder",t.textContent="Drag items here",e.appendChild(t)}}),ht({})}),p&&j){const e=Nt();Object.entries(e).forEach(([t,a])=>{const s=j.querySelector(`[data-tier-zone="${t}"]`);if(!s)return;const i=s.querySelector(".tier-placeholder");i&&a.length>0&&i.remove(),a.forEach(r=>{const d=p.querySelector(`[data-id="${r}"]`)||j.querySelector(`[data-id="${r}"]`);d&&s.appendChild(d)})})}ut.forEach(e=>{e.addEventListener("click",()=>{ut.forEach(i=>i.classList.remove("active")),e.classList.add("active");const t=e.dataset.tierCat;if(!p)return;const a=v.items||[],s=t==="All"?a:a.filter(i=>i.category===t);o(".tier-drop-zone").forEach(i=>{i.innerHTML='<span class="tier-placeholder">Drag items here</span>'}),p.innerHTML=s.map(i=>`
                <div class="tier-item" draggable="true" data-id="${i.id}" data-name="${i.name}" data-category="${i.category}" title="${i.name}">
                    ${i.icon?`<img src="${h(i.icon)}" alt="${i.name}" loading="lazy" />`:`<span style="font-size:.6rem;text-align:center;line-height:1.1">${i.name.slice(0,8)}</span>`}
                </div>
            `).join("")})});function Lt(){const e=Date.now();o("[data-end-ms]").forEach(t=>{const s=parseInt(t.dataset.endMs,10)-e;if(s<=0){t.textContent="Ended";return}const i=Math.floor(s/36e5),r=Math.floor(s%36e5/6e4),d=Math.floor(s%6e4/1e3);t.textContent=`${i}h ${r}m ${d}s`}),o("[data-start-ms]").forEach(t=>{const s=parseInt(t.dataset.startMs,10)-e;if(s<=0){t.textContent="Started!";return}const i=Math.floor(s/864e5),r=Math.floor(s%864e5/36e5),d=Math.floor(s%36e5/6e4),c=Math.floor(s%6e4/1e3);t.textContent=i>0?`${i}d ${r}h ${d}m`:`${r}h ${d}m ${c}s`})}Lt(),setInterval(Lt,1e3),(()=>{try{return localStorage.getItem("arcraided-source")}catch{return null}})()==="metaforge"?Fe("metaforge"):o("[data-source-only]").forEach(e=>{const t=e.dataset.sourceOnly;e.style.display=t&&t!=="ardb"?"none":""})})();
