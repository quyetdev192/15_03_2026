document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelope = document.getElementById('envelope');
    const envelopeText = envelope.querySelector('.text');
    const messageContainer = document.getElementById('messageContainer');
    const bgHearts = document.getElementById('bg-hearts');
    const particlesContainer = document.getElementById('particles');
    
    // Popup Elements
    const card = messageContainer.querySelector('.card');
    const trollTitle = document.getElementById('trollTitle');
    const trollDesc = document.getElementById('trollDesc');
    const trollSub = document.getElementById('trollSub');
    const trollImg = document.getElementById('trollImg');
    const mainBtn = document.getElementById('mainBtn');
    const runBtn = document.getElementById('runBtn');
    const kpiContainer = document.getElementById('kpiContainer');
    const flowerBurst = document.getElementById('flowerBurst');

    let isOpened = false;
    let attemptCount = 0;
    let internalTrollPhase = 0;
    let runBtnAttempt = 0;

    const phrases = [
        "Mở thử đi...",
        "Hụt rồi nha! Lêu lêu 😛",
        "Lại hụt nữa! Gà vãi... 🐔",
        "Cố lên, sắp được rồi nè... 😉",
        "Thôi tớ không chọc nữa đâu, cho click đó! ❤️"
    ];

    function createBackgroundElements() {
        // Floating particles (Stars and Sparkles)
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.innerHTML = Math.random() > 0.5 ? '✨' : '🌟';
            p.classList.add('floating-particle');
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDuration = (Math.random() * 5 + 5) + 's';
            p.style.animationDelay = Math.random() * 5 + 's';
            p.style.fontSize = (Math.random() * 15 + 10) + 'px';
            bgHearts.appendChild(p);
        }
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = Math.random() * 100 + 'vh';
            const size = Math.random() * 3 + 1;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.animationDuration = (Math.random() * 8 + 8) + 's';
            particlesContainer.appendChild(p);
        }
    }
    createBackgroundElements();

    function runEnvelopeAway() {
        if (isOpened || attemptCount >= 4) return;
        attemptCount++;
        envelopeText.innerText = phrases[Math.min(attemptCount, phrases.length - 1)];
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const envWidth = envelopeWrapper.offsetWidth;
        const envHeight = envelopeWrapper.offsetHeight;
        const margin = 100;
        const minX = envWidth / 2 + margin;
        const maxX = windowWidth - envWidth / 2 - margin;
        const minY = envHeight / 2 + margin;
        const maxY = windowHeight - envHeight / 2 - margin;
        const randomX = Math.random() * (maxX - minX) + minX;
        const randomY = Math.random() * (maxY - minY) + minY;
        envelopeWrapper.style.top = `${randomY}px`;
        envelopeWrapper.style.left = `${randomX}px`;
    }

    envelopeWrapper.addEventListener('mouseover', runEnvelopeAway);
    envelopeWrapper.addEventListener('touchstart', (e) => {
        if (!isOpened && attemptCount < 4) {
            runEnvelopeAway();
            e.preventDefault(); 
        }
    }, {passive: false});

    envelope.addEventListener('click', () => {
        if (isOpened || attemptCount < 4) return;
        isOpened = true;
        envelope.classList.add('opened');
        setTimeout(() => {
            messageContainer.classList.add('show');
            phase1_Audit();
        }, 1200);
    });

    // --- SAGA PHASES ---

    function phase1_Audit() {
        internalTrollPhase = 1;
        card.classList.add('audit-mode');
        trollTitle.innerText = "Lệnh Kiểm Tra KPI! 📉";
        trollDesc.innerText = "Này đồ thức khuya trái quy định! Mau chọn chức vụ của cậu đi:";
        trollSub.innerText = "Sếp lườm nãy giờ, đừng có mà lấc cấc! 😂";
        trollImg.src = "capitalism_boss.png";
        mainBtn.innerText = "Tớ là nhân viên quèn";
        runBtn.innerText = "Tớ là Sếp Tổng";
        runBtn.style.display = "block";
    }

    function runBtnAway() {
        if (internalTrollPhase !== 1) return;
        runBtnAttempt++;
        if (runBtnAttempt > 5) {
            trollSub.innerText = "Bấm hoài vậy? Biết là muốn làm Sếp rồi, nhưng thực tế đi bồ tèo! 🤣";
            return;
        }
        const cardRect = card.getBoundingClientRect();
        const btnWidth = runBtn.offsetWidth;
        const btnHeight = runBtn.offsetHeight;
        const randomX = (Math.random() * (cardRect.width - btnWidth - 40)) - (cardRect.width / 2) + btnWidth;
        const randomY = (Math.random() * (cardRect.height - btnHeight - 40)) - (cardRect.height / 2) + btnHeight;
        runBtn.style.left = `${randomX}px`;
        runBtn.style.top = `${randomY}px`;
    }

    runBtn.addEventListener('mouseover', runBtnAway);
    runBtn.addEventListener('touchstart', (e) => { e.preventDefault(); runBtnAway(); }, {passive: false});

    mainBtn.addEventListener('click', () => {
        if (internalTrollPhase === 1) phase2_KPI();
        else if (internalTrollPhase === 2) phase3_Ghost();
        else if (internalTrollPhase === 3) phase4_Surprise();
        else if (internalTrollPhase === 4) phase5_Sleep();
        else {
            messageContainer.classList.remove('show');
            resetGame();
        }
    });

    function phase2_KPI() {
        internalTrollPhase = 2;
        runBtn.style.display = "none";
        trollTitle.innerText = "Bảng Phạt Thức Khuya 📜";
        trollDesc.innerText = "Thống kê thiệt hại của 'chiến thần' thức đêm:";
        trollSub.innerText = "Thế này thì mai làm ăn gì tầm này nữa!";
        kpiContainer.style.display = "block";
        kpiContainer.innerHTML = `
            <table class="kpi-table">
                <tr><th>Chỉ số</th><th>Mức độ</th></tr>
                <tr><td>Nhan sắc</td><td>-100% (Mắt gấu trúc)</td></tr>
                <tr><td>Tỉnh táo</td><td>Báo động đỏ (Ngáo ngơ) 🚨</td></tr>
                <tr><td>KPI mai đi làm</td><td>Dễ bị sếp gõ đầu 💸</td></tr>
            </table>
        `;
        mainBtn.innerText = "Dạ tớ biết lỗi rồi...";
    }

    function phase3_Ghost() {
        internalTrollPhase = 3;
        kpiContainer.style.display = "none";
        trollTitle.innerText = "Coi chừng con ma đó! 👻";
        trollDesc.innerText = "Nó bảo đứa nào 12h đêm chưa ngủ nó sẽ bắt đi... rửa bát đó.";
        trollSub.innerText = "Nghe tiếng gì sàn sạt sau lưng không?";
        trollImg.src = "sleepy_demon.png";
        mainBtn.innerText = "Áaaaa tớ sợ!";
    }

    function phase4_Surprise() {
        internalTrollPhase = 4;
        card.classList.remove('audit-mode');
        trollTitle.innerText = "Tặng cậu nè bà già! ❤️";
        trollDesc.innerText = "Thấy cậu đi làm vất vả, lại hay bị sếp dì tới bến nên tặng hoa an ủi nè.";
        trollSub.innerText = "Cố lên nhé 'đồng chí', mai lại cày tiếp!";
        trollImg.src = "flower_bouquet.png";
        mainBtn.innerText = "Cảm ơn bồ tèo nha 😍";
        
        // Flower burst effect
        flowerBurst.style.display = "block";
        for (let i = 0; i < 30; i++) {
            const f = document.createElement('div');
            f.innerHTML = ["🌸", "🌹", "🌷", "🌻", "💐"][Math.floor(Math.random() * 5)];
            f.classList.add('flower-anim');
            f.style.left = Math.random() * 100 + "%";
            f.style.top = Math.random() * 100 + "%";
            f.style.animationDelay = (Math.random() * 1) + "s";
            flowerBurst.appendChild(f);
        }
    }

    function phase5_Sleep() {
        internalTrollPhase = 5;
        trollTitle.innerText = "Thôi đi ngủ thiệt đi! 🌙";
        trollDesc.innerText = "Thức nữa là mai đi làm không nổi đâu đó.";
        trollSub.innerText = "Ngủ sớm cho xinh đẹp, mai còn đi kiếm tiền nha!";
        trollImg.src = "troll_cat.png";
        mainBtn.innerText = "Tớ đi ngủ đây, bai bai!";
    }

    function resetGame() {
        setTimeout(() => {
            envelope.classList.remove('opened');
            isOpened = false;
            attemptCount = 0;
            envelopeText.innerText = phrases[0];
            envelopeWrapper.style.top = '50%';
            envelopeWrapper.style.left = '50%';
            flowerBurst.innerHTML = "";
            flowerBurst.style.display = "none";
        }, 800);
    }
});
