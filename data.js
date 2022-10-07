import uuid from 'react-native-uuid';

export default { 
  todos: [
    {
      id: uuid.v4(),
      text: "a todo",
      complete: false,
    },
    { 
      id: uuid.v4(),
      text: "a todone",
      complete: true
    }
  ], 
  activeID: 0,
  dialogueVisible: false,
}