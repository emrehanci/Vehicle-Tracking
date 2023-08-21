import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzZorroModule } from 'src/app/ng-zorro.module';

import { VehicleRoutingModule } from './vehicle-table-routing.module';

import { VehicleTableComponent } from './vehicle-table.component';
import { VehicleModule } from "../vehicle/vehicle.module";

export function getWindow() { return window; }

@NgModule({
    declarations: [VehicleTableComponent],
    exports: [VehicleTableComponent],
    providers: [{ provide: 'window', useFactory: getWindow }],
    imports: [VehicleRoutingModule, ReactiveFormsModule, CommonModule, NzZorroModule, VehicleModule]
})

export class VehicleTableModule { }
