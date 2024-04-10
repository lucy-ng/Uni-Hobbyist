/* 
650 Industries, Inc., 2024. Styling a React Native button. [Online] 
Available at: https://docs.expo.dev/ui-programming/react-native-styling-buttons/
[Accessed 14 March 2024].
 */

 
import { styles } from "./Styles";
import { Pressable, Text } from "./Themed";

export default function Button(props: { onPress: any; title: string }) {
  const { onPress, title } = props;
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      lightColor="rgba(0,0,0,0.8)"
      darkColor="rgba(255,255,255,0.8)"
    >
      <Text
        style={styles.buttonText}
        darkColor="rgba(0,0,0,0.8)"
        lightColor="rgba(255,255,255,0.8)"
      >
        {title}
      </Text>
    </Pressable>
  );
}