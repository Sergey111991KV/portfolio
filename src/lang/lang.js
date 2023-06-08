const allLang = ['en', 'ru', 'de', 'jp'];

function changeLanguage() {
    let language = window.language;

    console.log(language);
    if (!language) {
        window.language = 'en'
        language = 'en'
    }
    console.log(language);
    if (!allLang.includes(language)) {
        location.href = window.location.pathname + '#en';
        // location.reload();
    }
    // document.querySelector('title').innerHTML = langArr['unit'][hash];
    // // document.querySelector('.lng-chip').innerHTML = langArr['chip'][hash];
    // for (let key in langArr) {
    //     let elem = document.querySelector('.lng-' + key);
    //     if (elem) {
    //         elem.innerHTML = langArr[key][hash];
    //     }
    //
    // }
}

changeLanguage();
