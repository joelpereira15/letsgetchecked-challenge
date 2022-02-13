import {Component, OnInit} from '@angular/core';
import {PostsService} from '../service/posts.service';
import {Post} from '../models/posts.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.postsService.getPosts().then((data: Post[]) => {
      this.posts = data.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
    });
  }
}
