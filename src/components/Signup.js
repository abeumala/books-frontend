import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import SecurityActions from '../actions/SecurityActions';
import SecurityStore from '../stores/SecurityStore';
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
      <div style={styles.container}>
        <Navbar />
        <div style={styles.formContainer}>
          <div style={styles.titleContainer}>
          <h3>SIGN UP</h3>
          </div>
          <div style={styles.fieldContainer}>
            <input style={styles.inputField} autoComplete="new-password" autoComplete="new-password" type="text" placeholder="Enter username" required value={this.state.username} onChange={this.handleUsernameChange}/>
          </div>
          <div style={styles.fieldContainer}>
            <input style={styles.inputField} autoComplete="new-password" autoComplete="new-password" type="password" placeholder="Enter password" required value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <div style={styles.fieldContainer} id="bottom-div">
            <input  style={styles.inputField} autoComplete="new-password" autoComplete="new-password" type="text" placeholder="Enter email" required value={this.state.email} onChange={this.handleEmailChange}/>
          </div>  
          <div style={styles.buttonContainer}>
          <button id="loginButton" style={styles.updateButton} to="/" onClick={this.signup}>CREATE ACCOUNT</button>
          </div>
          <div style={styles.buttonContainer}>
          <button id="loginButton" style={styles.deleteButton} to="/" onClick={this.goBackToMain}>BACK</button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: `100%`,
    height: `100%`
},

  formContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 120,
    boxShadow: `0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)`,
    backgroundColor: "white",
    marginTop: 80
},

  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -90,
    marginBottom: 25
  },

  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 240,
    marginBottom: 25
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 25
  },

  updateButton: {
    height: 30,
    width: 190,
    borderRadius: 5,
    "background": `#2a2c39`,
    "color": "white",
    "boxShadow": "none"
  },

  deleteButton: {
    height: 25,
    width: 150,
    borderRadius: 3,
    boxShadow: `2px 2px #888888`
  }
}



