import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [MatFormFieldModule,MatButtonModule,MatInputModule,FormsModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent {
  @Input()
  errorMessage!: string;
@Input({required:true}) role!:RoleCreateRequest;
@Input() message!:string;
@Output()addRole:EventEmitter<RoleCreateRequest> =
 new EventEmitter<RoleCreateRequest>();
errrorMessage: any;

add(){
  this.addRole.emit(this.role);
}
}
