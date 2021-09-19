import axios from 'axios';

const urlOTP = "https://tiemchungcovid19.gov.vn/api/vaccination/public/otp-search?fullname=";
    //url = url +name + "&birthday=" + date.toString() + '&genderId=1&personalPhoneNumber=0919323236&identification=&healthInsuranceNumber';

const urlGetData = 'https://tiemchungcovid19.gov.vn/api/vaccination/public/patient-vaccinated?fullname='
export const SendOTP  = (fullname, birthday,phone) => axios.get(
    `${urlOTP}${fullname}&birthday=${birthday}000&genderId=1&personalPhoneNumber=${phone}&identification=&healthInsuranceNumber`);

export const GetDataOTP  = (fullname, birthday,phone,otp) => axios.get(
    `${urlGetData}${fullname}&birthday=${birthday}000&genderId=1&personalPhoneNumber=${phone}&identification=&healthInsuranceNumber=&otp=${otp}`);

