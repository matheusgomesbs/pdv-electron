import { app } from 'electron';
import ElectronApp from './core/main';

(async () => {
  const electronApp = new ElectronApp();
  electronApp.bootstrap();
  electronApp.tray = [
    {
      label: 'Mostrar', click: () => {
        electronApp.window?.show();
      }
    },
    {
      label: 'Minimizar', click: () => {
        electronApp.window?.minimize();
      }
    },
    {
      label: 'Minimizar para bandeja', click: () => {
        electronApp.window?.hide();
      }
    },
    { label: 'separator', type: 'separator' },
    {
      label: 'Dev', click: () => {
        electronApp.window?.webContents.openDevTools();
      }
    },
    { label: 'separator', type: 'separator' },
    {
      label: `Reiniciar XML Auditor`, click: () => {
        app.relaunch();
        app.exit();
      }
    },
    { label: 'separator', type: 'separator' },
    { label: 'Sair', role: 'quit' }
  ]
})();