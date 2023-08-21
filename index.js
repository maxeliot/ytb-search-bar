var YOUTUBE_DATA_API_KEY = 'YOUR_API_KEY';

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var playerVideo;
var playerSearch; 

function onYouTubeIframeAPIReady() {
  playerVideo = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '',
    playerVars: {
      'playsinline': 1
    }
  });

  playerSearch = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: '', // This will be set dynamically when a thumbnail is clicked
    playerVars: {
      'showinfo': 1 // Show video information including the thumbnail
    }
  });
}


document.querySelector('#search-bar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      search()
    }
});

var uinput = document.getElementById("uinput");

function search(searchQuery) {
    playerVideo.loadVideoById(searchQuery);

    // Show the player wrapper once the video is loaded
    document.getElementById('playerWrapper').style.display = 'block';
}


 // This function performs the video search
 function searchVideos() {
    var searchQuery = document.getElementById('searchInput').value;

    // Make a request to the YouTube Data API to search for videos
    fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&key=${YOUTUBE_DATA_API_KEY}&part=snippet&type=video`)
      .then(response => response.json())
      .then(data => {
        // filteredItems = data.items.filter(video => video.status.embeddable);
        displaySearchResults(data.items);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // This function displays the search results and thumbnails
  function displaySearchResults(items) {
    var resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    items.forEach(item => {
      var videoId = item.id.videoId;
      var title = item.snippet.title;
      var thumbnailUrl = item.snippet.thumbnails.default.url;

      // Create a thumbnail image element and a button to load the video
      var thumbnail = document.createElement('img');
      thumbnail.src = thumbnailUrl;
      thumbnail.onclick = function() {
        loadVideo(videoId);
      };

      // Create a div to hold the thumbnail and video title
      var resultDiv = document.createElement('div');
      resultDiv.appendChild(thumbnail);
      resultDiv.appendChild(document.createTextNode(title));

      // Append the result to the results container
      resultsContainer.appendChild(resultDiv);
    thumbnail.onclick = () => { search(videoId) }
    });
  }



  // Function to load a video based on a video ID
  function loadVideo(videoId) {
    if (playerSearch) {
      // Load the specified video
      playerSearch.loadVideoById(videoId);

      // Show the player wrapper once the video is loaded
      document.getElementById('playerWrapper').style.display = 'block';
    }
  }