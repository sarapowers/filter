import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import LogIn from './components/LogIn.jsx';
import News from './components/News.jsx';
import CreateUser from './components/CreateUser.jsx'


class App extends Component {

    render() {
        return (<div>
            <h1>solo project</h1>
            {/* <Route path="/" component={LogIn} /> */}
            <Route path="/" component={CreateUser}></Route>
        </div>
        )
    }
}

export default App;