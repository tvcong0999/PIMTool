import {Pipe, PipeTransform} from '@angular/core'
import {Status } from '../../Project/models/project.model'

@Pipe({
name: 'converEnum'
})
export class NumberToString implements PipeTransform{
    transform(value: number): string {
        return Status[value];
    }

}