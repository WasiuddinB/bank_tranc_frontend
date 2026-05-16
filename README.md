# Bank Ledger Frontend

A modern, production-ready banking application frontend built with Next.js, TypeScript, and Tailwind CSS. Integrates seamlessly with the Bank Ledger backend to provide a complete full-stack solution.

## 🚀 Features

- **🔐 Secure Authentication** - JWT-based login/registration with persistent sessions
- **💳 Account Management** - Create and manage multiple bank accounts
- **💸 Transaction System** - Send money between accounts with real-time balance updates
- **📊 Dashboard** - Overview of your accounts and transactions
- **🎨 Modern UI** - Clean, responsive design with Tailwind CSS
- **⚡ Type-Safe** - Full TypeScript support with Zod validation
- **🔄 State Management** - Zustand for global auth state
- **🎯 API Integration** - Axios with interceptors for seamless backend communication

## 📋 Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios
- **UI Components**: Custom Tailwind components

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Select.tsx
│   │   ├── Alert.tsx
│   │   └── Modal.tsx
│   ├── auth/                  # Auth components
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── accounts/              # Account components
│   │   └── AccountCard.tsx
│   ├── transactions/          # Transaction components
│   │   └── SendMoneyForm.tsx
│   ├── Header.tsx
│   └── ProtectedRoute.tsx
├── services/
│   └── api.ts                 # Axios API client
├── hooks/
│   ├── useAuth.ts             # Auth hook
│   └── useAccounts.ts         # Account/transaction hooks
├── store/
│   └── authStore.ts           # Zustand auth store
├── types/
│   └── index.ts               # TypeScript interfaces
├── lib/
│   └── validations.ts         # Zod schemas
└── providers/
    └── Providers.tsx          # App providers

app/
├── login/page.tsx
├── register/page.tsx
├── dashboard/page.tsx
├── accounts/page.tsx
├── transactions/page.tsx
└── layout.tsx
```

## 🛠 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:3000` (see backend README)

### Installation

1. **Navigate to frontend directory:**

```bash
cd bank-ledger-frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

```bash
cp .env.example .env.local
```

The default configuration points to `http://localhost:3000/api`. Modify if needed.

4. **Start development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You'll be redirected to the login page.

## 📚 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run linting
```

## 🔐 Authentication Flow

1. **Register** → Create account with email, name, password
2. **Login** → Authenticate and receive JWT token
3. **Token Storage** → JWT stored in httpOnly cookie + localStorage
4. **Protected Routes** → Dashboard/accounts/transactions require auth
5. **Logout** → Clear token and redirect to login
6. **Auto Logout** → Redirect if token expires or is blacklisted

## 📡 API Integration

All API calls go through `/api` endpoints:

```typescript
// Authentication
POST /auth/register
POST /auth/login
POST /auth/logout

// Accounts
POST /accounts
GET /accounts
GET /accounts/balance/:accountId

// Transactions
POST /transactions
POST /transactions/system/initial-funds
```

### Response Format

Successful responses return data/transaction objects:

```json
{
  "user": { "_id": "...", "email": "..." },
  "token": "eyJhbGc..."
}
```

Error responses include message:

```json
{
  "message": "Error description"
}
```

## 🎯 Pages

| Route | Purpose | Auth Required |
|-------|---------|---|
| `/` | Home (redirect) | No |
| `/login` | Login page | No |
| `/register` | Registration page | No |
| `/dashboard` | Main dashboard | Yes |
| `/accounts` | Account management | Yes |
| `/transactions` | Send money | Yes |

## 🎨 UI Components

### Button
```tsx
<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

### Input
```tsx
<Input
  label="Email"
  type="email"
  error={errors.email?.message}
  {...register('email')}
/>
```

### Card
```tsx
<Card>
  <CardHeader title="Title" subtitle="Subtitle" />
  <CardBody>Content</CardBody>
</Card>
```

### Alert
```tsx
<Alert type="success" message="Success!" />
```

### Modal
```tsx
<Modal isOpen={open} title="Modal" onClose={handleClose}>
  Content
</Modal>
```

## 🔄 State Management

Uses Zustand with localStorage persistence:

```typescript
const { user, token, isAuthenticated, login, logout } = useAuthStore();
```

Persisted as `auth-storage` in localStorage.

## 🪝 Custom Hooks

### useAuth()
```typescript
const { user, isAuthenticated, login, register, logout, error, isLoading } = useAuth();
```

### useAccounts()
```typescript
const { accounts, isLoading, error, refetch } = useAccounts();
```

### useAccountBalance(accountId)
```typescript
const { balance, isLoading, error } = useAccountBalance(accountId);
```

### useCreateAccount()
```typescript
const { create, isLoading, error } = useCreateAccount();
```

### useCreateTransaction()
```typescript
const { create, isLoading, error } = useCreateTransaction();
```

## ✅ Form Validation

All forms use Zod for client-side validation:

- **Email**: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- **Password**: Minimum 6 characters
- **Name**: Minimum 2 characters
- **Amount**: Greater than 0

## 🚨 Error Handling

- API errors displayed in alerts
- Form validation errors shown on fields
- 401 Unauthorized redirects to login
- Network errors show user-friendly messages
- Idempotency prevents duplicate transactions

## 🔒 Security Features

- JWT tokens with 3-day expiration
- httpOnly cookies (XSS protection)
- CORS enabled for backend
- Token blacklisting on logout
- Input validation with Zod
- Protected routes require auth

## 🐛 Troubleshooting

### "Cannot connect to API"
- Ensure backend is running on `http://localhost:3000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`

### "401 Unauthorized"
- Token may have expired (3 days)
- Try logout and login again
- Check localStorage `auth-storage`

### "CORS errors"
- Verify backend allows frontend origin
- Check withCredentials in API calls

### "Forms not validating"
- Check browser console for validation errors
- Verify Zod schemas match backend requirements

## 📦 Dependencies

```json
{
  "next": "^15.0",
  "react": "^18.0",
  "typescript": "^5.0",
  "zustand": "^4.0",
  "react-hook-form": "^7.0",
  "@hookform/resolvers": "^3.0",
  "zod": "^3.0",
  "axios": "^1.0",
  "tailwindcss": "^3.0",
  "uuid": "^9.0"
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Import project on Vercel**
3. **Set environment variable**:
   - `NEXT_PUBLIC_API_URL` → Your backend URL
4. **Deploy**

### Self-Hosted

```bash
npm run build
npm start
```

## 📝 Environment Variables

```
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# JWT cookie name (default: token)
NEXT_PUBLIC_JWT_COOKIE_NAME=token
```

## 🤝 Integration with Backend

This frontend expects the backend API to be running on port 3000 with these endpoints:

- See backend README for API details
- Ensure CORS is enabled on backend
- Verify JWT secret matches if customized

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

## 📄 License

MIT

## 🆘 Support

For issues:

1. Check environment variables in `.env.local`
2. Verify backend is running and accessible
3. Check browser DevTools (Console, Network, Application)
4. Review server logs for API errors
5. Ensure all dependencies are installed
