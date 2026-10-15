# Margin — Online College Magazine

A responsive, browser-only prototype of an online college magazine. It uses plain HTML, CSS, and JavaScript; no server, build step, or backend is required. All changes are simulated and saved to this browser's `localStorage`.

## Run or publish

- Open `index.html` in a modern browser, or publish the repository root with GitHub Pages.
- No install or build command is needed.
- Demo password for every sample account: `demo123`.

## Demo accounts

| Role | Email |
| --- | --- |
| Student | `maya@student.usf.edu` |
| Student with a previous rejection | `jordan@student.usf.edu` |
| Student with several published articles | `sam@harbor.edu` |
| Faculty | `faculty@usf.edu` |
| Guest reader | `reader@example.com` |
| Verified editor | `editor@usf.edu` |
| Moderator | `moderator@usf.edu` |
| Administrator | `admin@harbor.edu` |

The editor-eligibility review desk also contains a student applicant. A moderator or administrator can verify the applicant's background and grant editor access.

## Demonstration workflow

1. Sign in as a student, submit a contribution, and review its status in **My submissions**.
2. Sign in as the editor and revise a waiting submission before forwarding it.
3. Sign in as a moderator or administrator to approve it, return it with feedback, or discard it.
4. Sign in as a registered reader to browse, filter, rate, comment on, listen to, and share published articles.
5. Use the **Prototype guide** to review the feature checklist or restore the original demo data.

Student and faculty registration require an email address ending in `.edu`. Student registration also requires the simulated school-email verification code `246810`; faculty do not require this simulated student verification. Guests can register with any valid email address.

## Browser storage and prototype limitations

The prototype stores demo accounts, passwords, submissions, reviews, feedback, ratings, and comments in browser-local storage. This is not secure authentication or shared multi-user storage; each browser keeps its own copy. **Reset all demo data** restores the sample records in the current browser. Voice input, text-to-speech, sharing, and clipboard access depend on browser support and permissions.
