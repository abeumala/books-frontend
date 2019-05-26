import React, { Component } from 'react';
import '../css/Main.css';
import SecurityActions from '../actions/SecurityActions';
import SecurityStore from '../stores/SecurityStore';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import { Link } from 'react-router'
import {API} from '../config/endpoints';
import { browserHistory } from 'react-router';
import BookRow from './BookRow';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Main extends Component {

  constructor() {
    super();

    this.state = {
      books: [],
      me: null,
    }

    this.onChange = this.onChange.bind(this);
    this.onBooksStoreChange = this.onBooksStoreChange.bind(this);
    
  }

  componentWillMount() {
    BooksStore.listen(this.onBooksStoreChange);
    SecurityStore.listen(this.onChange);

    let user = cookies.get('user')
    if (user) {
      let obj = {
        username: user.username, 
        password: user.password
      }

      SecurityActions.login(API.getLoginURL(), obj)
    }
  }

  componentDidMount() {
    BooksActions.getBooks(API.getBooksURL());
  }

  componentWillUnmout() {
    BooksStore.unlisten(this.onBooksStoreChange);
    SecurityStore.unlisten(this.onChange);
  }

  onChange(state) { //state is referring to SecurityStore.state
    this.setState({me: state.me})
  }

  onBooksStoreChange(state) { //state is referring to BooksStore.state
    this.setState({books: state.books})
  }

  render() {
    let books = [];

    this.state.books.map((book, index) => {
      let bookElement = (
        <BookRow key={index} book={book}/>  
      )

      books.push(bookElement)
    })

    return (
      <div className="container">
        <Navbar user={this.state.me}/>
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
