import { Text, View } from '@/components/Themed';
import RegisterScreenInfo from '@/components/RegisterScreenInfo';
import { styles } from '@/components/Styles';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <RegisterScreenInfo path="app/(tabs)/RegisterScreen.tsx" />
    </View>
  );
}
