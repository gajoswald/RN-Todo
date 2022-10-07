import React, {useContext} from 'react'
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Button, TextInput } from 'react-native-paper';
import { TodoListContext } from '../store';
import theme from '../theme';

export default ({item}) => {
  const {openTodoDialogue, setActiveTodo, removeTodo, editTodo } = React.useContext(TodoListContext);

  const edit = (id) => {
    setActiveTodo(id);
    openTodoDialogue();
  }

  const markComplete = (id) => {
    setActiveTodo(id);
    editTodo(id, {complete:true});
  }  

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Paragraph >{item.text}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button style={styles.button} disabled={item.complete} onPress={() => markComplete(item.id)}>Done</Button>
        <Button style={styles.button} onPress={() => edit(item.id)}>Edit</Button>
        <Button style={styles.button} onPress={() => removeTodo(item.id)}>Delete</Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10
  },  
  button: {
    margin: 2,
    // backgroundColor: theme.colors.accentTransparent
  }
});