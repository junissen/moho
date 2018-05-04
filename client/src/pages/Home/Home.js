import React, { Component } from "react";
import API from "../../utils/API";
import BottomNav from "../../components/BottomNav/bottomNav";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import GiphySearch from "../../components/GiphySearch/GiphySearch";
import Profile from "../../components/Profile";
import PromptSelect from "../../components/PromptSelect/PromptSelect";
import { lookup } from "ipdata"


class Home extends Component {

    state = {
        urlString: "",
        ipAddress: "",
        showProfile: false,
        theme: "",
        showPending: false,
        showHome: false, 
        userName: "",
        userScore: "",
        userColor: "",
    }

    // check IP address on mount
    componentDidMount = () => {
        this.checkIp();
<<<<<<< HEAD
        {this.returnCategories()}

=======
        console.log("random url: " + this.props.match.randomURL);
>>>>>>> socket created on url generation
    }

    // Grab user IP address set state variable, then continue to set URL state variable
    checkIp = () => {
        lookup()
        .then((info) => {
            this.setState({ipAddress: info.ip})
            this.setUrl()
        })
<<<<<<< HEAD

        this.setUrl();
        const socket = openSocket(this.props.match.url);
=======
>>>>>>> socket created on url generation
        
    }

    // Grab current URL and set state variable, then continue to check URL
    setUrl = () => {
        let currenturl = window.location.href;
        let spliturl = currenturl.split("/");
        let newurl = ""
        
        for (var i = 4; i < spliturl.length; i ++ ) {
            newurl += "/" + spliturl[i]
        }

        // this.setState({urlString: newurl}, function() {
        //     this.checkURL()
        // })
    }

    // Check state variable URL against session database. If url exist is database, the user can continue into the game
    // If the URL does not exist in the database, the user is redirected to an error screen
    checkURL = () => {

        API.checkSessionUrl(this.state.urlString)
        .then(res =>{ 
            // If URL does not exist, user gets error screen
            if (res.data.length < 1) {
                console.log("Not found")
                window.location.href = "/notfound"
                return false
            }

            // If URL does exist
            else {
                console.log(res.data)
                console.log("You entered a valid session!")

                // If no members yet exist in session, user is shown profile page
                if (res.data[0].members.length === 0 ) {
                    console.log("no members yet in session")
                    this.setState({showProfile: true})
                }
                
                // If users exist but user's ip address is not associated with a session member,
                // user gets shown profile page. If the ip address already exists, user goes straight to 
                // home page
                for (var i = 0; i < res.data[0].members.length; i ++) {
                    if (res.data[0].members[i].ip === this.state.ipAddress) {
                        console.log("member already exists in session ") 
                        this.setState({showProfile: false})
                        this.setState({showPending: true})
                        break
                    }

                    else {
                        console.log("member does not yet exist in session")
                        this.setState({showProfile: true})
                    }
                }


            
            }
        })
        .catch(err => console.log(err.response));
    };

    profileOnAdd = (field, value) => {
        this.setState({[field]: value})
        console.log(this.state)
    }

    returnCategories = () => {
        API.getCategories()
        .then(response => {
          console.log(response.data);
          this.setState({theme: response.data});
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div> 
                { this.state.showProfile ? 
                    <Profile url={this.state.urlString} ip={this.state.ipAddress} profileAdded={this.profileOnAdd.bind(this)}/>
                : null}

                { this.state.showPending ?
                    <div>
                
                        <LoadingScreen url={this.state.urlString} />
                        <BottomNav userName={this.state.userName} userScore={this.state.userScore} userColor={this.state.userColor}/>    
                
                    </div>
                : null}

                { this.state.showHome ?
                    <div> 
                        <GiphySearch />
                        {this.state.theme.map(prompt => (
                            <PromptSelect
                            id={prompt.id}
                            key={prompt.id}
                            icon={prompt.icon}
                            theme={prompt.theme}
                            color={prompt.color}
                            />
                        ))}
                        <LoadingScreen />
                        <BottomNav />
                    </div>
                : null}
            </div>
        );
    }
}

export default Home;
