// Application entrypoint.

// Load up the application styles
require("../styles/styles.css");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { deepPurple500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import '../styles/styles.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple500,
  }
})

injectTapEventPlugin();
const JobBox = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<JobBox />, document.getElementById('react-root'));
