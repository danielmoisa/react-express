import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Routes from './Routes';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#3e64ff' },
      secondary: { main: '#eb4d55' },
    }
  });
  
  return (
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
  );
}

export default App;
