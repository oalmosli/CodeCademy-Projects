const clientID="990c3bc605f34fbba54ad46e43c4a27c"
const RedirectURI="http://localhost:3000/"
let accessToken;
let expiresIn
let playlistID

const Spotify={
  getAccessToken(){
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
       accessToken = urlAccessToken[1];
       expiresIn = urlExpiresIn[1];
       window.setTimeout(() => accessToken = '', expiresIn * 1000);
       window.history.pushState('Access Token', null, '/');
    }else{
      const accessurl=`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${RedirectURI}`
      window.location=accessurl
      }
    },
    search(term) {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}`}})
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            preview: track.preview_url,
            cover: track.album.images[2].url,
          }})
      });
    },
    savePlaylist(name,trackURIs){
      if (!name || !trackURIs.length ===0) {
     return;
   }
     let accessToken= Spotify.getAccessToken()
     const headers = { Authorization: `Bearer ${accessToken}` };
     let userID;
     fetch('https://api.spotify.com/v1/me', {headers: headers})
      .then(response => response.json())
       .then(jsonResponse => userID = jsonResponse.id)
      .then(()=>{
     fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
        })
      .then(response => response.json())
      .then(jsonResponse => playlistID = jsonResponse.id)
      .then(() => {
   const createPlayList=`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`
   fetch (createPlayList,{headers: headers, method:'POST', body: JSON.stringify({uris: trackURIs})})
             })
            })
       }
     }
export default Spotify;
