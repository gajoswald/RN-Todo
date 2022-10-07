import React, {useContext} from 'react'
import { FlatList, ListFooterComponent } from 'react-native';
import { Surface, Chip, Card, Paragraph, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import {TodoListContext} from '../store';
import Todo from './Todo'

export default () => {
  const {setActiveList, addList, lists} = useContext(TodoListContext);
  const [creating,setCreating] = React.useState(false);

  const newList = () => {
    setCreating(true);
  }

  const doneEditing = (text) => {
    addList(text);
    setCreating(false);
  }

  const ListFooter = () => {
    const [text,setText] = React.useState("")
    return (
      <Surface>
        { creating ? 
          <TextInput 
            value={text} 
            onChangeText={setText} 
            onSubmitEditing={()=> doneEditing(text)}
            returnKeyType={"done"}/> : 
          <></> }
        <Button onPress={newList}>
          Add List
        </Button>
      </Surface>
    )
  }

  return (
    <FlatList
      data={lists}
      renderItem={({item}) => <Chip onPress={() => setActiveList(item.id)}>{item.text}</Chip> }
      keyExtractor={item => item.id}
      ListFooterComponent=<ListFooter/>
    />    
  )
}