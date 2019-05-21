import { Component } from '@angular/core';
@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'angularvisual';
width: number;
height: number;
yAxis: string;
xAxis: string;
data: any;
max: number;

constructor(){
// Options
this.width = 600;
this.height = 350;
this.yAxis = 'Sales';
this.xAxis = '2014';
// Data 
this.data = [
{
label: 'January',
value: 36
},
{
label: 'February',
value: 54
},
{
label: 'March',
value: 62
},
{
label: 'April',
value: 82
},
{
label: 'May',
value: 96
},
{
label: 'June',
value: 104
},
{
label: 'July',
value: 122
},
{
label: 'August',
value: 152
},
{
label: 'September',
value: 176
},
{
label: 'October',
value: 180
},
{
label: 'November',
value: 252
},
{
label: 'December',
value: 342
}
];
// Find Maximum X & Y Axis Values - this is used to position the data as a percentage of the maximum
this.max = 0;
var arrLength = this.data.length;
for (var i = 0; i < arrLength; i++) {
// Find Maximum X Axis Value
  if (this.data[i].value > this.max)
this.max = this.data[i].value;
}
// End Controller 
}

clicked(event) { 
  alert('clicked：'+ event);
// this.Status = false; 
} 

mouseEnter(event){
  console.log('mouseEnter'+ event);
}

mouseLeave(event){
  console.log('mouseLeave'+ event);
}


}
