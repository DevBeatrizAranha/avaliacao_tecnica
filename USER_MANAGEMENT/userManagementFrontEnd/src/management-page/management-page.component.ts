import { Component } from '@angular/core';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-management-page',
  imports: [ FormComponent],
  templateUrl: './management-page.component.html',
  styleUrl: './management-page.component.css'
})
export class ManagementPageComponent {

}
