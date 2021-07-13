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
      <View style={{flex: 1}}>
        <View style={styles.midiSoirContainer}>
          <View style={{flex: 1, backgroundColor: 'blue'}}></View>
          <View
            style={{
              flex: 14,
              flexDirection: 'row',
              backgroundColor: 'brown',
              justifyContent: 'space-around',
            }}>
            <View>
              <Text>midi</Text>
            </View>
            <View>
              <Text>midi</Text>
            </View>
          </View>
        </View>
        <View style={styles.grille}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'green',
              justifyContent: 'space-around',
              //   margin: 10,
            }}>
            <Text>lun</Text>
            <Text>mar</Text>
            <Text>mer</Text>
            <Text>jeu</Text>
            <Text>ven</Text>
            <Text>sam</Text>
            <Text>dim</Text>
          </View>
          <View
            style={{
              flex: 14,
            }}>
            <FlatGrid
              itemDimension={(windowWidth * 0.98) / 3}
              fixed
              // spacing={10}
              data={listePlatsProposés}
              style={{
                backgroundColor: 'grey',
                flex: 10,
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
      </View>
    </View>
  );
};

export default App;
