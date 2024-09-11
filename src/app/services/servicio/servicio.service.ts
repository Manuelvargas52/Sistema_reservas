import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private API_SERVER ="http://localhost:8080/servicio/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllServicio(){
    return this.httpClient.get(this.API_SERVER);
    }

    public saveServicio(servicio:any):Observable<any>{
      return this.httpClient.post(this.API_SERVER,servicio);
      }

      public deleteServicio(id: string):Observable<any>{
        return this.httpClient.delete(this.API_SERVER + "delete/"+id);
      }
}

