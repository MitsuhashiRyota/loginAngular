import { Component } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Component({
  selector: 'my-app',
  template: `
  <div *ngIf="!user.id">
    <form #myFrom="ngForm" (ngSubmit)="onclick()">
      <div>
        <label for="loginId">ログインID:</label>
        <input type="text" id="id" name="id" [(ngModel)]="loginId" />
      </div>
      <div>
        <label for="loginPass">ログインパスワード:</label>
        <input type="password" id="pass" name="pass" [(ngModel)]="loginPass" />
      </div>
      <input type="submit" value="ログイン" />
    </form>
  </div>
  <div *ngIf="user.id">
    <h2>ログイン成功！</h2>
    <p>ようこそ！{{user.userName}}さん！</p>
  </div>
  `,
})
export class AppComponent  {

  loginId = 'internous';
  loginPass = 'internous01';
  result = '';

  user = {
    id: '',
    loginId: '',
    loginPassword: '',
    userName: ''
  };

  // HttpサービスのDI
  constructor(private http: Http) {
    // HttpはAngularJS標準
  }

  // Onclickイベント
  onclick() {

    let ps = new URLSearchParams();
    ps.set('loginId', this.loginId);
    ps.set('loginPass', this.loginPass)

    this.http.post('http://localhost:8080/sampleApi/', ps
    ).subscribe(
      response => {
        let responseData = response.json();

        // JSONデータを連想配列に格納
        this.user.id = responseData.id;
        this.user.loginId = responseData.loginId;
        this.user.loginPassword = responseData.loginPassword;
        this.user.userName = responseData.userName;

      },
       error => {
         alert('失敗');
       }
    );
  }
}