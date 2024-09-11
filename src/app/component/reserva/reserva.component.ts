import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ReservaService } from '../../services/reserva/reserva.service';
import { ServicioService } from '../../services/servicio/servicio.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent implements OnInit {

  personaForm!: FormGroup;
  cliente: any;
  servicio: any;
  reserva: any;
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
      fecha_reserva: ['', Validators.required],
      fecha_servicio: ['', Validators.required],
      hora_servicio: ['', Validators.required],
      estado: ['', Validators.required],
      monto_total: ['', Validators.required],
      notas: ['', Validators.required],
      cliente: ['', Validators.required],
      servicio: ['', Validators.required],
    });;
    this.clienteService.getAllCliente().subscribe(resp => {
      this.cliente = resp;
      console.log(resp);
    },
      console => { console.error(Error) }
    );

    this.servicioService.getAllServicio().subscribe(resp => {
      this.servicio = resp;
      console.log(resp);
    },
      console => { console.error(Error) }
    );

    this.reservaService.getAllReserva().subscribe(resp => {
      this.reserva = resp;
    },
      error => { console.error(error) }
    );
  }

  guardar(): void {
    this.reservaService.saveReserva(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
      window.location.reload();
    },
      error => { console.error(error) }
    );
  }

  eliminar(reserva: any): void {
    this.reservaService.deleteReserva(reserva.id).subscribe(
      resp => {
        console.log(resp);
        window.location.reload();
        if (resp === true) {
          const index = this.cliente.findIndex((c: any) => c.id === reserva.id);
          if (index !== -1) {
            this.cliente.splice(index, 1);
          }
          window.location.reload();
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  editar(reserva: any) {
    this.personaForm.setValue({
      id: reserva.id,
      fecha_reserva: reserva.fecha_reserva,
      fecha_servicio: reserva.fecha_servicio,
      hora_servicio: reserva.hora_servicio,
      estado: reserva.estado,
      monto_total: reserva.monto_total,
      notas: reserva.notas,
      cliente: reserva.cliente,
      servicio: reserva.servicio,
    })
  }
}

