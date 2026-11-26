/* 離線快取：所有檔案都「網路優先」（有網路就拿最新版並更新快取，沒網路才用快取），所以我更新後，下次開啟就會自動換新 */
const V="mc-c053874336",ASSETS=["./","index.html","samples.js","colored.js","extra.js","manifest.webmanifest","icons/icon-v2-192.png","icons/icon-v2-512.png","touch-icon-v2.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r,{cache:"no-cache"}).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(ch=>ch.put(r,c))}return x}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));
});
