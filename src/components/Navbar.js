import React, {Component} from 'react';
import { Link } from 'react-router';
import {API} from '../config/endpoints';
import SecurityActions from '../actions/SecurityActions';
import SecurityStore from '../stores/SecurityStore';
import { browserHistory } from 'react-router';
import '../css/Main.css';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      me: SecurityStore.state.me,
      username: "",
      password: "",
    }

    this.onChange = this.onChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount() {
    
  }
  
  componentDidMount(){
    SecurityStore.listen(this.onChange);
  }

  componentWillUnmout() {
    SecurityStore.unlisten(this.onChange);
  }

  onChange(state) { //state is referring to SecurityStore.state
    this.setState({me: state.me})
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value})
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value})
  }

  logout () {

    SecurityActions.logout()
    browserHistory.push('/')   

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

  backToMain = (e) => {
    e.preventDefault()
    browserHistory.push('/')
  }

  goToProfile = (e) => {
    e.preventDefault()
    browserHistory.push('/profile')
  }

  render() {
    let content = null;

    if (this.state.me) {
      content = (
        <div style={styles.buttonContainer}>
          <button onClick={this.goToProfile} style={styles.loginButton}><span>{this.state.me.username}</span></button>
          <button style={styles.logoutButton} onClick={() => this.logout()}>Log out</button>
        </div>
      )
    }else{
      content = (
        <div style={styles.buttonContainerRow}>
          <div style={styles.inputContainer}>
            <input style={styles.input} autoComplete="new-username" type="text" placeholder="username" required value={this.state.username} onChange={this.handleUsernameChange}/>
            <input style={styles.input} autoComplete="new-password" type="password" placeholder="password" required value={this.state.password} onChange={this.handlePasswordChange}/>
            <button className='link' style={styles.loginButton} onClick={() => this.login()}>
                Login
            </button>
            <Link className='link' style={styles.loginButton} to="/signup">Sign Up</Link>
          </div>
        </div>
      )
    }

    return(
        <div id='navigator' style={styles.container}>
          <button style={styles.loginButton} onClick={this.backToMain}><span style={styles.title}>Book vote</span></button>
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
  buttonContainerRow:{
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  inputContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 150,
    color: '#000',
    border: 0
  },
  logoutButton: {
    color: 'black', 
    border: 'none',
    fontSize: 14,
    padding: 0
  },
  loginButton: {
    color: 'black', 
    border: 'none',
    fontSize: 14,
    outline: 'none',
    textDecoration: 'none'
  },
}

