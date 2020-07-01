/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useState, useEffect } from "react";
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

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
// import ImageViewer from 'react-native-image-zoom-viewer';
import ImageView from "react-native-image-viewing";
// import ImageZoom from 'react-native-image-pan-zoom';
import Item2 from './components/Item';
import _ from 'lodash';

var width = Dimensions.get('window').width;   //full width
var height = Dimensions.get('window').height;  //full height

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to List Images"
                onPress={() => navigation.navigate('ListImages')}
            />
        </View>
    );
}

function CategoryScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Category Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details', {
                    itemId: 86,
                    otherParam: {
                        'name': 'Phuoc',
                        'age': 25
                    },
                })}
            />
        </View>
    );
}

function DetailsScreen({ route, navigation }) {
    const { itemId } = route.params;
    const { otherParam } = route.params;
    return (
        // <View>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>

            <View style={{ ...styles.box, flex: 1 }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>
                    Other Param: {otherParam.name}
                </Text>

                <Button style={{}}
                    title='Go To HomePage'
                    onPress={() => navigation.navigate('Home')}
                />

            </View>
            <View style={{ flex: 1 }}>
                <Image
                    style={styles.image_custom}
                    source={{ uri: 'https://i.imgur.com/eHgEGzI.jpg' }}
                    resizeMode="contain"
                />
            </View>

            <View style={{ ...styles.box, flex: 1 }}>
                <Text>
                    Align children of a container to the start of the container's cross axis.
          </Text>
            </View>

        </View>
        // </View>
    );
}

function Item({ item }) {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'mediumseagreen'
        }}>
            <Image
                source={{ uri: item.url }}
                style={{ width: 100, height: 100, margin: 5 }}
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


function ListImages({ route, navigation }) {
    const [images, setImages] = useState([])
    useEffect(() => {
        axios.get('https://5efaa2e080d8170016f75718.mockapi.io/article', {
            params: {
                ID: 12345
            }
        })
            .then(function (response) {
                //   console.log(response);
                setImages(response.data);
                console.log(images, 19);

            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [])

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column'
        }}>
            <FlatList
                data={images}
                renderItem={({ item }) => <Item2 item={item} />}
                keyExtractor={item => item.id}
            />

            <View style={{
                flex: 1,
                backgroundColor: 'white',
                height: 1
            }}>
            </View>
        </View>
    );
}

function ImageZoom({ }) {
    // const images23 = [{
    //     // Simplest usage.
    //     url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    //     // width: number
    //     // height: number
    //     // Optional, if you know the image size, you can set the optimization performance

    //     // You can pass props to <Image />.
    //     // props: {
    //     //     // headers: ...
    //     // }
    // }, {
    //     url: 'https://i.imgur.com/T1hQUdC.jpg',
    //     // props: {
    //     //     // Or you can set source directory.
    //     //     // source: require('../background.png')
    //     // }
    // }]

    const [images2, setImages] = useState([])
    useEffect(() => {
        axios.get('https://5efaa2e080d8170016f75718.mockapi.io/images')
            .then(function (response) {
                // let result = response.data.map((item, i) => {
                //     return  _.pick(item, ['url']); 
                // })

                setImages(response.data);
            });
    }, [])

    const images = [
        {
          uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
          uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
          uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
        },
    ];

    const [visible, setIsVisible] = useState(true);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>ImageZoom</Text>   
            <Button
                title="Switch state"
                onPress={() => setIsVisible(!visible)}
            />      

            <ImageView
                images={images2}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />

        </View>
    );
}



const Tab = createBottomTabNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        } else if (route.name === 'CategoryScreen') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        }

                        // You can return any component that you like here!
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="ListImages" component={ListImages} />
                <Tab.Screen name="ImageZoom" component={ImageZoom} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


// const Stack = createStackNavigator();
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//         <Stack.Screen name="Category" component={CategoryScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'red',
    },
    image_custom: {
        width: width / 2,
        width: 200,
        height: 100,
        marginTop: 10
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

// export default App;
