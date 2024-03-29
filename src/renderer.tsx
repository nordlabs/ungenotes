/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
// eslint-disable-next-line import/no-unresolved
import './tailwind.output.css';
import App from './components/App';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {HashRouter} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {LoadingScreen} from './util/LoadingScreen';
import {Store} from './util/Store';
import {IPreferences, Theme} from './util/types';

const minLoadingScreenDuration = (LoadingScreen.minLoadingScreenTime + (Math.random() * LoadingScreen.loadingScreenDelayVariance)) * 1000;

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
            <Toaster />
        </HashRouter>
    </Provider>,
    document.getElementById('container'),
    () => {
        // loading screen stuff
        const loadingScreen = document.getElementById('loading-screen');
        const preferences = Store.getInstance<IPreferences>('preferences');

        if (loadingScreen) {
            const now = new Date();
            const loadingStart = new Date(loadingScreen.getAttribute('data-loading-start'));
            const alreadyLoadingTime = now.getTime() - loadingStart.getTime();
            const minimizeLoadingScreenTime = preferences.get('minimizeLoadingScreenTime') === true;

            if (alreadyLoadingTime > minLoadingScreenDuration || minimizeLoadingScreenTime) {
                LoadingScreen.hide();
            } else {
                setTimeout(
                    () => LoadingScreen.hide(),
                    minLoadingScreenDuration - alreadyLoadingTime,
                );
            }
        }

        // theme stuff
        document.body.setAttribute('data-theme', (preferences.get('theme') ?? Theme.standardBright).toString());
    },
);
