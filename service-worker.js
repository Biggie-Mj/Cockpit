const CACHE='cockpit-v1-cache-1';
const ASSETS=[
  './','./index.html','./styles.css','./app.js','./manifest.webmanifest',
  './assets/menu-background.jpg','./assets/cockpit-logo-source.png',
  './icons/icon-512.png','./icons/icon-192.png','./icons/apple-touch-icon.png','./icons/icon-64.png','./icons/favicon-32.png'
];
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE&&(key.startsWith('dm-cockpit-')||key.startsWith('cockpit-'))).map(key=>caches.delete(key)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));return response}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;})));
});
