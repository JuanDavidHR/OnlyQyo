import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Estadistica from "../screens/estadisticas";

const Stack = createStackNavigator();

export default function EstadisticaStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="estadisticas"
                component={Estadistica}
                options={{title: "Estadisticas"}}
            />
        </Stack.Navigator>
    )
}