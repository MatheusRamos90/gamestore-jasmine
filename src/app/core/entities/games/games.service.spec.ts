import {TestBed} from '@angular/core/testing';

import {GamesService} from './games.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import GamesDto from './games-dto';

describe('GamesService', () => {
  let service: GamesService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        GamesService
      ]
    });
    service = TestBed.inject(GamesService);
    http = TestBed.inject(HttpClient);
  });

  it('list function', () => {
    spyOn(http, 'get').and.returnValue(of({}));

    service.list();

  });

  it('get function', () => {
    spyOn(http, 'get').and.returnValue(of({}));

    service.get({ gameId: 123 });
    //
  });

  it('delete function', () => {
    spyOn(http, 'delete').and.returnValue(of({}));

    service.delete({ gameId: 123 });
    //
  });

  it('create function', () => {
    spyOn(http, 'post').and.returnValue(of({}));

    const params: GamesDto = new GamesDto();
    service.create(params);
    //
  });

  it('update function', () => {
    spyOn(http, 'put').and.returnValue(of({}));

    const params: GamesDto = new GamesDto();
    params.setId(123);
    service.update(params);
    //
  });

});
