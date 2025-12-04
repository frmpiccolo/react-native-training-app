
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { useGlobalValues } from '../context/GlobalVariableContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import FinanceSummaryScreen from '../screens/FinanceSummaryScreen';
import AmenitiesScreen from '../screens/AmenitiesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ContactScreen from '../screens/ContactScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

/**
 * Navegador principal do aplicativo.
 * Define as rotas e determina a tela inicial com base na presença do token.
 */
import { useSafeAreaInsets } from 'react-native-safe-area-context';


function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="FinanceSummary" component={FinanceSummaryScreen} options={{ headerBackTitle: 'Voltar' }} />
      <HomeStack.Screen name="Amenities" component={AmenitiesScreen} options={{ headerBackTitle: 'Voltar' }} />
      <HomeStack.Screen name="Notifications" component={NotificationScreen} options={{ headerBackTitle: 'Voltar' }} />
    </HomeStack.Navigator>
	);
}
export default function AppNavigator() {
  const { token } = useGlobalValues();
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      {token ? (
        <Tab.Navigator
          initialRouteName="MainHome"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'MainHome') iconName = 'home';
              else if (route.name === 'MainProfile') iconName = 'person';
              else if (route.name === 'MainContact') iconName = 'contact-mail';
              return <Icon name={iconName} size={28} color={color} style={{ alignSelf: 'center' }} />;
            },
            tabBarActiveTintColor: '#1976D2',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 60 + insets.bottom,
              paddingBottom: insets.bottom,
              paddingTop: 8,
            },
            tabBarItemStyle: {
              alignItems: 'center',
              justifyContent: 'center',
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 2,
            },
          })}
        >
          <Tab.Screen name="MainHome" options={{ title: 'Home' }}>
            {() => (
              <HomeStack.Navigator>
                <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerBackTitle: 'Voltar', headerShown: true }} />
                <HomeStack.Screen name="FinanceSummaryScreen" component={FinanceSummaryScreen} options={{ headerBackTitle: 'Voltar', headerShown: true }} />
                <HomeStack.Screen name="AmenitiesScreen" component={AmenitiesScreen} options={{ headerBackTitle: 'Voltar', headerShown: true }} />
                <HomeStack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerBackTitle: 'Voltar', headerShown: true }} />
                <HomeStack.Screen name="ContactScreen" component={ContactScreen} options={{ headerBackTitle: 'Voltar', headerShown: true }} />
              </HomeStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="MainProfile"
            component={ProfileScreen}
            options={{ headerBackTitle: 'Voltar', title: 'Profile', headerShown: true }}
          />
          <Tab.Screen
            name="MainContact"
            component={ContactScreen}
            options={{ headerBackTitle: 'Voltar', title: 'Contact', headerShown: true }}
          />
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}
