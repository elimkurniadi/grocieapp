import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoriteSkeletonComponent } from './favorite-skeleton.component';

describe('FavoriteSkeletonComponent', () => {
  let component: FavoriteSkeletonComponent;
  let fixture: ComponentFixture<FavoriteSkeletonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FavoriteSkeletonComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(FavoriteSkeletonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
