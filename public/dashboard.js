var key;
var id;

$.get("/user", function(data) {
    console.log(data);
    console.log(data.id);
    console.log(data.username);
    console.log(data.password);
    document.getElementById("userInfo").innerHTML = "welcome " + data.username + "!";
    document.create
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
                $.ajax({
                    url: key + data + "/fuzzy",
                    type: 'GET',
                    data: ' ',
                    success: function(data) {
                        var allData = data.results[0];
                        var title = data.results[0].title;
                        var image3 = data.results[0].artwork_448x252;
                        var pic3 = document.createElement('img');
                        var br = document.createElement('br');
                        var br2 = document.createElement('br');
                        var br3 = document.createElement('br');
                        id = allData.id;
                        pic3.setAttribute('src', image3);
                        pic3.setAttribute('onclick', seasons);
                        pic3.setAttribute('id', "picId");
                        var place = document.getElementById('theResults');
                        place.setAttribute('text-align', 'center');
                        var titleHolder = document.getElementById('theTitle')
                            .innerHTML = title;
                        place.appendChild(pic3);
                        place.appendChild(br);
                        place.appendChild(br2);
                        place.appendChild(br3);
                        pic3.onload = $('#picId').click(seasons);

                        function seasons(event) {
                            event.preventDefault();
                            $.ajax({
                                url: 'search-id?theID=' + allData.id,
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
                                            console.log(theData);
                                            var theSeasons = theData.results;
                                            for (var i = 0; i < theSeasons.length; i++) {
                                                console.log(theSeasons);
                                                var row = document.getElementById('picHolder');
                                                var imgSrc = theSeasons[i].thumbnail_304x171;
                                                var col1 = document.createElement('div');
                                                col1.setAttribute('class', 'col-lg-4');
                                                col1.setAttribute('text-align', 'center');

                                                var thePic = document.createElement('img');
                                                thePic.setAttribute('class', 'img-circle');
                                                thePic.setAttribute('src', imgSrc);
                                                thePic.setAttribute('width', '200');
                                                thePic.setAttribute('height', '200');

                                                var theHead = document.createElement('h2');
                                                theHead.setAttribute('text-align', 'center');
                                                var headTitle = theSeasons[i].original_title;
                                                var headNode = document.createTextNode(headTitle);
                                                theHead.appendChild(headNode);

                                                var thePara = document.createElement('p');
                                                thePara.setAttribute('text-align', 'center');
                                                var desc = theSeasons[i].overview;
                                                var paraNode = document.createTextNode(desc);
                                                theHead.appendChild(headNode);

                                                var airDate = document.createElement('p');
                                                airDate.setAttribute('text-align', 'center');
                                                var theDate = theSeasons[i].first_aired;
                                                var dateNode = document.createTextNode(theDate);
                                                airDate.appendChild(dateNode);

                                                var pTag = document.createElement('p');
                                                pTag.setAttribute('text-align', 'center');
                                                var seaNum = theSeasons[i].season_number;
                                                var pNode = document.createTextNode(seaNum);
                                                pTag.appendChild(pNode);

                                                var pTag2 = document.createElement('p');
                                                pTag2.setAttribute('text-align', 'center');
                                                var epiNum = theSeasons[i].episode_number;
                                                var epiNode = document.createTextNode(epiNum);
                                                pTag2.appendChild(epiNode);

                                                var pBut = document.createElement('p');
                                                var aRef = document.createElement('a');
                                                aRef.innerHTML = "Watch now!";
                                                aRef.setAttribute('class', 'btn btn-default');
                                                pBut.appendChild(aRef);

                                                col1.appendChild(thePic);
                                                col1.appendChild(theHead);
                                                col1.appendChild(thePara);
                                                col1.appendChild(airDate);
                                                col1.appendChild(pTag);
                                                col1.appendChild(pTag2);
                                                col1.appendChild(pBut);
                                                row.appendChild(col1);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        return id;
                    }
                });
            }
        });
    }
});

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

$('#showSearch').submit(function(event) {
    event.preventDefault();
    $.getJSON("/show-search", function(data) {
        var title = $("input[name=showTitle]").val();
        var request = data.
        alert("console test");
        $.ajax({
            type: "GET",
            url: request,
            dataType: "json",
            data: " ",
            success: function(data) {
                console.log("it worked!");
                console.log(data);
            }
        })
    });
});
