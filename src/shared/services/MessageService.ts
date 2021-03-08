import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class MessageService {

  constructor() {}

  show(params: any): void {
    if (params && params.type) {
      switch (params.type) {
        case 'sucess':
          break;
        case 'danger':
          break;
        default:
          //
      }
    }
  }

}
