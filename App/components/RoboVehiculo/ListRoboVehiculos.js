import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListRoboVehiculos(props) {
  const { roboVehiculos } = props;
  const navigation = useNavigation();

  //console.log(props)

  return(
    <View>
      {size(roboVehiculos) > 0 ? (
        <FlatList 
          data={roboVehiculos}
          renderItem={(roboVehiculo)=> <RoboVehiculo roboVehiculo={roboVehiculo}/>}
          keyExtractor={(item,index)=>index.toString()}
        />
      ) : (
        <View style={styles.loaderRestaurants}> 
          <ActivityIndicator size="large" />
          <Text>Cargando Reportes</Text>
        </View>
      )}
    </View>
  )

}

function RoboVehiculo(props){
  const { roboVehiculo} = props
  const { images,nombrePropietario, dniPropietario,hechos } = roboVehiculo.item
  const imageRoboVehiculo = images ? images[0] : null;

  //console.log(roboVehiculo)

  const goRoboVehiculo= () =>{
    console.log("oki doki")
  }
  
  return (
    <TouchableOpacity onPress={goRoboVehiculo}>
      <View style= {styles.viewRestaurant}>
        <View style= {styles.viewRestaurantImage}>
          <Image 
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="fff"/>}
            source={
              imageRoboVehiculo
              ? {uri: imageRoboVehiculo} 
              : require("../../../assets/img/no-image.png")
            }
            style={styles.imageRestaurant}
          />
        </View>
        <View>
          <Text style={styles.nombrePropietario}>{nombrePropietario}</Text>
          <Text style={styles.dniPropietario}>{dniPropietario}</Text>
          <Text style={styles.restaurantDescription}>
            {hechos.substr(0, 60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 10,
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 80,
    height: 80,
  },
  restaurantName: {
    fontWeight: "bold",
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey",
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});