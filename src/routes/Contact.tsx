import React from 'react';
import classNames from 'classnames';
import {shell} from 'electron';
import {VersionHelper} from '../util/VersionHelper';

export default function Contact(): JSX.Element {
    return (
        <div className={classNames('contact')}>
            <h1 className={classNames('text-3xl')}>Kontakt</h1>
            <small className={classNames('mt-3')}>Hier ein paar Kontaktinformationen zu den Entwicklern des Programms.</small>

          <p className={"mt-10"}>  <em>Ungenotes</em> ist ein freies, quelloffenes Programm, welches auf <a style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => shell.openExternal("https://github.com/nordlabs/ungenotes/")}>GitHub</a> veröffentlich ist.
            Es wurde von <em>Jennifer Horstmann</em> und <em>Bent Focken</em> entwickelt und bietet generell Funktionen um Notizen sortiert und kategorisiert abzuspeichern.
                Über das oben verlinkte GitHub Repository sind die Entwickler erreichbar und offen für Änderungsvorschläge, -wünsche und Kontributionen.</p>
        </div>
    );
}
