!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function n(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[16,37,38,39],{Cmua:function(e,o,i){"use strict";i.d(o,"a",function(){return s});var r=i("mrSG"),c=i("fXoL"),a=i("TEn/"),s=function(){var e=function(){function e(n){t(this,e),this.alertController=n}return n(e,[{key:"presentAlert",value:function(t){return Object(r.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.alertController.create(t);case 2:return n=e.sent,e.next=5,n.present();case 5:case"end":return e.stop()}},e,this)}))}}]),e}();return e.\u0275fac=function(t){return new(t||e)(c.Yb(a.b))},e.\u0275prov=c.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},PCNd:function(e,n,o){"use strict";o.d(n,"a",function(){return c});var i=o("ofXK"),r=o("fXoL"),c=function(){var e=function e(){t(this,e)};return e.\u0275mod=r.Mb({type:e}),e.\u0275inj=r.Lb({factory:function(t){return new(t||e)},imports:[[i.b]]}),e}()},aPai:function(e,o,i){"use strict";i.d(o,"a",function(){return b});var r=i("mrSG"),c=i("gcOT"),a=i("fXoL"),s=c.a.Browser,b=function(){var e=function(){function e(){t(this,e)}return n(e,[{key:"openBrowser",value:function(t){return Object(r.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.open(t);case 2:case"end":return e.stop()}},e)}))}},{key:"listenOnBrowserFinished",value:function(){s.addListener("browserFinished",function(t){return t})}},{key:"listenOnBrowserPageLoad",value:function(){s.addListener("browserPageLoaded",function(t){return t})}},{key:"removeAllListeners",value:function(){s.removeAllListeners()}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=a.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},mDHw:function(e,o,i){"use strict";i.r(o),i.d(o,"PaymentPageModule",function(){return X});var r=i("ofXK"),c=i("3Pt+"),a=i("TEn/"),s=i("tyNb"),b=i("XKlN"),u=i("ZF+8"),l=i("LF58"),h=i("fXoL"),d=i("1rxE");function m(t,e){if(1&t&&(h.Ub(0,"small"),h.Dc(1),h.Tb()),2&t){var n=h.ec();h.Cb(1),h.Ec(null==n.fg.controls.amount.errors||null==n.fg.controls.amount.errors.required?null:n.fg.controls.amount.errors.required.message)}}function p(t,e){1&t&&h.Pb(0,"ion-spinner",22)}var f,g=function(){return{standalone:!0}},v=((f=function(){function e(n,o,i,r,c,a,s,b,u,l,h){var d=this;t(this,e),this.validatorSrv=n,this.fb=o,this.router=i,this.route=r,this.checkoutSrv=c,this.transactionSrv=a,this.toastSrv=s,this.gs=b,this.cache=u,this.platform=l,this.navCtrl=h,this.previousUrl="/payment/list",this.isOnFetch=!1,this.route.queryParams.subscribe(function(t){d.isNow="true"===t.is_now,d.addressId=t.address_id,d.notes=t.notes,d.voucherCode=t.voucher_code,d.paymentId=t.payment_id,d.shippingDate=t.date,d.shippingTime=t.time;var e=new URLSearchParams;for(var n in t)t.hasOwnProperty(n)&&e.set(n,t[n]);d.previousUrl+="?".concat(e.toString())})}return n(e,[{key:"ngOnInit",value:function(){this.buildCodForm(),this.getPriceSummary()}},{key:"ionViewDidEnter",value:function(){var t=this;this.observeFetchState(),this.backButton=this.platform.backButton.subscribeWithPriority(20,function(){t.goBack()})}},{key:"ionViewDidLeave",value:function(){this.backButton.unsubscribe()}},{key:"goBack",value:function(){this.navCtrl.navigateBack(this.previousUrl)}},{key:"observeFetchState",value:function(){var t=this;this.gs.observeOnFetch().subscribe(function(e){t.isOnFetch=e})}},{key:"buildCodForm",value:function(){this.validatorSrv.validatorErrorMessage(),this.fg=this.fb.group({amount:[null,[b.c.required()]],cod_payment_amount:[null,[b.c.required()]]})}},{key:"getPriceSummary",value:function(){var t=this,e={is_now:this.isNow,address_id:this.addressId};""===this.voucherCode&&null===this.voucherCode||(e.voucher_code=this.voucherCode),this.isNow||(e.delivery_date=this.shippingDate),this.checkoutSrv.calculatePrice(e).then(function(e){t.paymentSummary=e.response})}},{key:"amountChanged",value:function(t){var e=t.replace(/,/g,""),n=this.gs.numberWithCommas(e);this.amountCod=n,this.fg.patchValue({cod_payment_amount:e,amount:n})}},{key:"pay",value:function(){var t=this;if(this.fg.valid){var e=this.prepareBodyTransaction();this.transactionSrv.add(e).then(function(e){t.removeVoucher(),t.navCtrl.navigateBack("my-order")}).catch(function(e){t.toastSrv.show(e.error.error.message)})}else this.gs.markDirtyForm(this.fg)}},{key:"prepareBodyTransaction",value:function(){var t={is_now:this.isNow,address_id:this.addressId,shipping_id:1,payment_method_id:this.paymentId,cod_payment_amount:this.fg.value.cod_payment_amount};return null!==this.notes&&""!==this.notes&&void 0!==this.notes&&(t.notes=this.notes),this.isNow||(t.shipping_date=this.shippingDate,t.shipping_time=this.shippingTime),null!==this.voucherCode&&""!==this.voucherCode&&void 0!==this.voucherCode&&(t.voucher_code=this.voucherCode),t}},{key:"removeVoucher",value:function(){this.cache.removeVoucher()}}]),e}()).\u0275fac=function(t){return new(t||f)(h.Ob(u.d),h.Ob(c.d),h.Ob(s.g),h.Ob(s.a),h.Ob(l.h),h.Ob(l.l),h.Ob(u.e),h.Ob(u.c),h.Ob(u.b),h.Ob(a.hb),h.Ob(a.fb))},f.\u0275cmp=h.Ib({type:f,selectors:[["app-payment-cod"]],decls:43,vars:28,consts:[[1,"ion-no-border"],["mode","ios"],["mode","md",1,"ion-text-center"],["defaultHref","/payment","icon","chevron-back-outline",3,"click"],[3,"fullscreen"],[1,"ion-padding-horizontal"],["size","12"],[1,"text-label"],[1,"text-price"],[1,"divider"],[1,"ion-padding-horizontal","ion-padding-top"],[1,"text-cod"],[1,"text-cod-message"],[3,"formGroup","ngSubmit"],["codForm","ngForm"],[1,"form-group"],["lines","none"],["placeholder","000.000","maxlength","16","inputmode","numeric",1,"default-theme","text-amount",3,"ngModel","ngModelOptions","ngModelChange"],[4,"ngIf"],[1,"ion-padding"],["color","success","expand","block","shape","round",3,"disabled","click"],["name","dots","color","dark",4,"ngIf"],["name","dots","color","dark"]],template:function(t,e){if(1&t){var n=h.Vb();h.Ub(0,"ion-header",0),h.Ub(1,"ion-toolbar",1),h.Ub(2,"ion-buttons",2),h.Ub(3,"ion-back-button",3),h.cc("click",function(){return e.goBack()}),h.Tb(),h.Tb(),h.Ub(4,"ion-title"),h.Dc(5),h.fc(6,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(7,"ion-content",4),h.Ub(8,"ion-row",5),h.Ub(9,"ion-col",6),h.Ub(10,"ion-text",7),h.Dc(11),h.fc(12,"translate"),h.Tb(),h.Tb(),h.Ub(13,"ion-col",6),h.Ub(14,"ion-text",8),h.Dc(15),h.fc(16,"number"),h.Tb(),h.Tb(),h.Tb(),h.Pb(17,"div",9),h.Ub(18,"ion-row",10),h.Ub(19,"ion-col",6),h.Ub(20,"ion-text",11),h.Dc(21),h.fc(22,"translate"),h.Tb(),h.Tb(),h.Ub(23,"ion-col",6),h.Ub(24,"ion-text",12),h.Dc(25),h.fc(26,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(27,"ion-row",5),h.Ub(28,"ion-col",6),h.Ub(29,"form",13,14),h.cc("ngSubmit",function(){return e.pay()}),h.Ub(31,"div",15),h.Ub(32,"ion-item",16),h.Ub(33,"ion-input",17),h.cc("ngModelChange",function(t){return e.amountChanged(t)}),h.Tb(),h.Pb(34,"br"),h.Tb(),h.Bc(35,m,2,1,"small",18),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(36,"ion-footer",0),h.Ub(37,"ion-row",19),h.Ub(38,"ion-col"),h.Ub(39,"ion-button",20),h.cc("click",function(){return h.vc(n),h.uc(30).ngSubmit.emit()}),h.Dc(40),h.fc(41,"translate"),h.Bc(42,p,1,0,"ion-spinner",21),h.Tb(),h.Tb(),h.Tb(),h.Tb()}2&t&&(h.Cb(5),h.Ec(h.gc(6,13,"COD")),h.Cb(2),h.mc("fullscreen",!0),h.Cb(4),h.Fc(" ",h.gc(12,15,"TOTAL_PAYMENT")," "),h.Cb(4),h.Fc(" Rp. ",h.ic(16,17,null==e.paymentSummary?null:e.paymentSummary.final_price,"1.0-0","id"),""),h.Cb(6),h.Fc(" ",h.gc(22,21,"CASH_ON_DELIVERY")," "),h.Cb(4),h.Fc(" ",h.gc(26,23,"COD_MESSAGE")," "),h.Cb(4),h.mc("formGroup",e.fg),h.Cb(4),h.mc("ngModel",e.amountCod)("ngModelOptions",h.qc(27,g)),h.Cb(2),h.mc("ngIf",e.fg.controls.amount.dirty),h.Cb(4),h.mc("disabled",e.isOnFetch),h.Cb(1),h.Fc(" ",h.gc(41,25,"PAY")," "),h.Cb(2),h.mc("ngIf",e.isOnFetch))},directives:[a.t,a.bb,a.i,a.e,a.f,a.ab,a.p,a.K,a.o,a.X,c.y,c.q,c.i,a.y,a.x,a.mb,c.k,c.p,c.s,r.n,a.r,a.h,a.T],pipes:[d.a,r.f],styles:[".text-label[_ngcontent-%COMP%]{font-size:12px;font-weight:600;font-stretch:normal;font-style:normal;line-height:1.2;letter-spacing:normal;color:#353535}.text-price[_ngcontent-%COMP%]{font-size:18px;font-weight:700;line-height:1.22;color:#353535}.text-cod[_ngcontent-%COMP%]{font-weight:700;font-size:14px}.text-cod-message[_ngcontent-%COMP%]{font-size:10px;font-weight:400}.text-amount[_ngcontent-%COMP%]{font-weight:600}.divider[_ngcontent-%COMP%]{height:8px;margin-top:0!important;margin-bottom:0!important;background-color:#f5f5f5}"]}),f),T=i("H98O"),y=i("Cmua");function U(t,e){1&t&&h.Pb(0,"ion-spinner",26)}var k,C=((k=function(){function e(n,o,i,r,c,a,s,b,u,l,h){var d=this;t(this,e),this.router=n,this.route=o,this.checkoutSrv=i,this.transactionSrv=r,this.toastSrv=c,this.cache=a,this.gs=s,this.translate=b,this.alertSrv=u,this.navCtrl=l,this.platform=h,this.previousUrl="/payment/list",this.isOnFetch=!1,this.route.queryParams.subscribe(function(t){d.isNow="true"===t.is_now,d.addressId=t.address_id,d.notes=t.notes,d.voucherCode=t.voucher_code,d.paymentId=t.payment_id,d.shippingDate=t.date,d.shippingTime=t.time;var e=new URLSearchParams;for(var n in t)t.hasOwnProperty(n)&&e.set(n,t[n]);d.previousUrl+="?".concat(e.toString())})}return n(e,[{key:"ngOnInit",value:function(){this.getPriceSummary()}},{key:"ionViewDidEnter",value:function(){var t=this;this.observeFetchState(),this.backButton=this.platform.backButton.subscribeWithPriority(20,function(){t.goBack()})}},{key:"ionViewDidLeave",value:function(){this.backButton.unsubscribe()}},{key:"goBack",value:function(){this.navCtrl.navigateBack(this.previousUrl)}},{key:"observeFetchState",value:function(){var t=this;this.gs.observeOnFetch().subscribe(function(e){t.isOnFetch=e})}},{key:"getPriceSummary",value:function(){var t=this,e={is_now:this.isNow,address_id:this.addressId};""===this.voucherCode&&null===this.voucherCode||(e.voucher_code=this.voucherCode),this.isNow||(e.delivery_date=this.shippingDate),this.checkoutSrv.calculatePrice(e).then(function(e){t.paymentSummary=e.response})}},{key:"pay",value:function(){var t=this,e=this.prepareBodyTransaction();this.transactionSrv.add(e).then(function(e){t.removeVoucher(),t.router.navigate(["/payment",e.response,"proof"])}).catch(function(e){t.toastSrv.show(e.error.error.message)})}},{key:"prepareBodyTransaction",value:function(){var t={is_now:this.isNow,address_id:this.addressId,shipping_id:1,payment_method_id:this.paymentId};return null!==this.notes&&""!==this.notes&&void 0!==this.notes&&(t.notes=this.notes),this.isNow||(t.shipping_date=this.shippingDate,t.shipping_time=this.shippingTime),null!==this.voucherCode&&""!==this.voucherCode&&void 0!==this.voucherCode&&(t.voucher_code=this.voucherCode),t}},{key:"removeVoucher",value:function(){this.cache.removeVoucher()}}]),e}()).\u0275fac=function(t){return new(t||k)(h.Ob(s.g),h.Ob(s.a),h.Ob(l.h),h.Ob(l.l),h.Ob(u.e),h.Ob(u.b),h.Ob(u.c),h.Ob(T.a),h.Ob(y.a),h.Ob(a.fb),h.Ob(a.hb))},k.\u0275cmp=h.Ib({type:k,selectors:[["app-payment-instruction"]],decls:96,vars:41,consts:[[1,"ion-no-border"],["mode","ios"],["mode","md",1,"ion-text-center"],["icon","chevron-back-outline",3,"defaultHref","click"],[3,"fullscreen"],[1,"ion-padding-horizontal"],["size","12"],[1,"text-label"],[1,"text-price"],[1,"divider"],[1,"ion-padding-horizontal","ion-padding-top"],[1,"text-title"],["size","12",1,"ion-padding-vertical"],[1,"text-subtitle"],[1,"text-content"],["size","1"],[3,"innerHTML"],[1,"ion-padding-vertical"],[1,"ion-no-padding"],["size","1",1,"ion-no-padding"],[1,"text-content",3,"innerHTML"],["color","light",1,"ion-no-border",3,"translucent","mode"],[1,"ion-no-padding",2,"background","white"],[1,"ion-padding"],["color","success","expand","block","shape","round",3,"disabled","click"],["name","dots","color","dark",4,"ngIf"],["name","dots","color","dark"]],template:function(t,e){1&t&&(h.Ub(0,"ion-header",0),h.Ub(1,"ion-toolbar",1),h.Ub(2,"ion-buttons",2),h.Ub(3,"ion-back-button",3),h.cc("click",function(){return e.goBack()}),h.Tb(),h.Tb(),h.Ub(4,"ion-title"),h.Dc(5),h.fc(6,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(7,"ion-content",4),h.Ub(8,"ion-row",5),h.Ub(9,"ion-col",6),h.Ub(10,"ion-text",7),h.Dc(11),h.fc(12,"translate"),h.Tb(),h.Tb(),h.Ub(13,"ion-col",6),h.Ub(14,"ion-text",8),h.Dc(15),h.fc(16,"number"),h.Tb(),h.Tb(),h.Tb(),h.Pb(17,"div",9),h.Ub(18,"ion-row",10),h.Ub(19,"ion-col",6),h.Ub(20,"ion-text",11),h.Dc(21),h.fc(22,"translate"),h.Tb(),h.Tb(),h.Ub(23,"ion-col",12),h.Ub(24,"ion-text",13),h.Dc(25),h.fc(26,"translate"),h.Tb(),h.Tb(),h.Ub(27,"ion-col",6),h.Ub(28,"ion-text",14),h.Ub(29,"ion-row"),h.Ub(30,"ion-col",15),h.Dc(31," 1 "),h.Tb(),h.Ub(32,"ion-col"),h.Dc(33),h.fc(34,"translate"),h.Tb(),h.Tb(),h.Ub(35,"ion-row"),h.Ub(36,"ion-col",15),h.Dc(37," 2"),h.Tb(),h.Ub(38,"ion-col"),h.Pb(39,"span",16),h.fc(40,"translate"),h.Pb(41,"br"),h.Ub(42,"ion-grid",17),h.Ub(43,"ion-row",18),h.Ub(44,"ion-col",18),h.Ub(45,"strong"),h.Dc(46,"Nama Bank"),h.Tb(),h.Tb(),h.Ub(47,"ion-col",19),h.Dc(48," : "),h.Tb(),h.Ub(49,"ion-col",18),h.Ub(50,"strong"),h.Dc(51,"Bank Central Asia"),h.Tb(),h.Tb(),h.Tb(),h.Ub(52,"ion-row",18),h.Ub(53,"ion-col",18),h.Ub(54,"strong"),h.Dc(55,"Nomor Rekening"),h.Tb(),h.Tb(),h.Ub(56,"ion-col",19),h.Dc(57," : "),h.Tb(),h.Ub(58,"ion-col",18),h.Ub(59,"strong"),h.Dc(60,"040 899 5577"),h.Tb(),h.Tb(),h.Tb(),h.Ub(61,"ion-row",18),h.Ub(62,"ion-col",18),h.Ub(63,"strong"),h.Dc(64,"Pemilik Rekening"),h.Tb(),h.Tb(),h.Ub(65,"ion-col",19),h.Dc(66," : "),h.Tb(),h.Ub(67,"ion-col",18),h.Ub(68,"strong"),h.Dc(69,"PT Mitra Kreasi Santosa"),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(70,"table"),h.Ub(71,"tr"),h.Pb(72,"td"),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(73,"ion-row"),h.Ub(74,"ion-col",15),h.Dc(75," 3 "),h.Tb(),h.Pb(76,"ion-col",20),h.fc(77,"translate"),h.Tb(),h.Ub(78,"ion-row"),h.Ub(79,"ion-col",15),h.Dc(80," 4 "),h.Tb(),h.Pb(81,"ion-col",20),h.fc(82,"translate"),h.Tb(),h.Ub(83,"ion-row"),h.Ub(84,"ion-col",15),h.Dc(85," 5 "),h.Tb(),h.Pb(86,"ion-col",20),h.fc(87,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(88,"ion-footer",21),h.Ub(89,"ion-grid",22),h.Ub(90,"ion-row",23),h.Ub(91,"ion-col"),h.Ub(92,"ion-button",24),h.cc("click",function(){return e.pay()}),h.Dc(93),h.fc(94,"translate"),h.Bc(95,U,1,0,"ion-spinner",25),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb()),2&t&&(h.Cb(3),h.mc("defaultHref",e.previousUrl),h.Cb(2),h.Ec(h.gc(6,17,"MANUAL_BANK_TRANSFER")),h.Cb(2),h.mc("fullscreen",!0),h.Cb(4),h.Fc(" ",h.gc(12,19,"TOTAL_PAYMENT")," "),h.Cb(4),h.Fc(" Rp. ",h.ic(16,21,null==e.paymentSummary?null:e.paymentSummary.final_price,"1.0-0","id"),""),h.Cb(6),h.Fc(" ",h.gc(22,25,"HOW_TO_PAY")," "),h.Cb(4),h.Fc(" ",h.gc(26,27,"MANUAL_BANK_TRANSFER")," "),h.Cb(8),h.Fc(" ",h.gc(34,29,"MANUAL_PAYMENT_STEP1")," "),h.Cb(6),h.oc("innerHTML","",h.gc(40,31,"MANUAL_PAYMENT_STEP2")," ",h.wc),h.Cb(37),h.nc("innerHTML",h.gc(77,33,"MANUAL_PAYMENT_STEP3"),h.wc),h.Cb(5),h.nc("innerHTML",h.gc(82,35,"MANUAL_PAYMENT_STEP4"),h.wc),h.Cb(5),h.nc("innerHTML",h.gc(87,37,"MANUAL_PAYMENT_STEP5"),h.wc),h.Cb(2),h.mc("translucent",!1)("mode","md"),h.Cb(4),h.mc("disabled",e.isOnFetch),h.Cb(1),h.Fc(" ",h.gc(94,39,"PAY")," "),h.Cb(2),h.mc("ngIf",e.isOnFetch))},directives:[a.t,a.bb,a.i,a.e,a.f,a.ab,a.p,a.K,a.o,a.X,a.s,a.r,a.h,r.n,a.T],pipes:[d.a,r.f],styles:[".text-title[_ngcontent-%COMP%]{font-size:16px;font-weight:700;color:#353535}.text-subtitle[_ngcontent-%COMP%]{font-size:12px;font-weight:600;color:#353535}.text-content[_ngcontent-%COMP%]{font-size:13px;font-weight:400;color:#353535}.text-label[_ngcontent-%COMP%]{font-size:12px;font-weight:600;font-stretch:normal;font-style:normal;letter-spacing:normal;color:#353535}.text-price[_ngcontent-%COMP%]{font-size:18px;font-weight:700;color:#353535}.divider[_ngcontent-%COMP%]{height:8px;margin-top:0!important;margin-bottom:0!important;background-color:#f5f5f5}"]}),k),O=i("aPai");function _(t,e){if(1&t&&(h.Ub(0,"span"),h.Pb(1,"img",20),h.Tb()),2&t){var n=e.$implicit;h.Cb(1),h.mc("src",n,h.xc)}}function w(t,e){if(1&t&&(h.Ub(0,"ion-row",19),h.Ub(1,"ion-col"),h.Bc(2,_,2,1,"span",11),h.Tb(),h.Tb()),2&t){var n=h.ec().$implicit;h.Cb(2),h.mc("ngForOf",null==n?null:n.image)}}function P(t,e){if(1&t&&(h.Ub(0,"div"),h.Ub(1,"ion-item",15),h.Pb(2,"ion-radio",16),h.Ub(3,"ion-label",17),h.Dc(4),h.Tb(),h.Tb(),h.Bc(5,w,3,1,"ion-row",18),h.Tb()),2&t){var n=e.$implicit;h.Cb(2),h.mc("value",n.payment_method_id),h.Cb(2),h.Fc(" ",n.name," "),h.Cb(1),h.mc("ngIf",(null==n?null:n.image)&&(null==n||null==n.image?null:n.image.length))}}function x(t,e){1&t&&h.Pb(0,"ion-spinner",21)}var S,M,D=((S=function(){function e(n,o,i,r,c,a,s,b,u,l){var h=this;t(this,e),this.router=n,this.route=o,this.transactionSrv=i,this.checkoutSrv=r,this.browserSrv=c,this.toastSrv=a,this.cache=s,this.gs=b,this.platform=u,this.navCtrl=l,this.previousUrl="/checkout",this.isOnFetch=!1,this.route.queryParams.subscribe(function(t){h.isNow="true"===t.is_now,h.addressId=t.address_id,h.notes=t.notes,h.voucherCode=t.voucher_code,h.shippingDate=t.date,h.shippingTime=t.time;var e=new URLSearchParams;for(var n in t)t.hasOwnProperty(n)&&e.set(n,t[n]);h.previousUrl+="?".concat(e.toString())})}return n(e,[{key:"ngOnInit",value:function(){this.getPriceSummary(),this.getPaymentMethod()}},{key:"ionViewDidEnter",value:function(){var t=this;this.observeFetchState(),this.backButton=this.platform.backButton.subscribeWithPriority(20,function(){t.goBack()})}},{key:"ionViewDidLeave",value:function(){this.backButton.unsubscribe()}},{key:"goBack",value:function(){this.navCtrl.navigateBack(this.previousUrl)}},{key:"observeFetchState",value:function(){var t=this;this.gs.observeOnFetch().subscribe(function(e){t.isOnFetch=e})}},{key:"next",value:function(){var t={address_id:this.addressId,is_now:this.isNow,notes:this.notes,payment_id:this.paymentMethod,date:this.shippingDate,time:this.shippingTime};""!==this.voucherCode&&null!==this.voucherCode&&(t.voucher_code=this.voucherCode),1===this.paymentMethod?this.payOrder():2===this.paymentMethod?this.router.navigate(["/payment","instruction"],{queryParams:t}):3===this.paymentMethod&&this.router.navigate(["/payment","cod"],{queryParams:t})}},{key:"getPaymentMethod",value:function(){var t=this;this.transactionSrv.getPaymentMethod().then(function(e){t.paymentMethods=e.response}).catch(function(e){t.toastSrv.show(e.error.error.message)})}},{key:"getPriceSummary",value:function(){var t=this,e={is_now:this.isNow,address_id:this.addressId};""===this.voucherCode&&null===this.voucherCode||(e.voucher_code=this.voucherCode),this.isNow||(e.delivery_date=this.shippingDate),this.checkoutSrv.calculatePrice(e).then(function(e){t.paymentSummary=e.response})}},{key:"payOrder",value:function(){var t=this,e=this.prepareBodyTransaction();this.transactionSrv.add(e).then(function(e){t.removeVoucher(),t.browserSrv.openBrowser({url:e.response}),t.navCtrl.navigateBack("my-order")}).catch(function(e){t.toastSrv.show(e.error.error.message)})}},{key:"prepareBodyTransaction",value:function(){var t={is_now:this.isNow,address_id:this.addressId,shipping_id:1,payment_method_id:this.paymentMethod};return null!==this.notes&&""!==this.notes&&void 0!==this.notes&&(t.notes=this.notes),this.isNow||(t.shipping_date=this.shippingDate,t.shipping_time=this.shippingTime),null!==this.voucherCode&&""!==this.voucherCode&&void 0!==this.voucherCode&&(t.voucher_code=this.voucherCode),t}},{key:"removeVoucher",value:function(){this.cache.removeVoucher()}}]),e}()).\u0275fac=function(t){return new(t||S)(h.Ob(s.g),h.Ob(s.a),h.Ob(l.l),h.Ob(l.h),h.Ob(O.a),h.Ob(u.e),h.Ob(u.b),h.Ob(u.c),h.Ob(a.hb),h.Ob(a.fb))},S.\u0275cmp=h.Ib({type:S,selectors:[["app-payment-list"]],decls:32,vars:23,consts:[[1,"ion-no-border"],["mode","ios"],["mode","md",1,"ion-text-center"],["icon","chevron-back-outline",3,"defaultHref","click"],[3,"fullscreen"],[1,"ion-padding-horizontal"],["size","12"],[1,"text-label"],[1,"text-price"],[1,"divider"],[3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[1,"ion-padding"],["color","success","expand","block","shape","round",3,"disabled","click"],["name","dots","color","dark",4,"ngIf"],["lines","none"],["slot","start","color","success",3,"value"],[1,"text-label","ion-text-wrap"],["class","padding-payment-icon",4,"ngIf"],[1,"padding-payment-icon"],["onerror","this.onerror=null;this.src='assets/images/placeholder-product.svg'",1,"payment-icon",3,"src"],["name","dots","color","dark"]],template:function(t,e){1&t&&(h.Ub(0,"ion-header",0),h.Ub(1,"ion-toolbar",1),h.Ub(2,"ion-buttons",2),h.Ub(3,"ion-back-button",3),h.cc("click",function(){return e.goBack()}),h.Tb(),h.Tb(),h.Ub(4,"ion-title"),h.Dc(5),h.fc(6,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(7,"ion-content",4),h.Ub(8,"ion-row",5),h.Ub(9,"ion-col",6),h.Ub(10,"ion-text",7),h.Dc(11),h.fc(12,"translate"),h.Tb(),h.Tb(),h.Ub(13,"ion-col",6),h.Ub(14,"ion-text",8),h.Dc(15),h.fc(16,"number"),h.Tb(),h.Tb(),h.Tb(),h.Pb(17,"div",9),h.Ub(18,"ion-list"),h.Ub(19,"ion-radio-group",10),h.cc("ngModelChange",function(t){return e.paymentMethod=t}),h.Ub(20,"ion-list-header"),h.Ub(21,"ion-label",7),h.Dc(22),h.fc(23,"translate"),h.Tb(),h.Tb(),h.Bc(24,P,6,3,"div",11),h.Tb(),h.Tb(),h.Tb(),h.Ub(25,"ion-footer",0),h.Ub(26,"ion-row",12),h.Ub(27,"ion-col"),h.Ub(28,"ion-button",13),h.cc("click",function(){return e.next()}),h.Dc(29),h.fc(30,"translate"),h.Bc(31,x,1,0,"ion-spinner",14),h.Tb(),h.Tb(),h.Tb(),h.Tb()),2&t&&(h.Cb(3),h.mc("defaultHref",e.previousUrl),h.Cb(2),h.Ec(h.gc(6,11,"PAYMENT")),h.Cb(2),h.mc("fullscreen",!0),h.Cb(4),h.Fc(" ",h.gc(12,13,"TOTAL_PAYMENT")," "),h.Cb(4),h.Fc(" Rp. ",h.ic(16,15,null==e.paymentSummary?null:e.paymentSummary.final_price,"1.0-0","id")," "),h.Cb(4),h.mc("ngModel",e.paymentMethod),h.Cb(3),h.Fc(" ",h.gc(23,19,"PAY_METHOD")," "),h.Cb(2),h.mc("ngForOf",e.paymentMethods),h.Cb(4),h.mc("disabled",e.isOnFetch),h.Cb(1),h.Fc(" ",h.gc(30,21,"NEXT")," "),h.Cb(2),h.mc("ngIf",e.isOnFetch))},directives:[a.t,a.bb,a.i,a.e,a.f,a.ab,a.p,a.K,a.o,a.X,a.D,a.G,a.lb,c.p,c.s,a.E,a.C,r.m,a.r,a.h,r.n,a.y,a.F,a.jb,a.T],pipes:[d.a,r.f],styles:[".text-label[_ngcontent-%COMP%]{font-size:12px;font-weight:600;font-stretch:normal;font-style:normal;line-height:1.2;letter-spacing:normal;color:#353535}.text-price[_ngcontent-%COMP%]{font-size:18px;font-weight:700;line-height:1.22;color:#353535}.divider[_ngcontent-%COMP%]{height:8px;margin-top:0!important;margin-bottom:0!important;background-color:#f5f5f5}.padding-payment-icon[_ngcontent-%COMP%]{padding-left:4rem;padding-right:4rem}.payment-icon[_ngcontent-%COMP%]{height:15px;margin-right:5px}"]}),S),F=i("mrSG"),E=i("a/9d"),I=((M=function(){function e(n){t(this,e),this.modalCtrl=n}return n(e,[{key:"ngOnInit",value:function(){}},{key:"dismiss",value:function(){this.modalCtrl.dismiss()}}]),e}()).\u0275fac=function(t){return new(t||M)(h.Ob(a.eb))},M.\u0275cmp=h.Ib({type:M,selectors:[["app-payment-proof-success"]],decls:29,vars:12,consts:[[1,"ion-no-border"],["mode","ios"],["slot","end","mode","md"],[3,"click"],["name","close-outline","size","large"],[1,"ion-padding-top","ion-padding-horizontal","h-100"],[1,"ion-align-items-center","ion-justify-content-center","h-100"],["size","12",1,"ion-text-center"],["color","primary"],["color","medium"],[1,"ion-no-border","ion-padding-horizontal"],["expand","block","shape","round","color","success",3,"click"]],template:function(t,e){1&t&&(h.Ub(0,"ion-header",0),h.Ub(1,"ion-toolbar",1),h.Ub(2,"ion-buttons",2),h.Ub(3,"ion-button",3),h.cc("click",function(){return e.dismiss()}),h.Pb(4,"ion-icon",4),h.Tb(),h.Tb(),h.Ub(5,"ion-title"),h.Dc(6),h.fc(7,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(8,"ion-content"),h.Ub(9,"ion-grid",5),h.Ub(10,"ion-row",6),h.Ub(11,"ion-col",7),h.Ub(12,"ion-text",8),h.Ub(13,"span"),h.Ub(14,"b"),h.Dc(15),h.fc(16,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Pb(17,"br"),h.Ub(18,"ion-text",9),h.Ub(19,"small"),h.Dc(20),h.fc(21,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(22,"ion-footer",10),h.Ub(23,"ion-grid"),h.Ub(24,"ion-row"),h.Ub(25,"ion-col"),h.Ub(26,"ion-button",11),h.cc("click",function(){return e.dismiss()}),h.Dc(27),h.fc(28,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Tb()),2&t&&(h.Cb(6),h.Ec(h.gc(7,4,"PAYMENT_PROOF_SENT")),h.Cb(9),h.Ec(h.gc(16,6,"PAYMENT_PROOF_TITLE")),h.Cb(5),h.Ec(h.gc(21,8,"PAYMENT_PROOF_MESSAGE")),h.Cb(7),h.Fc(" ",h.gc(28,10,"BACK_HOME")," "))},directives:[a.t,a.bb,a.i,a.h,a.u,a.ab,a.p,a.s,a.K,a.o,a.X,a.r],pipes:[d.a],styles:[""]}),M);function B(t,e){if(1&t&&(h.Ub(0,"small"),h.Dc(1),h.Tb()),2&t){var n=h.ec();h.Cb(1),h.Ec(null==n.fg.controls.name.errors||null==n.fg.controls.name.errors.required?null:n.fg.controls.name.errors.required.message)}}function A(t,e){if(1&t&&(h.Ub(0,"small"),h.Dc(1),h.Tb()),2&t){var n=h.ec();h.Cb(1),h.Ec(null==n.fg.controls.bank_name.errors||null==n.fg.controls.bank_name.errors.required?null:n.fg.controls.bank_name.errors.required.message)}}function N(t,e){1&t&&(h.Ub(0,"div"),h.Pb(1,"ion-icon",19),h.Pb(2,"br"),h.Ub(3,"ion-text",20),h.Dc(4),h.fc(5,"translate"),h.Tb(),h.Tb()),2&t&&(h.Cb(4),h.Fc(" ",h.gc(5,1,"ADD_IMAGE")," "))}function L(t,e){if(1&t&&h.Pb(0,"img",21),2&t){var n=h.ec();h.mc("src",n.selectedImage,h.xc)}}function R(t,e){1&t&&h.Pb(0,"ion-spinner",22)}var z,H,V,Y,q=((z=function(){function e(n,o,i,r,c,a,s,b,u,l,h,d,m){var p=this;t(this,e),this.validatorSrv=n,this.fb=o,this.translate=i,this.actionSheetCtrl=r,this.camera=c,this.gs=a,this.router=s,this.modalCtrl=b,this.route=u,this.transactionSrv=l,this.toastSrv=h,this.navCtrl=d,this.platform=m,this.selectedImage=null,this.isOnFetch=!1,this.route.params.subscribe(function(t){t.id&&(p.orderId=t.id,p.previousUrl="/my-order/".concat(t.id,"/detail"))}),this.buildPaymentForm()}return n(e,[{key:"ngOnInit",value:function(){}},{key:"ionViewDidEnter",value:function(){var t=this;this.observeFetchState(),this.backButton=this.platform.backButton.subscribeWithPriority(20,function(){t.goBack()})}},{key:"ionViewDidLeave",value:function(){this.backButton.unsubscribe()}},{key:"goBack",value:function(){this.navCtrl.navigateBack(this.previousUrl)}},{key:"observeFetchState",value:function(){var t=this;this.gs.observeOnFetch().subscribe(function(e){t.isOnFetch=e})}},{key:"buildPaymentForm",value:function(){this.validatorSrv.validatorErrorMessage(),this.fg=this.fb.group({name:[null,[b.c.required()]],bank_name:[null,[b.c.required()]],payment_proof:[null,[b.c.required()]]})}},{key:"showActionSheet",value:function(){return Object(F.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var e,n=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.actionSheetCtrl.create({header:"".concat(this.translate.get("SELECT_IMAGE_SOURCE")),buttons:[{text:"".concat(this.translate.get("CHOOSE_FROM_GALLERY")),handler:function(){n.pickImage(n.camera.PictureSourceType.PHOTOLIBRARY)}},{text:"".concat(this.translate.get("TAKE_A_PHOTO")),handler:function(){n.pickImage(n.camera.PictureSourceType.CAMERA)}}]});case 2:return e=t.sent,t.next=5,e.present();case 5:case"end":return t.stop()}},t,this)}))}},{key:"pickImage",value:function(t){var e=this;this.camera.getPicture({quality:100,sourceType:t,destinationType:this.camera.DestinationType.DATA_URL,encodingType:this.camera.EncodingType.JPEG,mediaType:this.camera.MediaType.PICTURE}).then(function(t){e.setImageToForm("data:image/jpeg;base64,".concat(t))})}},{key:"getBlobFile",value:function(t){return new Promise(function(e,n){fetch(t).then(function(t){return t.blob()}).then(function(t){var n=new Blob([t],{type:"image/jpeg"});e(n)},function(t){n(t)})})}},{key:"setImageToForm",value:function(t){this.selectedImage=t,this.fg.controls.payment_proof.patchValue(t),this.fg.controls.payment_proof.markAsDirty()}},{key:"submit",value:function(){var t=this;this.fg.valid?this.getBlobFile(this.selectedImage).then(function(e){t.transactionSrv.uploadPaymentProof(t.orderId,{image:e,payment_name:t.fg.value.name,payment_bank:t.fg.value.bank_name}).then(function(e){t.paymentSentModal()}).catch(function(e){t.toastSrv.show(e.error.error.message)})}):this.gs.markDirtyForm(this.fg)}},{key:"paymentSentModal",value:function(){return Object(F.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var e,n=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.modalCtrl.create({component:I});case 2:return(e=t.sent).onDidDismiss().then(function(t){n.router.navigate(["/tabs","home"])}),t.next=6,e.present();case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}},t,this)}))}}]),e}()).\u0275fac=function(t){return new(t||z)(h.Ob(u.d),h.Ob(c.d),h.Ob(T.a),h.Ob(a.a),h.Ob(E.a),h.Ob(u.c),h.Ob(s.g),h.Ob(a.eb),h.Ob(s.a),h.Ob(l.l),h.Ob(u.e),h.Ob(a.fb),h.Ob(a.hb))},z.\u0275cmp=h.Ib({type:z,selectors:[["app-payment-proof"]],decls:34,vars:15,consts:[[1,"ion-no-border"],["mode","ios"],["mode","md",1,"ion-text-center"],["icon","chevron-back-outline",3,"defaultHref","click"],[3,"fullscreen"],[3,"formGroup","ngSubmit"],["paymentForm","ngForm"],["lines","none",1,"form-group"],["position","stacked"],["formControlName","name","placeholder","Full Name",1,"default-theme"],[4,"ngIf"],["formControlName","bank_name","placeholder","Bank Name",1,"default-theme"],[1,"padding-form","ion-padding"],["size","12",1,"form-group","ion-padding-bottom"],["size","12",1,"ion-text-center","upload-field",3,"click"],["width","80%","class","img-proof",3,"src",4,"ngIf"],[1,"ion-padding"],["color","success","expand","block","shape","round",3,"disabled","click"],["name","dots","color","dark",4,"ngIf"],["name","image-outline",1,"img-upload"],[1,"text-upload"],["width","80%",1,"img-proof",3,"src"],["name","dots","color","dark"]],template:function(t,e){if(1&t){var n=h.Vb();h.Ub(0,"ion-header",0),h.Ub(1,"ion-toolbar",1),h.Ub(2,"ion-buttons",2),h.Ub(3,"ion-back-button",3),h.cc("click",function(){return e.goBack()}),h.Tb(),h.Tb(),h.Ub(4,"ion-title"),h.Dc(5),h.fc(6,"translate"),h.Tb(),h.Tb(),h.Tb(),h.Ub(7,"ion-content",4),h.Ub(8,"form",5,6),h.cc("ngSubmit",function(){return e.submit()}),h.Ub(10,"ion-item",7),h.Ub(11,"ion-label",8),h.Dc(12,"Full Name"),h.Tb(),h.Pb(13,"ion-input",9),h.Bc(14,B,2,1,"small",10),h.Tb(),h.Ub(15,"ion-item",7),h.Ub(16,"ion-label",8),h.Dc(17,"Bank Name"),h.Tb(),h.Pb(18,"ion-input",11),h.Bc(19,A,2,1,"small",10),h.Tb(),h.Ub(20,"ion-row",12),h.Ub(21,"ion-col",13),h.Ub(22,"ion-label",8),h.Dc(23,"Payment Proof"),h.Tb(),h.Tb(),h.Ub(24,"ion-col",14),h.cc("click",function(){return e.showActionSheet()}),h.Bc(25,N,6,3,"div",10),h.Bc(26,L,1,1,"img",15),h.Tb(),h.Tb(),h.Tb(),h.Tb(),h.Ub(27,"ion-footer",0),h.Ub(28,"ion-row",16),h.Ub(29,"ion-col"),h.Ub(30,"ion-button",17),h.cc("click",function(){return h.vc(n),h.uc(9).ngSubmit.emit()}),h.Dc(31),h.fc(32,"translate"),h.Bc(33,R,1,0,"ion-spinner",18),h.Tb(),h.Tb(),h.Tb(),h.Tb()}2&t&&(h.Cb(3),h.mc("defaultHref",e.previousUrl),h.Cb(2),h.Ec(h.gc(6,11,"PAYMENT")),h.Cb(2),h.mc("fullscreen",!0),h.Cb(1),h.mc("formGroup",e.fg),h.Cb(6),h.mc("ngIf",e.fg.controls.name.dirty),h.Cb(5),h.mc("ngIf",e.fg.controls.bank_name.dirty),h.Cb(6),h.mc("ngIf",!e.selectedImage),h.Cb(1),h.mc("ngIf",e.selectedImage),h.Cb(4),h.mc("disabled",e.isOnFetch),h.Cb(1),h.Fc(" ",h.gc(32,13,"NEXT")," "),h.Cb(2),h.mc("ngIf",e.isOnFetch))},directives:[a.t,a.bb,a.i,a.e,a.f,a.ab,a.p,c.y,c.q,c.i,a.y,a.C,a.x,a.mb,c.p,c.g,r.n,a.K,a.o,a.r,a.h,a.u,a.X,a.T],pipes:[d.a],styles:[".upload-field[_ngcontent-%COMP%]{color:#e2e2e2;padding:18.5px 16px 17px;border-radius:4px;border:1px solid #e7e7e7}.img-upload[_ngcontent-%COMP%]{font-size:30px}.text-upload[_ngcontent-%COMP%]{font-size:12px}"]}),z),j=[{path:"",component:(H=function(){function e(){t(this,e)}return n(e,[{key:"ngOnInit",value:function(){}}]),e}(),H.\u0275fac=function(t){return new(t||H)},H.\u0275cmp=h.Ib({type:H,selectors:[["app-payment"]],decls:1,vars:0,template:function(t,e){1&t&&h.Pb(0,"ion-router-outlet")},directives:[a.J],styles:[""]}),H),children:[{path:"list",component:D},{path:"cod",component:v},{path:"instruction",component:C},{path:":id/proof",component:q},{path:"",redirectTo:"list",pathMatch:"full"}]}],K=((V=function e(){t(this,e)}).\u0275mod=h.Mb({type:V}),V.\u0275inj=h.Lb({factory:function(t){return new(t||V)},imports:[[s.j.forChild(j)],s.j]}),V),G=i("PCNd"),X=((Y=function e(){t(this,e)}).\u0275mod=h.Mb({type:Y}),Y.\u0275inj=h.Lb({factory:function(t){return new(t||Y)},imports:[[r.b,c.j,a.cb,K,G.a,c.v]]}),Y)}}])}();