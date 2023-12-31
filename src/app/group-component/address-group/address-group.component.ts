import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-address-group',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './address-group.component.html',
  styleUrl: './address-group.component.scss',

  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})

export class AddressGroupComponent implements OnInit,OnDestroy {

  @Input({required:true}) controlKey='';
  @Input() label='';

  parentContainer = inject(ControlContainer);

  get parentFormGroup(){
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(){
    this.parentFormGroup.addControl(this.controlKey,
    new FormGroup({
      zip: new FormControl(''),
      street: new FormControl('')
    }))
  }

  ngOnDestroy(){
    this.parentFormGroup.removeControl(this.controlKey);
  }

}
