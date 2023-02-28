import LoginScreen from "./Screen/LoginScreen";
import RegistrationScreen from "./Screen/RegistrationScreen";
import PostsScreen from "./Screen/PostsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="RegistationScreen">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <AuthStack.Screen name="Публикации" component={PostsScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
