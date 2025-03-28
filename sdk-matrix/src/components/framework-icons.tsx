import {
  dotnetLogoBlack,
  dotnetLogoWhite,
  expressLogoBlack,
  expressLogoWhite,
  nestJsLogoBlack,
  nestJsLogoWhite,
  nextJsLogoBlack,
  nextJsLogoWhite
} from '@/components/raw-icon-svgs';
import { ReactNode } from 'react';

const dotnetBlack = dotnetLogoBlack();
const dotnetWhite = dotnetLogoWhite();
const expressBlack = expressLogoBlack();
const expressWhite = expressLogoWhite();
const nestJsBlack = nestJsLogoBlack();
const nestJsWhite = nestJsLogoWhite();
const nextJsBlack = nextJsLogoBlack();
const nextJsWhite = nextJsLogoWhite();

type IconProps = {
  selected?: boolean;
}

type FrameworkIconContainerProps = {
  children: ReactNode;
  id: string;
}

const FrameworkIconContainer: React.FC<FrameworkIconContainerProps> = ({ children, id }) => (
  <div id="" style={{
    width: '44px',
    height: '44px',
    transition: 'filter 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  }}>
    {children}
  </div>
);

export const NextIcon = ({ selected }: IconProps) => (
  <FrameworkIconContainer id="nextjs-icon-container">
    {selected ? nextJsBlack : nextJsWhite}
  </FrameworkIconContainer>
);

export const ExpressIcon = ({ selected }: IconProps) => (
  <FrameworkIconContainer id="express-icon-container">
    {selected ? expressBlack : expressWhite}
  </FrameworkIconContainer>
);

export const NestIcon = ({ selected }: IconProps) => (
  <FrameworkIconContainer id="nestjs-icon-container">
    {selected ? nestJsBlack : nestJsWhite}
  </FrameworkIconContainer>
);

export const DotnetIcon = ({ selected }: IconProps) => (
  <FrameworkIconContainer id="dotnet-icon-container">
    {selected ? dotnetBlack : dotnetWhite}
  </FrameworkIconContainer>
);
