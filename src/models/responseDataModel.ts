import { ResponseModel } from "./responseModel";

export interface ResponseDataModel<T> extends ResponseModel {
  data: T
}
export interface ResponseDataListModel<T> extends ResponseModel {
  data: T[]
}
