import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { RatesViewModel } from './models/rates-view-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'LiveRatesClient';

  constructor(
    public signalRService: SignalRService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferRatesDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http
      .get('https://localhost:5001/api/rates')
      .subscribe((res: RatesViewModel[]) => {
        console.log(res);
      });
  };
}
