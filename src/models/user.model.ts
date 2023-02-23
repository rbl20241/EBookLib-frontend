export class User {
  id: number;
  username: string;
  email: string;
  password: string;

  constructor() {
    this.id = 0;
    this.username = '';
    this.email = '';
    this.password = 'password';
  }
}
