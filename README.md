# Natively play video streams in Firefox
This is firefox browser extension that gives the user the ability to play flash video streams for [multiple](http://rg3.github.io/youtube-dl/supportedsites.html) websites using [youtube-dl](http://youtube-dl.org) and a native media player of choice (which supports youtube-dl of course). The default configuration uses [mpv](http://mpv.io/) media player.
   
## Installing

### Build
1. Download `mozilla-youtube-dl-binding.xpi` file.
2. Open the xpi file with Firefox.

### Build it manually
1. Download the source.
2. Download de [Add-on SDK](https://addons.mozilla.org/en-US/Add-ons/SDK/Tools/jpm#Installation).
3. Run `jpm xpi` inside the `project` directory.
4. Open the `mozilla-youtube-dl-binding@jetpack.xpi` file with Firefox.