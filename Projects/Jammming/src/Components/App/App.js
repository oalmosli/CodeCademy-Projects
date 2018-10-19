import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'
import Spotify from '../../util/Spotify.js'
import Track from '../Track/Track.js'

Spotify.getAccessToken();


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={

      searchResults:[],
      playlistName: "Play List Name",
      playlistTracks:[]
    }
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }

  addTrack(track) {
     if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
       this.setState(prevState => ({
         playlistTracks: [...prevState.playlistTracks, track]
       }
     ))
     }
    }
  removeTrack(track){
    this.setState({ playlistTracks: this.state.playlistTracks.filter(playlistTrack=> playlistTrack.id!==track.id)
    });
  }
  updatePlaylistName(name){
  this.setState({playlistName : name});
  }
  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    this.updatePlaylistName('My playlist');
    this.setState({
    searchResults: []
    });
    }
  search(term) {
     Spotify.search(term)
       .then(searchResults => this.setState({
         searchResults: searchResults
      }))
  }

  render() {
     return (
       <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
           <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
           <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist name={this.state.playlistName} playlistTracks={this.state.playlistTracks}
          tracks={this.state.playlistTracks}
           playlistName={this.state.playlistName} onRemove={this.removeTrack}
           onNameChange={this.updatePlaylistName}
           onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
