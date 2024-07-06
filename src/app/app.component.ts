import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CallCenterService } from '../call-center/services/call-center.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderComponent } from '../call-center/components/order/order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NzButtonModule, NzTabsModule, OrderComponent],
})
export class AppComponent implements OnInit {
  private readonly callCenterService = inject(CallCenterService);

  title = 'muti-order';
  call$$ = toSignal(this.callCenterService.calls$);

  ngOnInit(): void {
    this.callCenterService._calls = {
      append: false,
      item: [
        {
          id: 'Call 1',
          name: 'Call 1',
        },
        {
          id: 'Call 2',
          name: 'Call 2',
        },
        {
          id: 'Call 3',
          name: 'Call 3',
        },
      ],
    };
  }
}
