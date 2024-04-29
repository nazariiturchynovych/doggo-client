import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from '@/entities/chat/model/models.ts';

export class SignalRService {
  connection: HubConnection | null;

  constructor() {
    this.connection = null;
  }

  startConnection = (): void => {
    const token = localStorage.getItem('token');

    // Construct the SignalR hub URL with the token as a query string parameter
    const hubUrl = 'https://localhost:7278/doggo-hub'; // Replace with your SignalR hub URL
    const urlWithToken = `${hubUrl}?access_token=${token}`;
    this.connection = new HubConnectionBuilder()
      .withUrl(urlWithToken) // Provide the URL of your SignalR hub
      .withAutomaticReconnect()
      .build();

    this.connection
      .start()
      .then(() => {
        console.log('SignalR Connected');
      })
      .catch((err) => console.error('SignalR Connection Error: ', err));
  };

  joinChat = async (chatId: string): Promise<void> => {
    if (this.connection) {
      await this.connection.invoke('JoinChat', chatId);
    } else {
      console.error('SignalR connection is not established.');
    }
  };

  sendMessage = async (chatId: string, message: string): Promise<void> => {
    if (this.connection) {
      await this.connection.invoke('SendMessage', chatId, message);
    } else {
      console.error('SignalR connection is not established.');
    }
  };

  // Method to handle received chat-messages
  onReceiveMessage = (handler: (message: Message) => void): void => {
    if (this.connection) {
      this.connection.on('ReceiveMessage', handler);
    }
  };
}
