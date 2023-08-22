import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { DataService } from './data.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { VehicleDetail } from './models/vehicle-detail.model';
import { Vehicle } from './models/vehicle.model';
import { NzZorroModule } from './ng-zorro.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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
      imports: [NzZorroModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [
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

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
