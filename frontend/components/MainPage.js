import React, { Component } from 'react';
import { connect } from 'react-redux';
import Feed from './Feed';
import SignUpContainer from './session/SignUpContainer';
import { logout, fetchCurrentUser } from '../actions/session';
import { fetchAllUsers } from '../actions/user';
import { fetchFeed } from '../actions/post';

class MainPage extends Component {
  fetchInfo() {
    const {
      fetchCurrentUser,
      fetchAllUsers,
      fetchFeed,
      currentUser
    } = this.props;

    fetchAllUsers().then(() => {
      fetchCurrentUser();
    });
  }
  componentDidMount() {
    this.fetchInfo();
    this.liveUpdate = setInterval(() => this.fetchInfo(), 15000);
  }
  componentWillUnmount() {
    this.fetchInfo();
    clearInterval(this.liveUpdate);
  }
  render() {
    const { currentUser, logout, users } = this.props;
    if (!!currentUser) {
      return <Feed currentUser={currentUser} logout={logout} />;
    } else {
      return <SignUpContainer />;
    }
  }
}

const mapStateToProps = ({
  session: { currentUser },
  entities: { users }
}) => ({ currentUser, users });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchAllUsers: () => dispatch(fetchAllUsers()),
  fetchFeed: id => dispatch(fetchFeed(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
