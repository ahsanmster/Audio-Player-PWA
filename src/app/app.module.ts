// Angular Core Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

//Service Worker Imports
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


// Components Imports
import { AppComponent } from './app.component';
import { ToolbarComponent } from './app-components/toolbar/toolbar.component';
import { SidenavComponent } from './app-components/sidenav/sidenav.component';
import { SearchComponent } from './app-components/search/search.component';
import { ItemsComponent } from './app-components/items/items.component';
import { PlayerComponent } from './app-components/player/player.component';
import { RegisterComponent } from './app-components/authentication/register/register.component';
import { LoginComponent } from './app-components/authentication/login/login.component';
import { LoaderComponent } from './app-components/loader/loader.component';
import { BrowseComponent } from './app-components/browse/browse.component';
import { HomeComponent } from './app-components/home/home.component';
import { PagenotfoundComponent } from './app-components/pagenotfound/pagenotfound.component';
import { PlaylistComponent } from './app-components/playlist/playlist.component';
import { PlaysComponent } from './app-components/plays/plays.component';
import { ChannelComponent } from './app-components/channel/channel.component';
import { MyplaylistComponent } from './app-components/myplaylist/myplaylist.component';
import { MyfavouritelistComponent } from './app-components/myfavouritelist/myfavouritelist.component';
import { WatchlaterComponent } from './app-components/watchlater/watchlater.component';
import { SubscriptionsComponent } from './app-components/subscriptions/subscriptions.component';

//Routing Imports
import { AppRoutingModule } from './routing/app-routing.module';

//Guards Imports
import { AuthenticatedGuard } from './guards/authenticated.guard';

//AngularFirebase Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Services Imports
import { AuthService } from './providers/auth.service';
import { ApiService } from './providers/api.service';
import { DatabaseService } from './providers/database.service';

//Pipes Imports
import { SearchPipe } from './pipes/search.pipe';

//Firebase Configuration
export const firebaseConfig = {

    apiKey: "AIzaSyCbq6OMiR-AKHfWDPM5tF7v4r-y3zVP1dE",
    authDomain: "muslim-central-web-app.firebaseapp.com",
    databaseURL: "https://muslim-central-web-app.firebaseio.com",
    projectId: "muslim-central-web-app",
    storageBucket: "muslim-central-web-app.appspot.com",
    messagingSenderId: "953871551954"
};

//Angular Components Imports
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';


//Angular Components Module
@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class DemoMaterialModule { }

//Main Module
@NgModule({
  declarations: [
    //pipes
    SearchPipe,
    //components
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    SearchComponent,
    ItemsComponent,
    PlayerComponent,
    RegisterComponent,
    LoginComponent,
    LoaderComponent,
    BrowseComponent,
    HomeComponent,
    PagenotfoundComponent,
    PlaylistComponent,
    PlaysComponent,
    ChannelComponent,
    MyplaylistComponent,
    MyfavouritelistComponent,
    WatchlaterComponent,
    SubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    AuthService,
    AuthenticatedGuard,
    ApiService,
    DatabaseService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
