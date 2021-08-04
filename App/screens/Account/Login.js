import React,{useRef} from  "react";
import { View,Text,StyleSheet,ScrollView,Image } from "react-native";
import { Divider } from "react-native-elements"
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native"; 
import SigninScreen from "../../components/Account/SigninScreen";
import LoginFacebook from "../../components/Account/LoginFacebook"

export default function Login(){
    const toastRef = useRef()
    return(
        <ScrollView>
            <Image 
                source={require("../../../assets/img/tag-logo2.png")}
                resizeMode= "contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <SigninScreen toastRef={toastRef}/>
                <CreateAccount />
            </View>
            <Divider style={styles.divider}/>
            {/* <View style={styles.viewContainer}>
                <LoginFacebook toastRef={toastRef} />
            </View> */}
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}

function CreateAccount(){
    const navigation = useNavigation();
    return(
        <Text style= {styles.textRegister}>
            ¿Aunt no tienes una Cuenta?{" "}
            <Text 
                style={styles.btnRegister}
                onPress={() => navigation.navigate("register")}
            >
                Registrar
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width:"100%",
        height: 150,
        marginTop:20,
    },
    viewContainer:{
        marginRight: 40,
        marginLeft: 40,
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegister :{
        color: "#00a680",
        fontWeight: "bold"
    },
    divider :{
        backgroundColor :"#00a680",
        margin : 40,
    }
})