/* BeforeWise full-library visual + mobile consistency layer */
(function(){
  const ART_BY_CATEGORY={'Travel':'art-travel.jpg','Work':'art-work.jpg','Home & Life':'art-home.jpg','Buying & Money':'art-buying.jpg','Digital':'art-digital.jpg','Saudi & GCC':'art-saudi.jpg','Events & Social':'art-events.jpg','Family':'art-family.jpg'};
  let visualStoryCleanup=()=>{};

  function artFileFor(s){if(s.id==='used-car')return 'car-editorial.jpg';if(String(s.id||'').startsWith('custom-'))return 'art-custom.jpg';return ART_BY_CATEGORY[s.category]||'art-custom.jpg'}
  function artClassFor(s){if(s.id==='used-car')return 'used-car';return (s.category||'custom').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
  function scenarioVisualAll(s){
    const file=artFileFor(s),cls=artClassFor(s);
    const first=s.items[0]||{type:'do',stage:'Start'};
    const stages=[...new Set(s.items.map(i=>i.stage))];
    const stageNo=Math.max(0,stages.indexOf(first.stage))+1;
    return `<div class="scenario-visual art-${cls}" role="img" aria-label="Editorial illustration for ${esc(s.title)}" style="--scenario-art:url('${file}')" data-active-type="${first.type}" data-active-stage="0">
      <div class="visual-story-meta"><span class="visual-stage-label">${String(stageNo).padStart(2,'0')} · ${esc(titleCaseStage(first.stage))}</span><strong class="visual-type-label">${typeLabel(first.type)}</strong></div>
      <div class="visual-story-meter" aria-hidden="true"><span style="width:${Math.max(4,100/Math.max(1,s.items.length))}%"></span></div>
    </div>`
  }

  checklistItem=function(s,item,index){
    const checked=!!store.checked[itemKey(s,index)];
    const isDont=item.type==='dont';
    return `<label class="field-check ${checked?'checked':''} ${isDont?'is-dont':''}" data-type="${item.type}" data-index="${index}" data-stage="${esc(item.stage)}">
      <input class="checkbox" type="checkbox" data-check="${index}" ${checked?'checked':''} />
      <span class="check-copy"><span class="mobile-type ${item.type}">${typeLabel(item.type)}</span><strong>${esc(item.text)}</strong>${item.type==='dont'?'<small>Avoid this if you can.</small>':''}</span>
      <span class="check-type ${item.type}">${typeLabel(item.type)}</span>
    </label>`
  };

  scenarioView=function(s){
    const saved=store.saved.includes(s.id),prog=progressFor(s);
    const visibleIndices=s.items.map((_,i)=>i).filter(i=>state.filter==='all'||s.items[i].type===state.filter);
    const stages=[...new Set(s.items.map(i=>i.stage))];
    const fieldGuideLabel=s.id==='used-car'?`${s.items.length} things worth knowing before you pay.`:`${s.items.length} things worth knowing before you ${s.title.toLowerCase().startsWith('going')?'go':'begin'}.`;
    return `<div class="scenario-layout"><div class="scenario-main">
      <div class="scenario-topline"><button id="backBtn" class="back-link">Back to situations</button><button id="saveScenario" class="save-link ${saved?'saved':''}">${saved?'Saved':'Save'}</button></div>
      <header class="scenario-hero"><div class="scenario-title-wrap"><span class="hero-kicker">${esc(s.category)} field guide</span><h1>${esc(s.title)}</h1><p>${esc(fieldGuideLabel)}</p></div></header>
      ${scenarioVisualAll(s)}
      ${filterPills(s)}
      <div class="mobile-progress-strip"><span>${prog.done}/${prog.total}</span><div><strong>${prog.pct}% prepared</strong><small>Progress is saved locally.</small></div></div>
      <div class="stage-stack">${stages.map((stage,i)=>stageBlock(s,stage,i,visibleIndices)).join('')}</div>
      ${s.sources?.length?`<section class="mobile-sources"><span class="source-kicker">Trusted references</span><h3>Sources used for this guide</h3>${s.sources.map(src=>`<a href="${src.url}" target="_blank" rel="noreferrer"><strong>${esc(src.org)}</strong><small>${esc(src.title)}</small><em>Open</em></a>`).join('')}</section>`:''}
    </div><aside class="scenario-aside"><section class="side-card progress-card"><span>Your progress</span><div class="progress-ring" style="--progress:${prog.pct}"><strong>${prog.done}<small>/${prog.total}</small></strong></div><p>${prog.pct===100?'You’re BeforeWise.':prog.done===0?'Ready to start.':'Good progress.'}</p></section>${stageRail(s)}${sourceCard(s)}<button id="saveScenarioAside" class="save-card ${saved?'saved':''}"><strong>${saved?'Saved checklist':'Save this checklist'}</strong><span>${saved?'Available in your saved field guides.':'Add this guide to your saved items.'}</span></button></aside></div>
      <div class="mobile-progress-footer"><div class="footer-progress"><strong>${prog.done}/${prog.total}</strong></div><div><strong>${prog.pct===100?'You’re BeforeWise.':prog.done===0?'Ready when you are.':'Good progress!'}</strong><small>${prog.pct===100?'Everything on this guide is checked.':'Keep going — the important things are visible.'}</small></div><button id="mobileSave">${saved?'Saved':'Save'}</button></div>`
  };

  function setVisualStoryFromItem(el,reason='scroll'){
    const visual=document.querySelector('.scenario-visual');
    const s=scenarioById(state.scenarioId);
    if(!visual||!s||!el)return;
    const index=Number(el.dataset.index||0);
    const item=s.items[index];
    if(!item)return;
    const stages=[...new Set(s.items.map(i=>i.stage))];
    const stageIndex=Math.max(0,stages.indexOf(item.stage));
    const type=item.type||'do';
    document.querySelectorAll('.field-check.visual-current').forEach(node=>node.classList.remove('visual-current'));
    el.classList.add('visual-current');
    visual.dataset.activeType=type;
    visual.dataset.activeStage=String(stageIndex);
    visual.dataset.storyReason=reason;

    const x=((index%5)-2)*0.42;
    const y=((stageIndex%3)-1)*0.48;
    const scale=1.018+(index%3)*0.008;
    visual.style.setProperty('--story-shift-x',`${x}%`);
    visual.style.setProperty('--story-shift-y',`${y}%`);
    visual.style.setProperty('--story-scale',String(scale));

    const stageLabel=visual.querySelector('.visual-stage-label');
    const typeLabelEl=visual.querySelector('.visual-type-label');
    const meter=visual.querySelector('.visual-story-meter span');
    if(stageLabel)stageLabel.textContent=`${String(stageIndex+1).padStart(2,'0')} · ${titleCaseStage(item.stage)}`;
    if(typeLabelEl)typeLabelEl.textContent=typeLabel(type);
    if(meter)meter.style.width=`${Math.max(4,Math.round(((index+1)/Math.max(1,s.items.length))*100))}%`;
  }

  function bindVisualStory(){
    visualStoryCleanup();
    const visual=document.querySelector('.scenario-visual');
    const items=[...document.querySelectorAll('.field-check[data-index]')];
    if(!visual||!items.length){visualStoryCleanup=()=>{};return;}

    let raf=0;
    const pickFromScroll=()=>{
      raf=0;
      const target=Math.min(window.innerHeight*0.64,Math.max(360,window.innerHeight-240));
      let best=null,bestDistance=Infinity;
      items.forEach(el=>{
        if(el.offsetParent===null)return;
        const r=el.getBoundingClientRect();
        const anchor=Math.max(r.top,Math.min(target,r.bottom));
        const distance=Math.abs(anchor-target);
        if(distance<bestDistance){bestDistance=distance;best=el;}
      });
      if(best)setVisualStoryFromItem(best,'scroll');
    };
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(pickFromScroll)};
    const onResize=()=>{if(!raf)raf=requestAnimationFrame(pickFromScroll)};
    const handlers=[];
    items.forEach(el=>{
      const enter=()=>setVisualStoryFromItem(el,'point');
      const focus=()=>setVisualStoryFromItem(el,'choose');
      el.addEventListener('pointerenter',enter,{passive:true});
      el.addEventListener('pointerdown',focus,{passive:true});
      el.addEventListener('focusin',focus);
      handlers.push([el,enter,focus]);
    });
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onResize,{passive:true});
    requestAnimationFrame(pickFromScroll);

    visualStoryCleanup=()=>{
      if(raf)cancelAnimationFrame(raf);
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onResize);
      handlers.forEach(([el,enter,focus])=>{el.removeEventListener('pointerenter',enter);el.removeEventListener('pointerdown',focus);el.removeEventListener('focusin',focus)});
    };
  }

  const bindBeforeAllFix=bind;
  bind=function(){
    bindBeforeAllFix();
    document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;const s=scenarioById(state.scenarioId);if(s&&state.filter!=='all'){const hit=s.items.find(i=>i.type===state.filter);if(hit)state.expandedStage=hit.stage}render()});
    bindVisualStory();
  };
  render();
})();