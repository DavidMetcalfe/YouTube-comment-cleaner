// ==UserScript==
// @name         YouTube comment cleaner
// @namespace    http://youtube.com/
// @version      1.0
// @description  try to take over the world!
// @author       David Metcalfe
// @match        *www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var blacklist = ['cuck', 'autis', 'nig', 'rape', 'gay', 'idiot', 'moron', 'asshole', 'fuck', 'cunt', 'shit', 'idiot', 'stupid'];

// every 200 milliseconds, re-run to remove any new matching comments.
setInterval(function() {

    var comments = document.getElementsByClassName("comment-renderer-text-content");
    var regFind = function(string, arr) {
        for (var i = 0; i < arr.length; i++) {
            var re = new RegExp(arr[i], "gi");
            if (re.test(string)) {
                return true;
            }
            else {
                continue;
            }
        }
    };

    for (var i = 0; i < comments.length; i++)
    {
        var stripPunctuation = comments[i].innerText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\"<>]/g," ");
        stripPunctuation = stripPunctuation.replace(/\n/g," ");
        stripPunctuation = stripPunctuation.replace(/ +(?= )/g,'');
        stripPunctuation = stripPunctuation.toLowerCase();

        if (regFind(stripPunctuation, blacklist))
        {
            // Traverses back up to parent and removes it.
            comments[i].parentNode.parentNode.parentNode.remove();
        }
    }
}, 200);
})();