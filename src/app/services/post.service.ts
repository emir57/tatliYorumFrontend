import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    @Inject("baseUrl") private baseUrl: string
  ) { }
}
