document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedUserData = urlParams.get('user'); // decodeURIComponent() 제거

    console.log("📢 URL에서 받은 인코딩된 데이터:", encodedUserData);

    // UTF-8 Base64 복호화 함수
    function decodeBase64(str) {
        return decodeURIComponent(escape(atob(str))); // Base64 디코딩 후 UTF-8 변환
    }

    if (encodedUserData) {
        try {
            const user = JSON.parse(decodeBase64(encodedUserData));

            console.log("📢 복호화된 사용자 데이터:", user);

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
            console.error("사용자 정보를 복호화하는 중 오류 발생:", error);
            alert("사용자 정보를 불러오는 데 실패했습니다.");
        }
    } else {
        alert("사용자 정보를 불러올 수 없습니다.");
    }

    // 법률 확인 배너 토글 처리
    const lawBannerHeader = document.querySelector(".law-banner-header");
    const lawBannerContent = document.querySelector(".law-banner-content");
    const lawBannerArrow = document.querySelector(".law-banner-arrow");

    if (lawBannerHeader && lawBannerContent && lawBannerArrow) { 
        lawBannerHeader.addEventListener("click", function () {
            if (lawBannerContent.classList.contains("open")) {
                // 닫기: open 클래스 제거
                lawBannerContent.classList.remove("open");
                lawBannerArrow.innerHTML = '<img src="images/down-arrow.png" alt="화살표" class="arrow-img" />';
            } else {
                // 열기: open 클래스 추가
                lawBannerContent.classList.add("open");
                lawBannerArrow.innerHTML = '<img src="images/up-arrow.png" alt="화살표" class="arrow-img" />';
            }
        });
    }
});
