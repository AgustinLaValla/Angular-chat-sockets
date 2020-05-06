import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;
  private user: User = null;


  constructor(private socket: Socket, private router: Router) {
    this.checkStatus();
    this.loadStorage();
  };

  checkStatus() {
    this.socket.on('connect', () => {
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Server connection has finished');
      this.socketStatus = false;
    });
  }


  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  };

  listen(event: string) {
    return this.socket.fromEvent(event);
  };

  loginWebSocket(name: string) {
    this.emit('user-config', { name }, (resp) => {
      this.user = new User(name);
      this.saveStorage();
      if (resp.ok) {
        this.router.navigate(['/messages']);
      };
    });
  };

  saveStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  };

  loadStorage() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loginWebSocket(this.user.name);
    };
  }

  getUser() { 
    return this.user;
  };

}
