import React, {useContext} from 'react'
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Button, TextInput } from 'react-native-paper';
import { TodoListContext } from '../store';
import theme from '../theme';

export default ({item}) => {
  const {openDialogue, setActiveID, removeTodo, completeTodo } = React.useContext(TodoListContext);

  const editTodo = (id) => {
    setActiveID(id);
    openDialogue();
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Paragraph >{item.text}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button style={styles.button} disabled={item.complete} onPress={() => completeTodo(item.id)}>Done</Button>
        <Button style={styles.button} onPress={() => editTodo(item.id)}>Edit</Button>
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