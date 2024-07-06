import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepEnum } from '../enums/step.enum';

@Injectable()
export class StepService {
  private readonly step = new BehaviorSubject<StepEnum>(StepEnum.CALL);
  public step$ = this.step.asObservable();

  get _step() {
    return this.step.getValue();
  }

  set _step(step: StepEnum) {
    this.step.next(step);
  }
}
