import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({providedIn: 'root'})

export class ChatService {

    constructor(private webSocketService:WebsocketService) {
        this.getMessages();
     }
    
    sendMessage(message:string) { 
        const payload = { 
            sender: this.webSocketService.getUser().name, 
            body: message
        };
        this.webSocketService.emit('message', payload);
    };

    getMessages() { 
        return this.webSocketService.listen('new message');
    };

    getPrivateMessages() { 
        return this.webSocketService.listen('private-msg')
    };
};