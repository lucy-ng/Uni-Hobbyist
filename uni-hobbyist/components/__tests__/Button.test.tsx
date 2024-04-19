import renderer from "react-test-renderer";
import Button, { RegisterButton } from "../Button";
import { render, screen } from "@testing-library/react-native";
import { fireEvent } from "react-native-testing-library";

beforeAll(() => {
  jest.resetAllMocks();
});

test("button renders correctly", () => {
  const action = jest.fn();

  const tree = renderer
    .create(<Button onPress={action} title="Action" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("register button renders correctly", () => {
  const tree = renderer.create(<RegisterButton />).toJSON();
  expect(tree).toMatchSnapshot();
});