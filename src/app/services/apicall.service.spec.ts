import { TestBed } from '@angular/core/testing';
import { ApicallService } from './apicall.service';
import { HttpClient,HttpHandler } from '@angular/common/http';

describe('ApicallService', () => {
  let service: ApicallService;

  beforeEach( async () => {
  await TestBed.configureTestingModule({
    providers:[HttpClient,HttpHandler]
  }).compileComponents();

  service = TestBed.inject(ApicallService);
});


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
