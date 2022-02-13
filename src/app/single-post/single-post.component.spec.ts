import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SinglePostComponent} from './single-post.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../service/posts.service';

describe('SinglePostComponent', () => {
  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;

  const activeRouteMock: any = {
    snapshot: {
      params: {
        id: 1
      },
    },
  };

  const postServiceMock: any = {
    getPost: () => Promise.resolve([]),
    getCommentsByPost: () => Promise.resolve([]),
    addComment: () => Promise.resolve({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [SinglePostComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activeRouteMock},
        {provide: PostsService, useValue: postServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should add a comment', fakeAsync(() => {
    // Arrange
    component.commentControl.setValue('This is my comment');
    component.post = {
      id: 1
    } as any;

    // Act
    component.addComment();
    tick();

    // Assert
    expect(component.comments.length).toEqual(1);
    expect(component.commentControl.value).toEqual(null);
  }));
});
