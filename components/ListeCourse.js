import {transform} from '@babel/core';
import React, {useState, useEffect} from 'react';
import {View, ScrollView, Modal, StatusBar, Text, Dimensions, Animated, Easing, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ListeCourse = ({route}) => {
	const [listeCourse, setListeCourse] = useState(route.params.listePlatChoisiavecData);
	const [listeIngredientAAfficher, setListeIngredientAAfficher] = useState([]);
	console.log('liste course from navigation');
	console.log(listeCourse);
	useEffect(() => {
		const listeCourseSansDoublon = [...new Set(listeCourse)];
		console.log('listeCourseSansDoublon');
		console.log(listeCourseSansDoublon);
		let listeIngredients = [];
		for (const iterator of listeCourseSansDoublon) {
			// iterator.replace("\"","")
			const temp = iterator.ingredients.split(',');
			temp.pop();

			for (let i = 0; i < temp.length; i++) {
				const element = temp[i];
				listeIngredients.push(temp[i]);
			}
		}
		const listeCumulée = [...listeIngredients];
		let arrayTemp = [];
		let arrayTemp2 = [];
		for (let i = 0; i < listeCumulée.length; i++) {
			arrayTemp.push(listeCumulée[i]);
			if (i % 3 == 2) {
				arrayTemp2.push(arrayTemp);
				arrayTemp = [];
			}
		}

		const ingredientUnique = [...new Set(arrayTemp2.map(e => e[0]))];
		console.log(ingredientUnique);
		let listeFinale = {};
		for (const iterator of ingredientUnique) {
			listeFinale[iterator] = [];
			for (const j of arrayTemp2) {
				if (iterator == j[0]) {
					listeFinale[iterator].push({nbr: Number(j[1]), unité: j[2]});
				}
			}
		}
		console.log('listeFinale');
		console.log(listeFinale);
		const listeFinaleArray = [];
		for (const key in listeFinale) {
			if (Object.hasOwnProperty.call(listeFinale, key)) {
				const element = listeFinale[key];
				// console.log(element);
				listeFinaleArray.push({Ingredient: key, quantité: listeFinale[key]});
			}
		}

		console.log(listeFinaleArray);
		setListeIngredientAAfficher(listeFinaleArray);
	}, []);

	const Ingredient = ({itemString, item, delay, acheter}) => {
		const [modalVisible, setModalVisible] = useState(false);
		const [selectionné, setSelectionné] = useState(false);
		const [selection, setSelection] = useState(null);

		
		const heightAnim = React.useRef(new Animated.Value(0)).current;
		React.useEffect(() => {
			// console.log(heightAnim);
			// On anime notre valeur jusqu'à la hauteur de la fenetre
			Animated.timing(heightAnim, {
				toValue: 1,
				duration: 1000, // Durant 10 secondes
				useNativeDriver: true, // Cela sera abordé plus tard
				delay: delay,
				// easing: Easing.bounce,
				easing: Easing.elastic(2),
			}).start();
		}, [heightAnim]);

		const selectionnerItem = () => {
			console.log('item');
			const listePlatsObjetConcerné=([...new Set(listeCourse)].filter(e => e.ingredients.includes(item.Ingredient)));
			const platConcernéNomPlat = listePlatsObjetConcerné.map(e=>e.nom_plat)
			console.log(platConcernéNomPlat)
			setSelectionné(!selectionné)
			setSelection(platConcernéNomPlat)
			// setModalVisible(true)
		};
		return (
			<View>
				{/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
					<StatusBar backgroundColor="lightgrey" hidden></StatusBar>

					<View style={styles.modalVisualisation}>
						<Text style={styles.modalVisualisationText}>ingredients</Text>
						<Text>sdg</Text>

						<Pressable style={{
										backgroundColor: '#d1dce8',
										alignItems: 'center',
										justifyContent: 'center',
										marginHorizontal: 10,
										marginVertical: 5,
										borderRadius: 10,
										height: 30,
									}}>
							<Text onPress={() => setModalVisible(false)} style={styles.text}>
								QUITTER
							</Text>
						</Pressable>
					</View>
				</Modal> */}
				<Animated.View style={
					[
						styles.item,
						 {transform: [{scale: heightAnim}]},
						{minHeight:selectionné?200:50}
					]
				}>
					<Pressable style={{flex: 3}}>
						<Text onPress={selectionnerItem} style={styles.text}>
							{itemString}
						</Text>
						{selectionné&&selection.map((e)=><Text>
						{e}
							
							</Text>)}
					</Pressable>
					<Icon name="shopping-cart" size={40} style={{padding: 10}} color="#754f9d" onPress={acheter} />
					<Icon name="trash" size={40} style={{padding: 10}} color="#754f9d" />
				</Animated.View>
			</View>
		);
	};

	const calculQuantitéParUnité = _ingredients => {
		let quantitéAdditionnéEtCombiné = [];
		let quantitéAdditionnéEtCombinéTemp = '';
		let finalString = '';

		// console.log(_ingredients.Ingredient);

		const unitéUnique = [...new Set(_ingredients.quantité.map(e => e.unité))];
		for (const iterator of unitéUnique) {
			let nouvelleQuantité = 0;
			if (_ingredients.quantité.filter(unité => unité.unité == iterator).length > 0) {
				// console.log(iterator);
				// console.log('liste des quantités de meme unité');
				// console.log(_ingredients.quantité.filter(unité => unité.unité == iterator));
				for (const iterator2 of _ingredients.quantité.filter(unité => unité.unité == iterator)) {
					nouvelleQuantité += iterator2.nbr;
				}

				// console.log('addition =', nouvelleQuantité+" "+iterator);
				quantitéAdditionnéEtCombinéTemp = `${nouvelleQuantité} ${iterator == 'unité' ? '' : iterator}`;
				quantitéAdditionnéEtCombiné.push(quantitéAdditionnéEtCombinéTemp);
				// console.log(quantitéAdditionnéEtCombinéTemp, ' avec une longueur de ', quantitéAdditionnéEtCombinéTemp.length);
			}
		}
		const arraySorted = quantitéAdditionnéEtCombiné.sort(function (a, b) {
			return a.length - b.length;
		});
		for (let i = 0; i < arraySorted.length; i++) {
			if (arraySorted[i].length > 3) {
				arraySorted[i] = arraySorted[i] + ' de ';
			}
			finalString += arraySorted[i];
			finalString += _ingredients.Ingredient;
			finalString += arraySorted.length > 1 && i != arraySorted.length - 1 ? ' + ' : '';
		}

		// console.log(finalString);

		return finalString;
	};

	return (
		<ScrollView>
			{listeIngredientAAfficher &&
				listeIngredientAAfficher.map((item, index) => {
					const delay = index * 10;

					return (
						<Ingredient
							key={index}
							item={item}
							delay={delay}
							itemString={calculQuantitéParUnité(item)}
							selectionnerItem={() => selectionnerItem(item)}
							acheter={() => console.log(calculQuantitéParUnité(item))}
						/>
					);
				})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	item: {
		// height: '5%',
		// backgroundColor: 'red',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 1,
		marginTop: 4,
		paddingHorizontal: 5,
		// borderWidth: 2,
		// borderColor: 'black',
		// borderRadius: 40,
		// alignItems: 'center',
		// justifyContent:'center'
		backgroundColor: '#d1dce8',
		elevation: 18,
		borderRadius: 10,
		// marginHorizontal: '3%',
		// marginVertical: '3%',
		justifyContent: 'center',
		// width: '40%',
		minHeight: 50,
	},
	text: {
		fontSize: 30,
	},
	modalVisualisation: {
		position: 'absolute',
		top: windowHeight / 4,
		left: windowWidth / 5.5,
		borderRadius: 20,
		textAlign: 'center',
		textAlignVertical: 'center',
		justifyContent: 'center',
		// display:'flex',
		backgroundColor: 'white',
		height: windowHeight / 4,
		width: windowWidth / 1.5,
		fontSize: 20,
		fontWeight: 'bold',
	},
	modalVisualisationText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#754f9d',
	},
});
export default ListeCourse;
