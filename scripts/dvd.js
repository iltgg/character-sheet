var a=document.getElementById("dvd"),j=["#ff0000","#ff4000","#ff8000","#ffbf00","#ffff00","#bfff00","#80ff00","#40ff00","#00ff00","#00ff40","#00ff80","#00ffbf","#00ffff","#00bfff","#0080ff","#0040ff","#0000ff","#4000ff","#8000ff","#bf00ff","#ff00ff","#ff00bf","#ff0080","#ff0040","#282c34","#ffffff",],k=Math.floor(25*Math.random()+1),b=window,e=b.innerWidth,f=b.innerHeight,l=Math.floor(Math.random()*e+1),m=Math.floor(Math.random()*f+1),g=a.offsetWidth,h=a.offsetHeight,c=a.offsetTop,d=a.offsetLeft,n=-d,o=-c,p=b.innerWidth-d-g,q=b.innerHeight-c-h,r=null,s="se",t=1,u=null;let v=["ne","nw","se","sw"];function i(){r=requestAnimationFrame(i),x()}function w(){n=-d,o=-c,p=b.innerWidth-d-g,q=b.innerHeight-c-h}function x(){y(),C(a,{transform:"translate3d("+l+"px, "+m+"px, 0)"})}function y(){switch(s){case"ne":l+=t,m-=t;break;case"nw":l-=t,m-=t;break;case"se":l+=t,m+=t;break;case"sw":l-=t,m+=t}z()}function z(){m<=o&&("nw"==s?s="sw":"ne"==s&&(s="se"),A()),m>=q&&("se"==s?s="ne":"sw"==s&&(s="nw"),A()),l<=n&&("nw"==s?s="ne":"sw"==s&&(s="se"),A()),l>=p&&("ne"==s?s="nw":"se"==s&&(s="sw"),A())}function A(){for(var b=Math.floor(26*Math.random());b==k;)b=Math.floor(26*Math.random());C(a,{color:j[b]}),k=b}function B(){var a=navigator.userAgent.toLowerCase();return({opera:"-o-",chrome:"-webkit-",safari:"-webkit-",firefox:"-moz-",trident:"-ms-",msie:"-ms-"})[(/opera/.exec(a)||/msie/.exec(a)||/firefox/.exec(a)||/(chrome|safari)/.exec(a)||/trident/.exec(a))[0]]}function C(d,b){var a,e=B(),c="";for(a in b)c+=a+": "+b[a]+";",c+=e+a+": "+b[a]+";";d.style.cssText+=c}i(),window.addEventListener("resize",function(a){clearTimeout(u),u=setTimeout(w,100)},!1),a.addEventListener("click",()=>{A();let a=v[Math.floor(4*Math.random())];for(;a===s;)a=v[Math.floor(4*Math.random())];s=a,y()})