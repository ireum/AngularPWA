import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-pwa';
  text!: string;
  isOffline = !navigator.onLine;

  @HostListener('window:offline', ['$event'])
  onOffline(event: Event) {
    this.isOffline = true;
  }

  @HostListener('window:online', ['$event'])
  onOnline(event: Event) {
    this.isOffline = false;
  }

  ngOnInit(): void {
    if (this.isOffline) {
      this.loadOfflineData();
    } else {
      this.text = 'this is live online data';
      this.saveOfflineData();
    }
  }

  saveOfflineData() {
    const offlineData = {
      text: 'this was saved when the app was connected to the internet',
    }
    localStorage.setItem('offlineData', JSON.stringify(offlineData));
  }

  loadOfflineData() {
    this.text = JSON.parse(localStorage.getItem('offlineData') || '').text;
  }
}
