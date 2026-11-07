# Fly Nature Holidays - Self-Hosted Supabase Setup

This directory contains the Docker Compose setup to run a full, self-hosted Supabase server on any VPS (DigitalOcean, AWS, Linode, Hetzner, Ubuntu) or local machine.

---

## 1. Quick Start (Prerequisites: Docker & Docker Compose)

```bash
# 1. Navigate to this directory
cd supabase-self-host

# 2. Copy the sample environment file
cp .env.example .env

# 3. Generate your secure JWT secrets and database password in .env
# Replace POSTGRES_PASSWORD, JWT_SECRET, and ANON_KEY with your own values.

# 4. Start all Supabase services
docker compose up -d
```

---

## 2. Default Service Endpoints

Once started, the following services will be live on your server:

| Service | Port | Endpoint |
| :--- | :--- | :--- |
| **Supabase Studio** (Admin Web UI) | `8000` | `http://your-server-ip:8000` |
| **API Gateway** (Kong) | `8000` | `http://your-server-ip:8000/rest/v1/` |
| **Authentication** (GoTrue) | `8000` | `http://your-server-ip:8000/auth/v1/` |
| **Storage API** | `8000` | `http://your-server-ip:8000/storage/v1/` |
| **Direct PostgreSQL DB** | `5432` | `postgresql://postgres:<password>@your-server-ip:5432/postgres` |

---

## 3. Database Initialization

1. Open Supabase Studio in your browser: `http://localhost:8000` (or `http://your-server-ip:8000`).
2. Go to the **SQL Editor** tab.
3. Paste the contents of `../supabase-schema.sql` and click **Run**.
4. All tables (`tour_packages`, `bookings_and_leads`, `payments_and_inflows`, `tour_categories`, `branch_settings`) and the `tour-media` storage bucket will be instantly provisioned!

---

## 4. Connecting the Website to Your Supabase Server

In the website root `.env` or in the website's **Admin Dashboard > Branch Settings**:
- **Project URL**: `http://your-server-ip:8000`
- **Anon Public Key**: Your configured `ANON_KEY`

