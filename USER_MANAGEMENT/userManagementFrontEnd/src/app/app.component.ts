import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManagementPageComponent } from '../management-page/management-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ManagementPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'userManagementFrontEnd';
}
