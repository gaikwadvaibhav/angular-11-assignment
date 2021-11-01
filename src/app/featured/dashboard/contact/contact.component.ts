import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../services/http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  userListUrl = `https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts`;
  companyId: any;
  contactList: any[] = [];
  isLoading = false;
  contact: any[] = [];
  action: any;
  contactForm: FormGroup;
  index: any;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe((param: any) => {
      console.log('param', param);
      this.companyId = parseInt(param?.id);
    });
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      country: [''],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.httpService.get(this.userListUrl).subscribe((users) => {
      console.log('users', users);
      this.contact = users;
      this.contactList = users.filter(
        (u: any) => u.companyId === this.companyId
      );
      console.log('this.contactList', this.contactList);
      this.isLoading = true;
    });
  }

  modifyContact(action: string, user?: any, index?: number) {
    switch (action) {
      case 'add':
        // APi call
        this.action = 'Add';
        this.contactForm.reset()
        break;
      case 'edit':
        // APi call
        this.action = 'Edit';
        if(user) {
          this.contactForm.patchValue(user)
        }
        break;
      case 'delete':
        // APi call
        this.action = 'Delete';
        this.index = index;
        break;
      default:
        //
        break;
    }
  }

  
  onSubmit() {
    console.log('onSubmit', this.contactForm.value)
    if (this.contactForm.invalid) {
      return;
    }
    if(this.action !== 'Delete' && this.action !== 'Edit') {
      this.contactList.push(this.contactForm.value);
      this.contactForm.reset();
    } else if(  this.action == 'Edit') {
      // replace conatct
    } else {
      this.contactList.splice(this.index, 1);
    }
  }
}
