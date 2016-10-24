# WebUI-FTP-Client
This is a web client for managing FTP transfers to/from a local server

When you clone you'll need to put in your FTP config into index.js. It's needed by two parts, jsftp and ftps.
Jsftp is used for it's listing function and then ftps is used as an lftp wrapper to perform the more complex commands
