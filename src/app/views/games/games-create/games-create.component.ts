import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import MessageService from '../../../../shared/services/MessageService';
import GamesDto from '../../../core/entities/games/games-dto';
import {Router} from '@angular/router';
import {GamesService} from '../../../core/entities/games/games.service';

@Component({
  selector: 'app-games-create',
  templateUrl: './games-create.component.html',
  styleUrls: ['./games-create.component.scss']
})
export class GamesCreateComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gamesService: GamesService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      gender: ['', Validators.required],
      description: ['', Validators.required],
      dataCreated: new Date().getTime()
    });
  }

  onSave(): void {
    if (this.formGroup.status === 'VALID') {
      const gamesDTO = new GamesDto();
      gamesDTO.toDTO(this.formGroup.value);
      this.gamesService.create(gamesDTO.getDTO())
        .toPromise()
        .then(() => {
          // this.messageService.show({
          //   type: 'sucess',
          //   title: 'Ok... was created a new game in store!'
          // });
          this.router.navigate(['/games']);
        });
    } else {
      console.log('Fill the fields required!');
    }
  }

}
