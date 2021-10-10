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
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';







var db = openDatabase({name: 'PlatDatabase.db', createFromLocation: 1});

const Menu = ({route, navigation}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [bddDatas, setBddDatas] = useState(null);
	const [listePlatChoisi, setListePlatChoisi] = useState(null);
	const [deltaSemaine, setDeltaSemaine] = useState(0);
	const [jourSemaine, setJourSemaine] = useState([]);
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
				// console.log('item:', res.rows.length);
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
						console.log(temp);
						setBddDatas(temp);
					});
				}
			});
		});
	}, []);

	useEffect(() => {
		// console.log('bddDatas');
		// console.log(bddDatas);
		lireDatas(bddDatas);
		if (bddDatas) setListePlatChoisi(proposeMenu());
	}, [bddDatas]);


	useEffect(() => {
		console.log("deltaSemaine",deltaSemaine)


	}, [deltaSemaine]);

	useEffect(() => {
	// console.log("jourSemaine")
	// console.log(jourSemaine)
	}, [jourSemaine])

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
		const aujourdhui = new Date();
		let dateAModifier = new Date();
		const aujourdhuiDate = aujourdhui.getDate();
		const aujourdhuiNumeroJourDansSemaine = aujourdhui.getDay(); 
		console.log('aujourdhuiNumeroJourDansSemaine' )
		console.log(aujourdhuiNumeroJourDansSemaine )
		console.log('aujourdhuiDate' )
		console.log(aujourdhuiDate )
		let jour = ['mer', 'jeu', 'ven', 'sam', 'dim', 'lun', 'mar'];
		let date = [];
console.log('aujourdhui')
console.log(aujourdhui)
		// for (let index = 0; index < jour.length; index++) {
		// 	// pas sur que ca marche...
		// 	dateAModifier.setDate(index + aujourdhuiDate - aujourdhuiNumeroJourDansSemaine + 3+deltaSemaine*7);
		// 	// dateAModifier.setDate(index-200);
		// 	// index + 3 == aujourdhuiNumeroJourDansSemaine ? (date[index] = aujourdhuiDate) : (date[index] = dateAModifier.getDate());
		// 	date[index] = dateAModifier.getDate();
		// }
		function addDays(date, days) {
			var result = new Date(date);
			result.setDate(result.getDate() + days);
			return result;
		  }
			



console.log("TEST")
		for (let index = 0; index < jour.length; index++) {
			// dateAModifier.setDate(index + aujourdhuiDate - aujourdhuiNumeroJourDansSemaine + 3+deltaSemaine*7);
			console.log('index + aujourdhuiDate - aujourdhuiNumeroJourDansSemaine + 3+deltaSemaine*7')
			console.log(index + aujourdhuiDate - aujourdhuiNumeroJourDansSemaine + 3+deltaSemaine*7)
			console.log('index  - aujourdhuiNumeroJourDansSemaine + 3+deltaSemaine*7')
			console.log(index  - aujourdhuiNumeroJourDansSemaine + 6+deltaSemaine*7)
	
			// /aujourdhui == addDays(aujourdhui,0)
			const dateTemp=addDays(aujourdhui,index-4+deltaSemaine*7)
			date[index] = dateTemp.getDate();
		}
		console.log('date')
		console.log(date)
		return (
			<View style={styles.barreJourSemaine}>
				{jour.map((e, index) => (
					<Text style={date[index] == aujourdhuiDate ? styles.textJourAujourdhui : styles.textJour}>
						{e}
						{date[index]}
						{/* {index + 3 == aujourdhuiNumeroJourDansSemaine ? aujourdhuiDate : date[index]} */}
					</Text>
				))}
			</View>
		);
	};

	////////////////////////////////////////////////////////////////////////////////////////////////

	const preparationCourse = () => {
		// console.log(listePlatChoisi);
		const listeDesCourses = bddDatas.map(e => e.ingredients);
		navigation.navigate('listeCourse', {listeDesCourses});
	};

	const paramsPlat = a => {
		// console.log('a', a);
		// console.log('numPlatDsSemaine', numPlatDsSemaine);
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
					// console.log('numPlatDsSemaineoisi');
					// console.log(numPlatDsSemaineChoisi);
					numPlatBloqué.push([i, listePlatChoisi[i]]);
				}
			}
			// console.log('numPlatBloqué');
			// console.log(numPlatBloqué);
			setListePlatChoisi(proposeMenu(numPlatBloqué));
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
		// console.log(_numPlatDsSemaine);
		let newArr = [...numPlatDsSemaineChoisi];
		if (newArr[_numPlatDsSemaine]) newArr[_numPlatDsSemaine] = false;
		else newArr[_numPlatDsSemaine] = true;
		// console.log('newArrLongPress');
		// console.log(newArr);
		setNumPlatDsSemaineChoisi(newArr);
	};
	console.log('render from app.js');

	const config = {
		velocityThreshold: 0.3,
		directionalOffsetThreshold: 80,
	};
	const semainePlus=(state)=>{
		console.log(state)
setDeltaSemaine(deltaSemaine=>deltaSemaine+1)

}
const semaineMoins=(state)=>{
	console.log(state)
	setDeltaSemaine(deltaSemaine=>deltaSemaine-1)
	}

	return (
		<GestureRecognizer
			style={styles.appContainer}
			onSwipeLeft={state => semainePlus(state)}
			onSwipeRight={state => semaineMoins(state)}
			config={config}>
			<BarreMidiSoir />
			<View style={{height: '90%'}}>
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
		</GestureRecognizer>
	);
};

export default Menu;
