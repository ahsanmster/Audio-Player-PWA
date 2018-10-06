import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { RegisterComponent } from '../app-components/authentication/register/register.component';
import { LoginComponent } from '../app-components/authentication/login/login.component';
import { ItemsComponent } from '../app-components/items/items.component';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { PagenotfoundComponent } from '../app-components/pagenotfound/pagenotfound.component';
import { BrowseComponent } from '../app-components/browse/browse.component';
import { HomeComponent } from '../app-components/home/home.component';
import { PlaylistComponent } from '../app-components/playlist/playlist.component';
import { PlaysComponent } from '../app-components/plays/plays.component';
import { ChannelComponent } from '../app-components/channel/channel.component';
import { MyplaylistComponent } from '../app-components/myplaylist/myplaylist.component';
import { MyfavouritelistComponent } from '../app-components/myfavouritelist/myfavouritelist.component';
import { WatchlaterComponent } from '../app-components/watchlater/watchlater.component';
import { SubscriptionsComponent } from '../app-components/subscriptions/subscriptions.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'channels',
    pathMatch: 'full',
  },
  { 
    path: 'login',
    component: LoginComponent 
  },
  { 
    path: 'register',
    component: RegisterComponent 
  },
  {
    path: 'channels',
    component: ItemsComponent,
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'channel/:id',
    component: ChannelComponent
  },
  {
    path: 'playlist/:id',
    component: PlaylistComponent
  },
  {
    path: 'plays',
    component: PlaysComponent
  },
  {
    path: 'my-playlist',
    component: MyplaylistComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'my-favourites',
    component: MyfavouritelistComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'watch-later',
    component: WatchlaterComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }

  
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ 
    RouterModule.forRoot(
      routes,
      // { enableTracing: true }
    ),
    ]
})
export class AppRoutingModule { }
