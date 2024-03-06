import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
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
    color: '#2e78b7',
  },
  registerContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  loginContainer: {
    alignItems: "center",
    marginHorizontal: 50,
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
});
