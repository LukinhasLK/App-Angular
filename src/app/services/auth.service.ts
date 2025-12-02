import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;
  private readonly USERS_KEY = 'delivery_users';
  private readonly CURRENT_USER_KEY = 'delivery_current_user';

  constructor() {
    this.loadUsers();
    this.loadCurrentUser();
  }

  private loadUsers() {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    if (usersJson) {
      this.users = JSON.parse(usersJson);
    }
  }

  private saveUsers() {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users));
  }

  private loadCurrentUser() {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
    }
  }

  private saveCurrentUser() {
    if (this.currentUser) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  register(name: string, email: string, password: string): boolean {
    // Verifica se o email já está cadastrado
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    // Cria novo usuário
    const newUser: User = { name, email, password };
    this.users.push(newUser);
    this.saveUsers();
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      this.saveCurrentUser();
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    this.saveCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserName(): string {
    return this.currentUser?.name || 'Usuário';
  }
}
