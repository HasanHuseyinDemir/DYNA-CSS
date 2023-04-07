const css=(list)=>{
    let arr=[];
    let object={...list};
    let targets=new Set();
    if(typeof list!=="object"){
        console.warn("Style must be a object")
        return {}
    }else{
        const init=(target)=>{
            if(!targets.has(target)){targets.add(target)}
            targets.forEach((t)=>{
                t.querySelectorAll("[css]").forEach((element)=>{
                    let csAttr=[...element.getAttribute("css").split(" ")]
                    let unscoped="";
                    csAttr.forEach((key,index)=>{
                        if(object[key]){
                            arr.push({element,key});
                            element.removeAttribute("css");
                        }else{
                            unscoped+=key+(csAttr.length-1!=index?" ":"")
                        }
                    })
                    if(unscoped.length){
                        unscoped.trimStart();
                        unscoped.trimEnd();
                        element.setAttribute("css",unscoped)
                    }
                })
            })
            update()
        }
        const inity=()=>{
            if(arr.length){
                arr.forEach((e)=>{Object.keys(object[e.key]).forEach((key)=>e.element.style[key]=object[e.key][key])})
            }
        }
        const update=(key,spec,style)=>{
            if(typeof object[key]&&key){
                let selected=arr.filter((e)=>e.key==key)
                selected.forEach((e)=>{e.element.style[spec]=style});
            }else{
                inity()
            }
        }
        const srch=()=>{targets.forEach((t)=>{init(t)})}
        Object.keys(object).forEach((t)=>{
            object[t]=new Proxy(object[t],{
                get(target,key){
                    return target[key]
                },
                set(target,key,value){
                    if(target[key]!==value){
                        update(t,key,value);
                        target[key]=value;
                        pop();
                    }
                    srch();
                    return 1
                }
            })
        })

        object=new Proxy(object,{
            get(target,key){
                return target[key]
            },
            set(target,key,value){
                if(!target[key]){
                    target[key]=value
                    target[key]=new Proxy(target[key],{
                        get(ttarget,kkey){
                            return ttarget[kkey]
                        },
                        set(ttarget,kkey,vvalue){
                            if(ttarget[kkey]!==vvalue){
                                update(key,kkey,vvalue);
                                ttarget[kkey]=vvalue;
                                pop();
                            }
                            srch();
                            return 1
                        }
                    })
                    srch();
                }else{
                    console.warn("DYNACSS Warn : "+key+" key is already declared !")
                }
                return 1
            }
        })

        const pop=(target)=>{
            target?targets.delete(target):""
            arr=arr.filter((e)=>e.element.isConnected)//gc
            targets.forEach((e)=>!e.isConnected?targets.delete(e):"")
            srch();
        }

        let settings={
            init,array:arr,targets,pop
        }
        return [object,settings]
        }
    }

    Object.prototype.css=function(style){
        let [c,s]=css(style);
        let x=this
        s.init(x)
        return c
    }
