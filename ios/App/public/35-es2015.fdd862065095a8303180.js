(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{"99Un":function(t,n,e){"use strict";e.r(n),e.d(n,"HomePageModule",function(){return H});var i=e("ofXK"),o=e("TEn/"),r=e("3Pt+"),c=e("tyNb"),s=e("mrSG"),a=e("H98O"),l=e("ZF+8"),b=e("0itE"),g=e("LF58"),d=e("XmwK"),p=e("QVwR"),u=e("sOa5"),h=e("fXoL"),m=e("aPai");function f(t,n){1&t&&h.Pb(0,"img",4)}function T(t,n){if(1&t){const t=h.Vb();h.Ub(0,"ion-slide"),h.Ub(1,"img",2),h.cc("click",function(){h.vc(t);const e=n.$implicit;return h.ec().openBanner(null==e?null:e.link_url)}),h.Tb(),h.Bc(2,f,1,0,"img",3),h.Tb()}if(2&t){const t=n.$implicit;h.Cb(1),h.mc("src",null==t?null:t.image_url,h.xc),h.Cb(1),h.mc("ngIf",!t.image_url)}}let U=(()=>{class t{constructor(t){this.browserSrv=t,this.slideOpts={slidesPerView:1,speed:900,loop:!1,autoplay:!0,coverflowEffect:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0}}}ngOnInit(){}openBanner(t){"http://"!==t.substr(0,"http://".length)&&"https://"!==t.substr(0,"https://".length)&&(t="http://"+t),this.browserSrv.openBrowser({url:t})}}return t.\u0275fac=function(n){return new(n||t)(h.Ob(m.a))},t.\u0275cmp=h.Ib({type:t,selectors:[["app-slide-promo"]],inputs:{banners:"banners"},decls:2,vars:2,consts:[["pager","",1,"full-width",3,"options"],[4,"ngFor","ngForOf"],["onerror","this.onerror=null;this.src='assets/images/placeholder-banner.png'",1,"img-banner",3,"src","click"],["class","img-banner","src","assets/images/placeholder-banner.png",4,"ngIf"],["src","assets/images/placeholder-banner.png",1,"img-banner"]],template:function(t,n){1&t&&(h.Ub(0,"ion-slides",0),h.Bc(1,T,3,2,"ion-slide",1),h.Tb()),2&t&&(h.mc("options",n.slideOpts),h.Cb(1),h.mc("ngForOf",n.banners))},directives:[o.S,i.m,o.R,i.n],styles:[".img-banner[_ngcontent-%COMP%]{height:32vh;width:100%;-o-object-fit:cover;object-fit:cover}"]}),t})();var v=e("TZFh");function C(t,n){if(1&t&&h.Pb(0,"img",5),2&t){const t=h.ec();h.mc("src",null==t.category?null:t.category.icon_url,h.xc)}}function w(t,n){1&t&&h.Pb(0,"img",6)}let O=(()=>{class t{constructor(t){this.router=t}ngOnInit(){}goToProductByCategory(t){this.router.navigate(["/product","list"],{queryParams:{cat_id:t}})}}return t.\u0275fac=function(n){return new(n||t)(h.Ob(c.g))},t.\u0275cmp=h.Ib({type:t,selectors:[["app-card-category"]],inputs:{category:"category"},decls:9,vars:3,consts:[[1,"ion-text-center",3,"click"],["size","12"],["class","cat-icon rounded","onerror","this.onerror=null;this.src='assets/images/placeholder-product.svg'",3,"src",4,"ngIf"],["src","assets/images/placeholder-product.svg","class","cat-icon rounded",4,"ngIf"],[1,"category-name"],["onerror","this.onerror=null;this.src='assets/images/placeholder-product.svg'",1,"cat-icon","rounded",3,"src"],["src","assets/images/placeholder-product.svg",1,"cat-icon","rounded"]],template:function(t,n){1&t&&(h.Ub(0,"ion-row"),h.Ub(1,"ion-col",0),h.cc("click",function(){return n.goToProductByCategory(null==n.category?null:n.category.category_id)}),h.Ub(2,"ion-row"),h.Ub(3,"ion-col",1),h.Bc(4,C,1,1,"img",2),h.Bc(5,w,1,0,"img",3),h.Tb(),h.Ub(6,"ion-col",1),h.Ub(7,"ion-text",4),h.Dc(8),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb()),2&t&&(h.Cb(4),h.mc("ngIf",null==n.category?null:n.category.icon_url),h.Cb(1),h.mc("ngIf",!(null!=n.category&&n.category.icon_url)),h.Cb(3),h.Ec(null==n.category?null:n.category.name))},directives:[o.K,o.o,i.n,o.X],styles:[".cat-icon[_ngcontent-%COMP%]{width:80px;height:80px;-o-object-fit:cover;object-fit:cover}"]}),t})();var x=e("1rxE");function y(t,n){if(1&t&&(h.Ub(0,"ion-col",6),h.Pb(1,"app-card-category",7),h.Tb()),2&t){const t=n.$implicit;h.Cb(1),h.mc("category",t)}}function P(t,n){if(1&t&&(h.Ub(0,"ion-slide"),h.Ub(1,"ion-grid"),h.Ub(2,"ion-row",4),h.Bc(3,y,2,1,"ion-col",5),h.Tb(),h.Tb(),h.Tb()),2&t){const t=n.$implicit;h.Cb(3),h.mc("ngForOf",t)}}let _=(()=>{class t{constructor(t,n,e){this.gs=t,this.toastSrv=n,this.categorySrv=e}ngOnInit(){this.getCategory()}getCategory(){this.categorySrv.getList().then(t=>{this.categoriesChunk=this.gs.chunk(t.response,8)}).catch(t=>{this.toastSrv.show(t.error.error.message)})}}return t.\u0275fac=function(n){return new(n||t)(h.Ob(l.c),h.Ob(l.e),h.Ob(v.a))},t.\u0275cmp=h.Ib({type:t,selectors:[["app-home-categories"]],decls:7,vars:4,consts:[[1,"ion-padding-start"],[1,"section-title"],["pager","",1,"ion-padding-bottom"],[4,"ngFor","ngForOf"],[1,"ion-no-padding"],["class","ion-no-padding","size","3",4,"ngFor","ngForOf"],["size","3",1,"ion-no-padding"],[3,"category"]],template:function(t,n){1&t&&(h.Ub(0,"ion-row"),h.Ub(1,"ion-col",0),h.Ub(2,"ion-text",1),h.Dc(3),h.fc(4,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(5,"ion-slides",2),h.Bc(6,P,4,1,"ion-slide",3),h.Tb()),2&t&&(h.Cb(3),h.Ec(h.gc(4,2,"CATEGORIES")),h.Cb(3),h.mc("ngForOf",n.categoriesChunk))},directives:[o.K,o.o,o.X,o.S,i.m,o.R,o.s,O],pipes:[x.a],styles:[""]}),t})();var k=e("2oRN");const z=function(){return["/brand","list","featured"]};let E=(()=>{class t{constructor(t,n){this.toastSrv=t,this.brandSrv=n}ngOnInit(){this.getFeaturedBrand()}getFeaturedBrand(){this.brandSrv.getFeaturedList().then(t=>{this.brands=t.response}).catch(t=>{this.toastSrv.show(t.error.error.message)})}}return t.\u0275fac=function(n){return new(n||t)(h.Ob(l.e),h.Ob(g.d))},t.\u0275cmp=h.Ib({type:t,selectors:[["app-home-brands"]],decls:16,vars:12,consts:[[1,"ion-padding","ion-no-padding-bottom"],["size","8"],[1,"section-title"],["size","4",1,"ion-text-right"],[1,"section-see-all","link",3,"routerLink"],["size","12"],[1,"section-desc"],[3,"brands"]],template:function(t,n){1&t&&(h.Ub(0,"ion-row",0),h.Ub(1,"ion-col",1),h.Ub(2,"ion-text",2),h.Dc(3),h.fc(4,"translate"),h.Tb(),h.Tb(),h.Ub(5,"ion-col",3),h.Ub(6,"ion-text",4),h.Dc(7),h.fc(8,"translate"),h.Tb(),h.Tb(),h.Ub(9,"ion-col",5),h.Ub(10,"ion-text",6),h.Dc(11),h.fc(12,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(13,"ion-row"),h.Ub(14,"ion-col"),h.Pb(15,"app-slide-brand",7),h.Tb(),h.Tb()),2&t&&(h.Cb(3),h.Ec(h.gc(4,5,"FEATURED_BRAND")),h.Cb(3),h.mc("routerLink",h.qc(11,z)),h.Cb(1),h.Fc(" ",h.gc(8,7,"SEE_ALL")," "),h.Cb(4),h.Ec(h.gc(12,9,"FEATURED_BRAND_DESC")),h.Cb(4),h.mc("brands",n.brands))},directives:[o.K,o.o,o.X,o.kb,c.h,k.a],pipes:[x.a],styles:[""]}),t})();var S=e("ktVl");let I=(()=>{class t{constructor(t){this.modalCtrl=t}ngOnInit(){}goToNewsDetail(t){return Object(s.a)(this,void 0,void 0,function*(){const n=yield this.modalCtrl.create({component:S.a,componentProps:{article:t,redirectBack:"/tabs/home"}});return yield n.present()})}}return t.\u0275fac=function(n){return new(n||t)(h.Ob(o.eb))},t.\u0275cmp=h.Ib({type:t,selectors:[["app-card-article"]],inputs:{article:"article"},decls:15,vars:6,consts:[[1,"ion-no-border","ion-no-margin","ion-padding-top",3,"click"],[1,"ion-no-padding"],[1,"full-width","img-header",3,"src"],[1,"ion-no-padding","ion-text-left"],["size","12",1,"truncate"],[1,"article-title"],["size","12",1,"line-clamp-article"],[1,"article-desc"],["size","12",1,"ion-text-right",2,"min-height","22px"],[1,"section-see-all"]],template:function(t,n){1&t&&(h.Ub(0,"ion-card",0),h.cc("click",function(){return n.goToNewsDetail(n.article)}),h.Ub(1,"ion-card-header",1),h.Pb(2,"img",2),h.Tb(),h.Ub(3,"ion-card-content",3),h.Ub(4,"ion-row"),h.Ub(5,"ion-col",4),h.Ub(6,"ion-text",5),h.Dc(7),h.Tb(),h.Tb(),h.Ub(8,"ion-col",6),h.Ub(9,"ion-text",7),h.Dc(10),h.Tb(),h.Tb(),h.Ub(11,"ion-col",8),h.Ub(12,"ion-text",9),h.Dc(13),h.fc(14,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb()),2&t&&(h.Cb(2),h.mc("src",null==n.article?null:n.article.feature_image,h.xc),h.Cb(5),h.Fc("",null==n.article?null:n.article.title," "),h.Cb(3),h.Fc(" ",null==n.article?null:n.article.excerpt," "),h.Cb(3),h.Ec(h.gc(14,4,"READ_MORE")))},directives:[o.j,o.l,o.k,o.K,o.o,o.X],pipes:[x.a],styles:[".img-header[_ngcontent-%COMP%]{width:100%;height:150px;border-radius:8px}.line-clamp-article[_ngcontent-%COMP%]{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.article-title[_ngcontent-%COMP%]{font-size:14px;font-weight:700}.article-desc[_ngcontent-%COMP%]{font-size:12px}.article-readmore[_ngcontent-%COMP%]{font-size:12px;font-weight:700}"]}),t})();function D(t,n){if(1&t&&(h.Ub(0,"ion-col",9),h.Pb(1,"app-card-article",10),h.Tb()),2&t){const t=n.$implicit;h.Cb(1),h.mc("article",t)}}const L=function(){return["/article/list"]};let F=(()=>{class t{constructor(){}ionViewDidEnter(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=h.Ib({type:t,selectors:[["app-home-articles"]],inputs:{articles:"articles"},decls:15,vars:12,consts:[[1,"ion-padding","ion-no-padding-bottom"],["size","8"],[1,"section-title"],["size","4",1,"ion-text-right","link",3,"routerLink"],[1,"section-see-all"],["size","12",1,"ion-padding-top"],[1,"section-desc"],[1,"ion-padding-horizontal"],["size","12",4,"ngFor","ngForOf"],["size","12"],[3,"article"]],template:function(t,n){1&t&&(h.Ub(0,"ion-row",0),h.Ub(1,"ion-col",1),h.Ub(2,"ion-text",2),h.Dc(3),h.fc(4,"translate"),h.Tb(),h.Tb(),h.Ub(5,"ion-col",3),h.Ub(6,"ion-text",4),h.Dc(7),h.fc(8,"translate"),h.Tb(),h.Tb(),h.Ub(9,"ion-col",5),h.Ub(10,"ion-text",6),h.Dc(11),h.fc(12,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(13,"ion-row",7),h.Bc(14,D,2,1,"ion-col",8),h.Tb()),2&t&&(h.Cb(3),h.Ec(h.gc(4,5,"GROCIE_ARTICLE")),h.Cb(2),h.mc("routerLink",h.qc(11,L)),h.Cb(2),h.Ec(h.gc(8,7,"SEE_ALL")),h.Cb(4),h.Ec(h.gc(12,9,"GROCIE_ARTICLE_DESC")),h.Cb(3),h.mc("ngForOf",n.articles))},directives:[o.K,o.o,o.X,o.kb,c.h,i.m,I],pipes:[x.a],styles:[""]}),t})();var M=e("3zol");function B(t,n){if(1&t&&(h.Ub(0,"ion-row",11),h.Ub(1,"ion-col",11),h.Pb(2,"img",12),h.Tb(),h.Tb()),2&t){const t=h.ec();h.Cb(2),h.mc("src",t.bundling.image_url,h.xc)}}const R=function(t){return["/bundling",t,"detail"]},A=function(t){return{"ion-padding-top":t}};let N=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=h.Ib({type:t,selectors:[["app-home-bundling"]],inputs:{bundling:"bundling"},decls:16,vars:13,consts:[[1,"ion-padding"],["size","8",1,"ion-padding-bottom-small"],[1,"section-title"],["size","4",1,"ion-text-right"],[1,"section-see-all","link",3,"routerLink"],["size","12"],[1,"section-desc"],["class","ion-no-padding",4,"ngIf"],[3,"ngClass"],[3,"products"],[1,"divider"],[1,"ion-no-padding"],["onerror","this.onerror=null;this.src='assets/images/placeholder-banner.png'",1,"img-banner",3,"src"]],template:function(t,n){1&t&&(h.Ub(0,"ion-row",0),h.Ub(1,"ion-col",1),h.Ub(2,"ion-text",2),h.Dc(3),h.Tb(),h.Tb(),h.Ub(4,"ion-col",3),h.Ub(5,"ion-text",4),h.Dc(6),h.fc(7,"translate"),h.Tb(),h.Tb(),h.Ub(8,"ion-col",5),h.Ub(9,"ion-text",6),h.Dc(10),h.Tb(),h.Tb(),h.Tb(),h.Bc(11,B,3,1,"ion-row",7),h.Ub(12,"ion-row",8),h.Ub(13,"ion-col"),h.Pb(14,"app-slide-product",9),h.Tb(),h.Tb(),h.Pb(15,"div",10)),2&t&&(h.Cb(3),h.Ec(n.bundling.name),h.Cb(2),h.mc("routerLink",h.rc(9,R,null==n.bundling?null:n.bundling.bundling_id)),h.Cb(1),h.Fc(" ",h.gc(7,7,"SEE_ALL")," "),h.Cb(4),h.Ec(null==n.bundling?null:n.bundling.description),h.Cb(1),h.mc("ngIf",n.bundling.image_url),h.Cb(1),h.mc("ngClass",h.rc(11,A,n.bundling.image_url)),h.Cb(2),h.mc("products",n.bundling.products))},directives:[o.K,o.o,o.X,o.kb,c.h,i.n,i.l,M.a],pipes:[x.a],styles:[".section-title[_ngcontent-%COMP%]{text-transform:capitalize;font-size:16px;font-weight:700}.section-desc[_ngcontent-%COMP%]{font-size:13px}.img-banner[_ngcontent-%COMP%]{width:100%;height:200px;-o-object-fit:cover;object-fit:cover}.divider[_ngcontent-%COMP%]{height:8px;margin-top:0!important;margin-bottom:0!important;background-color:#f5f5f5}"]}),t})();function j(t,n){if(1&t&&(h.Ub(0,"ion-row"),h.Ub(1,"ion-col"),h.Pb(2,"app-home-bundling",37),h.Tb(),h.Tb()),2&t){const t=n.$implicit;h.Cb(2),h.mc("bundling",t)}}const X=function(){return["/loyalty-point"]};let K=(()=>{class t{constructor(t,n,e,i,o,r,c,s,a,l,b,g){this.translate=t,this.router=n,this.toastSrv=e,this.bannerSrv=i,this.bundlingSrv=o,this.modalCtrl=r,this.userSrv=c,this.activitySrv=s,this.route=a,this.authSrv=l,this.toastCtrl=b,this.articleSrv=g,this.selectedLanguage="id",this.route.queryParams.subscribe(t=>{const n=t.emailToken;n&&this.verifyEmail(n);const e=t.notifTitle,i=t.notifBody;e&&i&&this.presentToast(e,i),t.openNotif&&this.openNotification(),this.doRefresh()})}ngOnInit(){this.getBanner(),this.getBundling(),this.getArticle(),this.activitySrv.registerPush()}presentToast(t,n){return Object(s.a)(this,void 0,void 0,function*(){(yield this.toastCtrl.create({header:t,message:n,position:"top",color:"white",buttons:[{side:"end",text:"Ok",handler:()=>{this.openNotification()}}]})).present()})}doRefresh(t){Promise.all([this.getBanner(),this.getBundling(),this.getArticle(),this.getUser()]).then(n=>{t&&t.target.complete()})}selectLang(t){this.selectedLanguage=t,this.translate.setLanguage(t)}openNotification(){return Object(s.a)(this,void 0,void 0,function*(){const t=yield this.modalCtrl.create({component:d.a});return t.onDidDismiss().then(()=>{}),yield t.present()})}searchProduct(){this.router.navigate(["/product","search"])}scanQR(){this.router.navigate(["/qr","scan"])}changeLocation(){return Object(s.a)(this,void 0,void 0,function*(){const t=yield this.modalCtrl.create({component:b.a});return t.onDidDismiss().then(()=>{}),yield t.present()})}getBanner(){return this.bannerSrv.getList().then(t=>{this.banners=t.response}).catch(t=>{this.toastSrv.show(t.error.error.message)})}getBundling(){return this.bundlingSrv.getList().then(t=>{this.bundlings=t.response.rows}).catch(t=>{this.toastSrv.show(t.error.error.message)})}getArticle(){this.articleSrv.getArticle().then(t=>{this.articles=t.response})}getUser(){this.userSrv.getProfile().then(t=>{this.point=t.loyalty_point,this.branchName=t.branch_name}).catch(()=>{this.point=null})}verifyEmail(t){this.authSrv.verifyEmail(t).then(()=>{const t=this.translate.get("EMAIL_VERIFIED");this.toastSrv.show(t),this.router.navigate(["/tabs","home"])}).catch(t=>{this.toastSrv.show(t.error.error.message)})}selectStore(){this.router.navigate(["/store-location"])}}return t.\u0275fac=function(n){return new(n||t)(h.Ob(a.a),h.Ob(c.g),h.Ob(l.e),h.Ob(g.b),h.Ob(g.e),h.Ob(o.eb),h.Ob(g.m),h.Ob(p.a),h.Ob(c.a),h.Ob(l.a),h.Ob(o.nb),h.Ob(u.a))},t.\u0275cmp=h.Ib({type:t,selectors:[["app-home"]],decls:63,vars:17,consts:[[1,"ion-no-border",3,"translucent"],["mode","ios"],[1,"ion-align-items-center","ion-padding-top"],["size","4","size-md","3",1,"ion-padding-horizontal"],["src","assets/images/app-logo.png",2,"height","23px"],["size","8","size-md","9",1,"ion-text-right"],["size","12",1,"ion-no-padding","location-title","ion-padding-end"],["size","12",1,"ion-padding-end"],[1,"ion-no-padding","ion-align-items-center","location-text"],["size","12","size-sm","","size-md","5","size-lg","4",1,"ion-no-padding","truncate",3,"click"],[2,"vertical-align","middle"],["name","location",1,"location-icon"],[1,"location-text"],["size","10.5",3,"click"],["mode","ios",1,"custom-search"],[1,"ion-no-padding","ion-align-self-center","ion-text-center","scan-icon-container",3,"click"],["src","assets/images/scan.svg",1,"scan-icon"],["size","1.5",1,"ion-no-padding","ion-align-self-center","ion-text-center"],["name","notifications","color","primary",1,"notif-icon","link",3,"click"],[3,"fullscreen"],["slot","fixed","pullFactor","1.2","pullMin","20","pullMax","80",3,"ionRefresh"],[1,"ion-no-padding"],[3,"banners"],[1,"ion-padding-top"],[1,"padding-point"],["size","1",1,"ion-align-self-center"],["src","assets/images/ic_point.svg",1,"point-icon"],[1,"ion-align-self-center"],[1,"point-label"],[1,"ion-text-right","ion-align-self-center",3,"routerLink"],[1,"point-value"],["size","1"],["name","chevron-forward-circle","color","sunflower-yellow"],[1,"divider"],[4,"ngFor","ngForOf"],[1,"ion-padding-bottom"],[3,"articles"],[3,"bundling"]],template:function(t,n){1&t&&(h.Ub(0,"ion-header",0),h.Ub(1,"ion-toolbar",1),h.Ub(2,"ion-row",2),h.Ub(3,"ion-col",3),h.Pb(4,"img",4),h.Tb(),h.Ub(5,"ion-col",5),h.Ub(6,"ion-row"),h.Ub(7,"ion-col",6),h.Dc(8),h.fc(9,"translate"),h.Tb(),h.Ub(10,"ion-col",7),h.Ub(11,"ion-row",8),h.Ub(12,"ion-col",9),h.cc("click",function(){return n.selectStore()}),h.Ub(13,"div",10),h.Pb(14,"ion-icon",11),h.Ub(15,"ion-text",12),h.Dc(16),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(17,"ion-row"),h.Ub(18,"ion-col",13),h.cc("click",function(){return n.searchProduct()}),h.Pb(19,"ion-searchbar",14),h.Ub(20,"div",15),h.cc("click",function(t){return n.scanQR(),t.stopPropagation()}),h.Pb(21,"img",16),h.Tb(),h.Tb(),h.Ub(22,"ion-col",17),h.Ub(23,"ion-icon",18),h.cc("click",function(){return n.openNotification()}),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(24,"ion-content",19),h.Ub(25,"ion-refresher",20),h.cc("ionRefresh",function(t){return n.doRefresh(t)}),h.Pb(26,"ion-refresher-content"),h.Tb(),h.Ub(27,"ion-grid",21),h.Ub(28,"ion-row",21),h.Ub(29,"ion-col",21),h.Pb(30,"app-slide-promo",22),h.Tb(),h.Tb(),h.Ub(31,"ion-row",23),h.Ub(32,"ion-col"),h.Ub(33,"ion-card"),h.Ub(34,"ion-row",24),h.Ub(35,"ion-col"),h.Ub(36,"ion-row"),h.Ub(37,"ion-col",25),h.Pb(38,"img",26),h.Tb(),h.Ub(39,"ion-col",27),h.Ub(40,"ion-text",28),h.Dc(41),h.fc(42,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(43,"ion-col",29),h.Ub(44,"ion-row"),h.Ub(45,"ion-col"),h.Ub(46,"ion-text",30),h.Dc(47),h.fc(48,"number"),h.Tb(),h.Tb(),h.Ub(49,"ion-col",31),h.Pb(50,"ion-icon",32),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(51,"ion-row",23),h.Ub(52,"ion-col"),h.Pb(53,"app-home-categories"),h.Tb(),h.Tb(),h.Pb(54,"div",33),h.Bc(55,j,3,1,"ion-row",34),h.Ub(56,"ion-row"),h.Ub(57,"ion-col"),h.Pb(58,"app-home-brands"),h.Tb(),h.Tb(),h.Pb(59,"div",33),h.Ub(60,"ion-row",35),h.Ub(61,"ion-col"),h.Pb(62,"app-home-articles",36),h.Tb(),h.Tb(),h.Tb(),h.Tb()),2&t&&(h.mc("translucent",!0),h.Cb(8),h.Ec(h.gc(9,10,"STORE_LOCATION")),h.Cb(8),h.Fc(" ",n.branchName," "),h.Cb(8),h.mc("fullscreen",!0),h.Cb(6),h.mc("banners",n.banners),h.Cb(11),h.Ec(h.gc(42,12,"LOYALTY_POINTS")),h.Cb(2),h.mc("routerLink",h.qc(16,X)),h.Cb(4),h.Fc("",h.gc(48,14,n.point)||"-"," POINTS"),h.Cb(8),h.mc("ngForOf",n.bundlings),h.Cb(7),h.mc("articles",n.articles))},directives:[o.t,o.bb,o.K,o.o,o.u,o.X,o.L,o.mb,o.p,o.H,o.I,o.s,U,o.j,o.kb,c.h,_,i.m,E,F,N],pipes:[x.a,i.f],styles:["ion-header[_ngcontent-%COMP%]{border-bottom:0}.ion-text-wrap[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis}.location-title[_ngcontent-%COMP%]{color:#353535}.location-text[_ngcontent-%COMP%], .location-title[_ngcontent-%COMP%]{font-size:11px;line-height:1.2;letter-spacing:normal}.location-text[_ngcontent-%COMP%]{font-weight:700;color:#9c3;vertical-align:top}.location-icon[_ngcontent-%COMP%]{margin-top:1px}.notif-icon[_ngcontent-%COMP%]{font-size:25px}.divider[_ngcontent-%COMP%]{height:8px;margin-top:0!important;margin-bottom:0!important;background-color:#f5f5f5}.toast-header[_ngcontent-%COMP%]{font-weight:700}.padding-point[_ngcontent-%COMP%]{padding:10px}.point-label[_ngcontent-%COMP%]{padding-left:5px;font-size:11px;font-weight:600;color:#353535}.point-value[_ngcontent-%COMP%]{font-size:12px;font-weight:500;color:#353535}.point-icon[_ngcontent-%COMP%]{width:16px;height:16px}"]}),t})();var V=e("PCNd"),q=e("8/Qx"),$=e("CNc/"),G=e("8uOt"),Q=e("Vgir");let H=(()=>{class t{}return t.\u0275mod=h.Mb({type:t}),t.\u0275inj=h.Lb({factory:function(n){return new(n||t)},imports:[[i.b,r.j,o.cb,V.a,q.a,G.a,Q.a,$.a,c.j.forChild([{path:"",component:K}])]]}),t})()}}]);