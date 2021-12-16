import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Movie,
  MovieCredit,
  MovieDto,
  MovieImages,
  MovieVideoData,
} from 'src/models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TvDto } from 'src/models/tv';
import { GenreDto } from 'src/models/genre';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '8c247ea0b4b56ed2ff7d41c9a833aa77';
  constructor(private http: HttpClient) {}
  getMovies(type: string = 'upcoming', count: number = 16) {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  getMoviesByGenre(genreId: string, pageNumber: number) {
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
  searchMovies(page: number, searchValue?: string) {
    const url = searchValue ? '/search/movie' : '/movie/popular';
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}${url}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvs(type: string = 'latest', count: number = 12) {
    return this.http
      .get<TvDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }
  getMovie(id: string) {
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }
  getMovieVideos(id: string) {
    return this.http
      .get<MovieVideoData>(
        `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
  getMovieImages(id: string) {
    return this.http.get<MovieImages>(
      `${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`
    );
  }
  getMovieCredit(id: string) {
    return this.http.get<MovieCredit>(
      ` ${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    );
  }
  getMovieGeners() {
    return this.http
      .get<GenreDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }
}
