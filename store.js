import React from 'react';
import uuid from 'react-native-uuid';
import { INITIAL_STATE, storeState, retrieveState } from './data';

const reducer = (state, action) => {
  let changes = {}
  switch (action.type) {
    case 'addTodo': {
      const newTodo = {
        id: uuid.v4(),
        text: 'enter text here',
        complete: false,
      };
      Object.assign(changes, {
        activeTodo: newTodo.id,
        todos: [...state.todos, newTodo],
      });
      break;
    }
    case 'editTodo': {
      const todo = Object.assign(
        {},
        state.todos.find((todo) => todo.id === action.id),
        action.fields // crazy JS voodoo
      );
      const otherTodos = state.todos.filter((todo) => todo.id !== action.id);
      Object.assign(changes, {
        todos: [...otherTodos, todo],
      });
      break;
    }
    case 'removeTodo': {
      Object.assign(changes, {
        todos: state.todos.filter((todo) => todo.id !== action.id),
      });
      break;
    }
    case 'addList': {
      Object.assign(changes, {
        lists: [
          ...state.lists,
          {
            id: uuid.v4(),
            text: action.text,
          },
        ],
      });
      break;
    }
    case 'editList': {
      return state;
    }
    case 'removeList': {
      return state;
    }
    case 'openTodoDialogue': {
      Object.assign(changes, {
        todoDialogueVisible: true,
      });
      break;
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
      };
    }
    case 'updateFromAsync': {
      Object.assign(changes, action.retrievedState)
      break;
    }
    default: {
      break;
    }
  }
  const newState = {
    ...state,
    ...changes
  }  
  storeState(newState);
  return newState;
};

const TodoListContext = React.createContext();

const Provider = ({ children }) => { 
  const [state, dispatch] = React.useReducer(reducer,INITIAL_STATE);

  React.useEffect( () => {
    const retrieve = async () => {
      return await retrieveState()
    }
    retrieve()
    .then( retrievedState => dispatch({ type: 'updateFromAsync', retrievedState }) )
  },[])

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
      dispatch({ type: 'addList', text });
    },
    updateFromAsync: (retrievedState) => {
      dispatch({ type: 'updateFromAsync', retrievedState })
    }
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, Provider };
