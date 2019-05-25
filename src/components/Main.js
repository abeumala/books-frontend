import React, { Component } from 'react';
import '../css/Main.css';
import SecurityActions from '../actions/SecurityActions';
import BooksActions from '../actions/BooksActions';
import SecurityStore from '../stores/SecurityStore';
import BooksStore from '../stores/BooksStore';
import { Link } from 'react-router'
import {API} from '../config/endpoints';
import { browserHistory } from 'react-router';
import BookRow from './BookRow';
import Cookies from 'universal-cookie';
import Navbar from './Navbar';

const cookies = new Cookies();

export default class Main extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      me: null,
      books: [],
    }

    this.onChange = this.onChange.bind(this);
    this.onBooksStoreChange = this.onBooksStoreChange.bind(this);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }

  componentWillMount() {
    console.log("hello willMount")
    SecurityStore.listen(this.onChange);
    BooksStore.listen(this.onBooksStoreChange);
  }

  componentDidMount() {
    BooksActions.getBooks(API.getBooksURL());

    //buscar l'user a les cookies i fer login automatic si existeix
    let user = cookies.get('user')
    if (user) {
      let obj = {
        username: user.username, 
        password: user.password
      }

      SecurityActions.login(API.getLoginURL(), obj)
    }
  }

  componentWillUnmout() {
    SecurityStore.unlisten(this.onChange);
    BooksStore.unlisten(this.onBooksStoreChange);
  }

  onChange(state) { //state és el SecurityStore.state
    this.setState({me: state.me})
  }

  onBooksStoreChange(state) { //state és el SecurityStore.state
    this.setState({books: state.books})
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
console.log("in render main.js")

    let books = [];

    this.state.books.map((book, index) => {
      let bookElement = (
        <BookRow key={index} book={book}/>  
      )

      books.push(bookElement)
    })

    if (this.state.me) {
      return (
        <div className="container">
          <Navbar user={this.state.username} logout={this.logout}/>
           <div id="descriptionContainer">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </div>
          <div id="booksContainer">
            {books}
          </div>
        </div>
      );
    }else{
      return (
        <div className="container">
         <Navbar login={this.login}/>
          <div id="descriptionContainer">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </div>
          <div id="booksContainer">
            {books}
          </div>
        </div>
      );
    }

  }
}
