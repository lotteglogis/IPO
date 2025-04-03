document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    // URL에 전달된 인코딩 문자열을 decodeURIComponent()로 복원
    const encodedUserData = decodeURIComponent(urlParams.get('user'));

    // UTF-8 Base64 복호화 함수
    function decodeBase64(str) {
        // atob()로 Base64 디코딩 후 escape()와 decodeURIComponent()로 UTF-8 문자열로 변환
        return decodeURIComponent(escape(atob(str)));
    }

    if (encodedUserData) {
        try {
            // 복호화된 문자열을 JSON으로 파싱
            const user = JSON.parse(decodeBase64(encodedUserData));

            // 사용자 정보 표시
            document.getElementById('name').innerText = user.name;
            document.getElementById('combo').innerText = user.combo;

            // 계좌번호 마스킹 처리 (마지막 4자리만 노출)
            const maskedAccount = "****" + user.account.slice(-4);
            document.getElementById('account').innerText = maskedAccount;

            // 계좌번호 보기 버튼 클릭 시 계좌번호 보이기/숨기기 전환
            const toggleAccountBtn = document.getElementById('toggleAccountBtn');
            toggleAccountBtn.addEventListener('click', function () {
                const accountElement = document.getElementById('account');
                if (accountElement.innerText === maskedAccount) {
                    accountElement.innerText = user.account; // 원래 계좌번호 표시
                    toggleAccountBtn.innerText = "계좌번호 숨기기"; // 버튼 텍스트 변경
                } else {
                    accountElement.innerText = maskedAccount; // 마스킹된 계좌번호 표시
                    toggleAccountBtn.innerText = "계좌번호 보기"; // 버튼 텍스트 변경
                }
            });

            // 보유 주식 수 및 평가 금액 표시
            document.getElementById('sharesOwned').innerText = user.sharesOwned;
            const valuation = user.stockPrice * user.sharesOwned;
            document.getElementById('valuation').innerText = valuation.toLocaleString(); // 평가 금액 표시

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
