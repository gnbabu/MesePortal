import { Component, inject } from '@angular/core';
import { NewsComponent } from '../news/news.component';
import { AuthService } from '../../core/services/auth.service';
import { AuthStore } from '../../core/store/auth.store';
import { Router } from '@angular/router';
import { ILoginRequest } from '../../core/models/core.models';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NewsComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private router = inject(Router);
  loginRequest: ILoginRequest = { userName: '', password: '' };

  onSubmit(form: NgForm) {
    debugger;
    if (form.valid) {
      this.authService.login(this.loginRequest).subscribe({
        next: () => {
          // AuthStore updated automatically
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid credentials');
        },
      });
    }
  }
}
