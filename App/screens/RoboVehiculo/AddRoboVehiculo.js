import React, { useState, useRef } from "react";
import { View,StyleSheet, Text } from "react-native";
import Loading from "../../components/Loading";
import AddRoboVehiculoForm from "../../components/RoboVehiculo/AddRoboVehiculoForm";

export default function AddRoboVehiculo(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddRoboVehiculoForm 
        setIsLoading={setIsLoading}
        navigation ={navigation}
      />
      <Loading isVisible={isLoading} text="Registrando Reporte" /> 
    </View>
  ); 

}
