import {Injectable} from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class UpdateService extends BaseService {
  constructor(private fb: FormBuilder) {
    super();
  }

  public constructUpdateForm(): FormGroup {
    return this.fb.group({
      isUpdateWithApi: [null, ''],
    });
  }


}
