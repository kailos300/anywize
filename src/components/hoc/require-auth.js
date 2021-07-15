import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAuthenticatedUser, setPostAuthPath } from "../../redux/modules/authentication";

const Auth = (ComposedComponent) => {
  class Authentication extends Component {
    static propTypes = {
      authenticated: PropTypes.bool,
      history: PropTypes.shape({
        push: PropTypes.func,
      }),
      match: PropTypes.shape({
        path: PropTypes.string,
      }),
      setPostAuthPath: PropTypes.func,
      getAuthenticatedUser: PropTypes.func,
    };

    // List of pre-authention routes, so they aren't saved for a post-auth redirect
    static preAuthRoutes = ["/login"];

    componentDidMount = () => this.ensureAuthentication(this.props.authenticated);

    componentWillUpdate = (nextProps) => {
      if (this.props.authenticated !== nextProps.authenticated) {
        this.ensureAuthentication(nextProps.authenticated);
      }
    };

    ensureAuthentication = (isAuthed) => {
      if (!localStorage.getItem('token')) {
        const path = _.get(this.props.match, "path");

        // Save the user's path for future redirect
        if (path && !Authentication.preAuthRoutes.includes(path)) {
          this.props.setPostAuthPath(path);
        }

        // Redirect to the login page
        return this.props.history.push("/login");
      }
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth }) => ({ authenticated: auth.authenticated });

  return withRouter(
    connect(mapStateToProps, { getAuthenticatedUser, setPostAuthPath })(Authentication)
  );
};

export default Auth;
