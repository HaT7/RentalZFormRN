import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import MyImageButton from "../components/MyImageButton";
import { DatabaseConnection } from "../../../services/dbHelper";

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_info'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_info", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_info(id INTEGER PRIMARY KEY AUTOINCREMENT, PropertyType VARCHAR (255) NOT NULL, Bedrooms VARCHAR (255) NOT NULL, DateAddRent VARCHAR (255) NOT NULL, MonthlyRentPrice VARCHAR (255) NOT NULL, FurnitureType VARCHAR (255) NULL, Notes VARCHAR (255) NULL, ReporterName VARCHAR (255) NOT NULL)",
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MyImageButton
              title="Information Insert"
              btnColor="#2992C4"
              btnIcon="plus"
              customClick={() => navigation.navigate("InformationFormScreen")}
            />
            <MyImageButton
              title="View All Information"
              btnColor="#384F62"
              btnIcon="list"
              customClick={() => navigation.navigate("ViewAll")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
