import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { EmployeeModel } from "../models/employee.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }

  response: ResponseModel
  resEmployee: EmployeeModel[]
  async views(fromDate, toDate)
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/list-selectbox-employee?fromDate="+fromDate+"&toDate="+toDate).subscribe(res => {
      this.response = res
      this.resEmployee =  this.response.content
      resolve(this.resEmployee);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value

}

async viewsUpdate(fromDate, toDate, idSchedule)
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/list-selectbox-employee-update?fromDate="+fromDate+"&toDate="+toDate+"&idSchedule="+idSchedule).subscribe(res => {
      this.response = res
      this.resEmployee =  this.response.content
      resolve(this.resEmployee);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value

}

  async views2()
  {
    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/list-employee?isDelete="+false).subscribe(res => {
        this.response = res
        this.resEmployee =  this.response.content
        resolve(this.resEmployee);
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })})
    return value

  }
  gets(isDelete: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/list-employee?isDelete="+isDelete);
  }

  get(idEmployee: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/detail-employee?idEmployee="+idEmployee);
  }

  search(data){
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Employee/search-employee", data);
  }
  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Employee/create-employee", data);
  }

  update(data: any, idEmployee: any)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Employee/update-employee?idEmployee="+idEmployee, data);
  }
  delete(idEmployee: any)
  {
    return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Employee/delete-employee?idEmployee="+idEmployee);
  }
  restore(idEmployee: any)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Employee/restore-employee?idEmployee="+idEmployee, {});
  }
  changePassword(idEmp: string, password: string, newPassword: string){
    return this.http.put<ResponseModel>(this.configService.apiUrl + "/api/Authentication/change-pass-employee?idEmp="+idEmp+"&password="+password+"&newPassword="+newPassword, {});
}
SendOTP(email: string){
  return this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Employee/send-otp-emp?email="+email);
}
statisticEmp()
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/list-statistic-total-emp");

}

scheduleOfEmployee(idEmployee: any, pageIndex: number, pageSize: number)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/list-schedule-of-employee?idEmployee="+idEmployee+"&pageIndex="+pageIndex+"&pageSize="+pageSize);
}
}
