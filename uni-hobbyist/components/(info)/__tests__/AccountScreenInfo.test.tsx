import AccountScreenInfo from "@/components/(info)/AccountScreenInfo";
import { render, screen } from "@testing-library/react-native";
import renderer from "react-test-renderer";

beforeAll(() => {
  jest.resetAllMocks();
});

jest.mock("firebase/app", () => require("firebase/app"))
jest.mock("firebase/database", () => require("firebase/database"))
jest.mock("firebase/auth", () => require("firebase/auth"))

test("renders correctly with account details", async () => {
  const expectedName = "Bob Smith";
  const expectedUniversity = "City University of London";
  const expectedEmail = "bobsmith@city.ac.uk";

  render(<AccountScreenInfo path={"app/(tabs)/AccountScreen.tsx"} />);

  const name = await screen.findByTestId("accountName");
  expect(name).toEqual(expectedName);
});
