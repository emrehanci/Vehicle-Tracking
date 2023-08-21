import { appReducer, initialState } from './app.reducer';
import * as appActions from './app.actions';
import { Vehicle } from '../models/vehicle.model';
import { VehicleDetail } from '../models/vehicle-detail.model';

describe('appReducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = appReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a new vehicle to the state', () => {
    const mockVehicle: Vehicle = {
      id: '1',
      lpn: 'LPN1',
      depot: 'Depot 1'
    };
    const action = appActions.addVehicle({ item: mockVehicle });
    const state = appReducer(initialState, action);

    expect(state.vehicles).toEqual([mockVehicle]);
  });

  it('should add a new vehicle detail to the state', () => {
    const mockVehicleDetail: VehicleDetail = {
      id: '1',
      lpn: 'LPN1',
      depot: 'Depot 1',
      tires: []
    };
    const action = appActions.addVehicleDetail({ item: mockVehicleDetail });
    const state = appReducer(initialState, action);

    expect(state.vehicleDetails).toEqual([mockVehicleDetail]);
  });

  it('should update a vehicle detail in the state', () => {
    const existingState = {
      ...initialState,
      vehicleDetails: [
        {
          id: '1',
          lpn: 'LPN1',
          depot: 'Depot 1',
          tires: []
        }
      ]
    };
    const updatedDetail: VehicleDetail = {
      id: '1',
      lpn: 'Updated LPN',
      depot: 'Updated Depot',
      tires: []
    };
    const action = appActions.updateVehicleDetail({ item: updatedDetail });
    const state = appReducer(existingState, action);

    expect(state.vehicleDetails).toEqual([updatedDetail]);
  });

  it('should update a vehicle in the state', () => {
    const existingState = {
      ...initialState,
      vehicles: [
        {
          id: '1',
          lpn: 'LPN1',
          depot: 'Depot 1'
        }
      ]
    };
    const updatedVehicle: Vehicle = {
      id: '1',
      lpn: 'Updated LPN',
      depot: 'Updated Depot'
    };
    const action = appActions.updateVehicle({ item: updatedVehicle });
    const state = appReducer(existingState, action);

    expect(state.vehicles).toEqual([updatedVehicle]);
  });

  it('should delete a vehicle and its detail from the state', () => {
    const existingState = {
      ...initialState,
      vehicles: [
        {
          id: '1',
          lpn: 'LPN1',
          depot: 'Depot 1'
        }
      ],
      vehicleDetails: [
        {
          id: '1',
          lpn: 'LPN1',
          depot: 'Depot 1',
          tires: []
        }
      ]
    };
    const action = appActions.deleteVehicle({ item: '1' });
    const state = appReducer(existingState, action);

    expect(state.vehicles).toEqual([]);
    expect(state.vehicleDetails).toEqual([]);
  });

  it('should set the selected vehicle in the state', () => {
    const mockSelectedVehicle: VehicleDetail = {
      id: '1',
      lpn: 'LPN1',
      depot: 'Depot 1',
      tires: []
    };
    const action = appActions.setSelectedVehicle({ item: mockSelectedVehicle });
    const state = appReducer(initialState, action);

    expect(state.selectedVehicle).toEqual(mockSelectedVehicle);
  });

  it('should return the current state for loadState action', () => {
    const currentState = {
      ...initialState,
      vehicles: [
        {
          id: '1',
          lpn: 'LPN1',
          depot: 'Depot 1'
        }
      ],
      selectedVehicle: {
        id: '1',
        lpn: 'LPN1',
        depot: 'Depot 1',
        tires: []
      }
    };
    const action = appActions.loadState();
    const state = appReducer(currentState, action);

    expect(state).toBe(currentState);
  });
});