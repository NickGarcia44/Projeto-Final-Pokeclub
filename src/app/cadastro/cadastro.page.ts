import { Component } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  user: any;
  email!: string;
  password!: string;
  confirmPassword!: string;
  
  oApp = initializeApp(environment.firebase);
  oAuth = getAuth(this.oApp);

  constructor(private platform: Platform) {}

  register() {
    createUserWithEmailAndPassword(this.oAuth, this.email, this.password,)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário registrado:', user);
        // ... (adiciona a lógica que deseja após o registro)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Erro ${errorCode}: ${errorMessage}`);
      });
  }
  loginUser() {
    if (this.email === "" || this.password === "") {
      console.log("Email and Password are required");
      return;
    }
  
    // Verifica se o usuário já existe
    signInWithEmailAndPassword(this.oAuth, this.email, this.password)
      .then((userCredential) => {
        
        console.log("Usuário já registrado:", userCredential.user);
        this.user = { email: userCredential.user.email };

        // Usuário existe, então você pode logá-lo
      })
      .catch((signInError) => {
        if (signInError.code === 'auth/user-not-found') {
          // Usuário não existe, então tente criar um novo usuário
          createUserWithEmailAndPassword(this.oAuth, this.email, this.password)
            .then((userCredential) => {
              console.log("Novo usuário registrado:", userCredential.user);
            })
            .catch((createError) => {
              console.log("Erro ao criar usuário:", createError.code, createError.message);
            });
        } else {
          console.log("Erro ao fazer login:", signInError.code, signInError.message);

        }
      });

  }
}
