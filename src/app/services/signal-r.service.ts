import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { RatesViewModel } from '../models/rates-view-model';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public ratesData: RatesViewModel[];
  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/rates')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferRatesDataListener = () => {
    this.hubConnection.on('RatesMessageReceived', (data) => {
      this.ratesData = data;
    });
  };
}
