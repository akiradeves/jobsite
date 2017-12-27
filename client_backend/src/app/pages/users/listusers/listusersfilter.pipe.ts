import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listusersfilter'
})
export class ListusersfilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>{
      	var match = (row.organization.toLowerCase().indexOf(query.toLowerCase()) > -1) ? true : false;
      	if (row.first_name) match = match || (row.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1) ? true : false;
      	if (row.last_name) match = match || (row.last_name.toLowerCase().indexOf(query.toLowerCase()) > -1) ? true : false;
        if (row.email) match = match || (row.email.toLowerCase().indexOf(query.toLowerCase()) > -1) ? true : false;
      	if (row.role) match = match || (row.role.toLowerCase().indexOf(query.toLowerCase()) > -1) ? true : false;
      	
        var fullname = row.first_name + ' ' + row.last_name;
        match = match || (fullname.toLowerCase().indexOf(query.toLowerCase()) > -1) ? true : false;
        
      	return match;
      });
    }
    return array;
  }

}
