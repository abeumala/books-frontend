import React, { Component } from 'react';
import '../css/Signup.css';
import { browserHistory } from 'react-router';
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
      password: ''
    }

    this.signup = this.signup.bind(this);

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

  signup = (e) => {

    e.preventDefault()

    let obj = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    
    SecurityActions.signup(API.getRegisterURL(), obj)
  }

  goBackToMain = (e) => {
    e.preventDefault()
    browserHistory.push('/')
  }


  render() {
    return (
      <div id="container">
        <div id="form-container">
          <div id="title-container">
          <h3>SIGN UP</h3>
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
          <button id="loginButton" to="/" onClick={this.signup}>CREATE ACCOUNT</button>
          </div>
          <div id="button-container">
          <button id="loginButton" to="/" onClick={this.goBackToMain}>BACK</button>
          </div>
        </div>
      </div>
    );
  }
}






