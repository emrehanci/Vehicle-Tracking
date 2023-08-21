import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from 'src/app/data.service';
import { VehicleTableComponent } from './vehicle-table.component';
import * as appActions from '../../store/app.actions';
import { VehicleDetail } from 'src/app/models/vehicle-detail.model';
import { NzZorroModule } from 'src/app/ng-zorro.module';
import { VehicleUpsertComponent } from '../vehicle/partials/vehicle-upsert/vehicle-upsert.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('VehicleTableComponent', () => {
  let component: VehicleTableComponent;
  let fixture: ComponentFixture<VehicleTableComponent>;
  let storeMock: any;
  let dataServiceMock: any;
  let messageServiceMock: any;

  beforeEach(() => {
    storeMock = {
      dispatch: jasmine.createSpy(),
      select: jasmine.createSpy().and.returnValue(of([]))
    };

    dataServiceMock = {
      getData: jasmine.createSpy().and.returnValue(of([])),
      getVehicleDetails: jasmine.createSpy().and.returnValue(of([]))
    };

    messageServiceMock = {
      info: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      imports: [NzZorroModule, ReactiveFormsModule],
      declarations: [VehicleTableComponent, VehicleUpsertComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: DataService, useValue: dataServiceMock },
        { provide: NzMessageService, useValue: messageServiceMock }
      ]
    });

    fixture = TestBed.createComponent(VehicleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch deleteVehicle and show info message when confirmDelete is called', () => {
    const vehicleId = '1';
    component.confirmDelete(vehicleId);
    expect(storeMock.dispatch).toHaveBeenCalledWith(appActions.deleteVehicle({ item: vehicleId }));
    expect(messageServiceMock.info).toHaveBeenCalledWith('Vehicle is deleted.');
  });

  it('should return vehicle tires when getVehicleTires is called', () => {
    const vehicleId = '1';
    const mockVehicleDetail: VehicleDetail = {
      id: '1',
      lpn: 'LPN1',
      depot: 'Depot 1',
      tires: []
    };
    component.vehicleDetails = [mockVehicleDetail];
    const tires = component.getVehicleTires(vehicleId);
    expect(tires).toEqual(mockVehicleDetail.tires);
  });

  it('should return empty array when getVehicleTires is called unknown vehicle', () => {
    const vehicleId = '999';
    const mockVehicleDetail: VehicleDetail = {
      id: '1',
      lpn: 'LPN1',
      depot: 'Depot 1',
      tires: []
    };
    component.vehicleDetails = [mockVehicleDetail];
    const tires = component.getVehicleTires(vehicleId);
    expect(tires).toEqual([]);
  });

  it('should dispatch setSelectedVehicle action with the next ID when create is called', () => {
    const existingVehicleDetails: VehicleDetail[] = [
      { id: '1', lpn: 'LPN1', depot: 'Depot 1', tires: [] },
      { id: '3', lpn: 'LPN3', depot: 'Depot 3', tires: [] }
    ];

    component.vehicleDetails = existingVehicleDetails;

    component.create();

    const maxId = existingVehicleDetails.reduce((max, current) => (Number(current.id) > max ? Number(current.id) : max), 0);
    const nextId = (Number(maxId) + 1).toString();

    expect(storeMock.dispatch).toHaveBeenCalledWith(appActions.setSelectedVehicle({ item: { id: nextId } }));
  });

  it('should dispatch setSelectedVehicle action when edit is called', () => {
    const mockId = '1';
    const mockVehicleDetail: VehicleDetail = {
      id: '1',
      lpn: 'LPN1',
      depot: 'Depot 1',
      tires: []
    };

    component.vehicleDetails = [mockVehicleDetail];
    
    component.edit(mockId);

    expect(storeMock.dispatch).toHaveBeenCalledWith(appActions.setSelectedVehicle({ item: mockVehicleDetail }));
  });

  it('should add id to expandSet when checked is true', () => {
    const id = '123';
    const initialSetSize = component.expandSet.size;

    component.onExpandChange(id, true);

    expect(component.expandSet.size).toBe(initialSetSize + 1);
    expect(component.expandSet.has(id)).toBeTrue();
  });

  it('should delete id from expandSet when checked is false', () => {
    const id = '123';
    component.expandSet.add(id);
    const initialSetSize = component.expandSet.size;

    component.onExpandChange(id, false);

    expect(component.expandSet.size).toBe(initialSetSize - 1);
    expect(component.expandSet.has(id)).toBeFalse();
  });
});