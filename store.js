import React from 'react';
import uuid from 'react-native-uuid';
import initialState from './data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'addTodo': {
      const newTodo = {
        id: uuid.v4(),
        text: 'enter text here',
        complete: false,
      };
      return {
        ...state,
        activeTodo: newTodo.id,
        todos: [...state.todos, newTodo],
      };
    }
    case 'editTodo': {
      const todo = Object.assign(
        {},
        state.todos.find((todo) => todo.id === action.id),
        action.fields // crazy JS voodoo
      );
      const otherTodos = state.todos.filter((todo) => todo.id !== action.id);
      return {
        ...state,
        todos: [...otherTodos, todo],
      };
    }
    case 'removeTodo': {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    }
    case 'addList': {
      return {
        ...state,
        lists: [ ...state.lists, {
          id: uuid.v4(),
          text: action.text
        }]
      }  
    }
    case 'editList': {
      return state
    }
    case 'removeList': {
      return state
    }
    case 'openTodoDialogue': {
      return {
        ...state,
        todoDialogueVisible: true,
      };
    }
    case 'closeTodoDialogue': {
      return {
        ...state,
        todoDialogueVisible: false,
        activeTodo: 0,
      };
    }
    case 'setActiveTodo': {
      return {
        ...state,
        activeTodo: action.id,
      };
    }
    case 'setActiveList': {
      return {
        ...state,
        activeList: action.id,
      }
    }    
    default: {
      return state;
    }

  }
};

const TodoListContext = React.createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = {
    todos: state.todos,
    lists: state.lists,
    activeTodo: state.activeTodo,
    activeList: state.activeList,
    todoDialogueVisible: state.todoDialogueVisible,
    setActiveTodo: (id) => {
      dispatch({ type: 'setActiveTodo', id });
    },
    setActiveList: (id) => {
      dispatch({ type: 'setActiveList', id });
    },
    addTodo: (text) => {
      dispatch({ type: 'addTodo', text });
    },
    editTodo: (id, fields) => {
      dispatch({ type: 'editTodo', id, fields });
    },
    removeTodo: (id) => {
      dispatch({ type: 'removeTodo', id });
    },
    openTodoDialogue: () => {
      dispatch({ type: 'openTodoDialogue' });
    },
    closeTodoDialogue: () => {
      dispatch({ type: 'closeTodoDialogue' });
    },
    addList: (text) => {
      dispatch({ type: 'addList', text })
    }
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, Provider };
