import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BuscarObjeto from "../screens/buscarObjeto";

const Stack = createStackNavigator();

export default function BuscarObjetoStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="buscar-objeto"
                component={BuscarObjeto}
                options={{title: "Lista de Objetos"}}
            />
        </Stack.Navigator>
    )
}