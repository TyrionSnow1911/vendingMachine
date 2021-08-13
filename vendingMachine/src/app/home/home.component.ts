import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // form variables
  centsForm = new FormGroup({
    cents: new FormControl(''),
  });
  pennysForm = new FormGroup({
    pennys: new FormControl(''),
  });
  nicklesForm = new FormGroup({
    nickles: new FormControl(''),
  });
  quartersForm = new FormGroup({
    quarters: new FormControl(''),
  });

  cokeQuantityForm = new FormGroup({
    cokes: new FormControl(''),
  });
  pepsiQuantityForm = new FormGroup({
    pepsi: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}
}
