import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CallCenterService } from '../../services/call-center.service';
import { SingleOrderService } from '../../services/single-order.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmOrderComponent implements OnInit {
  private readonly callCenterService = inject(CallCenterService);
  private readonly singleOrderService = inject(SingleOrderService);

  globalData$$ = this.callCenterService._globalData();
  state$$ = this.singleOrderService._state();

  ngOnInit(): void {
    console.log(this.globalData$$, this.state$$);
  }
}
