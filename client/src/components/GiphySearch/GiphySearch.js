import React, { Component } from "react";
import API from "../../utils/API";
import Gif from "../Gif/Gif";

class GiphySearch extends Component {

  state = {
      searchTerm: "",
      image_url: "http://via.placeholder.com/500x240/31263E/31263E",
      defaultGif: "https://media.giphy.com/media/6GY01XQBkf3lS/giphy.gif"
  }

  componentDidMount = () => {
      console.log("Mounted");
  }

  componentDidUpdate = () => {

    if (this.props.timer) {

        let gifObject = {
            socket: this.props.userSocket,
            gif: this.state.defaultGif
        }

        this.props.socket.emit('playeroutoftime', gifObject)
        this.props.outOfTime("pendingMessage", "Players choosing gifs")
        this.props.outOfTime("pendingPlayerHeader", "Players done with challenge")
        this.props.outOfTime("showGiphySearch", false)
        this.props.outOfTime("showPending", true)

    }

  }
  
  callGIPHY = () => {
    
    this.setState({image_url: "https://media.giphy.com/media/l4FGIO2vCfJkakBtC/giphy.gif"})

    API.getGIF(this.state.searchTerm)
    .then(response => {
        this.setState({
            image_url: response.data.original.url
        });
    })
    .catch(err => console.log(err))
  }

  handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
          [name]: value
      });
  };

  searchTerm = event => {
    const value = event.target.value;
    this.setState({
        searchTerm: value
    });
  }

  confirmSelection = () => {

    let gifObject = {
        socket: this.props.userSocket,
        gif: this.state.image_url
    }

    this.props.socket.emit('playergifchosen', gifObject)
    this.props.outOfTime("pendingMessage", "Players choosing gifs")
    this.props.outOfTime("pendingPlayerHeader", "Players done with challenge")
    this.props.outOfTime("outOfTime", false)
    this.props.outOfTime("showTimer", false)
    this.props.outOfTime("showGiphySearch", false)
    this.props.outOfTime("showPending", true)

  }

  render() {
      return (
          <div className="giphy-component"> 
              <h6>{this.props.theme}</h6>
              <h4>{this.props.category}</h4>
              <div className="search-holder">
                <input name="giphySearchBar" onChange={this.searchTerm} type="text" />
                <div onClick={this.callGIPHY} className="search-button">
                    <i className="fas fa-search"></i>
                </div>
                <Gif src={this.state.image_url}/>

                <div className="button-holder">
                    <div className="timer-placeholder">
                        <i className="fas fa-stopwatch"></i>
                        <span className="timer">{this.props.children}</span>
                    </div>
                    <div className="button research" onClick={this.callGIPHY}>
                        <i className="fas fa-redo"></i>
                    </div>
                    <div className="button confirm" onClick={this.confirmSelection}>
                        <i className="fas fa-check"></i>
                    </div>
                </div>
              </div>
          </div>
      );
  }
}

export default GiphySearch;