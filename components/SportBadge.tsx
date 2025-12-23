import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { defaultTheme } from '@tornado-nation/ui';

const badgeSourceBySportId: Record<string, ImageSourcePropType> = {
  baseball: require('../assets/badges/baseball.png'),
  basketball: require('../assets/badges/basketball.png'),
  bowling: require('../assets/badges/bowling.png'),
  cheer: require('../assets/badges/cheer.png'),
  football: require('../assets/badges/football.png'),
  golf: require('../assets/badges/golf.png'),
  lacrosse: require('../assets/badges/lacrosse.png'),
  soccer: require('../assets/badges/soccer.png'),
  softball: require('../assets/badges/softball.png'),
  swim: require('../assets/badges/swim.png'),
  tennis: require('../assets/badges/tennis.png'),
  track: require('../assets/badges/track.png'),
  volleyball: require('../assets/badges/volleyball.png'),
  wrestling: require('../assets/badges/wrestling.png'),
};

function fallbackIconForSportId(id: string): keyof typeof Ionicons.glyphMap {
  switch (id) {
    case 'baseball':
      return 'baseball-outline';
    case 'basketball':
      return 'basketball-outline';
    case 'bowling':
      return 'bowling-ball-outline';
    case 'cheer':
      return 'megaphone-outline';
    case 'cross-country':
      return 'walk-outline';
    case 'football':
      return 'american-football-outline';
    case 'golf':
      return 'golf-outline';
    case 'lacrosse':
      return 'fitness-outline';
    case 'soccer':
      return 'football-outline';
    case 'softball':
      return 'baseball-outline';
    case 'swim':
      return 'water-outline';
    case 'tennis':
      return 'tennisball-outline';
    case 'track':
      return 'speedometer-outline';
    case 'volleyball':
      return 'tennisball-outline';
    case 'wrestling':
      return 'barbell-outline';
    default:
      return 'trophy-outline';
  }
}

export default function SportBadge(props: {
  sportId: string;
  size?: number;
}) {
  const size = props.size ?? 28;

  const badgeSource = badgeSourceBySportId[props.sportId];
  if (badgeSource) {
    return (
      <View
        accessibilityLabel="Sport badge"
        style={[styles.imageBadge, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <Image
          source={badgeSource}
          resizeMode="contain"
          style={{ width: size, height: size, opacity: 1 }}
        />
      </View>
    );
  }

  const iconSize = Math.max(12, Math.floor(size * 0.62));
  return (
    <View
      accessibilityLabel="Sport badge"
      style={[
        styles.fallbackBadge,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Ionicons name={fallbackIconForSportId(props.sportId)} size={iconSize} color={defaultTheme.colors.slate900} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  fallbackBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: defaultTheme.colors.slate200,
    backgroundColor: defaultTheme.colors.white,
    overflow: 'hidden',
  },
});
