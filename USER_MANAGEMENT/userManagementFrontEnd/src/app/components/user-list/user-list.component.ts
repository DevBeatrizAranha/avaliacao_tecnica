import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormComponent } from '../form/form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
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
  @Input() user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar os usuários.';
        this.isLoading = false;
      }
    });
  }

  selectUserToEdit(userId: number): void {
    this.userService.getUserById(userId).subscribe({
      next: (userData) => {
        this.selectedUser = userData;
        this.isEditMode = true;
        
    
        const modalElement = document.getElementById('userModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar o usuário para edição:', err);
      }
    });
  }

  onFormSubmit(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          console.log('Usuário atualizado com sucesso!');
          this.loadUsers(); 

          const modalElement = document.getElementById('userModal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.hide();
          }
        },
        error: (err) => {
          console.error('Erro ao atualizar o usuário:', err);
        }
      });
    }
  }

  openModal(user: User): void {
    this.selectedUser = { ...user }; // Evita alterar diretamente o objeto original.
    const modalElement = document.getElementById('userModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteUser(id: number): void {
    if (confirm('Você tem certeza que deseja excluir este usuário?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          console.log('Usuário excluído com sucesso!');
          this.loadUsers();
        },
        error: (err) => {
          console.error('Erro ao excluir o usuário:', err);
        }
      });
    }
  }
}
