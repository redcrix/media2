import { Injectable } from '@angular/core';
//import { AlertController } from 'ionic-angular';
import { AlertController } from '@ionic/angular';
import { Datetime } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { config } from '../../providers/Config';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AppSettings } from '../../app/config/globals';

@Injectable()
export class Heplers {
    //
    constructor(public datepipe: DatePipe, public decPipe: DecimalPipe, public Config: config, public storage: Storage, public toastCtrl: ToastController, public alertCtrl: AlertController) {

    }
    //.then(res=>{return res})
    async ReadFromStorage(Key: string) {

        return await this.storage.get(Key);

        //return temp;
    }

    getEmpName() {
        // console.log(AppSettings.USERNAME);

        return AppSettings.USERNAME;
    }
    getDepartmentName() {
        // console.log(AppSettings.DEPARTMENT);

        return AppSettings.DEPARTMENT;
    }
    getDepartmentID() {
        return AppSettings.DEPARTMENT_ID;
    }
    getEmpID() {
        return AppSettings.EMPID;
    }
    getORG_NAME() {
        return AppSettings.ORG_NAME;
    }
    getDOJ() {
        return AppSettings.DOJ;
    }
    getfloatDOJ() {
        return AppSettings.floatDOJ;
    }
    getSTATE() {
        return AppSettings.STATE;
    }
    
    GetDateFormat(): Promise<string> {
        return this.storage.get("DateFormat");
    }

    GetServerDateFormat() {
        debugger;
        return AppSettings.ServerDateFormat;
    }
    GetServerTimeFormat() {
        debugger;
        return AppSettings.ServerTimeFormat;
    }

    GetTimeFormat(): Promise<string> {
        return this.storage.get("TimeFormat");
    }

    ShowErrorMessage(Code: number) {
        this.showMessage(this.GetCodeMessage(Code), "");
    }

    ShowMessage(Code: number, lable: string) {
        this.showMessage(this.GetCodeMessage(Code), lable);
    }

    HasPermission(PageName: string) {
        if (!AppSettings.IsLogedIn) {
            return false;
        }
        if (AppSettings.permissions.Status) {
            return true
        }
        else {
            if (PageName == "geo_punching" && AppSettings.permissions.AllowGeoPunch == "-1") {
                return true;
            }
            if (PageName == "execuse_request" && AppSettings.permissions.AllowExcReq == "-1") {
                return true;
            }
            if (PageName == "leave_request" && AppSettings.permissions.AllowVacReq == "-1") {
                return true;
            }
            if (PageName == "manual_adjustment_request" && AppSettings.permissions.AllowPunchReq == "-1") {
                return true;
            }
            return false;
        }

    }

    GetCodeMessage(Code: number): string {
        switch (Code) {
            case 1:
                return "Unknown error";
            case 4:
                return "Fail connecting to database";
            case 5:
                return "iVisionMT web API not installed properly"
            case 6:
                return "Wrong connection to database"
            case 7:
                return "Unknown DB error connection"
            case 8:
                return "Invalid parameters"
            case 9:
                return "Invalid User ID / Password"
            case 10:
                return "Invalid operation"
            case 11:
                return "Invalid token"
            case 12:
                return "Database lost conenciton"
            case 13:
                return "Invalid date time parameters"
            case 14:
                return "Range days exceed 40 days"
            case 15:
                return "Invalid date range"
            case 201:
                return "Employee ID not exists or employee"
            case 202:
                return "Error during registering new device"
            case 401:
                return "Error while generating security token"
            case 402:
                return "Invalid User ID / Password / UUID"
            case 404:
                return "Invalid API key"
            case 405:
                return "User not valid"
            case 11005:
                return "Registration request status unknown"
            case 11006:
                return "Device registered for other employee"
            case 21001:
                return "Error getting employees list"
            case 21002:
                return "Invalid fields name"
            case 21003:
                return "Not authorized for this call"
            case 21004:
                return "No records return"
            case 3301:
                return "Error getting requested information details"
            case 11001:
                return "Registration request submitted successfully"
            case 11002:
                return "Registration request pending"
            case 11003:
                return "Registration request rejected"
            case 11004:
                return "Registration request accepted"
            case 21005:
                return "Error returning employees’ list"
            case 21006:
                return "Error returning timetable list"
            case 21007:
                return "Error returning timetable"
            case 21008:
                return "Error returning leave list"
            case 21009:
                return "Error returning leave"
            case 21010:
                return "Error returning punches"
            case 21011:
                return "Error returning attendance"
            case 21012:
                return "Error returning attendance punches"
            case 21013:
                return "Error returning readers list"
            case 21014:
                return "Error returning reasons list"
            case 3301:
                return "Error getting requested information details"
            case 41001:
                return "Geo Punching Not Authorized"
            case 41002:
                return "Invalid GeoLocation"
            case 41003:
                return "Invalid LAT\LNG values"
            case 41004:
                return "Punch already exists"
            case 41005:
                return "Invalid Punch Type "
            case 41006:
                return "Geo punch not allowed for user mod calls"
            case 41007:
                return "Invalid reader ID"
            case 51001:
                return "Request  not authorized "
            case 51002:
                return "Invalid reason "
            case 51003:
                return "The request already submited"
            case 51004:
                return "Workflow not configured properly "
            case 51005:
                return "Workflow not active "
            case 51006:
                return "Request suspended "
            case 51007:
                return "Workflow not defined "
            case 51008:
                return "Invalid pay status "
            case 51009:
                return "Invalid From\To time "
            case 51010:
                return "Invalid From\To date "
            case 51011:
                return "Error processing Geo punc"
            case 51012:
                return "Error processing punch request"
            case 51013:
                return "Error processing excuse request"
            case 51014:
                return "Error processing leave request "
            case 51015:
                return "Internal error submitting request "
            case 51016:
                return "Request date range is out of authorized period "
            case 51017:
                return "Request date range is out of authorized period "
            case 51018:
                return "Error adding punch"
            case 51019:
                return "Error getting employee’s web requests"
            case 61001:
                return "Wrong old password"
            case 61002:
                return "New password is empty"




            default:
                return "Error";
        }
    }


    GetTimeTableState(stateId: number) {
        switch (stateId) {
            case 0:
                return "No timetable";
            case 1:
                return "Working day";
            case 2:
                return "Off day"
            default:
                return "";
        }
    }

    GetRequestStatus(req: number) {
        switch (req) {
            case 0:
                return "Pending";
            case 1:
                return "Accepted";
            case 2:
                return "Rejected"
            default:
                return "NA";
        }
    }

    GetRequestType(req: number) {
        switch (req) {
            case 0:
                return "Punch";
            case 3:
                return "Excuse";
            case 4:
                return "Vacation"
            default:
                return "";
        }
    }




    GetPnchType(req: number) {
        switch (req) {
            case 0:
                return "OUT";
            case 1:
                return "IN";
            default:
                return "";
        }
    }


    checkURL(res: string) {
        if (res == null || res == undefined || res == "") {
            return false;
        }
        return true;
    }

    getLastDaysDate(Days: number) {
        let d = new Date();
        return this.datepipe.transform(this.SubDays(Days, d), 'yyyy-MM-dd');
    }

    getWeekStart(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        return this.datepipe.transform(new Date(d.setDate(diff)), 'yyyy-MM-dd');
    }

    AddDays(noOfDays: number, date: Date) {
        date.setTime(date.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
        return date;
    }


    AddDaysString(noOfDays: number, date: Date) {
        date.setTime(date.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
        return this.datepipe.transform(date, 'yyyy-MM-dd');;
    }

    SubDays(noOfDays: number, date: Date) {
        date.setTime(date.getTime() - (noOfDays * (1000 * 60 * 60 * 24)));
        return date;
    }

    GetTTStatus(Status: number): string {

        switch (Status) {
            case 0:
                return "No T.T";
            case 1:
                return "Working Day";
            case 2:
                return "Off Days"
            default:
                return "";
        }
    }
    getWeekEnd(d) {
        // d = new Date(d);
        return this.datepipe.transform(this.AddDays(6, d), 'yyyy-MM-dd');
    }



    getPunchType(punch: number): string {

        if (punch == 0) {
            return "OUT";
        }
        else if (punch == 1) {
            return "IN";
        }
    }

    GetCurrentDate() {
        let Dt = new Date();
        return this.datepipe.transform(Dt, 'yyyy-MM-dd');
    }
    GetOldDate() {
        let d = new Date();
        var day = d.getDay(),
            diff = d.getDate() - 39;
            console.log("df"+diff);
        return this.datepipe.transform(new Date(d.setDate(diff)), 'yyyy-MM-dd');
    }

    GetCurrentTime() {
        let Dt = new Date();
        return this.datepipe.transform(Dt, 'HH:MM');
    }


    getPayStatus(punch: number): string {

        if (punch == 0) {
            return "Paid";
        }
        else if (punch == 1) {
            return "Unpaid";
        }
    }

    ToDateString(date: Date): string {
        return this.datepipe.transform(date, 'yyyy-MM-dd');
    }

    ToISODateString(date: Date): string {
        return date.toISOString();
    }

    GetHours(mins: number): number {
        return mins / 60;
    }

    ToHoursString(Mins: number): string {

        // console.log("Mins"+Mins);
        let hours = (Mins / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        // console.log('ww_string');
        if (Mins > 0) {
            console.log(rhours.toString() + ":" + this.decPipe.transform(rminutes.toString(), "2.0-0"));
            return this.decPipe.transform(rhours.toString(), "2.0-0") + ":" + this.decPipe.transform(rminutes.toString(), "2.0-0");
        }
        return '-';
    }
    ToHoursStringTemp(Mins: number): string {

        // console.log('ww');
        let hours = (Mins / 60);
        let rhours = Math.floor(hours);
        console.log()
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);

        if (Mins > 0) {

            return hours.toString() + ":" + this.decPipe.transform(rminutes.toString(), "2.0-0");
        }
        return '-';
    }


    async presentToast(Message: string, Duration: number) {
        const toast = await this.toastCtrl.create({
            message: Message,
            duration: Duration,
            position: "top"
        });
        toast.present();
    }

    async  showMessage(MessageBody: string, MessageTitle: string) {
        const alert = await this.alertCtrl.create({
            header: MessageTitle,
            message: MessageBody,
            buttons: ['OK']
        });
        alert.present();
    }
}