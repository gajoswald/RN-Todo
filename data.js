import uuid from 'react-native-uuid';

export default {
  lists: [{
    id: 0,
    text: "default"
  }],
  todos: [{
    id: uuid.v4(),
    text: "a todo",
    complete: false,
    list: 0,
  },{ 
    id: uuid.v4(),
    text: "a todone",
    complete: true,
    list: 0,
  }],
  activeTodo: 0,
  activeList: 0,
  todoDialogueVisible: false,
  listDialogueVisible: false,
}