import React,{useRef} from  "react";
import { View,Text,StyleSheet,ScrollView,Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Toast from "react-native-easy-toast";
import SignupScreen from "../../components/Account/SignupScreen";

export default function Register (){
    const toastRef = useRef()
    return (
        <KeyboardAwareScrollView>
            <Image 
                source={require("../../../assets/img/tag-logo2.png")}
                resizeMode= "contain"
                style={styles.logo}
            />
             <View style={styles.viewForm}>
                <SignupScreen toastRef={toastRef}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width:"100%",
        height: 150,
        marginTop:20,
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40,
    }
})