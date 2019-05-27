import { Component, ViewChild, ElementRef, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  declarations: [AppComponent]
  })

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
  lines: Line[] = [];
  inputString: string;

  @ViewChild('barLineMarker') barL:ElementRef;
  @ViewChild('dotLineMarker') dotL:ElementRef;

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

  onRightClick(){
    // this.lines.length = 0;
    //reset it
    this.lines = [];
    this.lines.push(new Line(0, 0, 0, 0)) ;
    this.data.forEach((element, i) => {
      let dotY = element.value / this.max * this.height;
      let dotX = (i + 0.5)/ this.data.length * this.width;
      this.lines[i].endX = dotX;
      this.lines[i].endY = dotY;
      this.lines.push(new Line(dotX, dotY, 0, 0));
    });

    this.lines.forEach((element, i )=>{
      console.log("the "+i+" pos:"+ element.toString());
      this.dotL.nativeElement.appendChild(
      this.createLine(element.startX,element.startY, element.endX, element.endY));
    });
  }

  DotChartclick(){
    // var myEl = document.element( document.querySelector( '#dotLineMarker' ) );
    // this.dotL.nativeElement.empty();
    alert("try to destory");
    if(this.dotL.nativeElement.parentNode != null){
      alert("destorying");
    //  this.dotL.nativeElement.parentNode.removeChild(this.dotL.nativeElement);
    //  failed way: this.dotL.nativeElement.nodeValue = "";  doesn't work
    //  specify all the lines added with class "dash", then we can remove them, here.
    // or we can remove childnodes directly
    this.dotL.nativeElement.childNodes.forEach(childNode => {
      this.dotL.nativeElement.removeChild(childNode);
    });
   
    // this.dotL.nativeElement.getElementsByTagName
    }
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
      this.barL.nativeElement.appendChild(
        this.createLine(
          this.linePos[0], 
          this.linePos[1],
          this.linePos[2],
          this.linePos[3])
          );
    }else{
      console.error("some exception case here with status:"+this.lineStatus);
    }
  }; 

  mouseEnter(event){
    console.log('mouseEnter'+ event);
  };

  mouseLeave(event){
    console.log('mouseLeave'+ event);
  };

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
    line.setAttribute('class', "dash");  
    line.setAttribute('style', styles);  
    return line;
  }

  createLine(x1, y1, x2, y2) {
      let a = x1 - x2,
          b = y1 - y2,
          c = Math.sqrt(a * a + b * b);

      let sx = (x1 + x2) / 2,
          sy = (y1 + y2) / 2;

      let x = sx - c / 2,
          y = sy;

      let alpha = Math.PI - Math.atan2(-b, a);

      return this.createLineElement(x, y, c, -alpha);
  }
}



class Line{
  startX:number;
  startY:number;
  endX:number;
  endY:number;
 
  constructor(sx, sy,ex, ey){
    this.startX = sx;
    this.startY = sy;
    this.endX = ex;
    this.endY = ey;
  }
  
 
  toString(){
   let str =  "startX:"+this.startX 
           + " startY:"+this.startY 
           + " endX:"+this.endX 
           + " endY:"+this.endY ;
  return str;
  }
 };