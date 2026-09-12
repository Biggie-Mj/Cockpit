const STORAGE_KEY='dm-cockpit-v02';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const uid=(p='id')=>`${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const lines=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
const nowStamp=()=>new Date().toISOString();
const clone=v=>JSON.parse(JSON.stringify(v));

const DEMO={
  version:'0.2',
  title:'One-shot · La Fausse Hydre',
  mode:'prep',
  view:'prep',
  activeLocationId:'l2',
  libraryTab:'secrets',
  players:[
    {id:'p1',name:'Pik Ekrok',spotlight:'Sauver quelqu’un que les autres ont déjà oublié.',done:false},
    {id:'p2',name:'Tuskhan',spotlight:'Un choix moral où la force seule n’est pas la meilleure réponse.',done:false},
    {id:'p3',name:'Wonq',spotlight:'Son Registre des Absents contredit directement la mémoire du groupe.',done:false},
    {id:'p4',name:'Silas',spotlight:'Repérer une incohérence matérielle avant qu’elle ne soit expliquée.',done:false}
  ],
  thread:{
    goal:'La Fausse Hydre cherche à éliminer les personnes qui commencent à remarquer les incohérences qu’elle laisse derrière elle.',
    steps:[
      {id:'ts1',text:'Les survivants de l’expédition de Clifftop sont isolés.',done:true},
      {id:'ts2',text:'Les témoins qui remarquent les absences deviennent des cibles.',done:false},
      {id:'ts3',text:'Les dernières preuves matérielles sont dispersées ou détruites.',done:false},
      {id:'ts4',text:'Le village cesse complètement de se souvenir de l’expédition.',done:false}
    ]
  },
  strongStart:{
    text:'Sur la route de Cendrevoie, un cheval sans cavalier surgit au galop. Sa selle est tachée de sang. Deux sacs sont attachés à l’arrière : l’un contient le matériel d’un membre de Clifftop ; l’autre, des rations préparées pour cinq voyageurs. Les PJ sont persuadés d’être partis à quatre. Que faites-vous ?',
    used:false
  },
  locations:[
    {id:'l1',name:'Cendrevoie',tier:'main',status:'visited',concept:'Un village frontière où les habitudes quotidiennes trahissent des absences que personne ne peut nommer.',visuals:['Des maisons entretenues mais officiellement inhabitées.','Des tables dressées avec trop de couverts.','Des portraits où un espace semble avoir été découpé.'],impulse:'Faire disparaître ce qui dérange sans que personne ne remarque le vide.',situation:'Un garde vient de disparaître. Ses collègues continuent instinctivement à laisser une place vide pendant les rondes.',faction:'Garde de Cendrevoie',localPlot:'Maela cherche qui falsifie les registres, sans envisager qu’elle puisse elle-même avoir oublié la personne responsable.',regionalPlot:'Plusieurs voyageurs ont disparu sur la route proche des Mournlands.',mainPlot:'Les mêmes incohérences apparaissent dans les rapports des expéditions de Clifftop.',danger:'Le chant devient plus présent lorsque les PJ commencent à comparer leurs souvenirs.',reward:'Une clé sans propriétaire qui ouvre une maison officiellement vide.',ifIgnored:'Un autre habitant disparaît avant l’aube.',npcIds:['n1']},
    {id:'l2',name:'Auberge du Cerf Gris',tier:'main',status:'current',concept:'Une auberge chaleureuse dont les routines ont conservé la forme de personnes que les mémoires ont effacées.',visuals:['Cinq lits préparés dans une chambre louée à quatre aventuriers.','Un manteau sans propriétaire derrière une porte.','Une assiette supplémentaire posée puis retirée machinalement.'],impulse:'Répéter obstinément les habitudes laissées par les disparus.',situation:'Elsa prépare chaque soir une place supplémentaire et devient agressive si quelqu’un lui demande pour qui elle est destinée.',faction:'Aucune faction structurée',localPlot:'Elsa pense qu’un client lui vole de la nourriture pendant la nuit.',regionalPlot:'Des voyageurs cessent régulièrement d’être attendus par leurs proches.',mainPlot:'Une chambre a été préparée pour cinq membres de Clifftop, pas quatre.',danger:'Le groupe risque de se séparer en fouillant les étages et la cave.',reward:'Un paquet d’effets personnels appartenant à quelqu’un que les PJ ne reconnaissent pas.',ifIgnored:'Elsa descend seule à la cave en pleine nuit et ne remonte pas.',npcIds:['n2']},
    {id:'l3',name:'Maison communale',tier:'main',status:'unvisited',concept:'Le seul endroit où la mémoire écrite résiste imparfaitement à ce que les habitants oublient.',visuals:['Des registres dont certaines lignes ont été grattées.','Une numérotation de maisons qui saute plusieurs nombres.','Des casiers contenant des objets sans propriétaire.'],impulse:'Conserver des traces que personne ne sait interpréter.',situation:'Les registres démontrent que la population réelle du village a baissé sans qu’aucun décès ou départ ne soit enregistré.',faction:'Administration locale',localPlot:'Un employé dissimule de petites falsifications sans rapport avec les disparitions.',regionalPlot:'Les chiffres de ravitaillement ne correspondent plus à la population déclarée.',mainPlot:'Les noms d’aventuriers de Clifftop ont été partiellement effacés.',danger:'Quelqu’un tente de brûler un registre devenu trop compromettant.',reward:'Une page arrachée mentionnant l’arrivée d’un groupe plus nombreux que les PJ ne s’en souviennent.',ifIgnored:'Les documents les plus anciens sont détruits au petit matin.',npcIds:['n1']},
    {id:'l4',name:'Souterrains de Cendrevoie',tier:'reserve',status:'unvisited',concept:'Un réseau ancien sous le village, assez large pour laisser passer quelque chose de bien plus grand qu’un humanoïde.',visuals:[],impulse:'Attirer les isolés toujours plus profondément.',situation:'Des traces récentes montrent qu’une masse énorme circule entre plusieurs accès sous les bâtiments.',faction:'',localPlot:'',regionalPlot:'',mainPlot:'',danger:'Le chant résonne dans la pierre et brouille constamment la perception.',reward:'Des effets personnels des disparus.',ifIgnored:'Une nouvelle galerie permet à la créature d’atteindre une autre partie du village.',npcIds:['n3']},
    {id:'l5',name:'Ancienne route de Vathirond',tier:'reserve',status:'unvisited',concept:'Une route abandonnée où plusieurs expéditions ont laissé des traces contradictoires.',visuals:[],impulse:'',situation:'Des empreintes et un camp abandonné suggèrent un voyageur supplémentaire.',faction:'',localPlot:'',regionalPlot:'',mainPlot:'',danger:'',reward:'',ifIgnored:'',npcIds:[]}
  ],
  npcs:[
    {id:'n1',name:'Maela Dorn',role:'Sergente elfe · Garde de Cendrevoie',identity:'Une elfe disciplinée qui maintient l’ordre alors que ses propres souvenirs se fissurent.',wants:'Évacuer les habitants sans provoquer de panique.',fears:'Que ses hommes comprennent qu’elle a oublié plusieurs gardes.',knows:'Trois maisons officiellement inhabitées continuent à recevoir des rations.',hides:'Elle possède une clé dont elle ne connaît plus l’origine.',trait:'Frotte son pouce contre son insigne avant chaque réponse difficile.'},
    {id:'n2',name:'Elsa Varn',role:'Aubergiste',identity:'Une femme épuisée qui compense les trous de mémoire par des habitudes rigides.',wants:'Que les étrangers repartent avant qu’un nouveau malheur arrive.',fears:'Entrer dans la cave après la tombée de la nuit.',knows:'Certaines chambres semblent utilisées sans qu’aucun client ne soit enregistré.',hides:'Elle met chaque soir une cinquième assiette sans savoir pourquoi.',trait:'Compte silencieusement les couverts en parlant.'},
    {id:'n3',name:'Orax',role:'Forgelier · Aventurier disparu',identity:'Un forgelier endommagé dont certaines routines résistent mieux que les souvenirs organiques.',wants:'Retrouver les autres membres de son expédition.',fears:'Être le prochain à disparaître sans laisser de trace consciente.',knows:'Le chant cesse momentanément lorsqu’il subit un choc violent.',hides:'Il a déjà vu la créature mais son récit se fragmente dès qu’il tente de la décrire.',trait:'Répète mécaniquement les noms de ses compagnons pour ne pas les perdre.'},
    {id:'n4',name:'Jikled',role:'Responsable de Clifftop',identity:'Un gnome vétéran qui dissimule son inquiétude derrière une efficacité méthodique.',wants:'Ramener les disparus et restaurer la réputation de Clifftop.',fears:'Envoyer une troisième équipe à la mort.',knows:'Six aventuriers sont officiellement portés disparus.',hides:'Il soupçonne qu’un détail essentiel manque aux rapports précédents.',trait:'Tapote deux fois chaque dossier avant de le remettre.'}
  ],
  secrets:[
    {id:'c1',title:'Quelqu’un manque',text:'Les objets et les habitudes indiquent régulièrement une personne de plus que le nombre dont tout le monde se souvient.',revealed:false,revealedAt:null,method:''},
    {id:'c2',title:'Le cinquième compagnon',text:'Les PJ ont quitté Clifftop à cinq, pas à quatre.',revealed:false,revealedAt:null,method:''},
    {id:'c3',title:'Les traces matérielles résistent',text:'La créature efface la reconnaissance et la mémoire bien plus facilement qu’elle ne fait disparaître les preuves physiques.',revealed:false,revealedAt:null,method:''},
    {id:'c4',title:'Le chant impose le voile',text:'Certaines incohérences deviennent perceptibles lorsque le chant ne peut plus être entendu.',revealed:false,revealedAt:null,method:''},
    {id:'c5',title:'Un choc peut briser la perception',text:'Une douleur soudaine, une surdité ou un bruit couvrant peut permettre de percevoir brièvement ce qui est normalement ignoré.',revealed:false,revealedAt:null,method:''},
    {id:'c6',title:'Les registres ont été modifiés',text:'Des noms ont disparu alors que la structure des documents prouve qu’ils existaient.',revealed:false,revealedAt:null,method:''},
    {id:'c7',title:'Quatre disparus vivent encore',text:'Parmi les six aventuriers recherchés, quatre sont encore vivants quelque part autour ou sous Cendrevoie.',revealed:false,revealedAt:null,method:''},
    {id:'c8',title:'La créature chasse les lucides',text:'Les personnes qui commencent à remarquer les incohérences deviennent des cibles prioritaires.',revealed:false,revealedAt:null,method:''},
    {id:'c9',title:'Orax se souvient autrement',text:'Certaines routines du forgelier conservent des informations même lorsque son interprétation consciente échoue.',revealed:false,revealedAt:null,method:''},
    {id:'c10',title:'Le village repose au-dessus de l’antre',text:'Plusieurs caves et puits communiquent avec un réseau ancien qui converge sous Cendrevoie.',revealed:false,revealedAt:null,method:''}
  ],
  threats:[
    {id:'t1',name:'Habitants paniqués',type:'ordinary',summary:'Une foule interprète les incohérences comme une menace provoquée par les étrangers.',notes:'Obstacle social ou complication.',used:false},
    {id:'t2',name:'Serviteurs désorientés',type:'ordinary',summary:'Des victimes du chant défendent un lieu ou une habitude qu’elles ne comprennent plus.',notes:'Éviter d’en faire des ennemis caricaturaux.',used:false},
    {id:'t3',name:'Prédateur dans les tunnels',type:'ordinary',summary:'Une créature opportuniste profite des souterrains et des disparitions.',notes:'Peut être sans rapport direct avec la Fausse Hydre.',used:false},
    {id:'t4',name:'Fausse Hydre',type:'serious',summary:'Menace majeure, d’abord indirecte puis physique.',notes:'Ne pas la montrer trop tôt sans raison fictionnelle.',used:false},
    {id:'t5',name:'Le chant cesse',type:'event',summary:'Pendant quelques secondes, tout le monde perçoit ce qui était masqué.',notes:'Événement dangereux et révélateur.',used:false}
  ],
  situations:[
    {id:'s1',text:'Un habitant accuse les PJ d’avoir pris les affaires d’une personne dont personne ne se souvient.',used:false},
    {id:'s2',text:'Quelqu’un disparaît pendant une conversation ; sa chaise reste encore chaude.',used:false},
    {id:'s3',text:'Un survivant de Clifftop est aperçu puis fuit sans reconnaître les PJ.',used:false},
    {id:'s4',text:'Le chant cesse brusquement au milieu d’une scène banale.',used:false},
    {id:'s5',text:'Une preuve matérielle contredit frontalement un souvenir partagé par tout le groupe.',used:false}
  ],
  rewards:[
    {id:'r1',type:'Ressource',text:'Potions et matériel récupérés sur l’expédition disparue.',used:false},
    {id:'r2',type:'Information',text:'La preuve que les PJ voyageaient avec un cinquième compagnon.',used:false},
    {id:'r3',type:'Faveur / contact',text:'Confiance durable de Clifftop si plusieurs disparus reviennent vivants.',used:false}
  ],
  blanks:[
    {id:'b1',prompt:'Quelqu’un aide discrètement Maela. Qui ?',resolution:'',resolved:false},
    {id:'b2',prompt:'Une autre présence utilise certains tunnels. Laquelle ?',resolution:'',resolved:false},
    {id:'b3',prompt:'Le cinquième compagnon avait un lien particulier avec un habitant. Lequel ?',resolution:'',resolved:false}
  ],
  pins:[
    {id:'pin1',text:'4 des 6 aventuriers recherchés sont encore vivants.'},
    {id:'pin2',text:'Un seul repos court prévu ; aucun repos long.'}
  ],
  journal:[{id:'j1',type:'note',text:'Préparation Sly Flourish V0.2 chargée.',locationId:null,createdAt:nowStamp()}]
};

const EMPTY=()=>({version:'0.2',title:'Nouvelle session',mode:'prep',view:'prep',activeLocationId:null,libraryTab:'secrets',players:[],thread:{goal:'',steps:[]},strongStart:{text:'',used:false},locations:[],npcs:[],secrets:[],threats:[],situations:[],rewards:[],blanks:[],pins:[],journal:[]});

let state=load();
let history=[];
let editingLocationId=null;
let editingNpcId=null;
let genericContext={type:null,id:null};
let revealingSecretId=null;

function normalize(s){
  const base=EMPTY();
  const out={...base,...s};
  for(const k of ['players','locations','npcs','secrets','threats','situations','rewards','blanks','pins','journal'])if(!Array.isArray(out[k]))out[k]=[];
  out.thread=out.thread&&typeof out.thread==='object'?out.thread:base.thread;
  if(!Array.isArray(out.thread.steps))out.thread.steps=[];
  out.strongStart=out.strongStart&&typeof out.strongStart==='object'?out.strongStart:base.strongStart;
  out.version='0.2';
  return out;
}
function load(){try{const raw=localStorage.getItem(STORAGE_KEY);return raw?normalize(JSON.parse(raw)):clone(DEMO)}catch{return clone(DEMO)}}
function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function snapshot(){history.push(JSON.stringify(state));if(history.length>40)history.shift()}
function commit(mut,msg){snapshot();mut();persist();render();if(msg)toast(msg)}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2200)}
function activeLocation(){return state.locations.find(l=>l.id===state.activeLocationId)||null}
function locationName(id){return state.locations.find(l=>l.id===id)?.name||'Hors lieu'}
function initials(name=''){return name.split(/\s+/).filter(Boolean).map(x=>x[0]).join('').slice(0,2).toUpperCase()||'?'}
function fmtTime(iso){try{return new Date(iso).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}catch{return ''}}
function statusLabel(l){return l.status==='current'?'ACTUEL':l.status==='visited'?'VISITÉ':'À EXPLORER'}
function threatTypeLabel(t){return t==='ordinary'?'ORDINAIRE':t==='serious'?'SÉRIEUX':'ÉVÉNEMENT'}

function render(){
  state=normalize(state);
  $('#sessionTitle').value=state.title||'';
  $('#btnModePrep').classList.toggle('active',state.mode==='prep');
  $('#btnModeTable').classList.toggle('active',state.mode==='table');
  renderPlayers();
  renderPrep();
  renderTable();
  renderLibrary();
  renderJournal();
  switchView(state.view||state.mode,false);
}

function renderPlayers(){
  const el=$('#playerRibbon');
  const chips=state.players.map(p=>`<button class="player-chip ${p.done?'done':''}" data-toggle-player="${p.id}" title="Toucher pour marquer le spotlight comme utilisé"><span class="player-dot"></span><span><strong>${esc(p.name)}</strong><small>${esc(p.spotlight||'Aucun spotlight')}</small></span><span class="checkmark">${p.done?'✓':'○'}</span></button>`).join('');
  el.innerHTML=chips+`<button class="player-add ghost" id="btnEditPlayers" title="Modifier les personnages">＋</button>`;
  $$('[data-toggle-player]').forEach(b=>b.onclick=()=>commit(()=>{const p=state.players.find(x=>x.id===b.dataset.togglePlayer);if(p)p.done=!p.done},null));
  $('#btnEditPlayers').onclick=openPlayersEditor;
}

function renderPrep(){
  renderThreadCard();renderStrongCard();renderPrepLocations();renderPrepSecrets();renderPrepNpcs();renderPrepThreats();renderSituations();renderRewards();renderBlanks();
}
function renderThreadCard(){
  const steps=state.thread.steps||[];
  $('#threadCard').innerHTML=`<div class="thread-goal">${esc(state.thread.goal||'Définis ce que cherche actuellement la force active.')}</div><div class="thread-steps">${steps.length?steps.map((s,i)=>`<div class="thread-step ${s.done?'done':''}"><button data-toggle-thread="${s.id}" title="Marquer l'étape">${s.done?'✓':i+1}</button><span>${esc(s.text)}</span></div>`).join(''):'<div class="empty-mini">Aucune conséquence préparée.</div>'}</div>`;
  $$('[data-toggle-thread]').forEach(b=>b.onclick=()=>commit(()=>{const s=state.thread.steps.find(x=>x.id===b.dataset.toggleThread);if(s)s.done=!s.done},'Fil rouge mis à jour'));
}
function renderStrongCard(){
  const s=state.strongStart;
  $('#strongCard').innerHTML=`<div class="${s.used?'strong-used':''}"><div class="strong-copy">${esc(s.text||'Prépare une situation déjà en mouvement, puis rends immédiatement la main aux joueurs.')}</div><div class="strong-status"><span class="eyebrow">${s.used?'UTILISÉ À LA TABLE':'PRÊT À LANCER'}</span><button id="btnToggleStrong" class="${s.used?'ghost':'primary'} small">${s.used?'↺ Réouvrir':'▶ Lancer'}</button></div></div>`;
  $('#btnToggleStrong').onclick=()=>toggleStrongStart();
}
function renderPrepLocations(){
  const main=state.locations.filter(l=>l.tier!=='reserve'),reserve=state.locations.filter(l=>l.tier==='reserve');
  const lane=(title,arr)=>`<div class="location-lane"><div class="location-lane-head"><strong>${title}</strong><span>${arr.length}</span></div>${arr.length?arr.map(l=>`<button class="location-tile ${esc(l.status)}" data-edit-location="${l.id}"><span class="location-status">${statusLabel(l)}</span><strong>${esc(l.name)}</strong><small>${esc(l.concept||l.situation||'Lieu à développer')}</small></button>`).join(''):'<div class="empty-mini">Aucun lieu.</div>'}</div>`;
  $('#prepLocations').innerHTML=lane('PRINCIPAUX',main)+lane('RÉSERVE',reserve);
  $$('[data-edit-location]').forEach(b=>b.onclick=()=>openLocationEditor(b.dataset.editLocation));
}
function renderPrepSecrets(){
  const unrevealed=state.secrets.filter(s=>!s.revealed).length;
  $('#prepSecrets').innerHTML=state.secrets.length?state.secrets.map(s=>`<button class="secret-card ${s.revealed?'revealed':''}" data-edit-secret="${s.id}"><span class="secret-state">${s.revealed?'RÉVÉLÉ':'FLOTTANT'}</span><strong>${esc(s.title)}</strong><p>${esc(s.text)}</p></button>`).join(''):'<div class="empty-card">Ajoute environ 8 à 10 informations sans décider à l’avance où elles seront découvertes.</div>';
  const h=$('.secrets-card .card-head h2');if(h)h.textContent=`Secrets & indices flottants · ${unrevealed} dispo.`;
  $$('[data-edit-secret]').forEach(b=>b.onclick=()=>openGenericEditor('secret',b.dataset.editSecret));
}
function renderPrepNpcs(){
  $('#prepNpcs').innerHTML=state.npcs.length?state.npcs.map(n=>`<button class="npc-chip" data-edit-npc="${n.id}"><strong>${esc(n.name)}</strong>${n.role?` <small>· ${esc(n.role)}</small>`:''}</button>`).join(''):'<div class="empty-card">Prépare 5 à 7 noms, davantage seulement pour les PNJ importants.</div>';
  $$('[data-edit-npc]').forEach(b=>b.onclick=()=>openNpcEditor(b.dataset.editNpc));
}
function compactItem(item,type,text,subtitle=''){
  const done=item.used||item.resolved;
  return `<div class="compact-item ${done?'used resolved':''}"><span class="state-dot"></span><div><p>${esc(text)}</p>${subtitle?`<small>${esc(subtitle)}</small>`:''}</div><button data-edit-generic="${type}:${item.id}">•••</button></div>`;
}
function renderPrepThreats(){$('#prepThreats').innerHTML=state.threats.length?state.threats.map(t=>compactItem(t,'threat',t.name,`${threatTypeLabel(t.type)} · ${t.summary||''}`)).join(''):'<div class="empty-card">3 menaces ordinaires, 1 sérieuse, 1 événement dangereux.</div>';bindGenericEdit()}
function renderSituations(){$('#situationsCard').innerHTML=state.situations.length?state.situations.map(s=>compactItem(s,'situation',s.text,s.used?'Déjà utilisée':'Peut-être')).join(''):'<div class="empty-card">Maximum cinq. Certaines ne se produiront jamais.</div>';bindGenericEdit()}
function renderRewards(){$('#prepRewards').innerHTML=state.rewards.length?state.rewards.map(r=>compactItem(r,'reward',r.text,r.type)).join(''):'<div class="empty-card">Ressource · information · objet / faveur / contact.</div>';bindGenericEdit()}
function renderBlanks(){$('#blanksCard').innerHTML=state.blanks.length?state.blanks.map(b=>compactItem(b,'blank',b.prompt,b.resolved?`Canon : ${b.resolution}`:'À déterminer à la table')).join(''):'<div class="empty-card">Laisse volontairement certaines réponses indéterminées.</div>';bindGenericEdit()}
function bindGenericEdit(){$$('[data-edit-generic]').forEach(b=>b.onclick=()=>{const [type,id]=b.dataset.editGeneric.split(':');openGenericEditor(type,id)})}

function renderTable(){
  const current=activeLocation();
  const ss=$('#tableStrongStart');
  ss.className=`strong-start-mini ${state.strongStart.used?'used':''}`;
  ss.innerHTML=`<strong>${state.strongStart.used?'✓ Strong Start joué':'▶ Strong Start'}</strong><small>${esc(state.strongStart.text||'Aucun Strong Start préparé.')}</small>`;
  renderTableLocations();renderLiveLocation(current);renderCurrentNpcs(current);renderFloatingSecrets();renderTableThreats();renderTableSituations();renderPins();
}
function renderTableLocations(){
  const main=state.locations.filter(l=>l.tier!=='reserve'),reserve=state.locations.filter(l=>l.tier==='reserve');
  const group=(label,arr)=>`<span class="eyebrow" style="margin-top:5px">${label}</span>${arr.map(l=>`<button class="rail-location ${esc(l.status)}" data-set-location="${l.id}"><strong>${esc(l.name)}</strong><small>${esc(l.concept||'')}</small><span class="marker">${l.status==='current'?'●':l.status==='visited'?'✓':'○'}</span></button>`).join('')}`;
  $('#tableLocationList').innerHTML=state.locations.length?group('PRINCIPAUX',main)+group('RÉSERVE',reserve):'<div class="empty-mini">Aucun lieu préparé.</div>';
  $$('[data-set-location]').forEach(b=>b.onclick=()=>makeCurrentLocation(b.dataset.setLocation));
}
function renderLiveLocation(l){
  if(!l){$('#liveLocationContent').innerHTML=`<div class="live-empty"><div><span class="eyebrow">TABLE</span><h2>Aucun lieu actuel</h2><p>Choisis un lieu à gauche ou crée-en un.</p><button id="emptyLocationBtn" class="primary">＋ Créer un lieu</button></div></div>`;$('#emptyLocationBtn').onclick=()=>openLocationEditor();return}
  const visuals=l.visuals||[];
  $('#liveLocationContent').innerHTML=`
    <div class="live-hero"><div class="live-hero-top"><div><span class="eyebrow">LIEU ACTUEL · ${statusLabel(l)}</span><h2>${esc(l.name)}</h2><p class="concept">${esc(l.concept||'')}</p></div><div class="live-actions"><button class="ghost small" id="btnVisitStatus">${l.status==='current'?'✓ Quitter / visité':'● Actuel'}</button><button class="ghost small" id="btnEditCurrentLocation">Modifier</button></div></div></div>
    <div class="live-grid">
      <article class="live-card"><h3>Qu’est-ce qu’on voit ?</h3>${visuals.length?`<ul>${visuals.map(v=>`<li>${esc(v)}</li>`).join('')}</ul>`:'<p class="muted">À improviser.</p>'}</article>
      <article class="live-card impulse-card"><h3>Impulsion du lieu</h3><p>${esc(l.impulse||'À déterminer : comment ce lieu tend-il à agir ou réagir ?')}</p></article>
      <article class="live-card full"><h3>Qu’est-ce qui est en train de se passer ?</h3><p>${esc(l.situation||'Aucune situation préparée.')}</p></article>
      <article class="live-card"><h3>Conflits / intrigues</h3><div class="plot-stack">${l.localPlot?`<div class="plot-row"><span>LOCAL</span><p>${esc(l.localPlot)}</p></div>`:''}${l.regionalPlot?`<div class="plot-row"><span>RÉGIONAL</span><p>${esc(l.regionalPlot)}</p></div>`:''}${l.mainPlot?`<div class="plot-row"><span>FIL ROUGE</span><p>${esc(l.mainPlot)}</p></div>`:''}${!l.localPlot&&!l.regionalPlot&&!l.mainPlot?'<p class="muted">Aucun conflit préparé.</p>':''}</div></article>
      <article class="live-card"><h3>Danger</h3><p>${esc(l.danger||'Aucun danger spécifique préparé.')}</p></article>
      <article class="live-card"><h3>Chose intéressante à obtenir</h3><p>${esc(l.reward||'À improviser selon le jeu.')}</p></article>
      <article class="live-card"><h3>Si les PJ n’interviennent pas</h3><p>${esc(l.ifIgnored||'Le lieu reste stable pour le moment.')}</p></article>
      ${l.faction?`<article class="live-card full"><h3>Faction présente</h3><p>${esc(l.faction)}</p></article>`:''}
    </div>`;
  $('#btnEditCurrentLocation').onclick=()=>openLocationEditor(l.id);
  $('#btnVisitStatus').onclick=()=>commit(()=>{const cur=activeLocation();if(cur){cur.status='visited';state.activeLocationId=null}},`${l.name} marqué comme visité`);
}
function renderCurrentNpcs(l){
  const ids=l?.npcIds||[],npcs=ids.map(id=>state.npcs.find(n=>n.id===id)).filter(Boolean);
  $('#currentNpcCards').innerHTML=npcs.length?npcs.map(n=>`<button class="npc-mini" data-show-npc="${n.id}"><strong>${esc(n.name)}</strong><small>${esc(n.wants||n.role||'')}</small></button>`).join(''):'<div class="empty-mini">Aucun PNJ placé ici pour le moment.</div>';
  $$('[data-show-npc]').forEach(b=>b.onclick=()=>showNpcQuick(b.dataset.showNpc));
}
function renderFloatingSecrets(){
  const list=state.secrets.filter(s=>!s.revealed);
  $('#floatingSecrets').innerHTML=list.length?list.slice(0,5).map(s=>`<div class="floating-secret"><div><strong>${esc(s.title)}</strong><p>${esc(s.text)}</p></div><button class="primary" data-reveal-secret="${s.id}">Révéler</button></div>`).join(''):'<div class="empty-mini">Tous les secrets préparés ont été révélés.</div>';
  $$('[data-reveal-secret]').forEach(b=>b.onclick=()=>openRevealSecret(b.dataset.revealSecret));
}
function renderTableThreats(){
  const arr=state.threats.filter(t=>!t.used);
  $('#tableThreats').innerHTML=arr.length?arr.slice(0,5).map(t=>`<div class="mini-ammo"><header><div><strong>${esc(t.name)}</strong><div class="eyebrow">${threatTypeLabel(t.type)}</div></div><button data-use-threat="${t.id}">Utilisé</button></header><div>${esc(t.summary||'')}</div></div>`).join(''):'<div class="empty-mini">Aucune menace disponible.</div>';
  $$('[data-use-threat]').forEach(b=>b.onclick=()=>commit(()=>{const t=state.threats.find(x=>x.id===b.dataset.useThreat);if(t)t.used=true},'Menace marquée utilisée'));
}
function renderTableSituations(){
  const arr=state.situations.filter(s=>!s.used);
  $('#tableSituations').innerHTML=arr.length?arr.map(s=>`<div class="mini-ammo"><header><div>${esc(s.text)}</div><button data-use-situation="${s.id}">✓</button></header></div>`).join(''):'<div class="empty-mini">Plus de munitions préparées.</div>';
  $$('[data-use-situation]').forEach(b=>b.onclick=()=>commit(()=>{const s=state.situations.find(x=>x.id===b.dataset.useSituation);if(s)s.used=true},'Munition utilisée'));
}
function renderPins(){
  $('#pinnedList').innerHTML=state.pins.length?state.pins.map(p=>`<div class="pin-item"><span>📌</span><span>${esc(p.text)}</span><button data-remove-pin="${p.id}">×</button></div>`).join(''):'<div class="empty-mini">Rien d’épinglé.</div>';
  $$('[data-remove-pin]').forEach(b=>b.onclick=()=>commit(()=>state.pins=state.pins.filter(p=>p.id!==b.dataset.removePin),null));
}

function renderLibrary(){
  $$('.library-tab').forEach(b=>b.classList.toggle('active',b.dataset.library===state.libraryTab));
  const el=$('#libraryContent'),tab=state.libraryTab;
  let html='';
  if(tab==='secrets')html=state.secrets.map(s=>`<article class="library-card"><header><div><h3>${esc(s.title)}</h3><div class="subtitle">${s.revealed?`RÉVÉLÉ · ${esc(s.method||'méthode non notée')}`:'SECRET FLOTTANT'}</div></div><span>${s.revealed?'✓':'○'}</span></header><p>${esc(s.text)}</p><footer>${!s.revealed?`<button class="primary" data-reveal-secret="${s.id}">Révéler</button>`:''}<button data-edit-secret="${s.id}">Modifier</button></footer></article>`).join('');
  if(tab==='npcs')html=state.npcs.map(n=>`<article class="library-card"><header><div><h3>${esc(n.name)}</h3><div class="subtitle">${esc(n.role||'PNJ')}</div></div><span>${initials(n.name)}</span></header><p><strong>Veut :</strong> ${esc(n.wants||'—')}<br><strong>Craint :</strong> ${esc(n.fears||'—')}<br><strong>Sait :</strong> ${esc(n.knows||'—')}<br><strong>Cache :</strong> ${esc(n.hides||'—')}</p><footer><button data-edit-npc="${n.id}">Modifier</button></footer></article>`).join('');
  if(tab==='threats')html=state.threats.map(t=>`<article class="library-card"><header><div><h3>${esc(t.name)}</h3><div class="subtitle">${threatTypeLabel(t.type)} · ${t.used?'UTILISÉE':'DISPONIBLE'}</div></div></header><p>${esc(t.summary||'')} ${t.notes?`<br><span class="muted">${esc(t.notes)}</span>`:''}</p><footer><button data-toggle-used="threat:${t.id}">${t.used?'Réouvrir':'Utilisée'}</button><button data-edit-generic="threat:${t.id}">Modifier</button></footer></article>`).join('');
  if(tab==='rewards')html=state.rewards.map(r=>`<article class="library-card"><header><div><h3>${esc(r.type)}</h3><div class="subtitle">${r.used?'ATTRIBUÉE / UTILISÉE':'DISPONIBLE'}</div></div></header><p>${esc(r.text)}</p><footer><button data-toggle-used="reward:${r.id}">${r.used?'Réouvrir':'Utilisée'}</button><button data-edit-generic="reward:${r.id}">Modifier</button></footer></article>`).join('');
  if(tab==='blanks')html=state.blanks.map(b=>`<article class="library-card"><header><div><h3>${esc(b.prompt)}</h3><div class="subtitle">${b.resolved?'DEVENU CANON':'VOLONTAIREMENT INDÉTERMINÉ'}</div></div></header><p>${b.resolved?esc(b.resolution):'Laisse la partie fournir une réponse si elle en a besoin.'}</p><footer><button data-edit-generic="blank:${b.id}">${b.resolved?'Voir / modifier':'Définir'}</button></footer></article>`).join('');
  el.innerHTML=`<div class="library-grid">${html||'<div class="journal-empty">Aucun élément.</div>'}</div>`;
  bindLibraryActions();
}
function bindLibraryActions(){
  $$('[data-reveal-secret]').forEach(b=>b.onclick=()=>openRevealSecret(b.dataset.revealSecret));
  $$('[data-edit-secret]').forEach(b=>b.onclick=()=>openGenericEditor('secret',b.dataset.editSecret));
  $$('[data-edit-npc]').forEach(b=>b.onclick=()=>openNpcEditor(b.dataset.editNpc));
  $$('[data-edit-generic]').forEach(b=>b.onclick=()=>{const [type,id]=b.dataset.editGeneric.split(':');openGenericEditor(type,id)});
  $$('[data-toggle-used]').forEach(b=>b.onclick=()=>{const [type,id]=b.dataset.toggleUsed.split(':');commit(()=>{const arr=type==='threat'?state.threats:state.rewards;const item=arr.find(x=>x.id===id);if(item)item.used=!item.used},null)});
}

function renderJournal(){
  const icon={note:'📝',decision:'⚑',quote:'💬',question:'❓',death:'💀',loot:'🎁',lead:'🔗',secret:'◆',location:'◈',canon:'✦'};
  $('#journalContent').innerHTML=state.journal.length?state.journal.map(j=>`<article class="journal-entry"><time>${fmtTime(j.createdAt)}</time><div><strong>${icon[j.type]||'📝'} ${esc(locationName(j.locationId))}</strong><p>${esc(j.text)}</p></div><small>${new Date(j.createdAt).toLocaleDateString('fr-FR')}</small></article>`).join(''):'<div class="journal-empty">Rien n’est encore devenu canon pendant cette session.</div>';
}

function switchView(view,persistView=true){
  const valid=['prep','table','library','journal'];if(!valid.includes(view))view='prep';
  state.view=view;
  $('#prepView').classList.toggle('hidden',view!=='prep');
  $('#tableView').classList.toggle('hidden',view!=='table');
  $('#libraryView').classList.toggle('hidden',view!=='library');
  $('#journalView').classList.toggle('hidden',view!=='journal');
  $$('.nav-btn[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  if(view==='prep')state.mode='prep';if(view==='table')state.mode='table';
  $('#btnModePrep').classList.toggle('active',state.mode==='prep');$('#btnModeTable').classList.toggle('active',state.mode==='table');
  if(persistView)persist();
}
function makeCurrentLocation(id){
  const next=state.locations.find(l=>l.id===id);if(!next)return;
  if(next.status==='current'&&state.activeLocationId===id)return;
  commit(()=>{
    const prev=activeLocation();if(prev&&prev.id!==id)prev.status='visited';
    next.status='current';state.activeLocationId=id;
    state.journal.unshift({id:uid('j'),type:'location',text:`Le jeu se déplace vers ${next.name}.`,locationId:id,createdAt:nowStamp()});
    state.mode='table';state.view='table';
  },`Lieu actuel : ${next.name}`);
}
function toggleStrongStart(){
  commit(()=>{state.strongStart.used=!state.strongStart.used;if(state.strongStart.used)state.journal.unshift({id:uid('j'),type:'location',text:'Strong Start lancé.',locationId:state.activeLocationId,createdAt:nowStamp()})},state.strongStart.used?'Strong Start rouvert':'Strong Start lancé');
}
function showNpcQuick(id){
  const n=state.npcs.find(x=>x.id===id);if(!n)return;
  const text=`${n.name}\n\nIdentité : ${n.identity||'—'}\n\nVeut : ${n.wants||'—'}\nCraint : ${n.fears||'—'}\nSait : ${n.knows||'—'}\nCache : ${n.hides||'—'}\n\nTrait : ${n.trait||'—'}`;
  alert(text);
}

function openLocationEditor(id=null){
  editingLocationId=id;const l=id?state.locations.find(x=>x.id===id):{name:'',tier:'main',concept:'',visuals:[],impulse:'',situation:'',faction:'',localPlot:'',regionalPlot:'',mainPlot:'',danger:'',reward:'',ifIgnored:''};
  const f=$('#locationForm');
  for(const k of ['name','tier','concept','impulse','situation','faction','localPlot','regionalPlot','mainPlot','danger','reward','ifIgnored'])f.elements[k].value=l[k]||'';
  f.elements.visuals.value=(l.visuals||[]).join('\n');
  $('#locationDialogTitle').textContent=id?`Modifier · ${l.name}`:'Nouveau lieu vivant';
  $('#btnDeleteLocation').classList.toggle('hidden',!id);$('#locationDialog').showModal();
}
function openNpcEditor(id=null){
  editingNpcId=id;const n=id?state.npcs.find(x=>x.id===id):{name:'',role:'',identity:'',wants:'',fears:'',knows:'',hides:'',trait:''};
  const f=$('#npcForm');for(const k of ['name','role','identity','wants','fears','knows','hides','trait'])f.elements[k].value=n[k]||'';
  $('#npcDialogTitle').textContent=id?`Modifier · ${n.name}`:'Nouveau PNJ';$('#btnDeleteNpc').classList.toggle('hidden',!id);$('#npcDialog').showModal();
}
function openThreadEditor(){const f=$('#threadForm');f.elements.goal.value=state.thread.goal||'';f.elements.steps.value=(state.thread.steps||[]).map(x=>x.text).join('\n');$('#threadDialog').showModal()}
function openStrongEditor(){const f=$('#strongForm');f.elements.text.value=state.strongStart.text||'';$('#strongDialog').showModal()}
function openPlayersEditor(){
  const box=$('#playersEditor');box.innerHTML='';(state.players.length?state.players:[{id:uid('p'),name:'',spotlight:'',done:false}]).forEach(p=>addPlayerRow(p));$('#playersDialog').showModal();
}
function addPlayerRow(p={id:uid('p'),name:'',spotlight:'',done:false}){
  const row=document.createElement('div');row.className='player-editor-row';row.dataset.playerId=p.id;row.dataset.done=p.done?'1':'0';row.innerHTML=`<input data-pname placeholder="Nom" value="${esc(p.name)}"><input data-pspotlight placeholder="Un élément à mettre en valeur" value="${esc(p.spotlight)}"><button type="button" title="Supprimer">×</button>`;row.querySelector('button').onclick=()=>row.remove();$('#playersEditor').appendChild(row);
}

const genericDefs={
  secret:{eyebrow:'SECRET / INDICE',title:'Secret flottant',collection:'secrets',fields:[{name:'title',label:'Titre',type:'input'},{name:'text',label:'Information importante',type:'textarea',span:2}]},
  threat:{eyebrow:'MENACE',title:'Menace',collection:'threats',fields:[{name:'name',label:'Nom',type:'input'},{name:'type',label:'Type',type:'select',options:[['ordinary','Ordinaire'],['serious','Adversaire sérieux'],['event','Événement dangereux']]},{name:'summary',label:'Ce qu’elle met en jeu',type:'textarea',span:2},{name:'notes',label:'Note de pilotage',type:'textarea',span:2}]},
  situation:{eyebrow:'MUNITION MJ',title:'Situation potentielle',collection:'situations',fields:[{name:'text',label:'Situation possible',type:'textarea',span:2}]},
  reward:{eyebrow:'RÉCOMPENSE',title:'Récompense',collection:'rewards',fields:[{name:'type',label:'Type',type:'select',options:[['Ressource','Argent / ressource'],['Information','Information'],['Objet / faveur / contact','Objet / faveur / contact']]},{name:'text',label:'Récompense',type:'textarea'}]},
  blank:{eyebrow:'BLANC VOLONTAIRE',title:'Question laissée ouverte',collection:'blanks',fields:[{name:'prompt',label:'Ce qui reste indéterminé',type:'textarea',span:2},{name:'resolution',label:'Si la partie a fourni une réponse, laquelle ?',type:'textarea',span:2}]},
  pin:{eyebrow:'ÉPINGLE',title:'Information à garder sous les yeux',collection:'pins',fields:[{name:'text',label:'Information',type:'textarea',span:2}]}
};
function openGenericEditor(type,id=null){
  const def=genericDefs[type];if(!def)return;genericContext={type,id};const arr=state[def.collection],item=id?arr.find(x=>x.id===id):{};
  $('#genericEyebrow').textContent=def.eyebrow;$('#genericDialogTitle').textContent=id?`Modifier · ${def.title}`:def.title;
  $('#genericFields').innerHTML=def.fields.map(f=>{const v=item?.[f.name]??'';const cls=f.span===2?'span2':'';if(f.type==='select')return `<label class="${cls}">${esc(f.label)}<select name="${f.name}">${f.options.map(o=>`<option value="${esc(o[0])}" ${String(v)===o[0]?'selected':''}>${esc(o[1])}</option>`).join('')}</select></label>`;if(f.type==='textarea')return `<label class="${cls}">${esc(f.label)}<textarea name="${f.name}" rows="4">${esc(v)}</textarea></label>`;return `<label class="${cls}">${esc(f.label)}<input name="${f.name}" value="${esc(v)}" required></label>`}).join('');
  $('#btnDeleteGeneric').classList.toggle('hidden',!id);$('#genericDialog').showModal();
}
function openRevealSecret(id){
  const s=state.secrets.find(x=>x.id===id);if(!s||s.revealed)return;revealingSecretId=id;$('#revealSecretTitle').textContent=s.title;$('#revealSecretText').textContent=s.text;$('#revealSecretDialog').showModal();
}
function openManageNpcs(){
  const l=activeLocation();if(!l)return toast('Choisis d’abord un lieu actuel');
  $('#manageNpcChecks').innerHTML=state.npcs.length?state.npcs.map(n=>`<label class="check-chip"><input type="checkbox" data-location-npc="${n.id}" ${l.npcIds?.includes(n.id)?'checked':''}> ${esc(n.name)} <span class="muted">${esc(n.role||'')}</span></label>`).join(''):'<div class="empty-mini">Aucun PNJ disponible.</div>';
  $$('[data-location-npc]').forEach(i=>i.onchange=()=>{snapshot();const loc=activeLocation();loc.npcIds=Array.isArray(loc.npcIds)?loc.npcIds:[];if(i.checked&&!loc.npcIds.includes(i.dataset.locationNpc))loc.npcIds.push(i.dataset.locationNpc);if(!i.checked)loc.npcIds=loc.npcIds.filter(x=>x!==i.dataset.locationNpc);persist();renderTable()});
  $('#manageNpcsDialog').showModal();
}

// top + navigation
$('#btnModePrep').onclick=()=>{state.mode='prep';state.view='prep';persist();render()};
$('#btnModeTable').onclick=()=>{state.mode='table';state.view='table';persist();render()};
$$('.nav-btn[data-view]').forEach(b=>b.onclick=()=>switchView(b.dataset.view));
$('#sessionTitle').onchange=e=>commit(()=>state.title=e.target.value.trim()||'Session sans titre',null);
$('#btnUndo').onclick=()=>{const prev=history.pop();if(!prev)return toast('Rien à annuler');state=normalize(JSON.parse(prev));persist();render();toast('Modification annulée')};
$('#btnMore').onclick=e=>{e.stopPropagation();$('#moreMenu').classList.toggle('hidden')};
document.addEventListener('click',e=>{if(!e.target.closest('#moreMenu')&&!e.target.closest('#btnMore'))$('#moreMenu').classList.add('hidden')});

// preparation controls
$$('[data-edit="thread"]').forEach(b=>b.onclick=openThreadEditor);$$('[data-edit="strong"]').forEach(b=>b.onclick=openStrongEditor);
$('#btnAddLocation').onclick=()=>openLocationEditor();$('#btnTableAddLocation').onclick=()=>openLocationEditor();
$$('[data-add]').forEach(b=>b.onclick=()=>openGenericEditor(b.dataset.add));
$('#tableStrongStart').onclick=toggleStrongStart;$('#btnManageCurrentNpcs').onclick=openManageNpcs;$('#btnOpenSecrets').onclick=()=>{state.libraryTab='secrets';switchView('library');renderLibrary()};
$('#btnAddPin').onclick=()=>openGenericEditor('pin');

// dialogs close
$$('[data-close]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).close());

$('#locationForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const data={name:String(f.get('name')).trim(),tier:f.get('tier'),concept:String(f.get('concept')||'').trim(),visuals:lines(f.get('visuals')),impulse:String(f.get('impulse')||'').trim(),situation:String(f.get('situation')||'').trim(),faction:String(f.get('faction')||'').trim(),localPlot:String(f.get('localPlot')||'').trim(),regionalPlot:String(f.get('regionalPlot')||'').trim(),mainPlot:String(f.get('mainPlot')||'').trim(),danger:String(f.get('danger')||'').trim(),reward:String(f.get('reward')||'').trim(),ifIgnored:String(f.get('ifIgnored')||'').trim()};commit(()=>{if(editingLocationId){Object.assign(state.locations.find(l=>l.id===editingLocationId),data)}else{const l={id:uid('l'),...data,status:state.activeLocationId?'unvisited':'current',npcIds:[]};state.locations.push(l);if(!state.activeLocationId)state.activeLocationId=l.id}},'Lieu enregistré');$('#locationDialog').close()};
$('#btnDeleteLocation').onclick=()=>{if(!editingLocationId||!confirm('Supprimer ce lieu ?'))return;commit(()=>{state.locations=state.locations.filter(l=>l.id!==editingLocationId);if(state.activeLocationId===editingLocationId)state.activeLocationId=null},'Lieu supprimé');$('#locationDialog').close()};

$('#npcForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),data={};for(const k of ['name','role','identity','wants','fears','knows','hides','trait'])data[k]=String(f.get(k)||'').trim();commit(()=>{if(editingNpcId)Object.assign(state.npcs.find(n=>n.id===editingNpcId),data);else state.npcs.push({id:uid('n'),...data})},'PNJ enregistré');$('#npcDialog').close()};
$('#btnDeleteNpc').onclick=()=>{if(!editingNpcId||!confirm('Supprimer ce PNJ ?'))return;commit(()=>{state.npcs=state.npcs.filter(n=>n.id!==editingNpcId);state.locations.forEach(l=>l.npcIds=(l.npcIds||[]).filter(id=>id!==editingNpcId))},'PNJ supprimé');$('#npcDialog').close()};

$('#threadForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),goal=String(f.get('goal')||'').trim(),newLines=lines(f.get('steps'));commit(()=>{const old=state.thread.steps||[];state.thread.goal=goal;state.thread.steps=newLines.map((text,i)=>({id:old[i]?.id||uid('ts'),text,done:old[i]?.text===text?!!old[i].done:false}))},'Fil rouge enregistré');$('#threadDialog').close()};
$('#strongForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);commit(()=>state.strongStart.text=String(f.get('text')||'').trim(),'Strong Start enregistré');$('#strongDialog').close()};

$('#btnAddPlayerRow').onclick=()=>addPlayerRow();
$('#playersForm').onsubmit=e=>{e.preventDefault();const arr=$$('#playersEditor .player-editor-row').map(row=>({id:row.dataset.playerId||uid('p'),name:row.querySelector('[data-pname]').value.trim(),spotlight:row.querySelector('[data-pspotlight]').value.trim(),done:row.dataset.done==='1'})).filter(p=>p.name);commit(()=>state.players=arr,'Personnages enregistrés');$('#playersDialog').close()};

$('#genericForm').onsubmit=e=>{e.preventDefault();const def=genericDefs[genericContext.type];if(!def)return;const f=new FormData(e.target),data={};def.fields.forEach(field=>data[field.name]=String(f.get(field.name)||'').trim());commit(()=>{const arr=state[def.collection];if(genericContext.id){const item=arr.find(x=>x.id===genericContext.id);Object.assign(item,data);if(genericContext.type==='blank'){item.resolved=!!data.resolution}}else{const base={id:uid(genericContext.type.slice(0,2))};if(['threat','situation','reward'].includes(genericContext.type))base.used=false;if(genericContext.type==='secret')Object.assign(base,{revealed:false,revealedAt:null,method:''});if(genericContext.type==='blank')Object.assign(base,{resolved:!!data.resolution});arr.push({...base,...data})}},'Élément enregistré');$('#genericDialog').close()};
$('#btnDeleteGeneric').onclick=()=>{const def=genericDefs[genericContext.type];if(!def||!genericContext.id||!confirm('Supprimer cet élément ?'))return;commit(()=>state[def.collection]=state[def.collection].filter(x=>x.id!==genericContext.id),'Élément supprimé');$('#genericDialog').close()};

$('#revealSecretForm').onsubmit=e=>{e.preventDefault();const s=state.secrets.find(x=>x.id===revealingSecretId);if(!s)return;const method=new FormData(e.target).get('method');commit(()=>{s.revealed=true;s.revealedAt=nowStamp();s.method=method;state.journal.unshift({id:uid('j'),type:'secret',text:`Secret révélé (${method}) : ${s.title} — ${s.text}`,locationId:state.activeLocationId,createdAt:nowStamp()})},'Secret révélé');$('#revealSecretDialog').close()};

// quick note
$('#btnAddQuickNote').onclick=()=>{const text=$('#quickNoteText').value.trim();if(!text)return toast('Écris une note');const type=$('#quickNoteType').value;commit(()=>state.journal.unshift({id:uid('j'),type,text,locationId:state.activeLocationId,createdAt:nowStamp()}),'Note ajoutée');$('#quickNoteText').value=''};

// library
$$('.library-tab').forEach(b=>b.onclick=()=>{state.libraryTab=b.dataset.library;persist();renderLibrary()});
$('#btnClearJournal').onclick=()=>{if(confirm('Effacer le journal de session ?'))commit(()=>state.journal=[],'Journal effacé')};

// quick add
$('#btnQuickAdd').onclick=()=>$('#quickAddDialog').showModal();
$$('[data-quick-create]').forEach(b=>b.onclick=()=>{const type=b.dataset.quickCreate;$('#quickAddDialog').close();if(type==='location')openLocationEditor();else if(type==='npc')openNpcEditor();else openGenericEditor(type)});

// import export
function download(name,text){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},0)}
$('#btnExport').onclick=()=>download(`dm-cockpit-v02-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(state,null,2));
$('#btnImport').onclick=()=>$('#importFile').click();
$('#importFile').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const data=normalize(JSON.parse(await file.text()));if(!Array.isArray(data.locations)||!Array.isArray(data.secrets))throw new Error('format');snapshot();state=data;persist();render();toast('Préparation importée')}catch(err){console.error(err);toast('JSON incompatible avec DM Cockpit V0.2')}e.target.value=''};
$('#btnResetDemo').onclick=()=>{if(confirm('Restaurer la démonstration Sly Flourish ?')){snapshot();state=clone(DEMO);persist();render();toast('Démo restaurée')}};
$('#btnClear').onclick=()=>{if(confirm('Créer une préparation vide ?')){snapshot();state=EMPTY();persist();render();toast('Nouvelle préparation créée')}};

if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(()=>{}));
render();
