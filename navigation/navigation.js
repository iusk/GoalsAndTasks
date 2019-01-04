import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/home';
import ProjectScreen from '../screens/goals'
import FormScreen from '../screens/form/form'

const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Project: ProjectScreen,
      Form: FormScreen,
    },
    {
      initialRouteName: 'Home',
    }
);

export default createAppContainer(RootStack);