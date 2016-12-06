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

    function serCall(event) {
        event.preventDefault();
        var row = document.getElementById('middlePic');
        var episodeView = document.getElementById('picHolder');
        //var bigImg = document.getElementById('picId');
        // if (bigImg != null) {
        //     bigImg.innerHTML = "";
        // }
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
});

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
                pic3.setAttribute('onclick', seasons);
                pic3.setAttribute('id', "picId");
                var place = document.getElementById('middlePic');
                place.setAttribute('text-align', 'center');
                //var titleHolder = document.getElementById('theTitle')
                //    .innerHTML = title;
                place.appendChild(header);
                place.appendChild(pic3);
                place.appendChild(br);
                place.appendChild(br2);
                place.appendChild(br3);
                pic3.onload = $('#picId').click(seasons(event));
            }
        });
    }

    function seasons(event) {
        event.preventDefault();
        console.log(id);
        $.ajax({
            url: 'search-id?theID=' + id,//allData.id,
            type: 'GET',
            contentType: 'application/json',
            data: ' ',
            success: function(data) {
                console.log(data);
                $.ajax({
                    url: data + "/episodes/all/0/25/all/all",
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
        for (var i = 0; i < theSeasons.length; i++) {
            var row = document.getElementById('picHolder');
            var imgSrc = theSeasons[i].thumbnail_208x117;
            var col1 = document.createElement('div');
            col1.setAttribute('class', 'col-md-3');
            var card = document.createElement('div');
            card.setAttribute('class', 'card');
            var front = document.createElement('div');
            front.setAttribute('class', 'front' + i);
            var br1 = document.createElement('br');
            var br2 = document.createElement('br');
            var br3 = document.createElement('br');
            var br4 = document.createElement('br');
            var back = document.createElement('div');
            back.setAttribute('class', 'back' + i);

            var thePic = document.createElement('img');
            thePic.setAttribute('src', imgSrc);
            thePic.setAttribute('width', "100%");

            var theHead = document.createElement('h4');
            theHead.setAttribute('text-align', 'center');
            theHead.setAttribute('id', 'title');
            theHead.innerHTML = "Title: ";
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
            pTag.innerHTML = "Season: ";
            var seaNum = theSeasons[i].season_number;
            var pNode = document.createTextNode(seaNum);
            pTag.appendChild(pNode);

            var pTag2 = document.createElement('h4');
            pTag2.setAttribute('text-align', 'center');
            pTag2.setAttribute('id', 'episode');
            pTag2.innerHTML = "Episode: ";
            var epiNum = theSeasons[i].episode_number;
            var epiNode = document.createTextNode(epiNum);
            pTag2.appendChild(epiNode);

            var pBut = document.createElement('p');
            var aRef = document.createElement('a');
            aRef.innerHTML = "Watch now!";
            aRef.setAttribute('class', 'btn btn-default');
            pBut.appendChild(aRef);

            var myBr = document.createElement('br');

            card.appendChild(thePic);
            front.appendChild(br1);
            front.appendChild(theHead);
            front.appendChild(br2)
            front.appendChild(airDate);
            front.appendChild(br3);
            front.appendChild(pTag);
            front.appendChild(br4);
            front.appendChild(pTag2);
            card.appendChild(front);
            //card.appendChild(pBut);
            col1.appendChild(card);
            row.appendChild(col1);

            // col1.appendChild(thePic);
            // col1.appendChild(theHead);
            // col1.appendChild(headLabel);
            // col1.appendChild(thePara);
            // col1.appendChild(descLabel);
            // col1.appendChild(airDate);
            // col1.appendChild(dateLabel);
            // col1.appendChild(pTag);
            // col1.appendChild(seaNumLabel);
            // col1.appendChild(pTag2);
            // col1.appendChild(epiNumLabel);
            //col1.appendChild(pBut);
            //row.appendChild(col1);
            row.appendChild(myBr);
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

// $('#showSearch').submit(function(event) {
//     event.preventDefault();
//     $.getJSON("/show-search", function(data) {
//         var title = $("input[name=showTitle]").val();
//         var request = data.
//         alert("console test");
//         $.ajax({
//             type: "GET",
//             url: request,
//             dataType: "json",
//             data: " ",
//             success: function(data) {
//                 console.log("it worked!");
//                 console.log(data);
//             }
