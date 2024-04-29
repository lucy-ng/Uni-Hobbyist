import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 10,
    color: "#9067C6",
    fontFamily: "Quicksand",
  },
  cardTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#9067C6",
    fontFamily: "Quicksand",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
    color: "#9067C6",
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
    marginVertical: 25,
    minHeight: "90%",
  },
  bodyContainer: {
    alignItems: "center",
    minHeight: "80%",
    justifyContent: "center",
  },
  cardText: {
    fontSize: 24,
    lineHeight: 24,
    textAlign: "center",
    color: "#9067C6",
    fontFamily: "Quicksand",
    fontWeight: "200",
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
    width: 250,
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
    fontSize: 16,
    width: 200,
    margin: 20,
    padding: 10,
    paddingBottom: 100,
    alignItems: "stretch",
    minWidth: "65%",
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
  editButton: {
    alignItems: "center",
    marginTop: 20,
  },
  deleteButton: {
    alignItems: "center",
    marginTop: 20,
  },
  searchFilterBox: {
    maxWidth: "83%",
    maxHeight: "20%",
    padding: 10,
  },
  searchBox: {
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  searchBar: {
    borderWidth: 2,
    width: 250,
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: "#CAC4CE",
  },
  tagsList: {
    marginVertical: 20,
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
  sortBox: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  endSortIcon: {
    marginLeft: 20,
    marginRight: 20,
  },
  tooltipBox: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
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
  },
});
