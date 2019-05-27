import React, { Component } from 'react';
import '../css/Signup.css';
import { browserHistory } from 'react-router';
import SecurityActions from '../actions/SecurityActions';
import SecurityStore from '../stores/SecurityStore';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import Navbar from './Navbar';
import { Link } from 'react-router';
import {API} from '../config/endpoints';



export default class Signup extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
    }

    this.updateProfile = this.updateProfile.bind(this);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount() {

  }
  
  componentDidMount(){
    this.setState({
      redirect: false
    })
  }

  componentWillUnmout() {

  }

  handleUsernameChange (event){
    this.setState({username: event.target.value})
  }

  handleEmailChange (event){
    this.setState({email: event.target.value})
  }

  handlePasswordChange (event){
    this.setState({password: event.target.value})
  }

  updateProfile = (e) => {

    e.preventDefault

    let obj = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    
    SecurityActions.signup(API.getRegisterURL(), obj)
  }


  render() {
    return (
      <div id="container">
        <Navbar />
        <div id="form-container">
          <div id="title-container">
          <h3>PROFILE</h3>
          </div>
          <div className="field-container">
            <input autoComplete="new-password" autoComplete="new-password" type="text" placeholder="Enter username" required value={this.state.username} onChange={this.handleUsernameChange}/>
          </div>
          <div className="field-container">
            <input autoComplete="new-password" autoComplete="new-password" type="password" placeholder="Enter password" required value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <div className="field-container" id="bottom-div">
            <input autoComplete="new-password" autoComplete="new-password" type="text" placeholder="Enter email" required value={this.state.email} onChange={this.handleEmailChange}/>
          </div>  
          <div id="button-container">
          <button id="loginButton" to="/" onClick={this.update}>UPDATE ACCOUNT</button>
          </div>
        </div>
      </div>
    );
  }
}

// const styles = {
//   profileContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 100%,
//     height: 68vh
//   }
// }





