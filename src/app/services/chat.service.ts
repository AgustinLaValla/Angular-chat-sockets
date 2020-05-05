import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({providedIn: 'root'})

export class ChatService {

    constructor(private webSocketService:WebsocketService) {
        this.getMessages();
     }
    
    sendMessage(message:string) { 
        const payload = { 
            de: 'Agustín', 
            body: message
        };
        this.webSocketService.emit('message', payload);
    };

    getMessages() { 
        return this.webSocketService.listen('new message');
    };
};