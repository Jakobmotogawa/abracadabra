# Abracadabra ✨

Turn any costume idea into a shoppable outfit with magical ease!

## Features

- **AI-Powered Planning**: Describe your costume idea and get a complete outfit plan
- **Smart Constraints**: Set budget, size, and gender preferences
- **Inventory Grid UI**: Videogame-style glassmorphism interface
- **Mock Catalog**: Searchable product database (easily switchable to real providers)
- **Shareable Outfits**: Save and share costume ideas via public URLs
- **Click Tracking**: Monitor affiliate link performance

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS with glassmorphism theme
- **Database**: Prisma + SQLite (switchable to PostgreSQL)
- **API**: Next.js Route Handlers

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Visit the app**:
   Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   ├── kit/[slug]/        # Public kit sharing pages
│   ├── results/           # Outfit results page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── InventoryGrid.tsx  # Main outfit display
│   ├── SizeForm.tsx       # Size selection
│   ├── BudgetInput.tsx    # Budget constraints
│   └── ...
├── lib/                   # Utilities
│   ├── catalog.ts         # Mock catalog adapter
│   ├── db.ts              # Prisma client
│   └── utils.ts           # Helper functions
├── prisma/                # Database schema
└── scripts/               # Database seeding
```

## API Endpoints

- `POST /api/plan` - Generate outfit plan from prompt
- `POST /api/search` - Search catalog for products
- `POST /api/kits` - Save outfit kit
- `GET /api/kit-by-slug/[slug]` - Fetch public kit
- `POST /api/clickouts` - Track affiliate clicks

## Customization

### Adding Real Catalog Providers

The mock catalog adapter in `lib/catalog.ts` can be easily replaced with real providers like Amazon Product Advertising API. The interface is designed to be provider-agnostic.

### Styling

The glassmorphism theme is configured in `tailwind.config.js` and `app/globals.css`. Customize colors, effects, and animations to match your brand.

### Database

Switch from SQLite to PostgreSQL by updating the `DATABASE_URL` in your environment and the provider in `prisma/schema.prisma`.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## License

MIT License - see LICENSE file for details.