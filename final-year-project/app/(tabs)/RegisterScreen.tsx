import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import RegisterScreenInfo from '@/components/RegisterScreenInfo';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uni Hobbyist</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <RegisterScreenInfo path="app/(tabs)/RegisterScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
