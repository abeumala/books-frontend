import React, { Component } from 'react';
import '../css/Main.css';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import { Link } from 'react-router'
import {API} from '../config/endpoints';
import { browserHistory } from 'react-router';
import BookRow from './BookRow';
import Navbar from './Navbar';

export default class Main extends Component {

  constructor() {
    super();

    this.state = {
      me: null,
      books: []
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.onBooksStoreChange = this.onBooksStoreChange.bind(this);
    
  }

  componentWillMount() {
    BooksStore.listen(this.onBooksStoreChange);
  }

  componentDidMount() {
    BooksActions.getBooks(API.getBooksURL());
  }

  componentWillUnmout() {
    BooksStore.unlisten(this.onBooksStoreChange);
  }

  onBooksStoreChange(state) { //state is referring to BooksStore.state
    this.setState({books: state.books})
  }

  handleLogout (userValue) {
    this.setState({ me: userValue })
    console.log(this.state.me);
  }

  render() {
    let books = [];

    for (var i = 0; i < this.state.books.length; i++) {
      let book = this.state.books[i]
      let bookElement = (
        <BookRow key={i} book={book}/>  
      )

      books.push(bookElement)
    }
    console.log('main render', this.state.me)
    return (
      <div className="container">
        <Navbar onLogout={this.handleLogout}/>
        <div style={styles.columns}>
          <div className="boxShadowNoHover" style={styles.textContainer}>
            <span style={styles.title}>Welcome</span>
            <span style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </div>
          { this.state.me ? 
            <div style={styles.postsColumn}>
            {books}
            </div>
          :
          <div> </div>
          }
          
        </div>
      </div>
    );
  }
}

const styles = {
  columns: {
    display: 'flex',
    flexDirection: 'row',
    padding: 50,
    justifyContent: 'center'
  },
  textContainer:{
    display: 'flex',
    width: 400,
    height: 'fit-content',
    padding: 20,
    marginRight: 150,
    flexDirection: 'column'
  },
  title:{
    color: '#000',
    fontSize: 30,
  },
  description: {
    color: '#000',
    fontSize: 16,
    marginTop: 30,
  },
  postsColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
}
