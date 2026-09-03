(function () {
    "use strict";

    const D = window.TRACKER_DATA;

    // ── Theme toggle (Sikorski standard) ─────────────────────────
    const themeBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const sunPath = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
    const moonPath = "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z";

    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
    };

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    let isDark = store.get("theme") ? store.get("theme") === "dark" : prefersDark.matches;

    const applyTheme = (dark, animate = true) => {
        document.body.setAttribute("data-theme", dark ? "dark" : "light");
        store.set("theme", dark ? "dark" : "light");
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.content = dark ? "#000000" : "#f5f5f7";
        themeIcon.querySelector("path").setAttribute("d", dark ? sunPath : moonPath);
        if (animate && window.gsap) {
            gsap.fromTo(themeIcon, { rotation: 0, scale: 0.8 }, { rotation: 360, scale: 1, duration: 0.6, ease: "power2.out" });
        }
    };
    applyTheme(isDark, false);
    themeBtn.addEventListener("click", () => { isDark = !isDark; applyTheme(isDark); });
    prefersDark.addEventListener("change", (e) => { isDark = e.matches; applyTheme(isDark, true); });

    // ── Tabs (hash-routed) ───────────────────────────────────────
    const tabBtns = document.querySelectorAll(".tab-btn");
    const showTab = (name) => {
        tabBtns.forEach(b => b.classList.toggle("active", b.dataset.tab === name));
        document.querySelectorAll(".tab-panel").forEach(p =>
            p.classList.toggle("active", p.id === "panel-" + name));
    };
    tabBtns.forEach(b => b.addEventListener("click", () => {
        history.replaceState(null, "", "#" + b.dataset.tab);
        showTab(b.dataset.tab);
        window.scrollTo({ top: 0 });
    }));
    const initial = location.hash.replace("#", "");
    if (["tracker", "blocking-tech", "prop-problem", "take-action"].includes(initial)) showTab(initial);

    // ── Helpers ──────────────────────────────────────────────────
    const el = (tag, cls, html) => {
        const n = document.createElement(tag);
        if (cls) n.className = cls;
        if (html !== undefined) n.innerHTML = html;
        return n;
    };
    const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const extArrow = '<svg class="link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>';
    const linkRow = (label, url) => `<a class="link-row" href="${esc(url)}" target="_blank" rel="noopener"><span>${esc(label)}</span>${extArrow}</a>`;

    const LEVEL_LABEL = { none: "No effect today", watch: "Watch", caution: "Caution", direct: "Direct impact" };

    const daysUntil = (iso) => Math.ceil((new Date(iso + "T23:59:59") - new Date()) / 86400000);

    document.getElementById("updated-line").textContent = "Updated " + D.updated;

    // ── "Your situation" chips ───────────────────────────────────
    let mySituation;
    try { mySituation = JSON.parse(store.get("situation") || "[]"); } catch (e) { mySituation = []; }

    const situationWrap = document.getElementById("situation-options");
    D.impactKeys.forEach(k => {
        const b = el("button", "chip" + (mySituation.includes(k.key) ? " on" : ""), esc(k.label));
        b.addEventListener("click", () => {
            b.classList.toggle("on");
            mySituation = mySituation.includes(k.key) ? mySituation.filter(x => x !== k.key) : mySituation.concat(k.key);
            store.set("situation", JSON.stringify(mySituation));
            document.querySelectorAll("tr.impact-row").forEach(tr =>
                tr.classList.toggle("mine", mySituation.includes(tr.dataset.key)));
        });
        situationWrap.appendChild(b);
    });

    // ── Filters ──────────────────────────────────────────────────
    const REGIONS = [["all", "Everywhere"], ["us", "US states"], ["federal", "US federal"], ["global", "Global"]];
    const STATUSES = [["all", "All"], ["law", "Law"], ["desk", "Awaiting signature"], ["stalled", "Stalled"], ["proposed", "Proposed / gap"]];
    let regionF = "all", statusF = "all";

    const buildFilter = (containerId, options, get, set) => {
        const wrap = document.getElementById(containerId);
        options.forEach(([val, label]) => {
            const b = el("button", "chip" + (get() === val ? " on" : ""), esc(label));
            b.dataset.val = val;
            b.addEventListener("click", () => {
                set(val);
                wrap.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c.dataset.val === val));
                renderCards();
            });
            wrap.appendChild(b);
        });
    };
    buildFilter("region-filters", REGIONS, () => regionF, v => regionF = v);
    buildFilter("status-filters", STATUSES, () => statusF, v => statusF = v);

    // ── Bill cards ───────────────────────────────────────────────
    const cardsWrap = document.getElementById("bill-cards");
    const openCards = new Set([location.hash.replace("#", "")]);

    function billCard(b) {
        const card = el("article", "bill-card glass" + (openCards.has(b.id) ? " open" : ""));
        card.id = b.id;

        let countdown = "";
        if (b.deadline) {
            const d = daysUntil(b.deadline.date);
            if (d >= 0) {
                countdown = `<div class="countdown"><strong>${d} day${d === 1 ? "" : "s"}</strong> — ${esc(b.deadline.label)} ${esc(b.deadline.date)}</div>`;
            }
        }

        const steps = b.steps.map(s =>
            `<div class="step${s.done ? " done" : ""}"><span class="step-dot"></span><div><div class="step-label">${esc(s.label)}</div><div class="step-date">${esc(s.date)}</div></div></div>`
        ).join("");

        const details = b.details.map(d => `<li>${esc(d)}</li>`).join("");

        const impact = D.impactKeys.map(k => {
            const row = b.impact[k.key];
            if (!row) return "";
            return `<tr class="impact-row${mySituation.includes(k.key) ? " mine" : ""}" data-key="${k.key}">
                <td class="impact-q">${esc(k.label)}</td>
                <td class="impact-a"><span class="impact-level lv-${row.level}">${LEVEL_LABEL[row.level]}</span>${esc(row.text)}</td>
            </tr>`;
        }).join("");

        const actions = (b.actions || []).map(a => linkRow(a.label, a.url)).join("");
        const sources = b.sources.map(s => linkRow(s.label, s.url)).join("");

        card.innerHTML = `
            <button class="bill-head" aria-expanded="${openCards.has(b.id)}">
                <div class="bill-head-main">
                    <div class="bill-place">${esc(b.place)}</div>
                    <div class="bill-title">${esc(b.name)} <span class="bill-no">· ${esc(b.billNo)}</span></div>
                    <span class="status-pill st-${b.status}">${esc(b.statusLabel)}</span>
                </div>
                <svg class="bill-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div class="bill-body">
                <p class="bill-summary">${esc(b.summary)}</p>
                ${countdown}
                <div class="mini-label">Where it stands</div>
                <div class="stepper">${steps}</div>
                <div class="mini-label">The detail</div>
                <ul class="detail-list">${details}</ul>
                <div class="mini-label">What it means for us</div>
                <table class="impact-table">${impact}</table>
                ${actions ? `<div class="mini-label">Do something about it</div>${actions}` : ""}
                <div class="mini-label">Sources</div>${sources}
                <div class="verified-line">Last verified by the meetup: ${esc(b.verified)}</div>
            </div>`;

        card.querySelector(".bill-head").addEventListener("click", () => {
            const open = card.classList.toggle("open");
            card.querySelector(".bill-head").setAttribute("aria-expanded", open);
            if (open) openCards.add(b.id); else openCards.delete(b.id);
        });
        return card;
    }

    function renderCards() {
        cardsWrap.innerHTML = "";
        const visible = D.bills.filter(b =>
            (regionF === "all" || b.region === regionF) &&
            (statusF === "all" || b.status === statusF));
        if (!visible.length) {
            cardsWrap.appendChild(el("div", "empty-note", "Nothing matches those filters — which, in this corner of the law, is good news."));
            return;
        }
        visible.forEach(b => cardsWrap.appendChild(billCard(b)));
        reveal(cardsWrap.querySelectorAll(".bill-card"));
    }
    renderCards();

    // ── Update log ───────────────────────────────────────────────
    document.getElementById("update-log").innerHTML = D.updateLog.map(u =>
        `<div class="update-row"><span class="update-date">${esc(u.date)}</span><span class="update-text">${esc(u.text)}</span></div>`
    ).join("");

    // ── Blocking-tech tab ────────────────────────────────────────
    const bt = D.blockingTech;
    document.getElementById("blocking-tech-content").innerHTML = `
        <div class="prose-block">
            <h2>What “blocking technology” actually is</h2>
            <p>${esc(bt.intro)}</p>
        </div>
        <div class="prose-block">
            <div class="section-label">What exists today</div>
            ${bt.products.map(p => `
                <div class="tech-card glass">
                    <div class="tech-name">${esc(p.name)}</div>
                    <div class="tech-since">${esc(p.since)}</div>
                    <p><span class="tech-tag">How it works</span>${esc(p.how)}</p>
                    <p><span class="tech-tag">Reality check</span>${esc(p.reality)}</p>
                </div>`).join("")}
        </div>
        <div class="prose-block">
            <div class="section-label">Every approach on the table</div>
            ${bt.approaches.map(a => `
                <div class="tech-card glass">
                    <div class="tech-name">${esc(a.name)}</div>
                    <p><span class="tech-tag">How it works</span>${esc(a.how)}</p>
                    <p><span class="tech-tag">What it's good at</span>${esc(a.strengths)}</p>
                    <p><span class="tech-tag">Where it breaks</span>${esc(a.fails)}</p>
                </div>`).join("")}
        </div>
        <div class="prose-block">
            <div class="section-label">The collision with how we actually print</div>
            <ul class="detail-list">${bt.collision.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
        </div>
        <div class="prose-block">
            <div class="section-label">${esc(bt.astm.title)}</div>
            ${bt.astm.paras.map(p => `<p>${esc(p)}</p>`).join("")}
        </div>
        <div class="prose-block">
            <div class="section-label">Where the standards stand</div>
            <ul class="detail-list">${bt.standards.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
        </div>`;

    // ── Prop Problem tab ─────────────────────────────────────────
    const pp = bt.propProblem;
    document.getElementById("prop-problem-content").innerHTML = `
        <div class="prose-block">
            <h2>${esc(pp.title)}</h2>
            <p>${esc(pp.intro)}</p>
            ${pp.paras.map(p => `<p>${esc(p)}</p>`).join("")}
        </div>
        <div class="prose-block">
            <div class="btn-row">
                <button class="btn primary-btn" data-goto="take-action">Draft a letter about it</button>
                <button class="btn secondary-btn" data-goto="blocking-tech">How the detection tech works</button>
            </div>
        </div>`;
    document.querySelectorAll("#prop-problem-content [data-goto]").forEach(b =>
        b.addEventListener("click", () => {
            history.replaceState(null, "", "#" + b.dataset.goto);
            showTab(b.dataset.goto);
            window.scrollTo({ top: 0 });
        }));

    // ── Take Action: letter generator ────────────────────────────
    const TARGET_META = {
        newsom: { greeting: "Dear Governor Newsom,", subject: "AB 2047 — a constituent's perspective" },
        state: { greeting: "Dear Legislator,", subject: "3D printer legislation — a constituent's perspective" },
        congress: { greeting: "Dear Representative,", subject: "3D printing legislation — a constituent's perspective" }
    };

    const PARA = {
        who: "I am a 3D printing hobbyist and a member of a weekly 3D printing community group of roughly 550 members. We print cosplay props, replacement parts, educational models, and open-source hardware projects.",
        oppose: {
            newsom: "I am writing to respectfully ask you to veto AB 2047. The bill mandates “firearm blocking technology” that does not meaningfully exist: no ASTM standard has been published or announced, and the bill's own text concedes this by sunsetting the mandate if no standard appears by July 2029. What the mandate would eventually do is burden lawful California buyers with locked-down machines while leaving the millions of printers already in circulation untouched.",
            state: "I am writing to ask you to oppose printer blocking-technology mandates like California's AB 2047 and Washington's HB 2321. These bills mandate detection technology that does not meaningfully exist, would lock lawful users out of open-source firmware, and would do nothing about the millions of printers already in circulation.",
            congress: "I am writing to ask you to oppose any federal mandate for “firearm blocking technology” in consumer 3D printers. The technology these proposals imagine does not meaningfully exist, and state-level versions (California AB 2047, New York's 2026 law) already concede this through feasibility off-ramps and sunset clauses."
        },
        concerns: {
            newsom: "Whatever your decision on AB 2047, I ask that its implementation protect three things that matter enormously to lawful users: open-source printer firmware (which file-screening mandates would effectively outlaw, since a screen you can recompile away is no screen at all), printers that operate offline (most hobbyist machines are never connected to the internet, so any screening must work without cloud checks), and legitimate prop, cosplay, and replica printing (which shape-detection algorithms consistently misidentify).",
            state: "As printer legislation reaches our state, I ask you to weigh three practical realities of hobbyist 3D printing: most of our machines run community-maintained open-source firmware; most are never connected to the internet; and a large share of what hobbyists lawfully print — props, replicas, model parts — is exactly what shape-detection algorithms misidentify. Laws that regulate conduct (unlicensed manufacture of firearms) fit these realities far better than laws that regulate printer hardware.",
            congress: "If federal 3D printing legislation is considered, I ask you to weigh three practical realities: most hobbyist machines run community-maintained open-source firmware; most are never connected to the internet; and shape-detection algorithms consistently misidentify lawful prints such as props and replicas. Conduct-based laws fit these realities far better than hardware mandates."
        },
        questions: {
            newsom: "AB 2047 is on your desk, and I would appreciate understanding your office's view on three questions before the September deadline: How will “3D printer” be defined in implementing regulations — does it reach hobbyist machines assembled from off-the-shelf components? Will the eventual sale restriction apply to private used-printer sales? And what happens to open-source firmware on compliant machines?",
            state: "I would appreciate understanding your position on 3D printer legislation, and specifically: whether you would support hardware mandates (the California/New York model) or conduct-based laws (the Washington/Colorado model); how hobbyist machines built from off-the-shelf components would be treated; and how open-source printer firmware would be protected.",
            congress: "I would appreciate understanding your position on 3D printing legislation, and specifically whether you would support hardware mandates on printers, versus enforcement of existing law — the Undetectable Firearms Act and the licensing requirements that already govern firearm manufacture regardless of method."
        },
        ask: {
            oppose: "Our community follows this legislation closely and reads the bills, not just the headlines. We would welcome the chance to be a resource on the practical side of consumer 3D printing.",
            concerns: "Our community follows this legislation closely and would welcome the chance to be a resource on the practical side of consumer 3D printing.",
            questions: "Thank you for your time — I follow this issue closely and will share your response with our community group."
        }
    };

    const actTarget = document.getElementById("act-target");
    const actStance = document.getElementById("act-stance");
    const actName = document.getElementById("act-name");
    const actLetter = document.getElementById("act-letter");
    const actMailto = document.getElementById("act-mailto");

    function buildLetter() {
        const t = actTarget.value, s = actStance.value;
        const name = actName.value.trim() || "A constituent";
        const body = [
            TARGET_META[t].greeting, "",
            PARA.who, "",
            PARA[s][t], "",
            PARA.ask[s], "",
            "Respectfully,", name
        ].join("\n");
        actLetter.value = body;
        actMailto.href = "mailto:?subject=" + encodeURIComponent(TARGET_META[t].subject) +
            "&body=" + encodeURIComponent(body);
    }
    [actTarget, actStance].forEach(n => n.addEventListener("change", buildLetter));
    actName.addEventListener("input", buildLetter);
    actLetter.addEventListener("input", () => {
        actMailto.href = "mailto:?subject=" + encodeURIComponent(TARGET_META[actTarget.value].subject) +
            "&body=" + encodeURIComponent(actLetter.value);
    });
    buildLetter();

    document.getElementById("act-copy").addEventListener("click", function () {
        const done = () => { this.textContent = "Copied"; setTimeout(() => this.textContent = "Copy letter", 1600); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(actLetter.value).then(done.bind(this), () => { actLetter.select(); document.execCommand("copy"); done.call(this); });
        } else {
            actLetter.select(); document.execCommand("copy"); done.call(this);
        }
    });

    // ── Take Action: link lists ──────────────────────────────────
    document.getElementById("action-links").innerHTML = [
        ["Governor Newsom's contact form (AB 2047 is his call now)", "https://www.gov.ca.gov/contact/"],
        ["Find your state legislators — OpenStates", "https://openstates.org/find_your_legislator/"],
        ["Find your US House representative", "https://www.house.gov/representatives/find-your-representative"],
        ["Find your US senators", "https://www.senate.gov/senators/senators-contact.htm"]
    ].map(([l, u]) => linkRow(l, u)).join("");

    document.getElementById("ally-links").innerHTML = [
        ["Joel Telling's AB 2047 action hub — the 3D Printing Nerd", "https://www.the3dprintingnerd.com/ab2047"],
        ["EFF on 3D printing censorship", "https://www.eff.org/deeplinks/2026/04/dangers-californias-legislation-censor-3d-printing"],
        ["Our weekly meetup — slides & archive", "https://maxsikorski.github.io/3d-printing-weekly-news"]
    ].map(([l, u]) => linkRow(l, u)).join("");

    // ── Reveal animations (GSAP if present; content visible without) ──
    function reveal(nodes) {
        if (!window.gsap) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", delay: entry.target.dataset.delay || 0 });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });
        nodes.forEach((n, i) => {
            gsap.set(n, { opacity: 0, y: 20 });
            n.dataset.delay = Math.min(i * 0.06, 0.4);
            observer.observe(n);
        });
    }

    if (window.gsap) {
        gsap.set(".page-title, .page-subtitle, .meta-line, .tabs", { opacity: 0, y: 30 });
        gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } })
            .to(".page-title", { opacity: 1, y: 0, delay: 0.15 })
            .to(".page-subtitle", { opacity: 1, y: 0 }, "-=0.9")
            .to(".meta-line", { opacity: 1, y: 0 }, "-=1.0")
            .to(".tabs", { opacity: 1, y: 0 }, "-=1.0");
        reveal(document.querySelectorAll(".situation-panel, .tech-card, .action-panel"));
    }

    // Deep link straight to a card (e.g. #ca-ab2047)
    const target = document.getElementById(location.hash.replace("#", ""));
    if (target && target.classList.contains("bill-card")) {
        setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
})();
