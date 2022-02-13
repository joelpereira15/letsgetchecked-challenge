import {inject, TestBed} from '@angular/core/testing';
import {reject} from 'q';
import {PostsService} from './posts.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {Post} from '../models/posts.model';
import {environment} from '../../environments/environment';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: []
  }));

  beforeEach(inject([PostsService, HttpTestingController],
    (postsService: PostsService, httpMockController: HttpTestingController) => {

      service = postsService;
      httpMock = httpMockController;
    }));

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should fetch all posts', (done) => {
    // Arrange
    const mockedResponse: Post[] = [{
      id: 1,
      content: 'bla',
      publish_date: '2016-12-12',
      description: 'blbal',
      title: 'My title',
      author: 'Jack',
      slug: 'slug'
    }];

    // Act
    service.getPosts()
      .then(sources => {
        expect(sources).toEqual(mockedResponse);
        done();
      });

    // Assert
    httpMock.expectOne((req: HttpRequest<any>) => {
      return req.url === `${environment.serverUrl}posts` && req.method === 'GET';
    }, `Get posts`)
      .flush(mockedResponse);
  });

  test('should get error on fetching all posts', (done) => {

    // Act
    service.getPosts()
      .then(sources => {
        },
        error => {
          expect(error).toBeDefined();
          done();
        });

    // Assert
    httpMock.expectOne((req: HttpRequest<any>) => {
      return req.url === `${environment.serverUrl}posts` && req.method === 'GET';
    }, `Get posts`)
      .flush(reject('error'));
  });
});
