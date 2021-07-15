import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		borderRadius: 20,
	},
	modalText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		height: (windowHeight * 0.98) / 9,
		fontSize: 15,
		fontWeight: 'bold',
	},
	modalFiltreText: {
		// textAlign: 'center',
		// textAlignVertical: 'center',
		// height: (windowWidth ) / 8,
		fontSize: 25,
		// margin: 2,
		padding: 10,

		fontWeight: 'bold',
	},
	modalPlat: {
		backgroundColor: 'lightgrey',
		borderRadius: 20,
	},
	modalFiltre: {
		flex: 1,
		backgroundColor: 'tomato',
		justifyContent:"center",
		// justifyContent:"center",
		alignItems:'center',
		minWidth: windowWidth/3,
		borderRadius: 20,
	},
	modalFiltreHighlight: {
		backgroundColor: 'lightblue',
		borderRadius: 20,
		borderWidth: 2,
		borderColor: 'black',
	},

	modalView: {
		margin: 20,
		backgroundColor: 'white',
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
	FlatGridContainer: {
		flex: 8,
		backgroundColor: 'lightyellow',
	},
	grille: {
		flex: 30,

		// alignItems: 'center',
		// alignItems: 'flex-start',
		flexDirection: 'row',
		backgroundColor: 'blue',
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	midiSoirContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'tomato',
		justifyContent: 'space-around',
		// marginLeft: (windowWidth * 0.98) / 15,
	},
	plat: {
		// height: (windowHeight ) / 9,
		backgroundColor: 'lightblue',
		borderRadius: 20,
	},
	jourSemaine: {
		height: (windowHeight * 0.98) / 9,
	},
	textPlat: {
		textAlign: 'center',
		textAlignVertical: 'center',
		height: (windowHeight * 0.98) / 9,
		fontSize: 20,
		borderRadius: 20,
	},
	textJour: {
		textAlign: 'center',
		textAlignVertical: 'center',
		height: (windowHeight * 0.98) / 9,
		fontSize: 15,
		fontWeight: 'bold',
		borderRadius: 20,
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
});
