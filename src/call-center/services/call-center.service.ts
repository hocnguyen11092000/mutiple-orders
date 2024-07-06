import { Injectable, Signal } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, scan, shareReplay } from 'rxjs';
import {
  ICallCenterData,
  ICallPayload,
  IOrder,
} from '../interfaces/order.interface';
import { toSignal } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root',
})
export class CallCenterService {
  constructor() {
    this.handleInitGlobalData();
  }

  //#region subjects
  private readonly calls = new BehaviorSubject<Array<IOrder>>([]);
  private readonly globalData = new BehaviorSubject<any>({});

  public calls$ = this.calls.asObservable();
  public globalData$ = this.globalData.pipe(
    scan((acc: Record<string, any>, curr: any) => {
      const { callId, ...rest } = curr;

      if (_.isEmpty(curr)) return acc;

      return { ...acc, [callId]: { ...acc[callId], ...rest } };
    }, {}),
    shareReplay(1)
  );
  //#endregion subjects

  //#region getters, setters
  get _calls(): Array<IOrder> {
    return this.calls.getValue();
  }
  set _calls(payload: ICallPayload) {
    const { append, item } = payload;

    if (append && _.isPlainObject(item)) {
      this.calls.next([...this._calls, item as IOrder] as Array<IOrder>);
    } else {
      this.calls.next(item as Array<IOrder>);
    }
  }

  get _globalData(): Signal<Record<string, any> | undefined> {
    return toSignal(this.globalData$);
  }

  set _globalData(payload: ICallCenterData) {
    const { callId, ...rest } = payload;

    this.globalData.next({
      callId,
      ...rest,
    });
  }
  //#region getters, setters

  //#region handling functions
  handleInitGlobalData() {
    this.globalData$.subscribe();
  }

  handleRemoveCall(item: IOrder) {
    this._calls = {
      item: _.filter(this._calls, (call: IOrder) => call.id !== item.id),
    };
  }

  getDataByCallId(callId: string) {
    if (!callId) return null;

    return null;
  }
  //#endregion handling functions
}
