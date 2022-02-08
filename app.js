// footer에 표시 할 연도 표시
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// navigation 토글 버튼
const navToggle = document.querySelector('.nav__toggle-button');
// nav에 있는 링크들의 container
const linksContainer = document.querySelector('.nav__links-container');
const links = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
    // linksContainer의 높이 구하기
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    // containerHeight(list container의 높이가 0인 경우,)
    if (containerHeight === 0) {
        // linksContainer의 높이를 links의 리스트의 높이로 셋팅해준다.
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        // containerHeight의 높이가 0이 아닌 경우, 
        // linksContainer의 높이를 0으로 초기화시켜준다.
        linksContainer.style.height = 0;
    }
});

// scroll to top 버튼
const navbar = document.querySelector('.nav');
// scroll to top link
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', () => {
    // scroll시에 현재 y축 위치 구하기
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    // scrolling한 높이가 nav높이의 값보다 크다면,
    if (scrollHeight > navHeight) {
        // nav를 고정 nav로 만든다.
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }
    // scrolling한 y축의 높이의 값이 500보다 크다면,
    if (scrollHeight > 500) {
        // topLink를 페이지에 출력할 수 있도록 class 이름을 넣어준다.
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove('show-link');
    }
});

// 토글 메뉴에서 해당 section으로 이동시, 정확하게 해당 section으로 이동시키기 위해 별도의 이벤트 처리를 한다.
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        // 기존에 href로 넣어준 hash link로 이동하는 기본 이벤트가 실행되는 것을 
        // 방지한다. (메뉴에서 각 section으로 이동하는 기존의 click이벤트를 방지)
        e.preventDefault();
        // navigate to specific section
        const id = e.currentTarget.getAttribute('href').slice(1);
        console.log(id);
        const element = document.getElementById(id);
        // calculate the heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        // 만약에 navbar의 class이름 속성에 fixed-nav가 있다면, 모바일 크기의 화면에서의 navbar이기 때문에
        const fixedNav = navbar.classList.contains('fixed-nav');
        let position = element.offsetTop - navHeight;
        if (!fixedNav) {
            position = position - navHeight;
        }
        // nav menu가 open (toggle button)
        if (navHeight > 82) {
            position = position + containerHeight;
        }
        console.log(position);
        window.scrollTo({
            left: 0,
            top: position,
        });
        linksContainer.style.height = 0;

    });
});

// skill accordion 이벤트
const skillListItems = document.querySelectorAll('.skill-list-item');

skillListItems.forEach(listItem => {
    const descriptionBtn = listItem.querySelector('.item-description-btn');
    listItem.addEventListener('click', () => {
        listItem.classList.toggle('show-text');
    });
});

// Project section
const btns = document.querySelectorAll('.tab-btn');
const projectSection = document.querySelector('.project');
const articles = document.querySelectorAll('.content');

// 모든 project list item에 대해 active
articles.forEach(article => {
    article.classList.add('active');
});

projectSection.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (id) {
        btns.forEach(btn => {
            btn.classList.remove('active');
        });
        // event bubbling으로 선택된 target에 data-id가
        // 설정되어있는 경우, 해당 target에 active class 추가
        e.target.classList.add('active');
        // 모든 article에 대해서도 active class 제거
        console.log(articles);
        articles.forEach(article => {
            article.classList.remove('active');
        });
        articles.forEach(article => {
            const type = article.dataset.type;
            console.log('type : ', type);
            if (id === 'all') {
                articles.forEach(article => {
                    article.classList.add('active');
                });
            } else if (id === type) {
                article.classList.add('active');
            }
        });
    }
});