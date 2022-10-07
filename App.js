import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from 'react-native';
import {Portal, ThemeProvider} from 'react-native-paper';
import Constants from 'expo-constants';
import {TodoListContext, Provider} from './store';
import TodoList from './components/TodoList';
import EditDialogue from './components/EditDialogue';
import theme from './theme';



export default function App() {
  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <TodoList />
          <EditDialogue />
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },  
});
