let state = [];

function playVid(videos) {
  let html = ''

  const resultofVid = document.querySelector('#inside')

  for (let rec of videos) {
    html +=
      `
      <a target="_blank" href="https://www.youtube.com/watch?v=${rec.snippet.resourceId.videoId}" class="yt-video">
        <img src="${rec.snippet.thumbnails.medium.url}" class="poster" />
        <div class="other_card">
          <img
            src="${rec.snippet.thumbnails.high.url}"
            class="poster" />
       <div class="cont">
         <h5>${rec.snippet.title}</h5>
       </div>
       </div>
        </a>
       `
  }
  resultofVid.innerHTML = html
}

async function getData() {

  const response = await fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%20&maxResults=55&playlistId=PLcAKdA5kmCjCA1-apKxEZuJAylb-G0B1c&key=AIzaSyDqrTUBp9trXwU5UN3mC8tk_oq6qWgwV4Q')

  const data = await response.json()
  // playVid(data.items)
  console.log(data)
  return data.items
}
// getData()

async function showMovies(){
  state = await getData();
  playVid(state);
  // console.log(state);
}
showMovies();

function search() {
  let searchKey = document.querySelector('#search-bar').value.trim();
  let listing = [];
  
  for(let rec of state) {
  
    let searchText = rec.snippet.title.toUpperCase();
    searchKey = searchKey.toUpperCase();
    
    if ( searchText.search(searchKey) !== -1 ) {
    listing.push(rec);
    }
  }

  if(searchKey.length > 0) {
    playVid(listing);
  }
  else {
    playVid(listing);
  }  
}

function scrollleft() {
  const container = document.getElementById('inside');
  container.scrollLeft -= 500;
}

function scrollRight() {
  const container = document.getElementById('inside');
  container.scrollLeft += 500;
}