import React from 'react';
import { Image, StyleSheet, View, type ViewProps } from 'react-native';

import tornadoImage from '@/assets/images/pthsTornado.png';

type Props = ViewProps & {
  children: React.ReactNode;
};

export default function AppBackground({ children, style, ...rest }: Props) {
  return (
    <View style={[styles.root, style]} {...rest}>
      <View pointerEvents="none" style={styles.imageLayer}>
        <Image source={tornadoImage} resizeMode="contain" style={styles.image} />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
});
