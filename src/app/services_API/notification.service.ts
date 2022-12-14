import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from "../models/responsiveModels/response.model";
@Injectable({
    providedIn: 'root'
})


export class NotificationService{
    constructor(private http:HttpClient, private configService:ConfigService, private toastr: ToastrService){ }

    handleAlertObj(data: any){

        if(data.type === 'Success')
        {
            this.toastr.success(data.messenge, 'Thông báo');
        }
        else if(data.type === 'Warning')
        {
            this.toastr.warning(data.messenge, 'Cảnh báo');
        }
        else if(data.type === 'Info')
        {
            this.toastr.info(data.messenge, 'Thông báo');
        }
        else
        {
            this.toastr.error(data.messenge, 'Lỗi');
        }

    }

    handleAlert(messenge: string, type: string){
        if(type === 'Success')
        {
            this.toastr.success(messenge, 'Thông báo');
        }
        else if( type === 'Warning')
        {
            this.toastr.warning(messenge, 'Cảnh báo');
        }
        else if( type === 'Info')
        {
            this.toastr.info(messenge, 'Thông báo');
        }
        else
        {
            this.toastr.error(messenge, 'Lỗi');
        }

    }

    async gets(idRole: number, idEmp: string, IsSeen: boolean, pageSize: number)
    {
    return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Notification/list-notification?idRole="+idRole+"&idEmp="+idEmp+"&IsSeen="+IsSeen+"&pageSize="+pageSize).toPromise();
    }

    async updateIsSeen(idNotification: string)
    {
      return await this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Notification/update-isSeen-notification?idNotification="+idNotification, {}).toPromise();
    }

    async deleteNotification(idNotification: string)
    {
      return await this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Notification/delete-notification?idNotification="+idNotification, {}).toPromise();
    }


    async reply(data: any)
    {
      return await this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Chat/reply-messenger", data).toPromise();
    }

    async view(IdSupporter: string)
    {
      return await this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Chat/support-messenger?IdSuporter="+IdSupporter).toPromise();
    }

    async updateIsSeenMess(key: string)
    {
      return await this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Chat/check-seen-messenger?key="+key, {}).toPromise();
    }
}
