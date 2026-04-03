/* ════════════════════════════════════════════════════════════════════════════
   PORTFOLIO — scripts.js
   Depends on: jQuery 3.7+, Typed.js 2.x, AOS 2.x, Slick 1.8
   ════════════════════════════════════════════════════════════════════════════ */

$(function () {
  /* ═══════════════════════════════════════════════════════════
     1. THEME TOGGLE — dark / light with localStorage persistence
     ═══════════════════════════════════════════════════════════ */
  const $html = $("html");
  const $toggle = $("#themeToggle");
  const $label = $("#themeLabel");
  const THEME_KEY = "pf_theme";
  const DARK = "dark";
  const LIGHT = "light";

  function applyTheme(theme) {
    $html.attr("data-theme", theme);
    if (theme === DARK) {
      $label.text("LIGHT");
      $toggle
        .find(".toggle-icon i")
        .removeClass("fa-sun")
        .addClass("fa-terminal");
    } else {
      $label.text("DARK");
      $toggle
        .find(".toggle-icon i")
        .removeClass("fa-terminal")
        .addClass("fa-sun");
    }
  }

  // Load saved or system preference
  const saved = localStorage.getItem(THEME_KEY);
  const prefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefDark ? DARK : LIGHT));

  $toggle.on("click", function () {
    const next = $html.attr("data-theme") === DARK ? LIGHT : DARK;
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ═══════════════════════════════════════════════════════════
     2. NAVBAR — scroll class + active link highlight
     ═══════════════════════════════════════════════════════════ */
  const $navbar = $("#navbar");
  const $navLinks = $(".nav-link");
  const navH =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    ) || 72;

  $(window).on("scroll.navbar", function () {
    const scrollY = $(this).scrollTop();

    // Scrolled shadow
    $navbar.toggleClass("scrolled", scrollY > 10);

    // Active section highlight
    let current = "";
    $("section[id]").each(function () {
      const top = $(this).offset().top - navH - 40;
      if (scrollY >= top) current = $(this).attr("id");
    });

    $navLinks.each(function () {
      const href = $(this).attr("href").replace("#", "");
      $(this).toggleClass("active", href === current);
    });
  });

  // Smooth scroll for ALL anchor links
  $(document).on("click", 'a[href^="#"]', function (e) {
    const target = $($(this).attr("href"));
    if (!target.length) return;
    e.preventDefault();
    $("html,body").animate(
      { scrollTop: target.offset().top - navH + 1 },
      600,
      "swing",
    );
    // Close mobile menu if open
    closeMobileMenu();
  });

  /* ═══════════════════════════════════════════════════════════
     3. HAMBURGER MENU
     ═══════════════════════════════════════════════════════════ */
  const $hamburger = $("#hamburger");
  const $mobileNav = $("#navLinks");

  function closeMobileMenu() {
    $hamburger.removeClass("open").attr("aria-expanded", "false");
    $mobileNav.removeClass("open");
  }

  $hamburger.on("click", function () {
    const isOpen = $mobileNav.hasClass("open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      $hamburger.addClass("open").attr("aria-expanded", "true");
      $mobileNav.addClass("open");
    }
  });

  // Close on outside click
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".nav-container").length) closeMobileMenu();
  });

  // Close on Escape
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") closeMobileMenu();
  });

  /* ═══════════════════════════════════════════════════════════
     4. TYPED.JS — hero heading typing animation
     ═══════════════════════════════════════════════════════════ */
  if (typeof Typed !== "undefined") {
    new Typed("#typedOutput", {
      strings: [
        "Hello, World.",
        "I build things for the web.",
        "I automate everything.",
        "I ship with Docker & Kubernetes.",
        "I live in the terminal.",
        "Let's build something great.",
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1800,
      startDelay: 600,
      loop: true,
      showCursor: false, // We use our own CSS cursor
    });
  }

  /* ═══════════════════════════════════════════════════════════
     5. ANIMATED CANVAS BACKGROUND (hero)
     ═══════════════════════════════════════════════════════════ */
  (function initCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles;

    const COLORS = ["#00ff9d", "#00d4ff", "#b06aff", "#ff4da6"];
    const COUNT = 60;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function randBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    function mkParticle() {
      return {
        x: randBetween(0, W),
        y: randBetween(0, H),
        r: randBetween(1, 3.5),
        vx: randBetween(-0.3, 0.3),
        vy: randBetween(-0.4, -0.15),
        clr: COLORS[Math.floor(Math.random() * COLORS.length)],
        a: randBetween(0.3, 0.9),
      };
    }

    function initParticles() {
      particles = Array.from({ length: COUNT }, mkParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.clr;
        ctx.globalAlpha = p.a;
        ctx.fill();
        ctx.globalAlpha = 1;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.y < -10) {
          p.y = H + 10;
          p.x = randBetween(0, W);
        }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });
    resize();
    initParticles();
    draw();
  })();

  /* ═══════════════════════════════════════════════════════════
     6. AOS (Animate On Scroll)
     ═══════════════════════════════════════════════════════════ */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 350,
      easing: "ease-out",
      once: true,
      offset: 40,
      delay: 0,
    });
  }

  /* ═══════════════════════════════════════════════════════════
     7. SLICK CAROUSEL — testimonials
     ═══════════════════════════════════════════════════════════ */
  if ($.fn.slick) {
    $(".testimonials-slider").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4500,
      speed: 600,
      dots: true,
      arrows: false,
      pauseOnHover: true,
      cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
      responsive: [{ breakpoint: 900, settings: { slidesToShow: 1 } }],
    });
  }

  /* ═══════════════════════════════════════════════════════════
     8. CONTACT FORM — validation
     ═══════════════════════════════════════════════════════════ */
  const $form = $("#contactForm");
  const $nameInput = $("#contactName");
  const $emailInput = $("#contactEmail");
  const $msgInput = $("#contactMsg");
  const $nameErr = $("#nameError");
  const $emailErr = $("#emailError");
  const $msgErr = $("#msgError");
  const $success = $("#formSuccess");

  function setError($input, $err, msg) {
    $input.addClass("input-error");
    $err.text(msg);
  }

  function clearError($input, $err) {
    $input.removeClass("input-error");
    $err.text("");
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  // Live validation
  $nameInput.on("input", function () {
    $(this).val().trim().length >= 2
      ? clearError($nameInput, $nameErr)
      : setError($nameInput, $nameErr, "⚠ Name must be at least 2 characters.");
  });

  $emailInput.on("input", function () {
    isValidEmail($(this).val().trim())
      ? clearError($emailInput, $emailErr)
      : setError(
          $emailInput,
          $emailErr,
          "⚠ Please enter a valid email address.",
        );
  });

  $msgInput.on("input", function () {
    $(this).val().trim().length >= 10
      ? clearError($msgInput, $msgErr)
      : setError(
          $msgInput,
          $msgErr,
          "⚠ Message must be at least 10 characters.",
        );
  });

  $form.on("submit", function (e) {
    e.preventDefault();
    $success.text("");
    let valid = true;

    const name = $nameInput.val().trim();
    const email = $emailInput.val().trim();
    const msg = $msgInput.val().trim();

    if (name.length < 2) {
      setError($nameInput, $nameErr, "⚠ Name must be at least 2 characters.");
      valid = false;
    } else {
      clearError($nameInput, $nameErr);
    }

    if (!isValidEmail(email)) {
      setError($emailInput, $emailErr, "⚠ Please enter a valid email address.");
      valid = false;
    } else {
      clearError($emailInput, $emailErr);
    }

    if (msg.length < 10) {
      setError($msgInput, $msgErr, "⚠ Message must be at least 10 characters.");
      valid = false;
    } else {
      clearError($msgInput, $msgErr);
    }

    if (!valid) return;

    const $btn = $form.find('button[type="submit"]');
    $btn
      .prop("disabled", true)
      .html('<i class="fa-solid fa-spinner fa-spin"></i> Sending…');

    // ── Replace this with your deployed Apps Script Web App URL ──
    const SHEET_URL =
      "https://script.google.com/macros/s/AKfycbzcfsXeUOL0h_t06vnff-nPbuyHBvbVPjVnr8H6lERUXWhILKLmPUzB5hLNgysqpTz_/exec";

    const payload = {
      timestamp: new Date().toISOString(),
      name: name,
      email: email,
      message: msg,
    };

    fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors", // Apps Script requires no-cors
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(() => {
        $success.html("✓ Message received! I'll get back to you within 24h.");
        $form[0].reset();
        $btn
          .prop("disabled", false)
          .html('<i class="fa-solid fa-paper-plane"></i> ./send_message.sh');
      })
      .catch(() => {
        $success.html(
          '<span style="color:var(--clr-pink)">⚠ Something went wrong. Please email me directly.</span>',
        );
        $btn
          .prop("disabled", false)
          .html('<i class="fa-solid fa-paper-plane"></i> ./send_message.sh');
      });
  });

  /* ═══════════════════════════════════════════════════════════
     9. FOOTER YEAR
     ═══════════════════════════════════════════════════════════ */
  $("#footerYear").text(new Date().getFullYear());

  /* ═══════════════════════════════════════════════════════════
     10. TOOL CARDS — random glow color on hover
     ═══════════════════════════════════════════════════════════ */
  const glowColors = [
    "rgba(0,255,157,0.35)",
    "rgba(0,212,255,0.35)",
    "rgba(176,106,255,0.35)",
    "rgba(255,77,166,0.25)",
    "rgba(255,221,0,0.25)",
  ];

  $(".tool-card").each(function (i) {
    const clr = glowColors[i % glowColors.length];
    $(this)
      .on("mouseenter", function () {
        $(this).css(
          "box-shadow",
          `0 0 28px ${clr}, 0 12px 40px rgba(0,0,0,0.4)`,
        );
      })
      .on("mouseleave", function () {
        $(this).css("box-shadow", "");
      });
  });

  /* ═══════════════════════════════════════════════════════════
     11. INTERACTIVE TERMINAL
     ═══════════════════════════════════════════════════════════ */
  const $termOutput = $("#termOutput");
  const $termInput = $("#termInput");

  // ── Command database ──────────────────────────────────────
  const COMMANDS = {
    help: () => [
      { t: "info", v: "Available commands:" },
      { t: "blank" },
      {
        t: "bullet",
        v: '<span class="t-line-key">whoami</span>       — About me',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">skills</span>       — Technical skill set',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">experience</span>   — Work history',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">projects</span>     — Notable projects',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">education</span>    — Academic background',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">contact</span>      — How to reach me',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">hobbies</span>      — What I do for fun',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">setup</span>        — My dev environment',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">clear</span>        — Clear terminal',
      },
      { t: "blank" },
    ],

    whoami: () => [
      { t: "out", v: "┌─────────────────────────────────────┐" },
      { t: "out", v: "│      KAILASH BADU — PROFILE         │" },
      { t: "out", v: "└─────────────────────────────────────┘" },
      { t: "blank" },
      {
        t: "bullet",
        v: '<span class="t-line-key">Name       :</span> Kailash Badu',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">Role       :</span> Backend Developer & DevOps Engineer',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">Location   :</span> Pulchwok, Lalitpur, Nepal',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">Experience :</span> 2.5+ years in web development',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">Focus      :</span> CI/CD, containerization, backend architecture',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">OS         :</span> Fedora Linux (btw)',
      },
      { t: "bullet", v: '<span class="t-line-key">Editor     :</span> Vim' },
      { t: "bullet", v: '<span class="t-line-key">Shell      :</span> Bash' },
      { t: "blank" },
      {
        t: "info",
        v: "Building reliable web solutions from Kathmandu. Open to new opportunities.",
      },
      { t: "blank" },
    ],

    skills: () => [
      { t: "info", v: "$ cat skills.json" },
      { t: "blank" },
      { t: "out", v: '<span class="t-line-key">Languages  :</span>' },
      { t: "bullet", v: "JavaScript          ██████████░░  Advanced" },
      { t: "bullet", v: "PHP                 ████████░░░░  Intermediate" },
      { t: "bullet", v: "SQL                 ████████░░░░  Intermediate" },
      { t: "bullet", v: "Bash                ████████░░░░  Intermediate" },
      { t: "blank" },
      { t: "out", v: '<span class="t-line-key">Frontend   :</span>' },
      { t: "bullet", v: "HTML5, CSS3, React, Next.js" },
      { t: "blank" },
      { t: "out", v: '<span class="t-line-key">Backend    :</span>' },
      {
        t: "bullet",
        v: "Node.js, Express, REST APIs, WordPress / WooCommerce",
      },
      { t: "blank" },
      { t: "out", v: '<span class="t-line-key">DevOps     :</span>' },
      { t: "bullet", v: "Docker, Kubernetes, Terraform, GitHub Actions, Jenkins, Linux" },
      { t: "blank" },
      { t: "out", v: '<span class="t-line-key">Databases  :</span>' },
      { t: "bullet", v: "MySQL, PostgreSQL, SQLite" },
      { t: "blank" },
    ],

    experience: () => [
      { t: "info", v: "$ cat experience.log" },
      { t: "blank" },
      {
        t: "out",
        v: '<span class="t-line-key">[ May 2023 – Present ]  Web Developer @ Jasper IT, Lalitpur</span>',
      },
      {
        t: "bullet",
        v: "Build static websites with PHP, HTML, CSS & JavaScript",
      },
      {
        t: "bullet",
        v: "Develop dynamic sites by customising WordPress themes",
      },
      {
        t: "bullet",
        v: "Implement WooCommerce solutions for eCommerce clients",
      },
      { t: "bullet", v: "Lead the development team & handle troubleshooting" },
      { t: "bullet", v: "Ensure smooth, responsive & functional deliverables" },
      { t: "blank" },
    ],

    projects: () => [
      { t: "info", v: "$ ls -la ~/projects/" },
      { t: "blank" },

      {
        t: "out",
        v: '<span class="t-line-key">CodeSage</span>   [Web App / AI]',
      },
      {
        t: "bullet",
        v: "Intelligent code review platform using Google Gemini API",
      },
      {
        t: "bullet",
        v: "TypeScript, Node.js, Express, PostgreSQL, Prisma ORM",
      },
      { t: "blank" },

      {
        t: "out",
        v: '<span class="t-line-key">Daily Planner</span>   [Web App / Full-Stack]',
      },
      {
        t: "bullet",
        v: "Secure full-stack planner with JWT auth, MongoDB, and vanilla JS UI",
      },
      {
        t: "bullet",
        v: "TypeScript, Node.js, Express, MongoDB, Responsive Design",
      },
      { t: "blank" },

      {
        t: "out",
        v: '<span class="t-line-key">AuthWithMERN</span>   [Backend / MERN]',
      },
      {
        t: "bullet",
        v: "Learned auth flows with JWT & Mailtrap email integration",
      },
      { t: "bullet", v: "TypeScript, Node.js, Express, MongoDB, JWT" },
      { t: "blank" },

      {
        t: "out",
        v: '<span class="t-line-key">Infowave IT Solutions</span>   [WordPress]',
      },
      {
        t: "bullet",
        v: "WordPress site with custom themes, responsive design, dynamic content",
      },
      { t: "bullet", v: "Bootstrap, JavaScript, MySQL, WordPress Plugins" },
      { t: "blank" },
    ],

    education: () => [
      { t: "info", v: "$ cat education.txt" },
      { t: "blank" },
      {
        t: "out",
        v: '<span class="t-line-key">[ Jan 2022 – Jul 2026 ]  Bachelor\'s Degree</span>',
      },
      { t: "bullet", v: "Computer & Information Sciences, General" },
      { t: "bullet", v: "IOST — Tribhuvan University, Nepal" },
      { t: "blank" },
      { t: "out", v: '<span class="t-line-key">Certifications :</span>' },
      { t: "bullet", v: "AI for You: Training and Assessment" },
      { t: "blank" },
    ],

    contact: () => [
      { t: "info", v: "$ cat contact.conf" },
      { t: "blank" },
      {
        t: "bullet",
        v: '<span class="t-line-key">Phone    :</span> +977 9843952547',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">Email    :</span> kailashbaduatwork@gmail.com',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">LinkedIn :</span> linkedin.com/in/kailashbadu-9200142b3',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">Location :</span> Lalitpur, Nepal',
      },
      { t: "blank" },
      {
        t: "info",
        v: "Available for freelance & full-time roles. Response within 24h.",
      },
      { t: "blank" },
    ],

    hobbies: () => [
      { t: "info", v: "$ cat hobbies.txt" },
      { t: "blank" },
      { t: "bullet", v: "🏏🏓 Cricket & Table Tennis" },
      { t: "bullet", v: "💻 Building personal projects" },
      {
        t: "bullet",
        v: "📚 Reading: systems design, technology, sci-fi, and philosophy",
      },
      {
        t: "bullet",
        v: "🏔️ Weekend hiking, trail running, and nature exploration",
      },
      { t: "bullet", v: "☕ Specialty coffee enthusiast — pour-over purist" },
      { t: "blank" },
    ],

    setup: () => [
      { t: "info", v: "$ neofetch --minimal" },
      { t: "blank" },
      {
        t: "bullet",
        v: '<span class="t-line-key">OS       :</span> Fedora Linux x86_64',
      },
      { t: "bullet", v: '<span class="t-line-key">Shell    :</span> Bash' },
      { t: "bullet", v: '<span class="t-line-key">Editor   :</span> Vim' },
      {
        t: "bullet",
        v: '<span class="t-line-key">Browser  :</span> Chrome',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">Terminal :</span> GNOME Terminal',
      },
      {
        t: "bullet",
        v: '<span class="t-line-key">Font     :</span> JetBrains Mono',
      },
      { t: "blank" },
    ],

    clear: () => null, // special — handled separately
  };

  // ── Render helpers ────────────────────────────────────────
  function promptHTML() {
    return (
      '<span class="prompt-user">kailash</span>' +
      '<span class="prompt-at">@</span>' +
      '<span class="prompt-host">fedora</span>' +
      '<span class="prompt-colon">:</span>' +
      '<span class="prompt-dir">~</span>' +
      '<span class="prompt-sym">$</span> '
    );
  }

  function appendLine(html, cls) {
    $termOutput.append(
      $("<span>")
        .addClass("t-line " + cls)
        .html(html),
    );
  }

  function printLines(lines) {
    lines.forEach(function (l) {
      switch (l.t) {
        case "out":
          appendLine(l.v, "t-line-out");
          break;
        case "info":
          appendLine(l.v, "t-line-info");
          break;
        case "bullet":
          appendLine(l.v, "t-line-out t-line-bullet");
          break;
        case "err":
          appendLine(l.v, "t-line-err");
          break;
        case "blank":
          appendLine("", "t-line-blank");
          break;
      }
    });
    $termOutput.scrollTop($termOutput[0].scrollHeight);
  }

  // ── Boot message ──────────────────────────────────────────
  function bootTerminal() {
    appendLine(
      '<span class="t-line-info">Welcome to Kailash\'s interactive portfolio terminal.</span>',
      "t-line-out",
    );
    appendLine(
      'Type <span class="t-line-key">help</span> to see available commands, or click a suggestion below.',
      "t-line-out",
    );
    appendLine("", "t-line-blank");
    $termOutput.scrollTop(0);
  }
  bootTerminal();

  // ── Run a command ─────────────────────────────────────────
  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Echo the command
    appendLine(
      promptHTML() +
        '<span class="t-line-cmd-text">' +
        $("<span>").text(raw).html() +
        "</span>",
      "t-line-cmd",
    );

    if (cmd === "clear") {
      $termOutput.empty();
      return;
    }

    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd]();
      if (result) printLines(result);
    } else {
      appendLine(
        'bash: <span class="t-line-key">' +
          $("<span>").text(cmd).html() +
          '</span>: command not found. Type <span class="t-line-key">help</span> for a list.',
        "t-line-err",
      );
      appendLine("", "t-line-blank");
    }
    $termOutput.scrollTop($termOutput[0].scrollHeight);
  }

  // ── Keyboard input ────────────────────────────────────────
  const history = [];
  let histIdx = -1;

  $termInput.on("keydown", function (e) {
    if (e.key === "Enter") {
      const val = $(this).val();
      if (val.trim()) {
        history.unshift(val);
        histIdx = -1;
      }
      runCommand(val);
      $(this).val("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx < history.length - 1) histIdx++;
      $(this).val(history[histIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) histIdx--;
      else {
        histIdx = -1;
        $(this).val("");
        return;
      }
      $(this).val(history[histIdx] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = $(this).val().trim().toLowerCase();
      const match = Object.keys(COMMANDS).find((k) => k.startsWith(partial));
      if (match) $(this).val(match);
    }
  });

  // ── Hint buttons ──────────────────────────────────────────
  $(document).on("click", ".t-hint-btn", function () {
    runCommand($(this).data("cmd"));
    $termInput.focus();
  });

  // Click anywhere in terminal → focus input
  $(".interactive-terminal").on("click", function () {
    $termInput.focus();
  });

  /* ═══════════════════════════════════════════════════════════
     12. PROJECT CARDS — tilt effect on mouse move
     ═══════════════════════════════════════════════════════════ */
  $(document).on("mousemove", ".project-card", function (e) {
    const card = $(this)[0];
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotY = dx * 6; // max ±6 deg
    const rotX = -dy * 4;
    $(this).css(
      "transform",
      `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
    );
  });

  $(document).on("mouseleave", ".project-card", function () {
    $(this).css("transform", "");
  });

  /* ═══════════════════════════════════════════════════════════
     13. BACK-TO-TOP on logo click (already handled by smooth scroll)
         + keyboard accessibility for hamburger
     ═══════════════════════════════════════════════════════════ */
  $hamburger.on("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      $(this).trigger("click");
    }
  });
}); // end document.ready
