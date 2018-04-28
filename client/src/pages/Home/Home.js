import React, { Component } from "react";
// import axios from "axios"
import API from "../../utils/API"
import { EnterBtn } from "../../components/Buttons";

class Home extends Component {

    state = {
        urlString: "",

    }

    componentDidMount = () => {
        this.setUrl()
    }

    setUrl = () => {
        let currenturl = window.location.href;
        let spliturl = currenturl.split("/");
        let newurl = ""
        
        for (var i = 4; i < spliturl.length; i ++ ) {
            newurl += spliturl[i] + "/"
        }

        this.setState({urlString: newurl}, function() {
            this.checkURL()
        })

    }

    checkURL = () => {
        API.checkSessionUrl(this.state.urlString)
        .then(res =>{ 
            console.log(res)
            if (res.data.length < 1) {
                console.log("Not found")
                window.location.href = "/notfound"
                return false
            }

            else {
                console.log("You entered a valid session!")
            }
        })
        .catch(err => console.log(err.response));
    };


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div> 
                <EnterBtn />
            </div>
        );
    }
}

export default Home;