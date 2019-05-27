import React, { Component } from 'react';
import '../css/Signup.css';
import SecurityActions from '../actions/SecurityActions';
import SecurityStore from '../stores/SecurityStore';
import { Link } from 'react-router';
import {API} from '../config/endpoints';



export default class Signup extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      redirect: false
    }

    this.signup = this.signup.bind(this);
    this.redirectAfterSumbit = this.redirectAfterSumbit.bind(this);

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

  signup() {
    console.log('INSIDE SIGNUP');
   

    let obj = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }



    SecurityActions.signup(API.getRegisterURL(), obj)
  }



  redirectAfterSumbit () {
   if(this.state.redirect) {
   return this.props.history.push('/') 
  }

 }

  render() {
    return (
      <div id="container">
        <form id="form-container">
          <div className="field-container">
            <label className="form-label">Username</label>
            <input autoComplete="new-password" autoComplete="new-password" type="text" placeholder="Enter username" required value={this.state.username} onChange={this.handleUsernameChange}/>
          </div>
          <div className="field-container">
            <label>Password</label>
            <input autoComplete="new-password" autoComplete="new-password" type="password" placeholder="Enter password" required value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <div className="field-container" id="bottom-div">
            <label>Email</label>
            <input autoComplete="new-password" autoComplete="new-password" type="text" placeholder="Enter email" required value={this.state.email} onChange={this.handleEmailChange}/>
          </div>  
          <div id="button-container">
          <button id="loginButton" to="/" onClick={() => this.signup()}>SIGN UP</button>
          </div>
        </form>
      </div>
    );
  }
}






