// company.js
document.addEventListener('DOMContentLoaded', function() {
    // 모든 .info-item 요소를 선택
    const infoItems = document.querySelectorAll('.info-item');

    // 화면에 보일 때 visible 클래스를 추가하는 함수
    const handleScroll = () => {
        infoItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < window.innerHeight && itemRect.bottom > 0) {
                item.classList.add('visible');
            }
        });
    };

    // 스크롤 시 handleScroll 함수 실행
    window.addEventListener('scroll', handleScroll);

    // 페이지 로드 시 한번 실행하여 초기 상태를 확인
    handleScroll();
});

document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,  // 뷰포트 기준
        rootMargin: "0px",
        threshold: 0.1,  // 요소의 10%가 보이면 실행
    };

    const fadeInElements = document.querySelectorAll(".cp-item, .compliance-box, .compliance-image");

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target); // 한 번 나타나면 다시 감지 안 함
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => fadeInObserver.observe(el));
});

