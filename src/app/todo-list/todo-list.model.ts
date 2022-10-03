export class TodoModel{
    id: number = 0;
    tarea: string = '';
    status: string ='';
    fechaInicio: Date = new Date();
    fechaFin: Date = new Date();
    prioridad: string = '';
    responsable: string = '';
}