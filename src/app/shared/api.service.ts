import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { TodoModel } from '../todo-list/todo-list.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
   }

  postTodo(data: any){
    return this.http.post<any>("http://localhost:3000/todos",data).pipe(map((res:any)=>{return res;}))
  }

  getTodos():Observable<Array<TodoModel>>{
    return this.http.get<Array<TodoModel>>("http://localhost:3000/todos").pipe(map((res:any)=>{return res;}))
  }

  updateTodo(data: any,id:number){
    return this.http.put<any>("http://localhost:3000/todo/"+id,data).pipe(map((res:any)=>{return res;}))
  }

  deleteTodo(id:number){
    return this.http.delete<any>("http://localhost:3000/todo/"+id).pipe(map((res:any)=>{return res;}))
  }

}
