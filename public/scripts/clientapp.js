var markers = [];
var markerOnMap = [];
var selectedList = 1;

// Render Marker Info Header
var renderMarkerHeader = function (list) {
    console.log("list", list.name);
    $(".header-all-markers").empty();
    $(".header-all-markers").append(list.name);
    $(".table-markerinfo").empty();
}

var getMarkersFromList = function (list) {

    renderMarkerHeader(list);
    selectedList = list.id;
    clearMarkers();


    axios.get(`/api/lists/${list.id}/markers`)
        .then(function (response) {
            markers = response.data;
        })
        .then(function () {
            for (var i = 0; i < markers.length; i++) {
                // Add markers
                // console.log(markers[i]);
                renderMarker(markers[i]);
                addMarkerToMap(markers[i]);
            }
        });
}

var renderMarker = function (marker) {

    // Render Marker Info Table
    $data2 = $("<td>").text(marker.title);
    $data3 = $("<td>").text(marker.description);
    $data4 = $("<td>").text(marker.position);
    var $editButtons = $(`<td><i id="garbage-can" class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
                        <i id="pencil-button" class="fa fa-pencil fa-2x" aria-hidden="true"></i><td>`);
    var $row = $("<tr>");
    $row.append($data2);
    $row.append($data3);
    $row.append($editButtons);
    var $markers = $(".table-markerinfo").append($row);

    $starButton.click(function () {
        $(this).toggleClass('star-button-active');
    });
}

// Deletes all markers from the map
var clearMarkers = function () {
    for (var i = 0; i < markerOnMap.length; i++) {
        markerOnMap[i].setMap(null);
    }
    markerOnMap = [];
}

var getLists = function () {
    // Get lists
    axios.get('/api/lists')
        .then(function (response) {
            // console.log(response);
            var lists = response.data;
            // Loop through lists
            for (var i = 0; i < lists.length; i++) {
                // Display list
                displayList(lists[i]);
            }
            // Display list function
            function displayList(props) {
                // console.log('Props:', props);
                var $row = $(`<a href="#"></a>`).text(props.name);
                var $list = $("<li>");
                $list.append($row);
                var $lists = $(".list-all").append($list);

                $list.on('click', function (event) {
                    event.preventDefault();
                    getMarkersFromList(props);
                    $('.hide-table-until-click').show();
                })
            }
        })
        .catch(function (error) {
            console.log("Error:", error);
        });
}

var getContribs = function (user_id) {
    // Get lists
    axios.get(`/api/lists/${user_id}/contributions`)
        .then(function (response) {
            // console.log(response);
            var lists = response.data;
            // console.log("response.data", response.data);
            // Loop through lists
            for (var i = 0; i < lists.length; i++) {
                // Display list
                displayList(lists[i]);
            }
            // Display list function
            function displayList(list) {
                // console.log('Props:', props);
                var $data0 = $("<td>").text(list.name);
                var $data1 = $("<td>").text(list.description);
                var $editButtons = $(`<td><i id="garbage-can" class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
                        <i id="pencil-button" class="fa fa-pencil fa-2x" aria-hidden="true"></i><td>`);
                var $starButton = $(`<td><form action="/api/lists/${list.id}/favourites" method="POST">
                    <button name="ToggleFavourite"><i class="fa fa-star-o fa-2x" aria-hidden="true"></i></button>
                </form></td>`);
                var $row = $("<tr>");
                $row.append($data0);
                $row.append($data1);
                $row.append($editButtons);
                $row.append($starButton);
                var $lists = $(".table-contrib-lists").append($row);


                // This will not work here
                // $(".fav-button").on('click', function (event) {
                //     event.preventDefault();
                //     console.log("Clicked on favourite", event);
                // })
            }
        })
        .catch(function (error) {
            console.log("Error:", error);
        });
}

var getFavourites = function (user_id) {
    // Get lists
    axios.get(`/api/users/${user_id}/favourites`)
        .then(function (response) {
            // console.log(response);
            var lists = response.data;
            // Loop through lists
            for (var i = 0; i < lists.length; i++) {
                // Display list
                displayList(lists[i]);
            }
            // Display list function
            function displayList(props) {
                // console.log('Props:', props);
                var $row = $(`<a href="#"></a>`).text(props.name);
                var $starButton = $(`<td><i id="star-button" class="fa fa-star-o fa-2x" aria-hidden="true"></i></td>`);
                var $list = $("<li>");
                $list.append($row);
                var $lists = $(".list-favourites").append($list);

                $list.on('click', function (event) {
                    event.preventDefault();
                    getMarkersFromList(props);
                })
            }
        })
        .catch(function (error) {
            console.log("Error:", error);
        });
}

var setUpMapListener = function () {
    // Listen for click on map
    map.addListener('click', function (event) {
        var props = {
            list_id: selectedList,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            title: "unnamed",
            description: "no description"
        }
        // console.log(props);
        addMarkertoDB(props);
        addMarkerToMap(props);
    });
}

var addMarkertoDB = function (props) {
    var params = new URLSearchParams();
    params.append('list_id', props.list_id);
    params.append('user_id', Window.userInfo);
    params.append('lat', props.lat);
    params.append('lng', props.lng);
    params.append('title', props.title);
    params.append('description', props.description);
    axios.post('/api/markers', params)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Add clicked marker info to info card, show card once clicked
var showMarkerInfo = function (clickedMarker) {
    var $daysAgoTime = moment(clickedMarker.created_at).fromNow();
    // Render Selected Marker Header
    $(".header-selected-marker").empty();
    $(".header-selected-marker").append(clickedMarker.title);
    // Render Selected Marker Info Table
    $(".marker-description").empty();
    $(".marker-description")
        .append(clickedMarker.description);
    $(".marker-position").empty();
    $(".marker-position")
        .append(`${clickedMarker.position}`);
    $(".marker-timestamp").empty();
    $(".marker-timestamp")
        .append($daysAgoTime);

        $('#sidebar-card').show();
}

// Add Marker Function
var addMarkerToMap = function (props) {
    props['coords'] = {};
    props.coords['lat'] = props.lat;
    props.coords['lng'] = props.lng;
    // console.log('Props:', props);
    marker = new google.maps.Marker({
        id: props.id,
        user_id: props.user_id,
        created_at: props.created_at,
        title: props.title,
        position: props.coords,
        map: map,
        description: props.description
        //icon:props.iconImage
    });
    marker.addListener('click', function () {
        showMarkerInfo(this);
    });
    marker.addListener('rightclick', function () {
        console.log("Marker Info:",this);
        showMarkerInfo(this);

        $('#myModal').modal('toggle');
    });
    markerOnMap.push(marker);
}

var setUpMaps = function () {

    // Get markers
    axios.get('/api/markers')
        .then(function (response) {
            // console.log(response);
            var markers = response.data;
            // Loop through markers
            for (var i = 0; i < markers.length; i++) {
                // Add marker
                // console.log(markers[i]);
                // addMarker(markers[i]);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
