import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements"
import AccountStack from "../navigation/AccountStack";
import RoboVehiculoStack from "../navigation/RoboVehiculoStack";
import BuscarObjetoStack from "../navigation/BuscarObjetoStack";
import BuscarPersonaStack from "../navigation/BuscarPersonaStack";
import EstadisticaStack from "../navigation/EstadisticaStack";
const Tab= createBottomTabNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
           <Tab.Navigator 
                initialRouteName="reportes"
                tabBarOptions={{
                    inactiveTintColor: "#646464",
                    activeTintColor:"#00a680"
                }} 
                screenOptions={({ route })=>({
                    tabBarIcon:({ color }) => screenOptions(route,color)
                })}
            >
                <Tab.Screen 
                    name="roboVehiculos" 
                    component={RoboVehiculoStack}
                    options={{ title:"RoboVehiculo" }}    
                />
                <Tab.Screen 
                    name="buscar-personas" 
                    component={BuscarPersonaStack}
                    options={{ title:"Personas" }}    
                />
                <Tab.Screen 
                    name="buscar-objetos" 
                    component={BuscarObjetoStack}
                    options={{ title:"Objetos" }}
                />
                <Tab.Screen 
                    name="estadisticas" 
                    component={EstadisticaStack}
                    options={{ title:"Estadisticas" }}
                />
                <Tab.Screen 
                    name="account" 
                    component={AccountStack}
                    options={{ title:"Cuenta" }}
                />
            </Tab.Navigator> 
        </NavigationContainer>
    )
}

function screenOptions(route,color){
    let iconName;

    switch (route.name) {
        case "roboVehiculos":
            iconName="compass-outline"
            break;
        case "buscar-personas":
            iconName="heart-outline"
            break;
        case "buscar-objetos":
            iconName="star-outline"
            break;
        case "estadisticas":
            iconName="magnify"
            break;
        case "account":
            iconName="home"
            break;
        default:
            break;
    }

    return(
        <Icon type="material-community" name={iconName} size={22} color={color}/>
    )
}