import { TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as appReducer from './app.reducer';
import * as appSelectors from './app.selectors';
import { VehicleDetail } from '../models/vehicle-detail.model';
import { Vehicle } from '../models/vehicle.model';

describe('App Selectors', () => {
  let store: MockStore<appReducer.AppState>;
  
  const mockVehicles: Vehicle[] = [
    {
      id: "1",
      lpn: "LPN1",
      depot: "Depot 1"
    },
    {
      id: "2",
      lpn: "LPN2",
      depot: "Depot 2"
    },
    {
      id: "3",
      lpn: "LPN3",
      depot: "Depot 3"
    }
  ];

  const mockVehicle: VehicleDetail = {
    id: "1",
    lpn: "LPN1",
    depot: "Depot 1",
    tires: [
      {
        id: "1",
        position: "1L",
        mileage: "2000",
        mileageUnit: "km"
      },
      {
        id: "2",
        position: "1R",
        mileage: "2500",
        mileageUnit: "km"
      },
      {
        id: "3",
        position: "2L",
        mileage: "1500",
        mileageUnit: "km"
      },
      {
        id: "4",
        position: "2R",
        mileage: "1000",
        mileageUnit: "km"
      }
    ]
  };

  const initialAppState: appReducer.AppState = {
    vehicles: mockVehicles,
    selectedVehicle: mockVehicle,
    vehicleDetails: [mockVehicle],
  };

  const initialState = {
    app: initialAppState
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          app: combineReducers(appReducer.appReducer),
        }),
      ],
      providers: [provideMockStore({ initialState })],
    });

    store = TestBed.inject(MockStore);
  });

  it('should select vehicles', () => {
    let result: any;
    store.select(appSelectors.selectVehicles).subscribe(value => {
      result = value;
    });

    expect(result).toEqual(initialAppState.vehicles);
  });

  it('should select selected vehicle', () => {
    let result: any;
    store.select(appSelectors.selectedVehicle).subscribe(value => {
      result = value;
    });

    expect(result).toEqual(initialAppState.selectedVehicle);
  });

  it('should select vehicle details', () => {
    let result: any;
    store.select(appSelectors.selectVehicleDetails).subscribe(value => {
      result = value;
    });

    expect(result).toEqual(initialAppState.vehicleDetails);
  });
});