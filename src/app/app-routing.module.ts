import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './component/cliente/cliente.component';
import {ReservaComponent} from './component/reserva/reserva.component';
import {ServicioComponent} from './component/servicio/servicio.component';
const routes: Routes = [ 
  { path: 'cliente', component: ClienteComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'servicio', component: ServicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
