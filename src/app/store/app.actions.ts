import { createAction, props } from '@ngrx/store';

export const loadState = createAction('[Vehicle] Load State');
export const addVehicle = createAction('[Vehicle] Add Vehicle', props<{ item: any }>());
export const addVehicleDetail = createAction('[Vehicle] Add Vehicle Detail', props<{ item: any }>());
export const updateVehicle = createAction('[Vehicle] Update Vehicle', props<{ item: any }>());
export const updateVehicleDetail = createAction('[Vehicle] Update Vehicle Detail', props<{ item: any }>());
export const deleteVehicle = createAction('[Vehicle] Delete Vehicle', props<{ item: any }>());
export const setSelectedVehicle = createAction('[Vehicle] Set Selected Vehicle', props<{ item: any }>());
