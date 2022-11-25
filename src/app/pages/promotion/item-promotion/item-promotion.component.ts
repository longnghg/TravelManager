import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { PromotionModel, ValidationPromotionModel } from "src/app/models/promotion.model";
import { PromotionService } from "../../../services_API/promotion.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';

@Component({
  selector: 'app-item-promotion',
  templateUrl: './item-promotion.component.html',
  styleUrls: ['./item-promotion.component.scss']
})
export class ItemPromotionComponent implements OnInit {

  @Input() resPromotion: PromotionModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel
  validatePromotion: ValidationPromotionModel = new ValidationPromotionModel
  response: ResponseModel
  isChange: boolean = false
  resPromotionTmp: PromotionModel
  formData: any

  constructor(private promotionService: PromotionService,
    private configService: ConfigService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))

  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resPromotion = new PromotionModel()
      this.resPromotionTmp = Object.assign({}, this.resPromotion)
    }
    else{
      if(this.resPromotion){
        this.resPromotion.fromDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resPromotion.fromDate)
        this.resPromotion.toDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resPromotion.toDate)
      }
      }
  }

  dateChange() {
    this.resPromotion.fromDate = new Date(this.resPromotion.fromDateDisplay).getTime()
    this.resPromotion.toDate = new Date(this.resPromotion.toDateDisplay).getTime()

  }
  inputChange(){
    if (JSON.stringify(this.resPromotion) != JSON.stringify(this.resPromotionTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resPromotion = Object.assign({}, this.resPromotionTmp)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }
  save(){
    this.validatePromotion = new ValidationPromotionModel
    this.validatePromotion =  this.configService.validatePromotion(this.resPromotion, this.validatePromotion)

    if (this.validatePromotion.total == 0) {
      this.resPromotion.IdUserModify = this.auth.id
      if(this.type == "create")
      {
        this.promotionService.create(this.resPromotion).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
	    if(this.response.notification.type == StatusNotification.Success)
        {
		      this.resPromotion = Object.assign({}, new PromotionModel)
          this.resPromotionTmp = Object.assign({}, new PromotionModel)
          this.validatePromotion = new ValidationPromotionModel
          this.isChange = false
        }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)

        })
      }
      else
      {
          this.promotionService.update(this.resPromotion, this.resPromotion.idPromotion).subscribe(res =>{
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
    }

    close(){
      this.resPromotion = Object.assign({}, this.resPromotionTmp)
      this.validatePromotion = new ValidationPromotionModel

      this.isChange = false
       this.parentType.emit(null);
    }

    getParentData(type?: string){
      this.parentType.emit(type);
      this.parentData.emit(this.resPromotion);
    }
  }
