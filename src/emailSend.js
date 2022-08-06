import emailjs from 'emailjs-com'

export const sendEmail = (form) => {
    emailjs.send('service_g8t19xy','template_hjfprfq', form, 'isQOBHLXPTbT9amLx')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('SUCCESS SEND FORM')
        }, function(err) {
            console.log('FAILED...', err);
            alert('FAILED SEND FORM')
        });
}
