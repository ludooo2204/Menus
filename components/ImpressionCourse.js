import React, {useState, useEffect} from 'react';
import {
	Easing,
	Animated,
	Text,
	View,
	Share,
	useWindowDimensions,
	StatusBar,
	Pressable,
	Modal,
	ActivityIndicator,
	Linking,
	Button,
	Alert,
	StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImpressionCourse = ({route}) => {
	const {listeCourseFinale} = route.params;
	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;
	let stringToShare = '';
	useEffect(() => {
		for (const item of listeCourseFinale) {
            console.log(item)
			stringToShare += '\n';
			stringToShare += item;
		}
		console.log('stringToShare');
		console.log(stringToShare);
	}, []);

	const onShare = () => {
		const result = Share.share({
			message: stringToShare,
            title:"Liste des courses",
    
		}).then(() => console.log('partagéé'));
	};
	const Panier = () => {
		const impressionCourses = () => {
			console.log(listeCourseFinale);
			onShare();
			// navigation.navigate('impressionCourse', {listeCourseFinale});
		};
		return (
			<Pressable style={styles.panier} onPress={impressionCourses}>
				<Icon name="print" size={40} style={styles.panierIcone} color="#585a5e" />
			</Pressable>
		);
	};

	const styles = StyleSheet.create({
		panier: {
			position: 'absolute',
			bottom: 30,
			right: 30,
			backgroundColor: '#D9CFBF',
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
		titre: {
			fontSize: 30,
			textAlign: 'center',
			margin: 10,
			
		},
	});
	return (
		<View style={{flex: 1}}>
			<Text style={styles.titre}> LISTE DES COURSES :</Text>
			{listeCourseFinale.map((e, index) => (
				<Text key={index}>{e}</Text>
			))}
			<Panier />
		</View>
	);
};
export default ImpressionCourse;
