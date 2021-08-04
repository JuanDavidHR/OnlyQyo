import React from  "react";
import { View,Text,StyleSheet,ScrollView,Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest(){
    const navigation = useNavigation();

    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Text style={styles.title}>Perfil</Text>
            <Text style={styles.description}>
                En construccion
            </Text>
            <View style={styles.viewBtn}>
                <Button 
                    title= "Ver tu perfil"
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={() =>navigation.navigate("login") }
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft:30,
        marginRight: 30,

    },
    image: {
        height:300,
        width: "100%",
        marginBottom: 40,
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign:"center"
    },
    description: {
        textAlign:"center",
        marginBottom: 20,
    },
    btnStyle:{
        backgroundColor: "#00a680",
    },
    btnContainer:{
        width:"70%"
    },
    viewBtn :{
        flex :1,
        alignItems:"center"
    }

});