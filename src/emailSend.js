import emailjs from 'emailjs-com'
// import apiKeys from './apikeys'


export const sendEmail = (form) => {
    console.log('sendEmail')


    emailjs.send('service_g8t19xy','template_hjfprfq', form, 'isQOBHLXPTbT9amLx')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(err) {
            console.log('FAILED...', err);
        });
}

console.log('hi')
