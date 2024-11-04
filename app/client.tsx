/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/start';
import { createRouter } from './router';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const router = createRouter();
hydrateRoot(rootElement, <StartClient router={router} />);
