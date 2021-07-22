// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to view all the user*/

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'PlatDatabase.db' });

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_plat', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.plat_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Id: {item.plat_id}</Text>
        <Text>Name: {item.plat_name}</Text>
        <Text>Contact: {item.plat_type}</Text>
        <Text>Address: {item.plat_nbrPossible}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Example of SQLite Database in React Native
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;