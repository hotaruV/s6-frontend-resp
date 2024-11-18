import { ContracsOCID, respServer } from './../interfaces/planning.interface';
import { PlaningService } from 'src/app/services/pages/planing.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexContratcGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  private ocid: string;
  constructor(
    private planningServ: PlaningService,
    private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {


  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): any {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): any {
    this.ocid = localStorage.getItem('ocid');

  }
}
