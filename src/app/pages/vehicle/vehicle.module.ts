import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzZorroModule } from 'src/app/ng-zorro.module';

import { VehicleRoutingModule } from './vehicle-routing.module';

import { VehicleComponent } from './vehicle.component';
import { VehicleDetailComponent } from 'src/app/pages/vehicle/partials/vehicle-detail/vehicle-detail.component';
import { VehicleUpsertComponent } from 'src/app/pages/vehicle/partials/vehicle-upsert/vehicle-upsert.component';
import { TireDetailComponent } from 'src/app/pages/vehicle/partials/tire-detail/tire-detail.component';

export function getWindow() { return window; }

@NgModule({
  imports: [VehicleRoutingModule, ReactiveFormsModule, CommonModule, NzZorroModule],
  declarations: [VehicleComponent, VehicleDetailComponent, TireDetailComponent, VehicleUpsertComponent],
  exports: [VehicleComponent],
  providers: [{provide: 'window', useFactory: getWindow }]
})

export class VehicleModule { }
