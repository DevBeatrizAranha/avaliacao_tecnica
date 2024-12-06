import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { FormComponent } from '../components/form/form.component';
import { UserListComponent } from '../components/user-list/user-list.component';
import { HeaderComponent } from '../components/header/header.component';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-management-page',
  imports: [ FormComponent, UserListComponent, FormsModule, HeaderComponent],
  templateUrl: './management-page.component.html',
  styleUrl: './management-page.component.css'
})
export class ManagementPageComponent {

  searchTerm: string = '';

  openModal() {
    const modalElement = document.getElementById('userModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

}
