import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PropTypes from 'prop-types'; // Import PropTypes

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/Homescreen';
import SignUp from './screens/Signup';
import Notifications from './screens/notifications';
import communities from './screens/community';
import ProfileScreen from './screens/Profile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="communities" component={communities} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Signup" component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Define PropTypes for App component
App.propTypes = {
  // You can define prop types here if needed
};

export default App;
