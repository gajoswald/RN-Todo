import React, {useContext} from 'react'
import { FlatList, ListFooterComponent } from 'react-native';
import { Card, Paragraph, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import {TodoListContext} from '../store';
import Todo from './Todo'

export default () => {
  const {todos, addTodo, openTodoDialogue, activeList} = useContext(TodoListContext);
  const [displayTodos, setDisplayTodos] = React.useState( [] )

  React.useEffect( () => {
    setDisplayTodos(  todos.filter( todo => todo.list === activeList ) )
  }, [todos,activeList]);

  const newTodo = () => {
    addTodo();
    openTodoDialogue();
  }
  
  return (
    <FlatList
      data={displayTodos}
      renderItem={({item}) => <Todo item={item}/>}
      keyExtractor={item => item.id}
      ListFooterComponent={<Button onPress={() => newTodo()} >Add Todo</Button>}
    />    
  )
}