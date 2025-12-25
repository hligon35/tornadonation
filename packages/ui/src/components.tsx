import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  type PressableProps,
  type TextProps,
  type ViewProps,
} from 'react-native';

import { defaultTheme } from './theme';

export function Screen(props: { title?: string; children?: React.ReactNode }) {
  return (
    <ScrollView
      style={styles.screenScroll}
      contentContainerStyle={styles.screenContent}
      accessibilityRole="summary"
      accessibilityLabel={props.title ?? 'Screen'}
    >
      {props.title ? (
        <Text accessibilityRole="header" style={styles.h1}>
          {props.title}
        </Text>
      ) : null}
      {props.children}
    </ScrollView>
  );
}

export function Section(props: { title: string; right?: React.ReactNode; children?: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const titleColor =
    colorScheme === 'dark' ? defaultTheme.colors.brandSecondary : defaultTheme.colors.slate900;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text accessibilityRole="header" style={[styles.h2, { color: titleColor }]}>
          {props.title}
        </Text>
        {props.right ? <View>{props.right}</View> : null}
      </View>
      <View style={styles.sectionBody}>{props.children}</View>
    </View>
  );
}

export function LabelText(props: TextProps) {
  return <Text {...props} style={[styles.body, props.style]} />;
}

export function Card(props: ViewProps) {
  return <View {...props} style={[styles.card, props.style]} />;
}

export function Button(
  props: Omit<PressableProps, 'children'> & { label: string; hint?: string },
) {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityLabel={props.label}
      accessibilityHint={props.hint}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.buttonText}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screenScroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  screenContent: {
    flexGrow: 1,
    padding: defaultTheme.spacing.lg,
    gap: defaultTheme.spacing.md,
  },
  h1: {
    fontSize: defaultTheme.typography.h1.fontSize,
    fontWeight: defaultTheme.typography.h1.fontWeight,
    color: defaultTheme.colors.slate900,
  },
  h2: {
    fontSize: defaultTheme.typography.h2.fontSize,
    fontWeight: defaultTheme.typography.h2.fontWeight,
    color: defaultTheme.colors.slate900,
  },
  body: {
    fontSize: defaultTheme.typography.body.fontSize,
    fontWeight: defaultTheme.typography.body.fontWeight,
    color: defaultTheme.colors.slate700,
  },
  section: {
    gap: defaultTheme.spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionBody: {
    gap: defaultTheme.spacing.sm,
  },
  card: {
    borderWidth: 1,
    borderColor: defaultTheme.colors.slate200,
    borderRadius: defaultTheme.radius.md,
    padding: defaultTheme.spacing.md,
    backgroundColor: defaultTheme.colors.white,
  },
  button: {
    backgroundColor: defaultTheme.colors.brandSecondary,
    borderRadius: defaultTheme.radius.md,
    paddingVertical: defaultTheme.spacing.sm,
    paddingHorizontal: defaultTheme.spacing.md,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: defaultTheme.colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
