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
        body: JSON.stringify({ email: this.state.email, password: this.state.password }),
        headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .catch((err) => console.log(err)
        .then(res => console.log('Succes! response: ', res)));
    }
    
    render() {
        return (<section className="logInMain">
            <div className="logInDiv">
                <form className="logIn" id="logIn" onSubmit={this.submitLogIn}>
                <input type="text" name="email" onChange={this.handleChangeLogIn}></input><br></br>
                <input type="password" name="password" onChange={this.handleChangeLogIn}></input>
                <input type="submit" value="submit"></input>
                </form>
            </div>
        </section>)
    }

}



export default LogIn;