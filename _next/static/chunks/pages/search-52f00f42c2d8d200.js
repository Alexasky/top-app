(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[603],{8266:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/search",function(){return n(6127)}])},6127:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var r=n(5893),s=n(7294),c=n(924),i=n(1163),a=n(196),l=n(2446),o=n(1664),u=n.n(o),h=n(6539),f=n(4059),d=n.n(f);let _=e=>{let{searchResults:t,loading:n,q:s}=e;return(0,r.jsxs)("div",{children:[(0,r.jsxs)("h1",{children:["Результат поиска по ",s]}),n?(0,r.jsx)("p",{children:"Поиск..."}):t.length>0?(0,r.jsx)("ul",{children:t.map(e=>(0,r.jsxs)("li",{children:[(0,r.jsx)("h2",{className:d().title,children:h.c_[e.firstCategory]?(0,r.jsx)(u(),{href:"/".concat(h.c_[e.firstCategory].route,"/").concat(e.alias),children:e.title}):(0,r.jsx)("span",{children:e.title})}),(0,r.jsx)("p",{children:e.metaDescription})]},e._id))}):(0,r.jsxs)("p",{children:["Нет найденных результатов для ",s,"."]})]})};var p=(0,c.X)(function(){let e=(0,i.useRouter)(),{q:t}=e.query,[n,c]=(0,s.useState)([]),[o,u]=(0,s.useState)(!0);return(0,s.useEffect)(()=>{if(t){let e=async()=>{if(!t||"string"!=typeof t){u(!1);return}u(!0);try{let{data:e}=await a.ZP.get("".concat(l.b.search.textSearch).concat(encodeURIComponent(t)));e.map(e=>{let{_id:t,firstCategory:n,alias:r,title:s,metaDescription:c}=e;return{_id:t,firstCategory:n,alias:r,title:s,metaDescription:c}}),c(e||[])}catch(n){console.error("Error fetching search results:",n.message),c([])}finally{u(!1)}};e()}},[t]),(0,r.jsx)(_,{searchResults:n,loading:o,q:t})})},4059:function(e){e.exports={title:"SearchPageComponent_title__doTqI"}}},function(e){e.O(0,[254,924,774,888,179],function(){return e(e.s=8266)}),_N_E=e.O()}]);