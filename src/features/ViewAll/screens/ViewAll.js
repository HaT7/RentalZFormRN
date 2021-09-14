import React, { useState, useEffect } from "react";
import { FlatList, Text, View, SafeAreaView, StyleSheet } from "react-native";
import { DatabaseConnection } from "../../../services/dbHelper";

const db = DatabaseConnection.getConnection();

const ViewAll = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_info", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setFlatListItems(temp);
      });
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.id}
        style={{
          backgroundColor: "#EEE",
          marginTop: 20,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Text style={styles.textheader}>Id</Text>
        <Text style={styles.textbottom}>{item.id}</Text>

        <Text style={styles.textheader}>Property Type</Text>
        <Text style={styles.textbottom}>{item.PropertyType}</Text>

        <Text style={styles.textheader}>Bedroom</Text>
        <Text style={styles.textbottom}>{item.Bedrooms}</Text>

        <Text style={styles.textheader}>Date Added</Text>
        <Text style={styles.textbottom}>{item.DateAddRent}</Text>

        <Text style={styles.textheader}>Monthly Rent Price</Text>
        <Text style={styles.textbottom}>{item.MonthlyRentPrice}</Text>

        <Text style={styles.textheader}>Furniture Type</Text>
        <Text style={styles.textbottom}>{item.FurnitureType}</Text>

        <Text style={styles.textheader}>Note</Text>
        <Text style={styles.textbottom}>{item.Notes}</Text>

        <Text style={styles.textheader}>Reporter Name</Text>
        <Text style={styles.textbottom}>{item.ReporterName}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: "#111",
    fontSize: 12,
    fontWeight: "700",
  },
  textbottom: {
    color: "#111",
    fontSize: 18,
  },
});

export default ViewAll;
