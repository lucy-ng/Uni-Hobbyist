/* 
650 Industries, Inc., 2024. Styling a React Native button. [Online] 
Available at: https://docs.expo.dev/ui-programming/react-native-styling-buttons/
[Accessed 14 March 2024].
 */

import { Link } from "expo-router";
import { styles } from "./Styles";
import { Pressable, Text } from "./Themed";

export default function Button(props: { onPress: any; title: string }) {
  const { onPress, title } = props;
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      lightColor="#8D86C9"
      darkColor="#8D86C9"
    >
      <Text style={styles.buttonText} darkColor="white" lightColor="white">
        {title}
      </Text>
    </Pressable>
  );
}

export function RegisterButton() {
  return (
    <Link href="/RegisterScreen" asChild>
      <Pressable style={styles.button} lightColor="#8D86C9" darkColor="#8D86C9">
        <Text style={styles.buttonText} darkColor="white" lightColor="white">
          Register
        </Text>
      </Pressable>
    </Link>
  );
}
