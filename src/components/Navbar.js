import React, {Component} from 'react';
import { Link } from 'react-router';
import {API} from '../config/endpoints';
import SecurityActions from '../actions/SecurityActions';
import SecurityStore from '../stores/SecurityStore';
import { browserHistory } from 'react-router';

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
        <div style={styles.loggedInContainer}>
          <div style={styles.userContainer}>
            <Link onClick={this.goToProfile} style={styles.loginButton}><span style={{color: "white", fontSize: 16}}>{this.state.me.username}</span></Link>
          </div>
          <div>
            <Link style={styles.logoutButton} onClick={() => this.logout()}><span style={{color: "white", fontSize: 16}}>Log out</span></Link>
          </div>
        </div>
      )
    }else{
      content = (
        <div style={styles.buttonContainerRow}>
          <div style={styles.inputContainer}>
            <input style={styles.input} autoComplete="new-username" type="text" placeholder="username" required value={this.state.username} onChange={this.handleUsernameChange}/>
            <input style={styles.input} autoComplete="new-password" type="password" placeholder="password" required value={this.state.password} onChange={this.handlePasswordChange}/>
            <div style={styles.userContainer}>
              <Link className='link' style={styles.loginButton} onClick={() => this.login()}><span style={{color: "white", fontSize: 16}}>Login</span></Link>
            </div>
            <div>  
              <Link className='link' style={styles.loginButton} to="/signup"><span style={{color: "white", fontSize: 16}}>Sign Up</span></Link>
            </div>
          </div>
        </div>
      )
    }

    return(
        <div id='navigator' style={styles.container}>
          <Link style={styles.loginButton} onClick={this.backToMain}><span style={styles.title}>Bookravel</span></Link>
          {content}
        </div>
    )    
  }
}

const styles = {
  container: {
    width: "100%",
    height: 80,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: `#2a2c39`
  },
  title: {
    color: "white",
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
  userContainer: {
    marginRight: 20
  },
  loggedInContainer:{
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
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
    width: 127,
    height: 18,
    marginRight: 20,
    borderRadius: `4px`
  },
  logoutButton: {
    border: 'none',
    fontSize: 14,
    padding: 0
  },
  loginButton: {
    border: 'none',
    fontSize: 14,
    outline: 'none',
    textDecoration: 'none'
  }
}


