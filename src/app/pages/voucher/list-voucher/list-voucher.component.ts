import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { VoucherService } from '../../../services_API/voucher.service'
import { VoucherModel } from '../../../models/voucher.model';
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { PaginationModel } from 'src/app/models/responsiveModels/pagination.model';

@Component({
  selector: 'app-list-voucher',
  templateUrl: './list-voucher.component.html',
  styleUrls: ['./list-voucher.component.scss']
})
export class ListVoucherComponent implements OnInit {
  @ViewChild('closeModalLoadDelete') closeModalLoadDelete: ElementRef;
  resVoucher: VoucherModel[]
  resVoucherTmp: VoucherModel[]
  response: ResponseModel
  dataChild: VoucherModel
  typeChild: string
  isDelete: boolean = false
  isLoading: boolean
  auth: AuthenticationModel
  data: any
  pagination = new PaginationModel
  constructor(private voucherService: VoucherService, private notificationService: NotificationService,
    private configService: ConfigService) { }

    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModalDelete: "deleteVoucherModalLabel",
      idModal: "gridVoucher",
      disableApprove: true,
      disableRestore: true,
      disableRadioBox: true,
      disableLog: true,
      disableSchedule: true
    }
      ngOnInit(): void {
        this.columnDefs= [
          { field: 'code', headerName: "Mã Code", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'code'},
          { field: 'value',headerName: "Giá trị", style: "width: 20%;", searchable: true, searchType: 'number', searchObj: 'endDvalueate', },
          { field: 'startDate',headerName: "Từ ngày", style: "width: 20%;", searchable: true, searchType: 'date', searchObj: 'startDate',filter: 'date'},
          { field: 'endDate',headerName: "Đến ngày", style: "width: 20%;", searchable: true, searchType: 'date', searchObj: 'endDate', filter: 'date'},
        ];

        this.auth = JSON.parse(localStorage.getItem("currentUser"))
        this.gridConfig.pageSize = this.pagination.pageSize
        this.search(this.pagination, true)
      }

      search(e?, isNotShow?){
        this.voucherService.search(Object.assign({}, e)).subscribe(res =>{
          this.response = res
          if(this.response.notification.type == StatusNotification.Success){
            this.resVoucher = this.response.content
          }
          else{
            this.resVoucher = []
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
      childData(e){
        this.dataChild = Object.assign({}, e)
      }

      childType(e){
        this.typeChild = e
      }
      getData(data: any){
        this.data = data
      }

      delete(){
        if (this.data) {
          this.voucherService.delete(this.data.idVoucher).subscribe(res =>{
           this.response = res
           this.notificationService.handleAlertObj(res.notification)
           this.isLoading = false

           if (this.response.notification.type == StatusNotification.Success) {
            this.gridConfig.pageIndex = 1
            var data = {
              isDelete: this.gridConfig.isRestore,
              pageIndex: this.gridConfig.pageIndex,
              pageSize: this.gridConfig.pageSize
            }
            this.search(data)
            this.gridConfig.pageIndex  = 1
            this.ngOnInit()

            setTimeout(() => {
              this.closeModalLoadDelete.nativeElement.click()
             }, 100);
           }
         }, error => {
           var message = this.configService.error(error.status, error.error != null?error.error.text:"");
           this.notificationService.handleAlert(message, StatusNotification.Error)
           this.isLoading = false
         })
        }
      }

}
