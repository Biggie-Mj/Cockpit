const CACHE='cockpit-v1.6-saved-session-io';
const SHELL=[
  './','./index.html','./styles.css?v=1.6.0','./app.js?v=1.6.0','./manifest.webmanifest?v=1.6.0'
];
const MEDIA=[
  './menu-background-v1.jpg?v=1.6.0','./icon-512.png','./icon-192.png','./icon-64.png','./apple-touch-icon.png','./favicon-32.png'
];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(SHELL);
    await Promise.all(MEDIA.map(url=>cache.add(url).catch(()=>null)));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE&&(key.startsWith('dm-cockpit-')||key.startsWith('cockpit-'))).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
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
  event.respondWith(fetch(event.request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  }).catch(()=>caches.match(event.request)));
});
