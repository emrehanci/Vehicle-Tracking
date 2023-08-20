import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectVehicles = createSelector(
  selectAppState,
  state => state.vehicles
);

export const selectedVehicle = createSelector(
  selectAppState,
  state => state.selectedVehicle
);

export const selectVehicleDetails = createSelector(
  selectAppState,
  state => state.vehicleDetails
);