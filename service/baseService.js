// const host = "http://localhost:8782/users"
const host = "https://api2.okblink.xyz/users"
const 
    createQuery = (params) => {
        if(!params){
            return "";
        }
        return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
    }
;
const
    baseConfig = (params) => {
        return {
            cache: "no-store",
            credentials: 'include'// 携带 cookie
        }
    },
    getConfig  = (params) => {
        let config = baseConfig(params);
        return {
            ...config,
            headers: {
                "token": window.localStorage.getItem("TOKEN")
            },
        };
    },
    postConfig = (params) => {
        let config = baseConfig(params);

        return {
            ...config,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "token": window.localStorage.getItem("TOKEN")
            },
            body: JSON.stringify(params)
        }
    }
;


const service = {
    async getCurrent(){
        let api = "/user/user/getCurrent"
        let url = host + api;
        console.log(getConfig({}));
        
        return await fetch(url, getConfig({})).then((res) => res.json());
    },
    async spuAttrList(params){
        let api = "/open/goods/goods-spu-attr/list"
        let url = host + api + "?" + createQuery(params);
        return await fetch(url, getConfig(params)).then((res) => res.json());
    },
    async skuList(params){
        let api = "/open/goods/goods/sku/list"
        let url = host + api + "?" + createQuery(params);
        return await fetch(url, getConfig(params)).then((res) => res.json());
    },
    async register(params){
        let api = "/login/register"
        let url = host + api;
        return await fetch(url, postConfig(params)).then((res) => res.json());
    },
    async pay(params){
        let api = "/pay/pay"
        let url = host + api;
        return await fetch(url, postConfig(params)).then((res) => res.json());
    }
}

export default {...service}