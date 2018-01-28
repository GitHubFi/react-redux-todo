
import ActionTypes from '../constant/constant';


import firebase from 'firebase';
//   var config = {
//     apiKey: "AIzaSyBGjYTYniuVDafF-Y7JzEhlqS0sjwTC2Fc",
//     authDomain: "reactapp-1.firebaseapp.com",
//     databaseURL: "https://reactapp-1.firebaseio.com",
//     projectId: "reactapp-1",
//     storageBucket: "reactapp-1.appspot.com",
//     messagingSenderId: "377679504336"
//   };
//   firebase.initializeApp(config);

var config = {
    apiKey: "AIzaSyCpalg1uXUC0ogyuoYkw5MhXlP-UUj3vNU",
    authDomain: "my-todo-e0210.firebaseapp.com",
    databaseURL: "https://my-todo-e0210.firebaseio.com",
    projectId: "my-todo-e0210",
    storageBucket: "my-todo-e0210.appspot.com",
    messagingSenderId: "241371353227"
};
firebase.initializeApp(config);

var database = firebase.database();

export function addingTodoAction(todo) {
    return dispatch => {
        database.ref("/").child("todos").push(todo)
        
    }
}
export function renderingTodoAction(data) {
    return dispatch => {

        dispatch({ type: ActionTypes.GETTINGTODO, payload: data })


            

}
}

export function deleteAllAction() {
    return dispatch => {
        database.ref("/").child("todos").remove()
        let todos = []
        dispatch({ type: ActionTypes.DELETEALL, payload: todos})

    }
}
