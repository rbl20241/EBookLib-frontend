import {Injectable} from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class LoginService extends BaseService {
  constructor(private fb: FormBuilder) {
    super();
  }

  public constructLoginForm(): FormGroup {
    return this.fb.group({
      id: '',
      password: ['password', ''],
      username: ['Rene', Validators.required]
    });
  }


}
