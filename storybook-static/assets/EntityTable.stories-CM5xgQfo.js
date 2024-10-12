import{j as A}from"./jsx-runtime-DEdD30eg.js";import{R as le,r as ge}from"./index-RYns6xqu.js";import{I as fe}from"./Icon-BFgXAZrc.js";function Y(e,...t){if(t.length==0)return!1;let r=!0;for(const o of t)r=r&&o in e;return r}function he(e,t,...r){return e.filter(o=>Y(o,...t||[])?!1:Y(o,...r))}const O="-",ye=e=>{const t=we(e),{conflictingClassGroups:r,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:s=>{const a=s.split(O);return a[0]===""&&a.length!==1&&a.shift(),ie(a,t)||ve(s)},getConflictingClassGroupIds:(s,a)=>{const u=r[s]||[];return a&&o[s]?[...u,...o[s]]:u}}},ie=(e,t)=>{var s;if(e.length===0)return t.classGroupId;const r=e[0],o=t.nextPart.get(r),i=o?ie(e.slice(1),o):void 0;if(i)return i;if(t.validators.length===0)return;const n=e.join(O);return(s=t.validators.find(({validator:a})=>a(n)))==null?void 0:s.classGroupId},ee=/^\[(.+)\]$/,ve=e=>{if(ee.test(e)){const t=ee.exec(e)[1],r=t==null?void 0:t.substring(0,t.indexOf(":"));if(r)return"arbitrary.."+r}},we=e=>{const{theme:t,prefix:r}=e,o={nextPart:new Map,validators:[]};return ke(Object.entries(e.classGroups),r).forEach(([n,s])=>{H(s,o,n,t)}),o},H=(e,t,r,o)=>{e.forEach(i=>{if(typeof i=="string"){const n=i===""?t:te(t,i);n.classGroupId=r;return}if(typeof i=="function"){if(xe(i)){H(i(o),t,r,o);return}t.validators.push({validator:i,classGroupId:r});return}Object.entries(i).forEach(([n,s])=>{H(s,te(t,n),r,o)})})},te=(e,t)=>{let r=e;return t.split(O).forEach(o=>{r.nextPart.has(o)||r.nextPart.set(o,{nextPart:new Map,validators:[]}),r=r.nextPart.get(o)}),r},xe=e=>e.isThemeGetter,ke=(e,t)=>t?e.map(([r,o])=>{const i=o.map(n=>typeof n=="string"?t+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([s,a])=>[t+s,a])):n);return[r,i]}):e,Ce=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,r=new Map,o=new Map;const i=(n,s)=>{r.set(n,s),t++,t>e&&(t=0,o=r,r=new Map)};return{get(n){let s=r.get(n);if(s!==void 0)return s;if((s=o.get(n))!==void 0)return i(n,s),s},set(n,s){r.has(n)?r.set(n,s):i(n,s)}}},ce="!",Ae=e=>{const{separator:t,experimentalParseClassName:r}=e,o=t.length===1,i=t[0],n=t.length,s=a=>{const u=[];let b=0,f=0,v;for(let p=0;p<a.length;p++){let y=a[p];if(b===0){if(y===i&&(o||a.slice(p,p+n)===t)){u.push(a.slice(f,p)),f=p+n;continue}if(y==="/"){v=p;continue}}y==="["?b++:y==="]"&&b--}const w=u.length===0?a:a.substring(f),m=w.startsWith(ce),g=m?w.substring(1):w,h=v&&v>f?v-f:void 0;return{modifiers:u,hasImportantModifier:m,baseClassName:g,maybePostfixModifierPosition:h}};return r?a=>r({className:a,parseClassName:s}):s},Te=e=>{if(e.length<=1)return e;const t=[];let r=[];return e.forEach(o=>{o[0]==="["?(t.push(...r.sort(),o),r=[]):r.push(o)}),t.push(...r.sort()),t},ze=e=>({cache:Ce(e.cacheSize),parseClassName:Ae(e),...ye(e)}),Ee=/\s+/,Re=(e,t)=>{const{parseClassName:r,getClassGroupId:o,getConflictingClassGroupIds:i}=t,n=[],s=e.trim().split(Ee);let a="";for(let u=s.length-1;u>=0;u-=1){const b=s[u],{modifiers:f,hasImportantModifier:v,baseClassName:w,maybePostfixModifierPosition:m}=r(b);let g=!!m,h=o(g?w.substring(0,m):w);if(!h){if(!g){a=b+(a.length>0?" "+a:a);continue}if(h=o(w),!h){a=b+(a.length>0?" "+a:a);continue}g=!1}const p=Te(f).join(":"),y=v?p+ce:p,x=y+h;if(n.includes(x))continue;n.push(x);const N=i(h,g);for(let E=0;E<N.length;++E){const G=N[E];n.push(y+G)}a=b+(a.length>0?" "+a:a)}return a};function Se(){let e=0,t,r,o="";for(;e<arguments.length;)(t=arguments[e++])&&(r=de(t))&&(o&&(o+=" "),o+=r);return o}const de=e=>{if(typeof e=="string")return e;let t,r="";for(let o=0;o<e.length;o++)e[o]&&(t=de(e[o]))&&(r&&(r+=" "),r+=t);return r};function Ne(e,...t){let r,o,i,n=s;function s(u){const b=t.reduce((f,v)=>v(f),e());return r=ze(b),o=r.cache.get,i=r.cache.set,n=a,a(u)}function a(u){const b=o(u);if(b)return b;const f=Re(u,r);return i(u,f),f}return function(){return n(Se.apply(null,arguments))}}const c=e=>{const t=r=>r[e]||[];return t.isThemeGetter=!0,t},ue=/^\[(?:([a-z-]+):)?(.+)\]$/i,je=/^\d+\/\d+$/,Me=new Set(["px","full","screen"]),Pe=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ie=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ge=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,qe=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,$e=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,C=e=>R(e)||Me.has(e)||je.test(e),T=e=>S(e,"length",Ue),R=e=>!!e&&!Number.isNaN(Number(e)),V=e=>S(e,"number",R),M=e=>!!e&&Number.isInteger(Number(e)),Le=e=>e.endsWith("%")&&R(e.slice(0,-1)),l=e=>ue.test(e),z=e=>Pe.test(e),_e=new Set(["length","size","percentage"]),We=e=>S(e,_e,pe),De=e=>S(e,"position",pe),Ve=new Set(["image","url"]),He=e=>S(e,Ve,Fe),Oe=e=>S(e,"",Be),P=()=>!0,S=(e,t,r)=>{const o=ue.exec(e);return o?o[1]?typeof t=="string"?o[1]===t:t.has(o[1]):r(o[2]):!1},Ue=e=>Ie.test(e)&&!Ge.test(e),pe=()=>!1,Be=e=>qe.test(e),Fe=e=>$e.test(e),Je=()=>{const e=c("colors"),t=c("spacing"),r=c("blur"),o=c("brightness"),i=c("borderColor"),n=c("borderRadius"),s=c("borderSpacing"),a=c("borderWidth"),u=c("contrast"),b=c("grayscale"),f=c("hueRotate"),v=c("invert"),w=c("gap"),m=c("gradientColorStops"),g=c("gradientColorStopPositions"),h=c("inset"),p=c("margin"),y=c("opacity"),x=c("padding"),N=c("saturate"),E=c("scale"),G=c("sepia"),B=c("skew"),F=c("space"),J=c("translate"),L=()=>["auto","contain","none"],_=()=>["auto","hidden","clip","visible","scroll"],W=()=>["auto",l,t],d=()=>[l,t],X=()=>["",C,T],q=()=>["auto",R,l],Z=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],$=()=>["solid","dashed","dotted","double","none"],K=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],D=()=>["start","end","center","between","around","evenly","stretch"],j=()=>["","0",l],Q=()=>["auto","avoid","all","avoid-page","page","left","right","column"],k=()=>[R,l];return{cacheSize:500,separator:":",theme:{colors:[P],spacing:[C,T],blur:["none","",z,l],brightness:k(),borderColor:[e],borderRadius:["none","","full",z,l],borderSpacing:d(),borderWidth:X(),contrast:k(),grayscale:j(),hueRotate:k(),invert:j(),gap:d(),gradientColorStops:[e],gradientColorStopPositions:[Le,T],inset:W(),margin:W(),opacity:k(),padding:d(),saturate:k(),scale:k(),sepia:j(),skew:k(),space:d(),translate:d()},classGroups:{aspect:[{aspect:["auto","square","video",l]}],container:["container"],columns:[{columns:[z]}],"break-after":[{"break-after":Q()}],"break-before":[{"break-before":Q()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...Z(),l]}],overflow:[{overflow:_()}],"overflow-x":[{"overflow-x":_()}],"overflow-y":[{"overflow-y":_()}],overscroll:[{overscroll:L()}],"overscroll-x":[{"overscroll-x":L()}],"overscroll-y":[{"overscroll-y":L()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[h]}],"inset-x":[{"inset-x":[h]}],"inset-y":[{"inset-y":[h]}],start:[{start:[h]}],end:[{end:[h]}],top:[{top:[h]}],right:[{right:[h]}],bottom:[{bottom:[h]}],left:[{left:[h]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",M,l]}],basis:[{basis:W()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",l]}],grow:[{grow:j()}],shrink:[{shrink:j()}],order:[{order:["first","last","none",M,l]}],"grid-cols":[{"grid-cols":[P]}],"col-start-end":[{col:["auto",{span:["full",M,l]},l]}],"col-start":[{"col-start":q()}],"col-end":[{"col-end":q()}],"grid-rows":[{"grid-rows":[P]}],"row-start-end":[{row:["auto",{span:[M,l]},l]}],"row-start":[{"row-start":q()}],"row-end":[{"row-end":q()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",l]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",l]}],gap:[{gap:[w]}],"gap-x":[{"gap-x":[w]}],"gap-y":[{"gap-y":[w]}],"justify-content":[{justify:["normal",...D()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...D(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...D(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[x]}],px:[{px:[x]}],py:[{py:[x]}],ps:[{ps:[x]}],pe:[{pe:[x]}],pt:[{pt:[x]}],pr:[{pr:[x]}],pb:[{pb:[x]}],pl:[{pl:[x]}],m:[{m:[p]}],mx:[{mx:[p]}],my:[{my:[p]}],ms:[{ms:[p]}],me:[{me:[p]}],mt:[{mt:[p]}],mr:[{mr:[p]}],mb:[{mb:[p]}],ml:[{ml:[p]}],"space-x":[{"space-x":[F]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[F]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",l,t]}],"min-w":[{"min-w":[l,t,"min","max","fit"]}],"max-w":[{"max-w":[l,t,"none","full","min","max","fit","prose",{screen:[z]},z]}],h:[{h:[l,t,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[l,t,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[l,t,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[l,t,"auto","min","max","fit"]}],"font-size":[{text:["base",z,T]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",V]}],"font-family":[{font:[P]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",l]}],"line-clamp":[{"line-clamp":["none",R,V]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",C,l]}],"list-image":[{"list-image":["none",l]}],"list-style-type":[{list:["none","disc","decimal",l]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[y]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[y]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...$(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",C,T]}],"underline-offset":[{"underline-offset":["auto",C,l]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:d()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",l]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",l]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[y]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...Z(),De]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",We]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},He]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[g]}],"gradient-via-pos":[{via:[g]}],"gradient-to-pos":[{to:[g]}],"gradient-from":[{from:[m]}],"gradient-via":[{via:[m]}],"gradient-to":[{to:[m]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[a]}],"border-w-x":[{"border-x":[a]}],"border-w-y":[{"border-y":[a]}],"border-w-s":[{"border-s":[a]}],"border-w-e":[{"border-e":[a]}],"border-w-t":[{"border-t":[a]}],"border-w-r":[{"border-r":[a]}],"border-w-b":[{"border-b":[a]}],"border-w-l":[{"border-l":[a]}],"border-opacity":[{"border-opacity":[y]}],"border-style":[{border:[...$(),"hidden"]}],"divide-x":[{"divide-x":[a]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[a]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[y]}],"divide-style":[{divide:$()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:["",...$()]}],"outline-offset":[{"outline-offset":[C,l]}],"outline-w":[{outline:[C,T]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:X()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[y]}],"ring-offset-w":[{"ring-offset":[C,T]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",z,Oe]}],"shadow-color":[{shadow:[P]}],opacity:[{opacity:[y]}],"mix-blend":[{"mix-blend":[...K(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":K()}],filter:[{filter:["","none"]}],blur:[{blur:[r]}],brightness:[{brightness:[o]}],contrast:[{contrast:[u]}],"drop-shadow":[{"drop-shadow":["","none",z,l]}],grayscale:[{grayscale:[b]}],"hue-rotate":[{"hue-rotate":[f]}],invert:[{invert:[v]}],saturate:[{saturate:[N]}],sepia:[{sepia:[G]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[r]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[u]}],"backdrop-grayscale":[{"backdrop-grayscale":[b]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[f]}],"backdrop-invert":[{"backdrop-invert":[v]}],"backdrop-opacity":[{"backdrop-opacity":[y]}],"backdrop-saturate":[{"backdrop-saturate":[N]}],"backdrop-sepia":[{"backdrop-sepia":[G]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[s]}],"border-spacing-x":[{"border-spacing-x":[s]}],"border-spacing-y":[{"border-spacing-y":[s]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",l]}],duration:[{duration:k()}],ease:[{ease:["linear","in","out","in-out",l]}],delay:[{delay:k()}],animate:[{animate:["none","spin","ping","pulse","bounce",l]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[E]}],"scale-x":[{"scale-x":[E]}],"scale-y":[{"scale-y":[E]}],rotate:[{rotate:[M,l]}],"translate-x":[{"translate-x":[J]}],"translate-y":[{"translate-y":[J]}],"skew-x":[{"skew-x":[B]}],"skew-y":[{"skew-y":[B]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",l]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",l]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":d()}],"scroll-mx":[{"scroll-mx":d()}],"scroll-my":[{"scroll-my":d()}],"scroll-ms":[{"scroll-ms":d()}],"scroll-me":[{"scroll-me":d()}],"scroll-mt":[{"scroll-mt":d()}],"scroll-mr":[{"scroll-mr":d()}],"scroll-mb":[{"scroll-mb":d()}],"scroll-ml":[{"scroll-ml":d()}],"scroll-p":[{"scroll-p":d()}],"scroll-px":[{"scroll-px":d()}],"scroll-py":[{"scroll-py":d()}],"scroll-ps":[{"scroll-ps":d()}],"scroll-pe":[{"scroll-pe":d()}],"scroll-pt":[{"scroll-pt":d()}],"scroll-pr":[{"scroll-pr":d()}],"scroll-pb":[{"scroll-pb":d()}],"scroll-pl":[{"scroll-pl":d()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",l]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[C,T,V]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},me=Ne(Je);function be(e){return A.jsx("div",{className:me("rounded-full p-1 w-min bg-theme-primary",e.className),children:A.jsx(fe,{...e})})}be.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{variant:{required:!0,tsType:{name:"union",raw:`"d20" | "d12" | "d10" | "d6" | "d8" | "d4" | "warning" | "check" | "info" | 
"user" | "caret-up" | "filter" | "arrow-right" | "search" | "pen" | "gear" | "ellipsis"`,elements:[{name:"literal",value:'"d20"'},{name:"literal",value:'"d12"'},{name:"literal",value:'"d10"'},{name:"literal",value:'"d6"'},{name:"literal",value:'"d8"'},{name:"literal",value:'"d4"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"check"'},{name:"literal",value:'"info"'},{name:"literal",value:'"user"'},{name:"literal",value:'"caret-up"'},{name:"literal",value:'"filter"'},{name:"literal",value:'"arrow-right"'},{name:"literal",value:'"search"'},{name:"literal",value:'"pen"'},{name:"literal",value:'"gear"'},{name:"literal",value:'"ellipsis"'}]},description:"Defines what icon is shown."},size:{required:!1,tsType:{name:"number"},description:"The size of the icon."},className:{required:!1,tsType:{name:"string"},description:"Optional class names for the icon."}}};const Xe=le.createContext(void 0),Ze=le.createContext(void 0);function U({archetypeOverride:e,disallow:t,icon:r,label:o="",data:i,className:n,children:s}){const a=s instanceof Array?s:[s];let u=e||a.map(m=>m==null?void 0:m.props.component);const b=ge.useContext(Xe),f=b?he(b,t,...u):i||[];let v="";for(const m of a){let g=m!=null&&m.props.width?m.props.width:"1fr";g=="hug"&&(g="auto"),g=="full"&&(g="1fr"),v+=g+" "}const w={gridTemplateRows:`repeat(${f.length}, min-content)`,gridTemplateColumns:v};return A.jsxs("div",{className:"flex "+me("gap-1 px-1",n),children:[A.jsxs("div",{className:"flex flex-col gap-2 items-center",children:[r?A.jsx(be,{variant:r}):null,A.jsx("div",{className:"[writingMode:vertical-rl] text-lg text-nowrap truncate",children:o})]}),A.jsx("div",{className:"w-full border border-dashed rounded-lg grid overflow-y-scroll justify-start px-1",style:w,children:a.map((m,g)=>A.jsx(Ze.Provider,{value:{entities:f,archetype:u,column:g},children:m},"col-"+g))})]})}U.__docgenInfo={description:'@description This component is used to display entities in a table format. It can be used in conjunction with the EntityTableGroup component or by itself.\n@example\n```tsx\n<EntityTable archetype={["name", "age"]} data={[{name : "John", age : 20}, {name : "Jane", age : 30}]} />`\n```',methods:[],displayName:"EntityTable",props:{archetypeOverride:{required:!1,tsType:{name:"A"},description:"@description This table's archetype. This is used to for type checking and column display."},data:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
	Name? : Name, 
	Damage? : Damage
}`,signature:{properties:[{key:"Name",value:{name:"string",required:!1}},{key:"Damage",value:{name:"union",raw:'"D4" | "D6" | "D8" | "D10" | "D12" | "D20" | "D100"',elements:[{name:"literal",value:'"D4"'},{name:"literal",value:'"D6"'},{name:"literal",value:'"D8"'},{name:"literal",value:'"D10"'},{name:"literal",value:'"D12"'},{name:"literal",value:'"D20"'},{name:"literal",value:'"D100"'}],required:!1}}]}}],raw:"Entity[]"},description:"These are the entities that are going to be displayed on the table."},headerLabels:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  [k in A[number] as string]? : string
}`,signature:{properties:[{key:{name:"A[number]",raw:"A[number]",required:!1},value:{name:"string"}}]}},description:"@description An object of labels that will override the default labels of each component"},disallow:{required:!1,tsType:{name:"D"},description:"@description An archetype the defines entities that will be filtered out of the table"},icon:{required:!1,tsType:{name:"union",raw:`"d20" | "d12" | "d10" | "d6" | "d8" | "d4" | "warning" | "check" | "info" | 
"user" | "caret-up" | "filter" | "arrow-right" | "search" | "pen" | "gear" | "ellipsis"`,elements:[{name:"literal",value:'"d20"'},{name:"literal",value:'"d12"'},{name:"literal",value:'"d10"'},{name:"literal",value:'"d6"'},{name:"literal",value:'"d8"'},{name:"literal",value:'"d4"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"check"'},{name:"literal",value:'"info"'},{name:"literal",value:'"user"'},{name:"literal",value:'"caret-up"'},{name:"literal",value:'"filter"'},{name:"literal",value:'"arrow-right"'},{name:"literal",value:'"search"'},{name:"literal",value:'"pen"'},{name:"literal",value:'"gear"'},{name:"literal",value:'"ellipsis"'}]},description:"@description The id of the icon that is displayed in the top right corner. If this is undefined, the icon will not be there."},label:{required:!1,tsType:{name:"string"},description:"@description The name of the table. If empty, the table will have no label.",defaultValue:{value:'""',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"@description Class styles to style the table."},children:{required:!1,tsType:{name:"union",raw:"React.ReactElement<EntityTableHeaderProps<A, A[number]>> | React.ReactElement<EntityTableHeaderProps<A, A[number]>>[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement<EntityTableHeaderProps<A, A[number]>>",elements:[{name:"signature",type:"object",raw:`{
  component : N,
  label? : string,
  renderer? : TableHeaderRenderFunction<A, N, ConcreteEntity<A>[N]>,
  width? : EntityTableHeaderWidth
}`,signature:{properties:[{key:"component",value:{name:"A[number]",raw:"A[number]",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"renderer",value:{name:"signature",type:"function",raw:"(component : V) => ReactElement",signature:{arguments:[{type:{name:"Pick[N]",raw:"ConcreteEntity<A>[N]"},name:"component"}],return:{name:"ReactElement"}},required:!1}},{key:"width",value:{name:"union",raw:'"hug" | "full" | `${number}${SizeUnits}`',elements:[{name:"literal",value:'"hug"'},{name:"literal",value:'"full"'},{name:"literal",value:"`${number}${SizeUnits}`"}],required:!1}}]}}]},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement<EntityTableHeaderProps<A, A[number]>>",elements:[{name:"signature",type:"object",raw:`{
  component : N,
  label? : string,
  renderer? : TableHeaderRenderFunction<A, N, ConcreteEntity<A>[N]>,
  width? : EntityTableHeaderWidth
}`,signature:{properties:[{key:"component",value:{name:"A[number]",raw:"A[number]",required:!0}},{key:"label",value:{name:"string",required:!1}},{key:"renderer",value:{name:"signature",type:"function",raw:"(component : V) => ReactElement",signature:{arguments:[{type:{name:"Pick[N]",raw:"ConcreteEntity<A>[N]"},name:"component"}],return:{name:"ReactElement"}},required:!1}},{key:"width",value:{name:"union",raw:'"hug" | "full" | `${number}${SizeUnits}`',elements:[{name:"literal",value:'"hug"'},{name:"literal",value:'"full"'},{name:"literal",value:"`${number}${SizeUnits}`"}],required:!1}}]}}]}],raw:"React.ReactElement<EntityTableHeaderProps<A, A[number]>>[]"}]},description:""}}};const et={title:"EntityTable",component:U,parameters:{layout:"centered"},tags:["autodocs"]},I={render:()=>A.jsx(U,{})};var re,oe,ne,ae,se;I.parameters={...I.parameters,docs:{...(re=I.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <EntityTable />
}`,...(ne=(oe=I.parameters)==null?void 0:oe.docs)==null?void 0:ne.source},description:{story:"The most simple verson of the icon that you can get.",...(se=(ae=I.parameters)==null?void 0:ae.docs)==null?void 0:se.description}}};const tt=["Simple"];export{I as Simple,tt as __namedExportsOrder,et as default};