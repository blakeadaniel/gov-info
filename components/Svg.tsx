import React from 'react';
import IMAGES from '../constants/svgs/index';
import type { SvgProps as RNSSVGProps } from 'react-native-svg';

export type SvgProps = RNSSVGProps & { name: string; color?: string };

const svg = ({ color, name, height, width, ...props }: SvgProps) => {
  const SVGComponent = IMAGES[name];
  if (!SVGComponent) return null;
  return <SVGComponent fill={color} {...props} height={height} width={width} />;
};

export const Svg = React.memo(svg);