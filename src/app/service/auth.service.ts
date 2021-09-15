import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import ApplicationProfile from '../model/application-profile';
import User from '../model/user';
import WebResponse from '../dto/web-response';
import { commonHeaders, getHost, setLoginKeyCookie, setRequestId } from '../utils/rest';

const FORM_URL_ENCODED: string = 'application/x-www-form-urlencoded';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser: User | undefined;
  private applicationProfile: ApplicationProfile | undefined;

  get user() {
    return this.loggedUser;
  }
  get profile() {
    return this.applicationProfile;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public updateToken = (resp: HttpResponse<any>) => {
    const token = resp.headers.get("access-token");
    // console.debug("token: ", token);
    if (null != token) {
      setLoginKeyCookie(token);
      // console.debug("WILL update access-token");
    } else {
      // console.debug("Wont update access-token");
    }
  }

  /**
   * 
   * @param email 
   * @param password 
   */
  public login(email: string, password: string): Promise<boolean> {

    return new Promise<boolean>((res, rej) => {
      const url = getHost() + "api/auth/login";//?"+queryString;
      const body = new HttpParams()
        .set('email', email)
        .set('password', password);
      const sub = this.http.post<WebResponse>(url, body.toString(), { observe: 'response', ...this.loginHeader })

        .subscribe((resp: HttpResponse<WebResponse>) => {
          this.handleSuccessLogin(resp);
          res(true);
          sub.unsubscribe();
        }, (err) => {
          res(false);
          sub.unsubscribe();
        });
    });

  }
  public register(name: string, email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      const url = getHost() + "api/auth/register";//?"+queryString;
      const body = new HttpParams()
        .set('name', name)
        .set('email', email)
        .set('password', password);
      const sub = this.http.post<WebResponse>(url, body.toString(), { observe: 'response', ...this.loginHeader })

        .subscribe((resp: HttpResponse<WebResponse>) => {
          res(true);
          sub.unsubscribe();
        }, (err) => {
          res(false);
          sub.unsubscribe();
        });
    });

  }

  private handleSuccessLogin = (resp: HttpResponse<WebResponse>) => {
    this.loggedUser = resp.body?.result as User;
    this.updateToken(resp);
  }

  private get loginHeader() {
    return {
      headers: {
        'Content-Type': FORM_URL_ENCODED
      }
    }
  }

  /**
   * validateLoggedUser
   */
  public validateLoggedUser = (callback?: () => void): boolean => {
    if (!this.loggedUser) {
      this.router.navigate(["/login"]);
      return false;
    }
    if (callback) callback();
    return true;
  }
  /**
   * requestId
   */
  public requestId(): Observable<WebResponse> {
    return this.http.get<WebResponse>(getHost() + "api/public/index",
      commonHeaders(true));
  }
  /**
   * retryRequestId
   */
  public retryRequestId(): Observable<WebResponse> {
    setLoginKeyCookie("");
    return this.http.get<WebResponse>(getHost() + "api/public/index",
      commonHeaders(false));
  }

  /**
   * logout
   */
  public logout(): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      const sub = this.http.post<WebResponse>(getHost() + "api/auth/logout", {},
        commonHeaders(true)).subscribe((resp) => {
          this.handleLoggedOut();
          res(true);
          sub.unsubscribe();
        }, (err) => {
          res(false);
          sub.unsubscribe();
        })
    });
  }
  handleLoggedOut() {

    setLoginKeyCookie(null);
    this.loggedUser = undefined;
  }

  /**
   * handleInitialLoading
   * @param response 
   */
  handleInitialLoading(response: WebResponse) {
    if (response.user) {
      this.loggedUser = response.user;
    }
    this.applicationProfile = Object.assign(new ApplicationProfile(), response.result);
    setRequestId(this.applicationProfile?.requestID);
  }


  get assetPath() {
    return this.applicationProfile?.assetsPath;
  }
}
