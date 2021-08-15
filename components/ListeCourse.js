import React, {useState} from 'react';
import {View, Text} from 'react-native';

const ListeCourse = ({route}) => {
	const [listeCourse, setListeCourse] = useState(route.params.listeDesCourses);
	console.log('liste course from navigation');
	console.log(listeCourse);

	const Ingredient = ({item}) => {
		return (
			<View style={{backgroundColor:"red",margin:1,padding:5,borderWidth:2,borderColor:"black",alignItems:"center"}}>
				<Text>{item}</Text>
			</View>
		);
	};

	return (
		<View>
			<Text>coucou</Text>
			{listeCourse.map((item, index) => {
				return <Ingredient key={index} item={item} />;
			})}
		</View>
	);
};

export default ListeCourse;
