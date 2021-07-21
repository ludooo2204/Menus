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
		backgroundColor: '#009'
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
		backgroundColor: '#d1dce8',
		borderRadius: 20,
	},
	modalFiltre: {
		flex: 1,
		backgroundColor: '#FDFDFD',
		justifyContent: 'center',
		// justifyContent:"center",
		alignItems: 'center',
		minWidth: windowWidth / 3,
		borderRadius: 20,
	},
	modalFiltreHighlight: {
		backgroundColor: '#bec7d1',
		borderRadius: 20,
		borderWidth: 2,
		borderColor: 'black',
	},

	modalView: {
		// margin: 20,
		backgroundColor: '#FDFDFD',
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
		height:"100%",
		backgroundColor: '#FDFDFD',
		// padding: "0.5%"
	},
	grille: {
		height:715,

		// alignItems: 'center',
		// alignItems: 'flex-start',
		flexDirection: 'row',
		// backgroundColor: 'blue',
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	BarreMidiSoir: {
		height: "4.2%",
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems:"center",
	},
	plat: {
		backgroundColor: '#d1dce8',
		elevation:18,
		borderRadius: 20,
		marginHorizontal: "3%",
		marginVertical: "3%",
		justifyContent:"center",
		width: '40%',
		height: ((windowHeight) / 10),
	},
	platLocked: {
		justifyContent:"center",
		height: ((windowHeight) / 10),
		backgroundColor: '#bec7d1',
		elevation:18,
		borderRadius: 20,
		// borderWidth: 2,
		marginHorizontal: "3%",
		marginVertical: "3%",
		width: '40%'
	},
	textPlat: {
		textAlign: 'center',
		textAlignVertical: 'center',
		// height: ((windowHeight) / 10),
		fontSize: 19,
		// backgroundColor:"grey",
		// marginHorizontal:5,
		fontWeight:"bold",
		textShadowColor: '#fdfdfd',
		textShadowOffset: {
			width: 1,
			height: 2,
		},
		// elevation:5,
		textShadowRadius:4,
		textTransform:"uppercase",
		// marginRight:10,
		// borderWidth:2,
		color: "#754f9d"
	},
	// textPlatLocked:{
	// 	textAlign: 'center',
	// 	textAlignVertical: 'center',
	// 	height: ((windowHeight) / 10)-15,
	// 	fontSize: 19,
	// 	// marginHorizontal:5,
	// 	fontWeight:"bold",
	// 	textShadowColor: '#fdfdfd',
	// 	textShadowOffset: {
	// 		width: 1,
	// 		height: 2,
	// 	},
	// 	// elevation:5,
	// 	textShadowRadius:4,
	// 	textTransform:"uppercase",
	// 	// borderWidth:2,
	// 	color: "#754f9d"
	// },

	
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
	navbar:{
		height: '8%',
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		paddingHorizontal: "5%",
		backgroundColor:"#d1dce8"
	},
	barreJourSemaine: {
		flex: 3,
		// backgroundColor: 'green',
		// flexWrap: 'wrap',
		marginBottom:27,
		// pad:5,
		justifyContent: 'flex-start',
		alignItems:"flex-start"
	},
	textJour:{
		fontWeight:"400",
		fontSize:22,
		color: "#754f9d",
		// backgroundColor:"blue",
		textAlignVertical:"center",
		paddingVertical:37
	},
});
