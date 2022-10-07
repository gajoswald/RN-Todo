import * as React from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';

import { Card, Paragraph, Button, Provider, Dialog, Portal, TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';

const DATA = [
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
]

export default function App() {
  const [todos, setTodos] = React.useState(DATA);
  const [editDialogVisibile, setEditDialogVisible] = React.useState(false);
  const [activeTodo, setActiveTodo] = React.useState(undefined);

  const createTodo = () => {
    const newTodo = {
      id: uuid.v4(),
      text: "enter text here",
      complete: false
    }
    updateTodo(newTodo);
  }  

  const Todo = ({item}) => (
    <Card>
      <Card.Content>
        <Paragraph style={styles.paragraph}>{item.text}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button disabled={item.complete} onPress={() => markAsDone(item)}>Done</Button>
        <Button onPress={() => updateTodo(item)}>Edit</Button>
        <Button onPress={() => deleteTodo(item)}>Delete</Button>
      </Card.Actions>
    </Card>
  )

  const updateTodo = (todo) => {
    setActiveTodo(todo);
    showDialog();
  }
  
  const markAsDone = (todo) => {
    todo.complete = true;
    updateTodos(todo);
  }

  const updateTodos = (todo = activeTodo) => {
    setTodos( [...todos.filter( item => item.id !== todo.id ), todo] );
  }

  const deleteTodo = (todo) => {
    setTodos( todos.filter( item => item.id !== todo.id));
  }

  const showDialog = () => setEditDialogVisible(true);
  const hideDialog = () => setEditDialogVisible(false);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={todos}
          renderItem={({item}) => <Todo item={item}/>}
          keyExtractor={todo => todo.id}
          ListFooterComponent={<Button onPress={createTodo} >Add Todo</Button>}
        />
        <Portal>
          <Dialog visible={editDialogVisibile} onDismiss={hideDialog}>
            <Dialog.Title>Editing...</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Todo Text"
                value={activeTodo ? activeTodo.text : ""}
                onChangeText={text => setActiveTodo({...activeTodo, text})}/>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={ () => {
                updateTodos();
                hideDialog();
              }}>Done</Button>
            </Dialog.Actions>
          </Dialog>  
        </Portal>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },  
});
