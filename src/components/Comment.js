import React, { Component } from 'react';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import SecurityStore from '../stores/SecurityStore';
import {API} from '../config/endpoints';

export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      me: SecurityStore.state.me,
    }
  }

  componentWillMount() {

  }
  
  componentDidMount() {

  }

  componentWillUnmout() {

  }

  render() {
  	return(
  		<div style={styles.container}>
  			<div style={styles.coment}>
          <div style={{marginBottom: -15}}><h3>{this.state.me.username}:</h3></div>
          <div style={{marginBottom: 16}}>
            <h4> Title: </h4>
            <p style={styles.titleContent}>{this.props.comment.title}</p>
          </div>	
          <div style={{marginBottom: 16}}>    
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <h4> Review: </h4>
            <div style={{display: "flex", alignItems: "flex-end", marginBottom: 21}}>
              <button style={styles.buttonOne} onClick={() => this.props.voteUp(this.props.comment)}>Up</button> 
              <button style={styles.buttonTwo} onClick={() => this.props.voteDown(this.props.comment)}>Down</button>
              <span style={{marginBottom: 2}}>{this.props.comment.voteUp - this.props.comment.voteDown}</span>
            </div>  
          </div>
            <p style={styles.commentContent}>{this.props.comment.content}</p>  
          </div>	
        </div>
      </div>
  	)
  }

}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: `25px`
  },
  coment: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  votesContainer: {
    display: 'flex',
    flexDirection: "row"
  },
  commentContent: {
    background: `#e5c572`,
    margin: "0 auto",
    maxWidth: 500, 
    padding: 16,
    borderRadius: 18
  },
    titleContent: {
    background: `#e5c572`,
    margin: "0 auto",
    minWidth: 70,
    maxWidth: 500, 
    padding: 16,
    borderRadius: 18
  },
  buttonOne: {
    marginRight: 7,
    width: 42,
    height: 27,
    borderRadius: 25,
    background: `rgb(241, 243, 223)`
  },
  buttonTwo: {
    marginRight: 10,
    width: 42,
    height: 27,
    borderRadius: 25,
    background: `rgb(241, 243, 223)`

  }

}
