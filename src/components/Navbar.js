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
        <div id='buttons'>
          <span>{this.props.user.username}</span>
          <button className='signupButtonLogged' onClick={() => this.logout()}>logout</button>
        </div>
      )
    }else{
      content = (
        <div>
          <div id='inputs'>
            <input autoComplete="new-password" autoComplete="new-password" className='mainInput' type="text" placeholder="username" required value={this.state.username} onChange={this.handleUsernameChange}/>
            <input autoComplete="new-password" autoComplete="new-password" type="password" className='mainInput' placeholder="password" required value={this.state.password} onChange={this.handlePasswordChange}/>
            <button className='loginButton' onClick={() => this.login()}>
                <img src={require("../images/login-arrow.png")} id='arrow'/>
            </button>
          </div>
          <div id='buttons'>
            <Link className='signupButton' to="/signup">signup</Link>
          </div>
        </div>
      )
    }

    return(
        <div style={styles.navigator}>
          <span id="title">Book vote</span>
          {content}
        </div>
    )    
  }
}

const styles = {
  container: {
    width: "100%",
    height: 70,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}

