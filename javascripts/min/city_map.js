function initMap() {
    citymap = new google.maps.Map(mapdiv, mapoptions), citymap.minzoom = 3, createZoomControl(citymap);
    var e = document.querySelector('meta[name="city"]').getAttribute("content");
    citymap.data.hoods = createPlacesArray("#neighborhoods nav > ul > li", "hood", e), citymap.data.hoodmarkers = [], createMarkers(citymap.data.hoods, citymap.data.hoodmarkers, citymap, dot_smallsize);
    for (var o = 0; o < citymap.data.hoods.length; o++) "true" != citymap.data.hoods[o].comingsoon && (citymap.data.hoods[o].places = createPlacesArray("#" + citymap.data.hoods[o].id + " .place", "place", citymap.data.hoods[o].name), citymap.data.hoods[o].placemarkers = []);
    google.maps.event.addListenerOnce(citymap, "idle", function() {
        for (deActivateMarkers(citymap.data.hoodmarkers), citymap.bounds = new google.maps.LatLngBounds, o = 0; o < citymap.data.hoodmarkers.length; o++) citymap.bounds.extend(citymap.data.hoodmarkers[o].getPosition());
        citymap.fitBounds(citymap.bounds), fixMap(citymap)
    }), google.maps.event.addListener(citymap, "tilesloaded", function() {
        $(mapdiv).find("img").attr("nopin", "nopin")
    }), citymap.zoomlevel, citymap.addListener("zoom_changed", function() {
        e && clearTimeout(e), openmarker && closeIW(openmarker);
        var e = window.setTimeout(function() {
            citymap.zoomlevel = citymap.getZoom(), console.log("zoom: " + citymap.zoomlevel), citymap.zoomlevel < hoodsbreak ? showHoods(citymap) : hideHoods(citymap), citymap.zoomlevel >= hoodsbreak ? (loadPlaces(citymap), showPlaces(citymap)) : hidePlaces(citymap)
        }, 50)
    }), citymap.addListener("bounds_changed", function() {
        this.zoomlevel >= hoodsbreak && loadPlaces(citymap)
    });
    var a;
    window.addEventListener("resize", function() {
        clearTimeout(a), a = setTimeout(function() {
            fixMap(citymap)
        }, 500)
    });
    var t = [mapdiv, mapwrap, mapicon, mapclose];
    mapwrap && void 0 !== mapwrap && (mapwrap.onclick = function() {
        openMap(citymap, t)
    }), mapclose && void 0 !== mapclose && (mapclose.onclick = function() {
        closeMap(citymap, t)
    }), google.maps.event.addListenerOnce(citymap, "idle", function() {
        pinLocation(this, 22)
    })
}

function showHoods(e) {
    "undefined" != typeof e.data.hoodmarkers && showMarkers(e, e.data.hoodmarkers)
}

function hideHoods(e) {
    "undefined" != typeof e.data.hoodmarkers && hideMarkers(e.data.hoodmarkers)
}

function showPlaces(e) {
    if ("undefined" != typeof e.data.hoods)
        for (var o = 0; o < e.data.hoods.length; o++) "undefined" != typeof e.data.hoods[o].placemarkers && showMarkers(e, e.data.hoods[o].placemarkers)
}

function hidePlaces(e) {
    if ("undefined" != typeof e.data.hoods)
        for (var o = 0; o < e.data.hoods.length; o++) "undefined" != typeof e.data.hoods[o].placemarkers && hideMarkers(e.data.hoods[o].placemarkers)
}

function loadPlaces(e) {
    if ("undefined" != typeof e.data.hoods)
        for (var o = 0; o < e.data.hoods.length; o++)
            if ("true" != e.data.hoods[o].comingsoon) {
                var a = new google.maps.LatLng(e.data.hoods[o].coords.lat, e.data.hoods[o].coords.lng);
                e.getBounds().contains(a) && 0 == e.data.hoods[o].placemarkers.length && createMarkers(e.data.hoods[o].places, e.data.hoods[o].placemarkers, e, dot_largesize)
            }
}

function geocode(e) {
    var o = new google.maps.Geocoder;
    o.geocode({
        address: e.name + ", " + city
    }, function(o, a) {
        a === google.maps.GeocoderStatus.OK ? (e.coords = {
            lat: o[0].geometry.location.lat(),
            lng: o[0].geometry.location.lng()
        }, console.log("ADD COORDS FOR " + e.name + ": " + e.coords.lat + "," + e.coords.lng)) : console.log(e.name + ": Geocode was not successful for the following reason: " + a)
    })
}

function fixMap(e) {
    citymap.getZoom() < hoodsbreak && citymap.fitBounds(citymap.bounds), google.maps.event.trigger(e, "resize")
}

function activateMarkers(e, o) {
    for (i = 0; i < o.length; i++)
        if (mobile) google.maps.event.addListener(o[i], "click", function() {
            toggleIW(this)
        });
        else {
            google.maps.event.addListener(o[i], "mouseover", function() {
                openIW(this)
            }), google.maps.event.addListener(o[i], "mouseout", function() {
                closeIW(this)
            });
            var a = o[i];
            a.place && "undefined" != typeof a.place && google.maps.event.addListener(a, "click", function() {
                "true" != this.place.comingsoon && (this.place.places && "undefined" != typeof this.place.places ? (0 == this.place.placemarkers.length && createMarkers(this.place.places, this.place.placemarkers, e, dot_largesize), zoomTo(e, this.place)) : window.location.href = this.place.url)
            })
        }
}

function deActivateMarkers(e) {
    for (i = 0; i < e.length; i++) google.maps.event.clearListeners(e[i], "mouseover"), google.maps.event.clearListeners(e[i], "mouseout"), google.maps.event.clearListeners(e[i], "click")
}

function openMap(e, o) {
    mapopen = !0;
    for (var a = 0; a < o.length; a++) o[a].classList.add("map-open");
    $("#mapwrap").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(o) {
        fixMap(e), e.minzoom = e.getZoom()
    }), e.setOptions({
        scrollwheel: !0,
        draggable: !0
    }), mapwrap.onclick = null, activateMarkers(e, e.data.hoodmarkers), resizeMarkers(e.data.hoodmarkers, dot_largesize), trackMapOpen()
}

function closeMap(e, o) {
    mapopen = !1, openmarker && closeIW(openmarker);
    for (var a = 0; a < o.length; a++) o[a].classList.remove("map-open");
    $("#mapwrap").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(o) {
        citymap.fitBounds(citymap.bounds), fixMap(e), e.minzoom = e.getZoom()
    }), e.setOptions({
        scrollwheel: !1,
        draggable: !1
    }), mapwrap.onclick = function() {
        openMap(e, o)
    }, resizeMarkers(e.data.hoodmarkers, dot_smallsize), deActivateMarkers(e.data.hoodmarkers), trackMapClose()
}
var citymap, city = document.querySelector('meta[name="city"]').getAttribute("content"),
    mapdiv = document.getElementById("map"),
    mapwrap = document.getElementById("mapwrap"),
    mapicon = document.getElementById("map_icon"),
    mapclose = document.getElementById("mapclose"),
    mapoptions = {
        mapTypeControl: !1,
        streetViewControl: !1,
        styles: mapstyles.zoom,
        scrollwheel: !1,
        draggable: !1,
        disableDefaultUI: !0
    },
    citiesbreak, hoodsbreak = 16;
