import React, {useContext} from 'react'
import { FlatList, ListFooterComponent } from 'react-native';
import { Card, Paragraph, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import {TodoListContext} from '../store';
import Todo from './Todo'

export default () => {
  const {todos, addTodo, openDialogue, dialogueVisible} = useContext(TodoListContext);
  const {activeID} = useContext(TodoListContext);
  const newTodo = () => {
    addTodo();
    openDialogue();
  }
  
  return (
    <FlatList
      data={todos}
      renderItem={({item}) => <Todo item={item}/>}
      keyExtractor={item => item.id}
      ListFooterComponent={<Button onPress={() => newTodo()} >Add Todo</Button>}
    />    
  )
}