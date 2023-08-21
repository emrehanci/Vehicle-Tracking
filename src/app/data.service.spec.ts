import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Vehicle } from './models/vehicle.model';
import { VehicleDetail } from './models/vehicle-detail.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data', () => {
    const mockData: Vehicle[] = [
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

    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/vehicle-list-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch vehicle details', () => {
    const id = "1";
    const mockDetail: VehicleDetail = {
      id: id,
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

    service.getVehicleDetails(id).subscribe(detail => {
      expect(detail).toEqual(mockDetail);
    });

    const req = httpMock.expectOne(`assets/vehicle-one-details.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetail);
  });
});