import { Component, ViewChild, ElementRef, NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})



export class AppComponent   implements OnInit {
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
  snapshots: Snapshot[] = [];
  max_mem_heap_B: number;
  fileList: Element;
  fileElem: Element;
  fileSelect: Element;
  

  @ViewChild('barLineMarker') barL:ElementRef;
  @ViewChild('dotLineMarker') dotL:ElementRef;
  @ViewChild('mem_heap_BMarker') mem_heap_BL:ElementRef;


 //code that will execute at the start of the loading process
 // just like body.onload()
  ngOnInit(){
   
    this.initObjUrls();
    
    let dropbox;
    dropbox = document.getElementById("dropbox");
    dropbox.addEventListener("dragenter", this.dragenter, false);
    dropbox.addEventListener("dragover", this.dragover, false);
    dropbox.addEventListener("drop", this.drop, false);

   }

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



   dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  
   dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

   drop(e) {
    e.stopPropagation();
    e.preventDefault();
  
    const dt = e.dataTransfer;
    const files = dt.files;
  
    this.handleFiles(files);
  }



  handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!file.type.startsWith('image/')){ continue }
      
      let img = document.createElement("img");
      
      img.classList.add("obj");
      img.setAttribute("file", file);
      // preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
      this.dotL.nativeElement.appendChild(img);
      const reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
      reader.readAsDataURL(file);
    }
  }

   initObjUrls(){
    // window.URL = window.URL;

        this.fileSelect = document.getElementById("fileSelect");
        this.fileElem = document.getElementById("fileElem");
        this.fileList = document.getElementById("fileList");
    
        this.fileSelect.addEventListener("click",  (e)=> {
      if (this.fileElem) {
        let element: HTMLElement = this.fileElem as HTMLElement;
        element.click();
      }
      e.preventDefault(); // prevent navigation to "#"
    }, false);
   }


  handleFilesWithObjUrls(files){
    if (!files.length) {
      this.fileList.innerHTML = "<p>No files selected!</p>";
    } else {
      this.fileList.innerHTML = "";
      const list = document.createElement("ul");
      this.fileList.appendChild(list);
      for (let i = 0; i < files.length; i++) {
        const li = document.createElement("li");
        list.appendChild(li);
        
        const img = document.createElement("img");
        img.src = window.URL.createObjectURL(files[i]);
        img.height = 60;
        img.onload = function() {
          window.URL.revokeObjectURL(img.src);
        }
        li.appendChild(img);
        const info = document.createElement("span");
        info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
        li.appendChild(info);
      }
    }
  }



  handleMassifData(){
    // console.log("inputString:" + this.inputString);
    // alert(this.inputString);




    let cmdRegPatt = new RegExp( ".*cmd: (.*)\n");
    let cmdRet = (/.*cmd:\s(.*)\n/g).exec(this.inputString);
    let timeunitRet = (/.*time_unit:\s(.*)\n/g).exec(this.inputString);
    let snpashotRegEx = /#-{11}\nsnapshot=(\d+)\n#-{11}\ntime=(\d+)\nmem_heap_B=(\d+)\nmem_heap_extra_B=(\d+)\nmem_stacks_B=(\d+)\nheap_tree=([a-zA-Z]+)\n/g;
    // let snaptshotRet = .exec(this.inputString);
    console.log(cmdRet[1]);
    console.log(timeunitRet[1]);
    // console.log(snaptshotRet[1]);
    let snapshotMatch;
    while((snapshotMatch = snpashotRegEx.exec(this.inputString)) !== null) {
      let node = new Snapshot();
      node.index = parseInt(snapshotMatch[1]);
      node.time = parseInt(snapshotMatch[2]);
      node.mem_heap_B= parseInt(snapshotMatch[3]);
      node.mem_heap_extra_B= parseInt(snapshotMatch[4]);
      node.mem_stacks_B= parseInt(snapshotMatch[5]);
      node.heap_tree = snapshotMatch[6];
      this.snapshots.push(node);
      // console.log(node);
}
    // alert(snaptshotRet[1]);
    // console.log("the left string:" + this.inputString);

    this.max_mem_heap_B = 0;
    let arrLength = this.snapshots.length;
    for (var i = 0; i < arrLength; i++) {
      // Find Maximum X Axis Value
      if (this.snapshots[i].mem_heap_B > this.max_mem_heap_B)
      this.max_mem_heap_B = this.snapshots[i].mem_heap_B;
    }

    let nodeRegPatt = "";

  }


  mouseEnterMem_heap_B(event){
    // let target = event.target;
    console.log('mouseEnter target '+     event.mem_heap_B);
    // console.log('mouseEnter'+     target.style);
  };

  mouseLeaveMem_heap_B(event){
    // let target = event.target;
    console.log('mouseLeave'+     event.mem_heap_B);
  };
  

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


  onRightClickMem_heap_B(){
    // this.lines.length = 0;
    //reset it
    this.lines = [];
    this.lines.push(new Line(0, 0, 0, 0)) ;
    this.data.forEach((element, i) => {
      let dotY = element.mem_heap_B / this.max_mem_heap_B * this.height;
      let dotX = (i + 0.5)/ this.data.length * this.width;
      this.lines[i].endX = dotX;
      this.lines[i].endY = dotY;
      this.lines.push(new Line(dotX, dotY, 0, 0));
    });

    this.lines.forEach((element, i )=>{
      console.log("the "+i+" pos:"+ element.toString());
      this.mem_heap_BL.nativeElement.appendChild(
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
};

class Snapshot{
  index: number;
  time: number;
  mem_heap_B: number;
  mem_heap_extra_B: number;
  mem_stacks_B: number;
  heap_tree: string;
};



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