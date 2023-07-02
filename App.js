import 'react-native-gesture-handler';
import {StyleSheet, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";
import {useFonts, WorkSans_300Light, WorkSans_500Medium, WorkSans_600SemiBold, WorkSans_700Bold} from '@expo-google-fonts/work-sans';

import HomeScreen from './src/screens/HomeScreen';
import FavouriteOrchidsScreen from './src/screens/FavouriteOrchidsScreen';
import HomeSimple from './assets/icons/solid/home-simple.svg';
import Heart from './assets/icons/solid/heart.svg';
import AppText from "./src/components/AppText";
import colors from "./config/colors";
import OrchidDetailScreen from "./src/screens/OrchidDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = (props) => {
    return <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: [styles.tabBar],
        headerShown: false,
    }}>
        <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
                tabBarIcon: ({size, color}) => <HomeSimple width={size} height={size} fill={color}/>,
                tabBarLabel: ({color}) => <AppText style={{color}}>Trang chủ</AppText>,
            }}
        />
        <Tab.Screen
            name='FavouriteOrchids'
            component={FavouriteOrchidsScreen}
            options={{
                tabBarIcon: ({size, color}) => <Heart width={size} height={size} fill={color}/>,
                tabBarLabel: ({color}) => <AppText style={{color}}>Yêu thích</AppText>,
            }}
        />
    </Tab.Navigator>;
}

export default function App() {
    const [fontsLoaded] = useFonts({
        'WorkSans-Thin': WorkSans_300Light,
        'WorkSans-Regular': WorkSans_500Medium,
        'WorkSans-SemiBold': WorkSans_600SemiBold,
        'WorkSans-Bold': WorkSans_700Bold,
    });

    if (!fontsLoaded) {
        return;
    }

  return (
      <NavigationContainer>
          <View style={styles.container}>
              <Stack.Navigator screenOptions={{
                  headerShown: false,
              }}>
                  <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
                  <Stack.Screen name="OrchidDetail" component={OrchidDetailScreen} />
              </Stack.Navigator>
          </View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
    },
});