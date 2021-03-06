import React, { Component } from 'react';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import SecurityActions from '../actions/SecurityActions';
import SecurityStore from '../stores/SecurityStore';
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
      hello: null
    }
    
    this.onBooksStoreChange = this.onBooksStoreChange.bind(this);
    
  }

  componentWillMount() {
    BooksStore.listen(this.onBooksStoreChange);
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
  }

  onBooksStoreChange(state) { //state is referring to BooksStore.state, gets the state from BooksStore and sets Main.js state
    console.log(state);
    console.log('before', this.state)
    this.setState({books: state.books, hello: state.hello})

    console.log('after', this.state)
  }

  render() {
    let books = [];
    let landingUrl = require('../images/landingPage.jpg')

    for (var i = 0; i < this.state.books.length; i++) {
      let book = this.state.books[i]
      let bookElement = (
        <BookRow key={i} book={book}/>  
      )

      books.push(bookElement)
    }

    return (
      <div className="container">
        <Navbar />
          <div className="boxShadowNoHover" style={styles.textContainer}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', width: `60%`, textAlign: "justify"}}>
              <span style={styles.title}>Welcome to Bookravel</span>
              <span style={styles.description}>Sign up to acces other user comments and review our philosophy book catalogue</span>
            </div>  
          </div>
          <div style={styles.columns}>
            <div style={styles.postsColumn}>
              {books}
            </div>
        </div>
      </div>
    );
  }
}

const styles = {
  columns: {
    display: 'flex',
    flexDirection: 'column',
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: `90%`
  },
  textContainer:{
    display: 'flex',
    width: `100%`,
    height: `40vh`,
    background: `#F1F3DF`,
    height: 'fit-content',
    padding: 80,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -30
  },
  title:{
    color: 'black',
    fontSize: 30,
    lineHeight: `160%`
  },
  description: {
    color: 'black',
    fontSize: 16,
    marginTop: 30,
    lineHeight: `160%`
  },
  postsColumn: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: `15px 35px`
  }
}
