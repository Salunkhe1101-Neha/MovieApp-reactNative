import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
const Stack = createStackNavigator();
import Home from './Netflix/Home';
function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}
export default App;