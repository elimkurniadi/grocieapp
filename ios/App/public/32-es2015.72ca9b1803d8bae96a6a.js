(window.webpackJsonp=window.webpackJsonp||[]).push([[32,37,38,39],{L1AV:function(t,n,e){"use strict";e.r(n),e.d(n,"StoreLocationPageModule",function(){return U});var i=e("ofXK"),o=e("3Pt+"),c=e("TEn/"),s=e("tyNb"),r=e("ZF+8"),a=e("LF58"),h=e("Bfh1"),l=e("fXoL");function b(t,n){1&t&&(l.Ub(0,"ion-item",2),l.Pb(1,"ion-skeleton-text",3),l.Tb())}const g=function(){return[1,2,3]};let u=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=l.Ib({type:t,selectors:[["app-store-location-skeleton"]],decls:2,vars:2,consts:[[1,"ion-no-padding"],["lines","none",4,"ngFor","ngForOf"],["lines","none"],["animated",""]],template:function(t,n){1&t&&(l.Ub(0,"ion-list",0),l.Bc(1,b,2,0,"ion-item",1),l.Tb()),2&t&&(l.Cb(1),l.mc("ngForOf",l.qc(1,g)))},directives:[c.D,i.m,c.y,c.Q],styles:[""]}),t})();var d=e("1rxE");function f(t,n){1&t&&(l.Ub(0,"ion-col",13),l.Pb(1,"app-store-location-skeleton"),l.Tb())}function p(t,n){1&t&&(l.Ub(0,"ion-col",14),l.Ub(1,"ion-text"),l.Dc(2),l.fc(3,"translate"),l.Tb(),l.Tb()),2&t&&(l.Cb(2),l.Fc(" ",l.gc(3,1,"STORE_NOT_FOUND"),""))}function m(t,n){if(1&t&&(l.Ub(0,"ion-text",20),l.Dc(1),l.fc(2,"number"),l.Tb()),2&t){const t=l.ec().$implicit;l.Cb(1),l.Fc(" ",l.hc(2,1,t.distance,"1.0-0")," KM ")}}function T(t,n){if(1&t){const t=l.Vb();l.Ub(0,"ion-item",16),l.cc("click",function(){l.vc(t);const e=n.$implicit;return l.ec(2).selectBranch(e)}),l.Pb(1,"ion-icon",17),l.Ub(2,"ion-text",18),l.Dc(3),l.Tb(),l.Bc(4,m,3,4,"ion-text",19),l.Tb()}if(2&t){const t=n.$implicit;l.Cb(3),l.Fc(" ",t.name,""),l.Cb(1),l.mc("ngIf",t.distance)}}function C(t,n){if(1&t&&(l.Ub(0,"ion-col",5),l.Ub(1,"ion-list",5),l.Bc(2,T,5,2,"ion-item",15),l.Tb(),l.Tb()),2&t){const t=l.ec();l.Cb(2),l.mc("ngForOf",t.branches)}}const v=[{path:"",component:(()=>{class t{constructor(t,n,e,i,o,c){this.branchSrv=t,this.toastSrv=n,this.authSrv=e,this.navCtrl=i,this.geolocation=o,this.gs=c,this.page={row:15,page:1}}ngOnInit(){this.longitude=null,this.latitude=null,this.fetching=!0,this.geolocation.getCurrentPosition().then(t=>{t?(this.latitude=t.coords.latitude,this.longitude=t.coords.longitude,this.getBranch()):this.getBranch()})}getBranch(){let t={};this.latitude&&this.longitude&&(t={latitude:this.latitude,longitude:this.longitude}),this.branchSrv.getList(this.page,t).then(t=>{const n=t.response.rows;this.branchCount=t.response.count,this.branches=this.branches&&this.branches.length&&this.branches.length<this.branchCount?this.branches.concat(n):n,this.fetching=!1}).catch(t=>{this.toastSrv.show(t.error.error.message),this.fetching=!1})}searchBranch(t){this.fetching=!0;const n=t.target.value;this.geolocation.getCurrentPosition().then(t=>{t?(this.latitude=t.coords.latitude,this.longitude=t.coords.longitude,this.getBranchWithFilter(n)):this.getBranchWithFilter(n)})}getBranchWithFilter(t){const n={keyword:t};this.latitude&&this.longitude&&(n.latitude=this.latitude,n.longitude=this.longitude),console.log("filter",n),console.log("latitude",this.latitude),this.branchSrv.getListWithFilter(this.page,n).then(t=>{this.branches=t.response,this.fetching=!1}).catch(t=>{this.toastSrv.show(t.error.error.message),this.fetching=!1})}selectBranch(t){this.branchSrv.selectBranch(t.branch_id).then(t=>{this.authSrv.loginByToken(t),this.navCtrl.navigateRoot("/tabs/home")}).catch(t=>{this.toastSrv.show(t.error.error.message)})}loadMoreBranch(t){setTimeout(()=>{t.target.complete(),this.page.page+=1,this.page.page>=Math.ceil(this.branchCount/this.page.row)?t.target.disabled=!0:(this.fetching=!0,this.getBranch())},500)}}return t.\u0275fac=function(n){return new(n||t)(l.Ob(a.c),l.Ob(r.e),l.Ob(r.a),l.Ob(c.fb),l.Ob(h.a),l.Ob(r.c))},t.\u0275cmp=l.Ib({type:t,selectors:[["app-store-location"]],decls:21,vars:9,consts:[[1,"ion-no-border"],["mode","ios"],["mode","md",1,"ion-text-center"],["defaultHref","/tabs/home","icon","chevron-back-outline"],[1,"ion-padding-top"],[1,"ion-no-padding"],[1,"ion-padding-start","store-title"],["mode","ios","debounce","500",1,"search-store",3,"ionChange"],["size","12","class","ion-text-center",4,"ngIf"],["size","12","class","ion-text-center ion-no-padding",4,"ngIf"],["class","ion-no-padding",4,"ngIf"],["threshold","100px",3,"ionInfinite"],["loadingSpinner","bubbles"],["size","12",1,"ion-text-center"],["size","12",1,"ion-text-center","ion-no-padding"],["lines","none",3,"click",4,"ngFor","ngForOf"],["lines","none",3,"click"],["name","location","color","success",1,"store-text",2,"vertical-align","middle"],["color","success",1,"store-text"],["color","success","class","store-distance","slot","end",4,"ngIf"],["color","success","slot","end",1,"store-distance"]],template:function(t,n){1&t&&(l.Ub(0,"ion-header",0),l.Ub(1,"ion-toolbar",1),l.Ub(2,"ion-buttons",2),l.Pb(3,"ion-back-button",3),l.Tb(),l.Ub(4,"ion-title"),l.Dc(5),l.fc(6,"translate"),l.Tb(),l.Tb(),l.Tb(),l.Ub(7,"ion-content"),l.Ub(8,"ion-grid",4),l.Ub(9,"ion-row",5),l.Ub(10,"ion-col",5),l.Ub(11,"ion-label",6),l.Dc(12),l.fc(13,"translate"),l.Tb(),l.Ub(14,"ion-searchbar",7),l.cc("ionChange",function(t){return n.searchBranch(t)}),l.Tb(),l.Tb(),l.Tb(),l.Ub(15,"ion-row",5),l.Bc(16,f,2,0,"ion-col",8),l.Bc(17,p,4,3,"ion-col",9),l.Bc(18,C,3,1,"ion-col",10),l.Tb(),l.Tb(),l.Ub(19,"ion-infinite-scroll",11),l.cc("ionInfinite",function(t){return n.loadMoreBranch(t)}),l.Pb(20,"ion-infinite-scroll-content",12),l.Tb(),l.Tb()),2&t&&(l.Cb(5),l.Ec(l.gc(6,5,"STORE_LOCATION")),l.Cb(7),l.Fc(" ",l.gc(13,7,"CHOOSE_STORE_LOCATION"),""),l.Cb(4),l.mc("ngIf",n.fetching),l.Cb(1),l.mc("ngIf",!n.fetching&&(!n.branches||n.branches&&!n.branches.length)),l.Cb(1),l.mc("ngIf",!n.fetching))},directives:[c.t,c.bb,c.i,c.e,c.f,c.ab,c.p,c.s,c.K,c.o,c.C,c.L,c.mb,i.n,c.v,c.w,u,c.X,c.D,i.m,c.y,c.u],pipes:[d.a,i.f],styles:[".store-title[_ngcontent-%COMP%]{font-size:14px;font-weight:700;color:#353535}.store-text[_ngcontent-%COMP%]{margin-left:5px;font-size:14px;font-weight:600}.store-distance[_ngcontent-%COMP%]{font-size:12px;font-weight:600}"]}),t})()}];let O=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(n){return new(n||t)},imports:[[s.j.forChild(v)],s.j]}),t})();var w=e("PCNd");let U=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(n){return new(n||t)},imports:[[i.b,o.j,c.cb,O,w.a]]}),t})()},PCNd:function(t,n,e){"use strict";e.d(n,"a",function(){return c});var i=e("ofXK"),o=e("fXoL");let c=(()=>{class t{}return t.\u0275mod=o.Mb({type:t}),t.\u0275inj=o.Lb({factory:function(n){return new(n||t)},imports:[[i.b]]}),t})()}}]);