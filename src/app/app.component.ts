import {Component} from '@angular/core';
import {GiphyService} from './services/giphy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public message: string;
  private seperator = '~';
  public messages: any[] = [
    {
      text: 'Hello',
      img: ''
    },
    {
      text: 'World',
      img: ''
    }
  ];

  constructor(private giphyService: GiphyService) {}

  public isGifNeeded() {
    if (this.message) {
      if (this.message.includes(`${this.seperator}`)) {
        const search_string = this.message.split(`${this.seperator}`)[1];
        this.getGIF(search_string);
      } else {
        this.messages.push({
          text: this.message.split(`${this.seperator}`).join(''),
          img: ''
        });
        this.reset();
      }
    }
  }

  private getGIF(search_string) {
    this.giphyService.getGIF(search_string).subscribe(
      (res) => {
        this.messages.push({
          text: this.message.split(`${this.seperator}`).join(''),
          img: res['data'].images.original.url
        });
        this.reset();
        // console.log(res);
      }, (err) => {
        // f
      });
  }

  private reset () {
    this.message = '';
    const lists = document.getElementsByTagName('li');
    setTimeout(() => lists[lists.length - 1].scrollIntoView({behavior: 'smooth'}), 0);
    // lists[lists.length - 1].scrollIntoView({behavior: 'smooth'});
  }
}
