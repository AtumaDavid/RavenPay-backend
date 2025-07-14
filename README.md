# Database Setup

## Migration Commands

Run migrations:

```bash
npx knex migrate:latest --knexfile config/knexfile.ts
```

Create migration files:

```bash
npx knex migrate:make create_users_table --knexfile config/knexfile.ts
npx knex migrate:make create_accounts_table --knexfile config/knexfile.ts
npx knex migrate:make create_transactions_table --knexfile config/knexfile.ts
npx knex migrate:make create_webhook_logs_table --knexfile config/knexfile.ts
```

## Database Schema

**users**: id, email (unique), password, first_name, last_name, created_at, updated_at

**accounts**: id, user_id (FK), account_number (unique), bank_name, balance (default 0.00), created_at, updated_at

**transactions**: id, user_id (FK), account_id (FK), type (deposit/transfer), amount, recipient_account, recipient_bank, status (pending/completed/failed), reference (unique), created_at, updated_at

**webhook_logs**: id, payload (JSON), transaction_id (FK), created_at
