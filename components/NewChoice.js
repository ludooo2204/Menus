import styles from './Styles';
import React, {useEffect, useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {Text, View, Dimensions, Pressable, NativeModules, LayoutAnimation, TextInput, ScrollView} from 'react-native';
import data from '../plats.json';
import Icon from 'react-native-vector-icons/FontAwesome';

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
		console.log("filtre actif")
		console.log(isFiltreActif)
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

	return (
		<View style={styles.centeredView}>
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
					<FlatGrid
						itemDimension={windowWidth / 8}
						horizontal
						// fixed
						spacing={15}
						data={typePlat}
						style={{
							backgroundColor: '#bec7d1',
							borderRadius: 20,
							borderColor: 'black',
						}}
						renderItem={({item, index}) => {
							return (
								<Pressable
									onPress={() => {
										console.log(index, item);
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
				<View style={{flex: 6, alignItems: 'center', backgroundColor: '#FDFDFD'}}>
					<View style={{flexDirection: 'row'}}>
						<TextInput
							ref={input => (inputText = input)}
							style={{backgroundColor: '#ccc8c8', borderRadius: 10,fontSize:25,borderWidth: 2,}}
							onChangeText={onChangeInput}
							value={textInputRecherche}
							placeholder="rechercher un plat"
						/>
						<Icon name="remove" size={55} color="#754f9d" onPress={removeTextInput} />
					</View>
					{listePlat.length != 0 && (
						<ScrollView style={{flex: 1}} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',borderWidth: 2,marginHorizontal:5,borderRadius:10}}>
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
												<Pressable onPress={() => choisirPropositionPlat(item)}>
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
		</View>
	);
};

export default NewChoice;
