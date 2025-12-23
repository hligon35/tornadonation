import { Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { FlatList, Image, Pressable, View, type ImageSourcePropType } from 'react-native';

import type { Sport } from '@tornado-nation/shared';
import { LabelText, Screen } from '@tornado-nation/ui';
import { defaultTheme } from '@tornado-nation/ui';

import { api } from '../../../lib/api';

const teamBadgeSourceBySportId: Record<string, ImageSourcePropType> = {
  baseball: require('../../../assets/sportsIcons/baseball.png'),
  basketball: require('../../../assets/sportsIcons/basketball.png'),
  bowling: require('../../../assets/sportsIcons/bowling.png'),
  cheer: require('../../../assets/sportsIcons/cheer.png'),
  football: require('../../../assets/sportsIcons/football.png'),
  golf: require('../../../assets/sportsIcons/golf.png'),
  lacrosse: require('../../../assets/sportsIcons/lacrosse.png'),
  soccer: require('../../../assets/sportsIcons/soccer.png'),
  softball: require('../../../assets/sportsIcons/softball.png'),
  swim: require('../../../assets/sportsIcons/swim.png'),
  tennis: require('../../../assets/sportsIcons/tennis.png'),
  track: require('../../../assets/sportsIcons/track&field.png'),
  volleyball: require('../../../assets/sportsIcons/volleyball.png'),
  wrestling: require('../../../assets/sportsIcons/wrestling.png'),
};

const BADGE_SIZE = 125;

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

export default function TeamsSportsListScreen() {
  const sportsQuery = useQuery({
    queryKey: ['sports'],
    queryFn: api.listSports,
  });

  const sports = sportsQuery.data ?? fallbackSports;

  return (
    <Screen>
      <View style={{ gap: defaultTheme.spacing.sm }}>
        {sportsQuery.isLoading ? <LabelText>Loading…</LabelText> : null}
        {sportsQuery.isError ? <LabelText>API unavailable; showing placeholders.</LabelText> : null}

        <FlatList
          data={sports}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ gap: 40, justifyContent: 'center' }}
          contentContainerStyle={{ gap: 12, paddingTop: 4 }}
          renderItem={({ item }) => (
            <View style={{ width: '40%' }}>
              <Link href={`/(tabs)/teams/${item.id}`} asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${item.name} badge`}
                  style={({ pressed }) => ({
                    width: '100%',
                    aspectRatio: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <View style={{ width: BADGE_SIZE, height: BADGE_SIZE, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      accessibilityLabel="Sport icon"
                      source={teamBadgeSourceBySportId[item.id]}
                      resizeMode="contain"
                      style={{ width: BADGE_SIZE, height: BADGE_SIZE }}
                    />
                  </View>
                </Pressable>
              </Link>
            </View>
          )}
        />
      </View>
    </Screen>
  );
}
