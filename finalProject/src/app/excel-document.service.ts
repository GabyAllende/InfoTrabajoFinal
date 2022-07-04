import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelDocumentService {

  private _url: string = "http://localhost:5000/";
  constructor(private http:HttpClient) { }

  uploadFile(formData:FormData) : Observable<any>{
    
    return this.http.post(this._url+"uploadFile", formData, { responseType: 'text' });
  }

  getGraph(myx:string , myy:string, gr:string){
    let params = new HttpParams().set("x",myx).set("y", myy).set("graph", gr); //Create new HttpParams
    return this.http.get(this._url+"getGraph", { responseType: 'blob' , params: params});
  }
  getDataTypes(){
    return this.http.get(this._url+"getDataTypes", {responseType: 'text'});
  }
}
