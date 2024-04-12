import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 10,
    color: "purple",
    fontFamily: "Quicksand",
  },
  cardTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "purple",
    fontFamily: "Quicksand",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
    color: "purple",
    fontFamily: "Quicksand",
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
    minHeight: "100%",
    justifyContent: "center",
  },
  keyboardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  bodyHeaderContainer: {
    alignItems: "center",
    minHeight: "90%",
  },
  bodyContainer: {
    alignItems: "center",
    minHeight: "80%",
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  altText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "200",
  },
  input: {
    borderWidth: 2,
    width: 200,
    padding: 6,
    margin: 20,
    fontSize: 16,
  },
  inputText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  descriptionInput: {
    borderWidth: 2,
    width: 200,
    margin: 20,
    padding: 10,
    paddingBottom: 100,
    alignItems: "stretch",
  },
  modalInfoView: {
    borderRadius: 20,
    padding: 20,
  },
  closeIcon: {
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  homeButtonsList: {
    padding: 10,
  },
  dateTimeBox: {
    marginBottom: 20,
  },
  deleteButton: {
    alignItems: "center",
    marginTop: 20,
  },
  searchBox: {
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  searchBar: {
    borderWidth: 2,
    width: 280,
    padding: 8,
    marginRight: 20,
    fontSize: 16,
    backgroundColor: "#BABABA",
  },
  tagsList: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
    maxWidth: "80%",
  },
  searchTagsList: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
  },

  /* 
  650 Industries, Inc., 2024. Styling a React Native button. [Online] 
  Available at: https://docs.expo.dev/ui-programming/react-native-styling-buttons/
  [Accessed 14 March 2024].
  */
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    padding: 10,
    textAlign: "center",
    letterSpacing: 0.25,
    lineHeight: 21,
    fontWeight: "bold",
    color: "purple",
  },
});
