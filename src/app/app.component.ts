import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadService } from "./file-upload.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form: FormGroup;
  progress: number = 0;
  constructor(
    public fb: FormBuilder,
    public fileUploadService: FileUploadService
  ) {
    this.form = this.fb.group({
      name: [""],
      avatar: [null]
    });
  }
  ngOnInit() {}
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get("avatar").updateValueAndValidity();
  }
  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  submitUser() {
    this.fileUploadService
      .addUser(this.form.value.name, this.form.value.avatar)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            console.log("Response header has been received!");
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log("User successfully created!", event.body);
            setTimeout(() => {
              this.progress = 100;
            }, 1500);
        }
      });
  }
}
