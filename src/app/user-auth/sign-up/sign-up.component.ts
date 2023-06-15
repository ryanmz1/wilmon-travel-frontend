import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl,ValidationErrors,Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('signUpModal',{ static: true })
  private signUpEl!: ElementRef;
  @ViewChild('verifyModal',{ static: true })
  private verifyEl!: ElementRef;
  @ViewChild('notification',{ static: true })
  private notifiEl!: ElementRef
  public signUpForm = this.formBuilder.group({
    email: new FormControl('', {validators:[Validators.required, Validators.email],updateOn: 'blur'}),
    password: new FormControl('', {validators:Validators.minLength(8), updateOn: 'blur'}),
    passwordConfirm: new FormControl('', {validators:Validators.minLength(8),updateOn: 'blur'}),
  }, {
    validators: [this.passwordMatchValidator],
    updateOn: 'blur'
  });
  public verifyForm = this.formBuilder.group({
    email: '',
    code: ''
  });
  public notifiContent = {
    title: 'Registration successful.',
    message: 'Please check your email inbox or spam folder for your verification code.'
  }

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private render: Renderer2) { }

  ngOnInit(): void {
    this.openSignUpModal();
  }

  public openSignUpModal() {
    this.signUpEl.nativeElement.classList.add('is-active');
  }

  public closeSignUpModal() {
    this.signUpEl.nativeElement.classList.remove('is-active');
  }

  public openVerifyModal() {
    this.verifyEl.nativeElement.classList.add('is-active');
  }

  public closeVerifyModal() {
    this.verifyEl.nativeElement.classList.remove('is-active');
  }

  get email() { return this.signUpForm.get('email'); }

  get password() { return this.signUpForm.get('password'); }

  public onSignUp() {
    console.log('after signup',this.signUpForm.get('email')?.errors?.['email']);
    let { email, password, passwordConfirm } = this.signUpForm.value;
    email = typeof email === 'string'? email : '';
    password = typeof password === 'string'? password : '';
    passwordConfirm = typeof passwordConfirm === 'string'? passwordConfirm : '';
    console.log(email,password,passwordConfirm);
    if (this.signUpForm.valid) {
      this.authService.signUp(email, password, (res: any) => {
        const cognitoUser = res.user;
        console.log('user name is ' + cognitoUser.getUsername());
        this.signUpForm.reset();
        this.closeSignUpModal();
        this.openVerifyModal();
      }, (error: Error)=>{
        window.alert(error);
      });
    } else {
      window.alert(this.signUpForm.errors);
    }
  }

  public toVerify() {
    this.signUpForm.reset();
    this.closeSignUpModal();
    this.openVerifyModal();
  }

  public onVerify() {
    console.log('verifyed');
    let {email, code}=this.verifyForm.value;
    email = typeof email === 'string'? email : '';
    code = typeof code === 'string'? code : '';
    console.log(email, code);
    this.authService.verify(email, code, (res: any) => {
      this.onSuccessStyle();
      setTimeout(() => {
        this.verifyForm.reset();
        this.closeVerifyModal();
        this.router.navigateByUrl('/auth/login');
      }, 1500);
    }, (error: Error) => {
      window.alert(error);
    });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    return control.get('password')?.value === control.get('passwordConfirm')?.value
       ? null : {'password mismatch': true};
  }

  private onSuccessStyle() {
    this.notifiContent.title='Verification successful.',
    this.notifiContent.message='You will now be redirected to the login page...'
    this.render.addClass(this.notifiEl.nativeElement, 'is-success');
    this.render.addClass(this.notifiEl.nativeElement, 'is-light');
  }

}
