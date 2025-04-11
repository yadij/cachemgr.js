# cachemgr.js
A native management interface for Squid HTTP Proxy.

This tool allows you to view Squid manager reports directly in your Browser
with display layout integrated from existing Squid error page branding.

The current version of this tool provides several visualizations;
1. the native plain-text layout as produced by Squid, or
2. the tabular interpretation used by cachemgr.CGI tool.

# Installation
1. Download the [MGR_INDEX](MGR_INDEX) template file into your Squid errors/templates
   folder.<br>Usually that can be found under /usr/share/squid/ or /usr/share/squid-langpack/.

2. Reconfigure Squid.

3. A default installation of Squid configured with ```http_port 3128``` will have its manager interface provided
   <br>by the URL **http://localhost:3128/squid-internal-mgr/**.

If you have been using the cachemgr.CGI tool published by the Squid Project it
will continue working and should auto-detect the existence of this tool to
provide direct access to your proxies manager URLs.

If you wish to alter the branding on the MGR_INDEX page display simply edit
the /etc/squid/errorpages.css file used by Squid in all ERR_* template files.

# License
    Copyright (C) 2016-2025 Amos Jeffries
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

