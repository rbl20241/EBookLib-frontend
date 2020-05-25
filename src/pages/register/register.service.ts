import {Injectable} from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class RegisterService extends BaseService {
  constructor(private fb: FormBuilder) {
    super();
  }

  public constructRegisterForm(): FormGroup {
    return this.fb.group({
      id: '',
      username: ['', Validators.required],
      password: ['password', ''],
      email: ['', [Validators.required, Validators.email]]
    });
  }


}
