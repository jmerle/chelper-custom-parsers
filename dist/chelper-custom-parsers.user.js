// ==UserScript==
// @name         CHelper Custom Parsers
// @namespace    https://github.com/jmerle
// @version      1.0.0
// @description  Adds custom parsers to CHelper.
// @author       Jasper van Merle
// @match        https://www.hackerrank.com/*
// @updateURL    https://raw.githubusercontent.com/jmerle/chelper-custom-parsers/master/dist/chelper-custom-parsers.user.js
// @downloadURL  https://raw.githubusercontent.com/jmerle/chelper-custom-parsers/master/dist/chelper-custom-parsers.user.js
// @grant        none
// ==/UserScript==

!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(1),a=r(o),u=n(6),i=r(u),c=window.location.href;a.default.forEach(function(e){e.getMatchPatterns().some(function(e){return(0,i.default)(e).test(c)})&&e.load()})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=[new o.default];t.default=a},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(3),s=r(l),f=n(4),p=r(f),h=n(5),d=r(h),y=function(e){function t(){return a(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),c(t,[{key:"getMatchPatterns",value:function(){return["https://www.hackerrank.com/*"]}},{key:"canHandlePage",value:function(){return!0}},{key:"load",value:function(){var e=this,t=new MutationObserver(function(){return e.check()}),n={attributes:!1,childList:!0,characterData:!1};t.observe(document.body,n),t.observe(document.getElementById("content"),n)}},{key:"check",value:function(){var e=window.location.href;(e.endsWith("/problem")||/^https:\/\/(www[.])?hackerrank[.]com\/(contests\/.+\/)?challenges\/[^\/]+$/.test(e))&&this.initProblemPage()}},{key:"initProblemPage",value:function(){var e=this;if(0===$("li#problemTab").length)return void setTimeout(this.initProblemPage,50);if(1!==$("#chelper-parse").length){var t=this.parseTask(),n="/contests"===$("ol.bcrumb li:first-child a").attr("href"),r='<button class="btn" id="chelper-parse" style="margin-bottom: '+(n?0:20)+'px;">Parse with CHelper</button>';$(".challenge-sidebar").css("margin-top",0),$(".challenge-sidebar").prepend(r),$("#chelper-parse").on("click",function(){return e.sendTask(t)})}}},{key:"parseTask",value:function(){var e=$(".challenge-view h2:first").text().trim(),t=$("ol.bcrumb li").map(function(e,t){return $(t).find("a span").text()}).toArray(),n=["HackerRank"].concat(o(t.slice(1,-1))).join(" - "),r=[];return $(".challenge_sample_input pre, .challenge_sample_output pre").each(function(e,t){var n=$(t).text();e%2==0?r.push(new d.default(n,"")):r[r.length-1].setOutput(n)}),new p.default(e,n,r,512)}}]),t}(s.default);t.default=y},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){r(this,e)}return o(e,[{key:"sendTask",value:function(e){var t=("\n      <script>\n        const xhr = new XMLHttpRequest();\n        xhr.open('POST', 'http://localhost:4243', true);\n        xhr.setRequestHeader('Content-type', 'text/plain');\n        xhr.send(`"+this.taskToCHelperCompatibleSource(e)+"`);\n      <\/script>\n    ").trim(),n=document.createElement("iframe");n.src="data:text/html;charset=utf-8,"+encodeURI(t),document.body.appendChild(n),setTimeout(function(){return n.remove()},500)}},{key:"taskToCHelperCompatibleSource",value:function(e){var t=e.tests.map(function(e){return"\n      <td><pre>"+e.input+"</pre></td>\n      <td><pre>"+e.output+"</pre></td>\n    "});return'csacademy\n      <div class="text-center"><h1>'+e.taskName+"</h1></div>\n\n      <br>Memory limit: <em>"+e.memoryLimit+" </em></br>\n\n      "+t+'\n\n      "contest":""\n      "longName":"'+e.contestName+'"\n    '}}]),e}();t.default=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function e(t,n,o,a){r(this,e),this.taskName=t,this.contestName=n,this.tests=o,this.memoryLimit=a};t.default=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(t,n){r(this,e),this.input=this.correctData(t),this.output=this.correctData(n)}return o(e,[{key:"setInput",value:function(e){this.input=this.correctData(e)}},{key:"setOutput",value:function(e){this.output=this.correctData(e)}},{key:"correctData",value:function(e){var t=e.replace(/<br>/g,"\n");return t.endsWith("\n")?t:t+"\n"}}]),e}();t.default=a},function(e,t,n){"use strict";function r(e){if("<all_urls>"===e)return/^(?:https?|file|ftp|app):\/\//;var t=a.exec(e);if(!t)throw new TypeError('"'+e+'" is not a valid MatchPattern');var n=o(t,4),r=n[1],u=n[2],i=n[3];return new RegExp("^(?:"+("*"===r?"https?":escape(r))+":\\/\\/"+("*"===u?"[^\\/]*":escape(u).replace(/^\*\./g,"(?:[^\\/]+)?"))+(i?"*"==i?"(?:\\/.*)?":"\\/"+escape(i).replace(/\*/g,".*"):"\\/?")+")$")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(r=(u=i.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&i.return&&i.return()}finally{if(o)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=r;var a=/^(?:(\*|http|https|file|ftp|app):\/\/([^\/]+|)\/?(.*))$/i}]);