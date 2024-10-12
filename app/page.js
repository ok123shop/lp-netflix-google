"use client"
import Image from "next/image";
import { useState,useEffect } from "react";
import baseService from "@/service/baseService";
export default function Home({searchParams}) {

  const vips = [
    {id:1,title: "入门款",price:"8.8",unit:"元",day:30,dayLabel:'月',icon:"lv1.png"},
    {id:2,title: "标准版",price:"20",unit:"元",day:30,dayLabel:'月',icon:"lv2.png"},
    {id:3,title: "全球版",price:"25",unit:"元",day:30,dayLabel:'月',icon:"lv3.png",hot:1},
  ]

  const plans = [
      {
          id: 1,title:"奈飞-入门款",icon:"lv1.png",
          content: "推荐新手体验",
          price: "8.8元",
          planClassName: 'plana',
          spuId:4,
          stockId:2,
          tip:"推荐台湾、新加坡、日本、美国、澳洲等观影",
          tags:[
            {type:'ok',label:"4K + HDR"},
            {type:'ok',label:"杜比音效"},
            {type:'ok',label:"全设备"},
            {type:'error',label:"独立车位"},
            {type:'error',label:"全区解锁"},
          ],
          skuList: [
            {id:64,title:"月度",day:30,price:8.88,unit:"元"},
            {id:65,title:"季度",day:91,price:24,unit:"元",originalPrice:26},
            {id:66,title:"半年",day:182,price:53,unit:"元",originalPrice:58},
            {id:67,title:"一年",day:365,price:100,unit:"元",originalPrice:106},
          ]
      },
      {
          id: 2,title:"奈飞-标准版",icon:"lv2.png",
          spuId:4,
          stockId:1,
          content: "部分地区有限制",
          planClassName: 'planb',
          price: "20元",
          tip:"推荐台湾、新加坡、日本、美国、澳洲等观影",
          tags:[
            {type:'ok',label:"4K + HDR"},
            {type:'ok',label:"杜比音效"},
            {type:'ok',label:"全设备"},
            {type:'ok',label:"独立车位"},
            {type:'error',label:"全区解锁"},

          ],
          skuList: [
            {id:56,title:"月度",day:30,price:20,unit:"元"},
            {id:57,title:"季度",day:91,price:55,unit:"元",originalPrice:60},
            {id:58,title:"半年",day:182,price:105,unit:"元",originalPrice:120},
            {id:59,title:"一年",day:365,price:200,unit:"元",originalPrice:240},
          ]
      },
      {
          id: 3,title:"奈飞-全球版",icon:"lv3.png",
          content: "全球可用，无限制",
          spuId:4,
          stockId:3,
          planClassName: 'planc',
          price: "25元",
          tip:"全区解锁，无任何限制",
          tags:[
            {type:'ok',label:"4K + HDR"},
            {type:'ok',label:"杜比音效"},
            {type:'ok',label:"全设备"},
            {type:'ok',label:"独立车位"},
            {type:'ok',label:"全区解锁"},

          ],
          skuList: [
            {id:60,title:"月度",day:30,price:25,unit:"元"},
            {id:61,title:"季度",day:91,price:70,unit:"元",originalPrice:75},
            {id:62,title:"半年",day:182,price:135,unit:"元",originalPrice:150},
            {id:63,title:"一年",day:365,price:255,unit:"元",originalPrice:300},
          ]
      }
  ]


  const [actPlan,setActPlan] = useState({})
  const [actSku,setActSku] = useState({})


  const selectedSkuHandler = (plan,sku) => {
    setActPlan(plan)
    setActSku(sku)
  }


  const submitHandler = () => {
    document.getElementById('my_modal_1').showModal()
  }

  const [account,setAccount] = useState("")
  const [errorMsg,setErrorMsg] = useState("")
  const [loading,setLoading] = useState(false)


  const payHandler = async (payChannel) => {

    setErrorMsg("")
    const phoneRegex = /^1[3-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testResult = phoneRegex.test(account) || emailRegex.test(account);
    if(!testResult){
        setErrorMsg("无效的手机或邮箱")
        return
    }
    
    setLoading(true);
    let result = await baseService.register({username: account, source:(searchParams.source || "GOOGLE")});
    if(!result.success){
        setErrorMsg(result.msg);
        setLoading(false);
        return
    }
    window.localStorage.setItem("USERNAME",account);
    window.localStorage.setItem("TOKEN",result.data);
    pay(payChannel);
}

async function pay(payChannel){

  let params = {
    skuId: actSku.id,
    paymentChannel: payChannel
  }
  let result = await baseService.pay(params);
  if(result.success){
      payJump(payChannel,result.data);
  }else{
      setLoading(false)
      setErrorMsg(result.msg);
  }
}

function payJump(channel,data){
    if("ALIPAY" === channel){
        const div = document.createElement('divform');
        div.innerHTML = data; // data就是接口返回的form 表单字符串
        document.body.appendChild(div);
        let len = document.forms.length - 1;
        document.forms[len].submit();
    }
}

useEffect(() => {
  setAccount(window.localStorage.getItem("USERNAME"))
},[])

  return (
    <div className="pt-10 lg:pt-20 flex flex-col items-center w-full">
      <img className="w-40 md:w-48 lg:w-60" src="logo-simp.png"/>
      <p className="text-md md:text-2xl ">为您打造稳定、高性价比、省心的流媒体账号合租</p>
      <ul className="menu menu-horizontal bg-base-200 rounded-box flex-nowrap items-center my-6 ">
        {
          vips.map(item => (
            <li key={item.title} className="relative">
            <a className=" flex items-center" href={`#${item.id}`}>
              <img src={item.icon} className="h-4"/>
              <span className="text-sm">
                {item.title}<span className="text-white px-1 hidden md:inline-block">{item.price}</span>
                <span className="hidden md:inline-block">{item.unit}/{item.dayLabel}</span>
              </span>
              {
                item.hot ? 
                (<img src="hot.png" className="h-4 absolute right-0 -top-1"/>)
                :
                null
              }
            </a>
          </li>
          ))
        }
      </ul>
      <div className="curved-line my-2 mb-0" />
      <div className="container mx-auto px-4 text-center ">
        
        <div className="text-left mt-10 w-full max-w-3xl mx-auto">
          {
            plans.map(plan => (
              <div key={plan.id} id={plan.id} className=" mb-10">
                <div className="p-4 bg-black bg-opacity-60 rounded-t-2xl">
                  <div className="flex items-center gap-2  ">
                    <img src={plan.icon} className="w-6 "/>
                    <span className="text-xl md:text-xl  text-white font-bold ">{plan.title}</span>
                    <h3 className="text-sm md:text-md mb-2 flex-1 text-right">{plan.content}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap ">
                  
                    {
                      plan.tags.map((tag) => (
                        <div key={tag.label} className={`badge ${tag.type === 'ok' ? 'badge-warning ' : ''} badge-lg`}>
                          <img src={tag.type === 'ok' ? 'gougou.png' : 'chacha.png'} className="w-4 h-4"/>
                          <span className="pl-2">{tag.label}</span>
                        </div>
                      ))
                    }
                  </div>
                  <p className="mt-2 text-gray-400 text-sm md:text-md">{plan.tip}</p>
                </div>
                <div className="p-4 bg-zinc-900 bg-opacity-80 rounded-b-2xl">
                  <div className="flex gap-2 items-center flex-col md:flex-row ">
                    {
                      plan.skuList.map(item => (
                        <div 
                          key={item.id} 
                          className={`
                            cursor-pointer cute-9 relative w-full flex  flex-col justify-center items-center rounded-lg bg-gray-700 bg-opacity-60 py-2 md:py-4
                            ${actSku.id === item.id ? '!bg-error bg-opacity-90 text-gray-100' : null}
                          `}
                          onClick={(e) => selectedSkuHandler(plan,item)}
                        >
                          <h1 className="">
                            <span className="text-lg md:text-2xl text-white pr-1">{item.price}</span>
                            <span className="text-sm ">{item.unit}</span>
                          </h1>
                          <p className="text-sm">
                            <span>{item.title}</span>
                            <span className="px-2">/</span>
                            <span>{item.day}天</span>
                          </p>
                          <div className="absolute right-1 top-0">
                            {
                              item.originalPrice && item.originalPrice > item.price ?
                              (
                                <div className="badge badge-error text-white badge-md">省{item.originalPrice - item.price}元</div>
                              )
                              :
                              null
                              
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  {
                    actPlan && actPlan.id === plan.id ? 
                    (
                      <div className="mt-4">
                        <button className="btn btn-block  btn-error text-white" onClick={e => submitHandler()}>
                          <img src="gload.png" className="w-6"/>
                          立即支付
                          </button>
                      </div>
                    )
                    :
                    null
                  }
                </div>
                
              </div>
            ))
          }

        </div>
      </div>

      <div className="mt-20 flex flex-col gap-2 justify-center items-center px-4">
        <div className="divider divider-error">温馨提示</div>
        <h1 className="text-lg md:text-2xl ">您购买过程中遇到任何问题，都可以与我们取得联系</h1>
        <a className="btn w-40 btn-warning " href="/concat">
          联系人工客服
        </a>
      </div>



      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">最后一步，即将获得奈飞4K账号</h3>
          <p className="py-4 text-sm">付款后账号信息将会通过短信、邮件的形式发放给您</p>
          <input type="text" placeholder="手机 / 邮箱" className={`input input-bordered w-full ${loading ? 'disabled' : null}`} 
            readOnly={loading}
            value={account}
            onInput={e => setAccount(e.target.value)}
          />
          {
            errorMsg ? 
            (
              <p className="text-error text-sm my-2">出错拉：{errorMsg}</p>
            )
            :
            null
          }
          {
            loading ? 
            (
              <div className="flex justify-center items-center flex-col">
                <span className="loading loading-lg loading-infinity text-error"></span>
                <span className="text-sm">努力加载中</span>
              </div>
            )
            :
            (
              <>
                <div className="hidden md:flex modal-action items-center">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-link" onClick={e => document.getElementById('my_modal_1').close()}>再选选</button>
                  <a className="btn w-32 btn-warning text-white" href="/concat">
                  人工咨询
                  </a>
                  <button className="btn flex-1 btn-info text-white" onClick={e => payHandler("ALIPAY")}>
                    <img src="alipay.png" className="w-6"/>
                    支付宝支付
                  </button>
                </div>
                <div className="modal-action flex md:hidden flex-col items-center justify-center gap-2">
                  {/* if there is a button in form, it will close the modal */}
                  <div className="flex items-center justify-center w-full gap-2">
                    <a className="btn flex-1 btn-warning text-white" href="/concat">
                      人工咨询
                    </a>
                    <button className="btn flex-1 btn-info text-white " onClick={e => payHandler("ALIPAY")}>
                      <img src="alipay.png" className="w-6"/>
                      支付宝支付
                    </button>
                 
                  </div>
                  <button className="btn btn-link" onClick={e => document.getElementById('my_modal_1').close()}>再选选</button>
                  
                </div>
              </>

              
              
            )
          }
          
        </div>
      </dialog>
    </div>
  );
}
