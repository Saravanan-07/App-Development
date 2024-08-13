const emailvalidator=(email)=>{
    return email.length>=1;
}

const passwordvalidator=(password)=>{

    return password.length>=8;
}

const usernamevalidator=(username)=>{
    return username.length>=1;
}

export {emailvalidator,passwordvalidator,usernamevalidator}