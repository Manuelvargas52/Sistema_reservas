import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReservaService {

  private API_SERVER ="http://localhost:8080/reserva/";
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllReserva(){
  return this.httpClient.get(this.API_SERVER);
  }
  
  public saveReserva(reserva:any):Observable<any>{
    return this.httpClient.post(this.API_SERVER,reserva);
    }

    public deleteReserva(id: string):Observable<any>{
      return this.httpClient.delete(this.API_SERVER + "delete/"+id);
    }
}
