import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormComponent } from '../form/form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { DataService } from '../../services/component.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [FormComponent, CommonModule, FormsModule]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null; 
  isEditMode: boolean = false;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  @ViewChild(FormComponent) formComponent!: FormComponent;
  @Output() dataEmitter = new EventEmitter<any>();
  searchTerm: any;
  usersFiltered!: User[];
  

  constructor(private userService: UserService, private dataService: DataService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.usersFiltered = users; 
        this.users = this.usersFiltered;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar os usuários.';
        this.isLoading = false;
      }
    });
  }

  searchUsers(): void {
    if (this.searchTerm.trim() === '') {
      this.usersFiltered = this.users;  
      return;
    }

    this.isLoading = true;
    this.userService.searchUsers(this.searchTerm).subscribe({
      next: (filteredUsers) => {
        this.usersFiltered = filteredUsers;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar os usuários.';
        this.isLoading = false;
      }
    });
  }


  sendData() {
    this.dataService.setData(this.selectedUser);
  }

 async selectUserToEdit(userId: number): Promise<void> {
    this.userService.getUserById(userId).subscribe({
      next: async (userData) => {
        this.selectedUser = userData;
        this.isEditMode = true;
        this.sendData()
      
      },
      error: (err) => {
        console.error('Erro ao carregar o usuário para edição:', err);
        alert('Erro ao carregar o usuário para edição');
      }


    });

    const modalElement = document.getElementById('userModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          await modal.show();
        }

  }

  onFormSubmit(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          console.log('Usuário atualizado com sucesso!2');
          this.loadUsers(); 
          const modalElement = document.getElementById('userModal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.hide();
          }
        },
        error: (err) => {
          console.error('Erro ao atualizar o usuário:', err);
          alert('Erro ao atualizar o usuário');
        }
      });
    }
     
  }


  deleteUser(id: number): void {
    if (confirm('Você tem certeza que deseja excluir este usuário?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          this.loadUsers();
        },
        error: (err) => {
          console.error('Erro ao excluir o usuário:', err);
          alert('Erro ao excluir o usuário');
        }
      });
    }
  }
}
