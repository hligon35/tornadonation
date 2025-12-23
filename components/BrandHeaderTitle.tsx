import React from 'react';
import { Image } from 'react-native';

const brandTitleImage = require('../assets/images/brand.png');

export default function BrandHeaderTitle() {
  return (
    <Image
      source={brandTitleImage}
      resizeMode="contain"
      style={{ width: 140, height: 50 }}
      accessibilityLabel="Tornado Nation"
    />
  );
}
