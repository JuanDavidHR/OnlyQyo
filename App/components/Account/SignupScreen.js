import React,{useState} from  "react";
import { View,Text,StyleSheet,ScrollView } from "react-native";
import { Button,Input,Icon } from "react-native-elements";
import { validateEmail } from "../../utils/validation";
import { size,isEmpty } from "lodash";
import * as firebase from "firebase"
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

export default function SignupScreen(props){
    const { toastRef } = props;
    const [showPassword,setShowPassword] = useState(false)
    const [showRepeatPassword,setShowRepeatPassword] = useState(false)
    const [formData,setFormData]= useState(defaultFormValue())
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const onSubmit = () =>{
        if(isEmpty(formData.email)|| isEmpty(formData.password) || isEmpty(formData.repeatPassword)){
           toastRef.current.show("todos los campos son obligatorios")
        }else if(!validateEmail(formData.email)){
            toastRef.current.show("Email incorrecto")
        }else if(formData.password!==formData.repeatPassword){
            toastRef.current.show("Las contraseñas no coinciden")
        }else if(size(formData.password<6)){
            toastRef.current.show("Las contraseña debe tener al menos 6 caracteres")
        }else {
            firebase.auth().createUserWithEmailAndPassword(formData.email,formData.password)
            .then(() => {
                setLoading(false);
                navigation.navigate("accounts")
            }).catch(() =>{
                setLoading(false);
                toastRef.current.show("El email ya esta en uso, pruebe con otro")
            })
        }
    }
    const onChange=(e,type)=>{
    
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }
    return(
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
            <Input 
                placeholder= "Repetir Contraseña"
                containerStyle= {styles.inputForm}
                password={true}
                secureTextEntry={showRepeatPassword ? true:false}
                onChange={e=>onChange(e,"repeatPassword")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" :"eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=>setShowRepeatPassword(!showRepeatPassword)}
                    />
                }
            />
            <Button 
                title="Registrar"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Creando cuenta" />
        </View>
    )
    
};

function defaultFormValue(){
    return {
        email:"",
        password:"",
        repeatPassword:""
    }
}

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
    btnContainerRegister:{
        marginTop: 20,
        width: "95%",
    },
    btnRegister:{
        backgroundColor: "#00a680",
        
    },
    iconRight:{
        color : "#c1c1c1"
    }
})
