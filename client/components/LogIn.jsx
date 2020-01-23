import React, { Component } from 'react';

class LogIn extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '', 
      }
      this.handleChangeLogIn = this.handleChangeLogIn.bind(this);
      this.submitLogIn = this.submitLogIn.bind(this);
    }

    handleChangeLogIn(event) {
      event.preventDefault();
      this.setState({ [event.target.name]: event.target.value });
    }

    submitLogIn(event) {
      event.preventDefault();
        fetch('/user/login', {
        method: 'POST',
        body: { email: this.state.email, password: this.state.password },
        headers: {'Content-Type': 'application/json'}
        })
        // .then(data => data.json())
        // .then(console.log(this.state))
        // .then(console.log(data))
        .catch((err) => console.log(err));
    }
    
    render() {
        return (<section className="logInMain">
            <div className="logInDiv">
                <form className="logIn" id="logIn">
                <input type="text" name="email" onChange={this.handleChangeLogIn}></input><br></br>
                <input type="password" name="password" onChange={this.handleChangeLogIn}></input>
                </form>
                <button type="submit" onclick={this.submitLogIn}>submit</button>
            </div>
        </section>)
    }

}



export default LogIn;