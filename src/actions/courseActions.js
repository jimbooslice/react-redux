import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses){
    return { type:types.LOAD_COURSES_SCCUESS, courses};
}


export function loadCourses(){

    return dispatch =>
    { 
        courseApi.getAllCourses()
        .then(c => { dispatch(loadCoursesSuccess(c));})
        .catch(e => { 
            throw(e);
        });
};
    // return function(dispatch){
    //     return courseApi.getAllCourses().then(c => {
    //         dispatch(loadCoursesSuccess(c));
    //     }).catch(error => {
    //         throw(error);
    //     });
    // };
}