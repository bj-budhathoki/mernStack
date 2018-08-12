import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//actions
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
class dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashBoardContent;
    if (profile === null || loading) {
      dashBoardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashBoardContent = <h4>display profile</h4>;
      } else {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">welcome {user.name}</p>
            <p>you have not setup your profile, please add some..</p>
            <Link to="/create-profile" extact className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};
const mapStsteToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStsteToProps,
  { getCurrentProfile }
)(dashboard);
