import { createReducer, on } from '@ngrx/store';
import * as appActions from './app.actions';
import { Vehicle } from '../models/vehicle.model';
import { VehicleDetail } from '../models/vehicle-detail.model';

export interface AppState {
  vehicles: Vehicle[];
  selectedVehicle: VehicleDetail | null;
  vehicleDetails: VehicleDetail[];
}

export const initialState: AppState = {
  vehicles: [],
  selectedVehicle: null,
  vehicleDetails: []
};

export const appReducer = createReducer(
  initialState,
  on(appActions.loadState, state => state),
  on(appActions.addVehicle, (state, { item }) => ({ ...state, vehicles: [...state.vehicles, item] })),
  on(appActions.addVehicleDetail, (state, { item }) => ({ ...state, vehicleDetails: [...state.vehicleDetails, item] })),
  on(appActions.updateVehicleDetail, (state, { item }) => ({ ...state, vehicleDetails: state.vehicleDetails.map(i => (i.id === item.id ? item : i)) })),
  on(appActions.updateVehicle, (state, { item }) => ({ ...state, vehicles: state.vehicles.map(i => (i.id === item.id ? item : i)) })),
  on(appActions.deleteVehicle, (state, { item }) => ({ ...state, vehicles: state.vehicles.filter(i => i.id !== item), vehicleDetails: state.vehicleDetails.filter(i => i.id !== item) })),
  on(appActions.setSelectedVehicle, (state, { item }) => ({ ...state, selectedVehicle: item })),
);
