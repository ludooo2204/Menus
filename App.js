/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
// import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NewChoice from './components/NewChoice';
import ListeCourse from './components/ListeCourse';
import styles from './components/Styles';
import {LogBox} from 'react-native';

import HomeScreen from './HomeScreen';
import NewPlat from './components/NewPlat';
import Menu from './components/Menu';
import ImpressionCourse from './components/ImpressionCourse';
import UpdateUser from './UpdateUser';
import ViewUser from './ViewUser';
import ViewAllUser from './ViewAllUser';
import DeleteUser from './DeleteUser';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);


const Stack = createStackNavigator();







const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="menu" screenOptions={{headerShown: false}}>
				<Stack.Screen name="menu" component={Menu} />

				{/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
				{/* <Stack.Screen name="Register" component={RegisterUser} /> */}
				{/* <Stack.Screen name="Update" component={UpdateUser} /> */}
				{/* <Stack.Screen name="View" component={ViewUser} /> */}
				{/* <Stack.Screen name="ViewAll" component={ViewAllUser} /> */}
				<Stack.Screen name="impressionCourse" component={ImpressionCourse} />
				<Stack.Screen name="filtreMenu" component={NewChoice} />
				{/* <Stack.Screen name="newPlat" component={NewPlat} /> */}
				<Stack.Screen name="listeCourse" component={ListeCourse} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
