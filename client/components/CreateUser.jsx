import React, { Component } from 'react';
import Checkbox from './Checkbox.jsx';

const possibleInterests = [
    'Art',
    'Music', 
    'Film',
    'Social Justice',
    'Immigration',
    'Politics',
    'Feminism',
    'Activism',
    'Culture',
    'TV',
    'World News',
    'Theater', 
    'Sports', 
    'Theater',
    'Literature', 
    'Religion',
    'Technology',
    'Economics'
];

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            password: '',
            interests: [],
            checkboxes: possibleInterests.reduce(
                (options, option) => ({
                  ...options,
                  [option]: false
                }),{})
        }
        this.handleChangeLogIn = this.handleChangeLogIn.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createCheckboxes = this.createCheckboxes.bind(this);

    }

    handleChangeLogIn(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
      }


    handleCheckboxChange(label) {
        const newState = {...this.state.checkboxes};
        newState[label] = !this.state.checkboxes[label]
        this.setState( {checkboxes: newState });
      };

      handleFormSubmit(event) {
        event.preventDefault();
        const newInterests = Object.keys(this.state.checkboxes).filter(key => {
            return this.state.checkboxes[key] === true;
        })
        console.log(newInterests);
        console.log(Object.keys(this.state.checkboxes));
        this.setState({ interests: newInterests }, () => {
            const data = {
                email: this.state.email,
                firstName: this.state.firstName,
                password: this.state.password, 
                interests: this.state.interests, 
            };
            console.log(this.state);
            fetch('/user/createuser', {
                method: "POST",
                body: JSON.stringify(data), 
                headers: { "Content-Type": "application/json" }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        })      
      }

      createCheckboxes() {
        const result = possibleInterests.map(elem => {
           return <Checkbox
            label={elem}
            value={this.state.checkboxes[elem]}
            onCheckboxChange={this.handleCheckboxChange}
            key={elem}
          />
        })
        return result;
      }

    render() {

        return (
            <div className='create-user-form'>
               Name: <input type="text" name="firstName" onChange={this.handleChangeLogIn}></input><br></br>
               Email:<input type="text" name="email" onChange={this.handleChangeLogIn}></input><br></br>
               Password:<input type="password" name="password" onChange={this.handleChangeLogIn}></input><br></br>
               What are you interested in? Please select at least 3:<br></br>
               {this.createCheckboxes()}
               <button type="submit" onClick={this.handleFormSubmit}></button>
            </div>
        )
    }
}

export default CreateUser;