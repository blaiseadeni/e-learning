import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Role } from '../models/Model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent  {
  
  dark: boolean;
  loginForm: FormGroup;
  checked: boolean;
  
  role: Role;
  status: string ;
  loginDialog: boolean = false;
  infoDialog: boolean = false;
  submitted: boolean = false;
  
  data = {
    username: '',
    password: ''
  };
  
  confPassword: any;
  userId: any;
  
  loginUpd = {
    name: '',
    password:''
  }
  /**
  *
  */
  constructor(private service: LoginService,
    private messageService: MessageService,
    private router: Router
    ) { }
    
    
    ngOnInit() {
      this.status = localStorage.getItem('status');
      this.userId = localStorage.getItem('id');
      this.dark = false;
      
      this.loginForm = new FormGroup({
        user: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordConfirm: new FormControl('',Validators.required),
        
      })
    }
    
    
    
    
    login() {
      this.service.login(this.data).subscribe(
        (res: any) => {
          const user = res;
          localStorage.setItem('role', user.role);
          localStorage.setItem('status', user.status);
          localStorage.setItem('active', user.active);
          localStorage.setItem('id', user.id);
          localStorage.setItem('etudiantId', user.etudiantId);
          if (user.role !== null) {
            if (user.active === true) {
              if (user.status === true) {
                if(user.role === "Admin") this.router.navigateByUrl('/admin'); 
                if(user.role === "Etudiant") this.router.navigateByUrl('/student'); 
                if(user.role === "Enseignant") this.router.navigateByUrl('/teacher'); 
              } else {
                this.infoDialog = true;
              }
            } else {
              this.messageService.add({ severity: 'error', summary: 'Login', detail: 'Compte desactiver', life: 3000 });
            }
          }
          
          // localStorage.setItem('user', JSON.stringify(user));
        },
        err => {
          if (err.status == 500) 
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Incorrect username or password.', life: 3000 });
          else
          console.log(err);
        }
        );
      }
      
      // update() {
      //   console.log(this.loginUpd)
      //   this.service.update(this.userId, this.loginUpd).subscribe(
      //     (res: any) => {
      //       this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modification effectuée avec success', life: 3000 });
      //       this.hide();
      //     },
      //     err => {
      //       if (err.status == 400)
      //       this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur de modification.', life: 3000 });
      //       else
      //       console.log(err);
      //     }
      //     );
      //   }
      
      update() {
        if (this.loginForm.valid) {
          const request = {
            username: this.userValue.value,
            password: this.passwordValue.value
          }
          if (request.password === this.confPasswordValue.value) {
            this.service.update(this.userId, request)
            .subscribe({
              next: (response) => {
                this.loginDialog = false;
                this.loginForm.get("user")?.patchValue('');
                this.loginForm.get("password")?.patchValue('');
                this.loginForm.get("passwordConfirm")?.patchValue('');
              },
              complete: () => {
                this.messageService.add({ severity: 'success', summary: 'Modification', detail: ' Modification effectuée avec succès', life: 3000 });
                this.loginDialog = false;
                this.loginForm.get("user")?.patchValue('');
                this.loginForm.get("password")?.patchValue('');
                this.loginForm.get("passwordConfirm")?.patchValue('');
              },
              error: (e) => {
                this.messageService.add({ severity: 'success', summary: 'Modification', detail: 'Modification effectuée avec succès', life: 3000 });
                this.loginDialog = false;
                this.loginForm.get("user")?.patchValue('');
                this.loginForm.get("password")?.patchValue('');
                this.loginForm.get("passwordConfirm")?.patchValue('');
              }
            })
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Les deux mots de passe ne correspondent pas.', life: 3000 });
          }
        } else {
          this.validateAllFields(this.loginForm);
        }
      }
      
  modifLogin(){
     this.infoDialog = false;
     this.loginDialog = true;
  }
      
      hide() {
        this.loginDialog = false;
        this.submitted = false;
      }
      
      get userValue() {
        return this.loginForm.get('user')
      }
      get passwordValue() {
        return this.loginForm.get('password')
      }
      get confPasswordValue() {
        return this.loginForm.get('passwordConfirm')
      }
      
      private validateAllFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
          const control = formGroup.get(field)
          
          if (control instanceof FormControl) {
            control.markAsDirty({ onlySelf: true })
          } else if (control instanceof FormGroup) {
            this.validateAllFields(control)
          }
        })
      }
      
    }
    