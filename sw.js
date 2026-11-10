const C="gd-movil-v1";
const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok){const cp=r.clone(); caches.open(C).then(c=>c.put(u.pathname.endsWith("data.enc")?new Request(u.origin+u.pathname):e.request,cp));}
    return r;
  }).catch(()=>caches.match(u.pathname.endsWith("data.enc")?new Request(u.origin+u.pathname):e.request,{ignoreSearch:true})));
});
