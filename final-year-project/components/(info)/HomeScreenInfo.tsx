import { View, FlatList, SafeAreaView } from "react-native";
import { styles } from "../Styles";
import Button from "../Button";
import { hostEventAction, searchAction } from "@/app/actions";
import { useDispatch } from "react-redux";
import { logout } from "@/app/authenticationSlice";
import { router } from "expo-router";

export default function HomeScreenInfo({ path }: { path: string }) {
  const dispatch = useDispatch();

  const logoutAction = () => {
    dispatch(logout());
    router.replace("/(screens)/LoginScreen");
  };

  const itemData = [
    {
      title: "Book",
      onPress: searchAction,
    },
    {
      title: "Host",
      onPress: hostEventAction,
    },
    {
      title: "Logout",
      onPress: logoutAction,
    },
  ];

  type ItemProps = { title: string; onPress: any };
  const Item = ({ title, onPress }: ItemProps) => (
    <Button title={title} onPress={onPress} />
  );

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            data={itemData}
            renderItem={({ item }) => (
              <Item title={item.title} onPress={item.onPress} />
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
