const {SCENARIOS:BW_SCENARIOS,CATEGORIES:BW_CATEGORIES} = window.BEFOREWISE_DATA;
const app = document.getElementById('app');
const state = {view:'home', category:'All', query:'', scenarioId:null, filter:'all', expandedStage:null};
const KEY='beforewise-v1';
const loadStore=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{checked:{},saved:[],custom:[]}}catch{return {checked:{},saved:[],custom:[]}}};
let store=loadStore();
store.checked=store.checked||{}; store.saved=store.saved||[]; store.custom=store.custom||[];
function persist(){try{localStorage.setItem(KEY,JSON.stringify(store));}catch{}}
function esc(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));}
function toast(msg){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1500)}
function scenarioById(id){return BW_SCENARIOS.find(s=>s.id===id)||store.custom.find(s=>s.id===id)}
function itemKey(s,i){return `${s.id}:${i}`}
function typeLabel(t){return t==='do'?'Do':t==='dont'?"Don’t":t==='remember'?'Remember':'Watch out'}
function typeCounts(s){return s.items.reduce((a,i)=>(a[i.type]=(a[i.type]||0)+1,a),{do:0,dont:0,remember:0,watch:0})}
function nav(view){state.view=view;state.scenarioId=null;state.query='';state.filter='all';try{history.replaceState(null,'',location.pathname)}catch{}window.scrollTo({top:0,behavior:'smooth'});render()}
function setActiveNav(){document.querySelectorAll('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===state.view));}
function filteredScenarios(){const q=state.query.trim().toLowerCase();return BW_SCENARIOS.filter(s=>(state.category==='All'||s.category===state.category)&&(!q||[s.title,s.description,...s.keywords,s.category].join(' ').toLowerCase().includes(q)))}
function progressFor(s){const done=s.items.filter((_,i)=>store.checked[itemKey(s,i)]).length;return {done,total:s.items.length,pct:s.items.length?Math.round(done/s.items.length*100):0}}
function stageData(s){const stages=[];for(const item of s.items){let st=stages.find(x=>x.name===item.stage);if(!st){st={name:item.stage,items:[]};stages.push(st)}st.items.push(item)}return stages}
function titleCaseStage(stage){return stage.replace(/\b\w/g,m=>m.toUpperCase())}

function scenarioRow(s){const prog=progressFor(s);return `<button class="situation-row" data-scenario="${s.id}"><span class="situation-index">${String(BW_SCENARIOS.indexOf(s)+1).padStart(2,'0')}</span><span class="situation-copy"><strong>${esc(s.title)}</strong><small>${esc(s.description)}</small></span><span class="situation-meta">${s.items.length} checks${prog.done?` · ${prog.done} done`:''}</span></button>`}

function home(){
 const featured=BW_SCENARIOS.filter(s=>s.featured).slice(0,7);
 const popular=BW_SCENARIOS.slice(0,8);
 return `<section class="home-hero">
   <div class="hero-kicker">Before anything, be BeforeWise.</div>
   <h1>Know what matters<br>before you do it.</h1>
   <p>Choose a real-life situation and get a practical field guide: what to do, what not to do, what to remember and what to watch out for.</p>
   <div class="hero-search-row">
     <input id="homeSearch" placeholder="Airport, used car, interview, Umrah…" value="${esc(state.query)}" />
     <button id="homeSearchBtn">Find a situation</button>
   </div>
 </section>
 <section class="editorial-section">
   <div class="editorial-heading"><span>Popular right now</span><button data-nav="discover">View all situations</button></div>
   <div class="situation-list">${featured.map(scenarioRow).join('')}</div>
 </section>
 <section class="home-columns">
   <div><div class="editorial-heading"><span>Browse by category</span></div><div class="category-lines">${BW_CATEGORIES.filter(x=>x!=='All').map(c=>`<button data-home-category="${esc(c)}">${esc(c)}<span>${BW_SCENARIOS.filter(s=>s.category===c).length}</span></button>`).join('')}</div></div>
   <div class="manifesto"><span>BeforeWise field note</span><blockquote>“Good preparation is often knowing what not to do.”</blockquote><p>${BW_SCENARIOS.length} situations · ${BW_SCENARIOS.reduce((a,s)=>a+s.items.length,0)} researched checklist items.</p></div>
 </section>`;
}

function discover(){const list=filteredScenarios();return `<section class="library-head"><div><span class="hero-kicker">Situation library</span><h1>What are you about to do?</h1><p>Search the moments where a small piece of preparation can save time, money or trouble.</p></div></section>
 <div class="library-search"><input id="discoverSearch" placeholder="Search all situations…" value="${esc(state.query)}" /></div>
 <div class="category-tabs">${BW_CATEGORIES.map(c=>`<button class="${state.category===c?'active':''}" data-category="${esc(c)}">${esc(c)}</button>`).join('')}</div>
 <div id="scenarioResults" class="situation-list library-list">${list.length?list.map(scenarioRow).join(''):`<div class="empty-state"><h3>No situation found.</h3><p>Try a broader phrase or another category.</p></div>`}</div>`}
