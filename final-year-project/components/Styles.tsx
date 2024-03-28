import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    color: "purple",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    width: 200,
    padding: 5,
    margin: 20,
  },
  modalView: {
    marginTop: 250,
    borderRadius: 20,
    padding: 10,
  },
  modalInfoView: {
    borderRadius: 20,
    padding: 50,
  },
  closeIcon: {
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  homeButtonsList: {
    padding: 10
  },
  
  /* 
  650 Industries, Inc., 2024. Styling a React Native button. [Online] 
  Available at: https://docs.expo.dev/ui-programming/react-native-styling-buttons/
  [Accessed 14 March 2024].
  */
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
  },
  buttonText: {
    padding: 10,
    textAlign: "center",
  }
});
