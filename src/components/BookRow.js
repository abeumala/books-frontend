import React, { Component } from 'react';
import { Link } from 'react-router'
import SecurityStore from '../stores/SecurityStore';
import SecurityActions from '../actions/SecurityActions';
import {API} from '../config/endpoints';
import { browserHistory } from 'react-router';

export default class BookRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favourited: false
    }

    this.favourite = this.favourite.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    SecurityStore.listen(this.onChange)

    let favourited = false
    
    if (SecurityStore.state.me && SecurityStore.state.me.favouriteBooks && SecurityStore.state.me.favouriteBooks.length > 0) {
      SecurityStore.state.me.favouriteBooks.map((book) => {
        if (book == this.props.book._id) {
          favourited = true
          return
        }
      })
    }
    
    this.setState({favourited: favourited})

  }
  
  componentDidMount(){
    
  }

  componentWillUnmout() {
    SecurityStore.unlisten(this.onChange)
  }

  onChange(state) {
    let favourited = false
    if (SecurityStore.state.me && SecurityStore.state.me.favouriteBooks && SecurityStore.state.me.favouriteBooks.length > 0) {
      SecurityStore.state.me.favouriteBooks.map((book) => {
        if (book == this.props.book._id) {
          favourited = true
          return
        }
      })
    }
    
    this.setState({favourited: favourited})
  }

  favourite = (e) => {
    e.stopPropagation(); //stops propagating the click event to the button parent


    if (SecurityStore.state.me) SecurityActions.updateMe(API.getMeURL(SecurityStore.state.me._id), this.props.book._id)
    else browserHistory.push('/signup')
    
  }

  goToBook = () => {
    if (SecurityStore.state.me) browserHistory.push('/book?id='+this.props.book._id)
    else browserHistory.push('/signup')
    
  }

  render() {
    let imageUrl = null
    if (this.state.favourited) {
      imageUrl = require('../images/favourited.png')
    }else{
      imageUrl = require('../images/nonFavourited.png')
    }

    return (
      <button onClick={this.goToBook} className="boxShadow link" style={styles.container} /*to={SecurityStore.state.me ? "/book?id="+this.props.book.id : "/signup"}*/>
        <img src={require("../images/" + this.props.book.coverUrl)} style={styles.image}/>
        <div style={styles.cover}/>
        <div style={styles.headerContainer} className="noLink">
          <div style={styles.textContainer}>
            <span style={styles.title}>{this.props.book.title}</span>
            <span style={styles.author}>{this.props.book.author}</span>
          </div>
          <button onClick={this.favourite} className="link" style={styles.favouriteButton}>
            <img src={imageUrl} style={{width: 20, height: 20}}/>
          </button>
        </div>
    	</button>
    );
  }
}

const styles = {
  container: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    width: 300,
    backgroundColor: 'lightgray',
    background: "#fff",
    borderRadius: 2,
    padding: 0,
  },
  image: {
    width: 300,
    height: 200,
    objectFit: 'none',
  },
  cover: {
    position: 'absolute',
    width: 300,
    height: 200,
    backgroundColor: "#000",
    opacity: 0.3,
  },
  headerContainer:{
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    width: 300,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  textContainer:{
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginLeft: 5,
    fontSize: 14,
    marginTop: 5,
    color: '#FFF'
  },
  author: {
    marginLeft: 5,
    marginTop: 5,
    fontSize: 12,
    color: 'rgb(220,220,220)',
    fontFamily: 'Roboto-Italic'
  },
  buttonContainer:{
    display: 'flex',
    width: 300,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  favouriteButton:{
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none'
  },
}
