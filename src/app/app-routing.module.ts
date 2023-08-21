import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/vehicle' },
  { path: 'vehicle', loadChildren: () => import('./pages/vehicle/vehicle.module').then(m => m.VehicleModule) },
  { path: 'vehicle-table', loadChildren: () => import('./pages/vehicle-table/vehicle-table.module').then(m => m.VehicleTableModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
