import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/home';
import GoalScreen from '../screens/goals'
import FormScreen from '../screens/form/form'
import TestScreen from '../screens/test'

const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Goal: GoalScreen,
      Form: FormScreen,
      Test: TestScreen
    },
    {
      initialRouteName: 'Home',
    }
);

export default createAppContainer(RootStack);