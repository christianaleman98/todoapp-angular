import {Pipe,PipeTransform} from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform{
    transform(value:any,arg: any):any{
        const resultData =[];
        for(const data of value){
            if(data.status.indexOf(arg) > -1){
                resultData.push(data)
            }
        }
        return resultData;
    }
}