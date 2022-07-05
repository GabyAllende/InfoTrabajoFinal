import { Component, OnInit } from '@angular/core';
import { ExcelDocumentService } from '../excel-document.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public message = "";
  name:string = ""
  file:any;
  extension:string = ""
  extensionExcel:boolean = false;
  graficos = 'Plot Scatter Bar BarH Pie'.split(' ');
  selectedGraph='Plot';
  selectedX = "";
  selectedY = "";
  columnas:string[] = [];
  isImageLoading:boolean = false;
  dataTypes:string[]=[];

  isPlot:boolean = false;
  isScatter:boolean = false;
  isBar:boolean = false;
  isBarH:boolean = false;
  isPie:boolean = false;

  constructor(private _excelDocumentService: ExcelDocumentService) { }

  ngOnInit(): void {
    this.extensionExcel = true;
  }

  setDataTypes(graph:string){
    let myres;
    let myxtype =''
    let myytype = ''
    if(this.dataTypes[0]== this.selectedX){
      myxtype= this.dataTypes[1];
      myytype = this.dataTypes[3];
    }
    else{
      myxtype = this.dataTypes[3];
      myytype = this.dataTypes[1];
    }
    if(graph == "Plot"){
      let xx = myxtype == "int64" || myxtype == "float64"
      let yy = myytype == "int64" || myytype == "float64"
      if(xx && yy){
        myres = true
      }
      else{
        myres = false
      }
    }
    else if(graph == "Scatter"){
      let xx = myxtype == "int64" || myxtype == "float64"
      let yy = myytype == "int64" || myytype == "float64"
      if(xx && yy){
        myres = true
      }
      else{
        myres = false
      }
    }
    else if(graph == "Bar"){
      let yy = myytype == "int64" || myytype == "float64"
      if(yy){
        myres = true
      }
      else{
        myres = false
      }
    }
    else if(graph == "BarH"){
      let yy = myytype == "int64" || myytype == "float64"
      if(yy){
        myres = true
      }
      else{
        myres = false
      }
    }
    else if(graph == "Pie"){
      let yy = myytype == "int64" || myytype == "float64"
      let xx = myxtype == "int64" || myxtype == "float64"
      if(yy && xx){
        myres = true
      }
      else{
        myres = false
      }
    }
    return myres
  }
  getName(name:string){
    this.name = name;
  }
  getFile(event:any){
    if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.name = event.target.files[0].name;
      const ext = this.name.split(".");
      this.extension = ext[ext.length-1];
      console.log(this.extension)
      if(this.extension == "csv"){
        this.extensionExcel = false;
      }
      else{
        this.extensionExcel = true;
      }
      console.log("file", this.file);
      console.log("Extension Excel: ",this.extensionExcel);
    }
    
  }

  submitData(){
    let formData = new FormData();
    formData.set("name",this.name)
    formData.set("file", this.file)
    this._excelDocumentService.uploadFile(formData)
      .subscribe(
        data => {
          console.log("EN EL SUBMIT");
          console.log(data);
          this.columnas = JSON.parse(data);
          console.log(this.columnas);
          console.log("primera col ",this.columnas[0]);
          this._excelDocumentService.getDataTypes().subscribe(
            data=>{
              console.log(data);
              this.dataTypes = data.split(/\s+/);
              console.log("DataTypes", this.dataTypes.join(','))
              this.setDataTypes(this.selectedGraph)
            }
          );
        }
      );

      
  }

  seleccionarGrafico(valorGrafico:string){
    console.log("Valor grafico: ",valorGrafico);
    this.selectedGraph = valorGrafico;
  }
  seleccionarColX(valorX:string){
    console.log("Valor x: ",valorX);
    this.selectedX = valorX;
  }

  seleccionarColY(valorY:string){
    console.log("Valor y: ",valorY);
    this.selectedY = valorY;
  }

  imageToShow: any;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
  }
  crearGrafico(){
    this.submitData();
    this.isImageLoading = true;
    this._excelDocumentService.getGraph(this.selectedX, this.selectedY, this.selectedGraph)
      .subscribe(
        data => {
          this.createImageFromBlob(data);
          this.isImageLoading = false;
          console.log("ME LLEGO LA IMAGEN")
        },
        error => {
          this.isImageLoading = false;
          console.log(error);
        }
      );

  }
}
