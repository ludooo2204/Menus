import React, {useState} from 'react';
import {View, Text} from 'react-native';

const ListeCourse = ({route}) => {
	const [listeCourse, setListeCourse] = useState(route.params.listePlatChoisiavecData);
	console.log('liste course from navigation');
	console.log("liste course")
	console.log("liste course")
	console.log("liste course")
	console.log(listeCourse)

	const Ingredient = ({item}) => {
		return (
			<View style={{backgroundColor:"red",margin:1,padding:5,borderWidth:2,borderColor:"black",alignItems:"center"}}>
				<Text>{item}</Text>
			</View>
		);
	};

	return (
		<View>
			{listeCourse && listeCourse.map((item, index) => {
				return <Ingredient key={index} item={item.ingredients} />;
			})}
		</View>
	);
};

export default ListeCourse;
