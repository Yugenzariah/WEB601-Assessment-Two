// React app entry point. Renders the root App component.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './styles/dark.css'; // Import the styles for darkmode 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);