
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Registrazione del Service Worker per funzionalità offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('SH-90 Service Worker registered');
      // Forza l'aggiornamento se c'è una nuova versione
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (confirm('Nuova versione disponibile! Caricare ora?')) {
                window.location.reload();
              }
            }
          };
        }
      };
    }).catch(err => {
      console.log('Service Worker registration failed: ', err);
    });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
