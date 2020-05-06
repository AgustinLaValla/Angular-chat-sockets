import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public name: string = '';

  constructor(private webSocketService:WebsocketService) { }

  ngOnInit() { }

  enter() {
    this.webSocketService.loginWebSocket(this.name);
    this.name = '';
  };
};
