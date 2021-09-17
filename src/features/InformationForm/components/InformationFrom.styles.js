import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";
import { MaskedTextInput } from "react-native-mask-text";

export const FormBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/photo-1556020685-ae41abfc9365.jpeg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FormCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const Title = styled(Text)`
  font-size: 40px;
  text-align: center;
  color: ${(props) => props.theme.colors.brand.primary};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const FormContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[3]};
  border-radius: ${(props) => props.theme.space[3]};
`;

export const FormInput = styled(TextInput).attrs({
  mode: "outlined",
})`
  border-color: ${(props) => props.theme.colors.ui.secondary};
  width: 300px;
`;

export const FormMultiInput = styled(TextInput).attrs({
  mode: "outlined",
})`
  color: ${(props) => props.theme.colors.ui.secondary};
  border-color: ${(props) => props.theme.colors.ui.secondary};
  width: 300px;
  height: 80px;
`;

export const FormMaskInput = styled(MaskedTextInput)`
  width: 300px;
  height: 62px;
  border-width: 1px;
  border-radius: 6px;
  border-color: #757575;
  color: #757575;
  font-size: 20px;
  margin-top: 6px;
  padding-left: 10px;
  background-color: #f6f6f6;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const FormButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;
