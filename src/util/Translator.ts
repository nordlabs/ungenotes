import lang from '../localization/lang';
import {ipcRenderer} from 'electron';

export class Translator {
    private static locale: string;

    /**
     * Search for a translation with the given key and try to
     * translate it into the app's locale.
     * Has optional parameters, that can be used to replace
     * parts of the translated string.
     * @param key
     * @param parameters
     */
    public static trans(key: string, parameters?: TranslationsParameter): string {
        if (!this.locale) {
            this.locale = this.getLocale();
        }

        if (!Object.keys(lang).includes(key)) {
            console.warn(`no translation found for key ${key}`);
            return key;
        }

        const entry = lang[key];

        if (!Object.keys(entry).includes(this.locale)) {
            console.warn(`no entry for language ${this.locale} found for key ${key}`);
            return key;
        }

        let trans = entry[this.locale];

        if (parameters) {
            Object.keys(parameters).forEach((k) => {
                trans = trans.replace(k, parameters[k]);
            });

        }

        return trans;
    }

    /**
     * Same as trans(), but with capitalized first letter.
     * @param key
     * @param parameters
     */
    public static transUc(key: string, parameters?: TranslationsParameter): string {
        const trans = this.trans(key, parameters);

        return trans.slice(0, 1).toUpperCase() + trans.slice(1);
    }

    private static getLocale(): string {
        const result = ipcRenderer.sendSync('getLanguage');

        if (!result || 'string' !== typeof result || result.length < 2) {
            return 'en';
        }

        return result.slice(0, 2).toLowerCase();
    }
}

type AvailableLanguagesBase = {[lang: string]: string};

interface IAvailableLanguages extends AvailableLanguagesBase {
    en: string;
    de: string;
}

export type Translations = {[key: string]: IAvailableLanguages}

type TranslationsParameter = {[key: string]: string};
