import React, { useState } from 'react';
import { View,Text,StyleSheet,ScrollView,Image,Alert } from "react-native";
import { Button, Input, Icon } from 'react-native-elements';
import { size,isEmpty } from "lodash";
import { validateEmail } from "../../utils/validation";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase"
import * as GoogleSignIn from 'expo-google-sign-in'
import Loading from "../Loading";

export default function SigninScreen(props){
    const { toastRef } = props;
    const [showPassword,setShowPassword] = useState(false)
    const [formData,setFormData]= useState(defaultFormValue())
    const navigation = useNavigation();
    const [loading,setLoading]= useState(false)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    };

    /* async function googleSignInAsync() {
        try {
            await GoogleSignIn.initAsync()
            if (Platform.OS === "android") {
                await GoogleSignIn.askForPlayServicesAsync()
            }
            const { type, user } = await GoogleSignIn.signInAsync()
            if (type === "success") {
                onSignIn(user)
                setLoading(false)
                return true
            } else {
                setLoading(false)
                Alert.alert(JSON.stringify(result))
                return { cancelled: true }
            }
        } catch (error) {
            setLoading(false)
            Alert.alert(error.message)
            return { error: true }
        }
    }
      
    function onSignIn(googleUser) {
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged(function (firebaseUser) {
                unsubscribe()
                if (!isUserEqual(googleUser, firebaseUser)) {
                    const credential = firebase.auth.GoogleAuthProvider.credential(
                        googleUser.auth.idToken,
                        googleUser.auth.accessToken
                    )
                    setLoading(true);
                    firebase
                        .auth()
                        .signInWithCredential(credential)
                        .then(() => {
                            setLoading(false)
                        })
                        .catch(function (error) {
                            setLoading(false)
                            Alert.alert(error.message)
                        })
                } else {
                    Alert.alert("Usuario ya está logueado")
                }
            });
    }
      
    function isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
            let providerData = firebaseUser.providerData
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    return true
                }
            }
        }
        return false
    }

 */
    const onSubmit = () =>{
      if(isEmpty(formData.email)|| isEmpty(formData.password)){
          toastRef.current.show("todos los campos son obligatorios")
       }else if(!validateEmail(formData.email)){
           toastRef.current.show("Email incorrecto")
       }else {
           setLoading(true)
           firebase.auth().signInWithEmailAndPassword(formData.email,formData.password)
           .then(() =>{
              toastRef.current.show("Ok")
              setLoading(false)
              navigation.navigate("accounts")
           })
           .catch(()=>{
            setLoading(false);
            toastRef.current.show("Email incorrecto o contraseña")
           })
       }    
  }
  return (
    <View style={styles.formContainer}>
        <Input 
            placeholder= "Correo Electronico"
            containerStyle= {styles.inputForm}
            onChange={e=>onChange(e,"email")}
            rightIcon={
                <Icon 
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}
                />
            }
        />
        <Input 
            placeholder= "Contraseña"
            containerStyle= {styles.inputForm}
            password={true}
            secureTextEntry={showPassword ? true:false}
            onChange={e=>onChange(e,"password")}
            rightIcon={
                <Icon 
                    type="material-community"
                    name={showPassword ? "eye-off-outline" :"eye-outline"}
                    iconStyle={styles.iconRight}
                    onPress={()=>setShowPassword(!showPassword)}
                />
            }
        />
        <Button 
            title="Iniciar sesion"
            containerStyle = {styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={onSubmit}
        />
         {/* <Button
                title="Iniciar Sesión con Google"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnGoogle}
                onPress={googleSignInAsync}
                icon={
                    <Icon
                        name="google"
                        type="material-community"
                        marginRight={10}
                        size={20}
                        color="#fff"
                    />
                }
            /> */}
        <Loading isVisible={loading} text="Iniciando sesión" />
    </View>
  )
  function defaultFormValue(){
    return {
        email:"",
        password:"",
    }
  }
  
};
const styles = StyleSheet.create({
  formContainer:{
      flex:1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
  },
  inputForm:{
      width: "100%",
      marginTop: 20,
  },
  btnContainerLogin:{
      marginTop: 20,
      width: "95%"
  },
  btnLogin:{
      backgroundColor: "#00a680",
  },
  iconRight:{
      color : "#c1c1c1"
  },
  btnGoogle: {
    backgroundColor: "#EA4335"
  }
})


