import React, { useState, useEffect } from "react";
import {
  FormBackground,
  FormCover,
  Title,
  FormContainer,
  FormInput,
  FormMultiInput,
  FormMaskInput,
  ErrorContainer,
} from "../components/InformationFrom.styles";
import { Picker } from "../../../components/picker/picker.component";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PropertyTypes = [
  { label: "Flat", value: "Flat" },
  { label: "House", value: "House" },
  { label: "Bungalow", value: "Bungalow" },
];

const Bedrooms = [
  { label: "Studio", value: "Studio" },
  { label: "One", value: "One" },
  { label: "Two", value: "Two" },
  { label: "Three", value: "Three" },
  { label: "Four", value: "Four" },
];

const FurnitureTypes = [
  { label: "Furnished", value: "Furnished" },
  { label: "Unfurnished", value: "Unfurnished" },
  { label: "Part Furnished", value: "Part Furnished" },
];

const initialState = {
  propertyType: "",
  bedroom: "",
  dateAdded: new Date(),
  monthlyRentPrice: "",
  furnitureType: "",
  note: "",
  reporterName: "",
};

function InformationFormScreen() {
  const [values, setValues] = useState(initialState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(values);
  }, [values]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setValues({ ...values, dateAdded: date });
    hideDatePicker();
  };
  const handleChange = (feild, value) => {
    setValues({ ...values, [feild]: value });
  };

  return (
    <FormBackground>
      <FormCover />
      <FormContainer>
        <Title>RentalZ</Title>
        <Picker
          items={PropertyTypes}
          label={"Property Type"}
          value={values.propertyType}
          onValueChange={(value) => handleChange("propertyType", value)}
        />
        <Picker
          items={Bedrooms}
          label={"Bedroom"}
          value={values.bedroom}
          onValueChange={(value) => handleChange("bedroom", value)}
        />
        <FormMaskInput
          type="currency"
          options={{
            prefix: "$",
            decimalSeparator: ".",
            groupSeparator: ",",
            precision: 2,
          }}
          onChangeText={(text, rawText) => {
            setValues({ ...values, monthlyRentPrice: text.split("$")[1] });
          }}
          keyboardType="numeric"
        />

        <FormInput
          label="Date Add Rent"
          textContentType="none"
          autoCapitalize="none"
          value={values.dateAdded.toDateString()}
          onFocus={showDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Picker
          items={FurnitureTypes}
          label={"Furniture Type"}
          value={values.furnitureType}
          onValueChange={(value) => handleChange("furnitureType", value)}
        />
        <FormMultiInput
          multiline
          numberOfLines={4}
          editable
          maxLength={200}
          label="Notes"
          textContentType="none"
          keyboardType="default"
          autoCapitalize="none"
          value={values.note}
          onChangeText={(value) => handleChange("note", value)}
        />
        <FormInput
          label="Reporter Name"
          textContentType="name"
          keyboardType="default"
          autoCapitalize="none"
          value={values.reporterName}
          onChangeText={(value) => handleChange("reporterName", value)}
        />
      </FormContainer>
    </FormBackground>
  );
}

export default InformationFormScreen;
