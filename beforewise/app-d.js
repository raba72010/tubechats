
function toggleSave(){const id=state.scenarioId;if(!id)return;if(store.saved.includes(id)){store.saved=store.saved.filter(x=>x!==id);toast('Removed from saved')}else{store.saved.unshift(id);toast('Saved locally')}persist();render()}

function bind(){
 document.querySelectorAll('[data-scenario]').forEach(b=>b.onclick=()=>openScenario(b.dataset.scenario));
 document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>nav(b.dataset.nav));
 document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{state.category=b.dataset.category;render()});
 document.querySelectorAll('[data-home-category]').forEach(b=>b.onclick=()=>{state.category=b.dataset.homeCategory;state.view='discover';render()});
 const hs=document.getElementById('homeSearch'); if(hs){hs.oninput=e=>state.query=e.target.value;hs.onkeydown=e=>{if(e.key==='Enter'){state.view='discover';state.category='All';render()}}}
 const hb=document.getElementById('homeSearchBtn'); if(hb)hb.onclick=()=>{state.view='discover';state.category='All';render()};
 const ds=document.getElementById('discoverSearch');if(ds)ds.oninput=e=>{state.query=e.target.value;updateDiscoverResults()};
 const back=document.getElementById('backBtn');if(back)back.onclick=()=>{state.view='discover';state.scenarioId=null;render()};
 document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;render()});
 document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>{state.expandedStage=state.expandedStage===b.dataset.stage?null:b.dataset.stage;render()});
 document.querySelectorAll('[data-check]').forEach(cb=>cb.onchange=()=>{const s=scenarioById(state.scenarioId);const key=itemKey(s,Number(cb.dataset.check));store.checked[key]=cb.checked;if(!cb.checked)delete store.checked[key];persist();render()});
 ['saveScenario','saveScenarioAside','mobileSave'].forEach(id=>{const el=document.getElementById(id);if(el)el.onclick=toggleSave});
 document.getElementById('sidebarCustom')?.addEventListener('click',()=>{state.view='custom';state.scenarioId=null;render()});
 const add=document.getElementById('addManual');if(add){add.onclick=addManualRow;for(let i=0;i<4;i++)addManualRow()}
 const save=document.getElementById('saveManual');if(save)save.onclick=saveManual;
}
function addManualRow(){const wrap=document.getElementById('manualRows');if(!wrap)return;const row=document.createElement('div');row.className='manual-row';row.innerHTML=`<select><option value="do">Do</option><option value="dont">Don’t</option><option value="remember">Remember</option><option value="watch">Watch out</option></select><input placeholder="Checklist item"><button title="Remove">Remove</button>`;row.querySelector('button').onclick=()=>row.remove();wrap.appendChild(row)}
function saveManual(){const title=document.getElementById('customTitle').value.trim();if(!title){toast('Add a situation name');return}const category=document.getElementById('customCategory').value;const rows=[...document.querySelectorAll('.manual-row')];const items=rows.map(r=>({type:r.querySelector('select').value,text:r.querySelector('input').value.trim(),stage:'My checklist'})).filter(x=>x.text);if(!items.length){toast('Add at least one item');return}const id='custom-'+Date.now();const s={id,title,category,description:'Your own manual BeforeWise checklist.',keywords:[title.toLowerCase()],items,sources:[],featured:false};store.custom.unshift(s);store.saved.unshift(id);persist();toast('Checklist created');openScenario(id)}

const globalSearch=document.getElementById('globalSearch');
globalSearch.addEventListener('input',e=>state.query=e.target.value);
globalSearch.addEventListener('keydown',e=>{if(e.key==='Enter'){state.view='discover';state.category='All';render()}});
document.getElementById('globalSearchBtn').onclick=()=>{state.view='discover';state.category='All';render()};
document.getElementById('resetProgressBtn').onclick=()=>{store.checked={};persist();toast('Progress reset');if(state.view==='scenario')render()};
const initialScenario=new URLSearchParams(location.search).get('scenario');if(initialScenario&&scenarioById(initialScenario)){const s=scenarioById(initialScenario);state.view='scenario';state.scenarioId=initialScenario;state.expandedStage=[...new Set(s.items.map(i=>i.stage))][0]||null;}
render();
