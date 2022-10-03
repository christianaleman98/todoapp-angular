import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { TodoModel } from './todo-list.model';
import { ApiService } from '../shared/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit,OnDestroy {

  formValue !: FormGroup;
  todoModelObject: TodoModel = new TodoModel();
  todoData !:Array<TodoModel>;
  filterPost = '';
  subs!:Subscription

  constructor(private formbuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      tarea : [''],
      status: [''],
      fechaInicio : [''],
      fechaFin: [''],
      prioridad: [''],
      responsable: ['']
    })
    this.getAllTodos();
  }
  postTodoDetails(){
    this.todoModelObject.tarea = this.formValue.value.tarea;
    this.todoModelObject.fechaInicio = this.formValue.value.fechaInicio;
    this.todoModelObject.fechaFin = this.formValue.value.fechaFin;
    this.todoModelObject.prioridad = this.formValue.value.prioridad;
    this.todoModelObject.responsable = this.formValue.value.responsable;

    this.subs.add(
    this.api.postTodo(this.todoModelObject)
    .subscribe(res=>{
      alert("To Do agregado correctamente.");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllTodos();
    },
    err=>{
      alert("No pudo agregarse la tarea")
    })
    );
  }

  getAllTodos(){
    this.api.getTodos().subscribe(res=>{
      this.todoData =res;
    })
  }

  deteleTodo(row:any){
    this.api.deleteTodo(row.id).subscribe(res=>{
      alert("To Do Eliminado Correctamente");
      this.getAllTodos();
    })
  }

  onEdit(row:any){
    this.todoModelObject.id = row.id;
    this.formValue.controls['tarea'].setValue(row.tarea);
    this.formValue.controls['status'].setValue(row.status);
    this.formValue.controls['prioridad'].setValue(row.prioridad);
    this.formValue.controls['fechaInicio'].setValue(row.fechaInicio);
    this.formValue.controls['fechaFin'].setValue(row.fechaFin);
    this.formValue.controls['responsable'].setValue(row.responsable);
    }

  updateTodoDetails(){
    this.todoModelObject.tarea = this.formValue.value.tarea;
    this.todoModelObject.status = this.formValue.value.status;
    this.todoModelObject.fechaInicio = this.formValue.value.fechaInicio;
    this.todoModelObject.fechaFin = this.formValue.value.fechaFin;
    this.todoModelObject.prioridad = this.formValue.value.prioridad;
    this.todoModelObject.responsable = this.formValue.value.responsable;

    this.api.updateTodo(this.todoModelObject,this.todoModelObject.id)
  .subscribe(res=>{
    alert("To Do actualizado Correctamente");
    let ref = document.getElementById('cancelar');
      ref?.click();
      this.formValue.reset();
      this.getAllTodos();
  })
  }

  resetModelCancel(){
    this.formValue.reset();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
