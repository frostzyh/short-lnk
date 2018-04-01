import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

/*
// Stateless Implementation
export default (props) => {
  return(
    <Segment>
      <h3>{props.url}</h3>
      <p>{props.shortUrl}</p>
    </Segment>
  );
}
*/


export default class LinksListItem extends React.Component {
  // Initialize clipboard. runs after the component output has been rendered to the DOM
  constructor(props){
    super(props);
    this.state = {
      justClicked: false
    };
  }

  componentDidMount(){
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      //console.log("Copy success!")
      this.setState({justClicked: true});
      setTimeout(
        () => this.setState({justClicked: false}), 2000);
    });

    this.clipboard.on('error', () => {
      console.log("Coyp failed");
    });
  }

  componentWillUnmount(){
    this.clipboard.destroy();
  }

  render() {
    return(
      <Segment>
        <h3>{this.props.url}</h3>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.visible.toString()}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justClicked ? 'Copied' : 'Copy'}
        </button>
        <button onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Show'}
        </button>
      </Segment>
    );
  }
}


LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
}
