/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {StyleSheet, Text, View, Dimensions, StatusBar, Pressable, Modal, ActivityIndicator, Button} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {proposeplat, proposeMenu} from './menu';
import NewChoice from './components/modalNewChoice';
import styles from './components/Styles';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/FontAwesome';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BarreMidiSoir = () => {
	return (
		<View style={styles.midiSoirContainer}>
			<View style={{flex: 3, backgroundColor: 'blue'}}></View>
			<View
				style={{
					flex: 30,
					flexDirection: 'row',
					backgroundColor: 'brown',
					justifyContent: 'center',
				}}>
				<View>
					<Text style={{fontWeight:"bold",fontSize:20,marginRight:"35%"}}>Midi</Text>
				</View>
				<View>
					<Text style={{fontWeight:"bold",fontSize:20}}>Soir</Text>
				</View>
			</View>
		</View>
	);
};
const BarreJourSemaine = () => {
	return (
		<View
			style={{
				flex: 3,
				backgroundColor: 'green',
				flexWrap:"wrap",
				justifyContent: 'space-around',
				//   margin: 10,
			}}>
			<Text style={styles.textJour}>lun</Text>
			<Text style={styles.textJour}>mar</Text>
			<Text style={styles.textJour}>mer</Text>
			<Text style={styles.textJour}>jeu</Text>
			<Text style={styles.textJour}>ven</Text>
			<Text style={styles.textJour}>sam</Text>
			<Text style={styles.textJour}>dim</Text>
		</View>
	);
};
const Menu = () => {
	const [modalVisible, setModalVisible] = useState(false);
	// const [modalActivity, setModalActivity] = useState(false);
	const [listePlatChoisi, setListePlatChoisi] = useState(null);
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
	useEffect(() => {
		console.log("proposeMenu")
		setListePlatChoisi(proposeMenu())
	}, []);
	
	const NavBar = () => {
		return <View style={{flex: 2}}>
		<Icon name="bars" size={30} color="#900" />
		</View>;
	};
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
		
		if (!numPlatDsSemaineChoisi.some(one => one)) { //s'il n'ya pas de repas de bloqué
			setListePlatChoisi(proposeMenu());
		} 
		else {
			console.log('TODO nouvelle fonction PROPOSEMENU avec des jours de figé');
			const numPlatBloqué = [];
			console.log('numPlatDsSemaineChoisi');
			console.log(numPlatDsSemaineChoisi);
			for (let i = 0; i < numPlatDsSemaineChoisi.length; i++) {
				if (numPlatDsSemaineChoisi[i]) {numPlatBloqué.push([i,listePlatChoisi[i]]);console.log("nom plat",listePlatChoisi[i] );};
			}
			console.log('numPlatBloqué = ', numPlatBloqué)
			

			setListePlatChoisi(proposeMenu(numPlatBloqué));
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
	const _refresh = () => {
		return new Promise(resolve => {
			// setTimeout(() => {refreshMenus();resolve()}, 100);
			resolve()
			refreshMenus();
			console.log("toto")
		});
	};
	return (
		// <PanGestureHandler style={{flex: 1}} onHandlerStateChange={onPanGestureEvent}>
		<PTRView onRefresh={_refresh}>
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
						<View style={{flex: 30, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',justifyContent:"center"}}>
							{listePlatChoisi && listePlatChoisi.map((item, index) => {
								return (
									<Pressable key={Math.random()} style={styles.plat} onPress={() => toggleModal(item, index)}>
										<Text   style={styles.textPlat}>{item}</Text>
									</Pressable>
								);
							})}

							{/* <FlatGrid
								itemDimension={(windowWidth * 0.98) / 3}
								// fixed
								// horizontal
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
							/> */}
						</View>
					</View>
				</View>
				<NavBar />
			</View>
		</PTRView>

		// </PanGestureHandler>
	);
};

export default Menu;
