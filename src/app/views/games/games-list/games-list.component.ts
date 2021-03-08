import {Component, OnInit} from '@angular/core';
import GamesDto from '../../../core/entities/games/games-dto';
import MessageService from '../../../../shared/services/MessageService';
import {GamesService} from '../../../core/entities/games/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  public gamesList: GamesDto[];

  constructor(
    private gamesService: GamesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadDatas();
  }

  onRemove(gameId): void {
    this.gamesService.delete({ gameId })
      .toPromise()
      .then(() => {
        this.messageService.show({
          type: 'sucess',
          title: 'Removing... ok, done!!!'
        });
        this.loadDatas();
      })
      .catch(() => {
        console.log('Error on remove this record.');
        // this.messageService.show({
        //   type: 'danger',
        //   title: 'Oops... there was an intern error!'
        // });
      });
  }

  private loadDatas(): void {
    this.gamesService.list()
      .toPromise()
      .then((r: any) => {
        this.gamesList = r;
      });
  }

}
