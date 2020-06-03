import { TABLE_DATA, COUNT, RESET } from "./actionTypes";

export function setData(data: any) {
  return { type: TABLE_DATA, payload: data };
}
export function increaseCount(data: number) {
  return { type: COUNT, payload: data };
}
export function removeAll() {
  return { type: RESET };
}
