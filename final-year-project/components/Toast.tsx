/*
  Almidan, H., 2022. Quick start. [Online] 
  Available at: https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/quick-start.md
  [Accessed 14 March 2024]. 
  */

import Toast from "react-native-toast-message";

export const registerSuccessToast = () => {
  Toast.show({
    type: "success",
    text1: "Successfully registered!",
  });
};

export const registerErrorToast = () => {
  Toast.show({
    type: "error",
    text2: "Registration failed. Please try again.",
  });
};

export const loginSuccessToast = () => {
  Toast.show({
    type: "success",
    text1: "Successfully logged in!",
  });
};

export const loginErrorToast = () => {
  Toast.show({
    type: "error",
    text2: "Login failed. Please try again.",
  });
};

export const emailSentToast = () => {
  Toast.show({
    type: "success",
    text1: "Email Sent!",
  });
};

export const errorToast = () => {
  Toast.show({
    type: "error",
    text1: "Please try again.",
  });
};

export const emptyValueToast = () => {
  Toast.show({
    type: "error",
    text1: "Inputs must not be empty.",
  });
};

export const emailErrorToast = () => {
  Toast.show({
    type: "error",
    text1: "Email must be a university email.",
  });
};

export const passwordLengthErrorToast = () => {
  Toast.show({
    type: "error",
    text2: "Password length must be longer than 6 characters.",
  });
};

export const passwordLowerErrorToast = () => {
  Toast.show({
    type: "error",
    text2: "Password must contain a lowercase character.",
  });
};

export const passwordUpperErrorToast = () => {
  Toast.show({
    type: "error",
    text2: "Password must contain an uppercase character.",
  });
};

export const passwordNumberErrorToast = () => {
  Toast.show({
    type: "error",
    text2: "Password must contain a number.",
  });
};

export const passwordNonAlphanumericErrorToast = () => {
  Toast.show({
    type: "error",
    text2: "Password must contain a non-alphanumeric character.",
  });
};
