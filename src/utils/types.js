export const FETCH_USERS = "FETCH_USERS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const GET_USER = "GET_USER";
export const SEARCH_USER = "SEARCH_USER";
export const AUTH_USER = "AUTH_USER";

export const ADD_PROJECT = "ADD_PROJECT";
export const FETCH_USER_PROJECTS = "FETCH_USER_PROJECTS";
export const FETCH_DEVICES = "FETCH_DEVICES";
export const UPDATE_DEVICE = "UPDATE_DEVICE";
export const DELETE_DEVICE = "DELETE_DEVICE";
export const ASSIGN_DEVICE = "ASSIGN_DEVICE";
export const UNASSIGN_DEVICE = "UNASSIGN_DEVICE";
export const USER_DEVICES = "USER_DEVICES";
export const ADD_USER_DEVICE = "ADD_USER_DEVICE";
export const UPDATE_USER_DEVICE = "UPDATE_USER_DEVICE";
export const FETCH_SHRED_USERS = "FETCH_SHRED_USERS";
export const FETCH_SHRED_DEVICES = "FETCH_SHRED_DEVICES";
export const DELETE_SHRED_DEVICE = "DELETE_SHRED_DEVICE";
export const ADD_SHRED_DEVICE = "ADD_SHRED_DEVICE";
export const DELETE_USER_SHRED_DEVICE = "DELETE_USER_SHRED_DEVICE";
export const USER_ALERTS = "USER_ALERTS";
export const DELETE_ALERT = "DELETE_ALERT";
export const DELETE_MANY_ALERT = "DELETE_MANY_ALERT";
export const USER_TRANSACTION_HEADS = "USER_TRANSACTION_HEADS";
export const ADD_USER_TRANSACTION_HEADS = "ADD_USER_TRANSACTION_HEADS";
export const USER_TRANSACTIONS = "USER_TRANSACTIONS";
export const ADD_USER_TRANSACTIONS = "ADD_USER_TRANSACTIONS";
export const UPDATE_USER_TRANSACTION = "UPDATE_USER_TRANSACTION";
export const DELETE_USER_TRANSACTION = "DELETE_USER_TRANSACTION";

const vehicles = [
  "Car",
  "Bike",
  "Micro-Bus",
  "Bus",
  "Truck",
  "CNG",
  "Water-Vessel",
  "Tractor",
];

const getVehicleType = (index) => {
  return vehicles[index - 1];
};

export { getVehicleType };
