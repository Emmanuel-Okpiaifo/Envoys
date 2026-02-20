# Cloudinary + Netlify Setup (for Envoys gallery)

This file explains how to configure Cloudinary and Netlify so uploads and server-side deletes work.

1) Create a Cloudinary account
- Sign up at https://cloudinary.com/
- In the Dashboard note your **Cloud name** (you'll use it in the client)

2) Create an unsigned upload preset (for client uploads)
- In Cloudinary console go to Settings → Upload → Upload presets
- Click **Add upload preset**
  - Mode: unsigned
  - Folder: (optional) `envoys-gallery`
  - Allowed formats: jpg,png,webp
  - Save the preset name (e.g. `envoys_unsigned`)

3) Configure the client
- Open `js/gallery-upload.js`
- Replace the placeholders near the top with your values:
  - `CLOUDINARY_CLOUD_NAME` → your Cloudinary cloud name
  - `CLOUDINARY_UPLOAD_PRESET` → the unsigned preset name you created
- The client will perform unsigned uploads to Cloudinary and save metadata in `localStorage`.

4) (Optional, recommended) Enable server-side delete via Netlify Function
- We added `netlify/functions/delete-image.js` to this repo.
- You must set these Netlify environment variables (in Site settings → Build & deploy → Environment):
  - `CLOUDINARY_CLOUD_NAME` = your cloud name
  - `CLOUDINARY_API_KEY` = from Cloudinary Dashboard → API Keys
  - `CLOUDINARY_API_SECRET` = from Cloudinary Dashboard → API Keys

- After setting those, the client will send delete requests to the function when `CLOUDINARY_SERVER_DELETE_ENABLED` is `true` in `js/gallery-upload.js`.

5) Deploy to Netlify
- Push your repo to GitHub
- In Netlify, create a new site and connect the repo
- Add the three environment variables listed above in the Netlify site settings
- Deploy the site

6) Test the delete function locally (optional)
- You can test the function by deploying or using `netlify dev` (Netlify CLI) and calling:

```bash
curl -X POST https://<your-netlify-site>/.netlify/functions/delete-image \
  -H "Content-Type: application/json" \
  -d '{"public_id":"<cloudinary_public_id>"}'
```

7) Important notes
- Client-side uploads are unsigned — anyone can upload to your Cloudinary account using the preset. Use moderation and monitoring.
- Server-side deletion requires `API_KEY` and `API_SECRET` (keep them secret). Do not embed them in client code.
- If you prefer not to enable server delete, set `CLOUDINARY_SERVER_DELETE_ENABLED = false` in `js/gallery-upload.js`.

8) Troubleshooting
- Upload fails: verify preset is unsigned and matches the name in `js/gallery-upload.js`
- Delete fails: check Netlify function logs and that env vars are set correctly


That's it — after filling the Cloudinary values and adding Netlify env vars the upload + delete flow will be complete.