import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import Colors from '@/constants/Colors';

export default function LoginScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.loginContainer}>
        <Text
          style={styles.loginText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Email
        </Text>
        <TextInput
          style={styles.emailInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    loginContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    loginText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    emailInput: {
      borderColor: 'white', 
      borderWidth: 1, 
      width: 'auto',
      color: 'white'
    }
});
