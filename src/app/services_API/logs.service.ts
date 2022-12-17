import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { LogsModel } from "../models/logs.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
    providedIn: 'root'
  })
  export class LogsService{
    constructor(private http:HttpClient, private configService:ConfigService,private notificationService: NotificationService){ }
    response: ResponseModel
    resLog: LogsModel[]

    gets(data: any)
    {

      return this.http.post<ResponseModel>(this.configService.apiUrl + "/api/log/search-log-by-type", data);
    }
    getDetail(id: string)
    {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Log/detail-log?id="+id);
    }
}
