import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeatComponent } from './edit-seat.component';

describe('EditSeatComponent', () => {
  let component: EditSeatComponent;
  let fixture: ComponentFixture<EditSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSeatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
