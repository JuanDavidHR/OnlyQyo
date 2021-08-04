import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListRoboVehiculos from "../../components/RoboVehiculo/ListRoboVehiculos";

const db = firebase.firestore(firebaseApp);

export default function RoboVehiculos(props){
    const { navigation } = props;
    const [user, setUser] = useState(null);
    const [roboVehiculos, setRoboVehiculos] = useState([]);
    const [totalRoboVehiculos, setTotalRoboVehiculos] = useState(0);
    const [startRoboVehiculos, setStartRoboVehiculos] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const[idRoboVehiculo,setIdRoboVehiculo]= useState(null)
    const limitRoboVehiculos = 10;

    console.log(roboVehiculos)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
          setUser(userInfo);
          setIdRoboVehiculo(userInfo.uid)
        });
      }, []);
    

    useEffect(()=>{
        const resultRobosVehiculos= []
        db.collection("roboVehiculo").where("createBy","==",idRoboVehiculo).get().then((response) =>{
            response.forEach((doc) => {
                //console.log(doc.uid, " => ", doc.data())
                const roboVehiculo = doc.data()
                roboVehiculo.id=doc.uid
                //console.log(roboVehiculo)
                resultRobosVehiculos.push(roboVehiculo)
            })
            setRoboVehiculos(resultRobosVehiculos)
        })
    }, [])
    return(
        <View style={styles.viewBody}>
            {user && (
                <ListRoboVehiculos 
                    roboVehiculos={roboVehiculos}
                />
            )}
            
            {user && (
                <Icon
                    reverse
                    type="material-community"
                    name="plus"
                    color="#00a680"
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("add-roboVehiculo")}
                />
            )}
        </View>
    )    
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
})