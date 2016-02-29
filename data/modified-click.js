var prefs = {};

self.port.on("prefChanged", function(name, value) {
    prefs[name] = value;
});

window.addEventListener("click", function(event) {
    if (prefs.altClick && event.altKey && event.button == 0) {

        var link = event.target;

        while (link && link.localName != "a")
            link = link.parentNode;
        
        if (link) {
            self.port.emit("altClick", link.href);
        }
    }
}, false);
