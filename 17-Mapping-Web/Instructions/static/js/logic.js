//runs on page load
$(document).ready(function() {
    let url = $('#timeFilter').val();
    makeMap(url, -1);

    //event listener on dropdown change
    $("#timeFilter, #magFilter").change(function() {
        let url = $('#timeFilter').val();
        let minMag = $('#magFilter').val();
        let vizText = $("#timeFilter option:selected").text();
        $('#vizTitle').text(`Earthquakes in the ${vizText}`);
        makeMap(url, minMag);
    });
});

function makeMap(url, minMag) {
    //clear map
    $('#mapParent').empty();
    $('#mapParent').append('<div style="height:700px" id="map"></div>');

    // Adding tile layer to the map
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
    });

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-streets-v11",
        accessToken: API_KEY
    });

    var icons = {
        earthQuake: L.ExtraMarkers.icon({
            icon: "ion-alert",
            iconColor: "white",
            markerColor: "blue-dark",
            shape: "star"
        }),
    };

    // url is gotten from the dropdown
    d3.json(url).then(function(response) {
        // console.log(response);

        //create markers and heatmap
        var markers = L.markerClusterGroup();
        var heatArray = [];
        var circles = [];

        var earthquakes = response.features;

        earthquakes.forEach(function(quake) {
            if ((quake.geometry.coordinates[1]) && (quake.geometry.coordinates[0])) {
                if (quake.properties.mag >= minMag) { //magnitude filter
                    //marker for cluster
                    let coords = L.marker([+quake.geometry.coordinates[1], +quake.geometry.coordinates[0]], {
                        icon: icons.earthQuake,
                    }).bindPopup(`<h2>Place: ${quake.properties.place}</h2><hr><h4>Mag: ${quake.properties.mag}</h4><hr><h4>Time: ${new Date(quake.properties.time)}</h4>`);
                    markers.addLayer(coords);

                    //heatmap points
                    heatArray.push([+quake.geometry.coordinates[1], +quake.geometry.coordinates[0]]);

                    //circle points
                    let circle = L.circle([+quake.geometry.coordinates[1], +quake.geometry.coordinates[0]], {
                        fillOpacity: 0.8,
                        color: "white",
                        fillColor: getCircleColor(quake.properties.mag),
                        radius: getMarkerSize(quake.properties.mag)
                    }).bindPopup(`<h2>Place: ${quake.properties.place}</h2><hr><h5>Mag: ${quake.properties.mag}</h5><hr><h5>Time: ${new Date(quake.properties.time)}</h5>`);

                    circles.push(circle);
                }
            }
        });

        // read in second data set
        var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
        d3.json(tectonicPlatesURL).then(function(plates) {
            let plateLayer = L.geoJson(plates, {
                // Style each feature (in this case a tectonic plate)
                style: function(feature) {
                    return {
                        color: "orange",
                        weight: 1.5
                    };
                }
            });

            //create heatmap layer
            var heat = L.heatLayer(heatArray, {
                radius: 60,
                blur: 40
            });

            //create circle layer
            var circleLayer = L.layerGroup(circles);

            // Create a baseMaps object to contain the streetmap and darkmap
            var baseMaps = {
                "Street": streetmap,
                "Dark": darkmap,
                "Light": lightmap,
                "Satellite": satellitemap,
                "Outdoors": outdoors
            };

            // Create an overlayMaps object here to contain the "State Population" and "City Population" layers
            var overlayMaps = {
                "Heatmap": heat,
                "Markers": markers,
                "Circles": circleLayer,
                "Tectonic Plates": plateLayer
            };

            // Creating map object
            var myMap = L.map("map", {
                center: [37.0902, -95.7129],
                zoom: 5,
                layers: [streetmap, markers, plateLayer],
                fullscreenControl: true,
            });

            // Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
            myMap.addLayer(markers);
            L.control.layers(baseMaps, overlayMaps).addTo(myMap);

        });
    });
}

//write some functions
function getMarkerSize(mag) {
    let radius = 50000;
    if (mag > 0) {
        radius = mag * 50000;
    }
    return radius;
}

function getCircleColor(mag) {
    let color = "";
    if (mag >= 5) {
        color = "#00308F";
    } else if (mag >= 4) {
        color = "#00308F";
    } else if (mag >= 3) {
        color = "#0C56BC";
    } else if (mag >= 2) {
        color = "#0C56BC";
    } else if (mag >= 1) {
        color = "#187DE9";
    } else {
        color = "#187DE9";
    }

    return color;
}