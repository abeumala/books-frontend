import React, { Component } from 'react';
import SecurityActions from '../actions/SecurityActions';
import {API} from '../config/endpoints';

export default class Signup extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
    }

    this.signup = this.signup.bind(this);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount() {

  }
  
  componentDidMount(){
    
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

  signup() {

    // let rankingRegexp = /^\d+$/;
    // let emailRegexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    // if (this.state.username.length < 3) {
    //   alert('username is too short');
    //   return;
    // }

    // if (!emailRegexp.test(this.state.email)) {
    //   alert('invalid Email');
    //   return;
    // }

    // if (this.state.password.length < 3) {
    //   alert('password is too short');
    //   return;
    // }

    let obj = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }

    SecurityActions.signup(API.getRegisterURL(), obj)
  }

  render() {
    return (
      <div className="container">
        <label><b>Username</b></label>
        <input autoComplete="new-password" autoComplete="new-password" type="text" placeholder="Enter username" required value={this.state.username} onChange={this.handleUsernameChange}/>
        <label><b>Email</b></label>
        <input autoComplete="new-password" autoComplete="new-password" type="text" placeholder="Enter email" required value={this.state.email} onChange={this.handleEmailChange}/>
        <label><b>Password</b></label>
        <input autoComplete="new-password" autoComplete="new-password" type="password" placeholder="Enter password" required value={this.state.password} onChange={this.handlePasswordChange}/>
        <button id="loginButton" onClick={() => this.signup()}>Signup</button>
      </div>
    );
  }





}
