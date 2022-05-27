import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare function runTest(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  userForm: FormGroup;
  _http: HttpClient;
  _baseUrl: string = "";

  constructor(private formBuilder: FormBuilder, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this._http = http; this._baseUrl = baseUrl;
    this.userForm = this.formBuilder.group({
      SaveName: ['', Validators.required],
      Json: ['',],
    });
  }

  public ngOnInit(): void {

  }

  save() {
    var result = runTest();
    this.userForm.controls['Json'].setValue(result);
    this._http
      .post(this._baseUrl + 'test/saveData', this.userForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          console.warn('submitted', this.userForm.value);
          setTimeout(() => { this.router.navigate(['/fetch-data']); }, 1000);
        },
        error: (err) => { },
      });
  }

  get formControls() { return this.userForm.controls; }
}
