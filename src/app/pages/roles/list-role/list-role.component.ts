import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { RoleModel } from "../../../models/role.model";
import { AuthenticationModel } from "../../../models/authentication.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { HubConnection } from '@microsoft/signalr';
import { RoleTitle, StatusNotification } from "../../../enums/enum";
import { PaginationModel } from "../../../models/responsiveModels/pagination.model";
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {
  @ViewChild('closeModalLoadDelete') closeModalLoadDelete: ElementRef;
  @ViewChild('closeModalLoadRestore') closeModalLoadRestore: ElementRef;
  isLoading: boolean
  auth: AuthenticationModel
  dataChild: RoleModel
  data: RoleModel
  typeChild: string
  response: ResponseModel
  resRole: RoleModel[]
  resRoleTmp: RoleModel[]
  pagination = new PaginationModel
  private hubConnectionBuilder!: HubConnection;

  public gridConfig: GridConfig = {
    idModalRestore: "restoreRoleModal",
    idModalDelete: "deleteRoleModal",
    idModal: "gridRole",
    radioBoxName: "Kho lưu trữ",
    disableApprove: true,
    disableLog: true,
    disableSchedule: true
  }

  constructor(private roleService: RoleService, private notificationService: NotificationService,
    private configService: ConfigService ) { }
    public columnDefs: ColDef[]
  ngOnInit(): void {
    this.columnDefs= [
      // { field: 'idRole', headerName: "Mã số", searchable: true, searchType: 'text', searchObj: 'idRole'},
      { field: 'nameRole',headerName: "Chức Vụ", style: 'width: 45%', searchable: true, searchType: 'text', searchObj: 'nameRole'},
      { field: 'description',headerName: "Mô Tả", style: 'width: 45%', searchable: true, searchType: 'text', searchObj: 'description'},
    ];

    this.auth = JSON.parse(localStorage.getItem("currentUser"));
    this.gridConfig.pageSize = this.pagination.pageSize

    this.search(this.pagination, true)
    this.hubConnectionBuilder = this.configService.signalR()
    this.hubConnectionBuilder.start();
    this.hubConnectionBuilder.on('Init', (result: any) => {
      this.search(this.pagination, true)
    })


  }

  search(e, isNotShow?){
    console.log(e);

    if (e) {
      this.roleService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resRole = this.response.content
          // this.resRoleTmp = Object.assign([], this.resRole)
        }
        else{
          // this.resRole = this.resRoleTmp
          this.resRole = []
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

  // init(e?){
  //   this.type = e
  //   this.roleService.gets(this.type).subscribe(res => {
  //     this.response = res
  //     if(this.response.notification.type == StatusNotification.Success)
  //     {
  //       this.resRole = this.response.content
  //       this.resRoleTmp = Object.assign([], this.resRole)

  //     }
  //     else{
  //       this.resRole = Object.assign([], this.resRoleTmp)
  //     }

  //   }, error => {
  //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
  //     this.notificationService.handleAlert(message, StatusNotification.Error)
  //   })
  // }


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

  getData(data: any){
    this.data = data
  }

  delete(){
    if (this.data) {
     this.roleService.delete(this.data.idRole).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
       this.isLoading = false
       this.gridConfig.pageIndex = 1
       this.ngOnInit()

       setTimeout(() => {
        this.closeModalLoadDelete.nativeElement.click()
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
      this.roleService.restore(this.data.idRole).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        this.isLoading = false
        this.gridConfig.pageIndex = 1
        var data = {
          isDelete: true,
          pageIndex: this.gridConfig.pageIndex,
          pageSize: this.gridConfig.pageSize
        }
        this.search(data)
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
