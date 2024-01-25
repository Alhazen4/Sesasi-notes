import { Component } from '@angular/core';
import { webTitle } from './services/env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = webTitle;
}
