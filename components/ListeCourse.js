import {transform} from '@babel/core';
import React, {useState, useEffect} from 'react';
import {View, ScrollView, Modal, StatusBar,TextInput, Text, Dimensions, Animated, Easing, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {themes} from './themes';
import LinearGradient from 'react-native-linear-gradient';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
// import {TextInput} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ListeCourse = ({route,navigation}) => {
	const [listeCourse, setListeCourse] = useState(route.params.listePlatChoisiavecData);
	const [listeIngredientAAfficher, setListeIngredientAAfficher] = useState([]);
	const [listeCourseFinale, setListeCourseFinale] = useState([]);

	useEffect(() => {
		console.log('listeCourseFinale');
		console.log('listeCourseFinale');
		console.log('listeCourseFinale');
		console.log('listeCourseFinale');
		console.log(listeCourseFinale);
	}, [listeCourseFinale]);
	useEffect(() => {
		const listeCourseSansDoublon = [...new Set(listeCourse)];
		console.log('listeCourseSansDoublon');
		console.log('listeCourseSansDoublon');
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
	}, [listeCourse]);

	const Ingredient = ({itemString, item, delay, acheter, supprimer,modifierQtt}) => {
		const [modalVisible, setModalVisible] = useState(false);
		const [selectionné, setSelectionné] = useState(false);
		const [selection, setSelection] = useState(null);
		const [ingredientModifié, setIngredientModifié] = useState(false);



		const scaleAnim = React.useRef(new Animated.Value(0)).current;
		React.useEffect(() => {
			// console.log('blablalbalbalb');
			// console.log('blablalbalbalb');
			// console.log('blablalbalbalb');
			// console.log('blablalbalbalb');
			// console.log('blablalbalbalb');
			// console.log('blablalbalbalb');
			// console.log(listeCourseFinale);
			// On anime notre valeur jusqu'à la hauteur de la fenetre
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 1000, // Durant 10 secondes
				useNativeDriver: true, // Cela sera abordé plus tard
				delay: delay,
				// easing: Easing.bounce,
				easing: Easing.elastic(2),
			}).start();
			// }, []);
		}, [scaleAnim]);

		const selectionnerItem = () => {
			console.log('item');
			console.log('item');
			console.log('item');
			console.log('item');
			console.log(item);
			// animPopup();
			const listePlatsObjetConcerné = [...new Set(listeCourse)].filter(e => e.ingredients.includes(item.Ingredient));
			const platConcernéNomPlat = listePlatsObjetConcerné.map(e => e.nom_plat);
			console.log(platConcernéNomPlat);
			// setSelectionné(!selectionné);
			setSelection(platConcernéNomPlat);
			setModalVisible(true);
		};

		const ModalItemCourse = () => {
			const [quantitéIngredients, setQuantitéIngredients] = useState(itemString);
			const [inputQuantitéIngredients, setInputQuantitéIngredients] = useState(false);
			// console.log('selection');
			// console.log(selection);
			const modifierQuantité = () => {
				setInputQuantitéIngredients(true);
			};
			const handleModif = modification => {
				setQuantitéIngredients(modification);
				
				console.log(modification);
			};
			const validerModif = () => {
				modifierQtt(quantitéIngredients)
				// console.log(quantitéIngredients)
				setModalVisible(false);
			};
			const annulerModif = () => {
				setModalVisible(false);
			};
			return (
				<Modal animationType="slide" transparent={true} visible={modalVisible}>
					<StatusBar backgroundColor="lightgrey" hidden></StatusBar>

					<View style={styles.modalVisualisation}>
						{!inputQuantitéIngredients ? (
							<Pressable onPress={modifierQuantité}>
								<Text style={styles.modalVisualisationText}>{quantitéIngredients}</Text>
							</Pressable>
						) : (
							<TextInput
								// placeholder={quantitéIngredients}
								autoFocus
								style={styles.modalVisualisationTextInput}
								value={quantitéIngredients}
								onChangeText={e => handleModif(e)}
								keyboardType="default"
							/>
						)}
						<Text style={styles.modalVisualisationText}>Plats concernés :</Text>
						{selection && selection.map((item, index) => <Text key={index}>{item}</Text>)}

						<View style={{flexDirection: 'row',margin:10,marginTop:25}}>
							<Pressable
							 onPress={validerModif}
								style={{
									backgroundColor: '#F2EFEA',
									alignItems: 'center',
									justifyContent: 'center',
									marginHorizontal: 10,
									marginVertical: 5,
									borderRadius: 10,
									// height: 30,
									padding: 10,
									// position: "absolute",
									// bottom:0
								}}>
								<Text style={styles.text}>
									Valider
								</Text>
							</Pressable>
							<Pressable
							onPress={annulerModif}
								style={{
									backgroundColor: '#F2EFEA',
									alignItems: 'center',
									justifyContent: 'center',
									marginHorizontal: 10,
									marginVertical: 5,
									borderRadius: 10,
									// height: 30,
									padding: 10,

									// position: "absolute",
									// bottom:0
								}}>
								<Text  style={styles.text}>
									Annuler
								</Text>
							</Pressable>
						</View>
					</View>
				</Modal>
			);
		};
		return (
			<View>
				<ModalItemCourse />

				<Animated.View
					style={[
						styles.item,
						listeCourseFinale.length == 0 ? {transform: [{scale: scaleAnim}]} : null,

						//  {minHeight: selectionné ? 200 : 40}
					]}>
					<Pressable style={{flex: 3}}>
						<View>
							<Text onPress={selectionnerItem} style={styles.text}>
								{itemString}
							</Text>
							{selectionné && selection.map(e => <Text>{e}</Text>)}
						</View>
					</Pressable>
					<Icon name="shopping-cart" size={25} style={{paddingRight: 25}} color="#585a5e" onPress={acheter} />
					<Icon name="trash" size={25} style={{paddingRight: 15}} color="#585a5e" onPress={supprimer} />
				</Animated.View>
			</View>
		);
	};

	const calculQuantitéParUnité = _ingredients => {
console.log("_ingredients")
console.log(_ingredients)
if(_ingredients.string) {
	console.log("_ingredients.string")
	console.log("_ingredients.string")
	console.log("_ingredients.string")
	console.log(_ingredients.string)
	return _ingredients.string}
		let quantitéAdditionnéEtCombiné = [];
		let quantitéAdditionnéEtCombinéTemp = '';
		let finalString = '';


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

	const acheter = (produitAAcheter, item, index) => {
		// console.log('produitAAcheter');
		// console.log('produitAAcheter');
		// console.log('produitAAcheter');
		// console.log('produitAAcheter');
		// console.log('produitAAcheter');
		// console.log(produitAAcheter);
		// console.log('index');
		// console.log(index);
		// console.log('item');
		// console.log(item);
		// console.log('listeCourse');
		// console.log(listeIngredientAAfficher);
		let listeCourseTemp = [...listeIngredientAAfficher];
		console.log(listeIngredientAAfficher.length);
		listeCourseTemp.splice(index, 1);
		console.log('listeCourseTemp');
		console.log(listeCourseTemp);
		setListeCourseFinale(listeCourseFinale => [...listeCourseFinale, produitAAcheter]);
		setListeIngredientAAfficher(listeCourseTemp);
	};
	const supprimer = (produitASupprimer, item, index) => {
		let listeCourseTemp = [...listeIngredientAAfficher];
		listeCourseTemp.splice(index, 1);
		setListeIngredientAAfficher(listeCourseTemp);
	};
	const modifierQtt = (produitASupprimer, item, index,modif) => {
		
		console.log(produitASupprimer, item, index,modif)
		console.log(listeIngredientAAfficher)
		let listeCourseTemp = [...listeIngredientAAfficher];
		listeCourseTemp[index].string=modif
		// let listeCourseTemp = [...listeIngredientAAfficher];
		// listeCourseTemp.splice(index, 1);
		setListeIngredientAAfficher(listeCourseTemp);
	};
	const Panier = () => {
		const impressionCourses =()=>{
			console.log(listeCourseFinale)
			navigation.navigate('impressionCourse', {listeCourseFinale});


		}
		return (
			<Pressable style={styles.panier} onPress={impressionCourses}>
				<Icon name="shopping-basket" size={40} style={styles.panierIcone} color="#eb4034" />
				<Text style={styles.panierQtt}>{listeCourseFinale.length}</Text>
			</Pressable>
		);
	};
	return (
		<LinearGradient colors={['#3d3c3a', '#736e67']}>
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
								acheter={() => acheter(calculQuantitéParUnité(item), item, index)}
								supprimer={() => supprimer(calculQuantitéParUnité(item), item, index)}
								modifierQtt={(modif) => modifierQtt(calculQuantitéParUnité(item), item, index,modif)}
							/>
						);
					})}
			</ScrollView>
			<Panier  />
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	panier: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		backgroundColor: '#F2EFEA',
		// backgroundColor: 'white',
		// justifyContent: 'center',
		// alignItems: 'center',
		height: windowWidth / 6,
		width: windowWidth / 6,
		borderRadius: 500,
	},
	panierIcone: {
		position: 'relative',
		left: 0,
		top: '20%',
		textAlignVertical: 'center',
		textAlign: 'center',
		// left: windowWidth / 30,
		// backgroundColor: 'blue',
	},
	panierQtt: {
		position: 'relative',
		// position: 'absolute',
		textAlignVertical: 'center',
		textAlign: 'center',
		bottom: '25%',
		// left: windowWidth / 15,
		left: 0,
		fontSize: 30,
		fontWeight: 'bold',
	},

	item: {
		// height: '5%',
		// backgroundColor: 'red',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 1,
		marginTop: 6,
		paddingHorizontal: 5,
		// borderWidth: 2,
		// borderColor: 'black',
		// borderRadius: 40,
		// alignItems: 'center',
		// justifyContent:'center'
		backgroundColor: '#F2EFEA',
		elevation: 18,
		borderRadius: 10,
		// marginHorizontal: '3%',
		// marginVertical: '3%',
		justifyContent: 'center',
		// width: '40%',
		minHeight: 40,
	},
	text: {
		fontSize: 20,
	},
	modalVisualisation: {
		position: 'absolute',
		top: windowHeight / 4,
		left: windowWidth / 5.5,
		borderRadius: 20,
		textAlign: 'center',
		textAlignVertical: 'center',
		justifyContent: 'space-between',
		alignItems: 'center',
		display: 'flex',
		backgroundColor: 'white',
		minHeight: windowHeight / 4,

		width: windowWidth / 1.5,
		fontSize: 20,
		fontWeight: 'bold',
		paddingTop: 25,
	},
	modalVisualisationText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 25,
		marginVertical:20,
		fontWeight: 'bold',
		color: '#585a5e',
	},
	modalVisualisationTextInput: {
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 20,
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#F2EFEA',
		fontWeight: 'bold',
		color: '#585a5e',
	},
});
export default ListeCourse;
