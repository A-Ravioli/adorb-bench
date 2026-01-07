# 🚀 Deploy to Vercel

## Quick Deploy

1. **Install Vercel CLI** (if you haven't already):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? `adorb-bench` (or your preferred name)
- In which directory is your code located? `./`
- Want to override the settings? **N**

4. **Set Environment Variable**:

After the first deployment, add your OpenRouter API key:

```bash
vercel env add OPENROUTER_API_KEY
```

- What's the value? Paste your OpenRouter API key
- Add to which environments? Select **Production, Preview, and Development**

5. **Redeploy with Environment Variables**:
```bash
vercel --prod
```

## Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository (push this code to GitHub first)
4. Add environment variable:
   - Key: `OPENROUTER_API_KEY`
   - Value: Your OpenRouter API key
5. Click "Deploy"

## After Deployment

Your app will be live at: `https://your-project-name.vercel.app`

You can also set up a custom domain in the Vercel dashboard under:
**Project Settings → Domains**

## Environment Variables Needed

- `OPENROUTER_API_KEY`: Your OpenRouter API key (required)
- `NEXT_PUBLIC_SITE_URL`: (optional) Set to your deployment URL for OpenRouter attribution

## Notes

- The `.env` file is not committed to git (it's in `.gitignore`)
- All environment variables must be set in Vercel's dashboard or CLI
- Changes to environment variables require a redeploy

