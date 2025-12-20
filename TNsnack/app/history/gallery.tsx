import { Card, LabelText, Screen, Section } from '@tornado-nation/ui';

export default function HistoryGalleryScreen() {
  return (
    <Screen title="Gallery">
      <Section title="Uniforms / Photos">
        <Card accessibilityLabel="Gallery placeholder">
          <LabelText>Uniforms and galleries placeholder.</LabelText>
        </Card>
      </Section>
    </Screen>
  );
}
