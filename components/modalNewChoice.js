import styles from './Styles';

import React, { useState } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import {
	Text, View, Dimensions, Pressable, NativeModules,
	LayoutAnimation,
} from 'react-native';
import data from '../plats.json';
import listePlatsProposés from '../menu';


const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const saison = ['été', 'automne', 'hiver', 'printemps'];
let saisonChoisie = 'saison';
let nbrRepasPossible = 'nombre de repas possible';
let nbrRepas = 0;
const NewChoice = ({ toggleModal }) => {
	const [filtreChoisi, setFiltreChoisi] = useState(null);
	const [listePlat, setListePlats] = useState(listePlatsProposés);

	const [typePlat, setTypePlat] = useState([
		'type de repas',
		nbrRepasPossible,
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
		console.log('saisonChoisie');
		console.log(saisonChoisie);
		if (saisonChoisie == 'saison' || saisonChoisie == 'printemps') {
			console.log('premier choix');
			console.log('saisonChoisie');
			saisonChoisie = saison[0];
			LayoutAnimation.spring();
			setTypePlat([
				'type de repas',
				'nbrDeRepasPossible',
				saisonChoisie,
				'tempsDePreparation',
				'extraDuWeekend',
				'Viande',
				'legumes',
				'feculent',
			]);
		} else {
			// console.log('saison.indexOf(saisonChoisie)')
			//   setSaisonChoisie(saison[saison.indexOf(saisonChoisie) + 1]);
			saisonChoisie = saison[saison.indexOf(saisonChoisie) + 1];
			LayoutAnimation.spring();
			setTypePlat([
				'type de repas',
				'nbrDeRepasPossible',
				saisonChoisie,
				'tempsDePreparation',
				'extraDuWeekend',
				'Viande',
				'legumes',
				'feculent',
			]);
		}
	};
	const incrementNbrDeRepasPossible = () => {
		// if (nbrRepasPossible == 'nombre de repas possible') {
		console.log('koo');
		console.log(nbrRepas);
		if (nbrRepas > 2) {
			nbrRepas = 0;
			// LayoutAnimation.easeInEaseOut();
			LayoutAnimation.linear();
			setTypePlat([
				'type de repas',
				nbrRepasPossible,
				saisonChoisie,
				'tempsDePreparation',
				'extraDuWeekend',
				'Viande',
				'legumes',
				'feculent',
			]);
		} else {
			nbrRepas++;
			LayoutAnimation.linear();
			// LayoutAnimation.easeInEaseOut();
			// LayoutAnimation.spring();
			setTypePlat([
				'type de repas',
				nbrRepasPossible + ' ' + nbrRepas,
				saisonChoisie,
				'tempsDePreparation',
				'extraDuWeekend',
				'Viande',
				'legumes',
				'feculent',
			]);
			// setListePlats(liste.Platfilter)
			platsFiltreeParNbrDePlatRestant = data.plats.filter(plat => plat.nbrDeRepasPossible == nbrRepas)
			setListePlats(platsFiltreeParNbrDePlatRestant.map(plat => plat.nom))
		}
	};
	return (
		<View style={styles.centeredView}>
			<View style={styles.modalView}>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1 }}>
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
							renderItem={({ item, index }) => {
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
												case 2:
													console.log('saison!!!!');
													incrementSaison();
													break;

												case 3:
													console.log('temps!!');
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
						style={{ flex: 6, alignItems: 'center', backgroundColor: 'blue' }}>
						<FlatGrid
							itemDimension={windowWidth / 4}
							spacing={10}
							data={listePlat}
							style={{
								backgroundColor: 'grey',
								marginVertical: 10,
								width: windowWidth / 1.2,
							}}
							renderItem={({ item, index }) => {
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
