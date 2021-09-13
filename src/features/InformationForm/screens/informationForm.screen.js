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
  FormButton,
} from "../components/InformationFrom.styles";
import { Picker } from "../../../components/picker/picker.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ActivityIndicator, Colors } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text } from "../../../components/typography/text.component";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

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
  errors: {
    propertyType: "",
    bedroom: "",
    dateAdded: "",
    monthlyRentPrice: "",
    furnitureType: "",
    note: "",
    reporterName: "",
  },
};

function InformationFormScreen() {
  const [values, setValues] = useState(initialState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

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
    let { errors } = values;

    switch (feild) {
      case "propertyType":
        errors.propertyType =
          value.length === "" ? "Property Type is required" : "";
        break;
      case "bedroom":
        errors.bedroom = value.length === "" ? "Bedroom is required" : "";
        break;
      case "dateAdded":
        errors.dateAdded = value.length === "" ? "Date add is required" : "";
        break;
      case "monthlyRentPrice":
        errors.monthlyRentPrice =
          value === "0.00" ? "Monthly Rent Price is required" : "";
        break;
      case "note":
        errors.note =
          value.length > 200 ? "Note not be 200 characters long!" : "";
        break;
      case "reporterName":
        errors.reporterName =
          value.length === "" ? "Reporter Name is required" : "";
        break;
      default:
        break;
    }
    setValues({ ...values, errors, [feild]: value });
  };

  const isNotEmpty = () => {
    const {
      propertyType,
      bedroom,
      dateAdded,
      monthlyRentPrice,
      reporterName,
      errors,
    } = values;

    let isNoError = true;

    if (!propertyType) {
      setValues({
        ...values,
        errors: {
          ...errors,
          propertyType: "Property Type is required.",
        },
      });
      isNoError = false;
    }
    if (!bedroom) {
      setValues({
        ...values,
        errors: {
          ...errors,
          bedroom: "Bedroom is required.",
        },
      });
      isNoError = false;
    }
    if (!dateAdded) {
      setValues({
        ...values,
        errors: {
          ...errors,
          dateAdded: "Date Add is required.",
        },
      });
      isNoError = false;
    }
    if (monthlyRentPrice === "0.00") {
      setValues({
        ...values,
        errors: {
          ...errors,
          monthlyRentPrice: "Monthly Rent Price is required.",
        },
      });
      isNoError = false;
    }
    if (!reporterName) {
      setValues({
        ...values,
        errors: {
          ...errors,
          reporterName: "Reporter Name is required.",
        },
      });
      isNoError = false;
    }
    if (isNoError) {
      setValues({
        ...values,
        errors: {
          propertyType: "",
          bedroom: "",
          dateAdded: "",
          monthlyRentPrice: "",
          furnitureType: "",
          note: "",
          reporterName: "",
        },
      });
    }
    return isNoError;
  };

  const handlePress = () => {
    if (isNotEmpty()) {
      console.log("fdsfdsaf");
      if (validateForm(values.errors)) {
        alert("Created successfully.");
      }
    } else {
      console.log("fdsfdsaf222222");
      validateForm(values.errors);
    }
  };

  const { errors } = values;

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
        {errors.propertyType.length > 0 && (
          <ErrorContainer size="large">
            <Text variant="error">{errors.propertyType}</Text>
          </ErrorContainer>
        )}
        <Picker
          items={Bedrooms}
          label={"Bedroom"}
          value={values.bedroom}
          onValueChange={(value) => handleChange("bedroom", value)}
        />
        {errors.bedroom.length > 0 && (
          <ErrorContainer size="large">
            <Text variant="error">{errors.bedroom}</Text>
          </ErrorContainer>
        )}
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
        {errors.monthlyRentPrice.length > 0 && (
          <ErrorContainer size="large">
            <Text variant="error">{errors.monthlyRentPrice}</Text>
          </ErrorContainer>
        )}
        <FormInput
          label="Date Add Rent"
          textContentType="none"
          autoCapitalize="none"
          value={values.dateAdded.toDateString()}
          onFocus={showDatePicker}
        />
        {errors.dateAdded.length > 0 && (
          <ErrorContainer size="large">
            <Text variant="error">{errors.dateAdded}</Text>
          </ErrorContainer>
        )}
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
        {errors.furnitureType.length > 0 && (
          <ErrorContainer size="large">
            <Text variant="error">{errors.furnitureType}</Text>
          </ErrorContainer>
        )}
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
        {errors.note.length > 0 && (
          <ErrorContainer size="large">
            <Text variant="error">{errors.note}</Text>
          </ErrorContainer>
        )}
        <FormInput
          label="Reporter Name"
          textContentType="name"
          keyboardType="default"
          autoCapitalize="none"
          value={values.reporterName}
          onChangeText={(value) => handleChange("reporterName", value)}
        />
        {errors.reporterName.length > 0 && (
          <ErrorContainer size="large">
            <Text variant="error">{errors.reporterName}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!loading ? (
            <FormButton mode="contained" onPress={handlePress}>
              Submit
            </FormButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </FormContainer>
    </FormBackground>
  );
}

export default InformationFormScreen;
