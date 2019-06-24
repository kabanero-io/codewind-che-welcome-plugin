/*******************************************************************************
* Copyright (c) 2019 IBM Corporation and others.
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v2.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v20.html
*
* Contributors:
*     IBM Corporation - initial API and implementation
*******************************************************************************/

/**
 * Generated using theia-plugin-generator
 */

import * as theia from '@theia/plugin';
import * as path from 'path';

function toUri(context: theia.PluginContext, resource: string): theia.Uri {
    const file = theia.Uri.file(path.join(context.extensionPath, 'resources', resource));
    return file.with({ scheme: 'theia-resource' });
}

function getWelcomeHTML(context: theia.PluginContext): string {

    const materialCSS = toUri(context, 'materialcolors.css');
    const welcomeCSS = toUri(context, 'welcome.css');
    const logo = toUri(context, 'Kabanero-logo.svg');

    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; script-src 'unsafe-inline' 'self' ;"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="stylesheet" type="text/css" href="${materialCSS}"/>
            <link rel="stylesheet" type="text/css" href="${welcomeCSS}"/>
            <title>Welcome Page</title>
        </head>
        <body>
            <table>
                <tr>
                    <td rowspan="2"><img class="logo" src="${logo}"/></td>
                    <td class="title">Kabanero</td>
                </tr>
                <tr>
                    <td class="subtitle">Create more, faster</td>
                </tr>
            </table>
            <p>Tech Preview</p>
            <p>For more information, visit <a href="https://kabanero.io/" target="_blank">https://kabanero.io/</a> and <a href="https://www.eclipse.org/codewind/" target="_blank">https://codewind.dev/</a></p>
        </body>
        </html>`;
}

function createWelcomePage(context: theia.PluginContext): void {

    const panel = theia.window.createWebviewPanel(
        'WelcomePage',
        'Welcome',
        {
            viewColumn: theia.ViewColumn.One,
            preserveFocus: false
        },
        {
            localResourceRoots: [
                theia.Uri.file(path.join(context.extensionPath, 'resources'))
            ]
        }
    );

    panel.webview.html = getWelcomeHTML(context);
    panel.iconPath = toUri(context, 'Kabanero-favicon.svg');
}

export function start(context: theia.PluginContext) {
    setTimeout(() => {
        if (theia.window.visibleTextEditors.length == 0)
            createWelcomePage(context);
    }, 1000);
}

export function stop() {

}
