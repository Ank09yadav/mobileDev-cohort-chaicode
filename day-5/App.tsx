import React from 'react';
import { NavigationContainer, createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// import HomeScreen from './src/screens/HomeScreen';
// import DetailScreen from './src/screens/DetailScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const Stack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Details: DetailScreen,
    Profile: ProfileScreen
  }
})
const Navigation = createStaticNavigation(Stack);

export default function App(){
  return <Navigation/>
}