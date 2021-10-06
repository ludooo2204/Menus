// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to register the user

import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView, Text} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

// var db = openDatabase({name: 'PlatDatabase.db'});
var db = openDatabase({name: 'PlatDatabase.db', createFromLocation: 1});

const NewPlat = ({navigation}) => {
	let [platName, setPlatName] = useState('');
	let [platType, setPlatType] = useState('');
	let [midiSoir, setMidiSoir] = useState('');
	let [ingredients, setIngredients] = useState('');
	let [saison, setSaison] = useState('');
	let [typeViande, setTypeViande] = useState('');
	let [platNbrPossible, setPlatNbrPossible] = useState('');

	let register_user = () => {
		console.log('submit');
		console.log(platName, platType, platNbrPossible, midiSoir, ingredients, saison, typeViande);

		if (!platName) {
			alert('Please fill name');
			return;
		}
		if (!platType) {
			alert('Please fill type');
			return;
		}
		if (!platNbrPossible) {
			alert('Please fill nbr de plat possible');
			return;
		}

		db.transaction(function (tx) {
			tx.executeSql(
				'INSERT INTO table_plat (name, type,nbrPossible,midiSoir,ingredients,typeViande,saison) VALUES (?,?,?,?,?,?,?)',
				[platName, platType, platNbrPossible, midiSoir, ingredients, typeViande, saison],
				(tx, results) => {
					console.log('Results', results.rowsAffected);
					if (results.rowsAffected > 0) {
						Alert.alert(
							'Success',
							'You are Registered Successfully',
							[
								{
									text: 'Ok',
									onPress: () => navigation.navigate('menu'),
								},
							],
							{cancelable: false},
						);
					} else Alert.alert('Registration Failed');
				},
			);
		});
	};

	return (
		<SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<View style={{flex: 1}}>
					<ScrollView keyboardShouldPersistTaps="handled">
						<KeyboardAvoidingView behavior="padding" style={{flex: 1, justifyContent: 'space-between'}}>
							<Mytextinput
								placeholder="entrer le nom du plat"
								onChangeText={platName => setPlatName(platName)}
								maxLength={225}
								numberOfLines={2}
								multiline={true}
								style={{textAlignVertical: 'top', padding: 10,fontSize:25}}

							/>
							<Mytextinput
								placeholder="entrer le type du plat"
								onChangeText={platType => setPlatType(platType)}
								maxLength={225}
								numberOfLines={2}
								multiline={true}
								style={{textAlignVertical: 'top', padding: 10,fontSize:25}}
							/>
							<Mytextinput
								placeholder="Enter nombre repas possible"
								onChangeText={platNbrPossible => setPlatNbrPossible(platNbrPossible)}
								keyboardType="numeric"
								maxLength={225}
								numberOfLines={2}
								multiline={true}
								style={{textAlignVertical: 'top', padding: 10,fontSize:25}}

							/>
							<Mytextinput
								placeholder="Plat du midi ou du soir ?"
								onChangeText={midiSoir => setMidiSoir(midiSoir)}
								maxLength={225}
								numberOfLines={2}
								multiline={true}
								style={{textAlignVertical: 'top', padding: 10,fontSize:25}}

							/>
							<Mytextinput
								placeholder="ingredients ?"
								onChangeText={ingredients => setIngredients(ingredients)}
								maxLength={225}
								numberOfLines={5}
								multiline={true}
								style={{textAlignVertical: 'top', padding: 10,fontSize:25}}

							/>
							<Mytextinput
								placeholder="Saison ?"
								onChangeText={saison => setSaison(saison)}
								maxLength={225}
								numberOfLines={2}
								multiline={true}
								style={{textAlignVertical: 'top', padding: 10,fontSize:25}}

							/>
							<Mytextinput
								placeholder="Type de viande ?"
								onChangeText={typeViande => setTypeViande(typeViande)}
								maxLength={225}
								numberOfLines={5}
								multiline={true}
								style={{textAlignVertical: 'top', padding: 10,fontSize:25}}

							/>
							<Mybutton title="Submit" customClick={register_user} />
						</KeyboardAvoidingView>
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default NewPlat;
