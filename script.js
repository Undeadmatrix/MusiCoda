function getArtistInfo(artist)
{
    var queryArt = "http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=" + artist + "&api_key=d35c0d49073f8b963f9d4b537fa18077&format=json";
    $.ajax({
        url: queryArt,
        method: "GET"
      }).then(function(response) {
        var artistName = $("<h1>").text("Information about: " + response.artist.name);
        var artistSummary = $("<p>").html(response.artist.bio.summary);
        var artistListeners = $("<p>").text(response.artist.stats.listeners + " Listeners on Last.FM");
        var artistPlaycount = $("<p>").text(response.artist.stats.playcount + " Current playcount on Last.FM");
        $("#contentDesc").append(artistName, artistSummary, artistListeners, artistPlaycount);
      });
}
function getYoutubeVid(artist)
{
    var queryURL = "https://www.googleapis.com/youtube/v3/search";
    
    $.ajax({
        url: queryURL,
        data: {
            key: 'AIzaSyChQJ-UQQHiOyUXb26uNi5IKpa8VQYDS3E',
            q: artist,
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            embedVideo(data)
        },
        error: function(response){
            console.log("Request Failed");
        }
    }).then(function(response) {
        console.log(response);
    });
}

function embedVideo(data) {
    var embed = $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    var vidTitle = $('h3').text(data.items[0].snippet.title)
    var vidDesc = $('.description').text(data.items[0].snippet.description)
    $("#contentVid").append(vidTitle, embed, vidDesc);
}

$("#artSub").on("click", function(event)
{
    event.preventDefault();
    var input = $("#band-search").val();
    console.log(input);
    getArtistInfo(input);
    getYoutubeVid(input);
});
