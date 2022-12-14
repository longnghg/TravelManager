import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { PlaceModel } from "../models/place.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
  providedIn: 'root'
})

export class PlaceService{
constructor(private http:HttpClient, private configService:ConfigService,
  private notificationService: NotificationService){ }

response: ResponseModel
resPlace: PlaceModel[]
async views()
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/list-place?isDelete="+false).subscribe(res => {
      this.response = res
      this.resPlace =  this.response.content
      resolve(this.resPlace);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value

}

async placeByProvince(toPlace: string)
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/list-place-by-province?toPlace="+toPlace).subscribe(res => {
      this.response = res
      this.resPlace =  this.response.content
      resolve(this.resPlace);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value
}

gets(isDelete)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/list-place?isDelete="+isDelete);
}
getPlace(idPlace: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/get-place?idPlace="+idPlace);
}
getsWaiting(idUser: any, pageIndex: number, pageSize: number)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/list-place-waiting?idUser="+idUser+"&pageIndex="+pageIndex+"&pageSize="+pageSize);
}
create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/create-place", data);
}
update(data: any, idPlace: any)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Service/update-place?idPlace="+idPlace, data);
}
delete(idPlace: any, idUser: any)
{
  return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Service/delete-place?idPlace="+idPlace+"&idUser="+idUser);
}

approve(idPlace: string)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Service/approve-place?idPlace="+idPlace, {});
}

refuse(idPlace: string)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Service/refuse-place?idPlace="+idPlace, {});
}
restore(idPlace: string, idUser: string)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Service/restore-place?idPlace="+idPlace+"&idUser="+idUser, {});
}
search(data){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/search-place", data);
}
searchWaiting(data){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/search-place-waiting", data);
}
}

