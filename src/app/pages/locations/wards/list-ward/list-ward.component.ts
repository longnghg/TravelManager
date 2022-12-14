import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { DistrictService } from '../../../../services_API/district.service';
import { WardService } from '../../../../services_API/ward.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { HubConnection } from '@microsoft/signalr';
import { StatusNotification } from "../../../../enums/enum";
import { PaginationModel } from "../../../../models/responsiveModels/pagination.model";
@Component({
  selector: 'app-list-ward',
  templateUrl: './list-ward.component.html',
  styleUrls: ['./list-ward.component.scss']
})
export class ListWardComponent implements OnInit {
  @ViewChild('closeModalLoadDeleteWard') closeModalLoadDeleteWard: ElementRef;
  isLoading: boolean
  data: LocationModel
  @Input() resDistrict: LocationModel[]
  dataChild: LocationModel
  typeChild: string
  resWard: LocationModel[]
  response: ResponseModel
  pagination = new PaginationModel
  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalDelete: "deleteWardModal",
    idModal: "gridWard",
    disableRadioBox: true,
    disableApprove: true,
    disableLog: true,
    disableSchedule: true,
    disableDelete: true
  }

  private hubConnectionBuilder: HubConnection
  constructor( private wardService: WardService, private districtService: DistrictService, private notificationService: NotificationService,
    private configService: ConfigService){}
  ngOnInit(): void {
    this.districtService.views().then(response => {
      this.resDistrict = response
      this.columnDefs= [
        // { field: 'idWard', headerName: "Mã phường/xã", searchable: true, searchType: 'text', searchObj: 'idWard'},
        { field: 'nameWard',headerName: "Tên phường/xã", searchable: true, searchType: 'text', searchObj: 'nameWard'},
        { field: 'districtName',headerName: "Tên quận/huyện", searchable: true, searchType: 'section', searchObj: 'districtId', multiple: true, closeOnSelect: false, bindLabel: 'nameDistrict', bindValue: "idDistrict", listSection: this.resDistrict},
      ];
    })

    this.gridConfig.pageSize = this.pagination.pageSize
    this.search(this.pagination, true)
    this.hubConnectionBuilder = this.configService.signalR()
    this.hubConnectionBuilder.start();
    this.hubConnectionBuilder.on('Init', (result: any) => {
      this.search(this.pagination, true)
    })

  }
  init(){
    this.wardService.gets().subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resWard = this.response.content
      }
      else{
        this.resWard = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })

    this.districtService.views().then(response => {
      this.resDistrict = response
      this.columnDefs= [
        // { field: 'idWard', headerName: "Mã phường/xã", searchable: true, searchType: 'text', searchObj: 'idWard'},
        { field: 'nameWard',headerName: "Tên phường/xã", searchable: true, searchType: 'text', searchObj: 'nameWard'},
        { field: 'districtName',headerName: "Tên quận/huyện", searchable: true, searchType: 'section', searchObj: 'districtId', multiple: true, closeOnSelect: false, bindLabel: 'nameDistrict', bindValue: "idDistrict", listSection: this.resDistrict},
      ];
    })

  }

  search(e?, isNotShow?){
    if (e) {
      this.wardService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resWard = this.response.content
        }
        else{
          this.resWard = []
          if (!isNotShow) {
            this.notificationService.handleAlertObj(res.notification)
          }
        }
        this.gridConfig.totalResult = this.response.totalResult
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  childData(e){
    if (e) {
      this.dataChild = Object.assign({}, e)
    }

  }

  childType(e){
    if (e) {
      this.typeChild = e
    }
  }

  parentDelete(e){
    this.data = e
  }

  deleteWard(){
    if (this.data) {
     this.wardService.delete(this.data.idWard).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
       this.isLoading = false
       this.ngOnInit()
       setTimeout(() => {
        this.closeModalLoadDeleteWard.nativeElement.click()
       }, 100);
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)
       this.isLoading = false
     })
    }
   }
}
