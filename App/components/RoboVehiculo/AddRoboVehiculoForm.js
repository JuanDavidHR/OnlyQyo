import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions, Text } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";
import Modal from "../Modal";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function AddRoboVehiculoForm(props  ) {
  const {  setIsLoading, navigation } = props;
  const [dniPropietario, setDniPropietario] = useState("");
  const [nombrePropietario, setNombrePropietario] = useState("");
  const [colorVehiculo, setColorVehiculo] = useState("");
  const [marcaVehiculo, setMarcaVehiculo] = useState("");
  const [modeloVehiculo, setModeloVehiculo] = useState("");
  const [placaRodaje, setPlacaRodaje] = useState("");
  const [numeroMotor, setNumeroMotor] = useState("");
  const [serieMotor, setSerieMotor] = useState("");
  const [hechos, setHechos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [imagesSelected, setImagesSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRoboVehiculo, setLocationRoboVehiculo] = useState(null);
  

  const AddRoboVehiculo =() =>{
    if (!dniPropietario || !nombrePropietario || !placaRodaje  || !marcaVehiculo || !modeloVehiculo || !colorVehiculo ||!hechos ) {
      console.log("Todos los campos del formulario son obligatorios");
    } else if (size(imagesSelected) === 0) {
      console.log("El restaurante tiene que tener almenos una foto");
    } else if (!locationRoboVehiculo) {
      console.log("Tienes que localizar el restaurnate en el mapa");
    } else {
      setIsLoading(true);
      uploadImageStorage().then((response) => {
        db.collection("roboVehiculo")
          .add({
            dniPropietario: dniPropietario,
            nombrePropietario: nombrePropietario,
            colorVehiculo: colorVehiculo,
            marcaVehiculo: marcaVehiculo,
            modeloVehiculo: modeloVehiculo,
            placaRodaje: placaRodaje,
            numeroMotor: numeroMotor,
            serieMotor: serieMotor,
            direccion: direccion,
            hechos: hechos,
            location: locationRoboVehiculo,
            images: response,
            createAt: new Date(),
            createBy: firebase.auth().currentUser.uid,
          })
          .then(() => {
            setIsLoading(false);
            navigation.navigate("roboVehiculo");
          })
          .catch(() => {
            setIsLoading(false);
            console.log(
              "Error al subir el restaurante, intentelo más tarde"
            );
          });
      });
    }
  }

  const uploadImageStorage = async () => {
    const imageBlob = [];

    await Promise.all(
      map(imagesSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("roboVehiculo").child(uuid());
        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`roboVehiculo/${result.metadata.name}`)
            .getDownloadURL()
            .then((photoUrl) => {
              imageBlob.push(photoUrl);
            });
        });
      })
    );

    return imageBlob;
  };
  
  return (
    <ScrollView style={styles.scrollView}>
      <ImagenRoboVehiculo imagenRoboVehiculo={imagesSelected[0]}/>
      <FormAdd 
        setDniPropietario={setDniPropietario}
        setNombrePropietario={setNombrePropietario}
        setPlacaRodaje={setPlacaRodaje}
        setMarcaVehiculo={setMarcaVehiculo}
        setModeloVehiculo={setModeloVehiculo}        
        setColorVehiculo={setColorVehiculo}      
        setNumeroMotor={setNumeroMotor}
        setSerieMotor={setSerieMotor}
        setDireccion={setDireccion}
        setHechos={setHechos}
        setIsVisibleMap={setIsVisibleMap}
        locationRoboVehiculo={locationRoboVehiculo}
      />
      <UploadImage 
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}        
      />
      <Button 
        title="Registrar Reporte"
        onPress={AddRoboVehiculo}
        buttonStyle={styles.btnAddRestaurant}
      />
      <Map 
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationRoboVehiculo={setLocationRoboVehiculo}
      />
    </ScrollView>
  );
}
function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap,
    setLocationRoboVehiculo
  } = props;
  const [location, setLocation] = useState(null);
    useEffect(() => {
      (async () => {
        const resultPermissions = await Permissions.askAsync(
          Permissions.LOCATION
        );
        const statusPermissions = resultPermissions.permissions.location.status;
        if (statusPermissions !== "granted") {
          console.log(
            "Tienes que aceptar los permisos de localizacion para crear un restaurante",
            3000
          );
        }else {
          const loc = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          });
        }
      })();
    }, []);
    const confirmLocation = () => {
      setLocationRoboVehiculo(location);
      console.log("Localizacion guardada correctamente");
      setIsVisibleMap(false);
    };
    return(
      <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
         <View>
          {location && (
            <MapView
              style={styles.mapStyle}
              initialRegion={location}
              showsUserLocation={true}
              onRegionChange={(region) => setLocation(region)}
            >
              <MapView.Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                draggable
              />
            </MapView>
          )}
          <View style={styles.viewMapBtn}>
            <Button
              title="Guardar Ubicacion"
              containerStyle={styles.viewMapBtnContainerSave}
              buttonStyle={styles.viewMapBtnSave}
              onPress={confirmLocation}
            />
            <Button
              title="Cancelar Ubicacion"
              containerStyle={styles.viewMapBtnContainerCancel}
              buttonStyle={styles.viewMapBtnCancel}
              onPress={() => setIsVisibleMap(false)}
            />
          </View>
        </View>
      </Modal>
    ) 
}
function UploadImage(props) {
  const { imagesSelected, setImagesSelected } = props;
  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA
    );
    if (resultPermissions === "denied") {
      console.log(
        "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir ha ajustes y activarlos manualmente.",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      //console.log(result)
      if (result.cancelled) {
        console.log(
          "Has cerrado la galeria sin seleccionar ninguna imagen",
          2000
        );
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  }
  const removeImage = (image) => {
    Alert.alert(
      "Eliminar Imagen",
      "¿Estas seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };
  return(
    <View style ={styles.viewImages}>
      {size(imagesSelected) < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {map(imagesSelected, (imageRestaurant, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyle}
          source={{ uri: imageRestaurant }}
          onPress={() => removeImage(imageRestaurant)}
        />
      ))}
    </View>
  )
}
function ImagenRoboVehiculo(props) {
  const { imagenRoboVehiculo } = props;

  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          imagenRoboVehiculo
            ? { uri: imagenRoboVehiculo }
            : require("../../../assets/img/no-image.png")
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}
function FormAdd(props) {
  const {setDniPropietario,
         setNombrePropietario,
         setPlacaRodaje,
         setMarcaVehiculo,
         setModeloVehiculo,
         setColorVehiculo,
         setNumeroMotor,
         setSerieMotor,
         setHechos,
         setDireccion,
         setIsVisibleMap,
         locationRoboVehiculo} = props
  return (
    <View style={styles.viewForm}>
      <Input 
        placeholder="Dni del Propietario"
        containerStyle={styles.input}
        onChange={(e) =>setDniPropietario(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Nombre del Propietario"
        containerStyle={styles.input}
        onChange={(e) =>setNombrePropietario(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Placa de rodaje"
        containerStyle={styles.input}
        onChange={(e) =>setPlacaRodaje(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Marca del Vehiculo"
        containerStyle={styles.input}
        onChange={(e) =>setMarcaVehiculo(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Modelo del Vehiculo"
        containerStyle={styles.input}
        onChange={(e) =>setModeloVehiculo(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Color del Vehiculo"
        containerStyle={styles.input}
        onChange={(e) =>setColorVehiculo(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Numero de Motor"
        containerStyle={styles.input}
        onChange={(e) =>setNumeroMotor(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Serie de Motor"
        containerStyle={styles.input}
        onChange={(e) =>setSerieMotor(e.nativeEvent.text)}
      />
      <Input 
        placeholder="Direccion"
        containerStyle={styles.input}
        onChange={(e) =>setDireccion(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationRoboVehiculo ? "#00a680" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input 
        placeholder="Hechos"
        containerStyle={styles.input}
        multiline={true}
        inputContainerStyle ={styles.textArea}
        onChange={(e) =>setHechos(e.nativeEvent.text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20,
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },
});