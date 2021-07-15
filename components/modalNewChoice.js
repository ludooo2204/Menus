// ### todo
// Quand je fait filtre nbr repas =1 et apres filtre tarte ca marche, j'obtiens qu'hamburger
// par contre , quand je commence par tarte puis nbr repas = 1 ca marche plus a eclaircir !!


import styles from './Styles';

import React, {useEffect, useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {
	Text,
	View,
	Dimensions,
	Pressable,
	NativeModules,
	LayoutAnimation,
} from 'react-native';
import data from '../plats.json';
import listePlatsProposés from '../menu';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
	UIManager.setLayoutAnimationEnabledExperimental(true);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const saison = ['été', 'automne', 'hiver', 'printemps', 'Saison'];
const categoriePlat = ['tarte', 'végétarien', 'light'];
let saisonChoisie = 'saison';
let nbrRepasPossible = 'nombre de repas possible';
let nbrRepas = 0;
let countCategoriePlat = 0;

const NewChoice = ({toggleModal}) => {
	const [filtreChoisi, setFiltreChoisi] = useState(null);
	const [isFiltreActif, setFiltreActif] = useState({
		type: false,
		nbrRepasPossible: false,
		saisonChoisie: false,
		tempsDePreparation: false,
		extraDuWeekend: false,
		Viande: false,
		legumes: false,
		feculent: false,
	});
	const [listePlat, setListePlats] = useState(listePlatsProposés);
	const [listeObjetPlats, setListeObjetPlats] = useState(data.plats);
	const [typeRepasState, setTypeRepasState] = useState('type de repas');
	const [nbrRepasPossibleState, setnbrRepasPossibleState] = useState(
		'nbrRepasPossible',
	);
	const [saisonChoisieState, setsaisonChoisieState] = useState('Saison');
	const [tempsPreparationState, setTempsPreparationState] = useState(
		'Temps de preparation',
	);
	const [extraWeekendState, setExtraWeekendState] = useState(
		'Extra du week-end',
	);
	const [viandeState, setViandeState] = useState('viande');
	const [legumesState, setLegumesState] = useState('legumes');
	const [feculentState, setFeculentState] = useState('feculent');
	const [typePlat, setTypePlat] = useState([
		typeRepasState,
		nbrRepasPossibleState,
		saisonChoisieState,
		tempsPreparationState,
		extraWeekendState,
		viandeState,
		legumesState,
		feculentState,
	]);

	useEffect(() => {
		console.log('useEffect');
		// console.log('listeObjetPlats', listeObjetPlats);
		console.log('isFiltreActif', isFiltreActif);
		console.log('Saison Choisie', saisonChoisieState);
	}, [listeObjetPlats, isFiltreActif]);
	useEffect(() => {
		console.log('render from useffect');
		setTypePlat([
			typeRepasState,
			nbrRepasPossibleState,
			saisonChoisieState,
			tempsPreparationState,
			extraWeekendState,
			viandeState,
			legumesState,
			feculentState,
		]);
		// return () => {
		// 	cleanup
		// }
	}, [
		typeRepasState,
		nbrRepasPossibleState,
		saisonChoisieState,
		tempsPreparationState,
		extraWeekendState,
		viandeState,
		legumesState,
		feculentState,
	]);
	const toggleHighlightFiltre = index => {
		setFiltreChoisi(index);
	};

	const incrementSaison = () => {
		console.log('saisonChoisie');
		console.log(saisonChoisieState);
		// if (saisonChoisieState == 'Saison') {
		// if (saisonChoisieState == 'Saison' || saisonChoisieState == 'printemps') {
		if (saisonChoisieState == 'Saison') {
			console.log('premier choix');
			console.log('saisonChoisie ', saison[0]);
			setsaisonChoisieState(saison[0]);

			// LayoutAnimation.spring();
		} else {
			console.log('inc saison!');
			// console.log(saison[saison.indexOf(saisonChoisieState)])
			setsaisonChoisieState(saison[saison.indexOf(saisonChoisieState) + 1]);
			// setTypePlat([
			// 	typeRepasState,
			// 	nbrRepasPossibleState,
			// 	saisonChoisieState,
			// 	tempsPreparationState,
			// 	extraWeekendState,
			// 	viandeState,
			// 	legumesState,
			// 	feculentState,
			// ]);
			// setsaisonChoisieState(saison[saison.indexOf(saisonChoisieState) + 1])
			// console.log('saison.indexOf(saisonChoisie)')
			//   setSaisonChoisie(saison[saison.indexOf(saisonChoisie) + 1]);
		}
		LayoutAnimation.spring();
	};

	const filtreParTypeDeRepas = () => {
		// console.log('filtreParTypeDeRepas');
		// console.log(data.plats);
		countCategoriePlat++;
		let categoriePlatChoisi = categoriePlat[countCategoriePlat - 1];
		if (countCategoriePlat > categoriePlat.length) {
			countCategoriePlat = 0;
			// LayoutAnimation.easeInEaseOut();
			setTypeRepasState('type de repas');
		} else {
			setTypeRepasState(categoriePlatChoisi);
		}
		LayoutAnimation.linear();
		// setListePlats(liste.Platfilter)
		// console.log('nbr de plat', nbrRepas);
		var filtreExtExiste = Object.keys(isFiltreActif).some(function (k) {
			console.log('k');
			console.log(k);
			console.log(typeof k);
			if (k != 'type') return isFiltreActif[k] === true;
			else console.log('pas de filtre ext');
		});
		console.log('filtreExtExiste');
		console.log(filtreExtExiste);
		let platsFiltreeParCategorie;

		
		// let platsFiltreeParCategorie =
		// 	countCategoriePlat == 0
		// 		? data.plats
		// 		: listeObjetPlats.filter(plat => plat.typePlat == categoriePlatChoisi);


		if (countCategoriePlat == 0) {
			setFiltreActif({...isFiltreActif, type: false});
			platsFiltreeParCategorie = data.plats;
		} else  {
			setFiltreActif({...isFiltreActif, type: true});
			platsFiltreeParCategorie = listeObjetPlats.filter(plat => plat.typePlat == categoriePlatChoisi);
		}
		
		console.log('platsFiltreeParCategorie');
		console.log(platsFiltreeParCategorie)
		setListeObjetPlats(platsFiltreeParCategorie);
		// console.log(platsFiltreeParNbrDePlatRestant);
		setListePlats(platsFiltreeParCategorie.map(plat => plat.nom));
	};

	const incrementNbrDeRepasPossible = () => {
		// if (nbrRepasPossible == 'nombre de repas possible') {
		nbrRepas++;
		// console.log('nbrRepas++');
		// console.log(nbrRepas);
		if (nbrRepas > 3) {
			nbrRepas = 0;
			setnbrRepasPossibleState(nbrRepasPossible);
		} else {
			setnbrRepasPossibleState(nbrRepasPossible + ' ' + nbrRepas);
		}
		LayoutAnimation.linear();
		// setListePlats(liste.Platfilter)
		// console.log('nbr de plat', nbrRepas);
		// console.log('listeObjetPlats', listeObjetPlats);
		// console.log('plats filtre', listeObjetPlats.filter(plat => plat.nbrDeRepasPossible == nbrRepas));
		let platsFiltreeParNbrDePlatRestant;
		var filtreExtExiste = Object.keys(isFiltreActif).some(function (k) {
			console.log('k');
			console.log(k);
			if (k != 'nbrRepasPossible') return isFiltreActif[k] === true;
			else console.log('pas de filtre ext');
		});
		console.log('filtreExtExiste');
		console.log(filtreExtExiste);
		// if (filtreExiste){}
		// else {}
		if (nbrRepas == 0) {
			setFiltreActif({...isFiltreActif, nbrRepasPossible: false});
			platsFiltreeParNbrDePlatRestant = data.plats;
		} else if (nbrRepas !== 0) {
			setFiltreActif({...isFiltreActif, nbrRepasPossible: true});
			platsFiltreeParNbrDePlatRestant = data.plats.filter(
				plat => plat.nbrDeRepasPossible == nbrRepas,
			);
		}

		setListeObjetPlats(platsFiltreeParNbrDePlatRestant);
		setListePlats(platsFiltreeParNbrDePlatRestant.map(plat => plat.nom));
	};
	// console.log(JSON.stringify(isFiltreActif))
	return (
		<View style={styles.centeredView}>
			<View style={styles.modalView}>
				<View style={{flex: 1}}>
					<View style={{flex: 1}}>
						<FlatGrid
							itemDimension={windowWidth / 8}
							horizontal
							// fixed
							spacing={15}
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
													// console.log('type de repas!!');
													filtreParTypeDeRepas();
													break;

												// 'nbrDeRepasPossible':
												case 1:
													// console.log('nbrDeRepasPossible!!');
													incrementNbrDeRepasPossible();
													break;

												//saison
												case 2:
													// console.log('saison!!!!');
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
													console.log('long type de repas!!');
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
							data={listePlat}
							style={{
								backgroundColor: 'grey',
								marginVertical: 10,
								width: windowWidth / 1.2,
							}}
							renderItem={({item, index}) => {
								return (
									<View style={styles.modalPlat}>
										<Pressable onPress={() => console.log(item)}>
											<Text style={styles.modalText}>{item}</Text>
										</Pressable>
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
