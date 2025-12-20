import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

type Params = { sportId: string; seasonId: string };

const sportNameById: Record<string, string> = {
  baseball: 'Baseball',
  basketball: 'Basketball',
  bowling: 'Bowling',
  cheer: 'Cheer',
  'cross-country': 'Cross Country',
  football: 'Football',
  golf: 'Golf',
  lacrosse: 'Lacrosse',
  soccer: 'Soccer',
  softball: 'Softball',
  swim: 'Swim',
  tennis: 'Tennis',
  track: 'Track & Field',
  volleyball: 'Volleyball',
  wrestling: 'Wrestling',
};

function titleCaseFromId(id: string) {
  return id
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const teamTileImages: Record<string, any> = {
  baseball: require('../../../../assets/team-tiles/baseball.png'),
  basketball: require('../../../../assets/team-tiles/basketball.png'),
  bowling: require('../../../../assets/team-tiles/bowling.png'),
  cheer: require('../../../../assets/team-tiles/cheer.png'),
  'cross-country': require('../../../../assets/team-tiles/cross-country.png'),
  football: require('../../../../assets/team-tiles/football.png'),
  golf: require('../../../../assets/team-tiles/golf.png'),
  lacrosse: require('../../../../assets/team-tiles/lacrosse.png'),
  soccer: require('../../../../assets/team-tiles/soccer.png'),
  softball: require('../../../../assets/team-tiles/softball.png'),
  swim: require('../../../../assets/team-tiles/swim.png'),
  tennis: require('../../../../assets/team-tiles/tennis.png'),
  track: require('../../../../assets/team-tiles/track.png'),
  volleyball: require('../../../../assets/team-tiles/volleyball.png'),
  wrestling: require('../../../../assets/team-tiles/wrestling.png'),
  generic: require('../../../../assets/team-tiles/generic.png'),
};

function CollapsibleSection(props: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  accessibilityLabel: string;
}) {
  return (
    <Card accessibilityLabel={props.accessibilityLabel} style={{ gap: 10 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${props.title} ${props.expanded ? 'collapse' : 'expand'}`}
        onPress={props.onToggle}
        style={({ pressed }) => ({
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <LabelText>{props.title}</LabelText>
        <LabelText style={{ fontSize: 12 }}>{props.expanded ? 'Hide' : 'Show'}</LabelText>
      </Pressable>

      {props.expanded ? <View style={{ gap: 8 }}>{props.children}</View> : null}
    </Card>
  );
}

export default function TeamSeasonScreen() {
  const { sportId, seasonId } = useLocalSearchParams<Params>();

  const sportName = sportNameById[sportId] ?? titleCaseFromId(sportId);
  const seasonLabel = `${seasonId} Season`;

  const [rosterExpanded, setRosterExpanded] = useState(true);
  const [statsExpanded, setStatsExpanded] = useState(false);

  const roster = useMemo(
    () => [
      { name: 'Player One', position: 'QB', grade: 'Sr' },
      { name: 'Player Two', position: 'RB', grade: 'Jr' },
      { name: 'Player Three', position: 'WR', grade: 'So' },
      { name: 'Player Four', position: 'LB', grade: 'Fr' },
    ],
    [],
  );

  return (
    <Screen title={sportName}>
      <Section title={seasonLabel}>
        <Card accessibilityLabel="Season roster and stats" style={{ gap: 12 }}>
          <View
            accessibilityLabel={`${sportName} season team photo`}
            style={{
              width: '100%',
              aspectRatio: 16 / 9,
              borderRadius: defaultTheme.radius.md,
              overflow: 'hidden',
              backgroundColor: defaultTheme.colors.slate200,
              borderWidth: 1,
              borderColor: defaultTheme.colors.slate200,
            }}
          >
            <Image
              source={teamTileImages[sportId] ?? teamTileImages.generic}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <CollapsibleSection
            title="Roster"
            expanded={rosterExpanded}
            onToggle={() => setRosterExpanded((prev) => !prev)}
            accessibilityLabel="Roster dropdown"
          >
            {roster.map((player) => (
              <Card
                key={`${player.name}-${player.position}`}
                accessibilityLabel={`${player.name} roster row`}
                style={{
                  padding: defaultTheme.spacing.sm,
                  backgroundColor: defaultTheme.colors.white,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                  <LabelText>{player.name}</LabelText>
                  <LabelText style={{ fontSize: 12 }}>
                    {player.position} • {player.grade}
                  </LabelText>
                </View>
              </Card>
            ))}
          </CollapsibleSection>

          <CollapsibleSection
            title="Stats"
            expanded={statsExpanded}
            onToggle={() => setStatsExpanded((prev) => !prev)}
            accessibilityLabel="Stats dropdown"
          >
            <LabelText style={{ fontSize: 12 }}>Season stats placeholder.</LabelText>
            <Card accessibilityLabel="Stats placeholder" style={{ gap: 6, padding: defaultTheme.spacing.sm }}>
              <LabelText style={{ fontSize: 12 }}>Record: 0–0</LabelText>
              <LabelText style={{ fontSize: 12 }}>Points For: 0</LabelText>
              <LabelText style={{ fontSize: 12 }}>Points Against: 0</LabelText>
            </Card>
          </CollapsibleSection>
        </Card>
      </Section>
    </Screen>
  );
}
