import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

function iconForTeamId(id: string): keyof typeof Ionicons.glyphMap {
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

type StreamStatus = 'live' | 'scheduled';

type TeamStream = {
  id: string;
  teamId: string;
  status: StreamStatus;
  startTimeIso: string;
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
    },
    {
      id: 'stream-basketball-next',
      teamId: 'basketball',
      status: 'scheduled',
      startTimeIso: addHours(now, 3).toISOString(),
    },
    {
      id: 'stream-soccer-next',
      teamId: 'soccer',
      status: 'scheduled',
      startTimeIso: addHours(now, 28).toISOString(),
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
    const nextStream = nextScheduledByTeamId.get(team.id);
    const nextLabel = nextStream ? formatDateTimeShort(nextStream.startTimeIso) : 'No upcoming stream';

    return (
      <Link key={team.id} href={`/(tabs)/live/${team.id}`} asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${team.name} live section`}
          style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
        >
          <Card style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <LabelText style={{ fontSize: 12, textAlign: 'right' }}>{nextLabel}</LabelText>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    overflow: 'hidden',
                    backgroundColor: defaultTheme.colors.slate200,
                    borderWidth: 1,
                    borderColor: defaultTheme.colors.slate200,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons
                    accessibilityLabel={`${team.name} icon`}
                    name={iconForTeamId(team.id)}
                    size={24}
                    color={defaultTheme.colors.slate900}
                  />
                </View>

                <LabelText style={{ flexShrink: 1 }}>{team.name}</LabelText>
              </View>

              <View
                accessibilityLabel={`${team.name} video thumbnail`}
                style={{
                  width: 140,
                  aspectRatio: 16 / 9,
                  borderRadius: 12,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: defaultTheme.colors.slate200,
                  backgroundColor: defaultTheme.colors.slate200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <LabelText style={{ fontSize: 12 }}>Video</LabelText>
              </View>
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
