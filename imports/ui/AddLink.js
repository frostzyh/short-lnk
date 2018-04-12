import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Form, Segment, Button, Header, Grid, Message } from 'semantic-ui-react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '40%',
    right                 : '40%',
    bottom                : '30%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


export default class PrivateHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url: '',
      modalIsOpen: false,
      error: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleChange(e) {
      ;
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = this.state.url;

    //Links.insert({ url, userId: Meteor.userId() });
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleCloseModal();
      } else{
        this.setState({error: err.reason});
      }
    });
    //console.log("Link added:", url);

  }

  handleCloseModal() {
    this.setState({
      modalIsOpen: false,
      url: '',
      error: ''
    });
  }

  render(){
    const { url, modalIsOpen, error } = this.state;
    return(
      <div>
        <button className="button" onClick = {() => this.setState({modalIsOpen: true})}>+ Add Link</button>
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Add Link"
          onAfterOpen={ () => this.refs.url.focus()} //
          onRequestClose={this.handleCloseModal} // close modal when click on outside of modal
          style={customStyles}
          ariaHideApp={false}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"

        >
          <h1>Add Link</h1>
          {error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.handleSubmit} className="boxed-view__form">
            <input type='text' value={url} ref= "url" placeholder='url' onChange={(e) => this.setState({url: e.target.value.trim()})} />
            <button type="submit" className="button">Add Link</button>
            <button onClick={this.handleCloseModal} className="button button--secondary">Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
