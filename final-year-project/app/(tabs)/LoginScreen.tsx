import { Text, View } from '@/components/Themed';
import LoginScreenInfo from '@/components/LoginScreenInfo';
import { styles } from '@/components/Styles';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <LoginScreenInfo path="app/(tabs)/LoginScreen.tsx" />
    </View>
  );
}
