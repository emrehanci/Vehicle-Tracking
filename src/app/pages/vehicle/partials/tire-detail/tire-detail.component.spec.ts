import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TireDetailComponent } from './tire-detail.component';
import { Component, Input } from '@angular/core';
import { Tire } from 'src/app/models/tire.model';
import { NzZorroModule } from 'src/app/ng-zorro.module';

@Component({ selector: 'app-tire-detail', template: '' })
class MockTireDetailComponent {}

describe('TireDetailComponent', () => {
  let component: TireDetailComponent;
  let fixture: ComponentFixture<TireDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzZorroModule],
      declarations: [TireDetailComponent, MockTireDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TireDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate tire mileage message correctly when tire is provided', () => {
    const mockTire: Tire = {
      id: '1',
      position: '1L',
      mileage: '1000',
      mileageUnit: 'km'
    };
    component.tire = mockTire;
    fixture.detectChanges();

    const generatedMessage = component.generateTireMileageMessage();
    expect(generatedMessage).toEqual('1000');
  });

  it('should return undefiend', () => {
    component.tire = null;
    fixture.detectChanges();

    const generatedMessage = component.generateTireMileageMessage();
    expect(generatedMessage).toBeUndefined();
  });

  it('should generate correct tire mileage message when mileage is missing', () => {
    const mockTire: Tire = {
      id: '1',
      position: '1L',
      mileage: '',
      mileageUnit: 'km'
    };
    component.tire = mockTire;
    fixture.detectChanges();

    const generatedMessage = component.generateTireMileageMessage();
    expect(generatedMessage).toEqual('Mileage is missing but unit is: km');
  });

  it('should generate correct tire mileage message when unit is missing', () => {
    const mockTire: Tire = {
      id: '1',
      position: '1L',
      mileage: '1000',
      mileageUnit: ''
    };
    component.tire = mockTire;
    fixture.detectChanges();

    const generatedMessage = component.generateTireMileageMessage();
    expect(generatedMessage).toEqual('Mileage is: 1000, but Unit is missing');
  });

  it('should generate correct tire mileage message when both mileage and unit are missing', () => {
    const mockTire: Tire = {
      id: '1',
      position: '1L',
      mileage: '',
      mileageUnit: ''
    };
    component.tire = mockTire;
    fixture.detectChanges();

    const generatedMessage = component.generateTireMileageMessage();
    expect(generatedMessage).toEqual('Mileage and Unit are missing');
  });

  it('should generate correct tire class based on tire position and count', () => {
    const mockTire: Tire = {
      id: '1',
      position: '1L',
      mileage: '1000',
      mileageUnit: 'km'
    };
    component.tire = mockTire;
    component.tireCount = 4;
    fixture.detectChanges();

    const expectedClass = 'float-left absolute z-50 p-1 two-left-1';
    expect(component.tireClass).toEqual(expectedClass);
  });

  it('should generate correct tire class for position 1R and count 4', () => {
    const mockTire: Tire = {
      id: '1',
      position: '1R',
      mileage: '1000',
      mileageUnit: 'km'
    };
    component.tire = mockTire;
    component.tireCount = 4;
    fixture.detectChanges();

    const expectedClass = 'float-left absolute z-50 p-1 two-right-1';
    expect(component.tireClass).toEqual(expectedClass);
  });

  it('should generate correct tire class for position 2L and count 6', () => {
    const mockTire: Tire = {
      id: '1',
      position: '2L',
      mileage: '1000',
      mileageUnit: 'km'
    };
    component.tire = mockTire;
    component.tireCount = 6;
    fixture.detectChanges();

    const expectedClass = 'float-left absolute z-50 p-1 three-left-2';
    expect(component.tireClass).toEqual(expectedClass);
  });

  it('should generate correct tire class for position 2R and count 6', () => {
    const mockTire: Tire = {
      id: '1',
      position: '2R',
      mileage: '1000',
      mileageUnit: 'km'
    };
    component.tire = mockTire;
    component.tireCount = 6;
    fixture.detectChanges();

    const expectedClass = 'float-left absolute z-50 p-1 three-right-2';
    expect(component.tireClass).toEqual(expectedClass);
  });

  it('should generate correct tire class for position 3L and count 6', () => {
    const mockTire: Tire = {
      id: '1',
      position: '3L',
      mileage: '1000',
      mileageUnit: 'km'
    };
    component.tire = mockTire;
    component.tireCount = 6;
    fixture.detectChanges();

    const expectedClass = 'float-left absolute z-50 p-1 three-left-3';
    expect(component.tireClass).toEqual(expectedClass);
  });

  it('should generate correct tire class for position 3R and count 6', () => {
    const mockTire: Tire = {
      id: '1',
      position: '3R',
      mileage: '1000',
      mileageUnit: 'km'
    };
    component.tire = mockTire;
    component.tireCount = 6;
    fixture.detectChanges();

    const expectedClass = 'float-left absolute z-50 p-1 three-right-3';
    expect(component.tireClass).toEqual(expectedClass);
  });
});
