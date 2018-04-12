import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showVisible: true
    }
  }

  componentDidMount() {
    this.tracker = Tracker.autorun( () => {
      this.setState({
        showVisible: Session.get('showVisible')
      });
    });
  }

  componentWillUnmount(){
    this.tracker.stop();
  }

  render() {
    const {showVisible} = this.state;
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox--box" type="checkbox" checked={!showVisible} onChange={ (e) => {
            Session.set('showVisible', !e.target.checked);
          }} />
          show hidden links
        </label>
      </div>
    );
  }
}
