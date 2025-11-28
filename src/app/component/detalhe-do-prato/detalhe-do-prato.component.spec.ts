import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDoPratoComponent } from './detalhe-do-prato.component';

describe('DetalheDoPratoComponent', () => {
  let component: DetalheDoPratoComponent;
  let fixture: ComponentFixture<DetalheDoPratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheDoPratoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheDoPratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
