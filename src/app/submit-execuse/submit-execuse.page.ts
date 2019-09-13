import { Component, OnInit, NgZone } from '@angular/core';
import { ExecuseService } from '../../Services/ExecuseService';
import { ExecuseModel } from '../../models/ExecuseModel';
import { ReasonsModel } from '../../models/ReasonsModel';
import { Heplers } from '../../providers/Helper/Helpers';
import { NavController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-execuse',
  templateUrl: './submit-execuse.page.html',
  styleUrls: ['./submit-execuse.page.scss'],
})
export class SubmitExecusePage implements OnInit {

  execuseForm: FormGroup;
  excModel: ExecuseModel = { to_time: new Date().toISOString(), desc: "", from_time: new Date().toISOString(), reason_id: 0, excuse_date: new Date().toISOString().split('T')[0], pay_status: 0 }
  resons: ReasonsModel[];
  response: any;
  submited:boolean=false;
  constructor(private formBuilder: FormBuilder,private zone: NgZone, public helper: Heplers, public excService: ExecuseService, public navCtrl: NavController) {
    
    this.zone.run(() => this.LoadResons());

    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.excModel.from_time=localISOTime;
    this.excModel.to_time=localISOTime;



    this.execuseForm = this.formBuilder.group({
      description: ['', Validators.required],
      execuseDate:['', Validators.required],
      fromTime:['', Validators.required],
      toTime:['', Validators.required],
      payStatus:['', Validators.required],
      rasons:['', Validators.required]
    });

  }
  submitExecuse() {

    // console.log(JSON.stringify(this.excModel));
    // if(this.excModel.from_time>=this.excModel.to_time)
    // {
    //   this.helper.showMessage("From time must be less than to time","Error");
    // }
    // else if (this.execuseForm.valid) {
      this.submited=true;
      if(this.execuseForm.valid)
      {
        let ft = this.excModel.from_time.slice(11,19);
        let tt = this.excModel.to_time.slice(11,19);

        console.log(tt);
        console.log(ft);
        this.excService.RequestExecuse(this.excModel,tt,ft ).subscribe((res: any) => {

          this.response = res;
          console.log(res);
          //debugger;
          if (this.response.code == 0) {
            this.helper.showMessage("The request has been submited successfully", "Done");
          }
          else {
            this.helper.showMessage(res.result,"Error");
          }
  
        });
      }
     
    //}
  }

  LoadResons() {
    this.excService.GetReasonList().then((res) => {
      res.subscribe((resons) => {
        this.resons = (resons as any).result as ReasonsModel[];
        //debugger;
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitExecusePage');
  }
  ngOnInit() {
  }

}
