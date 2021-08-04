import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RoboVehiculos from "../screens/RoboVehiculo/RoboVehiculos";
import AddRoboVehiculo from "../screens/RoboVehiculo/AddRoboVehiculo"

const Stack = createStackNavigator();

export default function ReporteStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="roboVehiculo"
                component={RoboVehiculos}
                options={{ title: "Robo Vehiculo" }}
            />
            <Stack.Screen
                name="add-roboVehiculo"
                component={AddRoboVehiculo}
                options={{ title: "RegistrarRobo Vehiculo" }}
            />
      </Stack.Navigator>
    )
}
