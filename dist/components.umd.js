!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t||self).components=e()}(this,function(){const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),n="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},s={},i={},o=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${o}--\x3e`,l=new RegExp(`${o}|${a}`),c="$lit$";class u{constructor(t,e){this.parts=[],this.element=e;const n=[],r=[],s=document.createTreeWalker(e.content,133,null,!1);let i=0,a=-1,u=0;const{strings:d,values:{length:f}}=t;for(;u<f;){const t=s.nextNode();if(null!==t){if(a++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let r=0;for(let t=0;t<n;t++)p(e[t].name,c)&&r++;for(;r-- >0;){const e=m.exec(d[u])[2],n=e.toLowerCase()+c,r=t.getAttribute(n);t.removeAttribute(n);const s=r.split(l);this.parts.push({type:"attribute",index:a,name:e,strings:s}),u+=s.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(o)>=0){const r=t.parentNode,s=e.split(l),i=s.length-1;for(let e=0;e<i;e++){let n,i=s[e];if(""===i)n=h();else{const t=m.exec(i);null!==t&&p(t[2],c)&&(i=i.slice(0,t.index)+t[1]+t[2].slice(0,-c.length)+t[3]),n=document.createTextNode(i)}r.insertBefore(n,t),this.parts.push({type:"node",index:++a})}""===s[i]?(r.insertBefore(h(),t),n.push(t)):t.data=s[i],u+=i}}else if(8===t.nodeType)if(t.data===o){const e=t.parentNode;null!==t.previousSibling&&a!==i||(a++,e.insertBefore(h(),t)),i=a,this.parts.push({type:"node",index:a}),null===t.nextSibling?t.data="":(n.push(t),a--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(o,e+1));)this.parts.push({type:"node",index:-1}),u++}}else s.currentNode=r.pop()}for(const t of n)t.parentNode.removeChild(t)}}const p=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},d=t=>-1!==t.index,h=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class f{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],r=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let i,o=0,a=0,l=s.nextNode();for(;o<r.length;)if(i=r[o],d(i)){for(;a<i.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),s.currentNode=l.content),null===(l=s.nextNode())&&(s.currentNode=e.pop(),l=s.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,i.name,i.strings,this.options));o++}else this.__parts.push(void 0),o++;return n&&(document.adoptNode(t),customElements.upgrade(t)),t}}const g=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),y=` ${o} `;class v{constructor(t,e,n,r){this.strings=t,this.values=e,this.type=n,this.processor=r}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let r=0;r<t;r++){const t=this.strings[r],s=t.lastIndexOf("\x3c!--");n=(s>-1||n)&&-1===t.indexOf("--\x3e",s+1);const i=m.exec(t);e+=null===i?t+(n?y:a):t.substr(0,i.index)+i[1]+i[2]+c+i[3]+o}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==g&&(e=g.createHTML(e)),t.innerHTML=e,t}}const _=t=>null===t||!("object"==typeof t||"function"==typeof t),x=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class b{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new N(this)}_getValue(){const t=this.strings,e=t.length-1,n=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=n[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!x(t))return t}let r="";for(let s=0;s<e;s++){r+=t[s];const e=n[s];if(void 0!==e){const t=e.value;if(_(t)||!x(t))r+="string"==typeof t?t:String(t);else for(const e of t)r+="string"==typeof e?e:String(e)}}return r+=t[e],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===s||_(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=s,t(this)}this.value!==s&&this.committer.commit()}}class w{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(h()),this.endNode=t.appendChild(h())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=h()),t.__insert(this.endNode=h())}insertAfterPart(t){t.__insert(this.startNode=h()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=s,t(this)}const t=this.__pendingValue;t!==s&&(_(t)?t!==this.value&&this.__commitText(t):t instanceof v?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):x(t)?this.__commitIterable(t):t===i?(this.value=i,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof f&&this.value.template===e)this.value.update(t.values);else{const n=new f(e,t.processor,this.options),r=n._clone();n.update(t.values),this.__commitNode(r),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,r=0;for(const s of t)n=e[r],void 0===n&&(n=new w(this.options),e.push(n),0===r?n.appendIntoPart(this):n.insertAfterPart(e[r-1])),n.setValue(s),n.commit(),r++;r<e.length&&(e.length=r,this.clear(n&&n.endNode))}clear(t=this.startNode){r(this.startNode.parentNode,t.nextSibling,this.endNode)}}class E{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=s,t(this)}if(this.__pendingValue===s)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=s}}class j extends b{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new k(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class k extends N{}let A=!1;(()=>{try{const t={get capture(){return A=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class V{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=s,t(this)}if(this.__pendingValue===s)return;const t=this.__pendingValue,n=this.value,r=null==t||null!=n&&(t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive),i=null!=t&&(null==n||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=S(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=s}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const S=t=>t&&(A?{capture:t.capture,passive:t.passive,once:t.once}:t.capture),T=new class{handleAttributeExpressions(t,e,n,r){const s=e[0];return"."===s?new j(t,e.slice(1),n).parts:"@"===s?[new V(t,e.slice(1),r.eventContext)]:"?"===s?[new E(t,e.slice(1),n)]:new b(t,e,n).parts}handleTextExpression(t){return new w(t)}};function F(t){let e=O.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},O.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const r=t.strings.join(o);return n=e.keyString.get(r),void 0===n&&(n=new u(t,t.getTemplateElement()),e.keyString.set(r,n)),e.stringsArray.set(t.strings,n),n}const O=new Map,C=new WeakMap;"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");var I="%[a-f0-9]{2}",$=new RegExp(I,"gi"),L=new RegExp("("+I+")+","gi");function P(t,e){try{return decodeURIComponent(t.join(""))}catch(t){}if(1===t.length)return t;var n=t.slice(0,e=e||1),r=t.slice(e);return Array.prototype.concat.call([],P(n),P(r))}function M(t){try{return decodeURIComponent(t)}catch(r){for(var e=t.match($),n=1;n<e.length;n++)e=(t=P(e,n).join("")).match($);return t}}var R,U=function(t){if("string"!=typeof t)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch(e){return function(t){for(var e={"%FE%FF":"��","%FF%FE":"��"},n=L.exec(t);n;){try{e[n[0]]=decodeURIComponent(n[0])}catch(t){var r=M(n[0]);r!==n[0]&&(e[n[0]]=r)}n=L.exec(t)}e["%C2"]="�";for(var s=Object.keys(e),i=0;i<s.length;i++){var o=s[i];t=t.replace(new RegExp(o,"g"),e[o])}return t}(t)}},H=(t,e)=>{if("string"!=typeof t||"string"!=typeof e)throw new TypeError("Expected the arguments to be of type `string`");if(""===e)return[t];const n=t.indexOf(e);return-1===n?[t]:[t.slice(0,n),t.slice(n+e.length)]},B=function(t,e){for(var n={},r=Object.keys(t),s=Array.isArray(e),i=0;i<r.length;i++){var o=r[i],a=t[o];(s?-1!==e.indexOf(o):e(o,a,t))&&(n[o]=a)}return n},q=function(t){var e={exports:{}};return function(t,e){function n(t){if("string"!=typeof t||1!==t.length)throw new TypeError("arrayFormatSeparator must be single character string")}function r(t,e){return e.encode?e.strict?encodeURIComponent(t).replace(/[!'()*]/g,t=>`%${t.charCodeAt(0).toString(16).toUpperCase()}`):encodeURIComponent(t):t}function s(t,e){return e.decode?U(t):t}function i(t){return Array.isArray(t)?t.sort():"object"==typeof t?i(Object.keys(t)).sort((t,e)=>Number(t)-Number(e)).map(e=>t[e]):t}function o(t){const e=t.indexOf("#");return-1!==e&&(t=t.slice(0,e)),t}function a(t){const e=(t=o(t)).indexOf("?");return-1===e?"":t.slice(e+1)}function l(t,e){return e.parseNumbers&&!Number.isNaN(Number(t))&&"string"==typeof t&&""!==t.trim()?t=Number(t):!e.parseBooleans||null===t||"true"!==t.toLowerCase()&&"false"!==t.toLowerCase()||(t="true"===t.toLowerCase()),t}function c(t,e){n((e=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},e)).arrayFormatSeparator);const r=function(t){let e;switch(t.arrayFormat){case"index":return(t,n,r)=>{e=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),e?(void 0===r[t]&&(r[t]={}),r[t][e[1]]=n):r[t]=n};case"bracket":return(t,n,r)=>{e=/(\[\])$/.exec(t),r[t=t.replace(/\[\]$/,"")]=e?void 0!==r[t]?[].concat(r[t],n):[n]:n};case"comma":case"separator":return(e,n,r)=>{const i="string"==typeof n&&n.includes(t.arrayFormatSeparator),o="string"==typeof n&&!i&&s(n,t).includes(t.arrayFormatSeparator);n=o?s(n,t):n;const a=i||o?n.split(t.arrayFormatSeparator).map(e=>s(e,t)):null===n?n:s(n,t);r[e]=a};case"bracket-separator":return(e,n,r)=>{const i=/(\[\])$/.test(e);if(e=e.replace(/\[\]$/,""),!i)return void(r[e]=n?s(n,t):n);const o=null===n?[]:n.split(t.arrayFormatSeparator).map(e=>s(e,t));r[e]=void 0!==r[e]?[].concat(r[e],o):o};default:return(t,e,n)=>{n[t]=void 0!==n[t]?[].concat(n[t],e):e}}}(e),o=Object.create(null);if("string"!=typeof t)return o;if(!(t=t.trim().replace(/^[?#&]/,"")))return o;for(const n of t.split("&")){if(""===n)continue;let[t,i]=H(e.decode?n.replace(/\+/g," "):n,"=");i=void 0===i?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?i:s(i,e),r(s(t,e),i,o)}for(const t of Object.keys(o)){const n=o[t];if("object"==typeof n&&null!==n)for(const t of Object.keys(n))n[t]=l(n[t],e);else o[t]=l(n,e)}return!1===e.sort?o:(!0===e.sort?Object.keys(o).sort():Object.keys(o).sort(e.sort)).reduce((t,e)=>{const n=o[e];return t[e]=Boolean(n)&&"object"==typeof n&&!Array.isArray(n)?i(n):n,t},Object.create(null))}e.extract=a,e.parse=c,e.stringify=(t,e)=>{if(!t)return"";n((e=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},e)).arrayFormatSeparator);const s=n=>e.skipNull&&null==t[n]||e.skipEmptyString&&""===t[n],i=function(t){switch(t.arrayFormat){case"index":return e=>(n,s)=>{const i=n.length;return void 0===s||t.skipNull&&null===s||t.skipEmptyString&&""===s?n:null===s?[...n,[r(e,t),"[",i,"]"].join("")]:[...n,[r(e,t),"[",r(i,t),"]=",r(s,t)].join("")]};case"bracket":return e=>(n,s)=>void 0===s||t.skipNull&&null===s||t.skipEmptyString&&""===s?n:null===s?[...n,[r(e,t),"[]"].join("")]:[...n,[r(e,t),"[]=",r(s,t)].join("")];case"comma":case"separator":case"bracket-separator":{const e="bracket-separator"===t.arrayFormat?"[]=":"=";return n=>(s,i)=>void 0===i||t.skipNull&&null===i||t.skipEmptyString&&""===i?s:(i=null===i?"":i,0===s.length?[[r(n,t),e,r(i,t)].join("")]:[[s,r(i,t)].join(t.arrayFormatSeparator)])}default:return e=>(n,s)=>void 0===s||t.skipNull&&null===s||t.skipEmptyString&&""===s?n:null===s?[...n,r(e,t)]:[...n,[r(e,t),"=",r(s,t)].join("")]}}(e),o={};for(const e of Object.keys(t))s(e)||(o[e]=t[e]);const a=Object.keys(o);return!1!==e.sort&&a.sort(e.sort),a.map(n=>{const s=t[n];return void 0===s?"":null===s?r(n,e):Array.isArray(s)?0===s.length&&"bracket-separator"===e.arrayFormat?r(n,e)+"[]":s.reduce(i(n),[]).join("&"):r(n,e)+"="+r(s,e)}).filter(t=>t.length>0).join("&")},e.parseUrl=(t,e)=>{e=Object.assign({decode:!0},e);const[n,r]=H(t,"#");return Object.assign({url:n.split("?")[0]||"",query:c(a(t),e)},e&&e.parseFragmentIdentifier&&r?{fragmentIdentifier:s(r,e)}:{})},e.stringifyUrl=(t,n)=>{n=Object.assign({encode:!0,strict:!0},n);const s=o(t.url).split("?")[0]||"",i=e.extract(t.url),a=e.parse(i,{sort:!1}),l=Object.assign(a,t.query);let c=e.stringify(l,n);c&&(c=`?${c}`);let u=function(t){let e="";const n=t.indexOf("#");return-1!==n&&(e=t.slice(n)),e}(t.url);return t.fragmentIdentifier&&(u=`#${r(t.fragmentIdentifier,n)}`),`${s}${c}${u}`},e.pick=(t,n,r)=>{r=Object.assign({parseFragmentIdentifier:!0},r);const{url:s,query:i,fragmentIdentifier:o}=e.parseUrl(t,r);return e.stringifyUrl({url:s,query:B(i,n),fragmentIdentifier:o},r)},e.exclude=(t,n,r)=>{const s=Array.isArray(n)?t=>!n.includes(t):(t,e)=>!n(t,e);return e.pick(t,s,r)}}(0,e.exports),e.exports}(),W=function(){function t(t){var e=Array.prototype.slice.call(window.document.querySelectorAll(t));for(var n in e)this.process(e[n])}var e=t.prototype;return e.getData=function(t){try{var e={};return t.tags&&(e["tags.id"]=t.tags),Promise.resolve(fetch("https://api.aquaponicsassociation.org/organizations?"+q.stringify(e))).then(function(t){return Promise.resolve(t.json())})}catch(t){return Promise.reject(t)}},e.process=function(t){try{var e=t.getAttribute("data-tags");return Promise.resolve(this.getData({tags:e})).then(function(e){((t,e,n)=>{let s=C.get(e);void 0===s&&(r(e,e.firstChild),C.set(e,s=new w(Object.assign({templateFactory:F},void 0))),s.appendInto(e)),s.setValue(t),s.commit()})(e.map(function(t){var e,n,r,s,i,o;if(null!=t&&null!=(e=t.logo)&&null!=(n=e.formats)&&null!=(r=n.small)&&r.url){var a,l,c="https://api.aquaponicsassociation.org"+(null==t||null==(s=t.logo)||null==(i=s.formats)||null==(o=i.small)?void 0:o.url);return((t,...e)=>new v(t,e,"html",T))(R||(a=['\n        <div class="aa-organization">\n          <div class="aa-logo">\n            <a href="','" rel="noopener" target="_blank">\n              <img src="','" alt="','" />\n            </a>\n          </div>\n          <a href="','" rel="noopener" target="_blank">\n            <h2 class="name">',"</h2>\n          </a>\n        </div>\n      "],l||(l=a.slice(0)),a.raw=l,R=a),t.website||"#",c,t.name,t.website||"#",t.name)}}),t)})}catch(t){return Promise.reject(t)}},t}();return window.AAOrganizationsList=W,W});
//# sourceMappingURL=components.umd.js.map
