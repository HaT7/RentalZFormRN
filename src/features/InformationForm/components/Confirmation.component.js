import React from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

function Confirmationcomponent({ visible, hideDialog, content, onSuccess }) {
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirmation Data</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{content}</Paragraph>
            </Dialog.Content>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
              </Dialog.Actions>
              <Dialog.Actions>
                <Button onPress={onSuccess}>Save Data</Button>
              </Dialog.Actions>
            </View>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

export default Confirmationcomponent;
