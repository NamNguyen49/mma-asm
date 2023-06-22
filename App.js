import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from "./src/screens/HomeScreen";
import OrchidDetailScreen from "./src/screens/OrchidDetailScreen";
import FavouriteOrchidsScreen from "./src/screens/FavouriteOrchidsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name="OrchidDetail" component={OrchidDetailScreen}/>
          <Tab.Screen name="FavouriteOrchids" component={FavouriteOrchidsScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}
