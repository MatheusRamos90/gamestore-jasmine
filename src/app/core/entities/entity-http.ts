import {Observable} from 'rxjs';

export default interface EntityHttp {
  list(): Observable<any>;
}
