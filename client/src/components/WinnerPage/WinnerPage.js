import React, { Component } from "react";

class WinnerPage extends Component {
  state = {
    judge: "",
    gif: "",
    winner: "",
    winnerColor: "",
    userJudge: ""
  }

	componentDidMount = () => {
    console.log("mounted");
    console.log(this.props)
    this.setState({gif: this.props.winner.gif})
    this.setState({winner: this.props.winner.member.name})
    this.setState({winnerColor: this.props.winner.member.color})
    this.setState({judge: this.props.judge})
    this.setState({userJudge: this.props.userJudge})  
  }
  
  componentDidUpdate = () => {
    if (this.props.winner.member.name !== this.state.winner) {
      this.setState({winner: this.props.winner.member.name})
    }

    if (this.props.winner.member.color !== this.state.winnerColor) {
      this.setState({winnerColor: this.props.winner.member.color})
    }

    if (this.props.winner.gif !== this.state.gif) {
      this.setState({gif: this.props.winner.gif})
    }

    if (this.props.judge !== this.state.judge) {
      this.setState({judge: this.props.judge})
    }

    if (this.props.userJudge !== this.state.userJudge) {
      this.setState({userJudge: this.props.userJudge})
    }
  }

  startGame = () => {
    const self = this
    self.props.socket.emit('startnextround')
  }

  // Users color is this.state.winner.member.color

	render() {
		return (
			<div className="winnerScreen-component">
        {/* Button to start next round */}
        <div className="pull-themes-btn">
          <span className="btn">
          { this.state.userJudge ? 
            <p className="next-round-btn" onClick={this.startGame}>Next Round</p>
          : null}
          </span>
        </div>

        <p className="judge">Judge: {this.state.judge}</p>

        <h6 className="winner-page-recap">{this.props.theme}</h6>
        <h4>{this.props.category}</h4>

        <div className="winning-gif-holder">
          <img className="winning-gif" src={this.state.gif} alt=""/>
        </div>

        <h1>Winner:</h1>
        <h3>{this.state.winner}!!!</h3>    
      </div>
			);
	}
}

export default WinnerPage;