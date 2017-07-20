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
/*
 Use cachmgr.CGI logic for interpreting Squid manager reports
 sent in text/plain format:

 - any given line can be part of three constructions:
   table header, table data, or pre-formatted text

 - lines beginning with multiple whitespace are equivalent to a tab (\t).

 - lines containing a tab (\t) are table rows in TSV format.

*/
function render_contents_txt(data) {
    var datalines=data.split("\n");
    var status='text'; //one of 'text','table', 'theader'
    for (var lineno in datalines) {
        l=quoteEntities(datalines[lineno]);
        l=l.replace(/ {2} */g,"\t"); //multiple spaces = tab
        switch(status) {
            case 'text':
                if (l.indexOf("\t")==-1) { //no \t found
                    datalines[lineno]=l+"<br />"; //quoted
                } else { //let's begin a table
                    status='table';
                    datalines[lineno]='<table><tbody><tr><td>'+l.replace(/\t/g,"</td><td>")+"</tr>";
                }
                break;
            case 'table':
                if (l.indexOf("\t")==-1) {
                    status='text';
                    datalines[lineno]='</tbody></table>'+l;
                } else {
                    datalines[lineno]='<tr><td>'+l.replace(/\t/g,"</td><td>")+"</tr>";
                }
        }
    }
    return datalines.join("");
}
