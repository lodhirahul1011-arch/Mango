# Contact integration TDD evidence

Source: user's request to connect the contact form to email using existing .env credentials.
Journey: submitting a valid enquiry reaches the mail API; a mail failure must preserve form values and never claim success.

RED: `node --test backend-integration/app.test.cjs` failed because the required app.cjs integration did not exist. Checkpoint aa8f950 adds the reproducer before implementation.
GREEN: `npm test`: 11/11 pass, including root environment loading with deployment override precedence, HTTP validation, successful delivery acceptance, provider failure, HTML escaping, headers, honeypot, body size and rate limiting.
`npm run test:coverage`: executed app.cjs and contact.cjs have 100% line/function and 83.87% aggregate branch coverage. This measurement does not include the server entrypoint or Vite adapter.
Browser: Playwright verifies failed submission preserves details, accepted response shows Thank you, and the real Vite-mounted API rejects invalid input. Provider responses are mocked in the UI test.
`npm run typecheck` and `npm run build` passed. Build warns about bundle size and outdated Browserslist metadata.
`npm run mail:verify`: real SMTP connection and authentication verified; no email sent. Inbox placement and production deployment remain unverified.
Root .env changes are local and ignored. Mail configuration copied from src/.env into server-only keys. No secrets are committed. Browser bundle checked for configured server secrets.
