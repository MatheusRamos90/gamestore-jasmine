import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamesEditComponent} from './games-edit.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import GamesDto from '../../../core/entities/games/games-dto';
import {of} from 'rxjs';
import EnumGenderGame from '../../../core/enums/enum-gender-game';
import {GamesService} from '../../../core/entities/games/games.service';

describe('GamesEditComponent', () => {
  let component: GamesEditComponent;
  let fixture: ComponentFixture<GamesEditComponent>;
  let gamesService: GamesService;
  let router: Router;
  let routes: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ GamesEditComponent ],
      providers: [
        GamesService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: 123}}
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesEditComponent);
    gamesService = TestBed.inject(GamesService);
    router = TestBed.inject(Router);
    routes = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('function loadData', () => {
    const game = {id: 123, title: 'Second game', description: 'A description', gender: EnumGenderGame.SPORT};
    spyOn(gamesService, 'get')
      .and.returnValue(of(game));
    const gamesDto = new GamesDto();
    const params = gamesDto.toDTO(game);
    component.formGroup.patchValue(params);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(gamesService.get).toHaveBeenCalledTimes(123);
    });

    expect(component.formGroup.controls.id.value).toEqual(123);
  });

  it('form invalid when empty', () => {
    expect(component.formGroup.valid).toBe(false);

    spyOn(console, 'log');
    component.formGroup.patchValue({
      id: 1
    });
    component.onSave();
    expect(console.log).toHaveBeenCalledWith('Fill the fields required!');
  });

  it('formgroup attribute title with value ormgamestore-edit', () => {
    const de = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(de.attributes.title.value).toEqual('formgamestore-edit');
  });

  it('gamesService ok', () => {
    expect(gamesService.update).toBeTruthy();
  });

  it('onSave function with valid form', async () => {
    const gamesDto = new GamesDto();
    const params = gamesDto.toDTO({id: 1, title: 'Second game', description: 'A description', gender: EnumGenderGame.SPORT});
    component.formGroup.patchValue(params);

    spyOn(gamesService, 'update').and.returnValue(of(gamesDto));
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.onSave();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onSave).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });
});
