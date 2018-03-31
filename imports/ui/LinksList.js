import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';

export default class LinksList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      links: [],
    };
  }

  // After the component is rendered, this method will be called.
  componentDidMount(){
    console.log('componentDidMount LinksList');

    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find().fetch();
      this.setState({links});
    });
  }

  // Function called when the component is removed.
  componentWillUnmount(){
    console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
  }

  renderLinksListItems(){
    return this.state.links.map( (link) => {
      return <p key={link._id}>{link.url}</p>
    });
  }

  render() {
    return(
      <div>
        {this.renderLinksListItems()}
      </div>
    );
  }
}
