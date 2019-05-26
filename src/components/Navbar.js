import React, {Component} from 'react';
import { Link } from 'react-router';
import {API} from '../config/endpoints';
import SecurityActions from '../actions/SecurityActions';
import Cookies from 'universal-cookie';
import '../css/Main.css';

const cookies = new Cookies();

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount() {

  }
  
  componentDidMount(){
    
  }

  componentWillUnmout() {
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value})
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value})
  }

  login() {

    let obj = {
      username: this.state.username, 
      password: this.state.password
    }

    SecurityActions.login(API.getLoginURL(), obj)

    this.setState({
      username: "",
      password: "",
    })
  }

  logout() {
    SecurityActions.logout();
  }

  render() {
    let content = null;

    if (this.props.user) {
      content = (
        <div style={styles.buttonContainer}>
          <span>{this.props.user.username}</span>
          <button style={styles.logoutButton} onClick={() => this.logout()}>Log out</button>
        </div>
      )
    }else{
      content = (
        <div style={styles.buttonContainer}>
          <div id='inputs'>
            <input autoComplete="new-username" type="text" placeholder="username" required value={this.state.username} onChange={this.handleUsernameChange}/>
            <input autoComplete="new-password" type="password" placeholder="password" required value={this.state.password} onChange={this.handlePasswordChange}/>
            <button className='loginButton' onClick={() => this.login()}>
                <img src={require("../images/login-arrow.png")} id='arrow'/>
            </button>
          </div>
          <div id='buttons'>
            <Link className='signupButton' to="/signup">Sign Up</Link>
          </div>
        </div>
      )
    }

    return(
        <div id='navigator' style={styles.container}>
          <span style={styles.title}>Book vote</span>
          {content}
        </div>
    )    
  }
}

const styles = {
  container: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginLeft: 20,
  },
  buttonContainer:{
    marginRight: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoutButton: {
    color: 'black', 
    border: 'none',
    fontSize: 14,
    padding: 0
  },
}

