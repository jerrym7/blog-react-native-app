import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider } from './src/context/BlogContext';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';

/**
 * Create a navigator and tell it which screen lists are present and which screen to initialize (opening app) and add a title to the app
 */
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Blogs',
    },
  }
);

const App = createAppContainer(navigator); //this creates the app in a component, but we do not want to export this because we want to wrap it with a Provider
//Provider is used to save global variables that will be available all around their child components
export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
