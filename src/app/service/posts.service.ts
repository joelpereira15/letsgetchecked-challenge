import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Comment, Post} from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private httpClient: HttpClient) {
  }


  getPosts(): Promise<Post[]> {
    return this.httpClient
      .get<Post[]>(`${environment.serverUrl}posts`)
      .toPromise();
  }

  getPost(id: number): Promise<Post> {
    return this.httpClient
      .get<Post>(`${environment.serverUrl}posts/${id}`)
      .toPromise();
  }

  getCommentsByPost(id: number): Promise<Comment[]> {
    return this.httpClient
      .get <Comment[]>(`${environment.serverUrl}posts/${id}/comments`)
      .toPromise();
  }

  addComment(comment: string, postId: number): Promise<any> {
    const todayDate = new Date();
    const body: Comment = {
      id: Math.random(),
      content: comment,
      user: 'Jack',
      postId,
      date: `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`
    };
    return this.httpClient
      .post(`${environment.serverUrl}posts/${postId}/comments`, body)
      .toPromise();
  }
}
