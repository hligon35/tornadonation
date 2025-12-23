import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, type Href } from 'expo-router';
import React from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import { Card, LabelText, Screen, Section, defaultTheme } from '@tornado-nation/ui';

import SportBadge from '../../../components/SportBadge';

type QuickAction = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
};

const QUICK_ACTIONS_STORAGE_KEY = 'home.quickActions.v1';

const ALL_ACTIONS: QuickAction[] = [
  { id: 'tabs.events', title: 'Events', icon: 'calendar-outline', href: '/(tabs)/events' },
  { id: 'tabs.live', title: 'Live', icon: 'play-circle-outline', href: '/(tabs)/live' },
  { id: 'tabs.store', title: 'Store', icon: 'cart-outline', href: '/(tabs)/store' },
  { id: 'tabs.teams', title: 'Teams', icon: 'people-outline', href: '/(tabs)/teams' },

  { id: 'store.cart', title: 'Cart', icon: 'cart-outline', href: '/(tabs)/store/cart' },
  { id: 'store.checkout', title: 'Checkout', icon: 'card-outline', href: '/(tabs)/store/checkout' },
  { id: 'store.orders', title: 'Store Orders', icon: 'receipt-outline', href: '/(tabs)/store/orders' },

  { id: 'profile', title: 'Profile', icon: 'person-circle-outline', href: '/profile' },
  { id: 'profile.passes', title: 'Passes', icon: 'ticket-outline', href: '/profile/passes' },
  { id: 'profile.memberships', title: 'Memberships', icon: 'id-card-outline', href: '/profile/memberships' },
  { id: 'profile.orders', title: 'Orders', icon: 'receipt-outline', href: '/profile/orders' },
  { id: 'profile.notifications', title: 'Notifications', icon: 'notifications-outline', href: '/profile/notifications' },
  { id: 'profile.settings', title: 'Settings', icon: 'settings-outline', href: '/profile/settings' },
  { id: 'profile.settings.account', title: 'Account Info', icon: 'person-outline', href: '/profile/settings/account-info' },
  { id: 'profile.settings.theme', title: 'App Theme', icon: 'color-palette-outline', href: '/profile/settings/app-theme' },
  { id: 'profile.settings.favorites', title: 'Favorite Teams', icon: 'heart-outline', href: '/profile/settings/favorite-teams' },
  { id: 'profile.settings.help', title: 'Help & Support', icon: 'help-circle-outline', href: '/profile/settings/help-support' },
  { id: 'profile.settings.payments', title: 'Payment Methods', icon: 'card-outline', href: '/profile/settings/payment-methods' },
  { id: 'profile.settings.privacy', title: 'Privacy', icon: 'lock-closed-outline', href: '/profile/settings/privacy-permissions' },
  { id: 'profile.settings.terms', title: 'Terms & Policies', icon: 'document-text-outline', href: '/profile/settings/terms-policies' },

  { id: 'community', title: 'Community', icon: 'people-circle-outline', href: '/community' },
  { id: 'community.donations', title: 'Donations', icon: 'gift-outline', href: '/community/donations' },
  { id: 'community.sponsors', title: 'Sponsors', icon: 'ribbon-outline', href: '/community/sponsors' },
  { id: 'community.volunteer', title: 'Volunteer', icon: 'hand-left-outline', href: '/community/volunteer' },

  { id: 'history', title: 'History', icon: 'time-outline', href: '/history' },
  { id: 'history.gallery', title: 'Gallery', icon: 'images-outline', href: '/history/gallery' },
  { id: 'history.hof', title: 'Hall of Fame', icon: 'trophy-outline', href: '/history/hall-of-fame' },
  { id: 'history.records', title: 'Records', icon: 'podium-outline', href: '/history/records' },
];

const DEFAULT_ACTION_IDS: string[] = ['tabs.events', 'tabs.live', 'tabs.store', 'tabs.teams'];

const FAVORITE_TEAMS: Array<{ id: string; name: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { id: 'football', name: 'Football', icon: 'american-football-outline' },
  { id: 'basketball', name: 'Basketball', icon: 'basketball-outline' },
  { id: 'soccer', name: 'Soccer', icon: 'football-outline' },
];

const TICKER_ITEMS: string[] = [
  'TORNADO 28 — 14 RIVALS (Final)',
  'Girls Soccer 2 — 1 Central (FT)',
  'Volleyball: 3 — 0 West (FT)',
  'Next: Basketball @ East • 7:30 PM',
];

function QuickActionTile(props: { action: QuickAction; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.action.title}
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.quickActionTile,
        {
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Card style={styles.quickActionCard}>
        <View style={styles.quickActionRow}>
          <Ionicons name={props.action.icon} size={22} color={defaultTheme.colors.slate900} />
        </View>
        <LabelText style={styles.quickActionLabel}>{props.action.title}</LabelText>
      </Card>
    </Pressable>
  );
}

function QuickActionListRow(props: { action: QuickAction; selected: boolean; onToggle: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Toggle ${props.action.title}`}
      onPress={props.onToggle}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <Card style={styles.quickActionListCard}>
        <View style={styles.quickActionListLeft}>
          <Ionicons name={props.action.icon} size={22} color={defaultTheme.colors.slate900} />
          <LabelText numberOfLines={1} style={styles.quickActionListLabel}>
            {props.action.title}
          </LabelText>
        </View>
        <Ionicons
          name={props.selected ? 'checkmark-circle' : 'add-circle-outline'}
          size={22}
          color={props.selected ? defaultTheme.colors.brandSecondary : defaultTheme.colors.slate500}
        />
      </Card>
    </Pressable>
  );
}

function ScoreTicker(props: { items: string[] }) {
  const translateX = React.useRef(new Animated.Value(0)).current;
  const [singleWidth, setSingleWidth] = React.useState(0);

  React.useEffect(() => {
    if (!singleWidth) return;

    translateX.setValue(0);

    const anim = Animated.loop(
      Animated.timing(translateX, {
        toValue: -singleWidth,
        duration: 18000,
        useNativeDriver: true,
      }),
    );

    anim.start();
    return () => anim.stop();
  }, [singleWidth, translateX]);

  return (
    <View style={styles.tickerViewport} accessibilityLabel="Score ticker">
      <Animated.View style={[styles.tickerTrack, { transform: [{ translateX }] }]}>
        <View
          style={styles.tickerRow}
          onLayout={(e) => {
            const w = e.nativeEvent.layout.width;
            if (w && w !== singleWidth) setSingleWidth(w);
          }}
        >
          {props.items.map((t) => (
            <View key={`a:${t}`} style={styles.tickerItem}>
              <LabelText style={styles.tickerText}>{t}</LabelText>
            </View>
          ))}
        </View>
        <View style={styles.tickerRow}>
          {props.items.map((t) => (
            <View key={`b:${t}`} style={styles.tickerItem}>
              <LabelText style={styles.tickerText}>{t}</LabelText>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [customizing, setCustomizing] = React.useState(false);
  const [selectedActionIds, setSelectedActionIds] = React.useState<string[]>(DEFAULT_ACTION_IDS);

  const validIdSet = React.useMemo(() => new Set(ALL_ACTIONS.map((a) => a.id)), []);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(QUICK_ACTIONS_STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return;

        const ids = parsed.filter((x): x is string => {
          return typeof x === 'string' && validIdSet.has(x);
        });

        // Back-compat for the earlier v1 ids.
        const migrated = ids
          .map((id) => {
            if (id === 'events') return 'tabs.events';
            if (id === 'live') return 'tabs.live';
            if (id === 'store') return 'tabs.store';
            if (id === 'teams') return 'tabs.teams';
            return id;
          })
          .filter((id, idx, arr) => arr.indexOf(id) === idx);

        if (!cancelled && migrated.length) setSelectedActionIds(migrated);
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const persist = React.useCallback(async (ids: string[]) => {
    try {
      await AsyncStorage.setItem(QUICK_ACTIONS_STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore
    }
  }, []);

  const toggleActionId = React.useCallback(
    (actionId: string) => {
      const isSelected = selectedActionIds.includes(actionId);
      const next = isSelected
        ? selectedActionIds.filter((id) => id !== actionId)
        : [...selectedActionIds, actionId];

      setSelectedActionIds(next);
      persist(next);
    },
    [persist, selectedActionIds],
  );

  const onPressAction = React.useCallback(
    (action: QuickAction) => {
      if (customizing) return;
      router.push(action.href);
    },
    [customizing, router],
  );

  const visibleActions = React.useMemo(() => {
    return ALL_ACTIONS.filter((a) => selectedActionIds.includes(a.id));
  }, [selectedActionIds]);

  return (
    <Screen>
      <Section title="Scores">
        <Card style={{ padding: defaultTheme.spacing.sm }}>
          <ScoreTicker items={TICKER_ITEMS} />
        </Card>
      </Section>

      <Section
        title="Quick Actions"
        right={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={customizing ? 'Done customizing quick actions' : 'Customize quick actions'}
            onPress={() => setCustomizing((v) => !v)}
            hitSlop={8}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <Ionicons
              name={customizing ? 'checkmark' : 'options-outline'}
              size={20}
              color={defaultTheme.colors.slate900}
            />
          </Pressable>
        }
      >
        {customizing ? (
          <ScrollView
            style={{ maxHeight: Math.max(240, Math.floor(height * 0.45)) }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsList}
          >
            {ALL_ACTIONS.map((a) => (
              <QuickActionListRow
                key={a.id}
                action={a}
                selected={selectedActionIds.includes(a.id)}
                onToggle={() => toggleActionId(a.id)}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.quickActionsGrid}>
            {visibleActions.map((a) => (
              <QuickActionTile key={a.id} action={a} onPress={() => onPressAction(a)} />
            ))}
          </View>
        )}
      </Section>

      <Section title="Favorite Teams">
        <ScrollCardCarousel cardWidth={Math.max(280, width - defaultTheme.spacing.lg * 2)} />
      </Section>
    </Screen>
  );
}

function ScrollCardCarousel(props: { cardWidth: number }) {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: defaultTheme.spacing.md }}
        >
          {FAVORITE_TEAMS.map((team) => (
            <Card
              key={team.id}
              accessibilityLabel={`${team.name} favorite team`}
              style={[styles.favoriteCard, { width: props.cardWidth, minHeight: 260 }]}
            >
              <View style={styles.favoriteImage} accessibilityLabel={`${team.name} badge`}>
                <SportBadge sportId={team.id} size={120} />
              </View>
              <View style={{ padding: defaultTheme.spacing.md, gap: 4 }}>
                <LabelText style={styles.favoriteName}>{team.name}</LabelText>
                <LabelText>Tap Teams to view schedules</LabelText>
              </View>
            </Card>
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionsList: {
    gap: defaultTheme.spacing.sm,
  },
  quickActionTile: {
    width: '48%',
    marginBottom: defaultTheme.spacing.sm,
  },
  quickActionCard: {
    gap: 8,
  },
  quickActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickActionLabel: {
    color: defaultTheme.colors.slate900,
    fontWeight: '700',
  },
  quickActionListCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: defaultTheme.spacing.md,
  },
  quickActionListLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: defaultTheme.spacing.sm,
    flexShrink: 1,
  },
  quickActionListLabel: {
    color: defaultTheme.colors.slate900,
    fontWeight: '600',
    flexShrink: 1,
  },
  favoriteCard: {
    padding: 0,
    marginRight: defaultTheme.spacing.md,
    overflow: 'hidden',
  },
  favoriteImage: {
    width: '100%',
    height: 180,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteName: {
    color: defaultTheme.colors.slate900,
    fontWeight: '700',
  },
  tickerViewport: {
    overflow: 'hidden',
    width: '100%',
  },
  tickerTrack: {
    flexDirection: 'row',
  },
  tickerRow: {
    flexDirection: 'row',
  },
  tickerItem: {
    paddingHorizontal: defaultTheme.spacing.md,
    paddingVertical: defaultTheme.spacing.xs,
  },
  tickerText: {
    color: defaultTheme.colors.slate900,
    fontWeight: '600',
  },
});
