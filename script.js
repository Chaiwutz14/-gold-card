/* =========================================================================
   บัตรทอง – interactions (dependency-free)
   - inject inline SVG icon sprite (no CDN, works offline)
   - mobile nav drawer, header shadow on scroll
   - scroll reveal, FAQ accordion, lazy YouTube facade, back-to-top
   ========================================================================= */
(function () {
    "use strict";

    /* Mark that JS is active so reveal-hiding CSS applies (fail-safe: no JS = content visible) */
    document.documentElement.classList.add("has-js");

    /* ---- 1) Icon sprite (stroke icons, 24x24, currentColor) ---- */
    var SPRITE = [
        '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">',
        icon("shield", '<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>'),
        icon("shield-heart", '<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M12 14.6s-2.6-1.6-2.6-3.4A1.6 1.6 0 0112 9.9a1.6 1.6 0 012.6 1.3c0 1.8-2.6 3.4-2.6 3.4z" fill="currentColor" stroke="none"/>'),
        icon("shield-check", '<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><polyline points="9 11.4 11.2 13.6 15.4 9.4"/>'),
        icon("menu", '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>'),
        icon("close", '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>'),
        icon("chevron-down", '<polyline points="6 9 12 15 18 9"/>'),
        icon("arrow-right", '<line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>'),
        icon("arrow-up", '<line x1="12" y1="20" x2="12" y2="5"/><polyline points="6 11 12 5 18 11"/>'),
        icon("check", '<polyline points="4 12 9 17 20 6"/>'),
        icon("check-circle", '<circle cx="12" cy="12" r="9"/><polyline points="8 12 11 15 16 8.8"/>'),
        icon("x-circle", '<circle cx="12" cy="12" r="9"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>'),
        icon("plus", '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),
        icon("heart", '<path d="M12 20s-7-4.35-9.2-8.4C1.3 8.7 2.8 5.5 6 5.5c1.8 0 3.1 1 4 2.3.9-1.3 2.2-2.3 4-2.3 3.2 0 4.7 3.2 3.2 6.1C19 15.65 12 20 12 20z"/>'),
        icon("activity", '<polyline points="3 12 7 12 10 5 14 19 17 12 21 12"/>'),
        icon("stethoscope", '<path d="M5 3v6a4 4 0 008 0V3"/><line x1="3.5" y1="3" x2="6.5" y2="3"/><line x1="11.5" y1="3" x2="14.5" y2="3"/><path d="M9 13a5 5 0 005 5 4 4 0 004-4v-2.4"/><circle cx="18" cy="9" r="2"/>'),
        icon("hospital", '<rect x="4" y="7" width="16" height="13" rx="2"/><line x1="4" y1="20" x2="20" y2="20"/><path d="M12 4v3.4M10.3 5.7h3.4"/><path d="M10 12.5h4M12 10.5v4"/>'),
        icon("building", '<rect x="5" y="3" width="14" height="18" rx="1.5"/><line x1="3.5" y1="21" x2="20.5" y2="21"/><path d="M10 21v-3.5h4V21"/><line x1="9" y1="7" x2="9.01" y2="7"/><line x1="15" y1="7" x2="15.01" y2="7"/><line x1="9" y1="11" x2="9.01" y2="11"/><line x1="15" y1="11" x2="15.01" y2="11"/>'),
        icon("bed", '<path d="M3 8v11M3 18h18v-5H3"/><path d="M21 18v-3a2 2 0 00-2-2h-8v5"/><circle cx="7" cy="11" r="1.8"/>'),
        icon("pill", '<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>'),
        icon("syringe", '<line x1="15" y1="3" x2="21" y2="9"/><path d="M18.5 6.5l-10 10-3.5 1 1-3.5 10-10z"/><line x1="12" y1="9" x2="15" y2="12"/><line x1="6.5" y1="17.5" x2="4" y2="20"/>'),
        icon("tooth", '<path d="M12 4.2c-2-1.4-5-1.2-6 1-1 2.3.3 5 .7 7.5.3 2 .4 5 1.6 5 1.2 0 1-2.4 2.2-2.4s1 2.4 2.2 2.4c1.2 0 1.3-3 1.6-5 .4-2.5 1.7-5.2.7-7.5-1-2.2-4-2.4-6-1z"/>'),
        icon("baby", '<circle cx="12" cy="6.5" r="3"/><path d="M7 21v-2.5a5 5 0 0110 0V21"/><path d="M10 12.5c1.2 1 2.8 1 4 0"/>'),
        icon("droplet", '<path d="M12 3.2c3.4 4.1 6 7.1 6 9.9a6 6 0 01-12 0c0-2.8 2.6-5.8 6-9.9z"/>'),
        icon("ribbon", '<path d="M8.5 3l7 13M15.5 3l-7 13"/><path d="M12 12l3 6-3-1.6L9 18z"/>'),
        icon("virus", '<circle cx="12" cy="12" r="5"/><g><line x1="12" y1="2.5" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21.5" y2="12"/><line x1="5.4" y1="5.4" x2="7.8" y2="7.8"/><line x1="16.2" y1="16.2" x2="18.6" y2="18.6"/><line x1="18.6" y1="5.4" x2="16.2" y2="7.8"/><line x1="7.8" y1="16.2" x2="5.4" y2="18.6"/></g>'),
        icon("eye", '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'),
        icon("wheelchair", '<circle cx="12.5" cy="17.5" r="4.2"/><circle cx="10" cy="5" r="1.6" fill="currentColor" stroke="none"/><path d="M10 7v5h4.5l2.2 4.2"/><line x1="10" y1="9.5" x2="14" y2="9.5"/>'),
        icon("leaf", '<path d="M4.5 20C4 12 9.5 5 20 5c.3 9.5-5 15-15.5 15z"/><path d="M9 15c2.2-3 5-5 8-6.2"/>'),
        icon("flask", '<path d="M9 3h6M10 3v6l-4.2 8.4A1.6 1.6 0 007.2 20h9.6a1.6 1.6 0 001.4-2.6L14 9V3"/><line x1="8" y1="14.5" x2="16" y2="14.5"/>'),
        icon("brain", '<path d="M9.5 4A2.5 2.5 0 007 6.5 2.5 2.5 0 005.5 11 2.5 2.5 0 007 15.5 2.5 2.5 0 009.5 20a2 2 0 002-2V6a2 2 0 00-2-2z"/><path d="M14.5 4A2.5 2.5 0 0117 6.5 2.5 2.5 0 0118.5 11 2.5 2.5 0 0117 15.5 2.5 2.5 0 0114.5 20a2 2 0 01-2-2V6a2 2 0 012-2z"/>'),
        icon("hand-heart", '<path d="M3 13v6"/><path d="M3 14c1.6-1 3.2-1 4.8 0l1.9 1.2c.3.2.7.3 1.1.3H14a1.2 1.2 0 000-2.4h-3.2"/><path d="M12 9.4S9.8 8.1 9.8 6.5A1.4 1.4 0 0112 5.4a1.4 1.4 0 012.2 1.1C14.2 8.1 12 9.4 12 9.4z" fill="currentColor" stroke="none"/>'),
        icon("phone", '<path d="M6.3 3.5c.8 0 1.5.5 1.7 1.3l.7 2.5c.2.7 0 1.4-.5 1.9L6.9 10.5a12 12 0 005.3 5.3l1.3-1.3c.5-.5 1.2-.7 1.9-.5l2.5.7c.8.2 1.3.9 1.3 1.7v2.2c0 1-.9 1.8-1.9 1.7C10.6 21.4 2.6 13.4 2.6 5.5c-.1-1 .7-1.9 1.7-1.9z"/>'),
        icon("headset", '<path d="M4 13v-1a8 8 0 0116 0v1"/><path d="M4 13a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2a2 2 0 012-2z"/><path d="M20 13a2 2 0 00-2 2v2a2 2 0 002 2 2 2 0 002-2v-2a2 2 0 00-2-2z"/><path d="M18 19a4 4 0 01-4 3h-2"/>'),
        icon("chat", '<path d="M4.5 5h15a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0119.5 16H9l-4.2 3.8V16H4.5A1.5 1.5 0 013 14.5v-8A1.5 1.5 0 014.5 5z"/>'),
        icon("line", '<path d="M12 4c-5 0-9 3.2-9 7.1 0 3.5 3.3 6.4 7.7 7 .9.1.7.6.6 1.1l-.2 1.1c-.1.5.3.9.9.6 2.9-1.4 5.6-3.4 7.5-5.8 1-1.2 1.5-2.6 1.5-4C21 7.2 17 4 12 4z"/><line x1="8" y1="11" x2="8" y2="13"/><line x1="11" y1="11" x2="11" y2="13"/><line x1="14.5" y1="11" x2="16.5" y2="11"/><line x1="15.5" y1="11" x2="15.5" y2="13"/>'),
        icon("download", '<path d="M12 4v11"/><polyline points="7.5 10.5 12 15 16.5 10.5"/><path d="M5 19.5h14"/>'),
        icon("map-pin", '<path d="M12 21c4-4.5 7-7.7 7-11a7 7 0 10-14 0c0 3.3 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
        icon("id-card", '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.4 16c.5-1.6 1.8-2.4 3.1-2.4s2.6.8 3.1 2.4"/><line x1="14.5" y1="10" x2="18.5" y2="10"/><line x1="14.5" y1="13.5" x2="18" y2="13.5"/>'),
        icon("mobile", '<rect x="7" y="3" width="10" height="18" rx="2.6"/><line x1="10.5" y1="18" x2="13.5" y2="18"/>'),
        icon("laptop-medical", '<rect x="5" y="5" width="14" height="10" rx="1.5"/><path d="M12 8v4M10 10h4"/><path d="M3 18h18l-1 2H4z"/>'),
        icon("search", '<circle cx="11" cy="11" r="6.5"/><line x1="16" y1="16" x2="21" y2="21"/>'),
        icon("ambulance", '<rect x="2" y="8" width="13" height="8" rx="1.2"/><path d="M15 11h3.6l2.4 3v2H15z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/><path d="M6.5 10.5v3M5 12h3"/>'),
        icon("users", '<circle cx="9" cy="8" r="3.2"/><path d="M3.4 19c.6-3 2.9-4.6 5.6-4.6s5 1.6 5.6 4.6"/><path d="M16 5.2a3.2 3.2 0 010 6"/><path d="M17.4 14.6c2.2.5 3.7 2 4.1 4.4"/>'),
        icon("calendar", '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><line x1="8" y1="3" x2="8" y2="6.5"/><line x1="16" y1="3" x2="16" y2="6.5"/>'),
        icon("clock", '<circle cx="12" cy="12" r="8.5"/><polyline points="12 7.5 12 12 15.5 14"/>'),
        icon("star", '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.85L12 17.9l-5.2 2.75 1-5.85L4.5 9.7l5.9-.9z"/>'),
        icon("sparkle", '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'),
        icon("info", '<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.5"/><circle cx="12" cy="7.8" r=".7" fill="currentColor" stroke="none"/>'),
        icon("alert", '<path d="M12 3.5l9.2 16H2.8z"/><line x1="12" y1="9.5" x2="12" y2="14"/><circle cx="12" cy="16.8" r=".7" fill="currentColor" stroke="none"/>'),
        icon("book", '<path d="M4 5.5A2 2 0 016 4h5v15.5H6A2 2 0 004 21z"/><path d="M20 5.5A2 2 0 0018 4h-5v15.5h5a2 2 0 012 1.5z"/>'),
        icon("doc", '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><line x1="9" y1="12.5" x2="15" y2="12.5"/><line x1="9" y1="16" x2="15" y2="16"/>'),
        icon("home", '<path d="M4 11l8-7 8 7"/><path d="M6 10v9.5h12V10"/><path d="M10 19.5V14h4v5.5"/>'),
        icon("globe", '<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/>'),
        icon("mail", '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 6.5l8 6 8-6"/>'),
        icon("external", '<path d="M14 4h6v6"/><line x1="20" y1="4" x2="11.5" y2="12.5"/><path d="M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4"/>'),
        icon("play", '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>'),
        icon("apple", '<path d="M16.5 3.2c.1 1-.3 2-.9 2.7-.7.8-1.8 1.4-2.8 1.3-.1-1 .4-2 .9-2.6.7-.8 1.9-1.3 2.8-1.4z"/><path d="M18.7 16.8c-.5 1.2-1.1 2.3-2 3.2-.7.6-1.3 1.2-2.3 1.2s-1.3-.4-2.4-.4-1.5.4-2.4.4c-1 0-1.7-.6-2.4-1.3-1.9-2-3-5.6-1.2-8.1.9-1.3 2.3-2 3.7-2 1 0 1.9.6 2.5.6s1.7-.7 2.9-.6c.9 0 2.2.4 3.1 1.6-2.6 1.5-2.2 5.2.6 6z"/>'),
        icon("android", '<path d="M7 11v6a1 1 0 001 1h8a1 1 0 001-1v-6z"/><path d="M6 11a6 6 0 0112 0z"/><line x1="8.7" y1="6.5" x2="7.7" y2="5"/><line x1="15.3" y1="6.5" x2="16.3" y2="5"/><circle cx="9.5" cy="8.4" r=".55" fill="currentColor" stroke="none"/><circle cx="14.5" cy="8.4" r=".55" fill="currentColor" stroke="none"/><rect x="3.5" y="11.5" width="2" height="6" rx="1"/><rect x="18.5" y="11.5" width="2" height="6" rx="1"/><rect x="8.5" y="17.5" width="2" height="4" rx="1"/><rect x="13.5" y="17.5" width="2" height="4" rx="1"/>')
    ].join("");

    function icon(id, body) {
        return '<symbol id="i-' + id + '" viewBox="0 0 24 24">' + body + "</symbol>";
    }

    /* Inject sprite as first child of body */
    function injectSprite() {
        var host = document.createElement("div");
        host.innerHTML = SPRITE;
        document.body.insertBefore(host.firstChild, document.body.firstChild);
    }
    if (document.body) injectSprite();
    else document.addEventListener("DOMContentLoaded", injectSprite);

    /* ---- 2) Everything else after DOM ready ---- */
    document.addEventListener("DOMContentLoaded", function () {

        /* Mobile nav */
        var toggle = document.querySelector(".nav-toggle");
        var backdrop = document.querySelector(".nav-backdrop");
        function closeNav() { document.body.classList.remove("nav-open"); if (toggle) toggle.setAttribute("aria-expanded", "false"); }
        if (toggle) {
            toggle.addEventListener("click", function () {
                var open = document.body.classList.toggle("nav-open");
                toggle.setAttribute("aria-expanded", open ? "true" : "false");
            });
        }
        if (backdrop) backdrop.addEventListener("click", closeNav);
        document.querySelectorAll(".main-nav a").forEach(function (a) { a.addEventListener("click", closeNav); });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

        /* Header shadow */
        var header = document.querySelector(".site-header");
        var toTop = document.querySelector(".to-top");
        function onScroll() {
            var y = window.scrollY;
            if (header) header.classList.toggle("scrolled", y > 8);
            if (toTop) toTop.classList.toggle("show", y > 500);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

        /* Scroll reveal */
        var revealEls = document.querySelectorAll(".reveal");
        if ("IntersectionObserver" in window && revealEls.length) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) {
                    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
            revealEls.forEach(function (el) { io.observe(el); });
        } else {
            revealEls.forEach(function (el) { el.classList.add("in"); });
        }

        /* FAQ accordion */
        document.querySelectorAll(".faq-item").forEach(function (item) {
            var btn = item.querySelector(".faq-q");
            var ans = item.querySelector(".faq-a");
            if (!btn || !ans) return;
            btn.setAttribute("aria-expanded", "false");
            btn.addEventListener("click", function () {
                var open = item.classList.toggle("open");
                btn.setAttribute("aria-expanded", open ? "true" : "false");
                ans.style.maxHeight = open ? ans.scrollHeight + "px" : null;
            });
        });

        /* Lazy YouTube video (loads only on user action, via the IFrame API so
           we can detect deleted/blocked videos and show a clear error state) */
        var ytApiPromise = null;
        function loadYTApi() {
            if (ytApiPromise) return ytApiPromise;
            ytApiPromise = new Promise(function (resolve, reject) {
                if (window.YT && window.YT.Player) { resolve(window.YT); return; }
                var prev = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = function () {
                    if (typeof prev === "function") { try { prev(); } catch (e) {} }
                    resolve(window.YT);
                };
                var s = document.createElement("script");
                s.src = "https://www.youtube.com/iframe_api";
                s.onerror = function () { reject(new Error("โหลดตัวเล่นวิดีโอไม่สำเร็จ")); };
                document.head.appendChild(s);
                // Safety net: if the API never signals ready (e.g. blocked), fail after 12s
                setTimeout(function () { reject(new Error("หมดเวลาโหลดวิดีโอ")); }, 12000);
            });
            return ytApiPromise;
        }

        function showVideoError(frame, id) {
            frame.innerHTML =
                '<div class="video-error">' +
                    '<svg class="ic err-ic"><use href="#i-alert"></use></svg>' +
                    "<b>วิดีโอขัดข้อง</b>" +
                    "<p>ขออภัย ไม่สามารถเล่นวิดีโอนี้ได้ในขณะนี้ วิดีโออาจถูกลบหรือปิดการฝัง</p>" +
                    '<a class="btn btn-light" href="https://www.youtube.com/watch?v=' + id +
                        '" target="_blank" rel="noopener"><svg class="ic"><use href="#i-external"></use></svg> ลองเปิดใน YouTube</a>' +
                "</div>";
        }

        document.querySelectorAll(".video-frame[data-yt]").forEach(function (frame) {
            function playVideo() {
                if (frame.dataset.loaded) return;
                frame.dataset.loaded = "1";
                var id = frame.getAttribute("data-yt");
                var title = frame.getAttribute("data-title") || "วิดีโอ";
                frame.innerHTML = '<div class="video-loading">กำลังโหลดวิดีโอ…</div>';
                var mount = document.createElement("div");
                mount.className = "video-player";
                frame.innerHTML = "";
                frame.appendChild(mount);
                loadYTApi().then(function (YT) {
                    new YT.Player(mount, {
                        width: "100%",
                        height: "100%",
                        videoId: id,
                        host: "https://www.youtube-nocookie.com",
                        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
                        events: {
                            onReady: function (e) { try { e.target.playVideo(); } catch (err) {} },
                            onError: function () { showVideoError(frame, id); }
                        }
                    });
                }).catch(function () { showVideoError(frame, id); });
                frame.setAttribute("aria-label", "กำลังเล่นวิดีโอ " + title);
            }
            frame.addEventListener("click", playVideo);
            frame.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); playVideo(); }
            });
        });
    });
})();
