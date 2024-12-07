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


  constructor(private userService: UserService, private dataService: DataService) { }

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
        alert('Erro ao carregar o usuário para edição');
      }


    });

    this.openModal('userModal')

  }

  onFormSubmit(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          alert('Erro ao atualizar o usuário');
        }
      });
    }
    this.closeModal('userModal');
    this.loadUsers();


  }


  deleteUser(id: number): void {
    if (confirm('Você tem certeza que deseja excluir este usuário?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          this.loadUsers();
        },
        error: (err) => {
          alert('Erro ao excluir o usuário');
        }
      });
    }
  }

  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error(`Modal '${modalId}' não encontrado.`);
    }
  }

  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      } else {
        console.error(`Nenhuma instância do modal encontrada para '${modalId}'.`);
      }
    } else {
      console.error(`Modal '${modalId}' não encontrado.`);
    }
  }
  
}
