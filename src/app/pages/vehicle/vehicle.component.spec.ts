import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleComponent } from './vehicle.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/data.service';
import { Subscription, of } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleDetail } from 'src/app/models/vehicle-detail.model';
import { NzZorroModule } from 'src/app/ng-zorro.module';
import { VehicleUpsertComponent } from 'src/app/pages/vehicle/partials/vehicle-upsert/vehicle-upsert.component';
import * as appActions from '../../store/app.actions';

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;
  let nzMessageServiceMock: any;
  let storeMock: any;
  let dataServiceMock: any;
  let dispatchedActions: any[];

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
    nzMessageServiceMock = jasmine.createSpyObj(['info']);
    storeMock = jasmine.createSpyObj(['dispatch', 'select']);
    dataServiceMock = jasmine.createSpyObj(['getVehicleDetails']);

    dispatchedActions = []; 

    dataServiceMock.getData = () => of(mockVehicles);

    TestBed.configureTestingModule({
      imports: [NzZorroModule],
      declarations: [VehicleComponent, VehicleUpsertComponent],
      providers: [
        { provide: NzMessageService, useValue: nzMessageServiceMock },
        { provide: Store, useValue: storeMock },
        { provide: DataService, useValue: dataServiceMock },
      ],
    });

    storeMock.dispatch.and.callFake((action: any) => dispatchedActions.push(action));

    storeMock.select.and.returnValues(
      of(mockVehicles),
      of([mockVehicle]),
      of(mockVehicle)
    );

    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should dispatch deleteVehicle action and show info message when confirmDelete is called', () => {
    const mockId = '1';

    component.confirmDelete(mockId);

    expect(storeMock.dispatch).toHaveBeenCalledWith(appActions.deleteVehicle({ item: mockId }));
    expect(nzMessageServiceMock.info).toHaveBeenCalledWith('Vehicle is deleted.');
  });

  it('should return the correct VehicleDetail when getVehicleDetail is called', () => {
    const mockId = '1';
    const mockVehicleDetail: VehicleDetail = {
      id: '1',
      lpn: 'LPN1',
      depot: 'Depot 1',
      tires: []
    };

    component.vehicleDetails = [mockVehicleDetail];
    
    const result = component.getVehicleDetail(mockId);

    expect(result).toEqual(mockVehicleDetail);
  });

  it('should return undefined when getVehicleDetail is called with a non-existent ID', () => {
    const nonExistentId = '999';

    component.vehicleDetails = [
      {
        id: '1',
        lpn: 'LPN1',
        depot: 'Depot 1',
        tires: []
      }
    ];
    
    const result = component.getVehicleDetail(nonExistentId);

    expect(result).toBeUndefined();
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

  it('should update pageIndex when onPageIndexChange is called', () => {
    const newPageIndex = 2;

    component.onPageIndexChange(newPageIndex);

    expect(component.pageIndex).toBe(newPageIndex);
  });

  it('should update pageSize when onPageSizeChange is called', () => {
    const newPageSize = 10;

    component.onPageSizeChange(newPageSize);

    expect(component.pageSize).toBe(newPageSize);
  });

  it('should return the correct paged data when getPagedData is called', () => {
    const mockVehicles: Vehicle[] = [
      { id: '1', lpn: 'LPN1', depot: 'Depot 1' },
      { id: '2', lpn: 'LPN2', depot: 'Depot 2' },
      { id: '3', lpn: 'LPN3', depot: 'Depot 3' }
    ];

    component.vehicles = mockVehicles;

    component.pageIndex = 2;
    component.pageSize = 2;

    const pagedData = component.getPagedData();

    expect(pagedData).toEqual([mockVehicles[2]]);
  });
});
