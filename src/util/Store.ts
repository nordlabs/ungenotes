import * as electron from 'electron';
import * as fs from 'fs';
import * as path from 'path';

export class Store<T extends {[key: string]: any} = {}> {
    private static instances: {[name: string]: Store} = {};
    private static TIMEOUT_IN_S = 5;

    private changeTimeout: NodeJS.Timeout;
    private readonly name: string;
    private readonly path: string;
    private data: T;

    private constructor(filename: string) {
        this.name = filename;

        if (!filename.endsWith('.json')) {
            filename += '.json';
        }

        let homeDir = '';

        if (electron.ipcRenderer) {
            homeDir = electron.ipcRenderer.sendSync('getHomeDir');
        } else {
            homeDir = electron.app.getPath('userData');
        }

        this.path = path.join(homeDir, filename);

        if (!fs.existsSync(this.path)) {
            this.data = {} as T;
        } else {
            this.data = JSON.parse(fs.readFileSync(this.path).toString());
        }
    }

    public static getInstance<T>(name: string): Store<T> {
        if (!Object.keys(this.instances).includes(name)) {
            this.instances[name] = new Store<T>(name);
        }

        return this.instances[name] as Store<T>;
    }

    public set(key: keyof T, value: any): void {
        this.data[key] = value;
        this.scheduleSave();
    }

    public setPartial(partial: Partial<T>): void {
        this.data = {
            ...this.data,
            ...JSON.parse(JSON.stringify(partial)),
        };
        this.scheduleSave();
    }

    public get<S>(key: keyof T): S {
        return this.data[key];
    }

    /**
     * Schedules the save operation to be executed in TIMEOUT_IN_S
     * seconds. If already a timeout exists, it is cleared and
     * another one is started.
     *
     * This reduces the number of save calls and therefore write
     * operations to the hard drive drastically, as otherwise
     * every keystroke would be saved in a separate write operation.
     * @private
     */
    private scheduleSave(): void {
        if (this.changeTimeout) {
            // remove old timeout
            clearTimeout(this.changeTimeout);
        }

        // set timeout
        this.changeTimeout = setTimeout(
            () => {
                this.save();
            },
            Store.TIMEOUT_IN_S*1000,
        );
    }

    /**
     * Saves the store to the corresponding file, synchronously.
     * @private
     */
    private save(): void {
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
}
