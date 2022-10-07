import * as React from 'react';
import { Chip, Surface, Switch, Card, Paragraph, Button, Dialog, Portal, Provider, TextInput, Caption, ThemeProvider } from 'react-native-paper';
import {TodoListContext} from '../store';
import theme from '../theme';

export default () => {
  const {todoDialogueVisible} = React.useContext(TodoListContext);
  if( todoDialogueVisible ) {
    const {todos, activeTodo, editTodo, closeTodoDialogue, activeList, lists} = React.useContext(TodoListContext);
    const currentTodo = todos.find( todo => todo.id === activeTodo );
    const [text, setText] = React.useState(currentTodo.text);  
    const [complete, setComplete] = React.useState(currentTodo.complete);

    const finishEditing = () => {
      editTodo(activeTodo, {text,complete});
      closeTodoDialogue();
    }

    const toggleComplete = () => {
      setComplete(!complete);
      editTodo(activeTodo, {complete});
    }

    const moveToList = (id) => {
      editTodo(activeTodo, {list:id})
    }

    const listChips = 
      <Surface>
        {lists.map( list => 
          <Chip 
            selected={currentTodo.list === list.id}
            onPress={() => moveToList(list.id)}
            >{list.text}
          </Chip>
        )}
      </Surface>
    return (
      <Provider>
        <ThemeProvider theme={theme}>
          <Portal>
            <Dialog visible={todoDialogueVisible} onDismiss={() => finishEditing()}>
              <Dialog.Title>Editing</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="Todo Text"
                  value={text}
                  onChangeText={text => setText(text)}/>
                {listChips}
                <Switch
                  value={complete}
                  onValueChange={toggleComplete}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => finishEditing()}>Done</Button>
              </Dialog.Actions>
            </Dialog>   
          </Portal> 
        </ThemeProvider>
      </Provider>
    )
  } else {
    return <></>
  }
}