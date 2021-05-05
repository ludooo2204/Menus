import styles from './Styles';

import React, {useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {Text, View, Dimensions, Pressable} from 'react-native';

import listePlatsProposés from '../menu';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const saison = ['été', 'automne', 'hiver', 'printemps'];
let saisonChoisie="saison"
const NewChoice = ({toggleModal}) => {
  const [filtreChoisi, setFiltreChoisi] = useState(null);
  const [nbrRepas, setNbrRepas] = useState(null);
  const [tempsDePreparation, setTempsDePreparation] = useState(null);
  const [extraWE, setExtraWE] = useState(null);
//   const [saisonChoisie, setSaisonChoisie] = useState('saison');

  const [typePlat, setTypePlat] = useState([
    'type de repas',
	'nbrDeRepasPossible',
    saisonChoisie,
    'tempsDePreparation',
    'extraDuWeekend',
    'Viande',
    'legumes',
    'feculent',
    
  ]);


  const toggleHighlightFiltre = index => {
    setFiltreChoisi(index);
  };
  const incrementSaison = () => {
	  console.log("saisonChoisie")
	  console.log(saisonChoisie)
    if (saisonChoisie == 'saison' || saisonChoisie == 'printemps') {
      console.log('premier choix');
      console.log('saisonChoisie');
     saisonChoisie=saison[0]
	  setTypePlat([
		'type de repas',
		'nbrDeRepasPossible',
		saisonChoisie,
		'tempsDePreparation',
		'extraDuWeekend',
		'Viande',
		'legumes',
		'feculent',
		
	  ])
    } else {
      // console.log('saison.indexOf(saisonChoisie)')
    //   setSaisonChoisie(saison[saison.indexOf(saisonChoisie) + 1]);
	saisonChoisie=(saison[saison.indexOf(saisonChoisie) + 1]);
	  setTypePlat([
		'type de repas',
		'nbrDeRepasPossible',
		saisonChoisie,
		'tempsDePreparation',
		'extraDuWeekend',
		'Viande',
		'legumes',
		'feculent',
		
	  ])
    }
  };
  const incrementNbrDeRepasPossible = () => {
    if (nbrRepas == null) {
      console.log('premier choix REpas possbile');
      setNbrRepas(1);
      typePlat[7] = 'nbrDeRepasPossible ' + nbrRepas;
    } else {
      // console.log('saison.indexOf(saisonChoisie)')
      console.log(saisonChoisie);
      setNbrRepas(nbrRepas + 1);
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
                //   console.log('item');
                return (
                  <Pressable
                    onPress={() => {
						// console.log(index, item);
                      switch (index) {

                        //type de repas
                        case 0:
                          console.log('type de repas!!');
                          break;

                        // 'nbrDeRepasPossible':
                        case 1:
                          console.log('nbrDeRepasPossible!!');
                          incrementNbrDeRepasPossible();
                          break;

						  //saison
                        case 2						:
                          console.log('saison!!!!');
                          incrementSaison();
                          break;

                        case 3:
							console.log("temps!!")
                          break;
                      }
                    }}
                    onLongPress={() => {
                      switch (item) {
                        case 'type de repas':
                          console.log('type de repas!!');
                          break;
                        case 'nbrDeRepasPossible':
                          setNbrRepas(null);
                          break;
                        case saisonChoisie:
                          setSaisonChoisie('saison');
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
