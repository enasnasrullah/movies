import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Genre } from 'src/models/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
genres: Genre[]= [];
  constructor( private moviesServiec : MovieService) { }

  ngOnInit(): void {
    this.moviesServiec.getMovieGeners().subscribe(genresData =>{
      this.genres= genresData
    })
  }

}
