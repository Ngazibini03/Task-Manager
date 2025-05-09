import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']  // Fixed incorrect property
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required]],  // Changed to match backend
      lastName: [null, [Validators.required]],   // Added lastName
      email: [null, [Validators.required, Validators.email]],
      role: [null, [Validators.required]],       // Added role
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    console.log(this.signupForm.value);

    const { firstName, lastName, email, role, password, confirmPassword } = this.signupForm.value;

    if (password !== confirmPassword) {
      this.snackbar.open("Passwords do not match", "Close", { duration: 3000, panelClass: "error-snackbar" });
      return;
    }

    const signupData = { firstName, lastName, email, role, password };

    this.authService.signup(signupData).subscribe(
      (res) => {
        console.log(res);
        if (res && res.email) {  // The backend returns a UserDto with email
          this.snackbar.open("Signup successful!", "Close", { duration: 3000 });
          this.router.navigateByUrl("/login");
        } else {
          this.snackbar.open("Signup failed. Please try again.", "Close", { duration: 3000, panelClass: "error-snackbar" });
        }
      },
      (error) => {
        console.error('Signup error:', error);
        this.snackbar.open(error.error || "Signup failed. Try again.", "Close", { duration: 3000, panelClass: "error-snackbar" });
      }
    );
  }
}
