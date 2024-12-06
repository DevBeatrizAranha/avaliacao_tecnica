import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  name: string = '';
  email: string = '';
  education: string = '';
  dateOfBirth: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(name?: string, dateOfBirth?: string, email?: string, education?: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUsers(name, dateOfBirth, email, education).subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar usuários';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  editUser(user: any): void {
    console.log('Editar usuário:', user);
    // Aqui você pode implementar a lógica para edição do usuário
    // Por exemplo, abrir um modal com as informações do usuário
  }

  deleteUser(userId: number): void {
    console.log('Excluir usuário com ID:', userId);
    // Aqui você pode implementar a lógica para exclusão do usuário
   
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== userId);
        console.log('Usuário excluído com sucesso');
      },
      error: (err: any) => {
        console.error('Erro ao excluir usuário:', err);
        this.errorMessage = 'Erro ao excluir o usuário';
      }
    });
  }
}
