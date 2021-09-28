import * as electron from "electron";
import * as fs from "fs";
import * as path from "path";

export class Store<T extends {[key: string]: any} = {}> {
    private static instances: {[name: string]: Store} = {};

    private path: string;
    private data: T;

    private constructor(filename: string) {
        if (!filename.endsWith('.json')) {
            filename += '.json';
        }

        let homeDir = '';

        if (electron.ipcRenderer) {
            homeDir = electron.ipcRenderer.sendSync('getHomeDir')
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

    public set(key: keyof T, value: any) {
        this.data[key] = value;
        this.save();
    }

    public setPartial(partial: Partial<T>) {
        this.data = {
            ...this.data,
            ...partial,
        };
        this.save();
    }

    public get<S>(key: keyof T): S {
        return this.data[key];
    }

    private save() {
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
}
