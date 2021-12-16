import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/movie';
import { Tv } from 'src/models/tv';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Popularmovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  popularTvShows: Tv[] = [];
  constructor(private moviesService: MovieService) {}

  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.Popularmovies = movies;
    });
    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies;
    });
    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies;
    });
    this.moviesService.getTvs('popular').subscribe((tvShows) => {
      this.popularTvShows = tvShows;
    });
  }
}
