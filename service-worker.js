const CACHE='cockpit-v1-cache-2-images';
const ASSETS=[
  './','./index.html','./styles.css?v=1.0.1','./app.js?v=1.0.1','./manifest.webmanifest?v=1.0.1',
  './assets/menu-background-v1.jpg?v=1.0.1','./assets/menu-background-v1-source.jpeg','./assets/cockpit-logo-v1-source.jpeg',
  './icons/cockpit-icon-v1-512.png','./icons/cockpit-icon-v1-192.png','./icons/cockpit-icon-v1-180.png','./icons/cockpit-icon-v1-64.png','./icons/cockpit-icon-v1-32.png'
];
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE&&(key.startsWith('dm-cockpit-')||key.startsWith('cockpit-'))).map(key=>caches.delete(key)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{
      const copy=response.clone(); caches.open(CACHE).then(cache=>cache.put('./index.html',copy)); return response;
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  // Network-first for app shell so corrected visuals propagate immediately; cache fallback keeps offline support.
  event.respondWith(fetch(event.request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  }).catch(()=>caches.match(event.request)));
});
