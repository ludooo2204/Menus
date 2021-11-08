import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, useWindowDimensions, StatusBar, Pressable, Modal, ActivityIndicator, Button} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';
import {proposeplat, proposeMenu, lireDatas} from '../menuAlgo';
import 'react-native-gesture-handler';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatGrid} from 'react-native-super-grid';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import axios from 'axios';

var db = openDatabase({name: 'PlatDatabase.db', createFromLocation: 1});

console.log(NetInfo);

const Menu = ({route, navigation}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [semaineDejaValidé, setSemaineDejaValidé] = useState(null);
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
	const [modal1Visible, setModal1Visible] = useState(false);
	const [modalConnectionVisible, setModalConnectionVisible] = useState(false);

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
						setBddDatas(temp);
					});
				}
			});
		});
	}, []);
	useEffect(() => {
		console.log('la semaine actuelle est la ', getDateFormatée().resultat);
		let arrayE;
		AsyncStorage.getItem(`histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`).then(e => {
			e ? ((arrayE = JSON.parse(e)), setSemaineDejaValidé(true), setListePlatChoisi(arrayE)) : (console.log('ya rien'), setSemaineDejaValidé(false));
		});
		// 					'CREATE TABLE IF NOT EXISTS histo_menus(semaine_id INTEGER PRIMARY KEY AUTOINCREMENT, numSemaine INTEGER ,annee INTEGER, plats TEXT)',
	}, []);

	useEffect(() => {
		lireDatas(bddDatas);
		if (bddDatas && !semaineDejaValidé) setListePlatChoisi(proposeMenu());
	}, [bddDatas]);

	useEffect(() => {
		let arrayE;
		// AsyncStorage.getItem(`histo_menus_semaine_${resultat+deltaSemaine}`).then(e => {
		AsyncStorage.getItem(`histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`).then(e => {
			e
				? ((arrayE = JSON.parse(e)), setSemaineDejaValidé(true), setListePlatChoisi(arrayE))
				: (console.log('ya rien'), setSemaineDejaValidé(false), setListePlatChoisi(proposeMenu()));
		});
		NetInfo.fetch().then(state => {
			console.log('Connection type', state.type);
			console.log('Is connected?', state.isConnected);
			if (state.isConnected) {
				axios
					.post(
						'http://lomano.go.yo.fr/api/menus/getMenuParSemaine.php',
						`histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`,
					)
					.then(rep => {
						const data = rep.data;
						console.log('data');
						// console.log(data)
						// sous forme d'array [{id:1,menu:["pizza",...],nom:"histo_menus_semaine_44-2021"}]
						// const keyUnique = [...new Set(data.map(e => e.nom))];
						let menuOnline;
						if (data.length > 1) {
							menuOnline = data.sort((a, b) => b.id - a.id)[0];
						} else menuOnline = data[0];
			












						///////IL Y A UN PROBLEME AVEC L'EGALITé EN DESSOUS. A CAUSE DU DELAI DU LISTEPLATCHOISI VOIR AVEC UN USEEFFECT ADAPTEE
						console.log(menuOnline);
						if (menuOnline && listePlatChoisi != null) {
							if (menuOnline.menu == JSON.stringify(listePlatChoisi)) {
								console.log('le menu local est le meme que celui en ligne');
								console.log('menuOnline');
								console.log(menuOnline.menu);
								console.log('listePlatChoisi');
								console.log(listePlatChoisi);
								console.log(menuOnline.menu == listePlatChoisi);
							} else {
								console.log("le menu local n'est pas le meme !!");
								console.log('menuOnline');
								console.log(JSON.parse(menuOnline.menu));
								console.log(typeof JSON.parse(menuOnline.menu));
								console.log('listePlatChoisi');
								console.log(listePlatChoisi);
								console.log(typeof listePlatChoisi);
								console.log(menuOnline.menu== JSON.stringify(listePlatChoisi));
							}
						} else {
							console.log("le menu online n'existe pas !");
						}
					});










					
			} else {
				// TODO
				// create modal
				console.log('PAS CONNECTEEEEEE!');
				setModalConnectionVisible(true);
			}
		});
	}, [deltaSemaine]);

	if (route.params) {
		const {platChoisiParams} = route.params;
		let newArr = [...listePlatChoisi];
		newArr[numPlatDsSemaine] = platChoisiParams;
		setListePlatChoisi(newArr);
		//pour reinitialiser les parametres
		route.params = undefined;
	}

	//composant interne//////////////////////////////////////////////////////////////////////////////////////

	const NavBar = ({validee}) => {
		return (
			<View style={styles.navbar}>
				<StatusBar backgroundColor="lightgrey" hidden></StatusBar>
				<Icon name="bars" size={55} color="#754f9d" />
				<Icon name="calendar" size={55} color="#754f9d" />
				<Icon name={validee ? 'check-square-o' : 'square-o'} size={55} color="#754f9d" onPress={enregistrerSemaine} />
				<Icon name="shopping-cart" size={55} color="#754f9d" onPress={preparationCourse} />
			</View>
		);
	};

	const BarreMidiSoir = () => {
		const aujourdhui = new Date();
		const month = aujourdhui.toLocaleString('FR-fr', {month: 'long'});
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
		const aujourdhuiDate = aujourdhui.getDate() + '/' + (aujourdhui.getMonth() + 1);
		const aujourdhuiNumeroJourDansSemaine = aujourdhui.getDay();

		let jour = ['mer', 'jeu', 'ven', 'sam', 'dim', 'lun', 'mar'];
		let date = [];

		function addDays(date, days) {
			var result = new Date(date);
			result.setDate(result.getDate() + days);
			return result;
		}

		for (let index = 0; index < jour.length; index++) {
			const dateTemp = addDays(
				aujourdhui,
				aujourdhuiNumeroJourDansSemaine < 3
					? index + 3 - aujourdhuiNumeroJourDansSemaine - 7 + deltaSemaine * 7
					: index + 3 - aujourdhuiNumeroJourDansSemaine + deltaSemaine * 7,
			);
			date[index] = dateTemp.getDate() + '/' + (dateTemp.getMonth() + 1);
		}

		return (
			<View style={styles.barreJourSemaine}>
				<View>
					{jour.map((e, index) => (
						<Text key={index} style={date[index] == aujourdhuiDate ? styles.textJourAujourdhui : styles.textJour}>
							{e}
							{'\n'}
							<Text style={{fontSize: 15}}>{date[index]}</Text>
						</Text>
					))}
				</View>
			</View>
		);
	};

	/////////////////fonctions///////////////////////////////////////////////////////////////////////////////

	const getDateFormatée = () => {
		let currentDate = new Date();
		let premierJanv = new Date(currentDate.getFullYear(), 0, 1);
		let annee = currentDate.getFullYear();
		let nbrDeJour = Math.floor((currentDate - premierJanv) / (24 * 60 * 60 * 1000));
		let resultat = Math.ceil((currentDate.getDay() + 1 + nbrDeJour) / 7) - 1;
		return {currentDate, premierJanv, annee, nbrDeJour, resultat};
	};
	const storeOnlineData = () => {
		console.log(listePlatChoisi);
		const nomKey = `histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`;
		const menuToSave = {key: nomKey, menu: JSON.stringify(listePlatChoisi)};
		console.log('menuToSave');
		console.log(menuToSave);
		try {
			fetch('http://lomano.go.yo.fr/api/menus/postMenuParSemaine.php', {
				method: 'post',
				headers: {
					Accept: 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(menuToSave),
			})
				.then(res => {
					res.json();

					// .then((res) => {
					// 	console.log(res);
				})
				.catch(err => console.log(err));
		} catch (e) {
			console.log('err', e);
		}
	};
	const storeData = async value => {
		console.log(`histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`);
		try {
			await AsyncStorage.setItem(
				`histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`,
				JSON.stringify(value),
			);
		} catch (e) {
			console.log('err', e);
		}
	};
	const supprimerData = () => {
		AsyncStorage.removeItem(`histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`).then(e => {
			console.log('remove', e);
		});
	};

	const preparationCourse = () => {
		// console.log(listePlatChoisi);
		const listeDesCourses = bddDatas.map(e => e.ingredients);
		navigation.navigate('listeCourse', {listeDesCourses});
	};

	const paramsPlat = a => {};

	const filtreMenus = (_platARemplacer, _numPlatDsSemaine) => {
		navigation.navigate('filtreMenu', {paramsPlat, bdd: bddDatas});
		setNumPlatDsSemaine(_numPlatDsSemaine);
		let newArr = [...numPlatDsSemaineChoisi];
		newArr[_numPlatDsSemaine] = true;
		setNumPlatDsSemaineChoisi(newArr);
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
					numPlatBloqué.push([i, listePlatChoisi[i]]);
				}
			}
			setListePlatChoisi(proposeMenu(numPlatBloqué));
		}
	};

	const _refresh = () => {
		return new Promise(resolve => {
			resolve();
			refreshMenus();
		});
	};
	const lockPlat = _numPlatDsSemaine => {
		console.log(_numPlatDsSemaine);
		let newArr = [...numPlatDsSemaineChoisi];
		if (newArr[_numPlatDsSemaine]) newArr[_numPlatDsSemaine] = false;
		else newArr[_numPlatDsSemaine] = true;
		setNumPlatDsSemaineChoisi(newArr);
	};

	const enregistrerSemaine = () => {
		if (!semaineDejaValidé) {
			setSemaineDejaValidé(true);
			storeData(listePlatChoisi);
			storeOnlineData(listePlatChoisi);
		} else setModal1Visible(!modal1Visible);
	};
	const config = {
		velocityThreshold: 0.3,
		directionalOffsetThreshold: 80,
	};
	const semainePlus = state => {
		console.log(state);
		setDeltaSemaine(deltaSemaine => deltaSemaine + 1);
	};
	const semaineMoins = state => {
		console.log(state);
		setDeltaSemaine(deltaSemaine => deltaSemaine - 1);
	};
	const modifierSemaine = async reponse => {
		setModal1Visible(!modal1Visible);
		console.log('reponse');
		console.log(reponse);
		if (reponse === 'oui') {
			setSemaineDejaValidé(false);
			supprimerData();
			let semaineVerrouillée = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
			setNumPlatDsSemaineChoisi(semaineVerrouillée);
		} else {
			console.log('non');
		}
	};
	return (
		<GestureRecognizer
			style={styles.appContainer}
			onSwipeLeft={state => semainePlus(state)}
			onSwipeRight={state => semaineMoins(state)}
			config={config}>
			{/* <BarreJourSemaine /> */}
			<BarreMidiSoir />
			<View style={{height: '88%'}}>
				<PTRView onRefresh={_refresh}>
					<View style={styles.grille}>
						<BarreJourSemaine />
						<Modal animationType="slide" transparent={true} visible={modal1Visible}>
							<View style={styles.modalTest}>
								<Text style={styles.modalTestText}>Voulez-vous la modifier les menus de cette semaine et supprimer sa validation?</Text>
								<Pressable
									style={{
										backgroundColor: '#d1dce8',
										alignItems: 'center',
										justifyContent: 'center',
										marginHorizontal: 10,
										marginVertical: 5,
										borderRadius: 10,
										height: 30,
									}}
									onPress={() => modifierSemaine('oui')}>
									<Text style={styles.textStyle}>oui</Text>
								</Pressable>
								<Pressable
									style={{
										backgroundColor: '#d1dce8',
										alignItems: 'center',
										justifyContent: 'center',
										marginHorizontal: 10,
										marginVertical: 5,

										borderRadius: 10,
										height: 30,
									}}
									onPress={() => modifierSemaine('non')}>
									<Text style={styles.textStyle}>non</Text>
								</Pressable>
							</View>
						</Modal>
						<Modal animationType="slide" transparent={true} visible={modalConnectionVisible}>
							<View style={styles.modalTest}>
								<Text style={styles.modalTestText}>
									Attention : vous ne semblez pas connecté à internet. vos modifications ne seront pas prise en compte en ligne
								</Text>

								<Pressable
									style={{
										backgroundColor: '#d1dce8',
										alignItems: 'center',
										justifyContent: 'center',
										marginHorizontal: 10,
										marginVertical: 5,
										borderRadius: 10,
										height: 30,
									}}
									onPress={() => setModalConnectionVisible(false)}>
									<Text style={styles.textStyle}>ok</Text>
								</Pressable>
							</View>
						</Modal>
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
			<NavBar validee={semaineDejaValidé} />
		</GestureRecognizer>
	);
};

export default Menu;
