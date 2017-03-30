import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import query from '../queries/CurrentUser';
import logout from '../mutations/Logout';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }],
    });
  }
  renderButtons() {
    const { loading, currentUser } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (currentUser) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </div>
      );
    }
  }
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo left'>Home</Link>
          <ul className='right'>
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  mutate: PropTypes.func,
  data: PropTypes.shape({
    loading: PropTypes.bool,
    currentUser: PropTypes.object,
  }),
};
export default graphql(logout)(
  graphql(query)(Header),
);
