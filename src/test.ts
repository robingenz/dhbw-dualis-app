// This file is required by karma.conf.js and loads recursively all the .spec and framework files
/* tslint:disable:ordered-imports */
import 'zone.js/testing'; // Must be the FIRST import!
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { improveChangeDetection, muteIonicReInitializeWarning } from '@tests/test-setup';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

improveChangeDetection();
muteIonicReInitializeWarning();
