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
                console.log('Props:', props);
                var $table = $()

            }

        })
        .catch(function (error) {
            console.log(error);
        });
}

$(document).ready(function () {
    getLists();
});

var $header = $("<header>").addClass('tweet-header');
$header.append($(`<img src="${tweet.user.avatars.small}"/>`));
$header.append($(`<h1>${tweet.user.name}</h1>`));
$header.append($(`<h2>${tweet.user.handle}</h2>`));