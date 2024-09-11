import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ReservaService } from '../../services/reserva/reserva.service';
import { ServicioService } from '../../services/servicio/servicio.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

  personaForm!: FormGroup;
  reservas: any;
  cliente: any;
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
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],

    });;

    this.reservaService.getAllReserva().subscribe(resp => {
      this.reservas = resp;
      console.log(resp);
    },
      error => { console.error(error) }
    );
    this.clienteService.getAllCliente().subscribe(resp => {
      this.cliente = resp;

    },
      error => { console.error(error) }
    );
  }

  guardar(): void {
    this.clienteService.saveCliente(this.personaForm.value).subscribe(
      resp => {
        this.personaForm.reset();
        window.location.reload();  
      },
      error => { 
        console.error(error); 
      }
    );
  }

  eliminar(cliente: any): void {
    this.clienteService.deleteCliente(cliente.id).subscribe(
      resp => {
        console.log(resp);
        window.location.reload(); 
        if (resp === true) {
          const index = this.cliente.findIndex((c: any) => c.id === cliente.id);
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

 editar(cliente: any){
  this.personaForm.setValue({
    id:cliente.id,
    nombre: cliente.nombre ,
    email: cliente.email ,
    telefono: cliente.telefono ,
    direccion: cliente.direccion,
  })
 }
}