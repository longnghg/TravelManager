import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { TourService } from "src/app/services_API/tour.service";
import { TourModel } from 'src/app/models/tour.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ColDef2, GridConfig2} from '../../../components/grid2-data/grid2-data.component';
// signalr
import { HubConnection } from '@microsoft/signalr';
import { StatusApprove, StatusNotification, TypeAction } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { PaginationModel } from "../../../models/responsiveModels/pagination.model";
@Component({
  selector: 'app-list-tour',
  templateUrl: './list-tour.component.html',
  styleUrls: ['./list-tour.component.scss']
})
export class ListTourComponent implements OnInit {
  @ViewChild('closeModalLoadDelete') closeModalLoadDelete: ElementRef;
  @ViewChild('closeModalLoadRestore') closeModalLoadRestore: ElementRef;
  @ViewChild('closeModalLoadApprove') closeModalLoadApprove: ElementRef;
  isLoading: boolean
  resTour: TourModel[]
  resTourWaiting: TourModel[]
  restourTmp: TourModel[]
  resTourWaitingTmp: TourModel[]
  response: ResponseModel
  dataChild: TourModel
  data: TourModel
  type: boolean = false
  typeChild: string
  auth: AuthenticationModel
  pagination = new PaginationModel
  private hubConnectionBuilder: HubConnection


  public columnDefs: ColDef[]
  public columnDefsWaiting: ColDef[]

  public gridConfig2: GridConfig2 = {
    idModalRestore: "restoreTourModal",
    idModalDelete: "deleteTourModal",
    // isRestore: false,
    route: "item-tour",
    alias: "idTour",
    disableRadioBox: false,
    radioBoxName: "Kho lưu trữ",
    disableApprove: true,
    disableLog: true,
    disableSchedule: true

  }
  public gridConfigApprove: GridConfig2 = {
    idModalApprove: "approveTourModal",
    route: "item-tour",
    alias: "idTour",
    disableRadioBox: true,
    disableCreate: true,
    disableDelete: true,
    disableRestore: true,
    disableLog: true,
    disableSchedule: true
  }
  constructor(
    private configService: ConfigService,
     private tourService: TourService,
      private notificationService: NotificationService) {}

    ngOnInit(): void {
      this.columnDefs= [
        { field: 'idTour', headerName: "Mã số", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'idTour'},
        { field: 'nameTour',headerName: "Tên", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'nameTour'},
        { field: 'toPlace',headerName: "Đến", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'toPlace'},
        // { field: 'rating',headerName: "Số sao", style: "width: 10%;", searchable: true, searchType: 'text', searchObj: 'rating'},
        { field: 'rating',headerName: "Số sao", style: "width: 20%;", filter: "star",searchable: true, searchType: 'section', searchObj: 'rating' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.list10Star()},
        // { field: 'createDate: string',headerName: "Ngày tạo", style: "width: 160px;", searchable: true, searchType: 'date', searchObj: 'createDate'},
      ];

      this.columnDefsWaiting= [
        { field: 'idTour', headerName: "Mã số", style: "width: 20%;", searchable: false, searchType: 'text', searchObj: 'idTour'},
        { field: 'nameTour',headerName: "Tên", style: "width: 20%;", searchable: false, searchType: 'text', searchObj: 'tourName'},
        { field: 'modifyBy',headerName: "Người yêu cầu", style: "width: 15%;", searchable: false, searchType: 'text', searchObj: 'modifyBy'},
        { field: 'modifyDate',headerName: "Ngày yêu cầu", style: "width: 20%;", filter: 'date', searchable: false, searchType: 'date', typeDate: 'range', searchObj: 'modifyDate'},
        { field: 'typeAction',headerName: "Loại phê duyệt", style: "width: 15%;", searchable: false, searchType: 'section', searchObj: 'typeAction' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listTypeAction()},
      ];

      this.gridConfig2.pageSize = this.pagination.pageSize
      this.gridConfigApprove.pageSize = this.pagination.pageSize
      this.auth = JSON.parse(localStorage.getItem("currentUser"));
      if (history.state.isDelete) {
        this.gridConfig2.isRestore = history.state.isDelete
        this.pagination.isDelete = history.state.isDelete
        this.search(this.pagination, true)
      }
      else{
        this.search(this.pagination, true)
      }

      this.initWaiting(this.pagination)
      // this.hubConnectionBuilder = this.configService.signalR()
      // this.hubConnectionBuilder.start();
      // this.hubConnectionBuilder.on('Init', (result: any) => {
      //   this.init(this.type)
      // })

      // this.initWaiting(this.type)
      // this.hubConnectionBuilder = this.configService.signalR()
      // this.hubConnectionBuilder.start();
      // this.hubConnectionBuilder.on('InitWaiting', (result: any) => {
      //   this.initWaiting(this.type)
      // })

    }

    // init(isDelete){
    //   this.tourService.gets(isDelete).subscribe(res =>{
    //     this.response = res
    //     if(this.response.notification.type  == StatusNotification.Success){
    //       this.resTour = this.response.content
    //     }
    //     this.restourTmp = Object.assign([], this.resTour)


    //     this.columnDefs= [
    //       { field: 'idTour', headerName: "Mã số", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'idTour'},
    //       { field: 'nameTour',headerName: "Tên", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'nameTour'},
    //       { field: 'toPlace',headerName: "Đến", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'toPlace'},
    //       // { field: 'rating',headerName: "Số sao", style: "width: 10%;", searchable: true, searchType: 'text', searchObj: 'rating'},
    //       { field: 'rating',headerName: "Số sao", style: "width: 20%;", filter: "star",searchable: true, searchType: 'section', searchObj: 'rating' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.list10Star()},
    //       // { field: 'createDate: string',headerName: "Ngày tạo", style: "width: 160px;", searchable: true, searchType: 'date', searchObj: 'createDate'},
    //       ];

    //   }, error => {
    //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    //     this.notificationService.handleAlert(message, StatusNotification.Error)
    //   })
    // }

    initWaiting(e){
      this.tourService.getwaiting(this.auth.id, e.pageIndex, e.pageSize).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == StatusNotification.Success){
          this.resTourWaiting = this.response.content
          this.resTourWaiting.forEach(tour => {
            tour.approveName = StatusApprove[tour.approveStatus]
            tour.typeAction = TypeAction[tour.typeAction]
          });
        // this.resTourWaitingTmp = Object.assign([], this.resTourWaiting)
        }
        else{
          this.resTourWaiting = []
        }
        this.gridConfigApprove.totalResult = this.response.totalResult
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }

    search(e?, isNotShow?){
      if (e) {
        this.tourService.search(Object.assign({}, e)).subscribe(res => {
          this.response = res
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resTour = this.response.content
            // this.restourTmp = Object.assign([], this.resTour)
          }
          else{
            // this.resTour =  Object.assign([], this.restourTmp)
            this.resTour =  []
            if (!isNotShow) {
              this.notificationService.handleAlertObj(res.notification)
            }
          }
          this.gridConfig2.totalResult = this.response.totalResult

        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })


      }
    }

    // searchWaiting(e?){
    //   if (e) {
    //     this.tourService.searchWaiting(Object.assign({}, e)).subscribe(res => {
    //       this.response = res
    //       if(this.response.notification.type == StatusNotification.Success)
    //       {
    //         this.resTourWaiting = this.response.content
    //         this.resTourWaiting.forEach(tour => {
    //           tour.approveName = StatusApprove[tour.approveStatus]
    //           tour.typeAction = TypeAction[tour.typeAction]
    //         });
    //       }
    //       else{
    //         this.resTourWaiting =  Object.assign([], this.resTourWaitingTmp)
    //         this.notificationService.handleAlertObj(res.notification)
    //       }

    //     }, error => {
    //       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    //       this.notificationService.handleAlert(message, StatusNotification.Error)
    //     })
    //   }
    // }

    childData(e){
      if (e) {
        this.dataChild = e
      }
    }
    childType(e){
      if (e) {
        this.typeChild = e
      }
    }
     getData(data: any){
      this.data = data
    }

    delete(){
      if (this.data) {
       this.tourService.delete(this.data.idTour, this.auth.id).subscribe(res =>{
         this.response = res
         this.notificationService.handleAlertObj(res.notification)
         this.isLoading = false

         this.gridConfig2.pageIndex = 1
         var data = {
           isDelete: this.gridConfig2.isRestore,
           pageIndex: this.gridConfig2.pageIndex,
           pageSize: this.gridConfig2.pageSize
         }
         this.search(data)
         this.gridConfigApprove.pageIndex = 1
         var dataWaiting = {
           pageIndex: this.gridConfigApprove.pageIndex,
           pageSize: this.gridConfigApprove.pageSize
         }
         this.initWaiting(dataWaiting)
         setTimeout(() => {
          this.closeModalLoadDelete.nativeElement.click()
          this.closeModalLoadApprove.nativeElement.click()
         }, 100);
       }, error => {
         var message = this.configService.error(error.status, error.error != null?error.error.text:"");
         this.notificationService.handleAlert(message, StatusNotification.Error)
         this.isLoading = false
       })
      }
     }

     restore(){
      if (this.data) {
        this.tourService.restore(this.data.idTour, this.auth.id).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.isLoading = false

          this.gridConfig2.pageIndex = 1
          var data = {
            isDelete: true,
            pageIndex: this.gridConfig2.pageIndex,
            pageSize: this.gridConfig2.pageSize
          }
          this.search(data)
          this.gridConfigApprove.pageIndex = 1
          var dataWaiting = {
            pageIndex: this.gridConfigApprove.pageIndex,
            pageSize: this.gridConfigApprove.pageSize
          }
          this.initWaiting(dataWaiting)

          setTimeout(() => {
            this.closeModalLoadRestore.nativeElement.click()
           }, 100);
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
    }
  }
