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
  const VIEW_KEY  = "pf_view";   // "cli" | "gui"
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

  // ── Centralised view-mode helpers ──────────────────────────
  function setGuiMode() {
    const $curtain = $("#mode-curtain");
    $curtain.addClass("active");

    setTimeout(() => {
      $("body").removeClass("cli-mode");
      $("#viewToggle .toggle-label").text("CLI");
      localStorage.setItem(VIEW_KEY, "gui");
      $(window).trigger("resize");
    }, 400);

    setTimeout(() => {
      $curtain.removeClass("active");
    }, 900);
  }

  function setCliMode() {
    const $curtain = $("#mode-curtain");
    $curtain.addClass("active");

    setTimeout(() => {
      $("body").addClass("cli-mode");
      $("#viewToggle .toggle-label").text("GUI");
      localStorage.setItem(VIEW_KEY, "cli");
      setTimeout(() => $("#mainCliInput").focus(), 100);
      window.scrollTo(0, 0);
    }, 400);

    setTimeout(() => {
      $curtain.removeClass("active");
    }, 900);
  }

  // Restore saved view preference (default: GUI so about/projects show on first load)
  const savedView = localStorage.getItem(VIEW_KEY);
  if (savedView === "cli") {
    setCliMode();
  } else {
    setGuiMode(); // GUI is the default — content visible immediately
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
     4. TYPED.JS (Moved to dynamic injection)
     ═══════════════════════════════════════════════════════════ */
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

  /* AOS initialization moved to end of script after dynamic content injection */


  /* ═══════════════════════════════════════════════════════════
     7. SLICK CAROUSEL — testimonials (initialized in initDynamicContent after content is injected)
     ═══════════════════════════════════════════════════════════ */

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
      { t: "bullet", v: '<span class="t-line-key">whoami</span>       — About me' },
      { t: "bullet", v: '<span class="t-line-key">skills</span>       — Technical skill set' },
      { t: "bullet", v: '<span class="t-line-key">experience</span>   — Work history' },
      { t: "bullet", v: '<span class="t-line-key">projects</span>     — Notable projects' },
      { t: "bullet", v: '<span class="t-line-key">education</span>    — Academic background' },
      { t: "bullet", v: '<span class="t-line-key">contact</span>      — How to reach me' },
      { t: "bullet", v: '<span class="t-line-key">hobbies</span>      — What I do for fun' },
      { t: "bullet", v: '<span class="t-line-key">certifications</span> — My certifications' },
      { t: "bullet", v: '<span class="t-line-key">blogs</span>          — My latest blog posts' },
      { t: "bullet", v: '<span class="t-line-key">setup</span>        — My dev environment' },
      { t: "bullet", v: '<span class="t-line-key">clear</span>        — Clear terminal' },
      { t: "bullet", v: '<span class="t-line-key">cli</span>          — Go to full-screen CLI' },
      { t: "blank" },
    ],

    whoami: () => [
      { t: "out", v: "┌─────────────────────────────────────┐" },
      { t: "out", v: "│      " + PORTFOLIO_DATA.terminalProfile.header + "         │" },
      { t: "out", v: "└─────────────────────────────────────┘" },
      { t: "blank" },
      { t: "bullet", v: '<span class="t-line-key">Name       :</span> ' + PORTFOLIO_DATA.terminalProfile.name },
      { t: "bullet", v: '<span class="t-line-key">Role       :</span> ' + PORTFOLIO_DATA.terminalProfile.role },
      { t: "bullet", v: '<span class="t-line-key">Location   :</span> ' + PORTFOLIO_DATA.terminalProfile.location },
      { t: "bullet", v: '<span class="t-line-key">Experience :</span> ' + PORTFOLIO_DATA.terminalProfile.experience },
      { t: "bullet", v: '<span class="t-line-key">Focus      :</span> ' + PORTFOLIO_DATA.terminalProfile.focus },
      { t: "bullet", v: '<span class="t-line-key">OS         :</span> ' + PORTFOLIO_DATA.terminalProfile.os },
      { t: "bullet", v: '<span class="t-line-key">Editor     :</span> ' + PORTFOLIO_DATA.terminalProfile.editor },
      { t: "bullet", v: '<span class="t-line-key">Shell      :</span> ' + PORTFOLIO_DATA.terminalProfile.shell },
      { t: "blank" },
      { t: "info", v: PORTFOLIO_DATA.terminalProfile.footer },
      { t: "blank" },
    ],

    skills: () => {
      let res = [
        { t: "info", v: "$ cat skills.json" },
        { t: "blank" },
        { t: "out", v: '<span class="t-line-key">Languages  :</span>' }
      ];
      PORTFOLIO_DATA.skills.languages.forEach(l => {
        res.push({ t: "bullet", v: `${l.name.padEnd(20)}${l.bar}  ${l.level}` });
      });
      res.push({ t: "blank" });
      res.push({ t: "out", v: '<span class="t-line-key">Frontend   :</span>' });
      res.push({ t: "bullet", v: PORTFOLIO_DATA.skills.frontend });
      res.push({ t: "blank" });
      res.push({ t: "out", v: '<span class="t-line-key">Backend    :</span>' });
      res.push({ t: "bullet", v: PORTFOLIO_DATA.skills.backend });
      res.push({ t: "blank" });
      res.push({ t: "out", v: '<span class="t-line-key">DevOps     :</span>' });
      if (Array.isArray(PORTFOLIO_DATA.skills.devops)) {
        PORTFOLIO_DATA.skills.devops.forEach(s => {
          res.push({ t: "bullet", v: `${s.name.padEnd(20)}${s.bar}  ${s.level}` });
        });
      } else {
        res.push({ t: "bullet", v: PORTFOLIO_DATA.skills.devops });
      }
      res.push({ t: "blank" });
      res.push({ t: "out", v: '<span class="t-line-key">Databases  :</span>' });
      res.push({ t: "bullet", v: PORTFOLIO_DATA.skills.databases });
      res.push({ t: "blank" });
      return res;
    },

    experience: () => {
      let res = [
        { t: "info", v: "$ cat experience.log" },
        { t: "blank" }
      ];
      PORTFOLIO_DATA.experience.forEach(exp => {
        res.push({ t: "out", v: `<span class="t-line-key">[ ${exp.period} ]  ${exp.role} @ ${exp.company}, ${exp.location}</span>` });
        exp.tasks.forEach(task => res.push({ t: "bullet", v: task }));
        res.push({ t: "blank" });
      });
      return res;
    },

    projects: () => {
      let res = [
        { t: "info", v: "$ ls -la ~/projects/" },
        { t: "blank" }
      ];
      PORTFOLIO_DATA.projects.forEach(p => {
        res.push({ t: "out", v: `<span class="t-line-key">${p.title}</span>   [${p.tag}]` });
        res.push({ t: "bullet", v: p.description });
        let stackList = p.stack.map(s => s.title).join(", ");
        res.push({ t: "bullet", v: stackList });
        res.push({ t: "blank" });
      });
      return res;
    },

    education: () => {
      let res = [
        { t: "info", v: "$ cat education.txt" },
        { t: "blank" }
      ];
      
      const eduList = PORTFOLIO_DATA.about.education || [];
      if (Array.isArray(eduList)) {
        eduList.forEach(edu => {
          res.push({ t: "out", v: `<span class="t-line-key">[ ${edu.period} ]  ${edu.degree}</span>` });
          res.push({ t: "bullet", v: `${edu.school} (${edu.details})` });
          res.push({ t: "blank" });
        });
      } else {
        // Fallback if cache is still holding the old string format
        res.push({ t: "out", v: '<span class="t-line-key">[ Jan 2022 – Jul 2026 ]  Bachelor\'s Degree</span>' });
        res.push({ t: "bullet", v: eduList });
        res.push({ t: "blank" });
      }

      res.push({ t: "out", v: '<span class="t-line-key">Certifications :</span>' });
      PORTFOLIO_DATA.certifications.forEach(cert => {
        res.push({ t: "bullet", v: `${cert.title} (${cert.issuer})` });
      });
      res.push({ t: "blank" });
      return res;
    },

    contact: () => [
      { t: "info", v: "$ cat contact.conf" },
      { t: "blank" },
      { t: "bullet", v: '<span class="t-line-key">Phone    :</span> ' + PORTFOLIO_DATA.contact.phone },
      { t: "bullet", v: '<span class="t-line-key">Email    :</span> ' + PORTFOLIO_DATA.contact.email },
      { t: "bullet", v: '<span class="t-line-key">LinkedIn :</span> ' + PORTFOLIO_DATA.contact.linkedin },
      { t: "bullet", v: '<span class="t-line-key">Location :</span> ' + PORTFOLIO_DATA.contact.location },
      { t: "blank" },
      { t: "info", v: PORTFOLIO_DATA.contact.availability },
      { t: "blank" },
    ],

    hobbies: () => {
      let res = [
        { t: "info", v: "$ cat hobbies.txt" },
        { t: "blank" }
      ];
      PORTFOLIO_DATA.hobbies.forEach(h => res.push({ t: "bullet", v: h }));
      res.push({ t: "blank" });
      return res;
    },

    certifications: () => {
      let res = [
        { t: "info", v: "$ ls -la ~/certifications/" },
        { t: "blank" }
      ];
      PORTFOLIO_DATA.certifications.forEach(c => {
        res.push({ t: "out", v: `<span class="t-line-key">${c.title}</span>   [${c.issuer}]` });
        res.push({ t: "bullet", v: `Date: ${c.date}` });
        if (c.skills && c.skills.length > 0) {
          let skillsText = c.skills.map(s => s.title).join(", ");
          res.push({ t: "bullet", v: `Skills: ${skillsText}` });
        }
        res.push({ t: "blank" });
      });
      return res;
    },

    blogs: () => {
      let res = [
        { t: "info", v: "$ ls -la ~/blogs/" },
        { t: "blank" }
      ];
      PORTFOLIO_DATA.blogs.forEach(b => {
        res.push({ t: "out", v: `<span class="t-line-key">${b.title}</span>` });
        res.push({ t: "bullet", v: `Date: ${b.date}` });
        res.push({ t: "bullet", v: b.excerpt });
        res.push({ t: "blank" });
      });
      return res;
    },

    setup: () => [
      { t: "info", v: "$ neofetch --minimal" },
      { t: "blank" },
      { t: "bullet", v: '<span class="t-line-key">OS       :</span> ' + PORTFOLIO_DATA.setup.os },
      { t: "bullet", v: '<span class="t-line-key">Shell    :</span> ' + PORTFOLIO_DATA.setup.shell },
      { t: "bullet", v: '<span class="t-line-key">Editor   :</span> ' + PORTFOLIO_DATA.setup.editor },
      { t: "bullet", v: '<span class="t-line-key">Browser  :</span> ' + PORTFOLIO_DATA.setup.browser },
      { t: "bullet", v: '<span class="t-line-key">Terminal :</span> ' + PORTFOLIO_DATA.setup.terminal },
      { t: "bullet", v: '<span class="t-line-key">Font     :</span> ' + PORTFOLIO_DATA.setup.font },
      { t: "blank" },
    ],

    clear: () => null, // special — handled separately
    cli: () => null, // special — handled separately
  };

  // ── Render helpers ────────────────────────────────────────
  function promptHTML() {
    return (
      '<span class="prompt-user">kailash</span>' +
      '<span class="prompt-at">@</span>' +
      '<span class="prompt-host">devops</span>' +
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
    const ascii = [
      "  _  __      _ _           _     ",
      " | |/ /     (_) |         | |    ",
      " | ' /  __ _ _| | __ _ ___| |__  ",
      " |  <  / _` | | |/ _` / __| '_ \\ ",
      " | . \\| (_| | | | (_| \\__ \\ | | |",
      " |_|\\_\\\\__,_|_|_|\\__,_|___/_| |_|"
    ].join("\n");
    
    appendLine('<pre style="color: var(--accent); font-weight: bold;">' + ascii + '</pre>', "t-line-out");

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

    if (cmd === "cli") {
      setCliMode();
      return;
    }

    let executeCmd = cmd;
    if (cmd === "ls") executeCmd = "projects";

    if (COMMANDS[executeCmd]) {
      const result = COMMANDS[executeCmd]();
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
  /* ═══════════════════════════════════════════════════════════
     14. PROJECT FILTERING
     ═══════════════════════════════════════════════════════════ */
  const $filterBtns = $(".filter-btn");
  const $projectCards = $(".project-card");

  function filterProjects(category) {
    $(".project-card").each(function () {
      const pCat = $(this).attr("data-category");
      if (category === "all" || pCat === category) {
        $(this).removeClass("hide").css("opacity", 0).animate({ opacity: 1 }, 300);
      } else {
        $(this).addClass("hide");
      }
    });
  }

  $filterBtns.on("click", function () {
    $filterBtns.removeClass("active");
    $(this).addClass("active");
    const filterValue = $(this).attr("data-filter");
    filterProjects(filterValue);
  });

  // Project filtering default logic moved to dynamic injection

  /* ═══════════════════════════════════════════════════════════
     15. CLI / GUI TOGGLE
     ═══════════════════════════════════════════════════════════ */
  $("#viewToggle").on("click", function () {
    if ($("body").hasClass("cli-mode")) {
      setGuiMode();
    } else {
      setCliMode();
    }
  });

  $("#tGuiBtn").on("click", function () {
    setGuiMode();
  });

  /* ═══════════════════════════════════════════════════════════
     16. MAIN CLI TERMINAL LOGIC
     ═══════════════════════════════════════════════════════════ */
  const $mainTermOutput = $("#mainCliOutput");
  const $mainTermInput = $("#mainCliInput");
  const mainHistory = [];
  let mainHistIdx = -1;

  const MAIN_COMMANDS = {
    // ── Help (CLI-specific: includes gui command instead of cli) ──
    help: () => [
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">about</span>          - about Kailash' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">blogs</span>          - my latest blog posts' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">certifications</span> - my certifications' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">clear</span>          - clear the terminal' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">contact</span>        - how to reach me' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">echo</span>        - print out anything' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">education</span>   - my education background' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">email</span>       - send an email to me' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">experience</span>  - work history' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">gui</span>         - go to my portfolio in GUI' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">help</span>        - check available commands' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">history</span>     - view command history' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">hobbies</span>     - what I do for fun' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">projects</span>    - view projects that I\'ve coded' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">pwd</span>         - print current working directory' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">setup</span>       - my dev environment' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">skills</span>      - technical skill set' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">socials</span>     - check out my social accounts' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">themes</span>      - check available themes' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">welcome</span>     - display hero section' },
      { t: "bullet", v: '<span class="t-line-key" style="color:var(--accent)">whoami</span>      - about current user' },
      { t: "blank" },
      { t: "info", v: 'Tab or Ctrl + i => autocompletes the command' },
      { t: "info", v: 'Up Arrow        => go back to previous command' },
      { t: "info", v: 'Ctrl + l        => clear the terminal' },
    ],

    // ── Shared commands — point directly to GUI COMMANDS (single source of truth) ──
    education:  COMMANDS.education,
    projects:   COMMANDS.projects,
    skills:     COMMANDS.skills,
    experience: COMMANDS.experience,
    contact:    COMMANDS.contact,
    hobbies:    COMMANDS.hobbies,
    certifications: COMMANDS.certifications,
    blogs:      COMMANDS.blogs,
    setup:      COMMANDS.setup,
    whoami:     COMMANDS.whoami,

    // ── CLI-only commands (or commands missing from GUI COMMANDS) ──
    about: () => PORTFOLIO_DATA.about.paragraphs.map(p => ({ t: "out", v: p.replace(/<\/?[^>]+(>|$)/g, "") })),
    socials: () => PORTFOLIO_DATA.socials.map((s, i) => ({ t: "out", v: `<a href="${s.url}" target="_blank" style="color: #4ade80">${i + 1}. ${s.name}</a>` })),
    email: () => {
       window.location.href = `mailto:${PORTFOLIO_DATA.general.email}`;
       return [{ t: "out", v: `Opening default email client for ${PORTFOLIO_DATA.general.email}...` }];
    },
    pwd: () => [
      { t: "out", v: "/home/kailashbadu" }
    ],
    themes: () => [
      { t: "out", v: "Available themes:" },
      { t: "out", v: "- dark (default)" },
      { t: "out", v: "- light" },
      { t: "info", v: 'Use "themes toggle" to switch.' }
    ],
    echo: (args) => [
      { t: "out", v: args.join(" ") }
    ],
    history: () => {
      return mainHistory.map((cmd, i) => ({ t: "out", v: `${i + 1}  ${cmd}` })).reverse();
    },
  };

  function mainAppendHtml(html, cls = "t-line-out") {
    $mainTermOutput.append($("<span>").addClass("t-line " + cls).html(html));
  }

  function mainBootTerminal() {
    $mainTermOutput.empty();
    const ascii = [
      "  _  __      _ _           _     ",
      " | |/ /     (_) |         | |    ",
      " | ' /  __ _ _| | __ _ ___| |__  ",
      " |  <  / _` | | |/ _` / __| '_ \\ ",
      " | . \\| (_| | | | (_| \\__ \\ | | |",
      " |_|\\_\\\\__,_|_|_|\\__,_|___/_| |_|"
    ].join("\n");
    mainAppendHtml('<pre style="color: var(--accent); font-weight: bold;">' + ascii + '</pre>');
    
    if (typeof PORTFOLIO_DATA !== "undefined") {
      const d = PORTFOLIO_DATA;
      mainAppendHtml('<span style="color:var(--accent);font-weight:700;font-size:1.05em;">' + d.general.name + '</span> <span style="color:var(--text-muted);">// ' + d.general.role + '</span>');
      mainAppendHtml("", "t-line-blank");
      
      mainAppendHtml('<span style="color:var(--border-glow);">──────────────────────────────────────────────────</span>');
      mainAppendHtml("", "t-line-blank");

      mainAppendHtml('<span style="color:var(--accent2);">$ cat about.txt</span>', "t-line-info");
      mainAppendHtml("", "t-line-blank");
      d.about.paragraphs.forEach(p => {
        const clean = p.replace(/<\\?[^>]+(>|$)/g, "");
        mainAppendHtml(clean);
        mainAppendHtml("", "t-line-blank");
      });

      mainAppendHtml('<span style="color:var(--accent2);">$ ls tools/</span>', "t-line-info");
      mainAppendHtml("", "t-line-blank");
      const toolNames = d.tools.map(t => t.name).join("  ·  ");
      mainAppendHtml('<span style="color:var(--accent3);">' + toolNames + '</span>');
      mainAppendHtml("", "t-line-blank");

      mainAppendHtml('<span style="color:var(--border-glow);">──────────────────────────────────────────────────</span>');
      mainAppendHtml("", "t-line-blank");
    }

    mainAppendHtml(
      'Switch to GUI: <a href="#" onclick="window.runMainCommand(\'gui\'); return false;" style="color:var(--accent);text-decoration:underline;">\'gui\'</a>' +
      '  ·  Commands: <span style="color:var(--accent);">\'help\'</span>'
    );
    mainAppendHtml("", "t-line-blank");
  }

  function runMainCommand(raw) {
    const args = raw.trim().split(" ");
    const cmd = args[0].toLowerCase();
    if (!cmd) return;

    // Echo prompt + command
    mainAppendHtml(
      '<span class="prompt-user" style="color:#facc15">kailashbadu</span><span class="prompt-at" style="color:#7d8590">@</span><span class="prompt-host" style="color:#4ade80">devops</span><span class="prompt-colon" style="color:#7d8590">:</span><span class="prompt-dir" style="color:#38bdf8">~</span><span class="prompt-sym" style="color:#7d8590">$</span> ' +
      raw
    );

    if (cmd === "clear") {
      $mainTermOutput.empty();
      return;
    }

    if (cmd === "gui") {
      setGuiMode();
      return;
    }

    if (cmd === "welcome") {
      mainBootTerminal();
      return;
    }

    if (cmd === "themes" && args[1] === "toggle") {
      $("#themeToggle").click();
      const newTheme = $("body").attr("data-theme") === "light" ? "light" : "dark";
      mainAppendHtml(`Switched to ${newTheme} theme.`, "t-line-info");
      mainAppendHtml("", "t-line-blank");
      $mainTermOutput.scrollTop($mainTermOutput[0].scrollHeight);
      return;
    }

    let executeCmd = cmd;
    if (cmd === "ls") executeCmd = "projects";

    if (MAIN_COMMANDS[executeCmd]) {
      const result = MAIN_COMMANDS[executeCmd](args.slice(1));
      if (result) {
        result.forEach(l => {
          let cls = "t-line-out";
          if (l.t === "err") cls = "t-line-err";
          if (l.t === "info") cls = "t-line-info";
          if (l.t === "blank") cls = "t-line-blank";
          if (l.t === "bullet") cls = "t-line-out t-line-bullet";
          mainAppendHtml(l.v || "", cls);
        });
      }
    } else {
      mainAppendHtml(`Command not found: ${cmd}. Type 'help' for available commands.`, "t-line-err");
    }
    
    mainAppendHtml("", "t-line-blank");
    $mainTermOutput.scrollTop($mainTermOutput[0].scrollHeight);
  }

  $mainTermInput.on("keydown", function (e) {
    if (e.key === "Enter") {
      const val = $(this).val();
      if (val.trim()) {
        mainHistory.unshift(val);
        mainHistIdx = -1;
      }
      runMainCommand(val);
      $(this).val("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (mainHistIdx < mainHistory.length - 1) mainHistIdx++;
      $(this).val(mainHistory[mainHistIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (mainHistIdx > 0) mainHistIdx--;
      else {
        mainHistIdx = -1;
        $(this).val("");
        return;
      }
      $(this).val(mainHistory[mainHistIdx] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = $(this).val().trim().toLowerCase();
      const match = Object.keys(MAIN_COMMANDS).concat(["clear", "gui", "welcome"]).find((k) => k.startsWith(partial));
      if (match) $(this).val(match);
    }
  });

  // Global Ctrl+L shortcut for main terminal
  $(document).on("keydown", function (e) {
    if (e.ctrlKey && e.key.toLowerCase() === "l" && $("body").hasClass("cli-mode")) {
      e.preventDefault();
      $mainTermOutput.empty();
    }
  });

  // Focus input on click
  $("#main-cli-overlay").on("click", function() {
    $mainTermInput.focus();
  });

  mainBootTerminal();

  // Expose runMainCommand globally so inline onclick="runMainCommand('gui')" works
  window.runMainCommand = runMainCommand;

  /* ═══════════════════════════════════════════════════════════
     17. DYNAMIC CONTENT INJECTION (Synchronous from content.js)
     ═══════════════════════════════════════════════════════════ */
  function initDynamicContent() {
    if (typeof PORTFOLIO_DATA === "undefined") {
      console.error("PORTFOLIO_DATA is not defined. Make sure content.js is loaded.");
      return;
    }
    const data = PORTFOLIO_DATA;

    // 1. Hero
    $("#hero-subtitle").text(data.general.subtitle);
    $("#hero-cv-btn").attr("href", data.general.resumeLink);

    if (typeof Typed !== "undefined") {
      new Typed("#typedOutput", {
        strings: data.general.heroTyped,
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 1800,
        startDelay: 600,
        loop: true,
        showCursor: false,
      });
    }

    // 2. About
    data.about.paragraphs.forEach(p => {
      $("#about-paragraphs").append($("<p>").html(p));
    });
    data.about.stats.forEach(s => {
      $("#about-stats").append(`
        <div class="stat-item">
          <span class="stat-num">${s.num}</span>
          <span class="stat-label">${s.label}</span>
        </div>
      `);
    });

    // 3. Tools
    data.tools.forEach((t, i) => {
      let iconHtml = t.icon ? `<i class="${t.icon} tool-icon"></i>` : `<img src="${t.img}" alt="${t.name}" style="width:2.2rem;height:2.2rem;" loading="lazy" />`;
      $("#tools-grid").append(`
        <div class="tool-card" data-aos="zoom-in" data-aos-delay="${(i % 10) * 60}" aria-label="${t.name}">
          ${iconHtml}
          <span>${t.name}</span>
        </div>
      `);
    });

    // 4. Projects
    data.projects.forEach((p, i) => {
      let stackHtml = p.stack.map(s => {
        let style = s.bg ? 'style="background-color: #fff; padding: 2px; border-radius: 2px;"' : '';
        return `<img width="20" height="20" title="${s.title}" src="${s.img}" alt="${s.title}" ${style} loading="lazy" />`;
      }).join('');
      
      let demoLink = p.liveUrl ? `<a href="${p.liveUrl}" class="overlay-btn" aria-label="View live demo" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${p.liveText || 'Live'}</a>` : '';

      $("#projects-grid").append(`
        <article class="project-card hide" data-category="${p.category}" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
          <div class="project-img-wrap">
            <img src="${p.image}" alt="screenshot for ${p.title} project" loading="lazy" />
            <div class="project-overlay">
              ${demoLink}
              <a href="${p.githubUrl}" class="overlay-btn overlay-btn-gh" aria-label="View on GitHub"><i class="fa-brands fa-github"></i> GitHub</a>
            </div>
          </div>
          <div class="project-info">
            <span class="project-tag">${p.tag}</span>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <h4 style="margin: 15px 0">Tools Used</h4>
            <div class="project-stack" style="display: flex; align-items: center; flex-wrap: wrap; gap: 15px;">
              ${stackHtml}
            </div>
          </div>
        </article>
      `);
    });

    // Initialize filtering
    setTimeout(() => filterProjects("devops"), 100);

    // 5. Testimonials
    data.testimonials.forEach(t => {
      $("#testimonials-slider").append(`
        <div class="testimonial-card">
          <div class="t-quote"><i class="fa-solid fa-quote-left"></i></div>
          <p class="t-text">${t.quote}</p>
          <div class="t-author">
            <div class="t-avatar" aria-hidden="true">${t.initials}</div>
            <div>
              <strong>${t.author}</strong>
              <span>${t.role}</span>
            </div>
          </div>
        </div>
      `);
    });

    if ($.fn.slick) {
      $("#testimonials-slider").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
      });
    }

    // CLI commands already reference COMMANDS directly — no overwrites needed.

    // 6. Certifications
    if (data.certifications) {
      data.certifications.forEach((cert, i) => {
        let skillsHtml = "";
        if (cert.skills && cert.skills.length > 0) {
          let stackHtml = cert.skills.map(s => {
            let style = s.bg ? 'style="background-color: #fff; padding: 2px; border-radius: 2px;"' : '';
            return `<img width="20" height="20" title="${s.title}" src="${s.img}" alt="${s.title}" ${style} loading="lazy" />`;
          }).join('');
          
          skillsHtml = `
            <div class="project-stack" style="display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
              ${stackHtml}
            </div>
          `;
        }

        $("#certifications-grid").append(`
          <article class="cert-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
            <div class="cert-image-wrapper">
              <img src="${cert.image}" alt="${cert.title} Certificate" class="cert-image" loading="lazy" />
            </div>
            <div class="cert-meta">
              <span class="cert-date"><i class="fa-regular fa-calendar"></i> ${cert.date}</span>
              <span class="cert-issuer">${cert.issuer}</span>
            </div>
            <h3>${cert.title}</h3>
            ${skillsHtml}
          </article>
        `);
      });
    }

    // 7. Blogs
    if (data.blogs) {
      data.blogs.forEach((b, i) => {
        $("#blogs-grid").append(`
          <article class="blog-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
            <div class="blog-img-wrap">
              <img src="${b.image}" alt="${b.title}" loading="lazy" />
            </div>
            <div class="blog-info">
              <div class="blog-meta">
                <span><i class="fa-regular fa-calendar"></i> ${b.date}</span>
                <span><i class="fa-brands fa-medium"></i> Medium</span>
              </div>
              <h3>${b.title}</h3>
              <p class="blog-excerpt">${b.excerpt}</p>
              <a href="${b.url}" target="_blank" class="blog-link">
                Read full article <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </article>
        `);
      });
    }

    // 8. Dynamic HTML for Contact
    $("#contact-text").text(data.contact.availability);
    $("#contact-list").html(`
      <li><i class="fa-solid fa-terminal"></i><span>${data.contact.email}</span></li>
      <li><i class="fa-solid fa-phone"></i><span>${data.contact.phone}</span></li>
      <li><i class="fa-solid fa-location-dot"></i><span>${data.contact.location}</span></li>
      <li><i class="fa-brands fa-linkedin"></i><span>${data.contact.linkedin}</span></li>
    `);

    // 8. Dynamic HTML for Footer
    $("#footer-tagline").html(`<span class="prompt-sym">$</span> echo "${data.footer.tagline}"`);
    $("#footer-description").text(data.footer.description);
    
    // The GUI commands are now reading dynamically from PORTFOLIO_DATA directly.
  }

  // Run immediately
  initDynamicContent();

  // Initialize AOS AFTER dynamic content is in the DOM
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 350,
      easing: "ease-out",
      once: true,
      offset: 40,
      delay: 0,
    });
    // Refresh to catch injected elements
    AOS.refresh();
  }

  /* ═══════════════════════════════════════════════════════════
     18. PREMIUM TERMINAL-THEMED CUSTOM CURSOR
     ═══════════════════════════════════════════════════════════ */
  (function initCustomCursor() {
    // Only initialize custom cursor on devices that support hover / hover interaction
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    // 1. Create and inject cursor HTML elements
    const $dot = $('<div class="custom-cursor-dot"></div>');
    const $outline = $('<div class="custom-cursor-outline"></div>');
    
    // Set initial offscreen coordinates so they don't flash in the top-left on boot
    $dot.css({ opacity: 0, transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' });
    $outline.css({ opacity: 0, transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' });
    
    $('body').append($dot).append($outline);

    // 2. State variables
    let mouse = { x: -100, y: -100 }; // mouse target position
    let dotPos = { x: -100, y: -100 }; // dot position (follows mouse instantly or fast)
    let outlinePos = { x: -100, y: -100 }; // outline follower position (smooth spring physics)
    let isClicked = false;

    // 3. Mouse move tracking
    $(document).on('mousemove', function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Make custom cursor elements visible on first move
      $dot.css('opacity', 1);
      $outline.css('opacity', 1);
    });

    // 4. Mouse leave/enter browser viewport behavior
    $(document).on('mouseleave', function() {
      $dot.css('opacity', 0);
      $outline.css('opacity', 0);
    }).on('mouseenter', function() {
      $dot.css('opacity', 1);
      $outline.css('opacity', 1);
    });

    // 5. Track interactive hover elements
    const hoverSelector = 'a, button, input, textarea, select, [role="button"], .tool-card, .project-card, .testimonial-card, .t-hint-btn, .hamburger, .theme-toggle, .t-header-btn';
    
    $(document).on('mouseenter', hoverSelector, function() {
      $dot.addClass('hovered');
      $outline.addClass('hovered');
    }).on('mouseleave', hoverSelector, function() {
      $dot.removeClass('hovered');
      $outline.removeClass('hovered');
    });

    // Handle clicks for active cursor feedback (slight shrink)
    $(document).on('mousedown', function() {
      isClicked = true;
    }).on('mouseup', function() {
      isClicked = false;
    });

    // 6. Core Render Loop (Interpolation / Spring Physics)
    function renderLoop() {
      // Spring physics variables
      // Dot position moves fast
      dotPos.x += (mouse.x - dotPos.x) * 0.35;
      dotPos.y += (mouse.y - dotPos.y) * 0.35;
      
      // Outline position uses slower interpolation/damping for trailing lag
      outlinePos.x += (mouse.x - outlinePos.x) * 0.16;
      outlinePos.y += (mouse.y - outlinePos.y) * 0.16;
      
      // Determine click scaling
      const scaleDot = isClicked ? 0.7 : 1.0;
      const scaleOutline = isClicked ? 0.85 : 1.0;
      
      // Position custom cursor elements using hardware-accelerated translate3d
      $dot.css('transform', `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%) scale(${scaleDot})`);
      $outline.css('transform', `translate3d(${outlinePos.x}px, ${outlinePos.y}px, 0) translate(-50%, -50%) scale(${scaleOutline})`);

      requestAnimationFrame(renderLoop);
    }

    // Kickstart loop
    requestAnimationFrame(renderLoop);
  })();

}); // end document.ready

