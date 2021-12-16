import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie, MovieCredit, MovieImages, MovieVideo } from 'src/models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredit | null = null;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    });
  }
  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe((movieDta) => {
      this.movie = movieDta;
    });
  }
  getMovieVideos(id: string) {
    this.moviesService.getMovieVideos(id).subscribe((movieVideoData) => {
      this.movieVideos = movieVideoData;
    });
  }
  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((MovieImagesData) => {
      this.movieImages = MovieImagesData;
    });
  }
  getMovieCredits(id: string) {
    this.moviesService.getMovieCredit(id).subscribe((moviecredit) => {
      this.movieCredits = moviecredit;
    });
  }
}
