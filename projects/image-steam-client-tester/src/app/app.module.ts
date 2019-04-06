import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { ImageSteamClientModule } from 'image-steam-client';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		ImageSteamClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
