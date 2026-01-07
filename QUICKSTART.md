# 🚀 Quick Start Guide - Adorb Bench

## What You Just Built

A delightful Next.js app that battles AI models based on the cuteness of their generated kaomoji! ✨

## Features Implemented

✅ **Two-Column Comparison**: Side-by-side model comparison  
✅ **Multiple Models**: Claude, GPT-4o, Gemini, Llama, and more  
✅ **Real-time Generation**: Parallel API calls to OpenRouter  
✅ **Interactive Voting**: Vote for the cuter creature  
✅ **Persistent Leaderboard**: Rankings saved in localStorage  
✅ **Beautiful UI**: Modern gradient design with animations  
✅ **Loading States**: Smooth loading indicators  
✅ **Error Handling**: Graceful error messages  

## Your App is Running! 🎉

The dev server is already running at: **http://localhost:3000**

## Testing Results

Successfully tested:
- ✅ Model selection (7 models available)
- ✅ Parallel creature generation from OpenRouter
- ✅ Loading states and animations
- ✅ Voting functionality
- ✅ Leaderboard updates in real-time
- ✅ "Generate Another Round" workflow
- ✅ localStorage persistence

## Example Output

**Round 1:**
- Claude 3.5 Sonnet: `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`
- GPT-4o: `~(˘▾˘~)`

**Round 2:**
- Claude 3.5 Sonnet: `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`
- GPT-4o: `(*≧ω≦)✧`

## Project Structure

```
adorb-bench/
├── app/
│   ├── api/generate/route.ts    # OpenRouter integration
│   ├── components/
│   │   ├── CreatureCard.tsx     # Individual creature display
│   │   ├── Leaderboard.tsx      # Rankings & stats
│   │   └── ModelSelector.tsx    # Model dropdown
│   ├── utils/rankings.ts        # localStorage logic
│   ├── constants.ts             # Available models
│   ├── types.ts                 # TypeScript interfaces
│   └── page.tsx                 # Main page
└── .env                         # Your OpenRouter API key (secure!)
```

## Next Steps

1. **Try Different Models**: Select different AI models and see which generates the cutest kaomoji!

2. **Share with Friends**: The rankings are stored locally, so each user gets their own leaderboard

3. **Customize Models**: Edit `app/constants.ts` to add more models from [OpenRouter](https://openrouter.ai/models)

4. **Tweak the Prompt**: Modify `SYSTEM_PROMPT` in `app/api/generate/route.ts` to change generation style

5. **Deploy**: Deploy to Vercel with one command:
   ```bash
   npm install -g vercel
   vercel
   ```

## Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: OpenRouter (multi-model AI)
- **Storage**: Browser localStorage

## Need Help?

- OpenRouter Docs: https://openrouter.ai/docs
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

**Have fun comparing the cuteness of AI-generated kaomoji!** (◕‿◕✿)

