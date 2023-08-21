import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { Component, Input } from '@angular/core';
import { VehicleDetail } from 'src/app/models/vehicle-detail.model';

@Component({ selector: 'app-tire-detail', template: '' })
class MockTireDetailComponent {
  @Input() tire: any;
  @Input() tireCount: number = 2;
}

describe('VehicleDetailComponent', () => {
  let component: VehicleDetailComponent;
  let fixture: ComponentFixture<VehicleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleDetailComponent, MockTireDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the selected vehicle details', () => {
    const selectedVehicle: VehicleDetail = {
      id: '1',
      lpn: 'LPN1',
      depot: 'Depot 1',
      tires: [
        { id: '1', position: '1L', mileage: '1000', mileageUnit: 'km' },
        { id: '2', position: '1R', mileage: '1200', mileageUnit: 'km' },
        { id: '3', position: '2L', mileage: '1000', mileageUnit: 'km' },
        { id: '4', position: '2R', mileage: '1200', mileageUnit: 'km' }
      ]
    };

    component.selectedVehicle = selectedVehicle;
    fixture.detectChanges();

    const vehicleDetail = fixture.nativeElement;
    const tireDetailComponents = vehicleDetail.querySelectorAll('app-tire-detail');
    expect(tireDetailComponents.length).toBe(selectedVehicle.tires.length);
  });

  it('should not display anything if selected vehicle is null', () => {
    component.selectedVehicle = null;
    fixture.detectChanges();

    const vehicleDetail = fixture.nativeElement;
    const tireDetailComponents = vehicleDetail.querySelectorAll('app-tire-detail');
    expect(tireDetailComponents.length).toBe(0);
  });
});