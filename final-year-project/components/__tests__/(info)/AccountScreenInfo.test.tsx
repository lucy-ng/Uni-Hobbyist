import AccountScreenInfo from "@/components/(info)/AccountScreenInfo";
import renderer from "react-test-renderer";

jest.mock("../../Button")
jest.mock("../../Toast")
jest.mock("../../Styles")
jest.mock("../../Themed")

test("renders correctly", () => {
  const tree = renderer
    .create(<AccountScreenInfo path={"app/(tabs)/AccountScreen.tsx"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

