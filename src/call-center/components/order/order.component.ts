import { StepEnum } from './../../enums/step.enum';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { IOrder } from '../../interfaces/order.interface';
import { SingleOrderService } from '../../services/single-order.service';
import _ from 'lodash';
import { StepService } from '../../services/step.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomerComponent } from '../customer/customer.component';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { ConfirmOrderComponent } from '../confirm-order/confirm-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SingleOrderService, StepService],
  imports: [CustomerComponent, CreateOrderComponent, ConfirmOrderComponent],
})
export class OrderComponent implements OnInit {
  private readonly singleOrderService = inject(SingleOrderService);
  private readonly stepService = inject(StepService);

  @Input({ required: true }) order!: IOrder;
  step$$ = toSignal(this.stepService.step$);
  StepEnum = StepEnum;

  ngOnInit(): void {
    if (!_.isEmpty(this.order)) {
      this.singleOrderService._order = this.order;
    }
  }
}
