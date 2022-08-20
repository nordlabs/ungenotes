import React from 'react';
import classNames from 'classnames';

export default function Contact(): JSX.Element {
    return (
        <div className={classNames('contact')}>
            <h1 className={classNames('text-5xl')}>Kontakt</h1>
            <p className={classNames('mt-3')}>Hier ein paar Kontaktinformationen zu den Entwicklern des Programms.</p>
            <p className={classNames('mt-3')}><em>Ungenotes</em> ist ein freies, quelloffenes Programm, welches auf <a style={{color: 'blue', textDecoration: 'underline'}} href={'https://github.com/nordlabs/ungenotes/'}>GitHub</a> veröffentlich ist.</p>
            <p>Es wurde von <em>Jennifer Horstmann</em> und <em>Bent Focken</em> entwickelt und bietet generell Funktionen um Notizen sortiert und kategorisiert abzuspeichern.</p>
            <p>Über das oben verlinkte GitHub Repository sind die Entwickler erreichbar und offen für Änderungsvorschläge, -wünsche und Kontributionen.</p>
        </div>
    );
}
