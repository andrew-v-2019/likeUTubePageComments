function scrollBottom() { window.scroll(0, window.scrollY + 1000);}
function expandComments() {
    let moreBtns = document.getElementsByClassName('more-button');
    let moreBtnsArray = Array.from(moreBtns).filter(b => {
        let res = b.innerHTML.indexOf('Показать') > -1 && b.innerHTML.indexOf('ответ') > -1;
        return res;
    });
    moreBtnsArray.forEach(b => b.click());
    setTimeout(() => { }, 1000);
    let moreBtns2 = document.getElementsByClassName('ytd-button-renderer');
    moreBtnsArray = Array.from(moreBtns2).filter(b => {
        let res = (b.innerHTML.indexOf('Другие') > -1 && b.innerHTML.indexOf('ответы') > -1);
        return res;
    });
   setTimeout(() => { }, 1000);
   moreBtnsArray.forEach(b => b.click());
}
function getLikeBtns() {
    let buttons = document.getElementsByClassName('yt-icon-button');
    let btnsArray = Array.from(buttons).filter(b => {
        return b.getAttribute('aria-label') && b.getAttribute('aria-label').indexOf('Поставить отметку "Нравится"') > -1
    });
    return btnsArray;
}
function likePageComments() {
    let counter = 0;
    let btnsArray = getLikeBtns();
    for (let index = 0; index < btnsArray.length; index++) {
        btnsArray[index].click();
        counter++;
    }
    return counter;
}
function likeVideo() {
    let buttons = document.getElementsByClassName('yt-icon-button');
    let btn = Array.from(buttons).find(b => {
        return b.getAttribute('aria-label') && b.getAttribute('aria-label').indexOf('Видео понравилось') > -1 && b.getAttribute('aria-pressed') == 'false'
    });
    if (btn) btn.click(); 
}
function scrollToComments() {
    let commentsBlock = document.querySelector('ytd-item-section-renderer#sections.style-scope.ytd-comments');
    if (commentsBlock) {  commentsBlock.scrollIntoView()  }
}
function process() {
    likeVideo();
    scrollToComments();
    setTimeout(() => { }, 1000);
    let commonCount = 0;
    console.clear();
    let timerId = setInterval(() => {
        expandComments();
        let count = likePageComments();
        commonCount = commonCount + count;
        console.log(`Обработано ${commonCount} комментариев`);
        scrollBottom();

    }, 500);
}
process();
