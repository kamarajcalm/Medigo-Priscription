import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Doctors from '../Screens/Doctors';
import SearchDoctors from '../Screens/SearchDoctors';
const Stack = createStackNavigator();
export default class DoctorsStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Doctors" component={Doctors} options={{ headerShown: false }} />
            <Stack.Screen name="SearchDoctors" component={SearchDoctors} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
  }
}