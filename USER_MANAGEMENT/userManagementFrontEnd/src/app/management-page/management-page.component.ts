import { Component } from '@angular/core';

import { FormComponent } from '../components/form/form.component';
import { UserListComponent } from '../components/user-list/user-list.component';



@Component({
  selector: 'app-management-page',
  imports: [ FormComponent, UserListComponent],
  templateUrl: './management-page.component.html',
  styleUrl: './management-page.component.css'
})
export class ManagementPageComponent {

}
