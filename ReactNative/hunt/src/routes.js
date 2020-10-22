import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/main';
import Product from './pages/product';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#DA552F',
  },
  headerTitleAlign: 'center',
  headerTintColor: '#FFF',
};

const Routes = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="JSHunt" component={Main} />
    <Stack.Screen name="Product" component={Product} />
  </Stack.Navigator>
);

export default Routes;