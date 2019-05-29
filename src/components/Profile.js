import React, { Component } from 'react';
import './../css/Main.css';
import { browserHistory } from 'react-router';
import SecurityActions from '../actions/SecurityActions';
import SecurityStore from '../stores/SecurityStore';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import Navbar from './Navbar';
import { Link } from 'react-router';
import {API} from '../config/endpoints';



export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // me: SecurityStore.state.me._id
      // comments: BooksStore.state.comments_id	
      username: '',
      email: '',
      password: ''

    }

    // console.log('me', SecurityStore.state.me._id)
    // console.log('comments', BooksStore.state.comments.user_id)
    // this.comments = []

    this.updateProfile = this.updateProfile.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

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

    e.preventDefault()

    let obj = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    
    if (SecurityStore.state.me) {
    	SecurityActions.updateProfile(API.getProfileURL(SecurityStore.state.me._id), obj)
    }	
    else browserHistory.push('/signup')
  }
	
	deleteUser = () => {
		console.log('DELETEEEEEEEE', SecurityStore.state.me)
		if (SecurityStore.state.me) SecurityActions.deleteUser(API.getDeleteUSer(SecurityStore.state.me._id))
			browserHistory.push('/')
	}


  render() {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.formContainer}>
          <div style={styles.titleContainer}>
          <h1>Edit Profile</h1>
          </div>
          <div style={styles.fieldContainer}>
            <label style={ {color: "black", marginBottom: 5}  }>new username</label>
            <input style={styles.inputField} autoComplete="new-password" autoComplete="new-password" type="text" required value={this.state.username} onChange={this.handleUsernameChange}/>
          </div>
          <div style={styles.fieldContainer}>
            <label style={ {color: "black", marginBottom: 5} }>new password</label>
            <input style={styles.inputField} autoComplete="new-password" autoComplete="new-password" type="password" required value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <div style={styles.fieldContainer}>
            <label style={ {color: "black", marginBottom: 5} }>new email</label>
            <input style={styles.inputField} autoComplete="new-password" autoComplete="new-password" type="text" required value={this.state.email} onChange={this.handleEmailChange}/>
          </div>

          <div style={styles.buttonContainer}>
          <button style={styles.updateButton} to="/" onClick={this.updateProfile}>Upade Account</button>
          </div>
          <div style={styles.buttonContainer}>
          <button style={styles.deleteButton} id="loginButton" to="/" onClick={this.deleteUser}>Delete Account</button>
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
  alignItems: "center"
},

formContainer: {
  display: "flex",
  flexDirection: "column",
  padding: 120,
  boxShadow: `0px 19px 38px rgba(0,0,0,0.30), 0px 15px 12px rgba(0,0,0,0.22)`, 
  backgroundColor: "white",
  marginTop: 80,
  borderRadius: `20px`
},

fieldContainer: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 240,
  marginBottom: 25
},

titleContainer: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: -90,
  marginBottom: 25
},

inputField: {
  width: 180,
  height: 25,
  borderRadius: `20px`,
  letterSpacing: 2.5
},

deleteButton: {
  height: 25,
  width: 150,
  color: "white",
  borderRadius: `20px`,
  background: `#933131`,
  letterSpacing: 2.5
},

updateButton: {
  height: 30,
  width: 190,
  borderRadius: `20px`,
  "background": `#2a2c39`,
  "color": "white",
  letterSpacing: 2.5
  // boxShadow: `2px 2px #888888`
},

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 25,
  }
}







