import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RoboVehiculoStack from "../navigation/RoboVehiculoStack";
import { Icon } from 'react-native-elements'
import { StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

//const Stack = createStackNavigator();

export default function ReporteStack(){
    const [items, setItems] = React.useState([
        { name: 'Robo Vehiculo'},
        { name: 'Robo Celular'},
    ]);
    return(
        <FlatGrid
            itemDimension={130}
            data={items}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({ item }) => (
                <View style={[styles.itemContainer, { backgroundColor: "#fff" }]}>
                    <Icon
                        name='rowing' 
                    />
                    <Text style={styles.itemName} onPress={()=>{RoboVehiculoStack}}>{item.name}</Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      marginTop : 30,
      marginLeft: 15,
      marginRight: 15,
      justifyContent: 'flex-end',
      alignItems:'center',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#00a680',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#000',
    },
  });

