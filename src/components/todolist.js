import React, { Component } from 'react';
// import { addingTodoAction } from '../store/action/action';
import { renderingTodoAction } from '../store/action/action';
// import { editingStateAction } from '../store/action/action';
import '../App.css';

import { connect } from 'react-redux';
import firebase from 'firebase';


class TodoList extends Component {
    deletingTodo(a, b) {
        firebase.database().ref('/').child("todos/" + a).remove()
        let todos = this.props.addedTodos;
        let afterDeleted = todos.slice(0, b).concat(todos.slice(b + 1))
        this.props.rendering(afterDeleted)
    }
    editingHandler(id, key, todo) {
        this.props.editingFunc(id, key, )
    }
    render() {
        console.log(this.props.editiing)

        return (

            <div>

                <div  >
                

                    <ul className="App">
                        {this.props.addedTodos.map((todo, key) => {
                            return (
                                <li className="App pp" key={key} id={todo.id}>
                                    <div class="row" >
                                        <div class="col-sm-4" >
                                            <div class="card" >
                                                <div class="card-body" >
                                                     <h5 class="card-title" >{todo.todo}</h5> 
                                                    {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                                    <a href="#" class="btn btn-primary buttonPadding " onClick={this.editingHandler.bind(this, todo.id, key, todo.todo)}>Edit</a>
                                                    <a href="#" class="btn btn-primary" onClick={this.deletingTodo.bind(this, todo.id, key)}>Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            )
                        })
                        }
                    </ul>
                </div>



            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        addedTodos: state.root.todos,
        editingState: state.root.editingState

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        rendering: (finaltodo) => { dispatch(renderingTodoAction(finaltodo)) },
        //    editing: ()=>{dispatch(editingStateAction())}
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(TodoList);