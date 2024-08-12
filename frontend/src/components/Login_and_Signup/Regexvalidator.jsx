const emailvalidator=(email)=>{
    var emailregex= /^[^\s@]+@[^\s@]+$/;
    return emailregex.test(email)
}

const passwordvalidator=(password)=>{

    return password.length>=8;
}

const usernamevalidator=(username)=>{
    return username.length>=1;
}

export {emailvalidator,passwordvalidator,usernamevalidator}