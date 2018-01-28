import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { addingTodoAction } from '../store/action/action';
import TodoList from './todolist';
import { renderingTodoAction } from '../store/action/action';
import { deleteAllAction } from '../store/action/action';
import '../App.css';
import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';


class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editingState: false,
            editingTodo: "",
            editingTodoId: "",
            editingIndex: "",
            todo: ""
        }
        firebase.database().ref('/').child("todos").on("child_added", (snap) => {
            let todoData = snap.val()
            todoData.id = snap.key
            let TodoObj = this.props.todos
            TodoObj = TodoObj.concat(todoData)
            this.props.rendering(TodoObj)

        })
        firebase.database().ref('todos/').on('child_changed', (data) => {
            let editedTodo = data.val();
            editedTodo.id = data.key;
            console.log(editedTodo)
            let todos = this.props.todos
            todos[this.state.editingIndex] = editedTodo
            this.props.rendering(todos)
        })
    }



    changeHandler(ev) {
        this.setState({
            todo: ev.target.value
        })
    }
    addTodo() {
        if (this.state.todo !== "") {
            let todo = {
                todo: this.state.todo
            }
            this.props.addingTodo(todo)
            this.setState({
                todo: ""
            })
        }
        else {
            alert("Enter Something to Add")
        }
    }
    editTodo(id, key, todo) {
        console.log("editing", id, key, todo)
        this.setState({
            editingState: true,
            editingTodo: todo,
            editingTodoId: id,
            editingIndex: key
        })

    }
    doneEditing() {
        firebase.database().ref('/').child("todos/" + this.state.editingTodoId).set({ todo: this.refs.update.value })
        this.setState({ editingState: false })
    }
    cancelEditing() {
        this.setState({ editingState: false })
    }
    deleteAlll() {
        this.props.deleteAll()
        console.log(this.props.todos)
    }
    render() {
        return (
            <MuiThemeProvider>
                <AppBar title="Todo App With React, Redux and Firebase"
                    iconClassNameRight="muidocs-icon-navigation-expand-more" />
                <div className="App">
                    {this.state.editingState !== true
                        ?
                        <div >
                            <div >
                                <h1> Todo App </h1>
                                <TextField
                                    floatingLabelText="Enter your Todo" className="buttonPadding"type="text" value={this.state.todo} onChange={this.changeHandler.bind(this)} />
                                {/* <input  type="text" value={this.state.todo} onChange={this.changeHandler.bind(this)}/> */}
                                <button class="btn btn-primary buttonPadding"  onClick={this.addTodo.bind(this)}>Add</button>
                                <button class="btn btn-primary" onClick={this.deleteAlll.bind(this)}>Delete</button>
                            </div>
                            <div >

                                <div ></div>
                                <div>
                                    <TodoList editiing={this.state.editingState} editingFunc={this.editTodo.bind(this)} />
                                </div >

                            </div>

                        </div>

                        :
                        <div className="App">
                        
                            <h1> Editing Your Todo </h1>

                            {/* <input class="App" type="text" className="form-control" ref="update" placeholder={this.state.editingTodo} />
                            <button class="btn btn-primary" onClick={this.doneEditing.bind(this)}>Submit</button>
                            <button class="btn btn-primary" onClick={this.cancelEditing.bind(this)}>Exit</button> */}


                            <div class="row"  >
                                <div class="col-sm-4" >
                                    <div class="card" >
                                        <div class="card-body" >
                                            <input  type="text" className="form-control bottomBottom" ref="update" placeholder={this.state.editingTodo} />
                                            <button class="btn btn-primary buttonPadding" onClick={this.doneEditing.bind(this)}>Submit</button>
                                            <button class="btn btn-primary" onClick={this.cancelEditing.bind(this)}>Exit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    
                    }


                </div>

            </MuiThemeProvider>

        )
    }
}

function mapStateToProp(state) {
    return ({
        todos: state.root.todos
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        addingTodo: (addedTodo) => { dispatch(addingTodoAction(addedTodo)) },
        rendering: (todos) => { dispatch(renderingTodoAction(todos)) },
        deleteAll: () => { dispatch(deleteAllAction()) }

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(AddTodo);