document.addEventListener("DOMContentLoaded", function () {
    // 스크롤 관련 처리
    const header = document.querySelector(".top-header");
    const logo = document.querySelector(".logo-img");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            header.classList.add("scrolled");
            logo.src = "images/logo.png";
        } else {
            header.classList.remove("scrolled");
            logo.src = "images/logo_w.png";
        }
    });

    // 텍스트 애니메이션 처리
    const firstText = document.querySelector(".video-text");
    const secondText = document.querySelector(".highlight-text");

    setTimeout(() => firstText.classList.add("show"), 500);
    setTimeout(() => secondText.classList.add("show"), 1000);

    // 폼 제출 처리
    document.querySelector(".user-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const nameInput = document.querySelector("#name").value.trim();
        const comboInput = document.querySelector("#option").value.trim();
        const numberInput = document.querySelector("#number").value.trim();
        const checkbox = document.querySelector("#checkbox");

        if (!checkbox.checked) {
            alert("열람 및 등사에 동의하여 주세요.");
            return;
        }

        if (!nameInput || !numberInput) { 
            alert("이름과 계좌번호를 입력해주세요.");
            return;
        }

        try {
            console.log("📢 데이터 불러오는 중...");

            const response = await fetch('data.json');
            const data = await response.json();

            console.log("📢 불러온 데이터:", data);

            const user = data.users.find(u => 
                u.name === nameInput && u.combo === comboInput && u.account === numberInput
            );

            console.log("📢 입력된 값:", { nameInput, comboInput, numberInput });
            console.log("📢 검색된 사용자:", user);

            if (user) {
                const encodedUser = encodeBase64(JSON.stringify(user));
                console.log("📢 인코딩된 데이터:", encodedUser);
                window.location.href = `account.html?user=${encodedUser}`;
            } else {
                alert("입력한 정보가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error("🚨 데이터 로딩 오류:", error);
        }
    });

    // Base64 인코딩 함수
    function encodeBase64(str) {
        return btoa(unescape(encodeURIComponent(str))); // UTF-8 안전 인코딩
    }

    // URL 파라미터에서 사용자 정보 복호화
    const urlParams = new URLSearchParams(window.location.search);
    const encodedUserData = urlParams.get('user');

    if (encodedUserData) {
        try {
            const user = JSON.parse(decodeBase64(encodedUserData));

            document.getElementById('name').innerText = user.name;
            document.getElementById('combo').innerText = user.combo;

            const maskedAccount = "****" + user.account.slice(-4);
            document.getElementById('account').innerText = maskedAccount;

            const toggleAccountBtn = document.getElementById('toggleAccountBtn');
            toggleAccountBtn.addEventListener('click', function () {
                const accountElement = document.getElementById('account');
                if (accountElement.innerText === maskedAccount) {
                    accountElement.innerText = user.account;
                    toggleAccountBtn.innerText = "계좌번호 숨기기";
                } else {
                    accountElement.innerText = maskedAccount;
                    toggleAccountBtn.innerText = "계좌번호 보기";
                }
            });

            document.getElementById('sharesOwned').innerText = user.sharesOwned;
            const valuation = user.stockPrice * user.sharesOwned;
            document.getElementById('valuation').innerText = valuation.toLocaleString();
        } catch (error) {
            console.error("🚨 사용자 정보 복호화 오류:", error);
            if (window.location.pathname.includes("account.html")) {
                alert("사용자 정보를 불러오는 데 실패했습니다.");
            }
        }
    } else {
        if (window.location.pathname.includes("account.html")) {
            alert("사용자 정보를 불러올 수 없습니다.");
        }
    }

    // 법률 확인 배너 토글 처리
    const lawBannerHeader = document.querySelector(".law-banner-header");
    const lawBannerContent = document.querySelector(".law-banner-content");
    const lawBannerArrow = document.querySelector(".law-banner-arrow");

    if (lawBannerHeader && lawBannerContent && lawBannerArrow) { 
        lawBannerHeader.addEventListener("click", function () {
            lawBannerContent.classList.toggle("open");
            lawBannerArrow.innerHTML = lawBannerContent.classList.contains("open") 
                ? '<img src="images/up-arrow.png" alt="화살표" class="arrow-img" />'
                : '<img src="images/down-arrow.png" alt="화살표" class="arrow-img" />';
        });
    }

    // 슬라이드 쇼 처리
    const slides = document.querySelectorAll(".slide");
    const slider = document.querySelector(".slider");
    let currentIndex = 0;
    const totalSlides = slides.length;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(nextSlide, 3000); // 3초마다 슬라이드 전환
});
