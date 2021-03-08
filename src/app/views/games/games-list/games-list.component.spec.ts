import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamesListComponent} from './games-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import EnumGenderGame from '../../../core/enums/enum-gender-game';
import {of, throwError} from 'rxjs';
import {GamesService} from '../../../core/entities/games/games.service';

describe('GamesComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let gamesService: GamesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ GamesListComponent ],
      providers: [
        GamesService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListComponent);
    gamesService = TestBed.inject(GamesService);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('function loadData list gamestore', () => {
    const game = [{id: 1, title: 'Second game', description: 'A description', gender: EnumGenderGame.SPORT}];
    spyOn(gamesService, 'list').and.returnValue(of(game));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(gamesService.list).toHaveBeenCalledTimes(1);
    });
  });

  it('onRemove function', async () => {
    spyOn(gamesService, 'delete').and.returnValue(of());

    component.onRemove(123);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onRemove).toHaveBeenCalledTimes(1);
    });
  });

  it('onRemove function error', () => {
    spyOn(gamesService, 'delete').and.returnValue(throwError('Error on remove this record.'));

    component.onRemove(123);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.onRemove).toHaveBeenCalledTimes(1);
    });
  });
});
