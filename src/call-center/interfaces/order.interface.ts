export interface IOrder {
  id: string;
  name: string;
}

export interface ICallPayload {
  append?: boolean;
  item: IOrder | Array<IOrder>;
}

export interface ICallCenterData {
  callId: string;
  [key: string]: any;
}
