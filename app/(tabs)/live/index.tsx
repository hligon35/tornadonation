import { Link } from 'expo-router';
import { Image, Pressable, View } from 'react-native';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

const teams = [
  { id: 'baseball', name: 'Baseball' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'bowling', name: 'Bowling' },
  { id: 'cheer', name: 'Cheer' },
  { id: 'cross-country', name: 'Cross Country' },
  { id: 'football', name: 'Football' },
  { id: 'golf', name: 'Golf' },
  { id: 'lacrosse', name: 'Lacrosse' },
  { id: 'soccer', name: 'Soccer' },
  { id: 'softball', name: 'Softball' },
  { id: 'swim', name: 'Swim' },
  { id: 'tennis', name: 'Tennis' },
  { id: 'track', name: 'Track & Field' },
  { id: 'volleyball', name: 'Volleyball' },
  { id: 'wrestling', name: 'Wrestling' },
];

const badgeForTeamId: Partial<Record<(typeof teams)[number]['id'], any>> = {
  baseball: require('../../../assets/badges/baseball.png'),
  basketball: require('../../../assets/badges/basketball.png'),
  bowling: require('../../../assets/badges/bowling.png'),
  cheer: require('../../../assets/badges/cheer.png'),
  football: require('../../../assets/badges/football.png'),
  golf: require('../../../assets/badges/golf.png'),
  lacrosse: require('../../../assets/badges/lacrosse.png'),
  soccer: require('../../../assets/badges/soccer.png'),
  softball: require('../../../assets/badges/softball.png'),
  swim: require('../../../assets/badges/swim.png'),
  tennis: require('../../../assets/badges/tennis.png'),
  track: require('../../../assets/badges/track.png'),
  volleyball: require('../../../assets/badges/volleyball.png'),
  wrestling: require('../../../assets/badges/wrestling.png'),
};

type StreamStatus = 'live' | 'scheduled';

type TeamStream = {
  id: string;
  teamId: string;
  status: StreamStatus;
  startTimeIso: string;
  opponent: string;
};

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function formatDateTimeShort(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function LiveScreen() {
  const now = new Date();
  // Placeholder feed until API wiring. Keep UX stable.
  const streams: TeamStream[] = [
    {
      id: 'stream-football-live',
      teamId: 'football',
      status: 'live',
      startTimeIso: addHours(now, -1).toISOString(),
      opponent: 'Riverton',
    },
    {
      id: 'stream-basketball-next',
      teamId: 'basketball',
      status: 'scheduled',
      startTimeIso: addHours(now, 3).toISOString(),
      opponent: 'Central',
    },
    {
      id: 'stream-soccer-next',
      teamId: 'soccer',
      status: 'scheduled',
      startTimeIso: addHours(now, 28).toISOString(),
      opponent: 'Westview',
    },
  ];

  const liveTeamIds = new Set(streams.filter((s) => s.status === 'live').map((s) => s.teamId));

  const nextScheduledByTeamId = new Map<string, TeamStream>();
  for (const stream of streams) {
    if (stream.status !== 'scheduled') continue;
    const start = new Date(stream.startTimeIso);
    if (start <= now) continue;
    const existing = nextScheduledByTeamId.get(stream.teamId);
    if (!existing || new Date(existing.startTimeIso) > start) {
      nextScheduledByTeamId.set(stream.teamId, stream);
    }
  }

  const liveTeams = teams.filter((t) => liveTeamIds.has(t.id));
  const nextUpTeams = teams
    .filter((t) => !liveTeamIds.has(t.id) && nextScheduledByTeamId.has(t.id))
    .sort((a, b) => {
      const aIso = nextScheduledByTeamId.get(a.id)!.startTimeIso;
      const bIso = nextScheduledByTeamId.get(b.id)!.startTimeIso;
      return aIso.localeCompare(bIso);
    });

  const renderTeamRow = (team: (typeof teams)[number]) => {
    const liveStream = streams.find((s) => s.teamId === team.id && s.status === 'live');
    const nextStream = nextScheduledByTeamId.get(team.id);
    const stream = liveStream ?? nextStream;
    const dateLabel = stream ? formatDateTimeShort(stream.startTimeIso) : 'No upcoming stream';
    const opponentLabel = stream ? `VS ${stream.opponent}` : 'VS TBA';
    const badgeSource = badgeForTeamId[team.id];
    const cardTextStyle = { fontWeight: '700' as const };
    const streamHref = stream ? (`/(tabs)/live/${stream.id}` as const) : (`/(tabs)/live/${team.id}` as const);

    return (
      <Link key={team.id} href={streamHref} asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${team.name} stream details`}
          style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
        >
          <Card style={{ flexDirection: 'row', alignItems: 'stretch', gap: 12 }}>
            <View style={{ flex: 1, gap: 10 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View
                  accessibilityLabel={`${team.name} matchup badge`}
                  style={{
                    width: 160,
                    height: 90,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {badgeSource ? (
                    <Image
                      source={badgeSource}
                      resizeMode="contain"
                      style={{ width: 160, height: 160, opacity: 0.35 }}
                    />
                  ) : null}

                  <View
                    pointerEvents="none"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <LabelText style={[{ textAlign: 'center' }, cardTextStyle]}>{opponentLabel}</LabelText>
                    <LabelText style={[{ fontSize: 12, textAlign: 'center' }, cardTextStyle]}>
                      {dateLabel}
                    </LabelText>
                  </View>
                </View>
              </View>
            </View>

            <View
              accessibilityLabel={`${team.name} video thumbnail`}
              style={{
                width: 140,
                height: 120,
                borderRadius: 12,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: defaultTheme.colors.slate200,
                backgroundColor: defaultTheme.colors.slate200,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LabelText style={[{ fontSize: 12 }, cardTextStyle]}>Video</LabelText>
            </View>
          </Card>
        </Pressable>
      </Link>
    );
  };

  return (
    <Screen>
      <Section title="Live Now">
        {liveTeams.length === 0 ? <LabelText>No live streams right now.</LabelText> : null}
        {liveTeams.map(renderTeamRow)}
      </Section>

      <Section title="Next Up">
        {nextUpTeams.length === 0 ? <LabelText>No upcoming streams scheduled.</LabelText> : null}
        {nextUpTeams.map(renderTeamRow)}
      </Section>
    </Screen>
  );
}
