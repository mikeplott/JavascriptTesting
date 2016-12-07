var key;
var id;

$.get("/user", function(data) {
    document.getElementById("userInfo").innerHTML = "welcome " + data.username + "!";
    return data;
});

$.get('/show-search', function(data) {
    key = data;
    return data;
});

$(function() {
    $('#showSearch').submit(serCall);
});

$(function() {
    $('#movieSearch').submit(localCall);
});

    function localCall(event) {
        event.preventDefault();
        var row = document.getElementById('middlePic');
        var episodeView = document.getElementById('picHolder');
        row.innerHTML = "";
        episodeView.innerHTML = "";
        var userInput = $(this);
        console.log(userInput);
        var movie = userInput.find('[name=movieSearch]').val();
        console.log(movie);
        $.ajax({
            url: '/source-search',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "movie": movie
            }),
            success: function(data) {
                sourceCall(data);
                }
            });
    }

function sourceCall(data) {
    event.preventDefault();
    console.log(data);
    $.ajax({
        url: data + "/fuzzy",
        type: 'GET',
        data: ' ',
        success: function(data) {
            displayMovies(data);
        }
    })
}

function getMovie(id) {
    console.log(id);
    var theID = id;
    console.log(theID);
    $.ajax({
        url: 'show-search',
        type: 'GET',
        data: ' ',
        success: function(theID, data) {
            var stuff = data;
            console.log(stuff);
            console.log(data);
            console.log(theID);
            apiMovieSearch(data, theID);
        }
    })
}

function apiMovieSearch(data, theID) {
    console.log(theID);
    var myID = theID;
    console.log(myID);
    $.ajax({
        url: data + 'movie/' + myID,
        type: 'GET',
        data: ' ',
        success: function(data) {
            console.log(data);
            var row = document.getElementById('picHolder');

        }
    })
}


function displayMovies(data) {
    var results = data.results;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
        var name = results[i].original_title;
        var photo = results[i].poster_240x342;
        var rating = results[i].rating;
        var release = results[i].release_date;
        var rotTom = results[i].rottentomatoes;
        var id = results[i].id;
        var movieID = results[i].themoviedb;
        var col = document.createElement('div');

        var img = document.createElement('img');
        img.setAttribute('height', '300px');
        img.setAttribute('width', '280px');

        var title = document.createElement('h4');
        title.innerHTML = 'Title: ';

        var theRating = document.createElement('h4');
        theRating.innerHTML = 'Rating: ';

        var theRelease = document.createElement('h4');
        theRelease.innerHTML = 'Date: ';

        var row = document.createElement('div');
        row.setAttribute('class', 'theDisplay');
        row.setAttribute('id', 'theMovieStuff');

        var nameNode = document.createTextNode(name);
        var ratingNode = document.createTextNode(rating);
        var releaseNode = document.createTextNode(release);
        var container = document.getElementById('picHolder');

        img.setAttribute('src', photo);
        title.appendChild(nameNode);
        theRating.appendChild(ratingNode);
        theRelease.appendChild(releaseNode);

        col.setAttribute('class', 'card movie');
        col.setAttribute('id', 'movieDisplay');
        col.setAttribute('onClick', theInfo(id));
        col.appendChild(img);
        col.appendChild(title);
        col.appendChild(theRating);
        col.appendChild(theRelease);

        row.setAttribute('class', 'col-md-3');
        row.appendChild(col);
        var myContainer = document.createElement('div');
        myContainer.setAttribute('class', 'col-md-3 links freeView');
        myContainer.setAttribute('id', 'info' + id);
        myContainer.setAttribute('name', 'freeCol' + id);

        var myContainer2 = document.createElement('div');
        myContainer2.setAttribute('class', 'col-md-3 links subView');
        myContainer2.setAttribute('id', 'info' + id + 1);
        myContainer2.setAttribute('name', 'subCol' + id + 1);

        var myContainer3 = document.createElement('div');
        myContainer3.setAttribute('class', 'col-md-3 links purView');
        myContainer3.setAttribute('id', 'info' + id + 2);
        myContainer3.setAttribute('name', 'purCol' + id + 2);

        var myRow = document.createElement('div');
        myRow.setAttribute('class', 'col-md-12');
        myRow.setAttribute('id', 'rowView');

        var freeLabel = document.createElement('label');
        freeLabel.setAttribute('for', 'freeCol' + id);

        var subLabel = document.createElement('label');
        subLabel.setAttribute('for', 'subCol' + id + 1);

        var purLabel = document.createElement('label');
        purLabel.setAttribute('for', 'purCol' + id + 2);

        // myContainer.append(freeLabel);
        // myContainer2.append(subLabel);
        // myContainer3.append(purLabel);


        myRow.appendChild(row);
        //myRow.appendChild(freeLabel);
        myRow.appendChild(myContainer);
        //myRow.appendChild(subLabel);
        myRow.appendChild(myContainer2);
        //myRow.appendChild(purLabel);
        myRow.appendChild(myContainer3);

        container.appendChild(myRow);
    }
}

function theInfo(id) {
    event.preventDefault();
    localApiCall(id);
}

$.when(displayData).then(localApiCall);

function localApiCall(id) {
    console.log(id);
    var i;
    var theNum = i++;
    $.ajax({
        url: '/api-url',
        type: 'GET',
        data: ' ',
        success: function(data) {
            guideBoxApiCall(data, id, theNum);
        }
    });
}

function guideBoxApiCall(data, id, theNum) {
    $.ajax({
        url: data + "/movie/" + id,
        type: 'GET',
        data: ' ',
        success: function(data) {
                var theContainer = document.getElementById('picHolder');
                var free = data.free_web_sources;
                var subService = data.subscription_web_sources;
                var purService = data.purchase_web_sources;
                var id = data.id;

                var bigContainer = $('#rowView');

                var row = $('#info' + id);
                var row2 = $('#info' + id + 1);
                var row3 = $('#info' + id + 2);



                if (free != null) {
                    for (var i = 0; i < free.length; i++) {
                        var freeForm = document.createElement('form');
                        freeForm.setAttribute('action', free[i].link);
                        var freeBut = document.createElement('input');
                        freeBut.setAttribute('value', free[i].display_name);
                        freeBut.setAttribute('type', 'submit');
                        freeBut.setAttribute('class', 'btn btn-success free');
                        freeForm.appendChild(freeBut);
                        row.append(freeForm);
                    }
                }

                if (subService != null) {
                    for (var k = 0; k < subService.length; k++) {
                        var subForm = document.createElement('form');
                        subForm.setAttribute('action', subService[k].link);
                        var subBtn = document.createElement('input');
                        subBtn.setAttribute('value', subService[j].display_name);
                        subBtn.setAttribute('type', 'submit');
                        subBtn.setAttribute('class', 'btn btn-success sub');
                        subForm.appendChild(subBtn);
                        row2.append(subForm);
                    }
                }

                if (purService != null) {
                    for (var j = 0; j < purService.length; j++) {
                        purForm = document.createElement('form');
                        purForm.setAttribute('action', purService[j].link);
                        var purBtn = document.createElement('input');
                        purBtn.setAttribute('value', purService[j].display_name);
                        purBtn.setAttribute('type', 'submit');
                        purBtn.setAttribute('class', 'btn btn-success pur');
                        purForm.appendChild(purBtn);
                        row3.append(purForm);
                    }
                }

                if (purService && subService && free == null) {
                    var noInfo = $('#nilHolder');
                    var addDiv = document.createElement('div');
                }
            }
        });
    }

    function serCall(event) {
        event.preventDefault();
        var row = document.getElementById('middlePic');
        var episodeView = document.getElementById('picHolder');
        row.innerHTML = "";
        episodeView.innerHTML = "";
        var f = $(this);
        var show = f.find('[name=showTitle]').val();
        $.ajax({
            url: '/url-encode',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "show": show
            }),
            success: function(data) {
                displayData(data);
            }
        });
    }

    function displayData(data) {
        console.log(data);
        $.ajax({
            url: key + data + "/fuzzy",
            type: 'GET',
            data: ' ',
            success: function(data) {
                console.log(data);
                var allData = data.results[0];
                var title = data.results[0].title;
                var image3 = data.results[0].artwork_448x252;
                var pic3 = document.createElement('img');
                var br = document.createElement('br');
                var br2 = document.createElement('br');
                var br3 = document.createElement('br');
                var header = document.createElement('h1');
                header.innerHTML = title;
                id = allData.id;
                pic3.setAttribute('src', image3);
                pic3.setAttribute('id', "picId");
                pic3.setAttribute('onclick', seasons());
                var place = document.getElementById('middlePic');
                place.setAttribute('text-align', 'center');
                place.appendChild(header);
                place.appendChild(pic3);
                place.appendChild(br);
                place.appendChild(br2);
                place.appendChild(br3);
            }
        });
    }

    function seasons(event) {
        console.log(id);
        $.ajax({
            url: 'search-id?theID=' + id,
            type: 'GET',
            contentType: 'application/json',
            data: ' ',
            success: function(data) {
                console.log(data);
                $.ajax({
                    url: data + "/episodes/all/0/50/all/all/true?reverse_ordering=true",
                    type: 'GET',
                    data: ' ',
                    success: function(theData) {
                        displayEpisodes(theData);
                    }
                });
            }
        });
    }

    function displayEpisodes(theData) {
        var theSeasons = theData.results;
        console.log(theSeasons);
        for (var i = 0; i < theSeasons.length; i++) {

            var row = document.getElementById('picHolder');
            var imgSrc = theSeasons[i].thumbnail_208x117;

            var col1 = document.createElement('div');
            col1.setAttribute('class', 'col-md-4 flip');

            var card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('id', 'theCard');
            card.setAttribute('onClick', $('.card').flip());

            var front = document.createElement('div');
            front.setAttribute('class', 'face front');

            var br1 = document.createElement('br');
            var br2 = document.createElement('br');
            var br3 = document.createElement('br');
            var br4 = document.createElement('br');
            var br5 = document.createElement('br');

            var back = document.createElement('div');
            back.setAttribute('class', 'face back');
            back.setAttribute('id', 'back');

            var thePic = document.createElement('img');
            thePic.setAttribute('src', imgSrc);
            thePic.setAttribute('width', "100%");

            var backPic = document.createElement('img');
            backPic.setAttribute('src', imgSrc);
            backPic.setAttribute('width', '100%');

            var theHead = document.createElement('h4');
            theHead.setAttribute('text-align', 'center');
            theHead.setAttribute('id', 'title');
            theHead.innerHTML = " Title: ";
            var headTitle = theSeasons[i].original_title;
            var headNode = document.createTextNode(headTitle);
            theHead.appendChild(headNode);

            var thePara = document.createElement('h4');
            thePara.setAttribute('text-align', 'center');
            thePara.setAttribute('id', 'desc');
            var desc = theSeasons[i].overview;
            var paraNode = document.createTextNode(desc);
            thePara.appendChild(paraNode);

            var airDate = document.createElement('h4');
            airDate.setAttribute('text-align', 'center');
            airDate.setAttribute('id', 'epiDate');
            airDate.innerHTML = "Airdate: ";
            var theDate = theSeasons[i].first_aired;
            var dateNode = document.createTextNode(theDate);
            airDate.appendChild(dateNode);

            var pTag = document.createElement('h4');
            pTag.setAttribute('text-align', 'center');
            pTag.setAttribute('id', 'seasonNumber');
            pTag.innerHTML = " Season: ";
            var seaNum = theSeasons[i].season_number;
            var pNode = document.createTextNode(seaNum);
            pTag.appendChild(pNode);

            var pTag2 = document.createElement('h4');
            pTag2.setAttribute('text-align', 'center');
            pTag2.setAttribute('id', 'episode');
            pTag2.innerHTML = " Episode: ";
            var epiNum = theSeasons[i].episode_number;
            var epiNode = document.createTextNode(epiNum);
            pTag2.appendChild(epiNode);

            var webSourcesList = theSeasons[i].tv_everywhere_web_sources;
            for (var k = 0; k < webSourcesList.length; k++) {
                var webSources = webSourcesList[k].link;
                var webName = webSourcesList[k].display_name;
            }

            var subSourcesList = theSeasons[i].subscription_web_sources;
            for (var j = 0; j < subSourcesList.length; j++) {
                var subSources = subSourcesList[j].link;
                var subName = subSourcesList[j].display_name;
            }

            var tvWebForm = document.createElement('form');
            tvWebForm.setAttribute('action', webSources);

            var tvWebBtn = document.createElement('input');
            tvWebBtn.setAttribute('type', 'submit');
            tvWebBtn.setAttribute('value', webName);
            tvWebBtn.setAttribute('class', 'btn btn-success');

            var subWebForm = document.createElement('form');
            subWebForm.setAttribute('action', subSources);

            var subWebBtn = document.createElement('input');
            subWebBtn.setAttribute('type', 'submit');
            subWebBtn.setAttribute('value', subName);
            subWebBtn.setAttribute('class', 'btn btn-success');

            var myBr = document.createElement('br');

            front.appendChild(thePic);
            front.appendChild(br1);
            front.appendChild(theHead);
            front.appendChild(br2)
            front.appendChild(airDate);
            front.appendChild(br3);
            front.appendChild(pTag);
            front.appendChild(br4);
            front.appendChild(pTag2);

            back.appendChild(backPic);
            back.appendChild(br5);
            back.appendChild(thePara);

            card.appendChild(front);
            card.appendChild(back);

            col1.appendChild(card);

            tvWebForm.appendChild(tvWebBtn);

            subWebForm.appendChild(subWebBtn);

            if (webSources != null) {
                col1.appendChild(tvWebForm);
            }
            if (subSources != null) {
                col1.appendChild(subWebForm);
            }

            row.appendChild(col1);
        }
    }

function theSearch() {
    $.ajax({
        url: 'search-id',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({
            "id": id
        }),
        success: function(data) {
            console.log(data);
            $.ajax({
                url: data,
                type: 'GET',
                contentType: 'application/json',
                data: ' ',
                success: function(theData) {
                    console.log(theData);
                }
            });
        }
    });
}
