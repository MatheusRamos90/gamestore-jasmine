import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamesCreateComponent} from './games-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import GamesDto from '../../../core/entities/games/games-dto';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {GamesService} from '../../../core/entities/games/games.service';

describe('GamesCreateComponent', () => {
  let component: GamesCreateComponent;
  let fixture: ComponentFixture<GamesCreateComponent>;
  let gamesService: GamesService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ GamesCreateComponent ],
      providers: [
        GamesService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesCreateComponent);
    gamesService = TestBed.inject(GamesService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
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

  it('formgroup attribute title with value formgamestore', () => {
    const de = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(de.attributes.title.value).toContain('formgamestore');
  });

  it('gamesService ok', () => {
    expect(gamesService.create).toBeTruthy();
  });

  it('onSave function with valid form', async () => {
    const gamesDto = new GamesDto();
    const params = gamesDto.toDTO({id: 1, title: 'First game', description: 'A description', gender: 'STRATEGY'});
    component.formGroup.patchValue(params);

    spyOn(gamesService, 'create').and.returnValue(of(gamesDto));
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.onSave();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onSave).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });
});
