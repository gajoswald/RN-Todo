import React from 'react';
import uuid from 'react-native-uuid';
import initialState from './data';

const reducer = (state, action) => {
  switch( action.type ) {
    case "addTodo": {
      const newTodo = {
        id: uuid.v4(),
        text: "enter text here",
        complete: false
      };
      return {
        ...state,
        activeID: newTodo.id,
        todos: [...state.todos, newTodo],
      };      
    }
    case "editTodo": {
      const todo = Object.assign({},state.todos.find( todo => todo.id === action.id ));
      const otherTodos = state.todos.filter( todo => todo.id !== action.id );
      todo.text = action.text;
      return {
        ...state,
        todos: [...otherTodos, todo]
      }
    }
    case "completeTodo": {
      const todo = Object.assign({},state.todos.find( todo => todo.id === action.id ));
      const otherTodos = state.todos.filter( todo => todo.id !== action.id );
      todo.complete = true;
      return {
        ...state,
        todos: [...otherTodos, todo]
      }      
    }
    case "removeTodo": {
      return {
        ...state,
        todos: state.todos.filter( todo => todo.id !== action.id )
      }
    }
    case "openDialogue": {
      return {
        ...state,
        dialogueVisible: true,
      }
    }
    case "closeDialogue": {
      return {
        ...state,
        dialogueVisible: false,
        activeID: 0,
      }
    }
    case "setActiveID": {
      return {
        ...state,
        activeID: action.id,
      }
    }
    default: {
      return state
    }
  }
}

const TodoListContext = React.createContext();

const Provider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);  
  const value = {
    todos:            state.todos,
    activeID:         state.activeID, 
    dialogueVisible:  state.dialogueVisible,
    setActiveID:      (id)        => { dispatch( {type: "setActiveID", id} ) },
    addTodo:          (text)      => { dispatch( {type: "addTodo", text} ) },
    editTodo:         (id, text)  => { dispatch( {type: "editTodo", id, text} ) },
    removeTodo:       (id)        => { dispatch( {type: "removeTodo", id} ) },
    completeTodo:     (id)        => { dispatch( {type: "completeTodo", id} ) },
    openDialogue:     ()          => { dispatch( {type: "openDialogue" } ) },
    closeDialogue:    ()          => { dispatch( {type: "closeDialogue" } ) }
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  )
}

export {TodoListContext, Provider}