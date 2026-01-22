import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoScreen from "../screens/TodoScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Todos"
        component={TodoScreen}
        options={{ title: "My Todos" }}
      />
    </Stack.Navigator>
  );
}
