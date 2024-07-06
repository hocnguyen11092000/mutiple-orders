import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { StepService } from '../../services/step.service';
import { StepEnum } from '../../enums/step.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { CallCenterService } from '../../services/call-center.service';
import { SingleOrderService } from '../../services/single-order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NzInputModule, NzButtonModule],
})
export class CreateOrderComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly stepService = inject(StepService);
  private readonly callCenterService = inject(CallCenterService);
  private readonly singleOrderService = inject(SingleOrderService);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = this.fb.group({
    address: ['Go vap, Ho Chi Minh'],
    notes: ['lorem ipsum dolor sit'],
  });

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(200))
      .subscribe((formData) => {
        this.singleOrderService.handleSyncDataToGlobalState({
          formData: formData,
        });

        this.singleOrderService._state = {
          formData,
        };
      });
  }

  handleGotoConfirmOrder() {
    this.stepService._step = StepEnum.CONFIRM_ORDER;
  }

  handleUpdateOrder() {
    this.singleOrderService._state = {
      extraData: Math.random(),
    };

    this.singleOrderService.handleSyncDataToGlobalState({
      extraData: Math.random(),
    });
  }
}
