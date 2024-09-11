import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ReservaService } from '../../services/reserva/reserva.service';
import { ServicioService } from '../../services/servicio/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.css'
})
export class ServicioComponent implements OnInit {
  personaForm!: FormGroup;
  reservas: any;
  servicio: any;

  constructor(
    public fb: FormBuilder,
    public clienteService: ClienteService,
    public reservaService: ReservaService,
    public servicioService: ServicioService,
  ) {
  }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      capacidad: ['', Validators.required],

    });;

    this.reservaService.getAllReserva().subscribe(resp => {
      this.reservas = resp;
      console.log(resp);
    },
      console => { console.error(Error) }
    );

    this.servicioService.getAllServicio().subscribe(resp => {
      this.servicio = resp;
    },
      error => { console.error(error) }
    );
  }


  guardar(): void {
    this.servicioService.saveServicio(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
      window.location.reload();
    },
      error => { console.error(error) }
    );
  }
  eliminar(servicio: any): void {
    this.servicioService.deleteServicio(servicio.id).subscribe(
      resp => {
        console.log(resp);
        window.location.reload();
        if (resp === true) {
          const index = this.servicio.findIndex((c: any) => c.id === servicio.id);
          if (index !== -1) {
            this.servicio.splice(index, 1);
          }
          window.location.reload();
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  editar(servicio: any) {
    this.personaForm.setValue({
      id: servicio.id,
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      capacidad: servicio.capacidad,
    })
  }
}
