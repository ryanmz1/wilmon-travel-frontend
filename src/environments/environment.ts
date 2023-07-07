// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as config from '../../auth0_config.json';

const { domain, clientId, authorizationParams: { audience, scope }, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience?: string;
    scope?: string;
  },
  apiUri: string;
  errorPath: string;
};

export const auth0Api = apiUri;

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
      // ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
      audience,
      // ...(scope && scope != 'WHITCH_PERMISSION' ? { scope } : null)
      scope
    },
    errorPath,
  },
  httpInterceptor: {
    // allowedList: [`${apiUri}/*`],
    allowedList:  [
      {
        uri: `${apiUri}/*`,
        tokenOptions: {
          authorizationParams: {
            audience,
            scope
          }
        }
      }
    ]
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
