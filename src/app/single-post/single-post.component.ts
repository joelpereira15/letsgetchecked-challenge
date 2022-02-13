import {Component, OnInit} from '@angular/core';
import {Comment, Post} from '../models/posts.model';
import {PostsService} from '../service/posts.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post: Post;
  comments: Comment[] = [];

  commentControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]);

  constructor(private postsService: PostsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.postsService.getPost(id).then((post) => {
      this.post = post;
      this.postsService.getCommentsByPost(id).then((comments) => {
        this.comments = comments;
      });
    });
  }

  addComment() {
    this.postsService.addComment(this.commentControl.value, this.post.id).then((data) => {
      this.commentControl.reset();
      this.comments.push(data);
    });
  }

}
