var map;

// function addCurrentLocation(map) {
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function(position) {
//             var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };

//             var currentLocation = new google.maps.Marker({
//                 position: pos,
//                 icon: 'https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,0288D1',
//                 map: map
//             })

//             map.setCenter(pos);
//         }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//         });
//     } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//     }
// }





// function addMarker(map, center) {
//     var marker = new google.maps.Marker({
//         position: center.pos,
//         title: center.name,
//         icon: 'https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-container-bg_4x.png,icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1684-shopping-bag_4x.png&highlight=ff000000,9C27B0',
//         map: map
//     })

//     var info = new google.maps.InfoWindow({
//         content: center.details
//     })

//     marker.addListener('click', function() {
//         info.open(map, marker)
//     })
// }


// function markCenters(map) {
//     axios.get('data.json')
//         .then(function(response) {
//             data = response.data
//             for (var  i in data) {
//                 var center = data[i]
//                 addMarker(map, center)
//             }
//         })
//         .catch(function (error) {
//             console.log("Some error occured", error)
//         })
// }

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: 12.934031, lng: 77.610683},
//         zoom: 15
//     });

//     console.log("map added")
//     //addCurrentLocation(map)
//     //arkCenters(map)
// }

// initMap()

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);
// }

var vue = new Vue({
    el: '#rescue',

    mounted: function() {
        console.log("Here")
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.mapCenter,
            zoom: 15
        }); 

        this.getCenters()
        this.search()
    },

    data: {
        map: null,
        query: "Enter Location",
        suggestions: [],
        mapCenter: {lat: 12.934031, lng: 77.610683}
    },

    methods: {
        locateMe: function () {
            var vm = this

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    var currentLocation = new google.maps.Marker({
                        position: pos,
                        icon: 'https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container-bg_4x.png,icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=ff000000,0288D1',
                        map: vm.map
                    })

                    vm.mapCenter = pos
                    vm.map.setCenter(vm.mapCenter)
                }, function() {
                    console.log("Error")
                });
            }
        },

        addMarker: function (center) {
            var vm = this

            var marker = new google.maps.Marker({
                position: center.pos,
                title: center.name,
                icon: 'https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-container-bg_4x.png,icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1684-shopping-bag_4x.png&highlight=ff000000,9C27B0',
                map: vm.map
            })
        
            var info = new google.maps.InfoWindow({
                content: center.details
            })
        
            marker.addListener('click', function() {
                info.open(vm.map, marker)
            })
        },

        getCenters: function() {
            var vm = this;

            axios.get('data.json')
                .then(function(response) {
                    data = response.data
                    for (var  i in data) {
                        var center = data[i]
                        vm.addMarker(center)
                    }
                })
                .catch(function (error) {
                    console.log("Some error occured", error)
                })
        },

        search: function() {
            var request = {
                location: this.mapCenter,
                radius: '500',
                query: 'koramangala'
            };

            var service = new google.maps.places.PlacesService(this.map);
            service.textSearch(request, function(result) {
                console.log(result)
            })
        }
    }
})
