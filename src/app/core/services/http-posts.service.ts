import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../models/post.model'

  
@Injectable()
export class HttpServicePosts{
  private fireBase = `https://fe-lab-11-team-lemon-project.firebaseio.com/`
  constructor(private http: HttpClient){ }  
  getPosts(request?:string):Observable<Post[]> {
    if(request) {
			return this.http.get<Post[]>(this.fireBase+`posts.json?`+request)
		} else {
			return this.http.get<Post[]>(this.fireBase+`posts.json`)
		}
  }
  getPost(number:string):Observable<any> {
    return this.http.get(`${this.fireBase}posts/${number}.json`)
  }
  deletePost(id:string):Observable<void> {
    return this.http.delete<void>(`${this.fireBase}posts/${id}`)
  }
  pushPost(data:Post):Observable<any>  {
    return this.http.post(`${this.fireBase}posts.json`, data)
  }
  updatePost(key:string,data:Post):Observable<any> {
    return this.http.patch(`${this.fireBase}/posts/${key}.json`,data)
  }   
}