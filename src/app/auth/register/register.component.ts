import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  async createUser(): Promise<void> {
    if (this.registerForm.invalid) return;
    Swal.fire({
      title: 'Auto close alert!',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const { name, password, email } = this.registerForm.value;
    try {
      const credentials = await this.authSrv.createUser(name, email, password);
      console.log("CREDENCIALES =>", credentials);
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
