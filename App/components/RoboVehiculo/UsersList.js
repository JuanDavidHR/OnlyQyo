import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
const db = firebase.firestore(firebaseApp);


import firebase from "../../utils/firebase";

/* const UserScreen = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("roboVehiculo").onSnapshot((querySnapshot) => {
      const roboVehiculo = [];
      querySnapshot.docs.forEach((doc) => {
        const { dniPropietario, 
                nombrePropietario, 
                colorVehiculo, 
                marcaVehiculo, 
                modeloVehiculo,
                placaRodaje,
                numeroMotor,
                serieMotor,
                hechos, } = doc.data();
        roboVehiculo.push({
            id: doc.id,
            dniPropietario,
            nombrePropietario,
            colorVehiculo,
            marcaVehiculo,
            modeloVehiculo,
            placaRodaje,
            numeroMotor,
            serieMotor,
            hechos,
        });
      });
      setUsers(roboVehiculo);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateUserScreen")}
        title="Registrar"
      />
      {users.map((roboVehiculo) => {
        return (
          <ListItem
            key={roboVehiculo.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                userId: roboVehiculo.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{roboVehiculo.nombrePropietario}</ListItem.Title>
              <ListItem.Subtitle>{roboVehiculo.marcaVehiculo}</ListItem.Subtitle>
              <ListItem.Subtitle>{roboVehiculo.placaRodaje}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserScreen; */