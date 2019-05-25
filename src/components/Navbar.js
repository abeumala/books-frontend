import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/Main.css';


export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoggedIn: true
    }
  }

  onClickLogout = () => {
      this.setState({
          isLoggedIn: false
      })
  }

//   componentWillMount() {

//   }
  
//   componentDidMount(){
    
//   }

//   componentWillUnmout() {

//   }

  render() {
      const {isLoggedIn} = this.state
      console.log("in render navbar.js")
      console.log("props", this.props)
      return(
        <div>
           { isLoggedIn ? (
            <div id="navigator">
                <span id="title">Book vote</span>
                <div id='buttons'>
                <span>{this.props.user}</span>
                <button className='signupButtonLogged' onClick={() => this.props.logout()}>logout</button>
            </div>
        </div>
        ) : (
           
        <div id="navigator">
            <span id="title">Book vote</span>
            <div id='inputs'>
                <input autoComplete="new-password" autoComplete="new-password" className='mainInput' type="text" placeholder="username" required value={this.state.username} onChange={this.handleUsernameChange}/>
                <input autoComplete="new-password" autoComplete="new-password" type="password" className='mainInput' placeholder="password" required value={this.state.password} onChange={this.handlePasswordChange}/>
                <button className='loginButton' onClick={() => this.props.login()}>
                    <img src={require("../images/login-arrow.png")} id='arrow'/>
                </button>
            </div>
            <div id='buttons'>
                <Link className='signupButton' to="/signup">signup</Link>
            </div>
        </div>
     
      

      )}
   

      </div>
      )
    
      
        
    
  }
}

