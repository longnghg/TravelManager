import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { LocationModel } from "../models/location.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
    providedIn: 'root'
})

export class ProvinceService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }
  response: ResponseModel
  resProvince: LocationModel[]
  GetData()
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/WeatherForecast/get-data");
  }
  async views()
  {
    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Location/list-province?pageIndex="+1+"&pageSize="+10).subscribe(res => {
        this.response = res
        this.resProvince =  this.response.content
        resolve(this.resProvince);
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })})
    return value
  }
  gets()
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Location/list-province");
  }

  search(data){
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/search-province", data);
  }

  create(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/create-province", data);
  }

  update(data: any, idProvince: any)
  {
      return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Location/update-province?idProvince="+idProvince, data);
  }

  delete(idProvince: any)
  {
      return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Location/delete-province?idProvince="+idProvince);
  }
}
