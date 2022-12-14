import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ProvinceService } from "../../../../services_API/province.service";
import { ConfigService } from "../../../../services_API/config.service";
import { LocationModel, ValidateLocationModel } from 'src/app/models/location.model';
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../../enums/enum";
import { ListProvinceComponent } from "../list-province/list-province.component";
@Component({
  selector: 'app-item-province',
  templateUrl: './item-province.component.html',
  styleUrls: ['./item-province.component.scss']

})
export class ItemProvinceComponent implements OnInit {
  isLoading: boolean
  @ViewChild('closeModal') closeModal: ElementRef
  @Input() resProvince: LocationModel
  @Input() type: string
  @Output() parentDel = new EventEmitter<any>()
  validateLocation: ValidateLocationModel = new ValidateLocationModel
  response: ResponseModel
  isChange: boolean = false
  resProvinceTmp: LocationModel
  constructor(private listProvinceComponent: ListProvinceComponent, private provinceService: ProvinceService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.type == "create"){
      this.resProvince = new LocationModel()
    }
    this.resProvinceTmp = Object.assign({}, this.resProvince)
  }


  inputChange(){
    if (JSON.stringify(this.resProvince) != JSON.stringify(this.resProvinceTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resProvince = Object.assign({}, this.resProvinceTmp)
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
    this.isChange = false
  }
  save(){
    this.validateLocation = new ValidateLocationModel
    this.validateLocation =  this.configService.validateProvince(this.resProvince, this.validateLocation)
    if (this.validateLocation.total == 0) {
      if(this.type == "create")
      {
        this.provinceService.create(this.resProvince).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if (this.response.notification.type == StatusNotification.Success) {
            this.listProvinceComponent.ngOnInit()
            this.close()
          }
          this.isLoading = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
      else{
        this.provinceService.update(this.resProvince, this.resProvince.idProvince).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.isLoading = false
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.listProvinceComponent.ngOnInit()
            this.resProvinceTmp = Object.assign({}, this.resProvince)
            this.isChange = false
            setTimeout(() => {
              this.closeModal.nativeElement.click()
            }, 100);
          }
          else{
            this.resProvince = Object.assign({},this.resProvinceTmp)
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })

      }

    }
    else{
      this.isLoading = false
    }

  }

  getDataDelete(){
    this.parentDel.emit(this.resProvince);
  }

  close(){
    this.validateLocation = new ValidateLocationModel
    this.resProvince = Object.assign({}, this.resProvinceTmp)
    this.isChange = false
  }
}
