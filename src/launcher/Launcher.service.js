import { get, post,PREFIX,joinParameters,joinPostParameters } from '../axios/tools'


const login=(username, password)=>{
    return get({
        url: PREFIX+`secUserManager/login/${username}/${password}/`

    });
}

const home=()=>{
    return get({
        url: PREFIX+`secUserManager/home/`

    });
}

const logout=(username, password)=>{
    return get({
        url: PREFIX+`secUserManager/showlogin/`

    });
}

const gotoApp=(appId)=>{
    return get({
        url: PREFIX+`secUserManager/selectApp/${appId}/`

    });
}

const LauncherService={login,gotoApp,logout,home};
export default LauncherService;
