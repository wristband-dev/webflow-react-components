import React, { useState } from 'react';
import { Box, Tabs, Tab, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Highlight, themes } from 'prism-react-renderer';

// Types
export interface CodeSample {
  name: string;
  code: string;
  language: string;
}

export interface Framework {
  id: string;
  name: string;
  icon: React.ReactNode;
  samples: {
    login: CodeSample;
    callback: CodeSample;
    logout: CodeSample;
  };
}

// Styled components
const FrameworkButton = styled(Box)(({ theme, selected }: { theme?: any; selected: boolean }) => ({
  width: 60,
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: selected ? '#1E1E1E' : 'transparent',
  '&:hover': {
    backgroundColor: selected ? '#1E1E1E' : '#2A2A2A',
  },
}));

const CodeWindow = styled(Box)({
  backgroundColor: 'transparent',
  borderRadius: 4,
  padding: 20,
  flex: 1,
  overflow: 'auto',
  maxWidth: '100%',
  '& pre': {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },
});

interface CodeFrameProps {
  frameworks: Framework[];
}

export const CodeFrame: React.FC<CodeFrameProps> = ({ frameworks }) => {
  const [selectedFramework, setSelectedFramework] = useState<string>(frameworks[0].id);
  const [selectedTab, setSelectedTab] = useState<string>('login');

  const currentFramework = frameworks.find((f) => f.id === selectedFramework)!;
  const currentSample = currentFramework.samples[selectedTab as keyof typeof currentFramework.samples];

  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      sx={{ 
        height: '100%', 
        backgroundColor: '#252525',
        '& pre': {
          padding: { xs: '0.5rem', sm: '1rem' },
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }
      }}
    >
      {/* Framework sidebar */}
      <Stack 
        direction={{ xs: 'row', sm: 'column' }}
        sx={{ 
          borderRight: { sm: '1px solid #333' },
          borderBottom: { xs: '1px solid #333', sm: 'none' },
          overflowX: { xs: 'auto', sm: 'visible' }
        }}
      >
        {frameworks.map((framework) => (
          <FrameworkButton
            key={framework.id}
            selected={framework.id === selectedFramework}
            onClick={() => setSelectedFramework(framework.id)}>
            {framework.icon}
          </FrameworkButton>
        ))}
      </Stack>

      {/* Main content area */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0
      }}>
        {/* Tab navigation */}
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          sx={{
            minHeight: 48,
            '& .MuiTab-root': {
              color: '#888',
              textTransform: 'none',
              '&.Mui-selected': {
                color: '#4FC3F7',
              },
            },
          }}>
          <Tab value="login" label="Login" />
          <Tab value="callback" label="Callback" />
          <Tab value="logout" label="Logout" />
        </Tabs>

        {/* Code display */}
        <CodeWindow>
          <Highlight
            theme={{
              ...themes.nightOwl,
              plain: { ...themes.nightOwl.plain, backgroundColor: 'transparent' },
            }}
            code={currentSample.code.trim()}
            language={currentSample.language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={{ ...style, margin: 0, background: 'transparent' }}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, style: { background: 'transparent' } })}>
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
