import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/home';
import ProjectScreen from '../screens/goals'
import FormScreen from '../screens/form/form'
import TestScreen from '../screens/test'

const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Project: ProjectScreen,
      Form: FormScreen,
      Test: TestScreen
    },
    {
      initialRouteName: 'Home',
    }
);

export default createAppContainer(RootStack);