var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var simple_prefs = require("sdk/simple-prefs");
var ui = require("sdk/ui");
var { env } = require('sdk/system/environment');
const {Cc,Ci} = require("chrome");
var { Hotkey } = require("sdk/hotkeys");
var contextMenu = require("sdk/context-menu");
var querystring = require("sdk/querystring");

function play_video(url) {
	var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
	file.initWithPath(simple_prefs.prefs.player);

	// create an nsIProcess
	var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
	process.init(file);

	var args = simple_prefs.prefs.params.split(" ");


  if (simple_prefs.prefs.ytStartPlAtIndex) {
    console.log("ytStartPlAtIndex option is True");

    // Checks if running on Youtube
    if (url.indexOf("youtube.com") > -1) { // url is Youtube link
      console.log("Processing YT link", url);

      // Parses url params to an object returning object like:
      // {"v":"g04s2u30NfQ","index":"3","list":"PL58H4uS5fMRzmMC_SfMelnCoHgB8COa5r"}
      var qs = querystring.parse(url.split("?")[1]);

      console.log("URL params are:", qs);

      if (qs["list"] && qs["index"]) { // we have the playlist and the video index
        console.log("Args are:", args);

        // args could be: ["--video-unscaled=yes","--ytdl-raw-options=format=best"]
        // so checking for ytdl-raw-options
        var ytdlRawOptionsIndex = -1;
        for (var i = 0; i < args.length; i++) {
            if (args[i].indexOf("ytdl-raw-options") > -1) {
              console.log("Found:", args[i], "at index", i);
              ytdlRawOptionsIndex = i;
              break;
            };
        };
        // Change ytdl-raw-options or add it to args if not exist
        if (ytdlRawOptionsIndex > -1) {
          args[ytdlRawOptionsIndex] += ",yes-playlist=,playlist-start=" + qs["index"];
          console.log("ytdl-raw-options was changed to:", args[ytdlRawOptionsIndex]);
        } else {
          args.push("--ytdl-raw-options=yes-playlist=,playlist-start=" + qs["index"]);
          console.log("ytdl-raw-options was added to args:", args[args.length - 1]);
        };
      };
    };
  };

	args.push(url);
  console.log("Resulting args are:", args);

	// process.run(false, args, args.length);
	process.runAsync(args, args.length);
}

var menuItem = contextMenu.Item({
  label: "Watch with MPV",
  context: contextMenu.SelectorContext("[href]"),
  contentScript: 'self.on("click", function(node,data){self.postMessage(node.href);})',
  accessKey: "e",
  image: data.url("icon_button.png"),
  onMessage: function (url) {
    play_video(url);
  }
});

var action_button = ui.ActionButton({
  id: "my-button",
  label: "Play with MPV",
  icon: data.url("icon_button.png"),
  onClick: function(state) {
    play_video(tabs.activeTab.url);
  }
});

var showHotKey = Hotkey({
  combo: simple_prefs.prefs.hotkey,
  onPress: function() {
    play_video(tabs.activeTab.url);
  }
});
