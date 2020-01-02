import { AccessRightsModel } from '../../models/AccessRightsModel'; 
export class AppSettings {
    // https://unifonicmobile.ivisionmt.com/
    public static API_ENDPOINT='http://mobile.demo.ivisionmt.com';
    public static MAPS_API='';
    public static USERNAME='';
    public static DEPARTMENT='';
    public static DEPARTMENT_ID='';
    public static EMPID='';
    public static ORG_NAME='';
    public static DOJ='';
    public static floatDOJ='';
    public static STATE='';
    public static ServerDateFormat='';
    public static ServerTimeFormat='';
    public static IsLogedIn=false;
    public static AllowGeoPunch='';
    
    public static permissions:AccessRightsModel={AllowExcReq:"",AllowGeoPunch:"",AllowPunchReq:"",AllowVacReq:"",MARID:"",MARName:"",Status:""};
    
    
    
    
 }