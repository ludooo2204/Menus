import styles from './Styles';
import React, {useEffect, useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {Text, View, Dimensions, Pressable, NativeModules, LayoutAnimation} from 'react-native';
import data from '../plats.json';
// import {listePlatsProposés} from '../menu';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const saison = ['été', 'automne', 'hiver', 'printemps', 'Saison'];
const categoriePlat = ['tarte', 'végétarien', 'light', 'extra'];
let saisonChoisie = 'saison';
let nbrRepasPossible = 'nombre de repas possible';
let nbrRepas = 0;
let countCategoriePlat = 0;

const NewChoice = ({closeModal,choisirPropositionPlat}) => {
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
	const [listePlat, setListePlats] = useState(data.plats.map(plat=>plat.nom));
	const [typeRepasState, setTypeRepasState] = useState('type de repas');
	const [nbrRepasPossibleState, setnbrRepasPossibleState] = useState('nbrRepasPossible');
	const [saisonChoisieState, setsaisonChoisieState] = useState('Saison');
	const [tempsPreparationState, setTempsPreparationState] = useState('Temps de preparation');
	const [extraWeekendState, setExtraWeekendState] = useState('Extra du week-end');
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
console.log("typePlat")
console.log(typePlat)
console.log("listePlat")
console.log(listePlat)
	useEffect(() => {
		let dataFiltre = data.plats.filter(
			plat =>
				(!isFiltreActif.type ? true : plat.typePlat.includes(isFiltreActif.type)) &&
				(!isFiltreActif.nbrRepasPossible ? true : plat.nbrDeRepasPossible == isFiltreActif.nbrRepasPossible),
		);
		setListePlats(dataFiltre.map(plat => plat.nom));
	}, [isFiltreActif]);

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
	}, [typeRepasState, nbrRepasPossibleState, saisonChoisieState, tempsPreparationState, extraWeekendState, viandeState, legumesState, feculentState]);
	const toggleHighlightFiltre = index => {
		setFiltreChoisi(index);
	};

	const incrementSaison = () => {
		if (saisonChoisieState == 'Saison') {
			setsaisonChoisieState(saison[0]);
		} else {
			console.log('inc saison!');
			setsaisonChoisieState(saison[saison.indexOf(saisonChoisieState) + 1]);
		}
		LayoutAnimation.spring();
	};

	const filtreParTypeDeRepas = () => {
		countCategoriePlat++;
		let categoriePlatChoisi = categoriePlat[countCategoriePlat - 1];
		if (countCategoriePlat > categoriePlat.length) {
			countCategoriePlat = 0;
			setTypeRepasState('type de repas');
		} else {
			setTypeRepasState(categoriePlatChoisi);
		}
		LayoutAnimation.linear();
		var filtreExtExiste = Object.keys(isFiltreActif).some(function (k) {
			if (k != 'type') return isFiltreActif[k] === true;
		});

		if (countCategoriePlat == 0) {
			setFiltreActif({...isFiltreActif, type: false});
		} else {
			setFiltreActif({...isFiltreActif, type: categoriePlatChoisi});
		}
	};

	const incrementNbrDeRepasPossible = () => {
		nbrRepas++;
		if (nbrRepas > 3) {
			nbrRepas = 0;
			setnbrRepasPossibleState(nbrRepasPossible);
		} else {
			setnbrRepasPossibleState(nbrRepasPossible + ' ' + nbrRepas);
		}
		LayoutAnimation.linear();
		let platsFiltreeParNbrDePlatRestant;
		var filtreExtExiste = Object.keys(isFiltreActif).some(function (k) {
			if (k != 'nbrRepasPossible') return isFiltreActif[k] === true;
		});

		if (nbrRepas == 0) {
			setFiltreActif({...isFiltreActif, nbrRepasPossible: false});
		} else if (nbrRepas !== 0) {
			setFiltreActif({...isFiltreActif, nbrRepasPossible: nbrRepas});
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
										style={filtreChoisi == index ? styles.modalFiltreHighlight : styles.modalFiltre}>
										<Text style={styles.modalFiltreText}>{item}</Text>
									</Pressable>
								);
							}}
						/>
					</View>
					<View style={{flex: 6, alignItems: 'center', backgroundColor: 'blue'}}>
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
										<Pressable onPress={() => choisirPropositionPlat(item)}>
											<Text style={styles.modalText}>{item}</Text>
										</Pressable>
									</View>
								);
							}}
						/>
					</View>
				</View>
				<Pressable style={[styles.button, styles.buttonClose]} onPress={closeModal}>
					<Text style={styles.textStyle}>Hide Modal</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default NewChoice;
