import React from 'react';
import {useState, useEffect }from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Dimensions,
  FlatList,
  Modal 
} from 'react-native';

const Item2 = ({ item }) => {
    return ( 
        <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'mediumseagreen'
            }}>
                <Image
                    source={{uri:item.url}}
                    style={{width:100, height:100, margin:5}}
                >

                </Image>
                <View style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <Text style={styles.flatListItem}>{item.id}</Text>
                    <Text style={styles.flatListItem}>{item.name}</Text>
                </View>
        </View>
    );
}

export default Item2;

const styles = StyleSheet.create({
    box: {
      backgroundColor: 'red',
    }
  });