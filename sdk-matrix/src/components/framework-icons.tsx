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
  <Box
    component="img"
    alt='dotnet icon'
    src={selected ? dotnetLogoBlack : dotnetLogoWhite}
    sx={{ width: 44, height: 44, transition: 'filter 0.3s ease' }}
  />
);

export const ExpressIcon = ({ selected }: IconProps) => (
  <Box
    component="img"
    alt='express icon'
    src={selected ? expressLogoBlack : expressLogoWhite}
    sx={{ width: 44, height: 44, transition: 'filter 0.3s ease' }}
  />
);

export const NestIcon = ({ selected }: IconProps) => (
  <Box
    component="img"
    alt='nestjs icon'
    src={selected ? nestJsLogoBlack : nestJsLogoWhite}
    sx={{ width: 44, height: 44, transition: 'filter 0.3s ease' }}
  />
);

export const NextIcon = ({ selected }: IconProps) => (
  <Box
    component="img"
    alt='nextjs icon'
    src={selected ? nextJsLogoBlack : nextJsLogoWhite}
    sx={{ width: 44, height: 44, transition: 'filter 0.3s ease' }}
  />
);
