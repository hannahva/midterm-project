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
                var $lists = $(".list-favourites").append(`<li><a href="/api/lists/${props.id}">${props.name}</a></li>`);
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}

$(document).ready(function () {
    getLists();
});