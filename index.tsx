
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// PWA Install Prompt
let deferredPrompt: any;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Mostra banner di installazione
  const installBanner = document.createElement('div');
  installBanner.id = 'install-banner';
  installBanner.innerHTML = `
    <div style="position: fixed; bottom: 0; left: 0; right: 0; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; z-index: 9999; box-shadow: 0 -4px 20px rgba(0,0,0,0.5); backdrop-filter: blur(10px);">
      <div style="flex: 1;">
        <div style="font-weight: 900; font-size: 16px; color: white; margin-bottom: 4px;">🚁 SH-90 Limits</div>
        <div style="font-size: 12px; color: rgba(255,255,255,0.9);">Installa l'app per usarla offline</div>
      </div>
      <div style="display: flex; gap: 12px;">
        <button id="install-dismiss" style="padding: 10px 16px; border-radius: 12px; border: 2px solid rgba(255,255,255,0.3); background: transparent; color: white; font-weight: 700; font-size: 13px; cursor: pointer;">Dopo</button>
        <button id="install-btn" style="padding: 10px 20px; border-radius: 12px; border: none; background: white; color: #1e40af; font-weight: 900; font-size: 13px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">Installa</button>
      </div>
    </div>
  `;
  document.body.appendChild(installBanner);

  document.getElementById('install-btn')?.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      deferredPrompt = null;
      installBanner.remove();
    }
  });

  document.getElementById('install-dismiss')?.addEventListener('click', () => {
    installBanner.remove();
  });
});

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
