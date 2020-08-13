import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import CreateEmployee from './screens/createEmployee';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { reducer } from './reducers/reducer';

const store = createStore(reducer)


const Stack = createStackNavigator();

const MyOptions = {
  title: "Home Screen",
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#1D48D3',
  }
};

function App() {
  return (
    <View style={styles.container}>
          <Stack.Navigator>
              <Stack.Screen 
              name="Home" 
              component={Home} 
              options={MyOptions}
              />
              <Stack.Screen
               name="Create" 
               component={CreateEmployee} 
               options={{...MyOptions, title:"Create Employee"}}
               />
              <Stack.Screen 
              name="Profile" 
              component={Profile} 
              options={{...MyOptions, title:"Profile"}}
              />
          </Stack.Navigator>
        </View>
  );
}

export default () => {
  <Provider store={store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    marginTop: 35
  },
});
