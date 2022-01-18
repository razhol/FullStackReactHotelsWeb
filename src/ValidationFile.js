
const emailReg = /\S+@\S+\.\S+/;
const letersReg = /^[a-zA-Z]+$/
const numbersReg = /^\d+$/;



const isBetweenTwoAneNine = (string) =>
{
    return string.length <= 15 && string.length >= 2
}

const isContainsOnlyLetters = (string) =>
{
    return letersReg.test(string)
}

const isValidateEmail = (email) =>
{
    return emailReg.test(email)
}

const isContainsOnlyNumbers = (string) =>
{
  
    return numbersReg.test(string)
}

const changeDateFormat =  (oldDate) => {
    var date = new Date(oldDate);
      return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
}


export default  {isContainsOnlyLetters,isValidateEmail,isContainsOnlyNumbers,isBetweenTwoAneNine, changeDateFormat}