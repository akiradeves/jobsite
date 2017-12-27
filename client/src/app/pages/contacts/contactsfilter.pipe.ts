import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactsfilter'
})
export class ContactsfilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>{
      	var match = (row.mobile_phone.indexOf(query) > -1) ? true : false;
      	if (row.office_phone) match = match || (row.office_phone.indexOf(query) > -1) ? true : false;
      	if (row.first_name) match = match || (row.first_name.toLowerCase().indexOf(query.toLowerCase()) > -1) ? true : false;
      	if (row.last_name) match = match || (row.last_name.toLowerCase().indexOf(query.toLowerCase()) > -1) ? true : false;

        var fullname = row.first_name + ' ' + row.last_name;
        match = match || (fullname.toLowerCase().indexOf(query.toLowerCase()) > -1) ? true : false;
                
      	return match;
      });
    }
    return array;
  }

}
