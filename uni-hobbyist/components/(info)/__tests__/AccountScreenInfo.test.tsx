import AccountScreenInfo from "@/components/(info)/AccountScreenInfo";
import { render, screen } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import firebase from "firebase/app";

beforeAll(() => {
  jest.resetAllMocks();
});

firebase.initializeApp = jest.fn();

jest.mock("firebase/app", () => {
  const data = { name: "unnamed" };
  const snapshot = { val: () => data };
  return {
    initializeApp: jest.fn().mockReturnValue({
      database: jest.fn().mockReturnValue({
        ref: jest.fn().mockReturnThis(),
        once: jest.fn(() => Promise.resolve(snapshot))
      })
    })
  };
});

test("account details are fetched", async () => {
  const expectedName = "Bob Smith";
  const expectedUniversity = "City University of London";
  const expectedEmail = "bobsmith@city.ac.uk";

  const accountScreen = renderer.create(<AccountScreenInfo path="app/(tabs)/AccountScreen.tsx" />)

});
