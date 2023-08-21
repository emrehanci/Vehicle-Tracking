import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NzLayoutModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const contentElement: HTMLElement | null = fixture.nativeElement.querySelector('.p-6.bg-white.h-full.overflow-auto');
    expect(contentElement).toBeTruthy();

    const routerOutletElement: HTMLElement | null = !!contentElement ? contentElement.querySelector('router-outlet') : null;
    expect(routerOutletElement).toBeTruthy();
  });
});
