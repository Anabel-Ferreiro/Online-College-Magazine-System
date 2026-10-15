"use strict";

const STORAGE_KEY = "margin-college-magazine-prototype-v1";
const SESSION_KEY = "margin-college-magazine-user-v1";
const DEMO_PASSWORD = "demo123";
const SUBJECTS = ["Arts & Humanities", "Business", "Education", "Health Sciences", "Science & Technology", "Social Sciences"];
const CATEGORIES = ["Campus & Community", "Culture & Ideas", "Research & Discovery", "Student Life"];
const DEMO_USERS = [
  { id: "student", name: "Maya Patel", email: "maya@student.usf.edu", password: DEMO_PASSWORD, role: "student", major: "Environmental Science", school: "University of South Florida", verified: true, rejections: 0 },
  { id: "repeat-author", name: "Jordan Lee", email: "jordan@student.usf.edu", password: DEMO_PASSWORD, role: "student", major: "Biology", school: "University of South Florida", verified: true, rejections: 1 },
  { id: "frequent-author", name: "Sam Rivera", email: "sam@harbor.edu", password: DEMO_PASSWORD, role: "student", major: "Literature", school: "Harbor College", verified: true, rejections: 0 },
  { id: "faculty", name: "Dr. Alex Morgan", email: "faculty@usf.edu", password: DEMO_PASSWORD, role: "faculty", major: "Sociology", school: "University of South Florida", verified: true, rejections: 0 },
  { id: "guest", name: "Casey Taylor", email: "reader@example.com", password: DEMO_PASSWORD, role: "guest", major: "Community reader", school: "Harbor College", verified: true, rejections: 0 },
  { id: "editor", name: "Nina Brooks", email: "editor@usf.edu", password: DEMO_PASSWORD, role: "editor", major: "Journalism", school: "University of South Florida", verified: true, rejections: 0, editorVerified: true },
  { id: "moderator", name: "Avery Chen", email: "moderator@usf.edu", password: DEMO_PASSWORD, role: "moderator", major: "Communications", school: "University of South Florida", verified: true, rejections: 0 },
  { id: "admin", name: "Morgan Ellis", email: "admin@harbor.edu", password: DEMO_PASSWORD, role: "administrator", major: "Information Systems", school: "Harbor College", verified: true, rejections: 0 },
  { id: "editor-applicant", name: "Riley Adams", email: "riley@student.usf.edu", password: DEMO_PASSWORD, role: "student", major: "Communications", school: "University of South Florida", verified: true, rejections: 0, editorRequest: "Journalism coursework and student publication experience" }
];

const now = Date.now();
const ago = (days) => new Date(now - days * 86400000).toISOString();
const makeArticle = (id, title, userId, subject, category, text, status, daysAgo, extra = {}) => ({
  id, title, userId, subject, category, text, contentType: "Article", sources: [], status, createdAt: ago(daysAgo),
  ratings: [], comments: [], history: [], feedback: "", screening: { appropriate: true, requirements: true, duplicate: false }, ...extra
});
const SEED_DATA = {
  users: DEMO_USERS,
  articles: [
    makeArticle("published-gardens", "The Small, Powerful Work of a Campus Garden", "student", "Science & Technology", "Campus & Community",
      "A campus garden is more than a patch of soil. It can be a shared classroom where students learn how food systems work, exchange practical skills, and notice the seasons together. Starting small—with herbs, native plants, or a single raised bed—makes it easier for a student group to care for the space through a busy semester.\n\nAt the University of South Florida, student volunteers can pair garden work with coursework in ecology and community health. A short weekly visit is enough to record pollinators, test a simple compost routine, or share fresh produce. The most durable gardens make room for many kinds of participation: planning, watering, documenting, and teaching.\n\nA garden does not solve every challenge in a food system, but it gives a campus a place to ask better questions and practice answering them together.", "published", 32, { sources: ["https://www.usf.edu/"], ratings: [{ userId: "faculty", stars: 5 }, { userId: "guest", stars: 4 }, { userId: "frequent-author", stars: 5 }], comments: [{ id: "comment-1", userId: "faculty", text: "A thoughtful connection between a shared space and hands-on learning.", createdAt: ago(8) }, { id: "comment-2", userId: "guest", text: "The idea of making room for many kinds of participation really resonates.", createdAt: ago(5) }], history: [{ actorId: "editor", action: "Edited for clarity and forwarded for moderator review.", date: ago(30) }, { actorId: "moderator", action: "Approved and published.", date: ago(29) }] }),
    makeArticle("published-reading", "A Reading List for the In-Between", "frequent-author", "Arts & Humanities", "Culture & Ideas",
      "Some semesters seem to happen in the spaces between plans: the walk after a lecture, a conversation that lasts longer than expected, or the quiet hour before a deadline. These books make good company in those in-between moments. Each offers a different way to pay attention to a changing place and the people who make it feel like home.\n\nA useful reading list does not have to be long. Begin with a short essay by a local writer, add a book that challenges a familiar perspective, and leave a little room for recommendations from the people around you. Reading together—even when everyone chooses a different book—can make an unfamiliar campus feel more welcoming.", "published", 25, { sources: ["https://www.loc.gov/"], ratings: [{ userId: "student", stars: 4 }, { userId: "faculty", stars: 5 }], comments: [{ id: "comment-3", userId: "student", text: "I added a few recommendations from my seminar.", createdAt: ago(11) }], history: [{ actorId: "editor", action: "Copy edit completed.", date: ago(23) }, { actorId: "admin", action: "Approved and published.", date: ago(22) }] }),
    makeArticle("published-learning", "What We Learn When We Learn Together", "frequent-author", "Education", "Student Life",
      "Learning together begins with a small act of curiosity: asking a classmate how they reached an answer, comparing notes after a lecture, or making space for a question that might otherwise go unasked. Students bring different experiences to the same room, and those differences can help everyone see a subject more clearly.\n\nA study group does not need a perfect plan. Choose one topic, invite a few classmates, and decide how everyone can contribute. One person might explain a concept aloud; another might create a diagram or connect it to a current event. Rotating these roles makes the group more inclusive and keeps the work from falling to one person.", "published", 19, { sources: ["https://www.ed.gov/"], ratings: [{ userId: "student", stars: 5 }, { userId: "guest", stars: 4 }, { userId: "faculty", stars: 4 }], comments: [], history: [{ actorId: "editor", action: "Edited for clarity and forwarded for moderator review.", date: ago(17) }, { actorId: "moderator", action: "Approved and published.", date: ago(16) }] }),
    makeArticle("published-harbor", "Listening to a Changing Shoreline", "frequent-author", "Social Sciences", "Research & Discovery",
      "Shorelines change gradually and all at once. At Harbor College, students who walk the waterfront can see how weather, public access, and community choices shape the same stretch of coast. Keeping a field journal turns an ordinary walk into a record: note the date, the tide, visible changes, and questions that need a closer look.\n\nThese observations are a starting point rather than a complete scientific study. Comparing notes with local monitoring groups can connect student curiosity to longer records and help a class ask useful questions about the places it calls home.", "published", 14, { sources: ["https://oceanservice.noaa.gov/"], ratings: [{ userId: "student", stars: 5 }, { userId: "faculty", stars: 5 }], comments: [{ id: "comment-4", userId: "faculty", text: "The distinction between an observation and a study is important.", createdAt: ago(4) }], history: [{ actorId: "editor", action: "Copy edit completed.", date: ago(12) }, { actorId: "admin", action: "Approved and published.", date: ago(11) }] }),
    makeArticle("waiting-editor", "A Student's Guide to Local Pollinators", "student", "Science & Technology", "Research & Discovery",
      "Even a small green space can support a surprising range of pollinators. Students who want to observe them can begin with a notebook, a quiet ten-minute visit, and a willingness to look closely. Record the time of day, weather, plant, and insect behavior without disturbing the habitat. Repeating the same observation over several weeks gives a more useful picture than a single visit.\n\nBeginner observers do not need to identify every species. Taking a clear photograph from a respectful distance and asking a campus naturalist or instructor for help is a good next step. This resource introduces field-note habits that make informal observations easier to share and compare.", "waiting-editor", 2, { sources: ["https://www.fs.usda.gov/wildflowers/pollinators/"], screening: { appropriate: true, requirements: true, duplicate: false } }),
    makeArticle("waiting-moderator", "Building Better Study Groups", "frequent-author", "Education", "Student Life",
      "The best study groups make it easier for everyone to participate. Start with a clear goal for the meeting, such as reviewing one lecture or practicing a type of problem. Invite classmates to take turns leading a discussion, explaining a concept, or writing down questions for later. Sharing these small responsibilities keeps the group focused without turning study time into another class.\n\nBefore the group meets, check that the room works for everyone and agree on a time limit. A brief recap at the end helps members decide what to review next. Students can also bring questions to office hours when the group runs into something it cannot resolve.", "waiting-moderator", 1, { sources: ["https://www.ed.gov/"], screening: { appropriate: true, requirements: true, duplicate: false }, history: [{ actorId: "editor", action: "Reorganized the introduction and copy-edited the draft.", date: ago(0) }] }),
    makeArticle("returned", "A First Look at Community Food Systems", "repeat-author", "Business", "Campus & Community",
      "Community food systems connect growers, food businesses, institutions, and the people who eat. Students can map the connections around their own campus by asking where ingredients come from, how food is distributed, and what happens to surplus. A small map built from public information can reveal useful questions for a class project.", "returned", 7, { feedback: "Please add a second source and explain how students can verify the local examples before drawing conclusions.", rejectionReason: "The first review requested additional sourcing and verification context." }),
    makeArticle("discarded", "Quick Notes on Campus Study Habits", "repeat-author", "Social Sciences", "Student Life",
      "Study habits differ between students, and one method will not suit every schedule. This short draft needs more original analysis and supporting sources before it can be considered for publication.", "discarded", 16, { feedback: "A prior submission from this contributor has already been returned. This second rejection is discarded and cannot be resubmitted." }),
    makeArticle("removed", "A Guide to Shared Campus Spaces", "student", "Social Sciences", "Campus & Community",
      "Shared spaces work best when everyone can find a seat, understand how to use the room, and leave it ready for the next person. This guide collects practical suggestions for student groups planning meetings, study sessions, and campus events.\n\nBegin by checking the room's posted access and booking information. Make sure the space fits the group, explain any setup needs in advance, and leave enough time to return furniture to its original arrangement. Clear signs and a short welcome help new members find the group without interrupting other campus activities.", "removed", 45, { feedback: "This sample article was removed after publication following a moderation review.", history: [{ actorId: "editor", action: "Edited for clarity.", date: ago(43) }, { actorId: "moderator", action: "Approved and published.", date: ago(42) }, { actorId: "admin", action: "Removed after a follow-up content review.", date: ago(3) }] }),
    makeArticle("duplicate-flagged", "A Student's Guide to Local Pollinators", "student", "Science & Technology", "Research & Discovery",
      "Even a small green space can support a surprising range of pollinators. Students who want to observe them can begin with a notebook, a quiet ten-minute visit, and a willingness to look closely. Record the time of day, weather, plant, and insect behavior without disturbing the habitat. Repeating the same observation over several weeks gives a more useful picture than a single visit.\n\nBeginner observers do not need to identify every species. Taking a clear photograph from a respectful distance and asking a campus naturalist or instructor for help is a good next step. This resource introduces field-note habits that make informal observations easier to share and compare.", "waiting-moderator", 0, { sources: ["https://www.fs.usda.gov/wildflowers/pollinators/"], duplicateOf: "waiting-editor", screening: { appropriate: true, requirements: true, duplicate: true }, duplicateReason: "This draft closely matches an earlier submission on the same subject and source.", history: [{ actorId: "editor", action: "Flagged as a likely duplicate and forwarded for moderator review.", date: ago(0) }] }),
    makeArticle("student-draft", "A More Welcoming First Week", "student", "Social Sciences", "Student Life",
      "The first week on campus can feel like a collection of unfamiliar maps, schedules, and names. Small, practical gestures can help new students feel that they belong. A classmate who shares a favorite quiet study spot or explains how to find an office can make a large campus feel more navigable.\n\nStudent organizations can also create low-pressure ways to meet. A short campus walk, a shared table at lunch, or an open question-and-answer session can help newcomers participate without needing to commit to a full schedule right away.", "published", 9, { sources: [], ratings: [{ userId: "faculty", stars: 5 }, { userId: "guest", stars: 5 }], comments: [], history: [{ actorId: "editor", action: "Copy edit completed and sent for moderator review.", date: ago(8) }, { actorId: "moderator", action: "Approved and published.", date: ago(7) }] })
  ],
  feedback: [{ id: "feedback-seed", userId: "student", text: "The article filters are easy to use. I would love more student research features.", createdAt: ago(6) }]
};

const app = document.getElementById("app");
const nav = document.getElementById("navigation");
const accountArea = document.getElementById("account-area");
const toast = document.getElementById("toast");
let toastTimer;
let data;
let currentUserId = localStorage.getItem(SESSION_KEY);
let filters = { school: "", subject: "", category: "" };

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    data = structuredClone(SEED_DATA);
    persist();
    return;
  }
  try {
    data = JSON.parse(saved);
    if (!Array.isArray(data.users) || !Array.isArray(data.articles) || !Array.isArray(data.feedback)) throw new Error("Saved data is incomplete.");
  } catch (error) {
    data = structuredClone(SEED_DATA);
    localStorage.removeItem(STORAGE_KEY);
    persist();
    notify("Saved demo data could not be read; the original sample data was restored.", true);
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    notify("Your browser could not save this change. Check available local storage.", true);
  }
}

function currentUser() {
  return data.users.find((user) => user.id === currentUserId) || null;
}

function userById(id) {
  return data.users.find((user) => user.id === id) || { name: "Former contributor", major: "—", school: "—" };
}

function notify(message, error = false) {
  toast.textContent = message;
  toast.classList.toggle("error", error);
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3300);
}

function setUser(id) {
  currentUserId = id;
  if (id) localStorage.setItem(SESSION_KEY, id);
  else localStorage.removeItem(SESSION_KEY);
  render();
}

function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  if (!hash) return { page: "home" };
  const [page, ...rest] = hash.split("/");
  return { page, id: rest.join("/") };
}

function go(page) {
  location.hash = page === "home" ? "#home" : `#${page}`;
}

function requireAccount(page) {
  if (!currentUser() && !["home", "login", "register"].includes(page)) {
    history.replaceState(null, "", "#home");
    return false;
  }
  return true;
}

function rolesForNav(user) {
  const items = [["browse", "Read"], ["submit", "Submit"], ["submissions", "My submissions"], ["feedback", "Feedback"], ["guide", "Prototype guide"]];
  if (user.role === "editor" && user.editorVerified) items.splice(3, 0, ["editor", "Editor queue"]);
  if (["moderator", "administrator"].includes(user.role)) items.splice(3, 0, ["moderation", "Review desk"]);
  return items;
}

function renderChrome(page) {
  const user = currentUser();
  nav.innerHTML = user ? rolesForNav(user).map(([href, text]) =>
    `<a class="nav-link ${page === href ? "active" : ""}" href="#${href}">${text}</a>`).join("") : "";
  accountArea.innerHTML = user
    ? `<span class="user-chip" title="${escapeHtml(user.name)}">${escapeHtml(user.name)} · ${escapeHtml(user.role)}</span><button class="text-button" data-action="logout" type="button">Sign out</button>`
    : `<a class="nav-link" href="#login">Sign in</a><a class="button subtle" href="#register">Create account</a>`;
  document.getElementById("display-tools").hidden = !user;
}

function pageHeading(eyebrow, title, description) {
  return `<header class="page-heading"><div class="eyebrow">${escapeHtml(eyebrow)}</div><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></header>`;
}

function homePage() {
  return `<section class="hero">
    <div class="hero-copy"><div class="eyebrow">A campus magazine for every voice</div>
      <h1>Ideas grow when <em>they’re shared.</em></h1>
      <p>Margin brings student writing, research, and resources into one thoughtful place—reviewed by editors, approved by moderators, and open to readers wherever they are.</p>
      <div class="button-row"><a class="button" href="#register">Join the magazine <span aria-hidden="true">→</span></a><a class="button secondary" href="#login">Sign in to read</a></div>
      <p class="small muted" style="margin-top:15px">Students, faculty, and community readers are welcome. An account is required to read and participate.</p>
    </div>
    <div class="hero-art" aria-label="Illustration of a campus magazine cover"><div class="art-paper"></div><div class="art-cover"><span class="cover-kicker">The campus edition · Vol. 01</span><span class="cover-circle"></span><span class="cover-title">A place for new ideas.</span><span class="cover-footer">STUDENT STORIES · RESEARCH · COMMUNITY</span></div></div>
  </section>
  <section class="section"><div class="section-heading"><div><div class="eyebrow">How it works</div><h2>Thoughtful by design.</h2></div></div>
    <div class="three-grid"><article class="card"><span class="step-number">01</span><h3>Students contribute</h3><p class="muted">Submit an article, essay, or resource with sources. School-email verification supports student eligibility.</p></article>
      <article class="card"><span class="step-number">02</span><h3>People review together</h3><p class="muted">Screening, editor revisions, and a moderator’s second review help each contribution meet the magazine’s standards.</p></article>
      <article class="card"><span class="step-number">03</span><h3>Everyone can read</h3><p class="muted">Registered students, faculty, and guests browse, listen, rate, comment on, and share published work.</p></article></div>
  </section>
  <section class="section callout"><strong>Built to grow.</strong> Participating schools are stored as account data, so new colleges can join without redesigning the magazine.</section>`;
}

function demoAccounts() {
  const samples = [
    ["Student", "maya@student.usf.edu"], ["Faculty", "faculty@usf.edu"], ["Guest", "reader@example.com"],
    ["Verified editor", "editor@usf.edu"], ["Moderator", "moderator@usf.edu"], ["Administrator", "admin@harbor.edu"]
  ];
  return `<div class="demo-box"><strong>Try a demo account</strong><p class="muted">All demo passwords: <code>${DEMO_PASSWORD}</code></p>${samples.map(([role, email]) =>
    `<div class="demo-row"><span>${escapeHtml(role)} · ${escapeHtml(email)}</span><button class="demo-login" data-action="demo-login" data-email="${escapeHtml(email)}" type="button">Sign in</button></div>`).join("")}</div>`;
}

function authPage(register) {
  return `<div class="auth-layout"><div class="auth-aside"><div class="eyebrow">${register ? "Find your place in the issue" : "Welcome back"}</div>
    <h1>${register ? "There’s room for your voice." : "Good to have you back."}</h1>
    <p class="muted">${register ? "Create a reader or student account to join a campus community built around ideas." : "Sign in to read, contribute, and take part in the campus magazine."}</p>
    ${demoAccounts()}</div>
    <section class="auth-card"><h2>${register ? "Create your account" : "Sign in"}</h2>
    ${register ? `<form id="register-form"><div class="field"><label for="reg-name">Name</label><input id="reg-name" name="name" autocomplete="name" required></div>
      <div class="field"><label for="reg-email">Email</label><input id="reg-email" name="email" type="email" autocomplete="email" required><div class="field-hint">Students and faculty must use an email ending in .edu. Students also complete simulated email verification. Guests can register with any email.</div></div>
      <div class="field"><label for="reg-password">Password</label><input id="reg-password" name="password" type="password" minlength="6" autocomplete="new-password" required></div>
      <div class="form-grid"><div class="field"><label for="reg-major">Major / field</label><input id="reg-major" name="major" required></div><div class="field"><label for="reg-school">College / school</label><input id="reg-school" name="school" list="school-list" required><datalist id="school-list">${schoolOptions()}</datalist></div></div>
      <div class="field"><label for="reg-role">Account type</label><select id="reg-role" name="role"><option value="student">Student</option><option value="faculty">Faculty</option><option value="guest">Guest reader</option></select></div>
      <div id="verification-fields" class="field"><button class="button secondary subtle" type="button" data-action="send-code">Send simulated verification code</button><p id="verification-note" class="field-hint">A demo code will be shown here after you request it.</p><label for="reg-code">School email verification code</label><input id="reg-code" name="verificationCode" inputmode="numeric" autocomplete="one-time-code"><div class="field-hint">Enter the simulated code shown above to verify school-email eligibility.</div></div>
      <button class="button" type="submit">Create account</button></form>
      <p class="small muted" style="margin-top:16px">Already registered? <a href="#login">Sign in</a>.</p>` :
      `<form id="login-form"><div class="field"><label for="login-email">Email</label><input id="login-email" name="email" type="email" autocomplete="username" required></div><div class="field"><label for="login-password">Password</label><input id="login-password" name="password" type="password" autocomplete="current-password" required></div><button class="button" type="submit">Sign in</button></form><p class="small muted" style="margin-top:16px">New to Margin? <a href="#register">Create an account</a>.</p>`}
    </section></div>`;
}

function schoolOptions() {
  return [...new Set(data.users.map((user) => user.school).filter(Boolean))].sort().map((school) => `<option value="${escapeHtml(school)}"></option>`).join("");
}

function averageRating(article) {
  if (!article.ratings.length) return null;
  return article.ratings.reduce((sum, rating) => sum + rating.stars, 0) / article.ratings.length;
}

function starText(value) {
  const rounded = Math.round(value || 0);
  return `${"★".repeat(rounded)}${"☆".repeat(5 - rounded)}`;
}

function articleCard(article) {
  const author = userById(article.userId);
  const average = averageRating(article);
  const historyCount = data.articles.filter((item) => item.userId === article.userId && item.status === "published").length;
  const credibility = historyCount >= 3 ? "Established contributor" : "";
  return `<article class="article-card"><div class="article-topline"><span class="pill">${escapeHtml(article.category)}</span><span class="small muted">${escapeHtml(article.contentType || "Article")} · ${escapeHtml(article.subject)}</span></div>
    <h3><button type="button" data-action="open-article" data-id="${escapeHtml(article.id)}">${escapeHtml(article.title)}</button></h3>
    <p class="article-excerpt">${escapeHtml(article.text)}</p>
    <div class="article-meta"><span>By ${escapeHtml(author.name)}</span><span>${escapeHtml(author.major)}</span><span>${escapeHtml(author.school)}</span>${credibility ? `<span class="pill">Established contributor</span>` : ""}</div>
    <div class="article-bottom"><span class="stars" aria-label="${average ? `${average.toFixed(1)} out of 5 stars` : "Not yet rated"}">${average ? `${starText(average)} ${average.toFixed(1)} (${article.ratings.length})` : "☆ Not yet rated"}</span><button class="text-button" data-action="open-article" data-id="${escapeHtml(article.id)}" type="button">Read article →</button></div></article>`;
}

function publishedArticles() {
  return data.articles.filter((article) => article.status === "published");
}

function browsePage() {
  const filtered = publishedArticles().filter((article) =>
    (!filters.school || userById(article.userId).school === filters.school) &&
    (!filters.subject || article.subject === filters.subject) &&
    (!filters.category || article.category === filters.category));
  const schools = [...new Set(data.users.map((user) => user.school).filter(Boolean))].sort();
  return `${pageHeading("The magazine", "Stories worth passing on.", "Browse reviewed and published student articles, essays, and resources from participating colleges.")}
    <div class="filter-bar"><div><label for="filter-school">College / school</label><select id="filter-school"><option value="">All colleges</option>${schools.map((school) => `<option ${filters.school === school ? "selected" : ""} value="${escapeHtml(school)}">${escapeHtml(school)}</option>`).join("")}</select></div>
    <div><label for="filter-subject">Subject</label><select id="filter-subject"><option value="">All subjects</option>${SUBJECTS.map((subject) => `<option ${filters.subject === subject ? "selected" : ""} value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`).join("")}</select></div>
    <div><label for="filter-category">Category</label><select id="filter-category"><option value="">All categories</option>${CATEGORIES.map((category) => `<option ${filters.category === category ? "selected" : ""} value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}</select></div></div>
    <div class="article-grid">${filtered.length ? filtered.map(articleCard).join("") : `<div class="empty-state">No published articles match these filters. Try another college, subject, or category.</div>`}</div>`;
}

function voiceInputButton() {
  return `<button class="button secondary subtle" data-action="voice-input" type="button">🎙 Dictate text</button><span class="field-hint">Voice input uses speech recognition supported by your browser.</span>`;
}

function submitPage() {
  const user = currentUser();
  if (!["student", "editor"].includes(user.role)) return `${pageHeading("Contribute", "Student submissions", "Only student contributors can submit content. Sign in with a student account to continue.")}<a class="button" href="#login">Switch account</a>`;
  return `${pageHeading("Contribute", "Bring an idea to the page.", "Submit an article, essay, or resource. Screening and review happen before publication. Your name, major, and college come from your account.")}
    <div class="notice"><strong>Contributor:</strong> ${escapeHtml(user.name)} · ${escapeHtml(user.major)} · ${escapeHtml(user.school)}${user.role === "editor" ? " (editor accounts can also submit as a student contributor)" : ""}</div>
    <section class="auth-card"><form id="submission-form"><div class="form-grid"><div class="field"><label for="submission-title">Title</label><input id="submission-title" name="title" maxlength="120" required></div>
      <div class="field"><label for="submission-type">Content type</label><select id="submission-type" name="contentType"><option>Article</option><option>Essay</option><option>Resource</option></select></div>
      <div class="field"><label for="submission-subject">Subject</label><select id="submission-subject" name="subject" required>${SUBJECTS.map((subject) => `<option>${escapeHtml(subject)}</option>`).join("")}</select></div>
      <div class="field"><label for="submission-category">Category</label><select id="submission-category" name="category" required>${CATEGORIES.map((category) => `<option>${escapeHtml(category)}</option>`).join("")}</select></div></div>
      <div class="field"><label for="submission-text">Content</label><textarea id="submission-text" name="text" minlength="60" required placeholder="Write at least 60 characters. Include original analysis and support factual claims with sources."></textarea><div class="field-hint">At least 60 characters. Please review and source your claims before submitting.</div>${voiceInputButton()}</div>
      <div class="field"><label for="submission-sources">Source links (optional, one per line)</label><textarea id="submission-sources" name="sources" style="min-height:75px" placeholder="https://example.edu/research"></textarea></div>
      <button class="button" type="submit">Run screening &amp; submit for review</button></form></section>`;
}

function statusInfo(status) {
  return ({
    "waiting-editor": ["Waiting for editor", "orange"],
    "waiting-moderator": ["Waiting for moderator", "orange"],
    returned: ["Returned for revision", "red"],
    discarded: ["Discarded", "gray"],
    removed: ["Removed", "gray"],
    replaced: ["Replaced by a newer version", "gray"],
    published: ["Published", ""]
  })[status] || [status, "gray"];
}

function submissionCard(article) {
  const [label, color] = statusInfo(article.status);
  const duplicate = article.screening?.duplicate;
  const feedback = article.feedback ? `<div class="feedback-note"><strong>Review feedback:</strong> ${escapeHtml(article.feedback)}</div>` : "";
  let actions = "";
  if (article.status === "returned") actions = `<button class="button subtle" data-action="revise" data-id="${escapeHtml(article.id)}" type="button">Revise &amp; resubmit</button>`;
  if (article.status === "published") actions = `<button class="button secondary subtle" data-action="request-change" data-id="${escapeHtml(article.id)}" type="button">Request a change</button>`;
  return `<article class="submission-card"><div class="submission-card-head"><div><h3>${escapeHtml(article.title)}</h3><div class="article-meta"><span>${escapeHtml(article.contentType || "Article")} · ${escapeHtml(article.category)} · ${escapeHtml(article.subject)}</span><span>Submitted ${new Date(article.createdAt).toLocaleDateString()}</span></div></div><span class="pill ${color}">${label}</span></div>
    <div class="screening ${duplicate ? "flagged" : ""}"><strong>Screening:</strong> Appropriate content · requirements checked · ${duplicate ? "Likely duplicate flagged for moderator decision" : "No likely duplicate found"}</div>${feedback}${actions}</article>`;
}

function submissionsPage() {
  const user = currentUser();
  const own = data.articles.filter((article) => article.userId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const historyCount = own.filter((article) => article.status === "published").length;
  return `${pageHeading("Your work", "A clear path from draft to page.", "Track submissions, read moderator feedback, and request reviewed changes to published work. Published articles cannot be edited directly.")}
    <div class="notice">Your publishing history: <strong>${historyCount} published ${historyCount === 1 ? "contribution" : "contributions"}</strong>. Consistent, quality work helps readers recognize your contributions across the magazine.</div>
    <div class="toolbar"><a class="button subtle" href="#submit">+ Submit a new contribution</a></div>
    <div class="submission-list">${own.length ? own.map(submissionCard).join("") : `<div class="empty-state">Your submissions will appear here.</div>`}</div>`;
}

function reviewScreening(article) {
  return `<div class="screening ${article.screening?.duplicate ? "flagged" : ""}"><strong>Automated screening:</strong> ${article.screening?.appropriate ? "No inappropriate-material match" : "Inappropriate-material match"} · ${article.screening?.requirements ? "Content requirements met" : "Content requirements need attention"} · ${article.screening?.duplicate ? `Likely duplicate${article.duplicateReason ? ` — ${escapeHtml(article.duplicateReason)}` : ""}` : "No likely duplicate detected"}</div>`;
}

function editorCard(article) {
  const author = userById(article.userId);
  const previous = author.rejections || 0;
  const [label, color] = statusInfo(article.status);
  const history = article.history?.length ? `<details class="small"><summary>Restricted edit history</summary><ul class="history-list">${article.history.map((entry) => `<li>${escapeHtml(userById(entry.actorId).name)} — ${escapeHtml(entry.action)} · ${new Date(entry.date).toLocaleDateString()}</li>`).join("")}</ul></details>` : "";
  return `<article class="submission-card"><div class="submission-card-head"><div><h3>${escapeHtml(article.title)}</h3><div class="article-meta"><span>${escapeHtml(article.contentType || "Article")} · ${escapeHtml(article.category)} · ${escapeHtml(article.subject)}</span><span>${escapeHtml(author.name)} · ${escapeHtml(author.major)} · ${escapeHtml(author.school)}</span><span>Submitted ${new Date(article.createdAt).toLocaleDateString()}</span><span>Previous rejections: ${previous}</span></div></div><span class="pill ${color}">${label}</span></div>${reviewScreening(article)}
    <p class="review-content">${escapeHtml(article.text)}</p>${article.sources?.length ? `<div class="small">Sources: ${article.sources.map(escapeHtml).join(" · ")}</div>` : ""}
    ${history}<form class="inline-form editor-form" data-id="${escapeHtml(article.id)}"><label for="editor-text-${escapeHtml(article.id)}">Edit content before moderator review</label><textarea id="editor-text-${escapeHtml(article.id)}" name="text" required>${escapeHtml(article.text)}</textarea><button class="button subtle" type="submit">Save edits &amp; send to moderator</button></form></article>`;
}

function editorPage() {
  const queue = data.articles.filter((article) => article.status === "waiting-editor").sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  return `${pageHeading("Editorial desk", "Make every draft stronger.", "Review screening results, make the required text changes, then send the submission to a moderator or administrator. Editors cannot approve or publish.")}
    <div class="submission-list">${queue.length ? queue.map(editorCard).join("") : `<div class="empty-state">The editor queue is clear. New student submissions will appear here.</div>`}</div>`;
}

function moderatorCard(article) {
  const author = userById(article.userId);
  const rejectionCount = author.rejections || 0;
  const [label, color] = statusInfo(article.status);
  const history = article.history?.length ? `<details class="small"><summary>Restricted edit history</summary><ul class="history-list">${article.history.map((entry) => `<li>${escapeHtml(userById(entry.actorId).name)} — ${escapeHtml(entry.action)} · ${new Date(entry.date).toLocaleDateString()}</li>`).join("")}</ul></details>` : "";
  return `<article class="submission-card"><div class="submission-card-head"><div><h3>${escapeHtml(article.title)}</h3><div class="article-meta"><span>${escapeHtml(article.contentType || "Article")} · ${escapeHtml(article.category)} · ${escapeHtml(article.subject)}</span><span>${escapeHtml(author.name)} · ${escapeHtml(author.major)} · ${escapeHtml(author.school)}</span><span>Contributor's previous rejections: ${rejectionCount}</span></div></div><span class="pill ${color}">${label}</span></div>${reviewScreening(article)}
    ${article.duplicateOf ? `<div class="feedback-note">Earlier match: <strong>${escapeHtml(data.articles.find((item) => item.id === article.duplicateOf)?.title || "Earlier content")}</strong></div>` : ""}
    <p class="review-content">${escapeHtml(article.text)}</p>${article.sources?.length ? `<div class="small">Sources: ${article.sources.map(escapeHtml).join(" · ")}</div>` : ""}
    <details class="inline-form"><summary>Edit content or review history</summary><form class="inline-form moderator-edit-form" data-id="${escapeHtml(article.id)}"><label for="mod-text-${escapeHtml(article.id)}">Moderator / administrator content edits</label><textarea id="mod-text-${escapeHtml(article.id)}" name="text" required>${escapeHtml(article.text)}</textarea><button class="button secondary subtle" type="submit">Save content edits</button></form>${history}</details>
    <form class="inline-form moderation-form" data-id="${escapeHtml(article.id)}"><label for="decision-${escapeHtml(article.id)}">Review decision / written feedback</label><textarea id="decision-${escapeHtml(article.id)}" name="feedback" placeholder="${article.screening?.duplicate ? "Explain why this duplicate should be denied." : "Required if returning or discarding."}"></textarea>
      <div class="submission-actions"><button class="button subtle" name="decision" value="approve" type="submit">Approve &amp; publish</button><button class="button secondary subtle" name="decision" value="return" type="submit">Return with feedback</button><button class="button danger subtle" name="decision" value="discard" type="submit">Discard / deny duplicate</button></div></form></article>`;
}

function editorEligibility() {
  const applicants = data.users.filter((user) => user.editorRequest && user.role !== "editor");
  return `<section class="section"><div class="section-heading"><div><div class="eyebrow">Editor eligibility</div><h2>Verify before granting access.</h2></div></div><p class="muted">Review the background and degree or topic requirements beyond school-email verification. Only a moderator or administrator can grant editor permissions.</p>
    <div class="submission-list">${applicants.length ? applicants.map((user) => `<article class="submission-card"><div class="submission-card-head"><div><h3>${escapeHtml(user.name)}</h3><div class="article-meta"><span>${escapeHtml(user.email)}</span><span>${escapeHtml(user.major)} · ${escapeHtml(user.school)}</span></div></div><span class="pill orange">Awaiting background verification</span></div><p class="small">Applicant background: ${escapeHtml(user.editorRequest)}</p><div class="submission-actions"><button class="button subtle" data-action="verify-editor" data-id="${escapeHtml(user.id)}" type="button">Verify background &amp; grant editor</button></div></article>`).join("") : `<div class="empty-state">No editor applications awaiting verification.</div>`}</div></section>`;
}

function moderationPage() {
  const queue = data.articles.filter((article) => article.status === "waiting-moderator").sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const user = currentUser();
  const published = data.articles.filter((article) => article.status === "published");
  const publicFeedback = data.feedback;
  return `${pageHeading(user.role === "administrator" ? "Administration & review" : "Moderation desk", "The second review matters.", "Check accuracy and appropriateness. Approve for publication, return with written feedback, deny duplicates, discard, edit, or remove content.")}
    <div class="submission-list">${queue.length ? queue.map(moderatorCard).join("") : `<div class="empty-state">No submissions are waiting for moderator review.</div>`}</div>
    ${editorEligibility()}
    <section class="section"><div class="section-heading"><div><div class="eyebrow">Published content</div><h2>Manage the magazine.</h2></div></div>
    <div class="submission-list">${published.length ? published.map((article) => `<article class="submission-card"><div class="submission-card-head"><div><h3>${escapeHtml(article.title)}</h3><div class="article-meta"><span>${escapeHtml(userById(article.userId).name)}</span><span>${escapeHtml(userById(article.userId).school)}</span></div></div><span class="pill">Published</span></div>
      <div class="submission-actions"><button class="button secondary subtle" data-action="edit-published" data-id="${escapeHtml(article.id)}" type="button">Edit content</button><button class="button danger subtle" data-action="remove-published" data-id="${escapeHtml(article.id)}" type="button">Remove from magazine</button></div>
      ${article.history?.length ? `<details class="small"><summary>Restricted edit history</summary><ul class="history-list">${article.history.map((entry) => `<li>${escapeHtml(userById(entry.actorId).name)} — ${escapeHtml(entry.action)} · ${new Date(entry.date).toLocaleDateString()}</li>`).join("")}</ul></details>` : ""}</article>`).join("") : `<div class="empty-state">No published content to manage.</div>`}</div></section>
    <section class="section"><div class="section-heading"><div><div class="eyebrow">Reader feedback</div><h2>Keep listening.</h2></div></div><div class="submission-list">${publicFeedback.length ? publicFeedback.slice().reverse().map((item) => `<article class="submission-card"><div class="article-meta"><span>${escapeHtml(userById(item.userId).name)}</span><span>${new Date(item.createdAt).toLocaleDateString()}</span></div><p style="margin:8px 0 0">${escapeHtml(item.text)}</p></article>`).join("") : `<div class="empty-state">No reader feedback yet.</div>`}</div></section>`;
}

function feedbackPage() {
  const user = currentUser();
  if (user.role !== "student") return `${pageHeading("Student feedback", "Your experience matters.", "The platform feedback form is available to student contributors.")}<div class="notice">Sign in with a student account to submit feedback.</div>`;
  return `${pageHeading("Student feedback", "Help us make Margin better.", "Share a concern or suggestion about your experience. Student feedback helps the platform improve.")}
    <section class="auth-card"><form id="feedback-form"><div class="field"><label for="feedback-text">Your feedback</label><textarea id="feedback-text" name="text" minlength="10" maxlength="1200" required placeholder="What worked well? What should we improve?"></textarea></div><button class="button" type="submit">Send feedback</button></form></section>`;
}

const CHECKLIST = [
  ["Student, faculty, guest, editor, moderator, and administrator roles", "login"],
  ["Student registration with school email and simulated verification", "register"],
  ["Guest registration with any email; name, password, major, and school", "register"],
  ["Account-required reading and engagement; public landing, login, and registration", "home"],
  ["Schools stored as data and selectable at registration", "register"],
  ["Browse published work and filter by college, subject, and category", "browse"],
  ["Article title, author, major, college, category, text, and sources", "browse"],
  ["Star ratings, displayed average, and stored ratings", "browse"],
  ["Comments on published articles", "browse"],
  ["External sharing of published articles", "browse"],
  ["Student platform feedback form and moderator feedback view", "feedback"],
  ["Text-to-speech and display font-size and contrast controls", "browse"],
  ["Article, essay, and resource submissions with sources", "submit"],
  ["Voice-to-text option for submission content", "submit"],
  ["Inappropriate-material screening and content requirement checks", "submit"],
  ["Older-first duplicate check using draft text, topic, and sources", "submit"],
  ["Submission statuses, moderator feedback, and returned revision", "submissions"],
  ["Published content change requests go through full review", "submissions"],
  ["Contributor publishing history with subtle credibility cues", "submissions"],
  ["Editor queue with screening results, editing, and forwarding for approval", "editor"],
  ["Moderator/administrator second review, approval, and publication", "moderation"],
  ["Written rejection feedback and first-return / second-discard rule", "moderation"],
  ["Moderator denial of a flagged duplicate", "moderation"],
  ["Restricted article edit history for editorial and moderation roles", "moderation"],
  ["Verified editor background and eligibility approval", "moderation"],
  ["Moderator/administrator content editing and published-content removal", "moderation"],
  ["Browser-only simulated data and resettable demo accounts and samples", "guide"]
];

function guidePage() {
  return `${pageHeading("About this prototype", "A clearer route from idea to issue.", "Margin is a browser-only demonstration of an online college magazine. Its sample accounts, submissions, reviews, ratings, and comments are simulated and stored in this browser.")}
    <div class="two-grid"><section class="card"><div class="eyebrow">Try each role</div><h3>Demo accounts</h3><p class="small muted">All demo accounts use password <code>${DEMO_PASSWORD}</code>. Choose a role to experience its pages and permissions.</p>${DEMO_USERS.filter((user) => ["student", "faculty", "guest", "editor", "moderator", "administrator"].includes(user.role)).map((user) => `<div class="demo-row"><span>${escapeHtml(user.role)} · ${escapeHtml(user.email)}</span><button class="demo-login" data-action="demo-login" data-email="${escapeHtml(user.email)}" type="button">Switch role</button></div>`).join("")}</section>
    <section class="card"><div class="eyebrow">Start fresh</div><h3>Reset demo data</h3><p class="small muted">Restore sample users, articles, ratings, comments, and review queues in this browser. Your own registrations and changes will be cleared.</p><button class="button danger subtle" data-action="reset-data" type="button">Reset all demo data</button></section></div>
    <section class="section"><div class="section-heading"><div><div class="eyebrow">Requirements coverage</div><h2>Prototype checklist.</h2></div></div><div class="checklist">${CHECKLIST.map(([text, page]) => `<div class="checklist-item"><span>${escapeHtml(text)}</span><a href="#${page}">Demonstrate →</a></div>`).join("")}</div></section>`;
}

function articlePage(id) {
  const article = data.articles.find((item) => item.id === id && item.status === "published");
  if (!article) return `<div class="article-detail"><a class="text-button" href="#browse">← Back to the magazine</a><div class="empty-state" style="margin-top:25px">This article is no longer available in the magazine.</div></div>`;
  const author = userById(article.userId);
  const average = averageRating(article);
  const user = currentUser();
  const myRating = article.ratings.find((rating) => rating.userId === user.id);
  const comments = article.comments.map((comment) => `<div class="comment"><strong>${escapeHtml(userById(comment.userId).name)}</strong><span>${escapeHtml(comment.text)}</span></div>`).join("");
  return `<article class="article-detail"><a class="text-button" href="#browse">← Back to the magazine</a><div class="eyebrow" style="margin-top:27px">${escapeHtml(article.contentType || "Article")} · ${escapeHtml(article.category)} · ${escapeHtml(article.subject)}</div><h1>${escapeHtml(article.title)}</h1>
    <div class="article-meta"><span>By ${escapeHtml(author.name)}</span><span>${escapeHtml(author.major)}</span><span>${escapeHtml(author.school)}</span>${data.articles.filter((item) => item.userId === author.id && item.status === "published").length >= 3 ? `<span class="pill">Established contributor</span>` : ""}</div>
    <div class="toolbar" style="margin-top:20px"><button class="button secondary subtle" data-action="listen" data-id="${escapeHtml(article.id)}" type="button">▶ Listen to article</button><button class="button secondary subtle" data-action="share" data-id="${escapeHtml(article.id)}" type="button">↗ Share article</button><span class="pill">Average rating: ${average ? `${average.toFixed(1)} / 5 · ${article.ratings.length} ${article.ratings.length === 1 ? "rating" : "ratings"}` : "Not yet rated"}</span></div>
    <div class="detail-body">${escapeHtml(article.text)}</div>${article.sources?.length ? `<section><h3>Links &amp; sources</h3><ul class="source-list">${article.sources.map((source) => `<li><a href="${safeUrl(source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source)}</a></li>`).join("")}</ul></section>` : ""}
    <section class="section engagement-box"><div><h3>Rate this article</h3><p class="small muted">Your rating is saved with your account.</p><form id="rating-form" data-id="${escapeHtml(article.id)}"><div class="rating-input" role="radiogroup" aria-label="Choose a rating from one to five stars">${[5, 4, 3, 2, 1].map((stars) => `<input id="star-${stars}" type="radio" name="stars" value="${stars}" aria-label="${stars} stars" ${myRating?.stars === stars ? "checked" : ""} required><label for="star-${stars}" title="${stars} stars">★</label>`).join("")}</div><button class="button subtle" style="margin-top:8px" type="submit">${myRating ? "Update rating" : "Submit rating"}</button></form></div>
    <div><h3>Join the conversation</h3><form id="comment-form" data-id="${escapeHtml(article.id)}"><label class="hidden" for="comment-text">Write a comment</label><textarea id="comment-text" name="text" minlength="2" maxlength="600" style="min-height:75px" placeholder="Write a thoughtful comment…" required></textarea><button class="button subtle" style="margin-top:8px" type="submit">Post comment</button></form></div></section>
    <section class="section"><h3>Comments (${article.comments.length})</h3><div class="comment-list">${comments || `<p class="muted small">Be the first to comment on this article.</p>`}</div></section></article>`;
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? escapeHtml(url.href) : "#";
  } catch {
    return "#";
  }
}

function render() {
  const { page, id } = route();
  if (!requireAccount(page)) return render();
  const user = currentUser();
  if ((page === "editor" && (user?.role !== "editor" || !user.editorVerified)) ||
      (page === "moderation" && !["moderator", "administrator"].includes(user?.role))) {
    history.replaceState(null, "", "#browse");
    return render();
  }
  renderChrome(page);
  const routes = {
    home: homePage, login: () => authPage(false), register: () => authPage(true), browse: browsePage,
    submit: submitPage, submissions: submissionsPage, editor: editorPage, moderation: moderationPage,
    feedback: feedbackPage, guide: guidePage
  };
  app.innerHTML = page === "article" ? articlePage(id) : (routes[page] || homePage)();
}

function screeningFor(text, sources, subject, category, excludeId) {
  const normalized = text.toLowerCase();
  const inappropriateTerms = ["kill yourself", "racial slur", "fuck", "shit", "bitch"];
  const matchedTerm = inappropriateTerms.find((term) => normalized.includes(term));
  if (matchedTerm) return { error: "The submission did not pass the inappropriate-material screen. Please revise the text before submitting." };
  if (text.trim().length < 60) return { error: "Please provide at least 60 characters of content before submitting." };

  const tokens = (value) => new Set(value.toLowerCase().match(/[a-z0-9]{4,}/g) || []);
  const textTokens = tokens(text);
  const prior = data.articles.filter((article) => article.id !== excludeId && article.subject === subject && article.category === category && !["discarded", "removed"].includes(article.status))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  let duplicateOf = null;
  for (const article of prior) {
    const priorTokens = tokens(article.text);
    const intersection = [...textTokens].filter((word) => priorTokens.has(word)).length;
    const union = new Set([...textTokens, ...priorTokens]).size || 1;
    const sharedSource = sources.some((source) => article.sources.some((existing) => existing.toLowerCase() === source.toLowerCase()));
    const sameTitle = article.title.trim().toLowerCase() === document.getElementById("submission-title")?.value.trim().toLowerCase();
    if (sameTitle || intersection / union >= 0.58 || (sharedSource && intersection / union >= 0.25)) {
      duplicateOf = article;
      break;
    }
  }
  return { screening: { appropriate: true, requirements: true, duplicate: Boolean(duplicateOf) }, duplicateOf };
}

function parseSources(value) {
  const sources = value.split(/\r?\n/).map((source) => source.trim()).filter(Boolean);
  for (const source of sources) {
    try {
      const parsed = new URL(source);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
    } catch {
      throw new Error("Each source must be a complete http:// or https:// link.");
    }
  }
  return sources;
}

function formValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function createSubmission(values, existing = null, changeRequestFor = null) {
  const sources = parseSources(values.sources || "");
  const result = screeningFor(values.text, sources, values.subject, values.category, existing?.id || changeRequestFor);
  if (result.error) throw new Error(result.error);
  const parentArticle = changeRequestFor ? data.articles.find((item) => item.id === changeRequestFor) : null;
  const article = existing || {
    id: `article-${crypto.randomUUID()}`, userId: currentUser().id, ratings: [], comments: [], history: [],
    createdAt: new Date().toISOString(), contentType: parentArticle?.contentType || values.contentType || "Article",
    ...(changeRequestFor ? { changeRequestFor } : {})
  };
  article.title = values.title.trim();
  article.subject = values.subject;
  article.category = values.category;
  article.text = values.text.trim();
  article.sources = sources;
  article.status = result.duplicateOf ? "waiting-moderator" : "waiting-editor";
  article.screening = result.screening;
  article.duplicateOf = result.duplicateOf?.id || null;
  article.duplicateReason = result.duplicateOf ? `A similar earlier submission, “${result.duplicateOf.title},” shares the subject and content or source links.` : "";
  article.feedback = "";
  article.history = [...(article.history || []), { actorId: currentUser().id, action: existing ? "Contributor revised and resubmitted for full review." : changeRequestFor ? `Contributor requested a reviewed change to ${parentArticle?.title || "published content"}.` : "Student submission received and screened.", date: new Date().toISOString() }];
  if (!existing) data.articles.push(article);
  persist();
  return article;
}

function login(email, password) {
  const user = data.users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user) throw new Error("Email or password is incorrect.");
  setUser(user.id);
  go("browse");
  notify(`Welcome, ${user.name}.`);
}

function requestVerificationCode() {
  const note = document.getElementById("verification-note");
  if (note) note.innerHTML = `Your simulated verification code is <strong>246810</strong>. Enter it below to continue.`;
}

function moderate(article, decision, feedback) {
  const user = currentUser();
  if (decision === "approve") {
    if (article.screening?.duplicate) throw new Error("A flagged duplicate cannot be approved. Deny it with a written reason or return it for revision.");
    const original = article.changeRequestFor
      ? data.articles.find((item) => item.id === article.changeRequestFor)
      : null;
    if (article.changeRequestFor && (!original || original.status !== "published")) {
      throw new Error("The original published article is no longer available. This change request cannot be approved.");
    }
    if (original) {
      article.ratings = original.ratings.map((rating) => ({ ...rating }));
      article.comments = original.comments.map((comment) => ({ ...comment }));
      original.status = "replaced";
      original.history.push({
        actorId: user.id,
        action: `Replaced by approved newer version "${article.title}".`,
        date: new Date().toISOString()
      });
    }
    article.status = "published";
    article.feedback = "";
    article.history.push({ actorId: user.id, action: "Approved for publication after second review.", date: new Date().toISOString() });
  } else if (decision === "return") {
    if (!feedback.trim()) throw new Error("Add written feedback before returning a submission.");
    const contributor = data.users.find((item) => item.id === article.userId);
    contributor.rejections = (contributor.rejections || 0) + 1;
    article.feedback = feedback.trim();
    if (contributor.rejections >= 2) {
      article.status = "discarded";
      article.feedback += " This contributor's second rejection means this content is discarded and cannot be resubmitted.";
      article.history.push({ actorId: user.id, action: "Second contributor rejection; content discarded.", date: new Date().toISOString() });
    } else {
      article.status = "returned";
      article.history.push({ actorId: user.id, action: "Returned to contributor with revision feedback.", date: new Date().toISOString() });
    }
  } else if (decision === "discard") {
    if (!feedback.trim()) throw new Error("Add a written reason before discarding or denying a duplicate.");
    article.status = "discarded";
    article.feedback = feedback.trim();
    article.history.push({ actorId: user.id, action: article.screening?.duplicate ? "Flagged duplicate denied and discarded." : "Content discarded after moderation review.", date: new Date().toISOString() });
  }
  persist();
}

function openEditModal(article) {
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><h2 id="modal-title">Edit published content</h2><button class="icon-button" data-action="close-modal" type="button" aria-label="Close">×</button></div><p class="small muted">Moderator edits are recorded in the restricted edit history.</p><form id="published-edit-form" data-id="${escapeHtml(article.id)}"><div class="field"><label for="published-edit-title">Title</label><input id="published-edit-title" name="title" value="${escapeHtml(article.title)}" required></div><div class="field"><label for="published-edit-text">Content</label><textarea id="published-edit-text" name="text" required>${escapeHtml(article.text)}</textarea></div><button class="button" type="submit">Save edit</button></form></section>`;
  document.body.append(modal);
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  try {
    if (action === "logout") { setUser(null); go("home"); }
    if (action === "demo-login") login(button.dataset.email, DEMO_PASSWORD);
    if (action === "send-code") requestVerificationCode();
    if (action === "open-article") { location.hash = `#article/${encodeURIComponent(id)}`; }
    if (action === "reset-data") {
      if (!confirm("Reset all browser-stored demo accounts and content to the original sample data?")) return;
      data = structuredClone(SEED_DATA);
      currentUserId = "student";
      localStorage.setItem(SESSION_KEY, currentUserId);
      persist();
      notify("Demo data has been restored.");
      render();
    }
    if (action === "verify-editor") {
      const applicant = data.users.find((user) => user.id === id);
      if (applicant && ["moderator", "administrator"].includes(currentUser()?.role)) {
        applicant.role = "editor";
        applicant.editorVerified = true;
        applicant.editorRequest = "";
        persist();
        notify(`${applicant.name} was verified and granted editor permissions.`);
        render();
      }
    }
    if (action === "revise" || action === "request-change") {
      const article = data.articles.find((item) => item.id === id);
      const isChange = action === "request-change";
      const source = article;
      const draft = isChange ? {
        ...structuredClone(source), id: `article-${crypto.randomUUID()}`, status: "waiting-editor",
        createdAt: new Date().toISOString(), feedback: "", ratings: [], comments: [], duplicateOf: null,
        history: [{ actorId: currentUser().id, action: `Change requested for published article ${source.id}; new version enters full review.`, date: new Date().toISOString() }],
        changeRequestFor: source.id
      } : source;
      app.innerHTML = `${pageHeading(isChange ? "Request a reviewed change" : "Revise returned submission", isChange ? "A new version, fully reviewed." : "Make the requested changes.", isChange ? "Your published article remains unchanged while the proposed revision goes through editor and moderator review." : `Moderator feedback: ${source.feedback}`)}
        <section class="auth-card"><form id="revision-form" data-id="${escapeHtml(draft.id)}" data-existing="${isChange ? "false" : "true"}" data-parent="${isChange ? escapeHtml(source.id) : ""}"><div class="field"><label for="revision-title">Title</label><input id="revision-title" name="title" value="${escapeHtml(source.title)}" required></div><div class="form-grid"><div class="field"><label for="revision-subject">Subject</label><select id="revision-subject" name="subject">${SUBJECTS.map((subject) => `<option ${source.subject === subject ? "selected" : ""}>${escapeHtml(subject)}</option>`).join("")}</select></div><div class="field"><label for="revision-category">Category</label><select id="revision-category" name="category">${CATEGORIES.map((category) => `<option ${source.category === category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}</select></div></div><div class="field"><label for="revision-text">Content</label><textarea id="revision-text" name="text" minlength="60" required>${escapeHtml(source.text)}</textarea>${voiceInputButton()}</div><div class="field"><label for="revision-sources">Source links (one per line)</label><textarea id="revision-sources" name="sources" style="min-height:75px">${escapeHtml((source.sources || []).join("\n"))}</textarea></div><button class="button" type="submit">${isChange ? "Submit new version for review" : "Resubmit revised content"}</button></form></section>`;
    }
    if (action === "edit-published") openEditModal(data.articles.find((item) => item.id === id));
    if (action === "remove-published") {
      const article = data.articles.find((item) => item.id === id);
      article.status = "removed";
      article.feedback = "Removed from the magazine by moderation.";
      article.history.push({ actorId: currentUser().id, action: "Removed from publication by moderator/administrator.", date: new Date().toISOString() });
      persist();
      notify("Article removed from the magazine.");
      render();
    }
    if (action === "close-modal") button.closest(".modal-backdrop").remove();
    if (action === "listen") {
      const article = data.articles.find((item) => item.id === id);
      if (!("speechSynthesis" in window)) throw new Error("Text-to-speech is not supported by this browser.");
      speechSynthesis.cancel();
      speechSynthesis.speak(new SpeechSynthesisUtterance(`${article.title}. ${article.text}`));
    }
    if (action === "share") {
      const article = data.articles.find((item) => item.id === id);
      const shareData = { title: article.title, text: `Read “${article.title}” on Margin.`, url: `${location.href.split("#")[0]}#article/${encodeURIComponent(article.id)}` };
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(shareData.url); notify("Article link copied to your clipboard."); }
      else throw new Error("Sharing is not available in this browser.");
    }
    if (action === "voice-input") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) throw new Error("Voice-to-text is not supported by this browser. You can type your content instead.");
      const field = button.closest(".field").querySelector("textarea");
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.onresult = (resultEvent) => { field.value = `${field.value}${field.value ? " " : ""}${resultEvent.results[0][0].transcript}`; };
      recognition.onerror = () => notify("Voice input was not completed. Please try again or type your content.", true);
      recognition.start();
      notify("Listening… speak clearly, then pause.");
    }
  } catch (error) {
    notify(error.message || "The requested action could not be completed.", true);
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();
  try {
    const values = formValues(form);
    if (form.id === "login-form") login(values.email, values.password);
    if (form.id === "register-form") {
      const role = values.role;
      if (["student", "faculty"].includes(role) && !values.email.trim().toLowerCase().endsWith(".edu")) {
        throw new Error("Students and faculty must register with an email address ending in .edu.");
      }
      if (role === "student" && values.verificationCode !== "246810") throw new Error("Verify your school email with the simulated code before registering.");
      if (data.users.some((user) => user.email.toLowerCase() === values.email.toLowerCase())) throw new Error("An account with this email already exists.");
      const user = { id: `user-${crypto.randomUUID()}`, name: values.name.trim(), email: values.email.trim(), password: values.password, role, major: values.major.trim(), school: values.school.trim(), verified: role !== "student" || values.verificationCode === "246810", rejections: 0 };
      data.users.push(user);
      persist();
      setUser(user.id);
      go("browse");
      notify("Your account is ready. Welcome to Margin.");
    }
    if (form.id === "submission-form") {
      const article = createSubmission(values);
      go("submissions");
      render();
      notify(article.screening.duplicate ? "Likely duplicate flagged and sent directly to moderator review." : "Screening passed. Your submission is waiting for an editor.");
    }
    if (form.id === "revision-form") {
      const existing = form.dataset.existing === "true" ? data.articles.find((item) => item.id === form.dataset.id) : null;
      createSubmission(values, existing, form.dataset.parent || null);
      go("submissions");
      render();
      notify("Your version has been submitted to the full review process.");
    }
    if (form.classList.contains("editor-form")) {
      const article = data.articles.find((item) => item.id === form.dataset.id);
      if (values.text.trim() === article.text.trim()) throw new Error("Make the required editorial text changes before forwarding this draft.");
      article.text = values.text.trim();
      article.status = "waiting-moderator";
      article.history.push({ actorId: currentUser().id, action: "Editor revised the text and forwarded it for moderator approval.", date: new Date().toISOString() });
      persist();
      render();
      notify("Editor changes saved. The submission is now waiting for moderator review.");
    }
    if (form.classList.contains("moderation-form")) {
      const decision = event.submitter?.value;
      moderate(data.articles.find((item) => item.id === form.dataset.id), decision, values.feedback || "");
      render();
      notify(decision === "approve" ? "Approved and published." : decision === "return" ? "Submission returned with feedback." : "Submission discarded.");
    }
    if (form.classList.contains("moderator-edit-form")) {
      const article = data.articles.find((item) => item.id === form.dataset.id);
      article.text = values.text.trim();
      article.history.push({ actorId: currentUser().id, action: "Moderator/administrator edited submission content.", date: new Date().toISOString() });
      persist();
      render();
      notify("Content edit saved to the restricted article history.");
    }
    if (form.id === "published-edit-form") {
      const article = data.articles.find((item) => item.id === form.dataset.id);
      article.title = values.title.trim();
      article.text = values.text.trim();
      article.history.push({ actorId: currentUser().id, action: "Moderator/administrator edited published content.", date: new Date().toISOString() });
      persist();
      document.querySelector(".modal-backdrop")?.remove();
      render();
      notify("Published content updated; edit recorded in restricted history.");
    }
    if (form.id === "rating-form") {
      const article = data.articles.find((item) => item.id === form.dataset.id);
      const stars = Number(values.stars);
      if (!Number.isInteger(stars) || stars < 1 || stars > 5) throw new Error("Choose a rating from one to five stars.");
      const existing = article.ratings.find((rating) => rating.userId === currentUser().id);
      if (existing) existing.stars = stars;
      else article.ratings.push({ userId: currentUser().id, stars });
      persist();
      render();
      notify("Your rating has been saved.");
    }
    if (form.id === "comment-form") {
      const article = data.articles.find((item) => item.id === form.dataset.id);
      article.comments.push({ id: `comment-${crypto.randomUUID()}`, userId: currentUser().id, text: values.text.trim(), createdAt: new Date().toISOString() });
      persist();
      render();
      notify("Your comment has been posted.");
    }
    if (form.id === "feedback-form") {
      data.feedback.push({ id: `feedback-${crypto.randomUUID()}`, userId: currentUser().id, text: values.text.trim(), createdAt: new Date().toISOString() });
      persist();
      form.reset();
      notify("Thank you. Your feedback has been recorded.");
    }
  } catch (error) {
    notify(error.message || "The form could not be submitted.", true);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "filter-school") filters.school = event.target.value;
  if (event.target.id === "filter-subject") filters.subject = event.target.value;
  if (event.target.id === "filter-category") filters.category = event.target.value;
  if (event.target.id.startsWith("filter-")) render();
  if (event.target.id === "reg-role") {
    const fields = document.getElementById("verification-fields");
    const code = document.getElementById("reg-code");
    const isStudent = event.target.value === "student";
    fields.classList.toggle("hidden", !isStudent);
    code.required = isStudent;
  }
});

document.getElementById("font-size").addEventListener("input", (event) => {
  document.documentElement.style.fontSize = `${event.target.value}%`;
});
document.getElementById("contrast-toggle").addEventListener("click", (event) => {
  const enabled = document.body.classList.toggle("high-contrast");
  event.currentTarget.setAttribute("aria-pressed", String(enabled));
});

window.addEventListener("hashchange", render);
loadData();
render();
