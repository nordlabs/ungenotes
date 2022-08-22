import {Toaster} from './Toaster';

export class VersionHelper {
    private static _majorVersion = 1;
    private static _minorVersion = 0;
    private static _patchVersion = 0;

    public static checkingInterval = 24*60*60;

    public static repoUrl = 'https://github.com/nordlabs/ungenotes/';
    public static repoApiUrl = 'https://api.github.com/repos/nordlabs/ungenotes/';

    public static getVersionString(): string {
        return `v.${this._majorVersion}.${this._minorVersion}.${this._patchVersion}`;
    }

    public static checkForUpdates(): Promise<boolean> {
        return fetch(`${this.repoApiUrl}releases/latest`, {method: 'GET', headers: {Accept: 'application/vnd.github.v3+json'}})
            .then((r) => {
                if (!r.ok) {
                    Toaster.error('Konnte nicht nach Updates suchen!');
                    return false;
                }

                return r.json().then((j: {url: string, html_url: string, tag_name: string, name: string}) => {
                    const regex = new RegExp('(?<major>\\d+)\\.(?<minor>\\d+)\\.(?<patch>\\d+)');

                    if (!regex.test(j.tag_name)) {
                        Toaster.error('Konnte nicht nach Updates suchen!');
                        return false;
                    }

                    const matches = regex.exec(j.tag_name);
                    const groups = {
                        major: parseInt(matches.groups.major),
                        minor: parseInt(matches.groups.minor),
                        patch: parseInt(matches.groups.patch),
                    };

                    return groups.major > this._majorVersion
                        || groups.major === this._majorVersion && groups.minor > this._minorVersion
                        || groups.major === this._majorVersion && groups.minor === this._minorVersion && groups.patch > this._patchVersion;
                });
            })
            .catch(() => {
                Toaster.error('Konnte nicht nach Updates suchen!');
                return false;
            });
    }

    static getMajorVersion(): number {
        return this._majorVersion;
    }

    static getMinorVersion(): number {
        return this._minorVersion;
    }

    static getPatchVersion(): number {
        return this._patchVersion;
    }
}
