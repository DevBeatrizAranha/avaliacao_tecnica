import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  
  newUser = {
    Name: '',
    LastName: '',
    Email: '',
    DateOfBirth: '',
    Education:''
    
  };

  constructor(private userService: UserService) {}

  // Função para chamar o serviço e adicionar o usuário
  addUser() {
    if (this.newUser.Name && this.newUser.Email && this.newUser.LastName && this.newUser.DateOfBirth && this.newUser.Education) {
      this.userService.addUser(this.newUser).subscribe({
        next: (response: any) => {
          console.log('Usuário adicionado com sucesso!', response);
          
        },
        error: (err: any) => {
          console.error('Erro ao adicionar o usuário', err);
        }
      });
    } else {
      console.log('Preencha todos os campos obrigatórios');
    }
  }
}
