(function(e){function t(t){for(var s,c,i=t[0],l=t[1],o=t[2],f=0,d=[];f<i.length;f++)c=i[f],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&d.push(n[c][0]),n[c]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);u&&u(t);while(d.length)d.shift()();return r.push.apply(r,o||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],s=!0,i=1;i<a.length;i++){var l=a[i];0!==n[l]&&(s=!1)}s&&(r.splice(t--,1),e=c(c.s=a[0]))}return e}var s={},n={index:0},r=[];function c(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=e,c.c=s,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)c.d(a,s,function(t){return e[t]}.bind(null,s));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/compass-ui/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var o=0;o<i.length;o++)t(i[o]);var u=l;r.push([17,"chunk-vendors"]),a()})({0:function(e,t){},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},15:function(e,t){},16:function(e,t){},17:function(e,t,a){e.exports=a("df31")},2:function(e,t){},"2ce4":function(e,t,a){},3:function(e,t){},4:function(e,t){},"45f5":function(e,t,a){},4678:function(e,t,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var t=r(e);return a(t)}function r(e){if(!a.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}n.keys=function(){return Object.keys(s)},n.resolve=r,e.exports=n,n.id="4678"},5:function(e,t){},6:function(e,t){},7:function(e,t){},8:function(e,t){},"8d11":function(e,t,a){"use strict";a("2ce4")},9:function(e,t){},"97dc":function(e,t,a){},b786:function(e,t,a){"use strict";a("45f5")},df31:function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("el-container",{staticStyle:{height:"100%"}},[a("el-main",[a("Table",{staticStyle:{height:"100%"}})],1)],1)],1)},r=[],c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{height:"2rem","white-space":"nowrap"},attrs:{id:"RankGroup"}},[a("el-checkbox",{attrs:{label:"Ava Margin Balance",size:"mini"},model:{value:e.PTAMBVisible,callback:function(t){e.PTAMBVisible=t},expression:"PTAMBVisible"}}),a("el-checkbox",{attrs:{label:"Margin Loan Balance",size:"mini"},model:{value:e.PTMLBVisible,callback:function(t){e.PTMLBVisible=t},expression:"PTMLBVisible"}}),a("el-checkbox",{attrs:{size:"mini",value:!0}},[e._v(" Show # "),a("el-select",{staticStyle:{width:"80px"},attrs:{"allow-create":"",filterable:"","default-first-option":"",size:"mini"},model:{value:e.showNum,callback:function(t){e.showNum=t},expression:"showNum"}},e._l(e.showOptions,(function(e){return a("el-option",{key:e,attrs:{value:e}})})),1),e._v(" in Charts ")],1),a("el-button",{attrs:{size:"mini",type:"success",plain:""},on:{click:function(t){return e.chart("TraderX")}}},[e._v("Load Charts Data")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{id:"RankTable",data:e.studentData,"row-style":{height:"30px"},"cell-style":{padding:"0"},"header-row-style":{height:"40px"},"header-cell-style":{padding:"10px"},stripe:"",height:"calc(100% - 1.8rem)","default-sort":{prop:"AUM",order:"descending"}}},[a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{align:"center",prop:"Acct",label:"Account#",width:"200"}},[a("template",{slot:"header"},[a("div",{staticStyle:{"font-size":"13px","line-height":"1.3"}},[e._v("Account#")])])],2),a("el-table-column",{attrs:{align:"center",prop:"AUM",label:"AuM",width:"150",sortable:""}}),e.PTAMBVisible?a("el-table-column",{attrs:{align:"center",prop:"PTAMB",label:"PTAMB",width:"150",sortable:""}}):e._e(),e.PTMLBVisible?a("el-table-column",{attrs:{align:"center",prop:"PTMLB",label:"PTMLB",width:"150",sortable:""}}):e._e(),a("el-table-column",{attrs:{align:"center",prop:"RET",label:"YTD Return",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{style:"color: #"+(t.row.RETNUM>=0?"00FF00":"FF0000")},[e._v(" "+e._s(t.row.RET)+" ")])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"Show Chart",label:"Chart",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){return e.chart(t.row.Acct)}}},[e._v("AuM")])]}}])})],1),a("div",[a("el-dialog",{attrs:{title:"Your Hist Performance",width:"95%",visible:e.ChartInfoVisible,center:""},on:{"update:visible":function(t){e.ChartInfoVisible=t}}},[a("div",[a("canvas",{attrs:{id:"info-chart"}})])])],1)],1)},i=[],l=(a("d3b7"),a("25f0"),a("a15b"),a("ac1f"),a("1276"),a("5cc6"),a("907a"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("1088")),o=a.n(l),u=a("30ef"),f=a.n(u),d={methods:{chart:function(e){this.chartlabels=[],this.chartdata=[];for(var t=!0,a=0;a<this.histperformance.length;++a)if(this.histperformance[a].id==e){if(t){t=!1;continue}this.chartlabels.push(this.histperformance[a].datetime),this.chartdata.push(this.histperformance[a].ret)}var s=[],n=[],r=this.showNum;if("MAX"==this.showNum);else if(this.chartlabels.length>this.showNum){for(var c=this.chartlabels.length-1;c>=0;c--){if(0==r)break;r--,s.unshift(this.chartlabels[c]),n.unshift(this.chartdata[c])}this.chartdata=n,this.chartlabels=s}this.infochartdata=[],this.infochartdata={type:"line",data:{labels:this.chartlabels,datasets:[{label:"AuM per value day",data:this.chartdata,backgroundColor:"rgba(54,73,93,.5)",borderColor:"#36495d",borderWidth:3}]},options:{responsive:!0,lineTension:1,scales:{y:{max:150,min:50,ticks:{stepSize:1}}}}};var i=document.getElementById("info-chart");null!=i&&new f.a(i,this.infochartdata),this.ChartInfoVisible=!0},ExcelDateToJSDate:function(e){e=new Date(Math.round(86400*(e-25569)*1e3));var t=e.getMonth()+1,a=e.getDate(),s="";return s+=t.toString()+"-"+a.toString(),s},FormatNum:function(e){var t="",a="";e=e.toString();for(var s=0;s<e.length;s++){if("."==e[s])break;a+=e[s]}for(var n=0,r=a.length-1;r>=0;r--)if(t+=a[r],n++,3==n){if(0==r)break;t+=","}return t=this.reverse(t),t},reverse:function(e){return e.split("").reverse().join("")}},name:"RankTable",data:function(){return{infochartdata:null,chartdata:null,chartdatasets:[],RETVisible:!1,chartlabels:[],datacollection:null,histperformance:[],NEColVisible:!1,ChartInfoVisible:!1,PTMLBVisible:!1,PTAMBVisible:!1,studentData:[],chartOptions:{responsive:!0,maintainAspectRatio:!1},showNum:7,showOptions:[3,7,14,20,30,"Max"]}},mounted:function(){var e=this;this.axios.get("./sheets/PnlDB.xlsx",{responseType:"arraybuffer",headers:{"Cache-control":"no-cache",Pragma:"no-cache",Expires:"0"}}).then((function(t){for(var a=new Uint8Array(t.data),s=o.a.read(a,{type:"array",cellStyles:!0}),n=s.Sheets[s.SheetNames[0]],r=s.Sheets[s.SheetNames[1]],c=6,i=c;void 0!==n["A".concat(i)];++i){var l=4,u=n["E".concat(i)].v;u*=100,u=u.toString();for(var f="",d=!1,b=0,h=0;h<u.length;h++)if(d&&(b+=1),"."==u[h]&&(d=!0),f+=u[h],b==l)break;f+="%";var j="$";j+=e.FormatNum(n["B".concat(i)].v);var p={Acct:n["A".concat(i)].v,PTAMB:e.FormatNum(n["C".concat(i)].v),PTMLB:e.FormatNum(n["D".concat(i)].v),AUM:j,RET:f,RETNUM:n["E".concat(i)].v};e.studentData.push(p)}for(var m=4,v=m;void 0!==r["A".concat(v)];++v){var g={id:r["A".concat(v)].v,datetime:e.ExcelDateToJSDate(r["B".concat(v)].v),ret:r["H".concat(v)].v};e.histperformance.push(g)}}))}},b=d,h=(a("8d11"),a("f3a0"),a("2877")),j=Object(h["a"])(b,c,i,!1,null,"bb724104",null),p=j.exports,m={name:"App",components:{Table:p}},v=m,g=(a("b786"),Object(h["a"])(v,n,r,!1,null,null,null)),y=g.exports,k=a("b2d6"),w=a.n(k),T=a("4897"),x=a.n(T),M=a("5c96"),z=(a("0fae"),a("e05f"),a("bc3a")),A=a.n(z),S=a("130e"),B=a("a584");s["default"].use(M["Dialog"]),s["default"].use(M["Checkbox"]),s["default"].use(M["CheckboxButton"]),s["default"].use(M["CheckboxGroup"]),s["default"].use(M["Select"]),s["default"].use(M["Option"]),s["default"].use(M["Button"]),s["default"].use(M["ButtonGroup"]),s["default"].use(M["Table"]),s["default"].use(M["TableColumn"]),s["default"].use(M["Tooltip"]),s["default"].use(M["Breadcrumb"]),s["default"].use(M["BreadcrumbItem"]),s["default"].use(M["Slider"]),s["default"].use(M["Row"]),s["default"].use(M["Col"]),s["default"].use(M["Container"]),s["default"].use(M["Header"]),s["default"].use(M["Aside"]),s["default"].use(M["Main"]),s["default"].use(M["Footer"]),s["default"].use(M["Link"]),s["default"].use(M["Divider"]),s["default"].use(M["Image"]),x.a.use(w.a),s["default"].use(S["a"],A.a),s["default"].use(B["a"],{config:{id:"G-E2QRC2LZ7M"}}),s["default"].config.productionTip=!1,new s["default"]({render:function(e){return e(y)}}).$mount("#app")},f3a0:function(e,t,a){"use strict";a("97dc")}});
//# sourceMappingURL=index.f6d81f52.js.map