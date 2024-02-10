const apiRequest = async (url ="", OptionsObj=null, errMsg=null)=>{
    try{
            const response=await fetch(url,OptionsObj)
            if(!response.ok) throw Error("please reload app")
    }
    catch(err){
            errMsg=err.message
    }finally{
            return errMsg
    }
}