import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

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

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    // Don't rely only on the value of input. For example, the input value can be 0 and it's valid which means it should be true for the if statement, but the if statement treats 0 as false. so check the type of the input instead of the value.
    if(typeof this.props.lastVisitedAt === 'number'){
      visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()} @ ${moment(this.props.lastVisitedAt).format('MMM Do, YYYY h:mma')})`;
    }
    return (
      <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    );
  }

  render() {
    return(
      <div className="item">
        <h3>{this.props.url}</h3>
        <p className="item__message">{this.props.shortUrl}</p>
        {/* <p>{this.props.visible.toString()}</p> */}
        {this.renderStats()}
        <a
          className="button button--pill button--link"
          href={this.props.shortUrl}
          target="_blank"
        >
          Visit
        </a>
        <button
          className="button button--pill"
          ref="copy"
          data-clipboard-text={this.props.shortUrl}
        >
          {this.state.justClicked ? 'Copied' : 'Copy'}
        </button>
        <button className="button button--pill" onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}


LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
}
