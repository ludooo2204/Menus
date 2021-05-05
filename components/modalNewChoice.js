import styles from './Styles';

import React, {useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {Text, View, Dimensions, Pressable} from 'react-native';

import listePlatsProposés from '../menu';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const saison = ['été', 'automne', 'hiver', 'printemps'];
const NewChoice = ({toggleModal}) => {
  const [filtreChoisi, setFiltreChoisi] = useState(null);
  const [nbrRepas, setNbrRepas] = useState(null);
  const [tempsDePreparation, setTempsDePreparation] = useState(null);
  const [extraWE, setExtraWE] = useState(null);
  const [saisonChoisie, setSaisonChoisie] = useState("saison");


  const typePlat = [
    'type de repas',
    saisonChoisie,
    'tempsDePreparation',
    'extraDuWeekend',
    'Viande',
    'legumes',
    'feculent',
    'nbrDeRepasPossible',
  ];

  const toggleHighlightFiltre = index => {
    setFiltreChoisi(index);
  };
  const incrementSaison = () => {
    if (saisonChoisie == "saison" || saisonChoisie == 'printemps') {
      console.log("premier choix");
      console.log(saisonChoisie);
      setSaisonChoisie(saison[0]);
    } else {
      // console.log('saison.indexOf(saisonChoisie)')
      console.log(saisonChoisie);
      setSaisonChoisie(saison[saison.indexOf(saisonChoisie) + 1]);
    }
  };


  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <FlatGrid
              itemDimension={windowWidth / 8}
              horizontal
              fixed
              data={typePlat}
              style={{
                backgroundColor: 'lightyellow',
                borderWidth: 3,
                borderColor: 'black',
              }}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    onPress={() => {
                      switch (item) {
                        case 'type de repas':
                          console.log('type de repas!!');
                          break;
                        case 'nbrDeRepasPossible':
                          console.log('type de repas!!');
                          break;
                        case saisonChoisie:
                          incrementSaison();
                          break;
                        case 'Viande':
                          break;
                      }
                    }}
                    onLongPress={() => {
                      switch (item) {
                        case 'type de repas':
                          console.log('type de repas!!');
                          break;
                        case 'nbrDeRepasPossible':
                          console.log('type de repas!!');
                          break;
                        case saisonChoisie:
                          setSaisonChoisie("saison")
                          break;
                        case 'Viande':
                          break;
                      }
                    }}
                    style={
                      filtreChoisi == index
                        ? styles.modalFiltreHighlight
                        : styles.modalFiltre
                    }>
                    <Text style={styles.modalFiltreText}>{item}</Text>
                  </Pressable>
                );
              }}
            />
          </View>
          <View
            style={{flex: 6, alignItems: 'center', backgroundColor: 'blue'}}>
            <FlatGrid
              itemDimension={windowWidth / 4}
              spacing={10}
              data={listePlatsProposés}
              style={{
                backgroundColor: 'red',
                marginVertical: 10,
                width: windowWidth / 1.2,
              }}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.modalPlat}>
                    <Text style={styles.modalText}>{item}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={toggleModal}>
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NewChoice;
