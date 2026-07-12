Frontend** (port 3000)

```bash
cd frontend
npm install
npm run dev
```

Then open the app, go to **Secure Interfaces**, and toggle "Use Spring
Backend" on (it already defaults to `http://localhost:8080` /
`/api/v1/ml/predict`). Hit "Test Connection" then "Test ML Prediction" —
that flows all the way through Spring → ml-service → your real trained
model and back.

## What's real vs. what's a placeholder

- The XGBoost model call is **real** — I tested it directly against your
  `xgboost_fraud_model.json` and it returns live probabilities.
- **Balance-based inputs**: your model was trained on PaySim data, which
  needs before/after account balances. The frontend doesn't send those
  (it only has amount/accounts/method/timestamp), so `ml-service`
  estimates them conservatively (assumes the source account is drained).
  This is a placeholder for a real gap — if you get real balance data
  into the frontend later, swap the adapter logic in
  `ml-service/app/main.py` (`to_paysim_row`) for the real values and
  accuracy will improve.
- Everything else (Spring↔ML, Spring↔AI engine, CORS, Postgres
  persistence, Vite proxy) is fully wired, not mocked.

## Security — please do this before anything else

Your `ai-engine-python/.env` had a **live Gemini API key sitting in
plaintext** in the files you uploaded. I already saw it in this
conversation, so treat it as compromised:

1. **Rotate the key now** in Google AI Studio / Google Cloud Console.
2. I replaced the key in this bundle's `.env` with a placeholder, and
   added `.gitignore` + `.env.example` so a real key never gets
   committed again.
3. Put your new key only in `ai-engine-python/.env`, never in
   `.env.example`, never in git.
