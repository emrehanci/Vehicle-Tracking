import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VehicleDetail } from 'src/app/models/vehicle-detail.model';
import { selectedVehicle } from 'src/app/store/app.selectors';
import * as appActions from '../../../../store/app.actions';
import {Validators, UntypedFormGroup, UntypedFormBuilder, FormArray } from '@angular/forms';
import { Tire } from 'src/app/models/tire.model';

@Component({
  selector: 'app-vehicle-upsert',
  templateUrl: './vehicle-upsert.component.html',
  styleUrls: ['./vehicle-upsert.component.scss']
})

export class VehicleUpsertComponent implements OnInit {
  selectedVehicle: VehicleDetail | null = null;
  validateForm!: UntypedFormGroup;
  innerWidth: number = 920;

  submitForm(): void {
    let vehicle: VehicleDetail = this.validateForm.value;
    if(!!this.selectedVehicle && !!this.selectedVehicle.lpn){
      this.store.dispatch(appActions.updateVehicle({item: {id: vehicle.id, lpn: vehicle.lpn, depot: vehicle.depot}}));
      this.store.dispatch(appActions.updateVehicleDetail({item: vehicle}));
    } else {
      this.store.dispatch(appActions.addVehicle({item: {id: vehicle.id, lpn: vehicle.lpn, depot: vehicle.depot}}));
      this.store.dispatch(appActions.addVehicleDetail({item: vehicle}));
    }
    
    this.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateFullScreenState();
  }

  constructor(private store: Store, private fb: UntypedFormBuilder) { 
    this.store.select(selectedVehicle).subscribe((vehicles) => {
      this.selectedVehicle = vehicles;
      this.validateForm = this.fb.group({
        id: [vehicles?.id, [Validators.required]],
        lpn: [vehicles?.lpn, [Validators.required]],
        depot: [vehicles?.depot, [Validators.required]],
        tires: this.fb.array([])
      });
      this.populateTires(vehicles?.tires);
    });
  }

  ngOnInit() {
    this.updateFullScreenState();
  }

  get tires(): FormArray {
    return this.validateForm.get('tires') as FormArray;
  }

  updateFullScreenState() {
    this.innerWidth = window.innerWidth;
  }

  populateTires(tiresData: Tire[] | undefined): void {
    const tiresArray = this.tires;

    if(!!!tiresData) {
      return;
    }

    for (const tireData of tiresData) {
      tiresArray.push(
        this.fb.group({
          id: [tireData.id],
          position: [tireData.position, Validators.required],
          mileage: [tireData.mileage, Validators.required],
          mileageUnit: [tireData.mileageUnit, Validators.required]
        })
      );
    }
  }

  close(): void {
    this.store.dispatch(appActions.setSelectedVehicle({item: null}));
  }

  removeTire(index: number): void {
    this.tires.removeAt(index);
  }

  addTire(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }

    const newTire = this.fb.group({
      id: [''],
      position: ['', Validators.required],
      mileage: ['', Validators.required],
      mileageUnit: ['', Validators.required]
    });

    this.tires.push(newTire);
  }
}
