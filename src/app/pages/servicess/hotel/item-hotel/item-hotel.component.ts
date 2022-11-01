import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HotelModel ,ValidationHotelModel} from 'src/app/models/hotel.model';
import { HotelService } from "src/app/services_API/hotel.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { StatusNotification } from "../../../../enums/enum";

@Component({
  selector: 'app-item-hotel',
  templateUrl: './item-hotel.component.html',
  styleUrls: ['./item-hotel.component.scss']
})
export class ItemHotelComponent implements OnInit {
  @Input() resHotel: HotelModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  auth: AuthenticationModel
  validateHotel: ValidationHotelModel = new ValidationHotelModel
  response: ResponseModel
  isChange: boolean = false
  resHotelTmp: HotelModel
  formData: any
  constructor(private hotelService: HotelService, private configService: ConfigService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resHotel = new HotelModel()
    }
    this.resHotelTmp = Object.assign({}, this.resHotel)
  }


  inputChange(){
    if (JSON.stringify(this.resHotel) != JSON.stringify(this.resHotelTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resHotel = Object.assign({}, this.resHotelTmp)

    this.isChange = false
  }

  save(){
    this.validateHotel = new ValidationHotelModel
    this.validateHotel =  this.configService.validateHotel(this.resHotel, this.validateHotel)

    if (this.validateHotel.total == 0) {
      //var file = new FormData();
      //file.append('data', JSON.stringify(this.resHotel))

      //if (this.formData) {
        //file.append('file', this.formData.path[0].files[0])
      //}

      if(this.type == "create")
      {
        this.hotelService.create(this.resHotel).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
	if(this.response.notification.type == StatusNotification.Success)
        {
		 this.close()
        }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)

        })
      }
      else{
        this.hotelService.update(this.resHotel).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          if(this.response.notification.type == StatusNotification.Success)
          {
		this.isChange = false
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)

        })
      }

      }
      // else{
      //   this.hotelService.update(file).subscribe(res =>{
      //     this.response = res
      //     if (res.notification.type == "Validation") {
      //       if (res.notification.description == "Phone") {
      //         this.validateEmployee.phone == res.notification.messenge
      //       }
      //       else{
      //         this.validateEmployee.email == res.notification.messenge
      //       }
      //     }
      //     else{
      //       this.notificationService.handleAlertObj(res.notification)
      //       if (res.notification.type == StatusNotification.Success) {
      //         this.close()
      //         this.isChange = true
      //       }
      //     }
      //   }, error => {
      //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      //     this.notificationService.handleAlert(message, StatusNotification.Error)
      //   })
      // }

    }



  close(){
     this.backup()
  }
  getDataDelete(){
    this.parentDelete.emit(this.resHotel);
  }
}
