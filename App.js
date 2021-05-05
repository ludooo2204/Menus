/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Pressable,
  Modal,
} from 'react-native';

import listePlatsProposés from './menu';
import NewChoice from './components/modalNewChoice';
import styles from './components/Styles';
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
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.FlatGridContainer}>
      <StatusBar backgroundColor="lightgrey"></StatusBar>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <NewChoice toggleModal={toggleModal} />
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
              <Pressable
                style={styles.plat}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textPlat}>{item}</Text>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default App;
