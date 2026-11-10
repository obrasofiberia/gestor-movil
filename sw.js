const C="gd-movil-v3";
const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(SHELL.map(u=>fetch(new Request(u,{cache:"reload"})).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin) return;
  const clave=u.pathname.endsWith("data.enc")?new Request(u.origin+u.pathname):e.request;
  e.respondWith(fetch(e.request,{cache:"no-cache"}).then(r=>{
    if(r.ok){const cp=r.clone(); caches.open(C).then(c=>c.put(clave,cp));}
    return r;
  }).catch(()=>caches.match(clave,{ignoreSearch:true})));
});
