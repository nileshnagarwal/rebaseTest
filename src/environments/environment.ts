/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://127.0.0.1:8000',
  firebase: {
    apiKey: 'AIzaSyD5Le64Z7rhYm-ta2wgYswYq8G7wEoUNqE',
    authDomain: 'tpfirebase-ca57d.firebaseapp.com',
    databaseURL: 'https://tpfirebase-ca57d.firebaseio.com',
    projectId: 'tpfirebase-ca57d',
    storageBucket: 'tpfirebase-ca57d.appspot.com',
    messagingSenderId: '914218933009',
    appId: '1:914218933009:web:decadc48dde53b4d',
  },
};
