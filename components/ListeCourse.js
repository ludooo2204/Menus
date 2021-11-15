import React, {useState} from 'react';
import {View, Text} from 'react-native';

const ListeCourse = ({route}) => {
	const [listeCourse, setListeCourse] = useState(route.params.listePlatChoisiavecData);
	console.log('liste course from navigation');
	console.log(listeCourse);
	let listeIngredients = [];
	for (const iterator of listeCourse) {
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
		listeFinale[iterator]=[]
		for (const j of arrayTemp2) {
			if (iterator == j[0]) {
				listeFinale[iterator].push(j[1]+" "+j[2])
			}
		}
	}
	console.log(listeFinale)
	console.log( " TODO attention la liste compte 2X les ingredients si 2X dans la semaine!!!! a changer")
	console.log( " TODO attention la liste compte 2X les ingredients si 2X dans la semaine!!!! a changer")
	console.log( " TODO attention la liste compte 2X les ingredients si 2X dans la semaine!!!! a changer")
	console.log( " TODO attention la liste compte 2X les ingredients si 2X dans la semaine!!!! a changer")
	console.log( " TODO attention la liste compte 2X les ingredients si 2X dans la semaine!!!! a changer")
	const Ingredient = ({item}) => {
		return (
			<View style={{backgroundColor: 'red', margin: 1, padding: 5, borderWidth: 2, borderColor: 'black', alignItems: 'center'}}>
				<Text>{item}</Text>
			</View>
		);
	};

	return (
		<View>
			{listeCourse &&
				listeCourse.map((item, index) => {
					return <Ingredient key={index} item={item.ingredients} />;
				})}
		</View>
	);
};

export default ListeCourse;
