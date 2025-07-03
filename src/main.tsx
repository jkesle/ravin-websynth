import React, { StrictMode } from 'react';
import Ravin from './Ravin';
import { createRoot } from 'react-dom/client';

const rootDiv = document.querySelector('#root');
const root = createRoot(rootDiv!);
root.render(
    <StrictMode>
        <Ravin />
    </StrictMode>
);