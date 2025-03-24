import React, { useState } from 'react';
import { Box, Tabs, Tab, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Highlight, themes } from 'prism-react-renderer';
import { useMediaQuery } from '@mui/material';
import { Framework } from '@/types';

// Styled components
const FrameworkButton = styled(Box)(({ theme, selected }: { theme?: any; selected: boolean }) => ({
  width: 64.5,
  height: 133,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '1px solid #5A5757',
  borderRight: 'none',
  transition: 'background-color 0.3s ease',
  backgroundColor: selected ? '#06FFC1' : '#1a1c1d',
  '&:hover': {
    backgroundColor: selected ? '#06FFC1' : '#3a3c3d',
  },
}));

const CodeWindow = styled(Box)({
  backgroundColor: 'transparent',
  borderRadius: 4,
  padding: '16px 28px',
  flex: 1,
  overflow: 'auto',
});

interface CodeFrameProps {
  frameworks: Framework[];
}

export const CodeFrame: React.FC<CodeFrameProps> = ({ frameworks }) => {
  const [selectedFramework, setSelectedFramework] = useState<string>(frameworks[1].id);
  const [selectedTab, setSelectedTab] = useState<string>('login');
  const isMobile = useMediaQuery('(max-width:767px)');  
  const currentFramework = frameworks.find((f) => f.id === selectedFramework)!;
  const currentSample = currentFramework.samples[selectedTab as keyof typeof currentFramework.samples];

  return (
    <Stack direction="row" sx={{ height: '100%', backgroundColor: '#252525', border: '1px solid #5A5757' }}>
      {/* Framework sidebar */}
      <Stack sx={{ border: '1px solid #5A5757' }}>
        {frameworks.map((framework) => {
          const isSelected = framework.id === selectedFramework;
          return (
            <FrameworkButton
              key={framework.id}
              selected={isSelected}
              onClick={() => setSelectedFramework(framework.id)}>
              {framework.icon(isSelected)}
            </FrameworkButton>
          );
        })}
      </Stack>

      {/* Main content area */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #5A5757',
        overflow: 'scroll !important'
      }}>
        {/* Tab navigation */}
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 54,
            '& .MuiTabs-scrollButtons': {
              color: 'white',
              transition: '0.3s ease',
              '&.Mui-disabled': { opacity: 0 },
              width: '24px',
              '&.MuiTabs-scrollButtonsHideMobile': {
                display: 'flex',
              },
              '&:hover': {
                backgroundColor: '#3a3c3d',
              }
            },
            '& .MuiTab-root': {
              color: '#FFFFFF',
              minHeight: 54,
              marginLeft: 2,
              marginRight: 2,
              transition: '0.3s ease',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#3a3c3d',
                color: '#64AFFF',
              },
              '&.Mui-selected': {
                color: '#64AFFF',
                borderBottomColor: '#64AFFF',
              },
            },
          }}>
          <Tab value="login" sx={{ fontFamily: 'Inter', fontWeight: 400 }} label={isMobile ? "Login" : "Login Endpoint"} />
          <Tab value="callback" sx={{ fontFamily: 'Inter', fontWeight: 400 }} label={isMobile ? "Callback" : "Callback Endpoint"} />
          <Tab value="logout" sx={{ fontFamily: 'Inter', fontWeight: 400 }} label={isMobile ? "Logout" : "Logout Endpoint"} />
        </Tabs>

        {/* Code display */}
        <CodeWindow sx={{ borderTop: '1px solid #5A5757' }}>
          <Highlight
            theme={{
              ...themes.nightOwl,
              plain: { ...themes.okaidia.plain, backgroundColor: 'transparent' },
            }}
            code={currentSample.code.trim()}
            language={'typescript'}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`${className} chsarp`}
                style={{
                  ...style,
                  margin: 0,
                  background: 'transparent',
                  fontSize: '14px',
                  lineHeight: '1.45',
                  overflow: 'auto',
                  width: 'max-content',
                  minWidth: '100%',
                }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ className, line, style: { background: 'transparent' } })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </CodeWindow>
      </Box>
    </Stack>
  );
};
