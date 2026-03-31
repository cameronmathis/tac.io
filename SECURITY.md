# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.0   | :white_check_mark: |

## Reporting a Vulnerability

If you find a security vulnerability, please report it under the [Issues](https://github.com/cameronmathis/tac.io/issues/new?assignees=&labels=security+issue&template=security_issue.md&title=) tab of this repository and label it as "security issue".

## Rotating a Compromised Firebase / GCP API Key

If a Firebase API key has been publicly exposed (e.g. accidentally committed to a public repository), follow the steps below to rotate it and update this project.

### 1. Find the exposed key in Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select the project associated with the exposed key (for this project: **tacio** / project ID `tacio-clmat`).
3. In the left-hand navigation menu, go to **APIs & Services → Credentials**.
4. Under the **API keys** section you will see a list of keys. The exposed key (`AIzaSy…`) will be listed here by its display name (e.g. "Browser key (auto created by Firebase)").

### 2. Rotate (regenerate) the key

1. Click the **pencil icon** (Edit) next to the compromised key.
2. Click the **Regenerate Key** button at the top of the edit screen.
3. Confirm the regeneration. Google will immediately invalidate the old key and generate a new one.
4. Copy the new key value — you will need it in the next step.

> **Tip:** While you are on this screen, consider adding **API key restrictions** (HTTP referrer or IP address restrictions) under the "Set an application restriction" section to limit where the key can be used.

### 3. Update the GitHub repository secrets

The new key value must be stored as a GitHub Actions secret so the CI/CD workflows can inject it at build time:

1. Go to the repository on GitHub → **Settings → Secrets and variables → Actions**.
2. Find the secret named `VITE_FIREBASE_API_KEY` and click **Update**.
3. Paste the new API key value and save.

Repeat for any other Firebase config values that may have changed (see `.env.example` for the full list of required secrets).

### 4. Verify local development environments

Any developer who has a local `.env` file must also update `VITE_FIREBASE_API_KEY` in that file with the new key before running the app locally.
