import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { DataService } from '../../services/component.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [CommonModule, FormsModule]
})
export class FormComponent {
  
  @Input() user: User = {
    id: 0,
    name: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    education: ''
  };

  @Output() userUpdated = new EventEmitter<User>();
  @Output() userAdded = new EventEmitter<User>();
  sharedData: any;
  receivedData: any;

  constructor(private userService: UserService, private dataService: DataService) {}

  saveUser() {
    if (this.user.name && this.user.email && this.user.lastName && this.user.dateOfBirth && this.user.education) {
      if (this.user.id) {
        this.updateUser();
      } else {
        this.addUser();
      }
    } else {
      console.log('Preencha todos os campos obrigatórios');
    }
  }

  addUser() {
  
    this.userService.addUser(this.user).subscribe({
      next: (response: any) => {
        console.log('Usuário adicionado com sucesso!', response);
        this.userAdded.emit(response);  
      },
      error: (err: any) => {
        console.error('Erro ao adicionar o usuário', err);
      }
    });
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (response: any) => {
        console.log('Usuário atualizado com sucesso!', response);
        this.userUpdated.emit(response); 
      },
      error: (err: any) => {
        console.error('Erro ao atualizar o usuário', err);
      }
    });
  }

  ngOnInit(): void {
    
    this.dataService.data$.subscribe((receivedData) => {
      if (receivedData) {
        this.user = receivedData; 
      }
    });
  }

  onSubmit() {
    this.saveUser();
  }
}
