import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STATE_KEY = "@current_state";

const INITIAL_STATE = {
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

async function storeState(value) {
  try {
    const json = JSON.stringify(value)
    await AsyncStorage.setItem(STATE_KEY, json);
    
  } catch(e) {
    console.log( "error storing state" );
  }
}

async function retrieveState(key=STATE_KEY) {
  let json;
  try {
    json = await AsyncStorage.getItem(key);
  } catch( e ) {
    console.log( `error retrieveing state ${key}` );
  }
  return JSON.parse(json); 
}

export { INITIAL_STATE, storeState, retrieveState };