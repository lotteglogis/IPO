document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedUserData = urlParams.get('user');

    // URL-safe Base64를 표준 Base64로 변환하는 함수
    function urlSafeBase64ToBase64(str) {
        return str
            .replace(/-/g, '+')    // '-'을 '+'로
            .replace(/_/g, '/')    // '_'을 '/'로
            .padEnd(str.length + (4 - str.length % 4) % 4, '='); // padding 처리
    }

    // UTF-8 Base64 복호화 함수
    function decodeBase64(str) {
        try {
            const standardBase64 = urlSafeBase64ToBase64(str); // URL-safe Base64를 표준 Base64로 변환
            return decodeURIComponent(escape(atob(standardBase64))); // Base64 디코딩 후 UTF-8 변환
        } catch (e) {
            console.error("🚨 Base64 복호화 오류:", e);
            return null;
        }
    }

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
});
