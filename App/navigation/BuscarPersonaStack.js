import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BuscarPersona from "../screens/buscarPersona";

const Stack = createStackNavigator();

export default function BuscarPersonaStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="buscar-personas"
                component={BuscarPersona}
                options={{title: "Personas Desaparecidas"}}
            />
        </Stack.Navigator>
    )
}