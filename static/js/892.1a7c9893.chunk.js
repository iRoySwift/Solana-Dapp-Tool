"use strict";(self.webpackChunksolana_tools_client=self.webpackChunksolana_tools_client||[]).push([[892],{3541:function(e,n,t){var r=t(9506),a=t(5281),c=(t(7313),t(6417));n.Z=function(){return(0,c.jsx)(r.Z,{sx:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:2e3,display:"flex",justifyContent:"center",alignItems:"center"},children:(0,c.jsx)(a.Z,{sx:{background:"transparent"}})})}},5236:function(e,n,t){t.d(n,{a:function(){return A}});var r=t(4942),a=t(1413),c=t(4165),s=t(5861),o=t(9439),i=t(3541),u=t(3098),l=t(9506),h=t(1113),p=t(6429),d=t(3929),f=t(4758),x=t(9099),m=t(1629),g=t(501),k=t(6835),Z=t(3477),v=t(4076),y=t(7478),b=t(3467),w=t(605),j=t(4631),T=t(6436),C=t(477),B=t(2525),S=t(7429),M=t(7655),V=t(7313),H=t(6417);var A=function(){(0,M.sy)(),(0,M.yv)("Please connect to your wallet",{variant:"warning"})};n.Z=function(e){var n=e.connection,t=e.pubkey,K=e.sendTransaction,P=e.setDestinations,G=e.setSelectToken,L=(0,V.useState)(!1),R=(0,o.Z)(L,2),W=R[0],E=R[1],I=(0,V.useState)({"6w9P6s2HFHRXRfCSxkatUznwq2cnHxvi52pxZJAJb1Wx":!1,Gir7LUMrsXHv5gGctKNp6th2Pj7j9qmYR1LSrsHS6Yaj:!1,HQ9Jn1KNwKyPkDyBmQtXtMWn1DXP52jRGzahx3U2Wfky:!1,"8jSP1ELAoTw9g4kWXWEuqStFeR5qQW2j67UfVfe23gFX":!1}),N=(0,o.Z)(I,2),_=N[0],q=N[1],z=(0,V.useState)([]),D=(0,o.Z)(z,2),F=D[0],O=D[1],X=function(){var e=(0,s.Z)((0,c.Z)().mark((function e(){var r,a;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=3;break}return A(),e.abrupt("return");case 3:return E(!0),O([]),e.next=7,n.getTokenAccountsByOwner(t,{programId:T.H_});case 7:return r=e.sent,e.next=10,r.value.map(function(){var e=(0,s.Z)((0,c.Z)().mark((function e(r){var a,s,o,i;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.account.data,o=C.p0.decode(s),e.next=4,(0,B.ih)(n,o.mint);case 4:return i=e.sent,e.abrupt("return",(c=!1,u=o.mint,l=r.pubkey,h=Number(o.amount/BigInt(S.j5)),p=(null===(a=i.mintAuthority)||void 0===a?void 0:a.toBase58())===t.toBase58(),{isChecked:c,mint:u,ata:l,balance:h,authority:p,amount:1}));case 6:case"end":return e.stop()}var c,u,l,h,p}),e)})));return function(n){return e.apply(this,arguments)}}());case 10:a=e.sent,Promise.all(a).then((function(e){O(e),E(!1)}));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Q=function(e){q((0,a.Z)((0,a.Z)({},_),{},(0,r.Z)({},e.target.name,e.target.checked)))},U=function(){var e=(0,s.Z)((0,c.Z)().mark((function e(){var r;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=3;break}return A(),e.abrupt("return");case 3:return E(!0),e.next=6,(0,u.V)(n,t,K);case 6:r=e.sent,console.log("   \u2705 - Token mint address: ".concat(r.toBase58())),E(!1),(0,M.yv)("\ud83c\udf89 Mint Token succesfully!",{variant:"success"});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=function(){var e=(0,s.Z)((0,c.Z)().mark((function e(r,a,s){var o;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=3;break}return A(),e.abrupt("return");case 3:return E(!0),e.next=6,(0,u.t)(n,t,r,a,s*S.j5,K);case 6:o=e.sent,E(!1),console.log("   \u2705 - Mint ".concat(s," Token To ").concat(a.toBase58()," transaction:").concat(o)),(0,M.yv)("\ud83c\udf89 Mint ".concat(s," Token succesfully!"),{variant:"success"});case 10:case"end":return e.stop()}}),e)})));return function(n,t,r){return e.apply(this,arguments)}}();return(0,V.useEffect)((function(){P(Object.keys(_).filter((function(e){return _[e]})).map((function(e){return new S.nh(e)})))}),[_,P]),(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(l.Z,{sx:{flex:1,pr:3,overflowY:"auto"},children:[(0,H.jsxs)(l.Z,{children:[(0,H.jsx)(h.Z,{variant:"h5",children:"\u8bf7\u9009\u62e9\u9700\u8981\u88ab\u7a7a\u6295\u7684\u94b1\u5305\u5730\u5740:"}),(0,H.jsx)(p.Z,{children:Object.keys(_).map((function(e){return(0,H.jsx)(d.Z,{control:(0,H.jsx)(f.Z,{checked:_[e],name:e,onChange:Q}),label:e},e)}))})]}),(0,H.jsxs)(l.Z,{sx:{marginTop:10},children:[(0,H.jsx)(h.Z,{variant:"h5",children:"\u4f60\u62e5\u6709\u7684Token\u5217\u8868:"}),(0,H.jsx)(x.Z,{variant:"outlined",size:"small",onClick:U,children:"Create Token"}),(0,H.jsx)(x.Z,{variant:"outlined",size:"small",onClick:X,children:"Query"}),(0,H.jsxs)(m.Z,{sx:{maxWidth:"100%",overflow:"auto"},component:g.Z,children:[(0,H.jsxs)(k.Z,{stickyHeader:!0,"aria-label":"simple table",children:[(0,H.jsx)(Z.Z,{children:(0,H.jsxs)(v.Z,{children:[(0,H.jsx)(y.Z,{padding:"checkbox"}),(0,H.jsx)(y.Z,{children:"Mint"}),(0,H.jsx)(y.Z,{children:"ATA"}),(0,H.jsx)(y.Z,{align:"right",children:"Balance(Number)"}),(0,H.jsx)(y.Z,{align:"right",children:"Mint Authority"}),(0,H.jsx)(y.Z,{align:"right",children:"Mint Number(Number)"}),(0,H.jsx)(y.Z,{align:"right",children:"Action"})]})}),(0,H.jsx)(b.Z,{children:F.map((function(e){return(0,H.jsxs)(v.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,H.jsx)(y.Z,{padding:"checkbox",children:(0,H.jsx)(w.Z,{checked:e.isChecked,color:"primary",inputProps:{"aria-labelledby":"labelId"},onChange:function(){return function(e){O(F.map((function(n){return n.isChecked=!1,n.ata===e.ata&&(n.isChecked=!0),n}))),G(e)}(e)}})}),(0,H.jsx)(y.Z,{component:"th",scope:"row",children:"".concat(e.mint)}),(0,H.jsx)(y.Z,{align:"right",children:"".concat(e.ata)}),(0,H.jsx)(y.Z,{align:"right",children:"".concat(e.balance)}),(0,H.jsx)(y.Z,{align:"right",children:"".concat(e.authority)}),(0,H.jsx)(y.Z,{align:"right",children:e.authority&&(0,H.jsx)(j.Z,{hiddenLabel:!0,id:"filled-hidden-label-small",defaultValue:e.amount,variant:"outlined",size:"small",type:"number",onChange:function(n){return function(e,n){F.map((function(t){return t.ata===e&&(t.amount=Number(n.target.value)),t}))}(e.ata,n)}})}),(0,H.jsx)(y.Z,{align:"right",children:e.authority&&(0,H.jsx)(x.Z,{onClick:function(){return $(e.mint,e.ata,e.amount)},children:"Mint"})})]},"".concat(e.mint))}))})]}),!F.length&&(0,H.jsx)(l.Z,{sx:{width:"100%",padding:2,display:"flex",alignItems:"center",justifyContent:"center"},children:"\u6682\u65e0\u6570\u636e"})]})]})]}),W&&(0,H.jsx)(i.Z,{})]})}},151:function(e,n,t){t.d(n,{V3:function(){return p.V},_Z:function(){return l},tM:function(){return p.t}});var r=t(4165),a=t(5861),c=t(2525),s=t(477),o=t(7698),i=t(7496),u=t(3076);function l(e,n,t,r,a){return h.apply(this,arguments)}function h(){return(h=(0,a.Z)((0,r.Z)().mark((function e(n,t,a,l,h){var p,d,f;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,c.MO)(a,l);case 2:return p=e.sent,e.prev=3,e.next=6,(0,s.D0)(n,p);case 6:case 24:d=e.sent,e.next=28;break;case 9:if(e.prev=9,e.t0=e.catch(3),!(e.t0 instanceof o.We||e.t0 instanceof o.Or)){e.next=27;break}return e.prev=12,(f=[]).push((0,i.E)(t,p,l,a)),e.next=17,(0,u.S)(t,n,h,f);case 17:e.next=22;break;case 19:throw e.prev=19,e.t1=e.catch(12),e.t1;case 22:return e.next=24,(0,s.D0)(n,p);case 27:throw e.t0;case 28:if(d.mint.equals(a)){e.next=30;break}throw new o.iT;case 30:if(d.owner.equals(l)){e.next=32;break}throw new o.bQ;case 32:return e.abrupt("return",d);case 33:case"end":return e.stop()}}),e,null,[[3,9],[12,19]])})))).apply(this,arguments)}var p=t(3098)},3098:function(e,n,t){t.d(n,{V:function(){return f},t:function(){return x}});var r=t(4165),a=t(5861),c=t(2525),s=t(6436),o=t(4595),i=t(477),u=t(7496),l=t(5008),h=t(7429),p=t(7655),d=t(3076),f=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n,t,a){var i,u,l,f;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=h.RG.generate(),e.next=3,(0,c.Mg)(n);case 3:return u=e.sent,l=[h.yc.createAccount({fromPubkey:t,newAccountPubkey:i.publicKey,space:c.Bl,lamports:u,programId:s.H_}),(0,o.wu)(i.publicKey,9,t,t)],console.log("   \u2705 - Step 1 - create an array with your desires `instructions`"),e.next=8,(0,d.S)(t,n,a,l,[i]);case 8:return f=e.sent,console.log("   \u2705 - Step 2 - Generate a transaction and send it to the network"),(0,p.yv)("\ud83c\udf89 Transaction succesfully confirmed!"),(0,p.yv)("https://explorer.solana.com/tx/".concat(f,"?cluster=devnet")),e.abrupt("return",i.publicKey);case 13:case"end":return e.stop()}}),e)})));return function(n,t,r){return e.apply(this,arguments)}}(),x=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n,t,a,s,o,h){var f,x,m;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f=(0,c.MO)(a,s),console.log("\ud83d\ude80 ~ file: mintToken.ts:94 ~ toPubkey:",s.toBase58(),f.toBase58()),x=[],e.prev=3,e.next=6,(0,i.D0)(n,f);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(3),x.push((0,u.E)(t,f,s,a));case 11:return x.push((0,l.G7)(a,f,t,o)),e.next=14,(0,d.S)(t,n,h,x);case 14:return m=e.sent,console.log("   \u2705 - Step 2 - Generate a transaction and send it to the network"),(0,p.yv)("\ud83c\udf89 Transaction succesfully confirmed!"),(0,p.yv)("https://explorer.solana.com/tx/".concat(m,"?cluster=devnet")),e.abrupt("return",f);case 19:case"end":return e.stop()}}),e,null,[[3,8]])})));return function(n,t,r,a,c,s){return e.apply(this,arguments)}}()},3076:function(e,n,t){t.d(n,{S:function(){return i},n:function(){return s}});var r=t(4165),a=t(5861),c=t(7429);function s(e,n,t,r){return o.apply(this,arguments)}function o(){return(o=(0,a.Z)((0,r.Z)().mark((function e(n,t,a,s){var o,i,u,l,h,p,d,f;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getLatestBlockhashAndContext();case 2:return o=e.sent,i=o.context.slot,u=o.value,l=u.blockhash,h=u.lastValidBlockHeight,console.log("   \u2705 - 1. Fetched latest blockhash. Last valid height:",h),p=s?new c.$Z({payerKey:n.publicKey,recentBlockhash:l,instructions:a}).compileToV0Message([s]):new c.$Z({payerKey:n.publicKey,recentBlockhash:l,instructions:a}).compileToV0Message(),console.log("   \u2705 - 2. Compiled transaction message"),(d=new c.GS(p)).sign([n]),console.log("   \u2705 - 3. Transaction Signed"),e.next=15,t.sendTransaction(d,{maxRetries:5,minContextSlot:i});case 15:return f=e.sent,console.log("   \u2705 - 4. Transaction sent to network"),e.next=19,t.confirmTransaction({signature:f,blockhash:l,lastValidBlockHeight:h});case 19:if(!e.sent.value.err){e.next=22;break}throw new Error("   \u274c - 5. Transaction not confirmed.");case 22:return console.log("   \ud83c\udf89 - 5. Transaction succesfully confirmed!","https://explorer.solana.com/tx/".concat(f,"?cluster=devnet")),e.abrupt("return",f);case 24:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function i(e,n,t,r,a,c){return u.apply(this,arguments)}function u(){return(u=(0,a.Z)((0,r.Z)().mark((function e(n,t,a,s,o,i){var u,l,h,p,d,f,x,m;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getLatestBlockhashAndContext();case 2:return u=e.sent,l=u.context.slot,h=u.value,p=h.blockhash,d=h.lastValidBlockHeight,console.log("   \u2705 - 1. Fetched latest blockhash. Last valid height:",d),f=i?new c.$Z({payerKey:n,recentBlockhash:p,instructions:s}).compileToV0Message([i]):new c.$Z({payerKey:n,recentBlockhash:p,instructions:s}).compileToV0Message(),console.log("   \u2705 - 2. Compiled transaction message"),x=new c.GS(f),e.next=13,a(x,t,{maxRetries:5,minContextSlot:l,signers:o});case 13:return m=e.sent,console.log("   \u2705 - 3. Transaction sent to network"),e.next=17,t.confirmTransaction({signature:m,blockhash:p,lastValidBlockHeight:d});case 17:if(!e.sent.value.err){e.next=20;break}throw new Error("   \u274c - 4. Transaction not confirmed.");case 20:return console.log("   \ud83c\udf89 - 5. Transaction succesfully confirmed!","https://explorer.solana.com/tx/".concat(m,"?cluster=devnet")),e.abrupt("return",m);case 22:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);