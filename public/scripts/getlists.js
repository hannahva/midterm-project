function getMarkers(list_id) {
    axios.get(`/api/lists/${list_id}/markers`)
        .then(function (response) {
            var markers = response.data;
            for (var i = 0; i < markers.length; i++) {
                // Add markers
                console.log(markers[i]);
                // alert(markers[i]);
            }
        });
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
                var $row = $(`<a href="">${props.name}</a>`);
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

});