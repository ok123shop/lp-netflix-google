import Image from "next/image";

export default function Home() {

  const vips = [
    {id:1,title: "入门款",price:"8.8",unit:"元",day:30,dayLabel:'月',icon:"lv1.png"},
    {id:2,title: "标准版",price:"20",unit:"元",day:30,dayLabel:'月',icon:"lv2.png"},
    {id:3,title: "全球版",price:"25",unit:"元",day:30,dayLabel:'月',icon:"lv3.png",hot:1},
  ]

  const plans = [
      {
          id: 1,title:"入门款",icon:"lv1.png",
          content: "适合新手体验",
          price: "8.8元",
          planClassName: 'plana',
          spuId:4,
          stockId:2,
          tip:"推荐台湾、新加坡、日本、美国、澳洲观影",
          tags:[
            {type:'ok',label:"4K + HDR"},
            {type:'ok',label:"杜比音效"},
            {type:'ok',label:"全设备"},
            {type:'error',label:"独立车位"},
            {type:'error',label:"全区解锁"},
          ],
          skuList: [
            {}
          ]
      },
      {
          id: 2,title:"标准版",icon:"lv2.png",
          spuId:4,
          stockId:1,
          content: "部分地区有限制",
          planClassName: 'planb',
          price: "20元",
          tip:"推荐台湾、新加坡、日本、美国、澳洲观影",
          tags:[
            {type:'ok',label:"4K + HDR"},
            {type:'ok',label:"杜比音效"},
            {type:'ok',label:"全设备"},
            {type:'ok',label:"独立车位"},
            {type:'error',label:"全区解锁"},

          ],
      },
      {
          id: 3,title:"全球版",icon:"lv3.png",
          content: "全球可用，无限制",
          spuId:4,
          stockId:3,
          planClassName: 'planc',
          price: "25元",
          tags:[
            {type:'ok',label:"4K + HDR"},
            {type:'ok',label:"杜比音效"},
            {type:'ok',label:"全设备"},
            {type:'ok',label:"独立车位"},
            {type:'ok',label:"全区解锁"},

          ],
      }
  ]

  return (
    <div className="pt-10 lg:pt-20 flex flex-col items-center w-full h-full overflow-hidden overflow-y-auto">
      <img className="w-20 h-20 md:w-24 md:h-24 lg:w-40 lg:h-40" src="base.png"/>
      <img className="w-40 md:w-48 lg:w-60" src="Netflex-ZH-2.png"/>
      <p className="text-md md:text-2xl ">为您打造高性价比、稳定、省心的流媒体账号合租</p>
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
      <div class="container mx-auto px-4 text-center ">
        
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
                <div className="p-4 bg-zinc-900 bg-opacity-80">
                  123
                </div>

                

              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
}
