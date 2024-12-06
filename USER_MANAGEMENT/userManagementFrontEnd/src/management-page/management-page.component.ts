import { Component } from '@angular/core';

import { FormComponent } from './form/form.component';
import { UserListComponent } from './user-list/user-list.component';



@Component({
  selector: 'app-management-page',
  imports: [ FormComponent, UserListComponent],
  templateUrl: './management-page.component.html',
  styleUrl: './management-page.component.css'
})
export class ManagementPageComponent {

}
