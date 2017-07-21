function getMarkers(list_id) {
    var markers = [];
    axios.get(`/api/lists/${list_id}/markers`)
        .then(function (response) {
            markers = response.data;
        })
        .then(function () {
            for (var i = 0; i < markers.length; i++) {
                // Add markers
                // console.log(markers[i]);
                renderMarker(markers[i]);
            }
        });
}

function renderMarker(marker) {
    console.log(marker);
    console.log('marker.id', marker.id);
    console.log('marker.user_id', marker.user_id);
    console.log('marker.title', marker.title);
    console.log('marker.description', marker.description);
    console.log('marker.position', marker.position);

    var $data0 = $("<td>").text(marker.id);
    $data1 = $("<td>").text(marker.user_id);
    $data2 = $("<td>").text(marker.title);
    $data3 = $("<td>").text(marker.description);
    $data4 = $("<td>").text(marker.position);
    var $row = $("<tr>");
    $row.append($data0);
    $row.append($data1);
    $row.append($data2);
    $row.append($data3);
    $row.append($data4);
    $(".table-markerinfo").empty();
    var $markers = $(".table-markerinfo").append($row);
}

function getLists() {
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
                    getMarkers(props.id);
                })
            }
        })
        .catch(function (error) {
            console.log("Error:", error);
        });
}
function getFavourites(user_id) {
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
                var $list = $("<li>");
                $list.append($row);
                var $lists = $(".list-favourites").append($list);

                $list.on('click', function (event) {
                    event.preventDefault();
                    getMarkers(props.id);
                })
            }
        })
        .catch(function (error) {
            console.log("Error:", error);
        });
}

$(document).ready(function () {

    getLists();
    getFavourites(1);

});