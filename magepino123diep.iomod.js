// ==UserScript==
// @name         Diep.IO Zoom and Save Name Mod
// @version      1.5
// @description  If Diep.io is updated , please reload the page
// @author       magepino123
// @match        *://diep.io/
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      diep.io
// @namespace diep.io
// ==/UserScript==
window.stop();
document.documentElement.innerHTML = null;
var s = '',
  doc = '';
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://diep.io/d.js',
  onload: function(event) {
    s = event.responseText;
    s = s.replace(/\(function\((.)\){/i, '(function($1){var zoom=0.25;');
    s = s.replace(/wheel:function\(\){}/i, 'wheel:function(e){zoom *= Math.pow(.9, e);}');
    s = s.replace(/(.)=\(\+.\[.>>[1-9]+\]\*19\.0\+ \+(.)\[(.)\+([1-9]+)>>([1-9]+)\]\)\/20\.0;/i, '$1 = (zoom * 19.0 + +$2[$3 + $4 >> $5]) / 20.0;');
    s = s.replace(/D\.value="";/i, '');
    GM_xmlhttpRequest({
      method: "GET",
      url: 'http://diep.io/',
      onload: function(event) {
        doc = event.responseText;
        doc = doc.replace(/<script src="d\.js" async><\/script>/i, '');
        doc = doc.replace(/<\/body>/i, '<script>' + s + '</script><script>document.getElementById("textInput").value = localStorage.getItem("_nickname");window.addEventListener("beforeunload", function() {localStorage.setItem("_nickname", document.getElementById("textInput").value);});</script></body>');
        document.open();
        document.write(doc);
        document.close();
      }
    });
  }
});
