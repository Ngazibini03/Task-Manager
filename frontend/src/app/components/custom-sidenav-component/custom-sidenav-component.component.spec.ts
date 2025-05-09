import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSidenavComponentComponent } from './custom-sidenav-component.component';

describe('CustomSidenavComponentComponent', () => {
  let component: CustomSidenavComponentComponent;
  let fixture: ComponentFixture<CustomSidenavComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSidenavComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomSidenavComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
