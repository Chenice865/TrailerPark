import { addFavourite, getFavourites } from "./data.js"

function getName(videos) {
    let html = ''
    const resultofVid = document.querySelector('#result')
    for (let rec of videos.items) {
      html +=
        ` <tr>   
            <td>${rec.snippet.title}</td>
            <td><button onclick="favourite('${rec.snippet.title.replace(/'/g, "\\'")}')">add</button></td>
            <br>
            <br>
            </tr> 
        `
    } resultofVid.innerHTML = html
  }

  async function favourite(title) {
        let result = await addFavourite(title)
        alert(result.id);
  }
  window.favourite = favourite;

  function renderFavourites(favourites) {
        console.log(favourites)
  }

  getFavourites(renderFavourites);

  async function showMe() {
    const response = await fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%20&maxResults=55&playlistId=PLcAKdA5kmCjCA1-apKxEZuJAylb-G0B1c&key=AIzaSyDqrTUBp9trXwU5UN3mC8tk_oq6qWgwV4Q')
    const data = await response.json()
    getName(data)
  }
  showMe()