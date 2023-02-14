import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class FileUploadService {
  constructor(private http: HttpClient) {}
  addUser(name: string, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    // formData.append("name", name);
    formData.append("file", profileImage);
    return this.http
      .post("https://file.io?title=" + profileImage, formData, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(catchError(this.errorMgmt));
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
