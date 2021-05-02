import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private formBuilder:FormBuilder, 
    private authService:AuthService, 
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      debugger
      this.router.navigate(["/"])
    }
    else
    {
      this.createRegisterForm()
    }
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["",Validators.required],
      password: ["",Validators.required],
      firstName:[""],
      lastName:[""]
    })
 }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value)

      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success("Kayıt başarılı")
        this.router.navigate(["/login"])
      }, responseError=>{
        this.toastrService.error(responseError.error)
      })
    } else {
      this.toastrService.error("Email ve parola boş geçilemez")
    }
  }
}

