import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { async } from '@angular/core/testing';
import { map } from 'rxjs/operator/map';

@Injectable()
export class DatabaseService {

  userRef:  AngularFireList<any>;

  subsRef:  AngularFireList<any>;
  watchLeterRef:  AngularFireList<any>;
  favRef:  AngularFireList<any>;
  playlistRef: AngularFireList<any>;

  promise: any;

  constructor(private db: AngularFireDatabase, private authService: AuthService) { 
    
    // this.userRef = db.list('users');
    // this.userSubsRef = db.list('users')
    // this.idRef = db.list('ID');
  }

  addSubscription(id: number, desc: string, name: string, link: string): any {
      
    const user = this.authService.getCurrentUser();
    const userId = user.uid;
    if(userId) {
      const url = `subscriptions/${userId}`.toString();
      this.subsRef = this.db.list(url);
      return this.subsRef.push({ id: id, name: name, description: desc, link: link});
    } else {
      return null;
    }
  }

  unsubscribe(): any {
    const user = this.authService.getCurrentUser();
    const userId = user.uid;
    if(userId) {
      const url = `subscriptions/${userId}`.toString();
      return this.db.list(url).remove();
    } else {
      return null;
    }
  }

  addWatchLater(url: string, title: string, subtitle: string): any {
    
    const userId = this.authService.getCurrentUserId();
    if(userId) {
      const url = `watch_later/${userId}`.toString();
      this.watchLeterRef = this.db.list(url);
      return this.watchLeterRef.push({ link: url, title: title, subtitle: subtitle });
    } else {
      return null;
    }
  }

  removeWatchLater(): any {
    const userId = this.authService.getCurrentUserId();
    if(userId) {
      const url = `watch_later/${userId}`.toString();
      return this.db.list(url).remove();
    } else {
      return null;
    }
  }

  addFavourite(url: string, title: string, subtitle: string): any {
    
    const userId = this.authService.getCurrentUserId();
    if(userId) {
      const url = `favourites/${userId}`.toString();
      this.favRef = this.db.list(url);
      return this.favRef.push({ link: url, title: title, subtitle: subtitle });
    } else {
      return null;
    }
  }

  removeFromFavourite(): any {
    const userId = this.authService.getCurrentUserId();
    if(userId) {
      const url = `favourites/${userId}`.toString();
      return this.db.list(url).remove();
    } else {
      return null;
    }
  }

  addToPlaylist(url: string, title: string, subtitle: string): any {
 
    const userId = this.authService.getCurrentUserId();
    this.playlistRef = this.db.list(`playlist/${userId}`);
    if(userId) {
      return this.playlistRef.push({ link: url, title: title, subtitle: subtitle });
    } else {
      return null;
    }
  }

  removeFromPlaylist(): any {
    const userId = this.authService.getCurrentUserId();
    if(userId) {
      const url =  `playlist/${userId}`.toString();
      return this.db.list(url).remove();
    } else {
      return null;
    }
  }

  getSubscriptionsList(): any {

    const userId = this.authService.getCurrentUserId();
    if(userId) {
      const url = `subscriptions/${userId}`.toString();
      return this.db.list(url).valueChanges();
    } else {
      return null;
    }
  }

  getWatchLaterList(): any {

    const userId = this.authService.getCurrentUserId();
    if(userId) {
      const url = `watch_later/${userId}`.toString();
      return this.db.list(url).valueChanges();
    } else {
      return null;
    }
  }

  getFavouritesList(): any {

    const userId = this.authService.getCurrentUserId();
    if(userId) {
      const url = `favourites/${userId}`.toString();
      return this.db.list(url).valueChanges();
    } else {
      return null;
    }
  }

  getPlaylist(): any {

    const userId = this.authService.getCurrentUserId();
    if(userId) {
      const url = `playlist/${userId}`.toString();
      return this.db.list(url).valueChanges();
    } else {
      return null;
    } 
  }

}
