import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';


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
}
