import * as React from 'react';
import { Card, Paragraph, Button, Dialog, Portal, Provider, TextInput, Caption, ThemeProvider } from 'react-native-paper';
import {TodoListContext} from '../store';
import theme from '../theme';

export default () => {
  const {dialogueVisible} = React.useContext(TodoListContext);
  if( dialogueVisible ) {
    const {todos, activeID, editTodo, closeDialogue} = React.useContext(TodoListContext);
    const currentTodo = todos.find( todo => todo.id === activeID );
    const [text, setText] = React.useState(currentTodo.text);  

    const finishEditing = () => {
      editTodo(activeID, text);
      closeDialogue();
    }

    return (
      <Provider>
        <ThemeProvider theme={theme}>
          <Portal>
            <Dialog visible={dialogueVisible} onDismiss={() => finishEditing()}>
              <Dialog.Title>Editing</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="Todo Text"
                  value={text}
                  onChangeText={text => setText(text)}/>
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