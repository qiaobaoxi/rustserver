'use strict';
const ejsexcel = require("ejsexcel");
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const Controller = require('../core/base_controller');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async login() {
    //manager账户和密码验证
    const {userName,password}=this.ctx.request.body;
    if(this.config.user===userName&&this.config.password===password){
      this.success()
    }else{
      this.fail({msg:"账户或密码错误"});
    }
  }
  async saveUser(){
    //用户账户和密码
    const {user,password}=this.ctx.request.body;
    const isUser = await this.ctx.service.user.find({user});
    if(!isUser){
      try {
        await this.ctx.service.user.saveUser(user,password);
        this.success()
      }
      catch(error) {
        this.fail({msg:error.message})
      }
    }else{
      this.fail({msg:"用户已存在"})
    }
  }
  async getUser(){
    const {sign,id}=this.ctx.request.query;
    try {
      //sign表示是不是登录完之后查询的
      if(sign==1){
        const result = await this.ctx.service.user.find({id});
        this.success(result);  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async getAllUser(){
    //sign表示是不是登录完之后查询的
    const {sign,nowPage}=this.ctx.request.query;
    try {
      if(sign==1){
        const result = await this.ctx.service.user.getAll(nowPage);
        for(let i=0;i<result.result.length;i++){
          // result.result[i].equipments=
          let equipments = await this.ctx.service.relevance.getRelevanceByParams({userId:result.result[i].id});
          if(equipments){
            equipments=await Promise.all(equipments.map(async(item)=>{
              let equipment = await this.ctx.service.equipment.find({id:item.equipmentId});
              item.name= equipment.name
              return item;
            }))
          }
          result.result[i].equipment=equipments;
        }
        this.success(result);  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async deleteUser(){
    const {sign}=this.ctx.request.query;
    const {id}=this.ctx.request.body;
    try {
      if(sign==1){
        await this.ctx.service.user.delete(id);
        this.success();  
      }
    } catch (error) {
      this.fail({msg:error.message})
    }
  }
  async updateUser(){
    const {id,user,password}=this.ctx.request.body;
    try {
      await this.ctx.service.user.update(id,user,password);
      this.success();  
    } catch (error) {
      this.fail({msg:error.message})
    } 
  }
  async downToExcel(){
      const {base64,equipmentName}=this.ctx.request.body;
    try {
      const result = await this.ctx.curl('http://139.155.25.81/'+equipmentName, {
        dataType: 'text',
        contentType:'application/json'
      });
      let equipmentData=JSON.parse(result.data)
      equipmentData=equipmentData.map((item)=>{
          item=JSON.parse(item)
          return item;
      })
      let mergeData=[]
      for(let item of equipmentData){
          mergeData.push(...item);
      }
      let year=('0x'+mergeData[0]>>1).toString().padStart(2, '0');
      let month=('0x'+mergeData[1]>>4).toString().padStart(2,'0');
      let date1=((('0x'+mergeData[1]&0xf)<<1)+('0x'+mergeData[0]&1)).toString().padStart(2,'0');
      let hour=('0x'+mergeData[3]>>3).toString().padStart(2,'0');
      let min=parseInt('0x'+mergeData[2],16).toString().padStart(2,'0');
      let dataTime='20'+year+month+date1+" "+hour+":"+min
      let x=('0x'+mergeData[7])&0x7f;
      let p=('0x'+mergeData[10])*256+('0x'+mergeData[9])*1;
      let csfinish=('0x'+mergeData[11])&0xff;
      for(let i=0;i<mergeData.length;i++){
          mergeData[i]=parseInt(mergeData[i],16)
      }
      let list=[];
      let length=mergeData[6]*mergeData[7];
      for(let i=0;i<length;i++){
        let value=(mergeData[i+16]+mergeData[i+17])*256
        list.push({value,value1:await this.getRou(value,p,csfinish,x)});
      }
      // console.log(mergeData);
      // for(let item of arrVal){
      //   list.push({value:item,value1:item})
      // }
      let date=new Date();
      let name=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+'-'+date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds();
      //图片的存储
      var base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = new Buffer(base64Data, 'base64');
      let pngName='./app/public/png/'+name+".png"
      fs.writeFile(pngName, dataBuffer, (error)=>{
        if(error){
          this.fail({msg:error.message})
        }else{
          // res.send("保存成功！");
          console.log("保存成功")
        }
      });
      const exlBuf = await readFileAsync("app/public/model.xlsx");
      //数据源
      const data = {"position":"开发部","name":'南京大桥',"date":dataTime,"list":list,"temperature":55,'humidity':55,"img":pngName};
      //用数据源(对象)data渲染Excel模板
      const exlBuf2 = await ejsexcel.renderExcel(exlBuf, data);
      await writeFileAsync('./app/public/excel/'+name+".xlsx", exlBuf2);
      this.success({http:'http://127.0.0.1:7001/public/excel/'+name+".xlsx"});  
    } catch (error) {
      this.fail({msg:error.message})
    } 
  }
  async getRou(r,p,csfinish,x)
    {
      console.log(r,p,csfinish,x)
      let lt;
      lt=p;
      lt*=r;
      lt*=csfinish;
      lt+=150;
      lt/=365;
      lt+=40;
      lt/=100;
      lt/=x;
      lt=10000-lt;
      lt*=lt;
      lt+=4000;
      lt/=10000;
      lt=10000-lt;
      return lt;
  } 
}

module.exports = HomeController;
