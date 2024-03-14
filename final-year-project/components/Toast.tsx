/*
  Almidan, H., 2022. Quick start. [Online] 
  Available at: https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/quick-start.md
  [Accessed 14 March 2024]. 
  */

import Toast from "react-native-toast-message";

export const showSuccessToast = () => {
  Toast.show({
    type: "success",
    text1: "Successfully registered!",
  });
};

export const showErrorToast = () => {
  Toast.show({
    type: "error",
    text1: "Please try again.",
  });
};

export const showEmptyValueToast = () => {
  Toast.show({
    type: "error",
    text1: "Inputs must not be empty.",
  });
};


export const showEmailErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "Email must be a university email.",
    });
  };
  