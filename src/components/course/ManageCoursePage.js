import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import CourseForm from './CourseForm';

class ManageCoursePage extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            course: Object.assign({}, props.course),
            //authors: this.props.authors,
            errors: {}
        };
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.course.id != nextProps.course.id){
            this.setState({ course: Object.assign({}, nextProps.course)});
        }
    }
    updateCourseState(event){
        const field = event.target.name;
        const courseFromState = this.state.course;
        let course = Object.assign({}, courseFromState);
        course[field] = event.target.value;
        return this.setState({course:course});
    }
    saveCourse(event){
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }
    render() {
        return (
          
                <CourseForm allAuthors = {this.props.authors} course={this.state.course} errors={this.state.errors}
                onChange={this.updateCourseState} onSave={this.saveCourse}/>
           
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequred
};
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses,id){
    const course = courses.filter(course => course.id == id);
    if(course.length){
        return course[0];
    } 
    return null;
}

function mapStateToProps(state,ownProps) {
    const courseId = ownProps.params.id;
    let course = {id:'',courseId:'', watchHref:'',title:'',authorId:'',length:'',category:''};

    if(courseId && state.courses.length > 0){
        course = getCourseById(state.courses, courseId);
    }
    const authorsFormattedForDropdown = state.authors.map(a =>{
        return {
            value: a.id,
            text: `${a.firstName} ${a.lastName}`
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions,dispatch)
    };
}


export default connect(
    mapStateToProps,mapDispatchToProps
)(ManageCoursePage);

