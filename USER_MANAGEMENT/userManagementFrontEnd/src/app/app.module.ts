import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import correto
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { FormComponent } from './components/form/form.component';
import { ManagementPageComponent } from './management-page/management-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ManagementPageComponent
  ],
  imports: [
    BrowserModule,   
    HttpClientModule, 
    FormsModule
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
