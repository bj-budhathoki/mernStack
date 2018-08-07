import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//actions
import { getCurrentProfile } from "../../actions/profileActions";
class dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  render() {
    return (
      <div>
        <h1>dashBoard</h1>
      </div>
    );
  }
}
export default connect(
  null,
  { getCurrentProfile }
)(dashboard);
