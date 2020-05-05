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
            maxResults: 5,
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





function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
      var artistName = $("<h1>").text(response.name);
      var artistURL = $("<a>").attr("href", response.url).append(artistName);
      var artistImage = $("<img>").attr("src", response.thumb_url);
      var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
      var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      // Empty the contents of the artist-div, append the new artist content
      $("#artist-div").empty();
      $("#contentDesc").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
    });
  }

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBandsInTown(inputArtist);
});


$("#artSub").on("click", function(event)
{
    event.preventDefault();
    var input = $("#band-search").val();
    console.log(input);
    getArtistInfo(input);
    getYoutubeVid(input);
    searchBandsInTown(input);
});
