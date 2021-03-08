import {Component, OnInit} from '@angular/core';
import {Games} from '../../../core/entities/games/games';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import MessageService from '../../../../shared/services/MessageService';
import GamesDto from '../../../core/entities/games/games-dto';
import {GamesService} from '../../../core/entities/games/games.service';

@Component({
  selector: 'app-games-edit',
  templateUrl: './games-edit.component.html',
  styleUrls: ['./games-edit.component.scss']
})
export class GamesEditComponent implements OnInit {
  public game: Games;

  formGroup = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    gender: ['', Validators.required],
    description: ['', Validators.required],
    dataCreated: [''],
    dataUpdated: new Date().getTime()
  });

  constructor(
    private routes: ActivatedRoute,
    private fb: FormBuilder,
    private gamesService: GamesService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const id = this.routes.snapshot.params.id;
    if (id) {
      this.gamesService.get({gameId: id})
        .toPromise()
        .then((r: any) => {
          this.formGroup.patchValue({
            id: r.id,
            title: r.title,
            gender: r.gender,
            description: r.description,
            dataCreated: r.dataCreated
          });
        });
    }
  }

  onSave(): void {
    if (this.formGroup.status === 'VALID') {
      const gamesDTO = new GamesDto();
      new GamesDto().toDTO(this.formGroup.value);
      this.gamesService.update(gamesDTO.getDTO())
        .toPromise()
        .then(() => {
          // this.messageService.show({
          //   type: 'sucess',
          //   title: 'Ok... was updated a new game in store!'
          // });
          this.router.navigate(['/games']);
        });
    } else {
      console.log('Fill the fields required!');
    }
  }

}
