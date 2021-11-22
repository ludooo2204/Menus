// import {StyleSheet, Dimensions} from 'react-native';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;


// export default styles = StyleSheet.create({
// 	centeredView: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	button: {
// 		borderRadius: 20,
// 		padding: 10,
// 		margin: 2,
// 		paddingHorizontal:10,
// 		marginBottom:5,
// 		elevation: 2,
// 	},
// 	buttonOpen: {
// 		backgroundColor: '#F194FF',
// 	},
// 	buttonClose: {
// 		backgroundColor: '#d1dce8',
// 	},
// 	textStyle: {
// 		// color: 'white',
// 		// backgroundColor: '#d1dce8',
// 		color: themes[theme].primaryColor,

// fontSize:20,
// 		fontWeight: 'bold',
// 		borderRadius: 20,
// 	},
// 	modalText: {
// 		// textAlign: 'center',
// 		// textAlignVertical: 'center',
// 		height: (windowHeight * 0.98) / 9,
// 		// fontSize: 20,
// 		// fontWeight: 'bold',
			
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		color: themes[theme].primaryColor,
// 	},
// 	modalTest: {
// 		position: 'absolute',
// 		top:windowHeight  / 2.5,
// 		left:windowWidth/5.5,
// 		borderRadius:20,
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 		justifyContent:"center",
// 		backgroundColor:'white',
// 		// height: windowHeight  / 5,
// 		width: windowWidth  / 1.5,
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		padding: 20
		
// 	},
// 	modalTestText: {
		
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		color: themes[theme].primaryColor,
		
// 	},
// 	modalVisualisation: {
// 		position: 'absolute',
// 		top:windowHeight  / 4,
// 		left:windowWidth/5.5,
// 		borderRadius:20,
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 		justifyContent:"center",
// 		backgroundColor:'white',
// 		height: windowHeight  / 2,
// 		width: windowWidth  / 1.5,
// 		fontSize: 20,
// 		fontWeight: 'bold',
		
// 	},
// 	modalVisualisationText: {
		
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		color: themes[theme].primaryColor,
		
// 	},
// 	modalVisualisationTextLien: {
		
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		color: 'blue',
// 		textDecorationLine:"underline"
		
// 	},
// 	modalFiltreText: {
// 		// textAlign: 'center',
// 		// textAlignVertical: 'center',
// 		// height: (windowWidth ) / 8,
// 		fontSize: 25,
// 		color: themes[theme].primaryColor,
// 		// fontWeight:900,
// 		// margin: 2,
// 		paddingHorizontal: 5,

// 		fontWeight: 'bold',
// 	},
// 	modalPlat: {
// 		backgroundColor: '#d1dce8',
// 		borderRadius: 20,
// 		width: windowWidth / 2.5,
// 		marginHorizontal: 7,
// 		marginVertical: 5,
// 		shadowColor: '#000',
// 		shadowOffset: {
// 			width: 0,
// 			height: 2,
// 		},
// 		shadowOpacity: 0.25,
// 		shadowRadius: 4,
// 		elevation: 5,
// 	},
// 	modalFiltre: {
// 		flex: 1,
// 		backgroundColor: '#FDFDFD',
// 		justifyContent: 'center',
// 		// justifyContent:"center",
// 		alignItems: 'center',
// 		minWidth: windowWidth / 3,
// 		borderRadius: 20,
// 	},
// 	modalFiltreHighlight: {
// 		backgroundColor: '#bec7d1',
// 		borderRadius: 20,
// 		justifyContent: 'center',
// 		// justifyContent:"center",
// 		alignItems: 'center',
// 		borderWidth: 5,
// 		borderColor: 'black',
// 	},

// 	modalView: {
// 		// margin: 20,
// 		backgroundColor: '#FDFDFD',
// 		flex: 1,
// 		borderRadius: 20,
// 		padding: 15,
// 		alignItems: 'center',
// 		shadowColor: '#000',
// 		shadowOffset: {
// 			width: 0,
// 			height: 2,
// 		},
// 		shadowOpacity: 0.25,
// 		shadowRadius: 4,
// 		elevation: 5,
// 	},
// 	appContainer: {
// 		// flex: 1,
// 		height: '100%',
// 		backgroundColor: '#FDFDFD',
// 		// padding: "0.5%"
// 	},
// 	grille: {
// 		height: windowHeight * 0.93,

// 		// alignItems: 'center',
// 		// alignItems: 'flex-start',
// 		flexDirection: 'row',
// 		// backgroundColor: 'blue',
// 	},
// 	sectionTitle: {
// 		fontSize: 24,
// 		fontWeight: '600',
// 	},

// 	plat: {
// 		backgroundColor: '#d1dce8',
// 		elevation: 18,
// 		borderRadius: 20,
// 		marginHorizontal: '3%',
// 		marginVertical: '3%',
// 		justifyContent: 'center',
// 		width: '40%',
// 		height: windowHeight / 10,
// 	},
// 	platLocked: {
// 		justifyContent: 'center',
// 		height: windowHeight / 10,
// 		backgroundColor: '#bec7d1',
// 		elevation: 18,
// 		borderRadius: 20,
// 		// borderWidth: 2,
// 		marginHorizontal: '3%',
// 		marginVertical: '3%',
// 		width: '40%',
// 	},
// 	textPlat: {
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 		// height: ((windowHeight) / 10),
// 		fontSize: 19,
// 		// backgroundColor:"grey",
// 		// marginHorizontal:5,
// 		fontWeight: 'bold',
// 		textShadowColor: '#fdfdfd',
// 		textShadowOffset: {
// 			width: 1,
// 			height: 2,
// 		},
// 		// elevation:5,
// 		textShadowRadius: 4,
// 		textTransform: 'uppercase',
// 		// marginRight:10,
// 		// borderWidth:2,
// 		color: themes[theme].primaryColor,
// 	},


// 	demiJour: {
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 		borderColor: 'black',
// 		borderWidth: 4,
// 		backgroundColor: 'white',
// 		fontSize: 15,
// 		fontWeight: 'bold',
// 	},
// 	demiJourContainer: {
// 		flex: 1,
// 		backgroundColor: 'green',
// 	},
// 	sectionDescription: {
// 		marginTop: 8,
// 		fontSize: 18,
// 		fontWeight: '400',
// 	},
// 	highlight: {
// 		fontWeight: '700',
// 	},
// 	navbar: {
// 		// height: '8%',
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 		paddingHorizontal: '5%',
// 		backgroundColor: '#d1dce8',
// 		position: 'absolute',
// 		padding: 5,
// 		bottom:0,
// 		left:0,
// 		right:0
// 	},
// 	BarreMidiSoir: {
// 		height: '4.2%',
// 		flexDirection: 'row',
// 		justifyContent: 'space-around',
// 		alignItems: 'center',
// 		backgroundColor:"#FDFDFD"
// 	},
// 	barreJourSemaine: {
// 		flex: 3,
// 		// flexDirection: 'row',
// 		// flexWrap: 'wrap',
// 		marginBottom: 27,

// 		// pad:5,
// 		justifyContent: 'flex-start',
// 		alignItems: 'flex-start',
// 	},
// 	textJour: {
// 		fontWeight: '400',
// 		fontSize: 22,
// 		color: themes[theme].primaryColor,
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 		marginVertical: '30%',
// 		height: windowHeight / 10,
		
// 	},
// 	textJourAujourdhui: {
// 		fontWeight: '400',
// 		fontSize: 22,
// 		backgroundColor: themes[theme].primaryColor,
// 		color: '#d1dce8',
// 		textAlignVertical: 'center',
// 		textAlign: 'center',
// 		marginVertical: '30%',
// 		borderRadius: 10,
// 		height: windowHeight / 10,
// 	},

// });
