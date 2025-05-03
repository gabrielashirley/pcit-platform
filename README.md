# PCIT Platform

A platform for Parent-Child Interaction Therapy (PCIT) professionals to manage their practice.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm
- Docker and Docker Compose

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gabrielashirley/pcit-platform.git
cd pcit-platform
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development environment:
```bash
pnpm dev
```

4. Start the database:
```bash
docker-compose up -d
```

5. Populate the database with test data:
```bash
psql -U pcituser -d pcitdb -h localhost -p 5432 -f scripts/seed.sql
```

This will create a test clinician account:
- Email: sarah.johnson@pcit.com
- Password: testtest

The test data includes:
- 1 clinician account
- 2 caregivers
- 2 special time sessions (one completed, one in progress)
- 4 sample utterances

6. For the invitation code from invite page, you can manually verified: 
'''bash
pnpm tsx scripts/verify.ts invitatoin_code "name_of_user"

#example
pnpm tsx scripts/verify.ts Qk-8vq "Adam Smith"
'''

### Development

The development server will start on http://localhost:3000.

### Building for Production

```bash
pnpm build
```

### Running Tests

```bash
pnpm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).