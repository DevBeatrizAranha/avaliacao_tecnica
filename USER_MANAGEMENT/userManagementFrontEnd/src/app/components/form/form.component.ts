import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/component.service';
import { dateGreaterThanTodayValidator } from './validators'; 
import { emailValidator } from './validators';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
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

  userForm: FormGroup;

  constructor(private userService: UserService, private dataService: DataService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, emailValidator()]],
      dateOfBirth: ['', [Validators.required, dateGreaterThanTodayValidator()]],
      education: ['', Validators.required]
    });
  }

  saveUser() {
    if (this.userForm.valid) {
      if (this.user.id) {
        this.updateUser();
      } else {
        this.addUser();
      }
    } else {
      alert('Preencha todos os campos obrigatórios corretamente');
    }
  }

  addUser() {
    this.userService.addUser(this.user).subscribe({
      next: (response: any) => {
        alert('Usuário adicionado com sucesso!');
        this.userAdded.emit(response);  
      },
      error: (err: any) => {
        console.error('Erro ao adicionar o usuário', err);
        alert('Erro ao adicionar o usuário');
      }
    });
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (response: any) => {
        alert('Usuário atualizado com sucesso!');
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
        this.userForm.patchValue(receivedData); // Preenche o formulário com os dados
      }
    });
  }

  onSubmit() {
    this.saveUser();
  }
}
