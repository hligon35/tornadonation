import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { FlatList, Image, Pressable, View } from 'react-native';

import type { Sport } from '@tornado-nation/shared';
import { LabelText, Screen, Section } from '@tornado-nation/ui';
import { defaultTheme } from '@tornado-nation/ui';

import { api } from '../../../lib/api';

const teamTileImages: Record<string, any> = {
  baseball: require('../../../assets/team-tiles/baseball.png'),
  basketball: require('../../../assets/team-tiles/basketball.png'),
  bowling: require('../../../assets/team-tiles/bowling.png'),
  cheer: require('../../../assets/team-tiles/cheer.png'),
  'cross-country': require('../../../assets/team-tiles/cross-country.png'),
  football: require('../../../assets/team-tiles/football.png'),
  golf: require('../../../assets/team-tiles/golf.png'),
  lacrosse: require('../../../assets/team-tiles/lacrosse.png'),
  soccer: require('../../../assets/team-tiles/soccer.png'),
  softball: require('../../../assets/team-tiles/softball.png'),
  swim: require('../../../assets/team-tiles/swim.png'),
  tennis: require('../../../assets/team-tiles/tennis.png'),
  track: require('../../../assets/team-tiles/track.png'),
  volleyball: require('../../../assets/team-tiles/volleyball.png'),
  wrestling: require('../../../assets/team-tiles/wrestling.png'),
  generic: require('../../../assets/team-tiles/generic.png'),
};

const fallbackSports: Sport[] = [
  { id: 'baseball', name: 'Baseball', slug: 'baseball' },
  { id: 'basketball', name: 'Basketball', slug: 'basketball' },
  { id: 'bowling', name: 'Bowling', slug: 'bowling' },
  { id: 'cheer', name: 'Cheer', slug: 'cheer' },
  { id: 'cross-country', name: 'Cross Country', slug: 'cross-country' },
  { id: 'football', name: 'Football', slug: 'football' },
  { id: 'golf', name: 'Golf', slug: 'golf' },
  { id: 'lacrosse', name: 'Lacrosse', slug: 'lacrosse' },
  { id: 'soccer', name: 'Soccer', slug: 'soccer' },
  { id: 'softball', name: 'Softball', slug: 'softball' },
  { id: 'swim', name: 'Swim', slug: 'swim' },
  { id: 'tennis', name: 'Tennis', slug: 'tennis' },
  { id: 'track', name: 'Track & Field', slug: 'track' },
  { id: 'volleyball', name: 'Volleyball', slug: 'volleyball' },
  { id: 'wrestling', name: 'Wrestling', slug: 'wrestling' },
];

function iconForSportId(id: string): keyof typeof Ionicons.glyphMap {
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

export default function TeamsSportsListScreen() {
  const sportsQuery = useQuery({
    queryKey: ['sports'],
    queryFn: api.listSports,
  });

  const sports = sportsQuery.data ?? fallbackSports;

  return (
    <Screen>
      <Section title="Teams">
        {sportsQuery.isLoading ? <LabelText>Loading…</LabelText> : null}
        {sportsQuery.isError ? (
          <LabelText>API unavailable; showing placeholders.</LabelText>
        ) : null}

        <FlatList
          data={sports}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12, paddingTop: 4 }}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <Link href={`/(tabs)/teams/${item.id}`} asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${item.name} tile`}
                  style={({ pressed }) => ({
                    width: '100%',
                    aspectRatio: 1,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: defaultTheme.colors.slate200,
                    backgroundColor: defaultTheme.colors.white,
                    padding: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <View
                    accessibilityLabel={`${item.name} photo`}
                    style={{
                      width: '100%',
                      flex: 1,
                      borderRadius: 12,
                      overflow: 'hidden',
                      backgroundColor: defaultTheme.colors.slate200,
                      borderWidth: 1,
                      borderColor: defaultTheme.colors.slate200,
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      accessibilityLabel={`${item.name} image`}
                      source={teamTileImages[item.id] ?? teamTileImages.generic}
                      resizeMode="cover"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Ionicons name={iconForSportId(item.id)} size={18} color={defaultTheme.colors.slate900} />
                    <LabelText numberOfLines={1} style={{ textAlign: 'center', color: defaultTheme.colors.slate900 }}>
                      {item.name}
                    </LabelText>
                  </View>
                </Pressable>
              </Link>
            </View>
          )}
        />
      </Section>
    </Screen>
  );
}
