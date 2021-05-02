/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import listePlatsProposés from './menu'

// console.log("menu importé")
//  console.log(menu)
const windowWidth = Dimensions.get('window').width;
console.log("listePlatsProposés")
console.log(listePlatsProposés)
const App= () => {


  return (
    <View style={styles.sectionContainer}>
      <Text>Lolo</Text>
      {/* {listePlatsProposés.map((e,key)=>{return <Text key={key} >{e}</Text>})} */}
      <FlatGrid
        itemDimension={(windowWidth * 0.98) / 3}
        fixed
        spacing={10}
        data={listePlatsProposés}
        renderItem={({item, index}) => {
          return (
            <View style={{backgroundColor:"lightgrey",borderRadius:10}}>
              <Text style={{fontSize:20}}>
                {item}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
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
