function CityMap(list) {
    this.list = list;

    this.northernmost = function() {
        var max = list[0];
        for (var i = 0; i < list.length; i++) {
            if (max.longitude < list[i].longitude) {
                max = list[i];
            }
        }
        return ("The name of the northernmost city is " + max.city + ".");
    }

    this.southernmost = function() {
        var min = list[0];
        for (var i = 0; i < list.length; i++) {
            if (min.longitude > list[i].longitude) {
                min = list[i];
            }
        }
        return ("The name of the southernmost city is " + min.city + ".");
    }

    this.easternmost = function() {
        var max = list[0];
        for (var i = 0; i < list.length; i++) {
            if (max.latitude < list[i].latitude) {
                max = list[i];
            }
        }
        return ("The name of the easternmost city is " + max.city + ".");
    }

    this.westernmost = function() {
        var min = list[0];
        for (var i = 0; i < list.length; i++) {
            if (min.latitude > list[i].latitude) {
                min = list[i];
            }
        }
        return ("The name of the westernmost city is " + min.city + ".");
    }

    this.nearestCity = function(coordinate_x2, coordinate_y2) {
        var distance_list = [];
        for (var i = 0; i < list.length; i++) {
            var coordinate_x1 = list[i].latitude;
            var coordinate_y1 = list[i].longitude;
            var length = Math.sqrt(Math.pow((coordinate_x2 - coordinate_x1), 2) + Math.pow((coordinate_y2 - coordinate_y1), 2));
            distance_list.push(length);
        }
        nearest_distance = distance_list[0];
        var index = 0;
        for (var i = 0; i < distance_list.length; i++) {
            if (nearest_distance > distance_list[i]) {
                nearest_distance = distance_list[i];
                index = i;
            }
        }
        return ("The name of the city that is closest is " + list[index].city + ".");
    }

    this.abbreviations = function() {
        var string_abbr = [];
        for (var i = 0; i < list.length; i++) {
            var city_abbr = list[i].city.slice(-2);
            string_abbr.push(city_abbr);
        }
        let without_duplicates = [];
        for (let abbr of string_abbr) {
            if (!without_duplicates.includes(abbr)) {
                without_duplicates.push(abbr);
            }
        }
        return without_duplicates.join(" ");
    }

    this.search_by_states = function(state) {
        var list_cities = [];
        for (var i = 0; i < list.length; i++) {
            if (state.toUpperCase() == list[i].city.slice(-2)) {
                list_cities.push(list[i].city.slice(0, -4));
            }
        }
        return list_cities;
    }

    this.completedForm = function() {
        var city_name = document.getElementById("city").value;
        city_name = city_name.charAt(0).toUpperCase() + city_name.substr(1);
        var state_name = document.getElementById("state").value;
        var latitude_coordinate = document.getElementById("latitude").value;
        var longitude_coordinate = document.getElementById("longitude").value;
        var city_state_names = city_name + ", " + state_name.toUpperCase();
        var new_city_object = {
            city: city_state_names,
            latitude: parseFloat(latitude_coordinate),
            longitude: parseFloat(longitude_coordinate)
        };
        this.list.push(new_city_object);

        console.log(new_city_object);
    }

    this.save_in_localSt = function() {
        var Obj_cities = JSON.stringify(this.list);
        localStorage.setItem("cities", Obj_cities);
        return JSON.parse(localStorage.getItem("cities"));
    }

    this.webixDonutChart = function() {
        var result = [];
        for (var i = 0; i < list.length; i++) {
            var state = list[i].city.slice(-2);
            var found = false;
            for (var j = 0; j < result.length; j++) {
                var element = result[j];
                if (element.state == state) {
                    element.count += 1;
                    found = true;
                    break;
                }
            }
            if (!found) {
                var color = 0;
                color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
                result.push({
                    count: 1,
                    state: state,
                    color: color
                });
            }
        }
        return result;
    }

    webix.ready(function() {
        webix.ui({
            view: "chart",
            type: "donut",
            container: "donutChart",
            value: "#count#",
            color: "#color#",
            borderless: true,
            legend: {
                width: 75,
                align: "right",
                valign: "middle",
                template: "#state#"
            },
            pieInnerText: "#count#",
            shadow: 0,
            gradient: true,
            height: 600,
            width: 400,
            data: CM.webixDonutChart()
        })
    });
}

var list = [{
        city: "Nashville, TN",
        latitude: 36.17,
        longitude: -86.78
    },
    {
        city: "New York, NY",
        latitude: 40.71,
        longitude: -74.00
    },
    {
        city: "Atlanta, GA",
        latitude: 33.75,
        longitude: -84.39
    },
    {
        city: "Denver, CO",
        latitude: 39.74,
        longitude: -104.98
    },
    {
        city: "Seattle, WA",
        latitude: 47.61,
        longitude: -122.33
    },
    {
        city: "Los Angeles, CA",
        latitude: 34.05,
        longitude: -118.24
    },
    {
        city: "Memphis, TN",
        latitude: 35.15,
        longitude: -90.05
    }
];

CM = new CityMap(list);


// The names of the northernmost, southernmost, easternmost or westernmost cities:

CM.northernmost();
CM.southernmost();
CM.easternmost();
CM.westernmost();

// The names of the cities that is closest:

CM.nearestCity(30.1, -70.9);

// The state abbreviations from the list of cities:

CM.abbreviations();

// Advanced tasks:

// The list of cities of the state:

CM.search_by_states("tn");

// The tool to add cities with coordinates and states:

// CM.completedForm (); // click button "Submit"

// A possibility to save the list of cities in a localStorage:

CM.save_in_localSt();

// WEBIX

// CM.webixDonutChart ();
