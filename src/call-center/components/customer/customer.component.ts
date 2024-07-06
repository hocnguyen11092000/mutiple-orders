import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { StepService } from '../../services/step.service';
import { StepEnum } from '../../enums/step.enum';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCardModule, NzGridModule, NzButtonModule],
})
export class CustomerComponent {
  private readonly StepService = inject(StepService);

  handleGotoCreateOrder() {
    this.StepService._step = StepEnum.CREATE_ORDER;
  }
}
