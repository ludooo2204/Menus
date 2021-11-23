// voir pour les syncho

import React, {useState, useEffect} from 'react';
import {
	Easing,
	Animated,
	Text,
	View,
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
// import {openDatabase} from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';
import {proposeplat, proposeMenu, lireDatas} from '../menuAlgo';
import 'react-native-gesture-handler';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatGrid} from 'react-native-super-grid';
import {themes} from './themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import axios from 'axios';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';


console.log(NetInfo);
<<<<<<< HEAD
console.log(themes);
=======
const themes = [
	{
		theme: 0,
		primaryColor: '#754f9d', //main
		secondaryColor: '#d1dce8', //background
		thirdColor: '#bec7d1', //lock
		quadColor: '#754f9d26', //modal & back
		cinqColor: 'black', // 1/2 ..
	},
	{
		theme: 1,
		primaryColor: '#1D194D', //main
		secondaryColor: '#F2EFEA', //background DCED31
		thirdColor: '#D9CFBF', //lock
		quadColor: '#FAE6C7', //modal & back
		cinqColor: '#000A14', // 1/2 ..
	},
	{
		theme: 2,
		primaryColor: '#0f0052', //main
		secondaryColor: '#f5f7fa', //background DCED31
		thirdColor: '#D9CFBF', //lock
		quadColor: '#cadffc', //modal & back
		cinqColor: '#000A14', // 1/2 ..
	},
	{
		theme: 3,
		primaryColor: '#0253cc', //main
		secondaryColor: '#F2EFEA', //background DCED31
		thirdColor: '#D9CFBF', //lock
		quadColor: '#FAE6C7', //modal & back
		cinqColor: '#000A14', // 1/2 ..
	},
	{
		theme: 4,
		primaryColor: '#585a5e', //main
		secondaryColor: '#F2EFEA', //background DCED31
		thirdColor: '#D9CFBF', //lock
		quadColor: '#ebeced', //modal & back
		cinqColor: '#000A14', // 1/2 ..
	},
	{
		theme: 5,
		primaryColor: '#D17B0F', //main
		secondaryColor: '#c0fae5', //background DCED31
		thirdColor: '#D9CFBF', //lock
		quadColor: '#fbfce1', //modal & back
		cinqColor: '#000A14', // 1/2 ..
	},
	{
		theme: 6,
		primaryColor: '#f29218', //main
		secondaryColor: '#defff3', //background DCED31
		// secondaryColor:'#d6fff0' ,//background DCED31
		thirdColor: '#D9CFBF', //lock
		quadColor: '#fbfce1', //modal & back
		cinqColor: '#000A14', // 1/2 ..
	},
	{
		theme: 7,
		primaryColor: '#d6fff0', //main
		secondaryColor: '#99866e', //background DCED31
		thirdColor: '#D9CFBF', //lock
		quadColor: '#736e67', //modal & back
		cinqColor: '#000A14', // 1/2 ..
	},
	{
		theme: 8,
		primaryColor: '#faf7f2', //main
		secondaryColor: '#8d8c8f', //background DCED31
		thirdColor: '#D9CFBF', //lock
		quadColor: '#002124', //modal & back
		cinqColor: '#000A14', // 1/2 ..
	},
];
>>>>>>> c881ec5bd0d16c22bc9ab184489e8c2eeac7fef6
const Menu = ({route, navigation}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [semaineDejaValidé, setSemaineDejaValidé] = useState(null);
	const [bddDatas, setBddDatas] = useState(null);
	const [listePlatChoisi, setListePlatChoisi] = useState(null);
	const [listePlatChoisiOnline, setListePlatChoisiOnline] = useState(null);
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
	const [utilisateur, setUtilisateur] = useState(null);
	const [modal1Visible, setModal1Visible] = useState(false);
	const [modalSynchroMenuVisible, setModalSynchroMenuVisible] = useState(false);
	const [modalConnectionVisible, setModalConnectionVisible] = useState(false);
	const [modalPlatVisible, setModalPlatVisible] = useState(false);
	const [modalUserVisible, setModalUserVisible] = useState(false);
	const [visualisationPlat, setVisualisationPlat] = useState(null);
	const [textEnregistrementPlat, setTextEnregistrementPlat] = useState('');
	const [listeDoublon, setListeDoublon] = useState([]);
	const [theme, setTheme] = useState(4);
	const [value, setValuee] = useState(0); // pour forcer un refresh TEST!!!

	const scaleMenu = React.useRef(new Animated.Value(0)).current;
	const tailleIcone = React.useRef(new Animated.Value(0)).current;
	const animSwipe = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		// console.log(heightAnim);
		// On anime notre valeur jusqu'à la hauteur de la fenetre
		Animated.parallel([
			Animated.timing(scaleMenu, {
				toValue: 1,
				duration: 700,
				useNativeDriver: true,
				delay: 10,
				// easing: Easing.bounce,
				easing: Easing.elastic(1),
			}),

			Animated.timing(tailleIcone, {
				toValue: 1,
				duration: 700,
				useNativeDriver: true,
				delay: 10,
				// easing: Easing.bounce,
				easing: Easing.elastic(1),
				// easing: Easing.ease(),
			}),
		]).start();
	}, [listePlatChoisi]);
	
	const totolasticot = () => {
		Animated.sequence([
			Animated.timing(animSwipe, {
				toValue: 1,
				duration: 10,
				useNativeDriver: true,
				// delay: 10,
				// easing: Easing.bounce,
				// easing: Easing.elastic(1),
				easing: Easing.ease,
			}),
			Animated.timing(animSwipe, {
				toValue: 0,
				duration: 100,
				useNativeDriver: true,
				// delay: 10,
				// easing: Easing.bounce,
				easing: Easing.ease,
				// easing: Easing.elastic(1),
			}),
		]).start();
	};

	// }, [tailleIcone, scaleMenu]);

	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		console.log('appel bdd');
		// fetch("http://localhost/API_menu/getPlats.php")
		NetInfo.fetch().then(state => {
			if (state.isConnected) {
				fetch('http://lomano.go.yo.fr/api/menus/getPlats.php')
					.then(reponse => reponse.json())
					.then(data => {
						// console.log('data from getPlats.php');
						// console.log(data);

						storePlats(data);
						setBddDatas(data);
					})
					.catch(fail => {
						console.log('fail', fail);
						Alert.alert('probleme avec le serveur. les nouveaux plats en ligne ne seront pas importés');
						importerPlatLocal();
					});
			} else {
				setModalConnectionVisible(true);

				importerPlatLocal();
			}
		});
	}, []);

	useEffect(() => {
		console.log('la semaine actuelle est la ', getDateFormatée().resultat);
		let arrayE;
		AsyncStorage.getItem(`histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`).then(e => {
			console.log('e', e);
			e
				? ((arrayE = JSON.parse(e)), setSemaineDejaValidé(true), setListePlatChoisi(arrayE))
				: (console.log('ya rien dans le key ' + `histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`),
				  setSemaineDejaValidé(false));
		});
	}, []);

	useEffect(() => {
		// console.log('coucou');
		// console.log('bddDatas')
		// console.log(bddDatas)
		lireDatas(bddDatas);
		if (bddDatas && !semaineDejaValidé) setListePlatChoisi(proposeMenu());
	}, [bddDatas]);
	useEffect(() => {
		if (listePlatChoisi && listePlatChoisi.length > 0) {
			let doublon = [];
			let triplon = [];
			for (let i = 0; i < listePlatChoisi.length; i++) {
				const element = listePlatChoisi[i];
				triplon.push({plat: element, index: i});
			}

			// console.log(triplon);
			const listeUnique = [...new Set(triplon.map(plat => plat.plat))];
			// console.log(listeUnique);
			let bilanDoublon = [];
			for (const iterator of listeUnique) {
				let bilanDoublonTemp = [];
				for (const iterator2 of triplon) {
					if (iterator2.plat == iterator) bilanDoublonTemp.push(iterator2.index);
				}
				bilanDoublonTemp.sort(function (a, b) {
					return a - b;
				});
				bilanDoublon.push({plat: iterator, indexs: bilanDoublonTemp});
			}
			// console.log('bilanDoublon');
			// console.log(bilanDoublon);
			setListeDoublon(bilanDoublon);
		}
	}, [listePlatChoisi]);

	useEffect(() => {
		console.log('OOOOOOOOOOOOOOOOOOOOOOOOO');
		//Check si ya un enregistrement en local de la semaine
		let arrayE;
		AsyncStorage.getItem(`histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`).then(e => {
			console.log('check', e);
			e
				? ((arrayE = JSON.parse(e)), setSemaineDejaValidé(true), setListePlatChoisi(arrayE))
				: (console.log('ya rien'), setSemaineDejaValidé(false), setListePlatChoisi(proposeMenu()));
		});

		//Check si ya un enregistrement online de la semaine (si connecte)
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
						console.log('rep');
						console.log('rep');
						console.log('rep');
						console.log(rep.data);
						const data = rep.data;
						let menuOnline;
						if (data.length > 1) {
							menuOnline = data.sort((a, b) => b.id - a.id)[0];
						} else menuOnline = data[0];

						setListePlatChoisiOnline(menuOnline);
					});
			} else {
				// TODO
				// create modal
				console.log('PAS CONNECTEEEEEE!');
			}
		});
	}, [deltaSemaine, value]);

	useEffect(() => {
		console.log('listePlatChoisiOnline');
		console.log('listePlatChoisiOnline');
		console.log('listePlatChoisiOnline');
		console.log('listePlatChoisiOnline');
		console.log(listePlatChoisiOnline);
		console.log(listePlatChoisi);
		if (listePlatChoisiOnline && listePlatChoisi != null) {
			console.log('#################################');
			console.log(typeof listePlatChoisiOnline.date);
			console.log(new Date(listePlatChoisiOnline.date).toLocaleString('FR-fr'));

			setTextEnregistrementPlat(new Date(listePlatChoisiOnline.date).toLocaleString('FR-fr') + ' par ' + listePlatChoisiOnline.user);
			console.log('listePlatChoisiOnline.menu');
			console.log(listePlatChoisiOnline.menu);
			console.log('JSON.stringify(listePlatChoisi)');
			console.log(JSON.stringify(listePlatChoisi));

			if (listePlatChoisiOnline.menu == JSON.stringify(listePlatChoisi)) {
				console.log('le menu local est le meme que celui en ligne');
			} else {
				console.log("le menu local n'est pas le meme !!");
				setModalSynchroMenuVisible(true);
			}
		} else {
			console.log("le menu online n'existe pas !");
		}
	}, [listePlatChoisiOnline]);

	if (route.params) {
		console.log('route.params');
		console.log(route.params);
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
			<Animated.View style={[styles.navbar, {transform: [{scale: tailleIcone}]}]}>
				<StatusBar backgroundColor="lightgrey" hidden></StatusBar>
				<Icon
					name="bars"
					size={35}
					color={themes[theme].primaryColor}
					onPress={() => setTheme(theme => (theme < themes.length - 1 ? theme + 1 : 0))}
				/>
				<Text style={{fontSize: 16}}>{theme}</Text>
				<Icon name="user" size={35} color={themes[theme].primaryColor} onPress={() => setModalUserVisible(true)} />
				<Icon name={validee ? 'check-square-o' : 'square-o'} size={35} color={themes[theme].primaryColor} onPress={enregistrerSemaine} />
				<Icon name="shopping-cart" size={35} color={themes[theme].primaryColor} onPress={preparationCourse} />
			</Animated.View>
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
						<Text style={{fontWeight: '400', fontSize: 22, marginRight: '35%', color: themes[theme].primaryColor}}>Midi</Text>
					</View>
					<View>
						<Text style={{fontWeight: '400', fontSize: 22, color: themes[theme].primaryColor}}>Soir</Text>
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

	const getUser = () => {
		AsyncStorage.getItem('user')
			.then(e => {
				console.log('user = ', e);
				if (e == null) setModalUserVisible(true);
				else setUtilisateur(e);
			})
			.catch(() => {
				Alert.alert('erreur avec les users');
			});
	};
	const setUser = user => {
		console.log('user');
		console.log(user);
		AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
			console.log('Enregistrement user fait !');
		});
	};

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
		console.log('utilisateur');
		console.log(utilisateur);
		const nomKey = `histo_menus_semaine_${getDateFormatée().resultat + deltaSemaine}-${getDateFormatée().annee}`;
		const menuToSave = {key: nomKey, menu: JSON.stringify(listePlatChoisi), user: utilisateur, date: new Date()};
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
	const storePlats = async value => {
		try {
			await AsyncStorage.setItem('plats', JSON.stringify(value));
		} catch (e) {
			console.log('err', e);
		}
	};
	const importerPlatLocal = () => {
		AsyncStorage.getItem('plats').then(e => {
			setBddDatas(JSON.parse(e));
		});
	};
	const storeData = async value => {
		console.log('value');
		console.log(value);
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
		let listePlatChoisiavecData = [];
		for (const iterator of listePlatChoisi) {
			// console.log(iterator)
			const data = bddDatas.filter(e => e.nom_plat == iterator);
			listePlatChoisiavecData.push(data[0]);
		}
		// const listeDesCourses = bddDatas.map(e => e.ingredients);
		// console.log(listeDesCourses)
		// navigation.navigate('listeCourse', {listeDesCourses});
		console.log('listePlatChoisiavecData');
		console.log('listePlatChoisiavecData');
		console.log('listePlatChoisiavecData');
		console.log('listePlatChoisiavecData');
		console.log(listePlatChoisiavecData);
		navigation.navigate('listeCourse', {listePlatChoisiavecData});
	};

	// const paramsPlat = a => {};

	const filtreMenus = (_platARemplacer, _numPlatDsSemaine) => {
		console.log('BDD');
		console.log('BDD');
		console.log('BDD');
		console.log('BDDdatas');
		console.log(bddDatas);
		console.log(typeof bddDatas);
		navigation.navigate('filtreMenu', { bdd: bddDatas,theme});
		// navigation.navigate('filtreMenu', {paramsPlat, bdd: bddDatas});
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
		if (!semaineDejaValidé) {
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
		totolasticot();
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

	const exporterMenu = () => {
		console.log('listePlatChoisiOnline.menu');
		console.log(listePlatChoisiOnline.menu);
		console.log('listePlatChoisi');
		console.log(listePlatChoisi);
		storeOnlineData(listePlatChoisi);
		setModalSynchroMenuVisible(false);
	};
	const importerMenu = () => {
		let array;
		if (typeof listePlatChoisiOnline.menu == 'string') array = JSON.parse(listePlatChoisiOnline.menu);
		storeData(array);
		setModalSynchroMenuVisible(false);
		setValuee(value => value + 1);
	};
	const visualiserPlat = _plat => {
		console.log(_plat);
		setVisualisationPlat(bddDatas.filter(e => e.nom_plat == _plat)[0]);
		setModalPlatVisible(true);
	};

	const opacityAnim = React.useRef(new Animated.Value(0)).current;
	React.useEffect(() => {
		// On anime notre valeur jusqu'à la hauteur de la fenetre
		Animated.timing(opacityAnim, {
			toValue: 1,
			duration: 900, // Durant 10 secondes
			useNativeDriver: true, // Cela sera abordé plus tard
			easing: Easing.bounce,
		}).start();
	}, [opacityAnim]);

	const styles = StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		button: {
			borderRadius: 20,
			padding: 10,
			margin: 2,
			paddingHorizontal: 10,
			marginBottom: 5,
			elevation: 2,
		},
		buttonOpen: {
			backgroundColor: '#F194FF',
		},
		buttonClose: {
			backgroundColor: themes[theme].secondaryColor,
		},
		textStyle: {
			// color: 'white',
			// backgroundColor: themes[theme].secondaryColor,
			color: themes[theme].primaryColor,

			fontSize: 20,
			fontWeight: 'bold',
			borderRadius: 20,
		},
		modalText: {
			// textAlign: 'center',
			// textAlignVertical: 'center',
			height: (windowHeight * 0.98) / 9,
			// fontSize: 20,
			// fontWeight: 'bold',

			textAlign: 'center',
			textAlignVertical: 'center',
			fontSize: 20,
			fontWeight: 'bold',
			color: themes[theme].primaryColor,
		},
		modalTest: {
			position: 'absolute',
			top: windowHeight / 2.5,
			left: windowWidth / 5.5,
			borderRadius: 20,
			textAlign: 'center',
			textAlignVertical: 'center',
			justifyContent: 'center',
			backgroundColor: 'white',
			// height: windowHeight  / 5,
			width: windowWidth / 1.5,
			fontSize: 20,
			fontWeight: 'bold',
			padding: 20,
		},
		modalTestText: {
			textAlign: 'center',
			textAlignVertical: 'center',
			fontSize: 20,
			fontWeight: 'bold',
			color: themes[theme].primaryColor,
		},
		modalVisualisation: {
			position: 'absolute',
			top: windowHeight / 4,
			left: windowWidth / 5.5,
			borderRadius: 20,
			textAlign: 'center',
			textAlignVertical: 'center',
			justifyContent: 'center',
			backgroundColor: 'white',
			height: windowHeight / 2,
			width: windowWidth / 1.5,
			fontSize: 20,
			fontWeight: 'bold',
		},
		modalVisualisationText: {
			textAlign: 'center',
			textAlignVertical: 'center',
			fontSize: 20,
			fontWeight: 'bold',
			color: themes[theme].primaryColor,
		},
		modalVisualisationTextLien: {
			textAlign: 'center',
			textAlignVertical: 'center',
			fontSize: 20,
			fontWeight: 'bold',
			color: 'blue',
			textDecorationLine: 'underline',
		},
		modalFiltreText: {
			// textAlign: 'center',
			// textAlignVertical: 'center',
			// height: (windowWidth ) / 8,
			fontSize: 25,
			color: themes[theme].primaryColor,
			// fontWeight:900,
			// margin: 2,
			paddingHorizontal: 5,

			fontWeight: 'bold',
		},
		modalPlat: {
			backgroundColor: themes[theme].secondaryColor,
			borderRadius: 20,
			width: windowWidth / 2.5,
			marginHorizontal: 7,
			marginVertical: 5,
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5,
		},
		modalFiltre: {
			flex: 1,
			backgroundColor: themes[theme].quadColor,
			justifyContent: 'center',
			// justifyContent:"center",
			alignItems: 'center',
			minWidth: windowWidth / 3,
			borderRadius: 20,
		},
		modalFiltreHighlight: {
			backgroundColor: themes[theme].thirdColor,
			borderRadius: 20,
			justifyContent: 'center',
			// justifyContent:"center",
			alignItems: 'center',
			borderWidth: 5,
			borderColor: 'black',
		},

		modalView: {
			// margin: 20,
			backgroundColor: themes[theme].quadColor,
			flex: 1,
			borderRadius: 20,
			padding: 15,
			alignItems: 'center',
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5,
		},
		appContainer: {
			// flex: 1,
			height: '100%',
			// backgroundColor: themes[theme].quadColor,
			// padding: "0.5%"
		},
		grille: {
			height: windowHeight * 0.93,

			// alignItems: 'center',
			// alignItems: 'flex-start',
			flexDirection: 'row',
			// backgroundColor: 'blue',
		},
		sectionTitle: {
			fontSize: 24,
			fontWeight: '600',
		},

		plat: {
			backgroundColor: themes[theme].secondaryColor,
			elevation: 18,
			borderRadius: 20,
			marginHorizontal: '3%',
			marginVertical: '3%',
			justifyContent: 'center',
			width: '40%',
			// borderWidth:1,
			height: windowHeight / 10,
			// opacity: Number(PlatBulleAnim)
		},
		platLocked: {
			justifyContent: 'center',
			height: windowHeight / 10,
			backgroundColor: themes[theme].thirdColor,
			elevation: 18,
			borderRadius: 20,
			// borderWidth: 2,
			marginHorizontal: '3%',
			marginVertical: '3%',
			width: '40%',
		},
		textPlat: {
			textAlign: 'center',
			textAlignVertical: 'center',
			// height: ((windowHeight) / 10),
			fontSize: 19,
			// backgroundColor:"grey",
			// marginHorizontal:5,
			fontWeight: 'bold',
			textShadowColor: themes[theme].quadColor,
			textShadowOffset: {
				width: 1,
				height: 2,
			},
			// elevation:5,
			textShadowRadius: 2,
			textTransform: 'uppercase',
			// marginRight:10,
			// borderWidth:2,
			color: themes[theme].primaryColor,
		},

		demiJour: {
			textAlign: 'center',
			textAlignVertical: 'center',
			borderColor: 'black',
			borderWidth: 4,
			backgroundColor: 'white',
			fontSize: 15,
			fontWeight: 'bold',
		},
		demiJourContainer: {
			flex: 1,
			backgroundColor: 'green',
		},
		sectionDescription: {
			marginTop: 8,
			fontSize: 18,
			fontWeight: '400',
		},
		highlight: {
			fontWeight: '700',
		},
		navbar: {
			// height: '8%',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: '5%',
			backgroundColor: themes[theme].secondaryColor,
			position: 'absolute',
			padding: 4,
			bottom: 0,
			left: 0,
			right: 0,
		},
		BarreMidiSoir: {
			height: '5%',
			marginBottom: '1%',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
			// backgroundColor:themes[theme].quadColor
		},
		barreJourSemaine: {
			flex: 3,
			// flexDirection: 'row',
			// flexWrap: 'wrap',
			marginBottom: 27,

			// pad:5,
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
		},
		textJour: {
			fontWeight: '400',
			fontSize: 22,
			color: themes[theme].primaryColor,
			textAlign: 'center',
			textAlignVertical: 'center',
			marginVertical: '30%',
			height: windowHeight / 10,
		},
		textJourAujourdhui: {
			fontWeight: '400',
			fontSize: 22,
			backgroundColor: themes[theme].primaryColor,
			color: themes[theme].secondaryColor,
			textAlignVertical: 'center',
			textAlign: 'center',
			marginVertical: '30%',
			borderRadius: 10,
			height: windowHeight / 10,
		},
	});
	return (
		<LinearGradient colors={['#736e67', '#e0dbb4', '#fffce8']}>
			{/* <LinearGradient  colors={['#fffce8','#f5f1d5','#e0dbb4']} > */}
			{/* <LinearGradient  colors={['#acc5fc', '#789df0', '#517bd6']} > */}
			{/* <LinearGradient  colors={['#e4e4f0','#bebecc','#a8aab5']} > */}
			{/* <LinearGradient  colors={['#d3d3e0','#bebecc','#9899a3']} > */}
			<GestureRecognizer
				style={styles.appContainer}
				onSwipeLeft={state => semainePlus(state)}
				onSwipeRight={state => semaineMoins(state)}
				config={config}>
				{/* <BarreJourSemaine /> */}
				<BarreMidiSoir />
				<View style={{height: '100%'}}>
					<PTRView onRefresh={_refresh}>
						<View style={styles.grille}>
							<BarreJourSemaine />
							<Modal animationType="slide" transparent={true} visible={modal1Visible}>
								<View style={styles.modalTest}>
									<Text style={styles.modalTestText}>Voulez-vous la modifier les menus de cette semaine et supprimer sa validation?</Text>
									<Pressable
										style={{
											backgroundColor: themes[theme].secondaryColor,
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
											backgroundColor: themes[theme].secondaryColor,
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
							<Modal animationType="slide" transparent={true} visible={modalSynchroMenuVisible}>
								<View style={styles.modalTest}>
									<Text style={styles.modalTestText}>
										{`Attention : les menus ne sont pas les mêmes que ceux en ligne. le dernier enregistrement a été fait ${textEnregistrementPlat}.  Voulez-vous importer vos menus ou les exporter ?`}
									</Text>
									<Pressable
										style={{
											backgroundColor: themes[theme].secondaryColor,
											alignItems: 'center',
											justifyContent: 'center',
											marginHorizontal: 10,
											marginVertical: 5,
											borderRadius: 10,
											height: 30,
										}}
										onPress={() => importerMenu()}>
										<Text style={styles.textStyle}>importer</Text>
									</Pressable>
									<Pressable
										style={{
											backgroundColor: themes[theme].secondaryColor,
											alignItems: 'center',
											justifyContent: 'center',
											marginHorizontal: 10,
											marginVertical: 5,

											borderRadius: 10,
											height: 30,
										}}
										onPress={() => exporterMenu()}>
										<Text style={styles.textStyle}>exporter</Text>
									</Pressable>
									<Pressable
										style={{
											backgroundColor: themes[theme].secondaryColor,
											alignItems: 'center',
											justifyContent: 'center',
											marginHorizontal: 10,
											marginVertical: 5,

											borderRadius: 10,
											height: 30,
										}}
										onPress={() => setModalSynchroMenuVisible(false)}>
										<Text style={styles.textStyle}>Annuler</Text>
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
											backgroundColor: themes[theme].secondaryColor,
											alignItems: 'center',
											justifyContent: 'center',
											marginHorizontal: 10,
											marginVertical: 5,
											marginTop: 15,
											borderRadius: 10,

											height: 50,
										}}
										onPress={() => setModalConnectionVisible(false)}>
										<Text style={styles.textStyle}>ok</Text>
									</Pressable>
								</View>
							</Modal>
							<Modal animationType="slide" transparent={true} visible={modalUserVisible}>
								<View style={styles.modalTest}>
									<Text style={styles.modalTestText}>Bonjour, qui es-tu?</Text>

									<Pressable
										style={{
											backgroundColor: themes[theme].secondaryColor,
											alignItems: 'center',
											justifyContent: 'center',
											marginHorizontal: 10,
											marginVertical: 5,
											marginTop: 15,
											borderRadius: 10,

											height: 50,
										}}
										onPress={() => {
											setUser('anne');
											setModalUserVisible(false);
										}}>
										<Text style={styles.textStyle}>Anne</Text>
									</Pressable>
									<Pressable
										style={{
											backgroundColor: themes[theme].secondaryColor,
											alignItems: 'center',
											justifyContent: 'center',
											marginHorizontal: 10,
											marginVertical: 5,
											marginTop: 15,
											borderRadius: 10,

											height: 50,
										}}
										onPress={() => {
											setUser('ludo');
											setModalUserVisible(false);
										}}>
										<Text style={styles.textStyle}>Ludo</Text>
									</Pressable>
								</View>
							</Modal>
							<Modal animationType="slide" transparent={true} visible={modalPlatVisible}>
								<View style={styles.modalVisualisation}>
									<Text>ingredients</Text>
									<Text style={styles.modalVisualisationText}>{visualisationPlat ? visualisationPlat.ingredients : "pas d'ingredients?"}</Text>
									<Text>{'\n'}</Text>
									<View>
										<Text>Recette :</Text>
										{visualisationPlat && visualisationPlat.url ? (
											<Pressable onPress={visualisationPlat ? () => Linking.openURL(visualisationPlat.url) : null}>
												<Text style={styles.modalVisualisationTextLien}>{visualisationPlat.url}</Text>
											</Pressable>
										) : (
											<Text style={styles.modalVisualisationText}> Pas de recette en ligne</Text>
										)}
									</View>
									<Text>{'\n'}</Text>
									<Text>{'\n'}</Text>

									<Pressable
										style={{
											backgroundColor: themes[theme].secondaryColor,
											alignItems: 'center',
											justifyContent: 'center',
											marginHorizontal: 10,
											marginVertical: 5,
											borderRadius: 10,
											height: 30,
										}}
										onPress={() => setModalPlatVisible(false)}>
										<Text style={styles.textStyle}>ok</Text>
									</Pressable>
								</View>
							</Modal>
							<Animated.View
								style={[
									{flex: 30, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'},
									{
										transform: [
											{scale: scaleMenu},
											{
												scale: animSwipe.interpolate({
													inputRange: [0, 1],
													outputRange: [1,1.02],
												}),
											},
										],
									},
								]}>
								{/* {console.log('listePlatChoisi')}
							{console.log(listePlatChoisi)} */}

								{listePlatChoisi &&
									listeDoublon &&
									typeof listePlatChoisi != 'string' &&
									listePlatChoisi.map((item, index) => {
										// console.log('item', item);
										// console.log('index', index);
										// console.log('listeDoublon[index]', listeDoublon.filter(e=>e.plat==item));
										const doublonItem = listeDoublon.filter(e => e.plat == item)[0];

										return (
											// <Pressable key={Math.random()} style={styles.plat} onPress={() => toggleModal(item, index)}>

											<Pressable
												key={Math.random()}
												style={numPlatDsSemaineChoisi[index] ? styles.platLocked : styles.plat}
												onPress={() => (semaineDejaValidé ? visualiserPlat(item) : filtreMenus(item, index))}
												onLongPress={() => lockPlat(index)}>
												<Text style={styles.textPlat}>
													{item}

													<Text style={{fontSize: 10, color: 'black'}}>
														{doublonItem && doublonItem.indexs.length > 1
															? '\n' + (doublonItem.indexs.indexOf(index) + 1) + '/' + doublonItem.indexs.length
															: null}
													</Text>
													{numPlatDsSemaineChoisi[index] && (
														<Text>
															<Icon name="lock" size={15} color={themes[theme].primaryColor} />
														</Text>
													)}
												</Text>
											</Pressable>
										);
									})}
							</Animated.View>
						</View>
					</PTRView>
				</View>
				<NavBar validee={semaineDejaValidé} />
			</GestureRecognizer>
		</LinearGradient>
	);
};

export default Menu;
