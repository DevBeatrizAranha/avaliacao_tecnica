import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http'; 


import { UserService } from './services/user.service';


import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
    UserService,
    CommonModule,
    
   
  ],
  providers: [ 
    provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
