import {Component} from '@angular/core';
import {GiphyService} from './services/giphy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public message: string;
  public gif_url = '';
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
      if (this.message.includes('~')) {
        const search_string = this.message.split('~')[1];
        this.getGIF(search_string);
      } else {
        this.messages.push({
          text: this.message,
          img: ''
        });
        this.reset();
      }
    }
  }

  private getGIF(search_string) {
    // return console.log(this.message.split(search_string));
    this.giphyService.getGIF(search_string).subscribe(
      (res) => {
        // this.gif_url = res['data'].images.original.url;
        this.messages.push({
          text: this.message.split(`${search_string}`)[1],
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
