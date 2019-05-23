import { Component, ViewChild, ElementRef } from '@angular/core';
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
  htmlYouWantToAdd:string;
  linePos: number[] = [-1, -1, -1, -1];
  lineStatus: string = "none";

  @ViewChild('one') d1:ElementRef;

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

  clicked(x, y) { 
    console.log('clicked：x '+ x + "   y:" + y);
    // this.htmlYouWantToAdd = "<b>Some HTML you want to display</b>";

    if(this.lineStatus ===  "none" || this.lineStatus ===  "ready"){
      this.linePos[0] = x;
      this.linePos[1] = y;
      this.lineStatus = "starting";
    }else if (this.lineStatus ===  "starting"){
      this.linePos[2] = x;
      this.linePos[3] = y;
      this.lineStatus = "ready";
      this.d1.nativeElement.appendChild(
        this.createLine(
          this.linePos[0], 
          this.linePos[1],
          this.linePos[2],
          this.linePos[3])
          );
    }else{
      console.error("some exception case here with status:"+this.lineStatus);
    }
  } 

  mouseEnter(event){
    console.log('mouseEnter'+ event);
  }

  mouseLeave(event){
    console.log('mouseLeave'+ event);
  }

  createLineElement(x, y, length, angle) {
   
    let line = document.createElement("div");
    let styles = 'border: 1px solid black; '
               + 'width: ' + length + 'px; '
               + 'height: 0px; '
               + '-moz-transform: rotate(' + angle + 'rad); '
               + '-webkit-transform: rotate(' + angle + 'rad); '
               + '-o-transform: rotate(' + angle + 'rad); '  
               + '-ms-transform: rotate(' + angle + 'rad); ' 
               + 'position: absolute; '
               + 'bottom: ' + y + 'px; '
               + 'left: ' + x + 'px; ';

    // + 'transform-origin: bottom left;' 
    console.log("styles:"+styles);
    line.setAttribute('style', styles);  
    return line;
}

createLine(x1, y1, x2, y2) {
    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    var x = sx - c / 2,
        y = sy;

    var alpha = Math.PI - Math.atan2(-b, a);

    return this.createLineElement(x, y, c, -alpha);
}

}
