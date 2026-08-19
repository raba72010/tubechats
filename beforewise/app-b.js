
function saved(){const list=store.saved.map(scenarioById).filter(Boolean);return `<section class="library-head"><span class="hero-kicker">Saved field guides</span><h1>Your checklists.</h1><p>Saved and checked progress stays in this browser.</p></section>${list.length?`<div class="situation-list library-list">${list.map(scenarioRow).join('')}</div>`:`<div class="empty-state"><h3>Nothing saved yet.</h3><p>Open a field guide and save it for later.</p><button class="primary-btn" data-nav="discover">Find a situation</button></div>`}`}

function filterPills(s){const c=typeCounts(s);return `<div class="filter-pills">${[['all','All',s.items.length],['do','Do',c.do],['dont','Don’t',c.dont],['remember','Remember',c.remember],['watch','Watch out',c.watch]].map(([k,l,n])=>`<button class="filter-pill ${k} ${state.filter===k?'active':''}" data-filter="${k}">${l}<span>${n}</span></button>`).join('')}</div>`}

function checklistItem(s,item,index){
 const checked=!!store.checked[itemKey(s,index)];
 const isDont=item.type==='dont';
 return `<label class="field-check ${checked?'checked':''} ${isDont?'is-dont':''}" data-type="${item.type}">
   <input class="checkbox" type="checkbox" data-check="${index}" ${checked?'checked':''} />
   <span class="check-copy"><strong>${esc(item.text)}</strong>${item.type==='dont'?'<small>Avoid this if you can.</small>':''}</span>
   <span class="check-type ${item.type}">${typeLabel(item.type)}</span>
 </label>`
}

function stageBlock(s,stage,stageIndex,visibleIndices){
 const indices=s.items.map((item,index)=>({item,index})).filter(x=>x.item.stage===stage && visibleIndices.includes(x.index));
 if(!indices.length)return '';
 const allStageIndices=s.items.map((item,index)=>({item,index})).filter(x=>x.item.stage===stage);
 const done=allStageIndices.filter(x=>store.checked[itemKey(s,x.index)]).length;
 const open=state.expandedStage===stage || (state.expandedStage===null && stageIndex===0);
 return `<section class="stage-block ${open?'open':''}">
   <button class="stage-toggle" data-stage="${esc(stage)}">
     <span class="stage-no">${String(stageIndex+1).padStart(2,'0')}</span>
     <span class="stage-name">${esc(titleCaseStage(stage))}</span>
     <span class="stage-rule"></span>
     <span class="stage-count">${done}/${allStageIndices.length}</span>
     <span class="stage-chevron">${open?'−':'+'}</span>
   </button>
   <div class="stage-items">${indices.map(x=>checklistItem(s,x.item,x.index)).join('')}</div>
 </section>`
}

function stageRail(s){const stages=[...new Set(s.items.map(i=>i.stage))];return `<div class="stage-rail"><span>By stage</span>${stages.map((stage,i)=>{const items=s.items.map((item,index)=>({item,index})).filter(x=>x.item.stage===stage);const done=items.filter(x=>store.checked[itemKey(s,x.index)]).length;return `<button data-stage="${esc(stage)}" class="${(state.expandedStage===stage || (state.expandedStage===null&&i===0))?'active':''}"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(titleCaseStage(stage))}</span><em>${done}/${items.length}</em></button>`}).join('')}</div>`}

function sourceCard(s){if(!s.sources?.length)return '';return `<section class="side-card source-card"><h3>Sources</h3><p>Information from official or trusted sources.</p><div class="source-links">${s.sources.slice(0,4).map(src=>`<a href="${src.url}" target="_blank" rel="noreferrer"><strong>${esc(src.org)}</strong><span>${esc(src.title)}</span></a>`).join('')}</div></section>`}

function scenarioView(s){
 const saved=store.saved.includes(s.id), prog=progressFor(s), counts=typeCounts(s);
 const visibleIndices=s.items.map((_,i)=>i).filter(i=>state.filter==='all'||s.items[i].type===state.filter);
 const stages=[...new Set(s.items.map(i=>i.stage))];
 const art=s.id==='used-car'?`<img class="scenario-art" src="car-editorial.jpg" alt="Editorial illustration of a used car" />`:'';
 const fieldGuideLabel=s.id==='used-car'?`${s.items.length} things worth knowing before you pay.`:`${s.items.length} things worth knowing before you ${s.title.toLowerCase().startsWith('going')?'go':'begin'}.`;
 return `<div class="scenario-layout">
   <div class="scenario-main">
     <div class="scenario-topline"><button id="backBtn" class="back-link">Back to situations</button><button id="saveScenario" class="save-link ${saved?'saved':''}">${saved?'Saved':'Save'}</button></div>
     <header class="scenario-hero">
       <div class="scenario-title-wrap"><span class="hero-kicker">${esc(s.category)} field guide</span><h1>${esc(s.title)}</h1><p>${esc(fieldGuideLabel)}</p></div>${art}
     </header>
     ${filterPills(s)}
     <div class="mobile-progress-strip"><span>${prog.done}/${prog.total}</span><div><strong>${prog.pct}% prepared</strong><small>Progress is saved locally.</small></div></div>
     <div class="stage-stack">${stages.map((stage,i)=>stageBlock(s,stage,i,visibleIndices)).join('')}</div>
     ${s.sources?.length?`<section class="mobile-sources"><h3>Sources used for this guide</h3>${s.sources.map(src=>`<a href="${src.url}" target="_blank" rel="noreferrer">${esc(src.org)} — ${esc(src.title)}</a>`).join('')}</section>`:''}
   </div>
   <aside class="scenario-aside">
     <section class="side-card progress-card"><span>Your progress</span><div class="progress-ring" style="--progress:${prog.pct}"><strong>${prog.done}<small>/${prog.total}</small></strong></div><p>${prog.pct===100?'You’re BeforeWise.':prog.done===0?'Ready to start.':'Good progress.'}</p></section>
     ${stageRail(s)}
     ${sourceCard(s)}
     <button id="saveScenarioAside" class="save-card ${saved?'saved':''}"><strong>${saved?'Saved checklist':'Save this checklist'}</strong><span>${saved?'Available in your saved field guides.':'Add this guide to your saved items.'}</span></button>
   </aside>
 </div>
 <div class="mobile-progress-footer"><div class="footer-progress"><strong>${prog.done}/${prog.total}</strong></div><div><strong>${prog.pct===100?'You’re BeforeWise.':prog.done===0?'Ready when you are.':'Good progress!'}</strong><small>${prog.pct===100?'Everything on this guide is checked.':'Keep going — the important things are visible.'}</small></div><button id="mobileSave">${saved?'Saved':'Save'}</button></div>`;
}
