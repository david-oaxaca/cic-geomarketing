// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './Routes/App';

// ReactDOM.render(<App/>, document.getElementById('app'));

import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import App from './Routes/App';

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

