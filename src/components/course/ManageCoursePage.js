import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';


class ManageCoursePage extends Component {
    render() {
        return (
            <div>
                <h1>Manage Course</h1>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions,dispatch)
    };
}

ManageCoursePage.propTypes = {
    actions: PropTypes.object.isRequired
};
export default connect(
    mapStateToProps,mapDispatchToProps
)(ManageCoursePage);

