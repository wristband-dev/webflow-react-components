interface CodeSample {
  name: string;
  code: string;
  language: string;
}

export interface Framework {
  id: string;
  name: string;
  icon: (selected: boolean) => React.ReactNode;
  samples: {
    login: CodeSample;
    callback: CodeSample;
    logout: CodeSample;
  };
}
