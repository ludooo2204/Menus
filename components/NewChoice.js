import React, {useEffect, useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {StyleSheet, Text, View, Dimensions, Pressable, NativeModules, LayoutAnimation, TextInput, ScrollView} from 'react-native';
import data from '../plats.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import {themes} from './themes';
import LinearGradient from 'react-native-linear-gradient';

import { tsCallSignatureDeclaration } from '@babel/types';

// import {listePlatsProposés} from '../menu';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const saison = ['été', 'automne', 'hiver', 'printemps', 'Saison'];
const categoriePlat = ['tarte', 'vegetarien', 'light', 'extra'];
let saisonChoisie = 'saison';
let nbrRepasPossible = 'nombre de repas possible';
let nbrRepas = 0;
let countCategoriePlat = 0;

const NewChoice = ({route, navigation}) => {
	// const NewChoice = ({navigation,closeModal, choisirPropositionPlat}) => {
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

	// const [listePlat, setListePlats] = useState(data.plats.map(plat => plat.nom));
	// const [listePlat, setListePlats] = useState(route.params.bdd);
	// console.log(route.params)
	const [listePlat, setListePlats] = useState(route.params.bdd.map(plat => plat.nom_plat));
	const [listePlatsFiltreeParInput, setListePlatsFiltreeParInput] = useState(null);

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
	const [textInputRecherche, setTextInputRecherche] = useState(null);
	// const [textInputRecherche, setTextInputRecherche] = useState(null);
	const {bdd} = route.params;
const theme=(route.params.theme)
	useEffect(() => {
		if (bdd)  setListePlats(bdd.map(item => item.nom_plat));
console.log("bdd")
console.log(bdd)
	}, [bdd]);


useEffect(() => {
	// console.log(listePlat)
	// console.log(listePlatsFiltreeParInput)
}, [listePlat])

	useEffect(() => {
		console.log('isFiltreActif');
		console.log(isFiltreActif);
		// console.log(bdd)
		let dataFiltre = bdd.filter(
			plat =>
				(!isFiltreActif.type ? true : plat.typePlat ? plat.typePlat.includes(isFiltreActif.type) : false) &&
				(!isFiltreActif.nbrRepasPossible ? true : plat.nbrDeRepasPossible == isFiltreActif.nbrRepasPossible),
		);
		console.log(dataFiltre)
		setListePlats(dataFiltre.map(plat => plat.nom_plat));
	}, [isFiltreActif]);

	useEffect(() => {
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
		console.log("filtre par type de repas")
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

	const choisirPropositionPlat = item => {
		console.log('item ==', item);

		navigation.navigate({name: 'menu', params: {platChoisiParams: item}});
		// paramsPlat(item)
	};
	const onChangeInput = value => {
		console.log('onChangeInput');
		setTextInputRecherche(value);
		if (value != '') {
			let listeFiltréesParInput = [];
			for (const iterator of listePlat) {
				const platMinuscule = iterator.toLowerCase();
				const filtreMinuscule = value.toLowerCase();
				if (platMinuscule.includes(filtreMinuscule)) listeFiltréesParInput.push(iterator);
			}
			console.log('listeFiltréesParInput');
			console.log('listeFiltréesParInput');
			console.log(listeFiltréesParInput);
			console.log('value');
			console.log(value);

			setListePlatsFiltreeParInput(listeFiltréesParInput);
		}
	};
	const blurTextInput = () => {
		console.log('blur');
		setTextInputRecherche('');
		setListePlats(route.params.bdd.map(plat => plat.nom_plat));
	};
	const removeTextInput = () => {
		setListePlatsFiltreeParInput(null);
		console.log('removeTextInput');
		setTextInputRecherche('');
		setListePlats(route.params.bdd.map(plat => plat.nom_plat));
		inputText.blur();
	};


	const styles = StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		button: {
			borderRadius: 20,
			padding: 10,
			margin: 2,
			paddingHorizontal:10,
			marginBottom:5,
			elevation: 2,
		},
		buttonOpen: {
			backgroundColor: '#F194FF',
		},
		buttonClose: {
			backgroundColor: themes[theme].secondaryColor,
		},
		textStyle: {
			// color: 'white',
			// backgroundColor: themes[theme].secondaryColor,
			color: themes[theme].primaryColor,
	
	fontSize:20,
			fontWeight: 'bold',
			borderRadius: 20,
		},
		modalText: {
			// textAlign: 'center',
			// textAlignVertical: 'center',
			height: (windowHeight * 0.98) / 9,
			// fontSize: 20,
			// fontWeight: 'bold',
				
			textAlign: 'center',
			textAlignVertical: 'center',
			fontSize: 20,
			fontWeight: 'bold',
			color: themes[theme].primaryColor,
		},
		modalTest: {
			position: 'absolute',
			top:windowHeight  / 2.5,
			left:windowWidth/5.5,
			borderRadius:20,
			textAlign: 'center',
			textAlignVertical: 'center',
			justifyContent:"center",
			backgroundColor:'white',
			// height: windowHeight  / 5,
			width: windowWidth  / 1.5,
			fontSize: 20,
			fontWeight: 'bold',
			padding: 20
			
		},
		modalTestText: {
			
			textAlign: 'center',
			textAlignVertical: 'center',
			fontSize: 20,
			fontWeight: 'bold',
			color: themes[theme].primaryColor,
			
		},
		modalVisualisation: {
			position: 'absolute',
			top:windowHeight  / 4,
			left:windowWidth/5.5,
			borderRadius:20,
			textAlign: 'center',
			textAlignVertical: 'center',
			justifyContent:"center",
			backgroundColor:'white',
			height: windowHeight  / 2,
			width: windowWidth  / 1.5,
			fontSize: 20,
			fontWeight: 'bold',
			
		},
		modalVisualisationText: {
			
			textAlign: 'center',
			textAlignVertical: 'center',
			fontSize: 20,
			fontWeight: 'bold',
			color: themes[theme].primaryColor,
			
		},
		modalVisualisationTextLien: {
			
			textAlign: 'center',
			textAlignVertical: 'center',
			fontSize: 20,
			fontWeight: 'bold',
			color: 'blue',
			textDecorationLine:"underline"
			
		},
		modalFiltreText: {
			// textAlign: 'center',
			// textAlignVertical: 'center',
			// height: (windowWidth ) / 8,
			fontSize: 25,
			color: themes[theme].primaryColor,
			// fontWeight:900,
			// margin: 2,
			paddingHorizontal: 5,
	
			fontWeight: 'bold',
		},
		modalPlat: {
			backgroundColor: themes[theme].secondaryColor,
			borderRadius: 20,
			width: windowWidth / 2.5,
			marginHorizontal: 7,
			marginVertical: 5,
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5,
		},
		modalFiltre: {
			flex: 1,
			backgroundColor: themes[theme].secondaryColor,
			justifyContent: 'center',
			// justifyContent:"center",
			alignItems: 'center',
			minWidth: windowWidth / 3,
			borderRadius: 20,
		},
		modalFiltreHighlight: {
			backgroundColor: themes[theme].thirdColor,
			borderRadius: 20,
			justifyContent: 'center',
			// justifyContent:"center",
			alignItems: 'center',
			borderWidth: 5,
			borderColor: 'black',
		},
	
		modalView: {
			// margin: 20,
			backgroundColor: themes[theme].quadColor,
			flex: 1,
			borderRadius: 20,
			padding: 15,
			alignItems: 'center',
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5,
		},
		appContainer: {
			// flex: 1,
			height: '100%',
			// backgroundColor: themes[theme].quadColor,
			// padding: "0.5%"
		},
		grille: {
			height: windowHeight * 0.93,
	
			// alignItems: 'center',
			// alignItems: 'flex-start',
			flexDirection: 'row',
			// backgroundColor: 'blue',
		},
		sectionTitle: {
			fontSize: 24,
			fontWeight: '600',
		},
	
		plat: {
			backgroundColor: themes[theme].secondaryColor,
			elevation: 18,
			borderRadius: 20,
			marginHorizontal: '3%',
			marginVertical: '3%',
			justifyContent: 'center',
			width: '40%',
			// borderWidth:1,
			height: windowHeight / 10,
		},
		platLocked: {
			justifyContent: 'center',
			height: windowHeight / 10,
			backgroundColor: themes[theme].thirdColor,
			elevation: 18,
			borderRadius: 20,
			// borderWidth: 2,
			marginHorizontal: '3%',
			marginVertical: '3%',
			width: '40%',
		},
		textPlat: {
			textAlign: 'center',
			textAlignVertical: 'center',
			// height: ((windowHeight) / 10),
			fontSize: 19,
			// backgroundColor:"grey",
			// marginHorizontal:5,
			fontWeight: 'bold',
			textShadowColor: themes[theme].quadColor,
			textShadowOffset: {
				width: 1,
				height: 2,
			},
			// elevation:5,
			textShadowRadius: 2,
			textTransform: 'uppercase',
			// marginRight:10,
			// borderWidth:2,
			color: themes[theme].primaryColor,
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
		navbar: {
			// height: '8%',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: '5%',
			backgroundColor: themes[theme].secondaryColor,
			position: 'absolute',
			padding: 5,
			bottom:0,
			left:0,
			right:0
		},
		BarreMidiSoir: {
			height: '4.2%',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
			// backgroundColor:themes[theme].quadColor
		},
		barreJourSemaine: {
			flex: 3,
			// flexDirection: 'row',
			// flexWrap: 'wrap',
			marginBottom: 27,
	
			// pad:5,
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
		},
		textJour: {
			fontWeight: '400',
			fontSize: 22,
			color: themes[theme].primaryColor,
			textAlign: 'center',
			textAlignVertical: 'center',
			marginVertical: '30%',
			height: windowHeight / 10,
			
		},
		textJourAujourdhui: {
			fontWeight: '400',
			fontSize: 22,
			backgroundColor: themes[theme].primaryColor,
			color: themes[theme].secondaryColor,
			textAlignVertical: 'center',
			textAlign: 'center',
			marginVertical: '30%',
			borderRadius: 10,
			height: windowHeight / 10,
		},
	
	});

	return (
		<LinearGradient  colors={['#736e67','#e0dbb4','#fffce8']} style={styles.centeredView}>
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
					<FlatGrid
						itemDimension={windowWidth / 8}
						horizontal
						// fixed
						spacing={15}
						data={typePlat}
						style={{
							// backgroundColor: themes[theme].secondaryColor,
							// borderRadius: 20,
							// borderWidth:2,
							// borderColor: 'black',
						}}
						renderItem={({item, index}) => {
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
										// toggleHighlightFiltre(index)
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
								
									//TODO ca marche ca ??
									style={filtreChoisi == index ? styles.modalFiltreHighlight : styles.modalFiltre}>
									<Text style={styles.modalFiltreText}>{item}</Text>
							
								</Pressable>
							);
						}}
					/>
				</View>
				<View style={{flex: 6, alignItems: 'center'}}>
				{/* <View style={{flex: 6, alignItems: 'center', backgroundColor: '#FDFDFD'}}> */}
					<View style={{flexDirection: 'row'}}>
						<TextInput
							ref={input => (inputText = input)}
							style={{ borderRadius: 10,padding:5,fontSize:25,borderWidth: 2,margin:5}}
							onChangeText={onChangeInput}
							value={textInputRecherche}
							placeholder="rechercher un plat"
						/>
						<Icon name="remove" size={55} color="#754f9d" onPress={removeTextInput} />
					</View>
					{listePlat.length != 0 && (
						<ScrollView style={{flex: 1}} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',marginHorizontal:5,borderRadius:10}}>
							{listePlatsFiltreeParInput
								? listePlatsFiltreeParInput.map((item, index) => {
										return (
											<View key={index} style={styles.modalPlat}>
												<Pressable onPress={() => choisirPropositionPlat(item)}>
													<Text style={styles.modalText}>{item}</Text>
												</Pressable>
											</View>
										);
								  })
								: listePlat.map((item, index) => {
										return (
											<View key={index} style={styles.modalPlat}>
												<Pressable  onPress={() => choisirPropositionPlat(item)}>
													<Text style={styles.modalText}>{item}</Text>
													{console.log("item",item)}
												</Pressable>
											</View>
										);
								  })}
						</ScrollView>
					)}
				</View>
			</View>
			{/* <Pressable style={[styles.button, styles.buttonClose]} onPress={closeModal}> */}
			<Pressable style={[styles.button, styles.buttonClose]} onPress={() => navigation.goBack()}>
				<Text style={styles.textStyle}>Quitter</Text>
			</Pressable>
		</LinearGradient>
	);
};

export default NewChoice;
