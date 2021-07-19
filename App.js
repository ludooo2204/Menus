/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {StyleSheet, Text, View, Dimensions, StatusBar, Pressable, Modal, ActivityIndicator} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {proposeplat, proposeMenu} from './menu';
import NewChoice from './components/modalNewChoice';
import styles from './components/Styles';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BarreMidiSoir = () => {
	return (
		<View style={styles.midiSoirContainer}>
			<View style={{flex: 1, backgroundColor: 'blue'}}></View>
			<View
				style={{
					flex: 14,
					flexDirection: 'row',
					backgroundColor: 'brown',
					justifyContent: 'space-around',
				}}>
				<View>
					<Text>midi</Text>
				</View>
				<View>
					<Text>midi</Text>
				</View>
			</View>
		</View>
	);
};
const BarreJourSemaine = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'green',
				justifyContent: 'space-around',
				//   margin: 10,
			}}>
			<Text>lun</Text>
			<Text>mar</Text>
			<Text>mer</Text>
			<Text>jeu</Text>
			<Text>ven</Text>
			<Text>sam</Text>
			<Text>dim</Text>
		</View>
	);
};
const NavBar = () => {
	return <View style={{flex: 2}}></View>;
};
const Menu = () => {
	const [modalVisible, setModalVisible] = useState(false);
	// const [modalActivity, setModalActivity] = useState(false);
	const [listePlatChoisi, setListePlatChoisi] = useState(proposeMenu());
	const [onRefreshOpacity, setOnRefreshOpacity] = useState(1);
	const [numPlatDsSemaine, setNumPlatDsSemaine] = useState(null);
	const [numPlatDsSemaineChoisi, setNumPlatDsSemaineChoisi] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	useEffect(() => {
		console.log('numPlatDsSemaineChoisinewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArr');
		console.log(numPlatDsSemaineChoisi);
		console.log(numPlatDsSemaineChoisi.length);
	}, [numPlatDsSemaineChoisi]);
	console.log('listePlatChoisi');
	console.log(listePlatChoisi);

	const toggleModal = (_platARemplacer, _numPlatDsSemaine) => {
		console.log('TOGGLE');
		setModalVisible(!modalVisible);
		setNumPlatDsSemaine(_numPlatDsSemaine);
		let newArr = [...numPlatDsSemaineChoisi];
		newArr[_numPlatDsSemaine] = true;
		setNumPlatDsSemaineChoisi(newArr);
		// proposePlat(_numPlatDsSemaine)
	};
	const closeModal = () => {
		console.log('FERME LA');
		setModalVisible(!modalVisible);
		// setNumPlatDsSemaine(_numPlatDsSemaine)
		// console.log(_platARemplacer,_numPlatDsSemaine)
	};
	const choisirPropositionPlat = _platChoisi => {
		console.log('choix!! ', _platChoisi);
		// console.log(numPlatDsSemaine)
		let newArr = [...listePlatChoisi];
		newArr[numPlatDsSemaine] = _platChoisi;
		setListePlatChoisi(newArr);
		closeModal();
	};

	const refreshMenus = () => {
		console.log('resfresh!!!');
		if (!numPlatDsSemaineChoisi.some(one => one)) {
			const nouvelleListeDePlats = proposeMenu();
			setListePlatChoisi(nouvelleListeDePlats);
		} else {
			console.log('TODO nouvelle fonction PROPOSEMENU avec des jours de figé');
			const numPlatBloqué = [];
			console.log('numPlatDsSemaineChoisi');
			console.log(numPlatDsSemaineChoisi);
			for (let i = 0; i < numPlatDsSemaineChoisi.length; i++) {
				if (numPlatDsSemaineChoisi[i]) numPlatBloqué.push(i);
			}
			console.log('numPlatBloqué = ', numPlatBloqué);
			const nouvelleListeDePlats = proposeMenu();

			setListePlatChoisi(nouvelleListeDePlats);
		}
	};
	onPanGestureEvent = evt => {
		let {nativeEvent} = evt;
		console.log('nativeEvent');
		console.log(nativeEvent);
		console.log('nativeEvent.state');
		console.log(nativeEvent.state);
		// console.log("nativeEvent.velocityY")
		// console.log(nativeEvent.velocityY)
		// console.log("nativeEvent.absoluteY")
		// console.log(nativeEvent.absoluteY)
		// console.log("nativeEvent.translationY")
		// console.log(nativeEvent.translationY)
		// console.log("numberOfPointers")
		// console.log(nativeEvent.numberOfPointers)
		if (nativeEvent.velocityY > 0 && nativeEvent.state < 5) {
			setOnRefreshOpacity(0.9);
			// setModalActivity(true)
		}
		if (nativeEvent.state == 5) {
			setOnRefreshOpacity(1);
		}
		if (nativeEvent.translationY > 10 && nativeEvent.velocityY > 0 && nativeEvent.state == 5) {
			setOnRefreshOpacity(1);
			// console.log(object)
			refreshMenus();
		}
	};
	return (
		<PanGestureHandler style={{flex: 1}} onHandlerStateChange={onPanGestureEvent}>
			<View style={[styles.FlatGridContainer, {opacity: onRefreshOpacity}]}>
				<StatusBar backgroundColor="lightgrey" hidden></StatusBar>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
						setModalVisible(!modalVisible);
					}}>
					<NewChoice closeModal={closeModal} choisirPropositionPlat={choisirPropositionPlat} />
				</Modal>

				<View style={{flex: 20}}>
					<BarreMidiSoir />
					<View style={styles.grille}>
						{/* <ActivityIndicator /> */}
						<BarreJourSemaine />
						<View style={{flex: 14}}>
							<FlatGrid
								itemDimension={(windowWidth * 0.98) / 3}
								// fixed
								// itemContainerStyle={{backgroundColor:"white",height:60}}
								spacing={10}
								data={listePlatChoisi}
								style={{backgroundColor: 'black'}}
								renderItem={({item, index}) => {
									return (
										<Pressable style={styles.plat} onPress={() => toggleModal(item, index)}>
											<Text style={styles.textPlat}>{item}</Text>
										</Pressable>
									);
								}}
							/>
						</View>
					</View>
				</View>
				<NavBar />
			</View>
		</PanGestureHandler>
		// </GestureRecognizer>
	);
};

export default Menu;
