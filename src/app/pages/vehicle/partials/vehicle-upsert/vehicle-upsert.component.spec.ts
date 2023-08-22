import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleUpsertComponent } from './vehicle-upsert.component';
import { Store } from '@ngrx/store';
import { FormArray, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as appActions from '../../../../store/app.actions';
import { of } from 'rxjs';
import { VehicleDetail } from 'src/app/models/vehicle-detail.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { NzZorroModule } from 'src/app/ng-zorro.module';

describe('VehicleUpsertComponent', () => {
  let component: VehicleUpsertComponent;
  let fixture: ComponentFixture<VehicleUpsertComponent>;
  let storeMock: any;
  let formBuilderMock: any;
  let messageServiceMock: any;

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

  beforeEach(() => {
    storeMock = jasmine.createSpyObj(['select', 'dispatch']);
    formBuilderMock = jasmine.createSpyObj(['group', 'array']);
    messageServiceMock = jasmine.createSpyObj(['error']);

    formBuilderMock.group.and.returnValue({});
    formBuilderMock.array.and.returnValue([]);

    TestBed.configureTestingModule({
      imports: [NzZorroModule],
      declarations: [VehicleUpsertComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: UntypedFormBuilder, useValue: formBuilderMock },
        { provide: NzMessageService, useValue: messageServiceMock }
      ]
    });

    storeMock.select.and.returnValues(
      of(mockVehicles),
      of([mockVehicle]),
      of(mockVehicle)
    );

    fixture = TestBed.createComponent(VehicleUpsertComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from selectedVehicleSubscription on ngOnDestroy', () => {
    const unsubscribeSpy = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.selectedVehicleSubscription = unsubscribeSpy;

    component.ngOnDestroy();

    expect(unsubscribeSpy.unsubscribe).toHaveBeenCalled();
  });

  it('should close and dispatch setSelectedVehicle with null', () => {
    storeMock.dispatch.calls.reset();
  
    component.close();
  
    expect(storeMock.dispatch).toHaveBeenCalledWith(appActions.setSelectedVehicle({ item: null }));
  });

  it('should remove tire at given index', () => {
    const tiresArray = jasmine.createSpyObj('FormArray', ['removeAt']);
    component.validateForm = { get: () => tiresArray } as any;
    component.removeTire(1);

    expect(tiresArray.removeAt).toHaveBeenCalledWith(1);
  });

  it('should submit the form and dispatch appropriate actions', () => {
    component.selectedVehicle = mockVehicle;
    component.validateForm = { value: mockVehicle } as any;

    component.submitForm();

    expect(storeMock.dispatch).toHaveBeenCalledWith(appActions.updateVehicle({ item: { id: mockVehicle.id, lpn: mockVehicle.lpn, depot: mockVehicle.depot } }));
    expect(storeMock.dispatch).toHaveBeenCalledWith(appActions.updateVehicleDetail({ item: mockVehicle }));
  });

  it('should call updateFullScreenState on window resize', () => {
    spyOn(component, 'updateFullScreenState');

    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);

    expect(component.updateFullScreenState).toHaveBeenCalled();
  });

  it('should submit the form and dispatch create actions', () => {
    component.selectedVehicle = { id: "4" } as any;
    component.validateForm = { value: mockVehicle } as any;

    component.submitForm();

    expect(storeMock.dispatch).toHaveBeenCalledWith(appActions.addVehicle({ item: { id: mockVehicle.id, lpn: mockVehicle.lpn, depot: mockVehicle.depot } }));
    expect(storeMock.dispatch).toHaveBeenCalledWith(appActions.addVehicleDetail({ item: mockVehicle }));
  });

  it('should submit the form and expect undefined retun', () => {
    const invalidVehicleTires: VehicleDetail = {
      id: "1",
      lpn: "LPN1",
      depot: "Depot 1",
      tires: [
        { id: '1', position: '1L', mileage: '2000', mileageUnit: 'km' },
        { id: '2', position: '6L', mileage: '2500', mileageUnit: 'km' }
      ]
    };
    component.selectedVehicle = invalidVehicleTires;
    component.validateForm = { value: invalidVehicleTires } as any;

    var result = component.submitForm();

    expect(result).toBeUndefined();
  });

  it('should return true if tire positions are valid', () => {
    const validTires = [
      { id: '1', position: '1L', mileage: '2000', mileageUnit: 'km' },
      { id: '2', position: '1R', mileage: '2500', mileageUnit: 'km' }
    ];
    const result = component.checkTirePositionIsValid(validTires);

    expect(result).toBe(true);
    expect(messageServiceMock.error).not.toHaveBeenCalled();
  });

  it('should return true for valid tire positions', () => {
    const validTires = [
      { id: '1', position: '1L', mileage: '2000', mileageUnit: 'km' },
      { id: '2', position: '1R', mileage: '2500', mileageUnit: 'km' }
    ];
    const isValid = component.checkTirePositionIsValid(validTires);
    expect(isValid).toBe(true);
  });

  it('should return false for invalid tire positions', () => {
    const invalidTires = [
      { id: '1', position: '1L', mileage: '2000', mileageUnit: 'km' },
      { id: '2', position: '6L', mileage: '2500', mileageUnit: 'km' }
    ];
    const isValid = component.checkTirePositionIsValid(invalidTires);
    expect(isValid).toBe(false);
  });

  it('should return false for duplicate tire positions', () => {
    const invalidTires = [
      { id: '1', position: '1L', mileage: '2000', mileageUnit: 'km' },
      { id: '2', position: '1L', mileage: '2500', mileageUnit: 'km' }
    ];
    const isValid = component.checkTirePositionIsValid(invalidTires);
    expect(isValid).toBe(false);
  });
});