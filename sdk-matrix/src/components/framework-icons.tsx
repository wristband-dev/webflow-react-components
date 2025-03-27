import {
  dotnetLogoBlack,
  dotnetLogoWhite,
  expressLogoBlack,
  expressLogoWhite,
  nestJsLogoBlack,
  nestJsLogoWhite,
  nextJsLogoBlack,
  nextJsLogoWhite
} from '@/assets/images';
import { Box } from '@mui/material';

type IconProps = {
  selected?: boolean;
}

export const DotnetIcon = ({ selected }: IconProps) => (
  <img
    alt='dotnet icon'
    src={selected ? dotnetLogoBlack : dotnetLogoWhite}
    style={{ width: '44px', height: '44px', transition: 'filter 0.3s ease' }}
    loading="eager"
  />
);

export const ExpressIcon = ({ selected }: IconProps) => (
  <img
    alt='express icon'
    src={selected ? expressLogoBlack : expressLogoWhite}
    style={{ width: '44px', height: '44px', transition: 'filter 0.3s ease' }}
    loading="eager"
  />
);

export const NestIcon = ({ selected }: IconProps) => (
  <img
    alt='nestjs icon'
    src={selected ? nestJsLogoBlack : nestJsLogoWhite}
    style={{ width: '44px', height: '44px', transition: 'filter 0.3s ease' }}
    loading="eager"
  />
);

export const NextIcon = ({ selected }: IconProps) => (
  <img
    alt='nextjs icon'
    src={selected ? nextJsLogoBlack : nextJsLogoWhite}
    style={{ width: '44px', height: '44px', transition: 'filter 0.3s ease' }}
    loading="eager"
  />
);
