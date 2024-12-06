import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { FormComponent } from '../components/form/form.component';
import { UserListComponent } from '../components/user-list/user-list.component';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-management-page',
  imports: [ FormComponent, UserListComponent, FormsModule],
  templateUrl: './management-page.component.html',
  styleUrl: './management-page.component.css'
})
export class ManagementPageComponent {

  openModal() {
    const modalElement = document.getElementById('userModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

}
