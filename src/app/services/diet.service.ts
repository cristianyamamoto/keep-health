import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(private httpClient: HttpClient) { }

  listAll(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get("assets/diets.json", { headers });
  }

}
