// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to register the user

import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'PlatDatabase.db'});

const RegisterUser = ({navigation}) => {
  let [platName, setPlatName] = useState('');
  let [platType, setPlatType] = useState('');
  let [platNbrPossible, setPlatNbrPossible] = useState('');

  let register_user = () => {
    console.log(platName, platType, platNbrPossible);

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
        'INSERT INTO table_plat (plat_name, plat_type, plat_nbrPossible) VALUES (?,?,?)',
        [platName, platType, platNbrPossible],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(platName) => setPlatName(platName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter type"
                onChangeText={(platType) => setPlatType(platType)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter nombre repas possible"
                onChangeText={(platNbrPossible) => setPlatNbrPossible(platNbrPossible)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          Example of SQLite Database in React Native
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
