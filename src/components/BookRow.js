import React, { Component } from 'react';
import { Link } from 'react-router'
import SecurityStore from '../stores/SecurityStore';

export default class BookRow extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {

  }
  
  componentDidMount(){
    
  }

  componentWillUnmout() {

  }

  render() {
    return (
    	<Link className='singleBook' to={"/book?id="+this.props.book._id}>
      {/*<Link className='singleBook' to={SecurityStore.state.me ? "/book?id="+this.props.book.id : "/signup"}>*/}
				<span>{this.props.book.title}</span>
        <span>{this.props.book.author}</span>
    	</Link>
    );
  }
}
