import 'react-native-gesture-handler';
import { LogBox, StyleSheet, View } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import {
    useFonts,
    WorkSans_300Light,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold
} from '@expo-google-fonts/work-sans';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import HomeScreen from './src/screens/HomeScreen';
import FavouriteOrchidsScreen from './src/screens/FavouriteOrchidsScreen';
import HomeSimple from './assets/icons/solid/home-simple.svg';
import Heart from './assets/icons/solid/heart.svg';
import Cart from './assets/icons/solid/shopping-cart.svg';
import User from './assets/icons/solid/user.svg';
import AppText from "./src/components/AppText";
import colors from "./config/colors";
import OrchidDetailScreen from "./src/screens/OrchidDetailScreen";
import CartScreen from "./src/screens/CartScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LoginNavigationScreen from "./src/screens/LoginNavigationScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeAdmin from './src/admin/HomeAdmin';

LogBox.ignoreAllLogs();

GoogleSignin.configure({
    webClientId: '425714539085-96ml4cf338ibn5lfhvb53k3jbr8ef5dn.apps.googleusercontent.com'
});

if (__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export const AppContext = createContext({});

const MainTabNavigator = ({ contextChanges, navigation }) => {
    const { userInfo } = useContext(AppContext);

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
                tabBarIcon: ({ size, color }) => <HomeSimple width={size} height={size} fill={color} />,
                tabBarLabel: ({ color }) => <AppText style={{ color }}>Trang chủ</AppText>,
            }}
        />
        {/* <Tab.Screen
            name='FavouriteOrchids'
            options={{
                tabBarIcon: ({size, color}) => <Heart width={size} height={size} fill={color}/>,
                tabBarLabel: ({color}) => <AppText style={{color}}>Yêu thích</AppText>,
            }}
        >
            {props => userInfo ? <FavouriteOrchidsScreen {...props}/> : <LoginNavigationScreen/>}
        </Tab.Screen> */}
        {/* <Tab.Screen
            name='Cart'
            component={CartScreen}
            options={{
                tabBarIcon: ({size, color}) => <Cart width={size} height={size} fill={color}/>,
                tabBarLabel: ({color}) => <AppText style={{color}}>Giỏ hàng</AppText>,
            }}
        /> */}
        <Tab.Screen
            name='HomeAdmin'
            component={HomeAdmin}
            options={{
                tabBarIcon: ({ size, color }) => <Cart width={size} height={size} fill={color} />,
                tabBarLabel: ({ color }) => <AppText style={{ color }}>Admin</AppText>,
            }}
        />
        <Tab.Screen
            name='Profile'
            options={{
                tabBarIcon: ({ size, color }) => <User width={size} height={size} fill={color} />,
                tabBarLabel: ({ color }) => <AppText style={{ color }}>Tài khoản</AppText>,
            }}
        >
            {props => userInfo ? <ProfileScreen {...props} contextChanges={contextChanges} /> : <LoginNavigationScreen />}
        </Tab.Screen>
    </Tab.Navigator>;
}

export default function App() {
    const [context, setContext] = useState({});
    const [contextChanges, setContextChanges] = useState(true);

    useEffect(() => {
        loadContext();
    }, []);

    useEffect(() => {
        if (contextChanges) {
            loadContext();
        }
    }, [contextChanges]);

    const loadContext = async () => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const accessToken = await AsyncStorage.getItem('accessToken');

        setContext({
            userInfo: userInfo ? JSON.parse(userInfo) : null,
            accessToken,
        });
        setContextChanges(false);
    }

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
        <AppContext.Provider value={context}>
            <NavigationContainer>
                <View style={styles.container}>
                    <Stack.Navigator screenOptions={{
                        headerShown: false,
                    }}>
                        <Stack.Screen name="MainTabNavigator">
                            {props => <MainTabNavigator {...props} contextChanges={() => setContextChanges(true)} />}
                        </Stack.Screen>
                        <Stack.Screen name="OrchidDetail" component={OrchidDetailScreen} />
                        <Stack.Screen name="Login">
                            {props => <LoginScreen {...props} contextChanges={() => setContextChanges(true)} />}
                        </Stack.Screen>
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </Stack.Navigator>
                </View>
            </NavigationContainer>
            <Toast />
        </AppContext.Provider>
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
