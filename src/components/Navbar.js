import React, {Component} from 'react';
import { Link } from 'react-router';
import {API} from '../config/endpoints';
import SecurityActions from '../actions/SecurityActions';
import SecurityStore from '../stores/SecurityStore';
import Cookies from 'universal-cookie';
import '../css/Main.css';

const cookies = new Cookies();

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      me: null,
      username: "",
      password: "",
    }

    this.onChange = this.onChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  componentWillMount() {
    SecurityStore.listen(this.onChange);

    // var user = cookies.get('user')
    // if (user) {
    //   let obj = {
    //     username: user.username, 
    //     password: user.password
    //   }

    //   SecurityActions.login(API.getLoginURL(), obj)
    // }
  }
  
  componentDidMount(){
    
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

  handleUserChange () {
    SecurityActions.logout()
    console.log('handleUserChange', this.state.me);
    this.props.onLogout(this.state.me);         
  }

  login() {

    let obj = {
      username: this.state.username, 
      password: this.state.password
    }

    console.log('user obj', obj);

    SecurityActions.login(API.getLoginURL(), obj)

    this.setState({
      username: "",
      password: "",
    })
  }

  render() {
    let content = null;

    if (this.state.me) {
      content = (
        <div style={styles.buttonContainer}>
          <span>{this.state.me.username}</span>
          <button style={styles.logoutButton} onClick={() => this.handleUserChange()}>Log out</button>
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

