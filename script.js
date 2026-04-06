function toggleMenu() {
    const nav = document.getElementById('navLinks');
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "70px";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.backgroundColor = "white";
        nav.style.padding = "20px";
        nav.style.boxShadow = "0 10px 10px rgba(0,0,0,0.1)";
    }
}
// 1. ฟังก์ชันเปิด-ปิดเมนูมือถือ (Hamburger Menu)
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// 2. เปลี่ยนสไตล์ Header เมื่อเลื่อนหน้าจอ (Scroll Effect)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 3. Smooth Scroll สำหรับ Link ต่างๆ
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 4. เพิ่ม Reveal Effect (ค่อยๆ ปรากฎเมื่อเลื่อนมาถึง)
const revealElements = document.querySelectorAll('.card, .benefit-item');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener('scroll', revealOnScroll);