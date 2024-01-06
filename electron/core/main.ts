import { app, BrowserWindow, Menu, nativeImage, shell, Tray } from 'electron'
import { release } from 'node:os'
import path from 'node:path'

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

export type ElectronType = InstanceType<typeof ElectronApp>
export type ModuleFunction = (app: ElectronType) => void | Promise<void>

export default class ElectronApp {
  private readonly devURL: string = `${process.env["VITE_DEV_SERVER_URL"]}`
  private readonly productionLoadFile: string = path.join(process.env.DIST, 'index.html')
  private readonly resources: string = process.env.VITE_PUBLIC
  private readonly icon: string = path.join(this.resources, 'icon-light.ico')

  public window: BrowserWindow | null = null
  public tray: Electron.MenuItemConstructorOptions[] = []

  async bootstrap(): Promise<void> {
    await this.startElectron()
    await this.loadModules()
  }

  private async startElectron() {
    const singleInstanceLock = app.requestSingleInstanceLock()

    if(!singleInstanceLock) {
      this.forceQuit()
    }

    if (release().startsWith('6.1')) app.disableHardwareAcceleration()

    if (process.platform === 'win32') {
      app.setAppUserModelId(app.getName())
    }

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow()
      }
    })

    app.on('window-all-closed', async () => {
      if (process.platform !== "darwin") {
        this.forceQuit()
        this.window = null
      }
    })

    app.on('before-quit', async () => {
      // await onBeforeQuite(event, callback)
    })

    app.on('second-instance', async () => {
      // await this.onSecondInstance()
    })

    await app.whenReady()
    await this.createWindow()
    await this.createTray()
  }

  private async createWindow(): Promise<void> {
    if(this.window) {
      if (this.window.isMinimized()) {
        this.window.restore()
      }

      this.window.focus()

      return
    }

    this.window = new BrowserWindow({
      icon: this.icon,
      title: 'PDV Electron',
      minWidth: 1024,
      minHeight: 768,
      width: 1024,
      height: 768,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    })

    if (app.isPackaged) {
      this.window.loadURL(this.productionLoadFile)
    } else {
      this.window.loadURL(this.devURL)
      this.window.webContents.openDevTools({
        mode: "detach"
      })
      // win.loadFile(path.join(process.env.DIST, 'index.html'))
    }

    this.window.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) {
        shell.openExternal(url)
      }

      return {
        action: 'deny'
      }
    })

    this.window.on('close', async () => {
      // await onCloseApplication(event, callback)
    })

    this.window.once("ready-to-show", () => {
      this.window?.show()
    })

    // Test active push message to Renderer-process.
    this.window.webContents.on('did-finish-load', () => {
      this.window?.webContents.send('main-process-message', (new Date).toLocaleString())
    })
    
    Menu.setApplicationMenu(null)
  }

  private async createTray(): Promise<void> {
    let tray = new Tray(nativeImage.createFromPath(this.icon))

    const contextMenu = Menu.buildFromTemplate(this.tray)

    tray.on('click', () => this.window?.show())
    tray.setToolTip('PDV Electron')
    tray.setContextMenu(contextMenu)
  }

  private async forceQuit() {
    app.quit()
    process.exit(0)
  }

  private async register(module: ModuleFunction) {
    await module(this)
  }

  private async loadModules() {
    const modules = import.meta.glob<{ default: ModuleFunction }>('../domain/**/index.ts', {
      eager: true,
    })

    for (const module of Object.values(modules)) {
      await this.register(module.default)
    }
  }
}
