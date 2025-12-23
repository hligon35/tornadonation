import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Image, Pressable, type ImageSourcePropType } from 'react-native';

import { defaultTheme } from '@tornado-nation/ui';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

const navIconTeams = require('../../assets/navIcons/teams.png');
const navIconEvents = require('../../assets/navIcons/events.png');
const navIconHome = require('../../assets/navIcons/home.png');
const navIconLive = require('../../assets/navIcons/live.png');
const navIconStore = require('../../assets/navIcons/store.png');

// When you add separate active assets later, replace these with e.g.
// require('../../assets/navIcons/teams-active.png') etc.
const navIconTeamsActive = navIconTeams;
const navIconEventsActive = navIconEvents;
const navIconHomeActive = navIconHome;
const navIconLiveActive = navIconLive;
const navIconStoreActive = navIconStore;

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  focused: boolean;
  source: ImageSourcePropType;
  activeSource: ImageSourcePropType;
}) {
  return (
    <Image
      source={props.focused ? props.activeSource : props.source}
      resizeMode="contain"
      style={{ width: 28, height: 28, marginBottom: -3, opacity: props.focused ? 1 : 0.75 }}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: defaultTheme.colors.brandSecondary,
        },
        tabBarActiveTintColor: defaultTheme.colors.slate500,
        tabBarInactiveTintColor: defaultTheme.colors.slate900,
        headerTitleAlign: 'center',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: defaultTheme.colors.brandSecondary,
        },
        headerTintColor: defaultTheme.colors.slate900,
        headerTitleStyle: {
          color: defaultTheme.colors.slate900,
        },
        headerRight: () => (
          <Link href="/profile" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open profile"
              hitSlop={10}
              style={{ paddingHorizontal: 12 }}
            >
              {({ pressed }) => (
                <FontAwesome
                  name="user"
                  size={22}
                  color={defaultTheme.colors.slate900}
                  style={{ opacity: pressed ? 0.6 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconTeams} activeSource={navIconTeamsActive} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconEvents} activeSource={navIconEventsActive} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconHome} activeSource={navIconHomeActive} />
          ),
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconLive} activeSource={navIconLiveActive} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconStore} activeSource={navIconStoreActive} />
          ),
        }}
      />
    </Tabs>
  );
}
