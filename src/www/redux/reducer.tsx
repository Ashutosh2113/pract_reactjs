import { TABLE_DATA, COUNT, RESET } from "./actionTypes";
import { combineReducers } from "redux";

const initialState = {
  data: [],
  count: 0,
};
function tableApp(state = initialState, action: any) {
  if (action.type === TABLE_DATA) {
    let data = { ...state, ...{ data: action.payload } };
    localStorage.setItem("data", JSON.stringify(data));
    return data;
  } else if (action.type === COUNT) {
    let data = { ...state, ...{ count: action.payload } };
    localStorage.setItem("data", JSON.stringify(data));
    return data;
  } else if (action.type === RESET) {
    let data = { ...initialState };
    localStorage.setItem("data", JSON.stringify(data));
    return data;
  }
  return state;
}
const tableAPP = combineReducers({
  tableApp,
});

export default tableAPP;
