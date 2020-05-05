import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public text: string = '';

  private messagesListenerSubs$ = new Subscription();
  public messages: any[] = [];
  public element:HTMLElement;

  constructor(private chatService:ChatService) { }

  ngOnInit() {
    this.element = document.getElementById('chat-messages')
    this.messagesListenerSubs$ = this.chatService.getMessages().subscribe((message:any) => {
      this.messages.push(message);
      setTimeout(() => this.element.scrollTop = this.element.scrollHeight ,50)
    });
  }

  send() {
    if(this.text.length === 0) return;
    this.chatService.sendMessage(this.text);
    this.text = '';
  };

  ngOnDestroy(): void {
    this.messagesListenerSubs$.unsubscribe();
  }

}
