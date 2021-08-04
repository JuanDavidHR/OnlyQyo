import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../utils/firebase";

const UserDetailScreen = (props) => {

  const initialState = {
    id:"",
    dniPropietario: "",
    nombrePropietario: "",
    colorVehiculo: "",
    marcaVehiculo:"",
    modeloVehiculo:"",
    placaRodaje:"",
    numeroMotor:"",
    serieMotor:"",
    hechos:"",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("roboVehiculo").doc(id);
    const doc = await dbRef.get();
    const roboVehiculo = doc.data();
    setUser({ ...roboVehiculo, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("roboVehiculo")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("roboVehiculo").doc(user.id);
    await userRef.set({
      dniPropietario: user.dniPropietario,
      nombrePropietario: user.nombrePropietario,
      colorVehiculo: user.colorVehiculo,
      marcaVehiculo: user.marcaVehiculo,
      modeloVehiculo: user.modeloVehiculo,
      placaRodaje: user.placaRodaje,
      numeroMotor: user.numeroMotor,
      serieMotor: user.serieMotor,
      hechos: user.hechos,
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Dni Propietario"
          style={styles.inputGroup}
          value={user.dniPropietario}
          onChangeText={(value) => handleTextChange(value, "dniPropietario")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Nombre Propietario"
          style={styles.inputGroup}
          value={user.nombrePropietario}
          onChangeText={(value) => handleTextChange(value, "nombrePropietario")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Color Vehiculo"
          style={styles.inputGroup}
          value={user.colorVehiculo}
          onChangeText={(value) => handleTextChange(value, "colorVehiculo")}
        />
        <TextInput
          placeholder="Marca Vehiculo"

          style={styles.inputGroup}
          value={user.marcaVehiculo}
          onChangeText={(value) => handleTextChange(value, "marcaVehiculo")}
        />
        <TextInput
          placeholder="Modelo Vehiculo"
          style={styles.inputGroup}
          value={user.modeloVehiculo}
          onChangeText={(value) => handleTextChange(value, "modeloVehiculo")}
        />
        <TextInput
          placeholder="Placa rodaje"
          style={styles.inputGroup}
          value={user.placaRodaje}
          onChangeText={(value) => handleTextChange(value, "placaRodaje")}
        />
        <TextInput
          placeholder="Numero de Motor"
          style={styles.inputGroup}
          value={user.numeroMotor}
          onChangeText={(value) => handleTextChange(value, "numeroMotor")}
        />
        <TextInput
          placeholder="Serie Motor"
          style={styles.inputGroup}
          value={user.serieMotor}
          onChangeText={(value) => handleTextChange(value, "serieMotor")}
        />
        <TextInput
          placeholder="Hechos"
          style={styles.inputGroup}
          value={user.hechos}
          onChangeText={(value) => handleTextChange(value, "hechos")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailScreen;