/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {StyleSheet, Text, View, Dimensions, StatusBar, Pressable,Modal} from 'react-native';

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
    
    <View style={{flex: 1}}>
 
      <Menu />
      <View style={{flex: 1}}>
        
        <Text>kjnknkjnk</Text>
      </View>
    </View>
  );
};
const Menu = () => {
  
  const [modalVisible,setModalVisible]=useState(false)
  return (
    <View style={styles.FlatGridContainer}>
      <StatusBar backgroundColor="lightgrey"></StatusBar>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      <View style={styles.midiSoirContainer}>
        <View
          style={{
            width: (windowWidth * 0.98) / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>midi</Text>
        </View>
        <View
          style={{
            width: (windowWidth * 0.98) / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>soir</Text>
        </View>
      </View>
      <View style={styles.grille}>
        <FlatGrid
          itemDimension={(windowWidth * 0.98) / 15}
          fixed
          // spacing={10}
          data={joursDeLaSemaine}
          style={{
            backgroundColor: 'lightgrey',
            width: (windowWidth * 0.98) / 15,
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
            backgroundColor: 'lightgrey',
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable style={styles.plat} onPress={()=>setModalVisible(true)}>
                <Text style={styles.textPlat}>{item}</Text>
              </Pressable>
            );
          }}
        />
      </View>

      
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  FlatGridContainer: {
    flex: 8,
    backgroundColor: 'lightgrey',
  },
  grille: {
    flex: 30,
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  midiSoirContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: (windowWidth * 0.98) / 15,
  },
  plat: {
    height: (windowHeight * 0.98) / 9,
    backgroundColor: 'grey',
    borderRadius: 20,
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
    height: (windowHeight * 0.98) / 9,
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 20,
  },
  demiJour: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'black',
    borderWidth: 4,
    backgroundColor: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  demiJourContainer: {
    flex: 1,
    backgroundColor: 'green',
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
