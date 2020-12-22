// Source: https://github.com/angular/angular/issues/12313#issuecomment-561221167

import { ChangeDetectorRef, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

function runOnPushChangeDetection<T>(cf: ComponentFixture<T>): () => Promise<void> {
  return async () => {
    const cd: ChangeDetectorRef = cf.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef as any);
    cd.detectChanges();
    await cf.whenStable();
  };
}

export const improveChangeDetection = () => {
  const originalCreate = TestBed.createComponent;
  TestBed.createComponent = <T>(component: Type<T>) => {
    const componentFixture: ComponentFixture<T> = originalCreate(component);
    componentFixture.detectChanges = runOnPushChangeDetection(componentFixture);
    return componentFixture;
  };
};
