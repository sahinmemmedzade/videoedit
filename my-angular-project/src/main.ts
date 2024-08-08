import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http'; // HttpClient üçün təmin etməyi unutmayın

bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,
    provideHttpClient() // HttpClient üçün təminat
  ]
}).catch(err => console.error(err));
