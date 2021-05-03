/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';

import listePlatsProposés from './menu';
import Layout from './TestLayout';

// console.log("menu importé")
//  console.log(menu)
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log('listePlatsProposés');
console.log(listePlatsProposés);
const joursDeLaSemaine = ['lu', 'ma', 'me', 'je', 've', 'sa', 'di'];
const demiJournée = ['midi', 'Soir'];
// const App = () => {
//   return (
// <Layout/>
//   );
// };
const App = () => {
  return (
    <View style={styles.FlatGridContainer}>
      <StatusBar backgroundColor="grey"></StatusBar>
      <View style={{flex: 1, borderColor: 'white', borderWidth: 3}}>
        <View
          style={{
            borderColor: 'blue',
            borderWidth: 3,
            marginLeft: (windowWidth * 0.98) / 15,
            alignContent:"center",
          }}>
          <FlatGrid
            itemDimension={(windowWidth * 0.98) / 4}
            // fixed
            spacing={0}
            data={demiJournée}
            // itemContainerStyle={{backgroundColor:"green"}}
            style={{
              backgroundColor: 'red',
              width: windowWidth - (windowWidth * 0.98) / 15,
              // marginLeft: (windowWidth * 0.98) / 15,
              padding:10
              // height:(windowWidth * 0.98) / 15
              // alignContent : 'center',
              // justifyContent:"space-around",
              // marginRight:0
            }}
            renderItem={({item, index}) => {
              return (
                <View style={styles.demiJourContainer}>
                  <Text style={styles.demiJour}>{item}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={styles.grille}>
        <FlatGrid
          itemDimension={(windowWidth * 0.98) / 15}
          fixed
          // spacing={10}
          data={joursDeLaSemaine}
          style={{
            backgroundColor: 'lightblue',
            width: (windowWidth * 0.98) / 15,
            // height:((windowHeight * 0.98) / 8) * 7 +40
            // marginTop:20,
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.jourSemaine}>
                <Text style={styles.textJour}>{item}</Text>
              </View>
            );
          }}
        />

        <FlatGrid
          itemDimension={(windowWidth * 0.98) / 3}
          fixed
          // spacing={10}
          data={listePlatsProposés}
          style={{
            backgroundColor: 'lightyellow',
          }}
          renderItem={({item, index}) => {
            return (
              <View style={styles.plat}>
                <Text style={styles.textPlat}>{item}</Text>
              </View>
            );
          }}
        />
      </View>

      <View>
        <Text>LOLO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FlatGridContainer: {
    flex: 1,
    justifyContent: 'center',
    // paddingVertical:30,
    // a:'center',
    backgroundColor: 'lightgrey',
  },
  grille: {
    flex: 15,
    alignItems: 'flex-start',
    // justifyContent:'center',
    // height:100,
    // margin: 10,
    flexDirection: 'row',
    backgroundColor: 'grey',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  plat: {
    // maxHeight: ((windowHeight * 0.98) / 8) * 7 + 100,
    height: (windowHeight * 0.98) / 9,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    // alignItems:"center"
  },
  jourSemaine: {
    height: (windowHeight * 0.98) / 9,
  },
  textPlat: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: (windowHeight * 0.98) / 9,
    fontSize: 20,
    borderRadius: 20,
  },
  textJour: {
    textAlign: 'center',
    textAlignVertical: 'center',
    // padding: 0,
    height: (windowHeight * 0.98) / 9,
    fontSize: 15,
    fontWeight: 'bold',
    // backgroundColor:'red',
    borderRadius: 20,
  },
  demiJour: {
    textAlign: 'center',
    // paddingLeft:20,
    textAlignVertical: 'center',
    borderColor: 'black',
    borderWidth: 4,
    backgroundColor:'white',
    // padding: 0,
    // height: (windowHeight * 0.98) / 9,
    fontSize: 15,
    fontWeight: 'bold',
    // backgroundColor:'red',
    // borderRadius: 20,
  },
  demiJourContainer: {
    // paddingHorizontal: 40,
    // marginLeft:40,
    padding:20,
    backgroundColor:'green'
    // marginRight:40,
        // alignContent:"stretch"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
