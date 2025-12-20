import { Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';

import type { GameEvent } from '@tornado-nation/shared';
import { Button, Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

import { api } from '../../../lib/api';

const fallbackEvents: GameEvent[] = [
  {
    id: 'event-1',
    title: 'Tornado Nation Game (Placeholder)',
    sportId: 'football',
    startTimeIso: new Date().toISOString(),
    status: 'Scheduled',
    level: 'Varsity',
    locationName: 'Home Field',
  },
];

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

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(iso: string) {
  const date = new Date(iso);
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function formatMonthDay(date: Date) {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function formatMonthDayYear(date: Date) {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function dayKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return hex;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function groupBySportId(items: GameEvent[]) {
  const groups = new Map<string, GameEvent[]>();
  for (const item of items) {
    const key = item.sportId ?? 'unknown';
    const existing = groups.get(key);
    if (existing) existing.push(item);
    else groups.set(key, [item]);
  }

  const ordered = Array.from(groups.entries())
    .map(([sportId, events]) => ({
      sportId,
      sportName: sportNameById[sportId] ?? titleCaseFromId(sportId),
      events: events.sort((a, b) => a.startTimeIso.localeCompare(b.startTimeIso)),
    }))
    .sort((a, b) => a.sportName.localeCompare(b.sportName));

  return ordered;
}

function mergeScheduleGroups(args: {
  daily: Array<{ sportId: string; sportName: string; events: GameEvent[] }>;
  weekly: Array<{ sportId: string; sportName: string; events: GameEvent[] }>;
}) {
  const merged = new Map<
    string,
    {
      sportId: string;
      sportName: string;
      dailyEvents: GameEvent[];
      weeklyEvents: GameEvent[];
    }
  >();

  for (const group of args.daily) {
    merged.set(group.sportId, {
      sportId: group.sportId,
      sportName: group.sportName,
      dailyEvents: group.events,
      weeklyEvents: [],
    });
  }

  for (const group of args.weekly) {
    const existing = merged.get(group.sportId);
    if (existing) {
      existing.weeklyEvents = group.events;
    } else {
      merged.set(group.sportId, {
        sportId: group.sportId,
        sportName: group.sportName,
        dailyEvents: [],
        weeklyEvents: group.events,
      });
    }
  }

  return Array.from(merged.values()).sort((a, b) => a.sportName.localeCompare(b.sportName));
}

export default function EventsScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const eventsQuery = useQuery({
    queryKey: ['events'],
    queryFn: api.listEvents,
  });

  const events = eventsQuery.data ?? fallbackEvents;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  // Calendar week (Sun–Sat)
  const startOfWeek = addDays(startOfToday, -startOfToday.getDay());
  const startOfNextWeek = addDays(startOfWeek, 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const dailyEvents = events
    .filter((eventItem) => {
      const start = new Date(eventItem.startTimeIso);
      return start >= startOfToday && start < startOfTomorrow;
    })
    .sort((a, b) => a.startTimeIso.localeCompare(b.startTimeIso));

  const weeklyEvents = events
    .filter((eventItem) => {
      const start = new Date(eventItem.startTimeIso);
      return start >= startOfWeek && start < startOfNextWeek;
    })
    .sort((a, b) => a.startTimeIso.localeCompare(b.startTimeIso));

  const eventsByDayKey = useMemo(() => {
    const map = new Map<string, GameEvent[]>();
    for (const eventItem of events) {
      const start = new Date(eventItem.startTimeIso);
      const key = dayKey(start);
      const existing = map.get(key);
      if (existing) existing.push(eventItem);
      else map.set(key, [eventItem]);
    }
    for (const [key, items] of map.entries()) {
      map.set(key, items.sort((a, b) => a.startTimeIso.localeCompare(b.startTimeIso)));
    }
    return map;
  }, [events]);

  const monthDays = useMemo(() => {
    const firstWeekday = startOfMonth.getDay();
    const cells: Array<Date | null> = [];
    for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
    for (let d = 0; d < daysInMonth; d += 1) cells.push(addDays(startOfMonth, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [startOfMonth, daysInMonth]);

  const dayGroups = groupBySportId(dailyEvents);
  const weekGroups = groupBySportId(weeklyEvents);
  const scheduleGroups = mergeScheduleGroups({ daily: dayGroups, weekly: weekGroups });

  // Screen uses padding; keep carousel pages inside that content width.
  const contentPadding = 16;
  const pageWidth = Math.max(0, windowWidth - contentPadding * 2);
  const calendarGap = defaultTheme.spacing.xs;
  const calendarCellWidth = Math.max(1, Math.floor((pageWidth - calendarGap * 6) / 7));

  return (
    <Screen title={undefined}>
      <Section title="Schedule">
        {eventsQuery.isLoading ? <LabelText>Loading…</LabelText> : null}
        {eventsQuery.isError ? <LabelText>API unavailable; showing placeholders.</LabelText> : null}

        {scheduleGroups.length === 0 ? <LabelText>No events today or this week.</LabelText> : null}

        {scheduleGroups.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: pageWidth * scheduleGroups.length }}
          >
            {scheduleGroups.map((group) => {
              const weekBuckets: Array<{ date: Date; label: string; events: GameEvent[] }> = Array.from(
                { length: 7 },
                (_, i) => {
                  const date = addDays(startOfWeek, i);
                  const label = date.toLocaleDateString(undefined, { weekday: 'short' });
                  return { date, label, events: [] };
                },
              );

              for (const eventItem of group.weeklyEvents) {
                const start = new Date(eventItem.startTimeIso);
                const dayIndex = Math.floor(
                  (new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime() -
                    startOfWeek.getTime()) /
                    (1000 * 60 * 60 * 24),
                );
                if (dayIndex >= 0 && dayIndex < 7) {
                  weekBuckets[dayIndex]?.events.push(eventItem);
                }
              }

              return (
                <View key={group.sportId} style={{ width: pageWidth, gap: 12 }}>
                  <Card accessibilityLabel={`${group.sportName} schedule`}>
                    <LabelText>{group.sportName}</LabelText>
                  </Card>

                  <Card accessibilityLabel={`${group.sportName} today schedule`}>
                    <LabelText
                      style={{
                        fontSize: defaultTheme.typography.h2.fontSize,
                        fontWeight: defaultTheme.typography.h2.fontWeight,
                        color: defaultTheme.colors.slate900,
                        textAlign: 'center',
                      }}
                    >
                      {formatMonthDayYear(startOfToday)}
                    </LabelText>
                    {group.dailyEvents.length === 0 ? <LabelText>No events today.</LabelText> : null}
                  </Card>

                  {group.dailyEvents.length ? (
                    <Card
                      accessibilityLabel={`${group.sportName} daily events`}
                      style={{
                        // Match the weekly day bucket container footprint.
                        width: Math.max(140, Math.floor(pageWidth / 3)),
                        alignSelf: 'flex-start',
                        padding: defaultTheme.spacing.md,
                      }}
                    >
                      <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 12 }}
                      >
                        {group.dailyEvents.map((eventItem) => (
                          <View
                            key={eventItem.id}
                            style={{
                              width:
                                Math.max(140, Math.floor(pageWidth / 3)) -
                                defaultTheme.spacing.md * 2,
                            }}
                          >
                            <Link href={`/(tabs)/events/game-center/${eventItem.id}`} asChild>
                              <Pressable
                                accessibilityRole="button"
                                accessibilityLabel={`Open ${eventItem.title} game center`}
                                style={({ pressed }) => ({
                                  width: '100%',
                                  aspectRatio: 1,
                                  borderWidth: 1,
                                  borderColor: defaultTheme.colors.slate200,
                                  borderRadius: defaultTheme.radius.md,
                                  backgroundColor: defaultTheme.colors.white,
                                  padding: defaultTheme.spacing.md,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  opacity: pressed ? 0.9 : 1,
                                })}
                              >
                                <View style={{ gap: 6, alignItems: 'center' }}>
                                  <LabelText
                                    numberOfLines={2}
                                    style={{
                                      color: defaultTheme.colors.slate900,
                                      fontWeight: '700',
                                      fontSize: 14,
                                      textAlign: 'center',
                                    }}
                                  >
                                    {eventItem.title}
                                  </LabelText>
                                  <LabelText style={{ fontSize: 13, color: defaultTheme.colors.slate900 }}>
                                    {formatTime(eventItem.startTimeIso)}
                                  </LabelText>
                                </View>
                              </Pressable>
                            </Link>
                          </View>
                        ))}
                      </ScrollView>
                    </Card>
                  ) : null}

                  <Card accessibilityLabel={`${group.sportName} this week schedule`}>
                    <LabelText
                      style={{
                        fontSize: defaultTheme.typography.h2.fontSize,
                        fontWeight: defaultTheme.typography.h2.fontWeight,
                        color: defaultTheme.colors.slate900,
                        textAlign: 'center',
                      }}
                    >
                      {formatMonthDay(startOfWeek)} – {formatMonthDay(addDays(startOfWeek, 6))}
                    </LabelText>
                  </Card>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10 }}
                  >
                    {weekBuckets.map((bucket) => {
                      const isToday =
                        bucket.date.getFullYear() === startOfToday.getFullYear() &&
                        bucket.date.getMonth() === startOfToday.getMonth() &&
                        bucket.date.getDate() === startOfToday.getDate();

                      const dayEvents = bucket.events.sort((a, b) => a.startTimeIso.localeCompare(b.startTimeIso));
                      const maxStripes = 4;
                      const extraCount = Math.max(0, dayEvents.length - maxStripes);

                      return (
                        <Pressable
                          key={bucket.date.toISOString()}
                          accessibilityRole="button"
                          accessibilityLabel={`${bucket.label} ${formatMonthDay(bucket.date)}: ${bucket.events.length} events`}
                          onPress={() => setSelectedDay(bucket.date)}
                          style={({ pressed }) => ({
                            width: Math.max(140, Math.floor(pageWidth / 3)),
                            borderWidth: 1,
                            borderColor: defaultTheme.colors.slate200,
                            borderRadius: defaultTheme.radius.md,
                            backgroundColor: defaultTheme.colors.white,
                            padding: defaultTheme.spacing.md,
                            opacity: pressed ? 0.9 : 1,
                          })}
                        >
                          <View style={{ gap: defaultTheme.spacing.xs }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                              }}
                            >
                              <LabelText
                                style={{
                                  color: isToday ? defaultTheme.colors.brandSecondary : undefined,
                                }}
                              >
                                {bucket.label}
                              </LabelText>
                              <LabelText style={{ fontSize: 12 }}>{bucket.date.getDate()}</LabelText>
                            </View>

                            <View style={{ gap: 6 }}>
                              {dayEvents.length === 0 ? (
                                <LabelText style={{ fontSize: 12 }}>No events</LabelText>
                              ) : null}

                              {dayEvents.slice(0, maxStripes).map((eventItem) => (
                                <View
                                  key={eventItem.id}
                                  style={{
                                    borderLeftWidth: 4,
                                    borderLeftColor: defaultTheme.colors.brandSecondary,
                                    backgroundColor: defaultTheme.colors.slate200,
                                    borderRadius: defaultTheme.radius.sm,
                                    paddingVertical: defaultTheme.spacing.xs,
                                    paddingHorizontal: defaultTheme.spacing.sm,
                                  }}
                                >
                                  <LabelText style={{ fontSize: 12 }}>{eventItem.title}</LabelText>
                                </View>
                              ))}

                              {extraCount > 0 ? (
                                <LabelText style={{ fontSize: 12 }}>+{extraCount} more</LabelText>
                              ) : null}
                            </View>
                          </View>
                        </Pressable>
                      );
                    })}
                  </ScrollView>

                  {group.weeklyEvents.length === 0 ? <LabelText>No events this week.</LabelText> : null}
                </View>
              );
            })}
          </ScrollView>
        ) : null}
      </Section>

      <Section title="Calendar">
        <Card accessibilityLabel="Monthly calendar">
          <LabelText
            style={{
              fontSize: defaultTheme.typography.h2.fontSize,
              fontWeight: defaultTheme.typography.h2.fontWeight,
              color: defaultTheme.colors.slate900,
              textAlign: 'center',
            }}
          >
            {startOfMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </LabelText>
        </Card>

        <View style={{ flexDirection: 'row' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label, idx) => (
            <View
              key={label}
              style={{
                width: calendarCellWidth,
                marginRight: idx === 6 ? 0 : calendarGap,
                alignItems: 'center',
              }}
            >
              <LabelText style={{ fontSize: 12 }}>{label}</LabelText>
            </View>
          ))}
        </View>

        <View style={{ gap: calendarGap }}>
          {Array.from({ length: Math.ceil(monthDays.length / 7) }, (_, weekIndex) => {
            const startIndex = weekIndex * 7;
            const week = monthDays.slice(startIndex, startIndex + 7);

            return (
              <View key={`week-${weekIndex}`} style={{ flexDirection: 'row' }}>
                {week.map((date, dayIndex) => {
                  const marginRight = dayIndex === 6 ? 0 : calendarGap;
                  const cellBaseStyle = {
                    width: calendarCellWidth,
                    minHeight: 72,
                    marginRight,
                  } as const;

                  if (!date) {
                    return <View key={`empty-${weekIndex}-${dayIndex}`} style={cellBaseStyle} />;
                  }

                  const key = dayKey(date);
                  const dayEvents = eventsByDayKey.get(key) ?? [];
                  const isToday =
                    date.getFullYear() === startOfToday.getFullYear() &&
                    date.getMonth() === startOfToday.getMonth() &&
                    date.getDate() === startOfToday.getDate();

                  const maxStripes = 3;
                  const extraCount = Math.max(0, dayEvents.length - maxStripes);

                  return (
                    <Pressable
                      key={key}
                      accessibilityRole="button"
                      accessibilityLabel={`${formatMonthDay(date)}. ${dayEvents.length} events. Tap to open day view.`}
                      onPress={() => setSelectedDay(date)}
                      style={({ pressed }) => [
                        cellBaseStyle,
                        {
                          borderWidth: 1,
                          borderColor: defaultTheme.colors.slate200,
                          borderRadius: defaultTheme.radius.sm,
                          backgroundColor: defaultTheme.colors.white,
                          padding: defaultTheme.spacing.xs,
                          opacity: pressed ? 0.9 : 1,
                        },
                      ]}
                    >
                      <View style={{ gap: calendarGap }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <LabelText
                            style={{
                              fontSize: 12,
                              color: isToday ? defaultTheme.colors.brandSecondary : undefined,
                            }}
                          >
                            {date.getDate()}
                          </LabelText>
                        </View>

                        <View style={{ gap: 4 }}>
                          {dayEvents.slice(0, maxStripes).map((eventItem) => (
                            <View
                              key={eventItem.id}
                              style={{
                                borderLeftWidth: 3,
                                borderLeftColor: defaultTheme.colors.brandSecondary,
                                backgroundColor: defaultTheme.colors.slate200,
                                borderRadius: defaultTheme.radius.sm,
                                paddingVertical: 2,
                                paddingHorizontal: 4,
                              }}
                            >
                              <LabelText style={{ fontSize: 11 }} numberOfLines={1}>
                                {eventItem.title}
                              </LabelText>
                            </View>
                          ))}
                          {extraCount > 0 ? <LabelText style={{ fontSize: 11 }}>+{extraCount}</LabelText> : null}
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            );
          })}
        </View>
      </Section>

      <Modal
        transparent
        visible={selectedDay != null}
        animationType="slide"
        onRequestClose={() => setSelectedDay(null)}
      >
        <Pressable
          onPress={() => setSelectedDay(null)}
          style={{
            flex: 1,
            backgroundColor: hexToRgba(defaultTheme.colors.slate900, 0.45),
            padding: defaultTheme.spacing.lg,
            justifyContent: 'flex-end',
          }}
        >
          <Pressable
            onPress={() => null}
            style={{
              borderRadius: defaultTheme.radius.lg,
              backgroundColor: defaultTheme.colors.white,
              borderWidth: 1,
              borderColor: defaultTheme.colors.slate200,
              padding: defaultTheme.spacing.lg,
              maxHeight: '80%',
              gap: defaultTheme.spacing.md,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <LabelText>
                {selectedDay
                  ? selectedDay.toLocaleDateString(undefined, {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })
                  : ''}
              </LabelText>
              <Button label="Close" hint="Close day view" onPress={() => setSelectedDay(null)} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {selectedDay ? (
                (eventsByDayKey.get(dayKey(selectedDay)) ?? []).length === 0 ? (
                  <Card accessibilityLabel="No events">
                    <LabelText>No events scheduled.</LabelText>
                  </Card>
                ) : (
                  (eventsByDayKey.get(dayKey(selectedDay)) ?? []).map((eventItem) => (
                    <Card key={eventItem.id} accessibilityLabel={`Event ${eventItem.title} in day view`}>
                      <LabelText>{eventItem.title}</LabelText>
                      <LabelText>
                        {sportNameById[eventItem.sportId] ?? titleCaseFromId(eventItem.sportId)}
                      </LabelText>
                      <LabelText>{formatTime(eventItem.startTimeIso)}</LabelText>
                    </Card>
                  ))
                )
              ) : null}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}
