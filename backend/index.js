import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { JWT } from 'google-auth-library';

const secret = fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const secretObject = JSON.parse(secret);
const clientEmail = secretObject.client_email;
const privateKey = secretObject.private_key;

const client = new JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

const jwt = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyYTYxZWZkMmE0NGZjMjE1MTQ4ZDRlZmZjMzRkNmE3YjJhYzI2ZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzIxNjY0MzMsImF1ZCI6IjQ5MzEyNDI3ODc5OC1zcmVtZGVwYXE5NTdzdnFxbGxhb2lpZGxxOHFwNTdvay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMjM1ODU2Njg2NjExOTQ5MjIzNiIsImVtYWlsIjoibGluY29sbm5ndXllbjAwMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNDkzMTI0Mjc4Nzk4LXNyZW1kZXBhcTk1N3N2cXFsbGFvaWlkbHE4cXA1N29rLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkxpbmNvbG4gTmd1eWVuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDQxN21CNFg4aERDS3BaR1Q2aDBTTUVwbDFGX1Vzblc3MC1GMlh2MVE9czk2LWMiLCJnaXZlbl9uYW1lIjoiTGluY29sbiIsImZhbWlseV9uYW1lIjoiTmd1eWVuIiwiaWF0IjoxNjcyMTY2NzMzLCJleHAiOjE2NzIxNzAzMzMsImp0aSI6ImYwZWQwYTdkZGNlODU5MTlhYjMwMDk0MGU0MTM3OThiMmFkNmQ1NGEifQ.PJpnYUj78GBduSg5EFg-2aOEKb8NdyOxCf8etNRdUSumSJYXhguoyPuy074s4Eytzvry93xN0-aFwVAim5flYlZyFO-_dA7g6oWCvLpBBXbJByv9DfZJX2PnHWXVc6n6iCdbLOtG6DY4m1wdzYMEqJtwxqMqkJ56R_IHttPproe4zkTdnclCVMoNuxSmgXFlRJBfEP9P3Yg5EHbGSWVmsnvsEycP_ZQeDlUIqmCwKrij5cw-OIQuOA4vg45dm447sQcwGbktxjFDS4twvuKBq3UQveuamZWhCJ0lxhvxvlwJFq89y5J_QgssZB2A8OfhtZ2R6kpyaO_vPX31yyx94A';

async function verifyJWT(jwt) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: jwt,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    console.log(payload);
  } catch (error) {
    console.error(error);
  }
}

verifyJWT(jwt);