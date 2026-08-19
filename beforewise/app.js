const {SCENARIOS:BW_SCENARIOS,CATEGORIES:BW_CATEGORIES} = window.BEFOREWISE_DATA;
const app = document.getElementById('app');
const state = {view:'home', category:'All', query:'', scenarioId:null, filter:'all', mode:'checklist'};
const KEY='beforewise-v1';
const loadStore=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{checked:{},saved:[],custom:[]}}catch{return {checked:{},saved:[],custom:[]}}};
let store=loadStore();
store.checked=store.checked||{}; store.saved=store.saved||[]; store.custom=store.custom||[];
function persist(){try{localStorage.setItem(KEY,JSON.stringify(store));}catch{}}
function esc(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));}
function toast(msg){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1400)}
function nav(view){state.view=view;state.scenarioId=null;state.query='';window.scrollTo({top:0,behavior:'smooth'});render()}
function scenarioById(id){return BW_SCENARIOS.find(s=>s.id===id)||store.custom.find(s=>s.id===id)}
function itemKey(s,i){return `${s.id}:${i}`}
function setActiveNav(){document.querySelectorAll('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===state.view));}
function typeLabel(t){return t==='do'?'Do':t==='dont'?"Don’t":t==='remember'?'Remember':'Watch out'}
function card(s){return `<button class="scenario-card" data-scenario="${s.id}"><div class="scenario-top"><span class="scenario-category">${esc(s.category)}</span>${s.sources?.length?'<span class="source-dot">Source-backed</span>':''}</div><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><div class="scenario-meta"><span>${s.items.length} useful checks</span><span class="arrow">›</span></div></button>`}
function filteredScenarios(){const q=state.query.trim().toLowerCase();return BW_SCENARIOS.filter(s=>(state.category==='All'||s.category===state.category)&&(!q||[s.title,s.description,...s.keywords,s.category].join(' ').toLowerCase().includes(q)));}
function home(){
 const featured=BW_SCENARIOS.filter(s=>s.featured).slice(0,9);
 return `<section class="hero"><div><div class="eyebrow">Practical intelligence before real life happens</div><h1>What are you about to do?</h1><p>Pick a real-life situation and get one useful checklist: what to do, what not to do, what to remember, and what to watch out for.</p><div class="search-wrap"><span class="search-icon">⌕</span><input id="homeSearch" class="search-input" placeholder="Try “airport”, “used car”, “Umrah”, “interview”…" value="${esc(state.query)}"><button class="search-button" id="searchBtn">Find checklist</button></div></div><div class="hero-preview" aria-hidden="true"><div class="preview-card do"><div class="preview-kicker">Do</div><div class="preview-text">Check passport validity for your destination</div><div class="preview-sub">Before an international flight</div></div><div class="preview-card dont"><div class="preview-kicker">Don’t</div><div class="preview-text">Put a power bank in checked baggage</div><div class="preview-sub">A small rule that can stop a big airport problem</div></div><div class="preview-card watch"><div class="preview-kicker">Watch out</div><div class="preview-text">Visa and transit rules can change</div><div class="preview-sub">BeforeWise points you back to official sources</div></div></div></section>
 <section><div class="section-head"><div><h2>Start with a real situation</h2><p>Curated, practical checklists — not generic productivity templates.</p></div><button class="text-btn" data-nav="discover">Browse all →</button></div><div class="scenario-grid">${featured.map(card).join('')}</div></section>
 <div class="library-banner"><div><h3>A library you can actually use</h3><p>${BW_SCENARIOS.length} starter situations, ${BW_SCENARIOS.reduce((a,s)=>a+s.items.length,0)} checklist items, with official sources attached where rules matter.</p></div><div class="stats"><div class="stat"><strong>${BW_SCENARIOS.length}</strong><small>situations</small></div><div class="stat"><strong>${new Set(BW_SCENARIOS.map(s=>s.category)).size}</strong><small>categories</small></div><div class="stat"><strong>${BW_SCENARIOS.filter(s=>s.sources.length).length}</strong><small>source-backed</small></div></div></div>
 <section><div class="section-head"><div><h2>Browse by category</h2><p>Travel, work, purchases, family, Saudi/GCC and everyday life.</p></div></div><div class="category-strip">${BW_CATEGORIES.filter(c=>c!=='All').map(c=>`<button class="chip" data-home-category="${esc(c)}">${esc(c)}</button>`).join('')}</div></section>
 <div class="custom-card"><div><h3>Need something we don’t have?</h3><p>Create a manual BeforeWise checklist now — no AI required.</p></div><button id="customStart">Create my own</button></div>`;
}
function discover(){const list=filteredScenarios();return `<section class="discover-hero"><div class="eyebrow">Checklist library</div><h1>Choose the moment.</h1><p>Search real scenarios, then use one checklist with Do, Don’t, Remember and Watch out items.</p><div class="search-wrap"><span class="search-icon">⌕</span><input id="discoverSearch" class="search-input" placeholder="Search situations…" value="${esc(state.query)}"></div></section><div class="category-strip">${BW_CATEGORIES.map(c=>`<button class="chip ${state.category===c?'active':''}" data-category="${esc(c)}">${esc(c)}</button>`).join('')}</div><div id="scenarioResults">${list.length?`<div class="scenario-grid">${list.map(card).join('')}</div>`:`<div class="saved-empty"><h3>No checklist found</h3><p>Try a broader term or another category.</p></div>`}</div><div class="custom-card"><div><h3>Create your own checklist</h3><p>For situations that are personal or not yet in the library.</p></div><button id="customStart">Create manually</button></div>`}
function saved(){const ids=store.saved;const list=ids.map(scenarioById).filter(Boolean);return `<section class="saved-hero"><div class="eyebrow">Your library</div><h1>Saved checklists.</h1><p>Everything is stored locally in this browser for this prototype.</p></section>${list.length?`<div class="scenario-grid">${list.map(card).join('')}</div>`:`<div class="saved-empty"><h3>Nothing saved yet</h3><p>Open any checklist and tap Save. Your checked progress is kept locally too.</p><button class="primary-btn" data-nav="discover">Browse checklists</button></div>`}`}
function checklistItem(s,item,index){const key=itemKey(s,index);const checked=!!store.checked[key];return `<label class="check-item ${checked?'checked':''}" data-type="${item.type}"><input class="checkbox" type="checkbox" data-check="${index}" ${checked?'checked':''}><span class="type-tag type-${item.type}">${typeLabel(item.type)}</span><span class="check-text">${esc(item.text)}</span></label>`}
function scenarioView(s){
 const saved=store.saved.includes(s.id);const checkedCount=s.items.filter((_,i)=>store.checked[itemKey(s,i)]).length;const pct=Math.round((checkedCount/s.items.length)*100);
 const visible=s.items.map((item,index)=>({item,index})).filter(x=>state.filter==='all'||x.item.type===state.filter);
 let body='';
 if(state.mode==='stage'){
   const stages=[...new Set(visible.map(x=>x.item.stage))];
   body=stages.map(stage=>`<section class="stage-group"><div class="stage-head">${esc(stage)}</div>${visible.filter(x=>x.item.stage===stage).map(x=>checklistItem(s,x.item,x.index)).join('')}</section>`).join('');
 } else body=`<div class="checklist">${visible.map(x=>checklistItem(s,x.item,x.index)).join('')}</div>`;
 return `<div class="page-head"><button class="back-btn" id="backBtn">‹</button><div class="page-head-copy"><div class="eyebrow">${esc(s.category)}</div><h1>${esc(s.title)}</h1><p>${esc(s.description)}</p></div><button class="save-btn ${saved?'saved':''}" id="saveScenario">${saved?'Saved ✓':'Save'}</button></div>
 <div class="checklist-toolbar"><div class="toolbar-row"><div class="filter-pills">${[['all','All'],['do','Do'],['dont','Don’t'],['remember','Remember'],['watch','Watch out']].map(([k,l])=>`<button class="filter-pill ${state.filter===k?'active':''}" data-filter="${k}">${l}</button>`).join('')}</div><div class="view-toggle"><button class="${state.mode==='checklist'?'active':''}" data-mode="checklist">Checklist</button><button class="${state.mode==='stage'?'active':''}" data-mode="stage">By stage</button></div></div><div class="progress-row"><span>Progress</span><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><span class="progress-num">${checkedCount}/${s.items.length}</span></div></div>
 ${body}
 ${s.sources?.length?`<section class="sources"><h3>Current official sources</h3><p>BeforeWise is not replacing official rules. These links were checked while building this prototype on 19 Aug 2026; always open the source when a rule can change.</p><div class="source-list">${s.sources.map(src=>`<a class="source-link" href="${src.url}" target="_blank" rel="noreferrer"><strong>${esc(src.title)}</strong><small>${esc(src.org)} · Open source ↗</small></a>`).join('')}</div></section>`:''}`;
}
function customEditor(){return `<div class="custom-editor"><div class="page-head"><button class="back-btn" id="backBtn">‹</button><div class="page-head-copy"><div class="eyebrow">Manual checklist</div><h1>Create your own</h1><p>No AI. Add exactly the items you want, then save it locally.</p></div></div><div class="form-field"><label>Situation</label><input id="customTitle" placeholder="e.g. Visiting a project site tomorrow"></div><div class="form-field"><label>Category</label><select id="customCategory">${BW_CATEGORIES.filter(c=>c!=='All').map(c=>`<option>${c}</option>`).join('')}</select></div><div id="manualRows" class="manual-list"></div><div style="display:flex;gap:9px;flex-wrap:wrap"><button class="secondary-btn" id="addManual">+ Add item</button><button class="primary-btn" id="saveManual">Save checklist</button></div></div>`}

function updateDiscoverResults(){
  const host=document.getElementById('scenarioResults');
  if(!host)return;
  const list=filteredScenarios();
  host.innerHTML=list.length?`<div class="scenario-grid">${list.map(card).join('')}</div>`:`<div class="saved-empty"><h3>No checklist found</h3><p>Try a broader term or another category.</p></div>`;
  host.querySelectorAll('[data-scenario]').forEach(b=>b.onclick=()=>openScenario(b.dataset.scenario));
}

function render(){setActiveNav(); if(state.view==='scenario') app.innerHTML=scenarioView(scenarioById(state.scenarioId)); else if(state.view==='discover') app.innerHTML=discover(); else if(state.view==='saved') app.innerHTML=saved(); else if(state.view==='custom') app.innerHTML=customEditor(); else app.innerHTML=home(); bind();}
function openScenario(id){state.view='scenario';state.scenarioId=id;state.filter='all';state.mode='checklist';window.scrollTo({top:0,behavior:'smooth'});render()}
function bind(){
 document.querySelectorAll('[data-scenario]').forEach(b=>b.onclick=()=>openScenario(b.dataset.scenario));
 document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>nav(b.dataset.nav));
 document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{state.category=b.dataset.category;render()});
 document.querySelectorAll('[data-home-category]').forEach(b=>b.onclick=()=>{state.category=b.dataset.homeCategory;state.view='discover';render()});
 const hs=document.getElementById('homeSearch');if(hs){hs.oninput=e=>state.query=e.target.value;hs.onkeydown=e=>{if(e.key==='Enter'){state.view='discover';state.category='All';render()}}}
 const sb=document.getElementById('searchBtn');if(sb)sb.onclick=()=>{state.view='discover';state.category='All';render()};
 const ds=document.getElementById('discoverSearch');if(ds)ds.oninput=e=>{state.query=e.target.value;updateDiscoverResults()};
 const back=document.getElementById('backBtn');if(back)back.onclick=()=>{state.view=state.scenarioId?'discover':'home';state.scenarioId=null;render()};
 document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;render()});
 document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{state.mode=b.dataset.mode;render()});
 document.querySelectorAll('[data-check]').forEach(cb=>cb.onchange=()=>{const s=scenarioById(state.scenarioId);const key=itemKey(s,Number(cb.dataset.check));store.checked[key]=cb.checked;if(!cb.checked)delete store.checked[key];persist();render()});
 const sv=document.getElementById('saveScenario');if(sv)sv.onclick=()=>{const id=state.scenarioId;if(store.saved.includes(id)){store.saved=store.saved.filter(x=>x!==id);toast('Removed from saved')}else{store.saved.unshift(id);toast('Saved locally')}persist();render()};
 document.querySelectorAll('#customStart').forEach(b=>b.onclick=()=>{state.view='custom';state.scenarioId=null;render()});
 const add=document.getElementById('addManual');if(add){add.onclick=addManualRow;for(let i=0;i<4;i++)addManualRow();}
 const save=document.getElementById('saveManual');if(save)save.onclick=saveManual;
}
function addManualRow(){const wrap=document.getElementById('manualRows');if(!wrap)return;const row=document.createElement('div');row.className='manual-row';row.innerHTML=`<select><option value="do">Do</option><option value="dont">Don’t</option><option value="remember">Remember</option><option value="watch">Watch out</option></select><input placeholder="Checklist item"><button title="Remove">×</button>`;row.querySelector('button').onclick=()=>row.remove();wrap.appendChild(row)}
function saveManual(){const title=document.getElementById('customTitle').value.trim();if(!title){toast('Add a situation name');return}const category=document.getElementById('customCategory').value;const rows=[...document.querySelectorAll('.manual-row')];const items=rows.map(r=>({type:r.querySelector('select').value,text:r.querySelector('input').value.trim(),stage:'My checklist'})).filter(x=>x.text);if(!items.length){toast('Add at least one item');return}const id='custom-'+Date.now();const s={id,title,category,description:'Your own manual BeforeWise checklist.',keywords:[title.toLowerCase()],items,sources:[],featured:false};store.custom.unshift(s);store.saved.unshift(id);persist();toast('Checklist created');openScenario(id)}

document.getElementById('resetProgressBtn').onclick=()=>{store.checked={};persist();toast('Progress reset');if(state.view==='scenario')render()};
render();
