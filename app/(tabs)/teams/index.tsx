import { Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { FlatList, Pressable, Text, View } from 'react-native';

import type { Sport } from '@tornado-nation/shared';
import { LabelText, Screen } from '@tornado-nation/ui';
import { defaultTheme } from '@tornado-nation/ui';

import { api } from '../../../lib/api';
import SportBadge from '../../../components/SportBadge';

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

function badgeLabelLines(label: string): string[] {
  const upper = label.toUpperCase().trim();
  const parts = upper.split(/\s+/).filter(Boolean);
  // Single word stays on one line; multi-word stacks (one per line).
  return parts.length <= 1 ? [upper] : parts;
}

function computeUniformFontSizes(items: Array<{ name: string }>) {
  const maxWidth = BADGE_SIZE * 0.92;
  const maxHeight = BADGE_SIZE * 0.78;
  const letterSpacing = 1;
  const estimatedCharWidth = 0.62;
  const lineHeightFactor = 1.05;

  const maxLineLenByLines: Record<number, number> = { 1: 1, 2: 1, 3: 1 };
  for (const item of items) {
    const lines = badgeLabelLines(item.name);
    const key = Math.min(3, Math.max(1, lines.length));
    const longest = Math.max(...lines.map((l) => l.length), 1);
    maxLineLenByLines[key] = Math.max(maxLineLenByLines[key] ?? 1, longest);
  }

  const targetByLines: Record<number, number> = { 1: 52, 2: 44, 3: 36 };
  const result: Record<number, number> = {};

  for (const key of [1, 2, 3]) {
    const longestLineLen = maxLineLenByLines[key] ?? 1;
    const widthLimited =
      (maxWidth - letterSpacing * Math.max(0, longestLineLen - 1)) / (estimatedCharWidth * longestLineLen);
    const heightLimited = maxHeight / (key * lineHeightFactor);
    const limited = Math.floor(Math.min(targetByLines[key], widthLimited, heightLimited));
    result[key] = Math.max(18, limited);
  }

  return result;
}

export default function TeamsSportsListScreen() {
  const sportsQuery = useQuery({
    queryKey: ['sports'],
    queryFn: api.listSports,
  });

  const sports = sportsQuery.data ?? fallbackSports;
  const uniformFontSizes = computeUniformFontSizes(sports);

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
                    <SportBadge sportId={item.id} size={BADGE_SIZE} />
                    {(() => {
                      const lines = badgeLabelLines(item.name);
                      const fontSize = uniformFontSizes[Math.min(3, Math.max(1, lines.length))] ?? 18;
                      const text = lines.join('\n');
                      const isSingleWord = lines.length === 1;

                      return (
                        <View
                          pointerEvents="none"
                          style={{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: BADGE_SIZE * 0.95,
                          }}
                        >
                          <Text
                            accessibilityLabel={`${item.name} label`}
                            numberOfLines={isSingleWord ? 1 : lines.length}
                            style={{
                              fontSize,
                              fontWeight: '800',
                              letterSpacing: 1,
                              lineHeight: Math.round(fontSize * 1.05),
                              textAlign: 'center',
                              color: defaultTheme.colors.slate900,
                              maxWidth: BADGE_SIZE * 0.92,
                            }}
                          >
                            {text}
                          </Text>
                        </View>
                      );
                    })()}
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
