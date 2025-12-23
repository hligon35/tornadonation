import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

const splashVideo = require('../assets/images/pthsSplash.mp4');
const splashFallbackImage = require('../assets/images/pthsTornado.png');

export default function StartupVideoSplash() {
  // Video splash for native; simple image fallback for web.
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Image source={splashFallbackImage} resizeMode="contain" style={styles.fill} />
      </View>
    );
  }

  const player = useVideoPlayer(splashVideo, playerInstance => {
    playerInstance.loop = true;
    playerInstance.muted = true;
    playerInstance.play();
  });

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.fill} contentFit="contain" nativeControls={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
});
