import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    })
  }

  public async signInUser(): Promise<void> {
    if (this.loginForm.invalid) return;
    Swal.fire({
      title: 'Auto close alert!',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const { name, email, password } = this.loginForm.value;
    try {
      await this.authSrv.loginUser(name, email, password);
      Swal.close();
      this.router.navigate(['/']);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: (error as any).message
      })
    }
  }

}
