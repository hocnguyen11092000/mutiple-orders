import { inject, Injectable, OnDestroy, Signal } from '@angular/core';
import { IOrder } from '../interfaces/order.interface';
import { BehaviorSubject, scan, shareReplay, Subject, takeUntil } from 'rxjs';
import { CallCenterService } from './call-center.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class SingleOrderService implements OnDestroy {
  constructor() {
    this.handleInitState();
  }

  private readonly callCenterService = inject(CallCenterService);

  private order!: IOrder;
  private readonly orderState = new BehaviorSubject<Record<string, any>>({});
  public state$ = this.orderState.asObservable().pipe(
    scan((acc, curr) => {
      return { ...acc, ...curr };
    }),
    shareReplay(1)
  );
  destroy$ = new Subject<void>();

  //#region getters, setters
  get _order() {
    return this.order;
  }
  set _order(newOrder: IOrder) {
    this.order = newOrder;
  }

  set _state(state: any) {
    this.orderState.next(state);
  }

  get _state(): Signal<Record<string, any> | undefined> {
    return toSignal(this.state$);
  }
  //#endregion getters, setters

  //#region functions
  handleInitState() {
    this.state$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  handleSyncDataToGlobalState<T>(payload: T) {
    this.callCenterService._globalData = {
      callId: this._order.id,
      ...payload,
    };
  }
  //#endregion functions

  //#region life circles
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  //#endregion life circles
}
