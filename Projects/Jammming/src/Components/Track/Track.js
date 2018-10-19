import React from 'react';
import './Track.css';

 class Track extends React.Component {
  constructor(props){
    super(props);
    this.state={
       trackPlaying: true,
    }
    this.addTrack=this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this);
    this.playIt=this.playIt.bind(this);
    this.trackPreveiw=this.trackPreveiw.bind(this)
  }
  playIt(){
    const audio= this.refs.audio
    if(this.state.trackPlaying){
      audio.play()
      this.setState({
             trackPlaying: false})

    }else{
      audio.pause();
          this.setState({
              trackPlaying: true})
    }
  }

    trackPreveiw(){
      if(this.props.track.preview) {
        if(!this.state.trackPlaying){
          return(
          <button onClick={this.playIt}>❚❚</button>)
        }else{
          return (
            <button onClick={this.playIt}>►</button>)
        }
      }
      else
      {
        return (<button> Sorry no preview</button>)
      }
    }
  renderAction() {
      if (this.props.isRemoval) {
        return <a className="Track-action"
                  onClick={this.removeTrack}>-</a>
      } else {
        return <a className="Track-action"
                  onClick={this.addTrack}>+</a>
      }
    }

addTrack() {
  this.props.onAdd(this.props.track);
}
removeTrack() {
    this.props.onRemove(this.props.track);
  }

    render(){

      return(
        <div className="Track">
          <div>
            <img className="Track-image" src={this.props.track.cover}   alt="track's cover" /><br/>
          </div>
          <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
            <div className="Track-cover-preview">
              <audio ref="audio" src={this.props.track.preview}   onEnded={() => this.setState({ trackPlaying: false })} ></audio>
              <div className="Track-preview-container">
              {this.trackPreveiw()}
            </div>
          </div>
          {this.renderAction()}
        </div>
      )
  }
}

export default Track;
