import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, useWindowDimensions, StatusBar, Pressable, Modal, ActivityIndicator, Button} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {proposeplat, proposeMenu, lireDatas} from '../menuAlgo';
import 'react-native-gesture-handler';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatGrid} from 'react-native-super-grid';
import styles from './Styles';
import {LogBox} from 'react-native';



var db = openDatabase({name: 'PlatDatabase.db', createFromLocation: 1});



const Menu = ({route, navigation}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [bddDatas, setBddDatas] = useState(null);
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


    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

	useEffect(() => {

		db.transaction(function (txn) {
			txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='table_plat'", [], function (tx, res) {
				console.log('item:', res.rows.length);
				if (res.rows.length == 0) {
					txn.executeSql('DROP TABLE IF EXISTS table_plat', []);
					txn.executeSql(
						'CREATE TABLE IF NOT EXISTS table_plat(plat_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(40), type VARCHAR(20), nbrPossible INTEGER)',
						[],
					);
				} else {
					tx.executeSql('SELECT * FROM table_plat', [], (tx, results) => {
						var temp = [];
						for (let i = 0; i < results.rows.length; ++i) {
							temp.push(results.rows.item(i));
						}

						setBddDatas(temp);
					});
				}
			});
		});
	}, []);

	useEffect(() => {
		console.log('bddDatas');
		console.log(bddDatas);
		lireDatas(bddDatas);
		if (bddDatas) setListePlatChoisi(proposeMenu());
	}, [bddDatas]);

	if (route.params) {
		const {platChoisiParams} = route.params;
		let newArr = [...listePlatChoisi];
		newArr[numPlatDsSemaine] = platChoisiParams;
		setListePlatChoisi(newArr);
		//pour reinitialiser les parametres
		route.params = undefined;
	}



//composant interne//////////////////////////////////////////////////////////////////////////////////////

const NavBar = () => {
    return (
        <View style={styles.navbar}>
            <StatusBar backgroundColor="lightgrey" hidden></StatusBar>
            <Icon name="bars" size={55} color="#754f9d" />
            <Icon name="calendar" size={55} color="#754f9d" />
            <Icon name="plus-circle" size={55} color="#754f9d" onPress={() => navigation.navigate('newPlat')} />
            <Icon name="shopping-cart" size={55} color="#754f9d" onPress={preparationCourse} />
        </View>
    );
};

const BarreMidiSoir = () => {
return (
    <View style={styles.BarreMidiSoir}>
        <View style={{flex: 3}}></View>
        <View
            style={{
                flex: 30,
                flexDirection: 'row',
                // backgroundColor: 'brown',
                justifyContent: 'center',
            }}>
            <View>
                <Text style={{fontWeight: '400', fontSize: 22, marginRight: '35%', color: '#754f9d'}}>Midi</Text>
            </View>
            <View>
                <Text style={{fontWeight: '400', fontSize: 22, color: '#754f9d'}}>Soir</Text>
            </View>
        </View>
    </View>
);
};
const BarreJourSemaine = () => {
return (
    <View style={styles.barreJourSemaine}>
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

////////////////////////////////////////////////////////////////////////////////////////////////


	const preparationCourse = () => {
		console.log(listePlatChoisi);
		const listeDesCourses = bddDatas.map(e => e.ingredients);
		navigation.navigate('listeCourse', {listeDesCourses});
	};
	const paramsPlat = a => {
		console.log('a', a);
		console.log('numPlatDsSemaine', numPlatDsSemaine);
	};

	const filtreMenus = (_platARemplacer, _numPlatDsSemaine) => {
		navigation.navigate('filtreMenu', {paramsPlat, bdd: bddDatas});
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
		console.log('refresh');
		if (!numPlatDsSemaineChoisi.some(one => one)) {
			//s'il n'ya pas de repas de bloqué
			setListePlatChoisi(proposeMenu());
		} else {
			const numPlatBloqué = [];
			for (let i = 0; i < numPlatDsSemaineChoisi.length; i++) {
				if (numPlatDsSemaineChoisi[i]) {
					console.log('numPlatDsSemaineoisi');
					console.log(numPlatDsSemaineChoisi);
					numPlatBloqué.push([i, listePlatChoisi[i]]);
				}
			}
			console.log('numPlatBloqué');
			console.log(numPlatBloqué);
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
			resolve();
			refreshMenus();
		});
	};
	const lockPlat = _numPlatDsSemaine => {
		console.log(_numPlatDsSemaine);
		let newArr = [...numPlatDsSemaineChoisi];
		if (newArr[_numPlatDsSemaine]) newArr[_numPlatDsSemaine] = false;
		else newArr[_numPlatDsSemaine] = true;
		console.log('newArrLongPress');
		console.log(newArr);
		setNumPlatDsSemaineChoisi(newArr);
	};
	console.log('render from app.js');

	return (
		<View style={styles.appContainer}>
			<BarreMidiSoir />
			<View style={{height: '87%'}}>
				<PTRView onRefresh={_refresh}>
					<View style={styles.grille}>
						<BarreJourSemaine />
						<View style={{flex: 30, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
							{listePlatChoisi &&
								listePlatChoisi.map((item, index) => {
									return (
										// <Pressable key={Math.random()} style={styles.plat} onPress={() => toggleModal(item, index)}>
										<Pressable
											key={Math.random()}
											style={numPlatDsSemaineChoisi[index] ? styles.platLocked : styles.plat}
											onPress={() => filtreMenus(item, index)}
											onLongPress={() => lockPlat(index)}>
											<Text style={styles.textPlat}>
												{item}
												{numPlatDsSemaineChoisi[index] && (
													<Text>
														<Icon name="lock" size={15} color="#754f9d" />
													</Text>
												)}
											</Text>
										</Pressable>
									);
								})}
						</View>
					</View>
				</PTRView>
			</View>
			<NavBar />
		</View>
	);
};

export default Menu;