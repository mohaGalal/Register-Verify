export const EMAIL_VALIDATION = {
    required :'email is required',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message:'Email is not vaild'
    }
  };

  const passwordRexEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  export const passwordValidtion = {
    required :'password is required',
    pattern: {
      value: passwordRexEx,
      message:'Password is not vaild'
    }
  };