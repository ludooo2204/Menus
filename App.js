/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	StatusBar,
	Pressable,
	Modal,
} from 'react-native';

import listePlatsProposés from './menu';
import NewChoice from './components/modalNewChoice';
import styles from './components/Styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log('listePlatsProposés');
console.log(listePlatsProposés);

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
	return <View style={{flex: 1}}></View>;
};
const Menu = () => {
	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={styles.FlatGridContainer}>
			<StatusBar backgroundColor="lightgrey" hidden></StatusBar>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}>
				<NewChoice toggleModal={toggleModal} />
			</Modal>

			<View style={{flex: 10}}>
				<BarreMidiSoir />

				<View style={styles.grille}>
					<BarreJourSemaine />
					<View style={{flex: 14}}>
						<FlatGrid
							itemDimension={(windowWidth * 0.98) / 3}
							// fixed
							// itemContainerStyle={{backgroundColor:"white",height:60}}
							spacing={10}
							data={listePlatsProposés}
							style={{backgroundColor: 'black'}}
							renderItem={({item, index}) => {
								return (
									<Pressable
										style={styles.plat}
										onPress={() => setModalVisible(true)}>
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
	);
};

export default Menu;
