/*
    cachemgr.js for Squid HTTP Caching Proxy

    Copyright (C) 2016-2017 Amos Jeffries
      based on work by Francesco Chemolli

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

$.ajaxSetup({cache: true});
$.getScript("https://yadij.github.io/cachemgr.js/cachemgr-txt.js");

// build the cachemgr url to be used
function url(item) {
    return "/squid-internal-mgr/"+item;
}

function quoteEntities(data) {
    return data.replace(/&/g,"&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/ /g,"&nbsp; ").replace(/\n/g,"<br />\n");
}

function menuclick(item) {
  switch(item) {
    case "active_requests":
    case "objects":
    case "vm_objects":
      if (!window.confirm("The report you have selected may contain a large amount of data. It may take a long time to complete. Do you wish to continue?","Cancel"))
        return;

    default:
  }

  $.ajax({
    url: url(item),
    headers: {"Accept" : "text/plain;charset=utf-8"}
  }).done(function(data,textStatus,x){
    var ct = x.getResponseHeader('Content-Type');

    var results =
                "<button id=\"btnCgi\" onclick=\"$('#cgi').show();$('#text').hide();\">cachemgr.CGI</button>&nbsp;" +
                "<button id=\"btnTxt\" onclick=\"$('#cgi').hide();$('#text').show();\">Plain TEXT</button><br><hr><br>" +
                "";

    // pass text/plain to TXT render - IF it exists.
    // NP: no type check since this is the default action
    if (typeof render_contents_txt == 'function') {
      results += '<div id="cgi">' + render_contents_txt(data) + '</div>';
    }

    // also provide a raw text view
    results += '<div id="text"><pre>' + data + '</pre></div>';

    $("#content").html(results);

    // default to showing the CGI view people are familiar with
    if (ct == 'text/plain;charset=utf-8' || ct == 'text/plain') {
      $("#cgi").hide();
    } else {
      $("#text").hide();
    }
  });
}

function makemenuitem(item) {
    switch(item) {
        //ignored
        case "index":
        case "menu":
            return "";

        // temporary ignore. make link confirmed with a popup box one day.
        case "offline_toggle":
        case "shutdown":
        case "reconfigure":
        case "rotate":
        case "config":
            return "";

        default:
            return "<a href='#' class='menuitem' id='"+item+"' onclick='menuclick(this.innerHTML)'>"+item+"</a><br>\n";
    }
}

function render_menu(data,textStatus) {
    var lines=data.split("\n");
    var line;
    var rv=Array();
    for (var lineno in lines) {
        var l=lines[lineno].substr(1);
        l=l.substr(0,l.indexOf("\t"));
        l=l.replace(/ /g,"");
        var mi = makemenuitem(l);
        if ("info" == l) {
            mi = " " + mi;
        }
        rv.push(mi);
    }
    rv.sort();
    $("#menu").html(rv.join(""));
}

function cachemgr() {
  $("#menu").html("loading menu from " + url("menu"));
  $.ajax({
    url: url("menu"),
    headers: {"Accept" : "text/plain;charset=utf-8"}
  }).done(render_menu);

  // make mgr:info the default display
  menuclick("info");
}
