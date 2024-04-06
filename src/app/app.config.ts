import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient} from '@angular/common/http';
import { routes } from './app.routes';

import { GoogleAuthProvider } from 'firebase/auth';
import { provideFirebaseApp } from '@angular/fire/app'; 
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {provideAuth} from '@angular/fire/auth'


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), GoogleAuthProvider,
  importProvidersFrom(provideFirebaseApp(()=>initializeApp(environment.firebase)), provideAuth(()=>getAuth()))]
};
