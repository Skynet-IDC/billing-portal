# 🔧 Integration Checklist

Danh sách kiểm tra để tích hợp hệ thống token injection tự động vào dự án.

---

## ✅ Phase 1: Setup & Configuration

- [x] Environment variables added to `.env`
  - [x] `BACKEND_URL=http://localhost:8081`
  - [x] `NEXT_PUBLIC_BACKEND_URL=http://localhost:8081`

- [x] API client files created
  - [x] `src/utils/apiClient.ts` - Client-side fetch wrapper
  - [x] `src/libs/backendApi.ts` - Server-side backend helper
  - [x] `src/hooks/useApiClient.ts` - React hook

- [x] Existing files updated
  - [x] `src/app/api/login/route.ts` - Using backendRequest helper

- [x] Documentation created
  - [x] `API_CLIENT_GUIDE.md` - Comprehensive guide
  - [x] `IMPLEMENTATION_SUMMARY.md` - Implementation overview
  - [x] `QUICK_START.md` - Quick start guide
  - [x] `INTEGRATION_CHECKLIST.md` - This file

---

## ✅ Phase 2: Testing

### Unit Tests (Optional but Recommended)

- [ ] Test `apiFetch()` with BACKEND_URL
  - [ ] Verify token is added to Authorization header
  - [ ] Verify token is NOT added for non-BACKEND_URL
  - [ ] Verify skipTokenInjection flag works

- [ ] Test `backendRequest()` 
  - [ ] Verify token is extracted from NextAuth
  - [ ] Verify skipToken flag works
  - [ ] Verify error handling

- [ ] Test `useApiClient()` hook
  - [ ] Test get(), post(), put(), patch(), delete()
  - [ ] Verify all methods work correctly

### Manual Tests

- [ ] Login endpoint works
  - [ ] POST to `/api/login` succeeds
  - [ ] Token is returned and stored
  - [ ] Token is visible in localStorage

- [ ] Authenticated requests work
  - [ ] GET /api/users (or your endpoint) includes token
  - [ ] Authorization header is present
  - [ ] Backend receives and validates token

- [ ] Skip token works
  - [ ] Public endpoints don't send token
  - [ ] `skipToken: true` works
  - [ ] `skipTokenInjection: true` works

- [ ] Error handling works
  - [ ] 401 responses are handled
  - [ ] Network errors are caught
  - [ ] Error messages are meaningful

---

## ✅ Phase 3: Integration with Existing Code

### Update API Calls

- [ ] Audit existing `fetch()` calls in components
- [ ] Replace with `useApiClient()` hook calls
- [ ] Verify each endpoint still works

**Example Migration:**

```typescript
// Before
const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`).then(r => r.json())

// After
const { get } = useApiClient()
const data = await get('/api/users')
```

### Update API Routes

- [ ] Audit existing API routes
- [ ] Update routes that call BACKEND_URL
- [ ] Use `backendRequest()` helper
- [ ] Set `skipToken: true` for public routes

**Example Migration:**

```typescript
// Before
const res = await fetch(`${process.env.BACKEND_URL}/api/data`, {
  headers: { 'Authorization': `Bearer ${token}` }
})

// After
import { backendRequest } from '@/libs/backendApi'

const res = await backendRequest('/api/data', req)
```

### Update Auth Context (if needed)

- [ ] Verify token storage works
- [ ] Verify token retrieval works
- [ ] Update logout to clear token
- [ ] Implement token refresh (optional)

---

## ✅ Phase 4: Backend Configuration

- [ ] Configure CORS headers
  - [ ] Allow frontend origin
  - [ ] Allow Authorization header
  - [ ] Set Access-Control-Allow-Credentials if needed

- [ ] Verify backend endpoints
  - [ ] Endpoint accepts Bearer token
  - [ ] Token validation works
  - [ ] Proper 401/403 responses for auth failures

- [ ] Test with tools
  - [ ] Postman/Insomnia - test with Authorization header
  - [ ] Browser DevTools - inspect requests
  - [ ] Network tab - verify headers are sent

---

## ✅ Phase 5: Security Review

- [ ] Token is not logged
- [ ] Token is not exposed in console
- [ ] HTTPS is used in production
- [ ] CORS is properly configured
- [ ] Token refresh is implemented (if needed)
- [ ] localStorage security is considered
- [ ] Sensitive endpoints require auth

---

## ✅ Phase 6: Performance & Monitoring

- [ ] Monitor API response times
- [ ] Monitor error rates
- [ ] Monitor token refresh rate (if implemented)
- [ ] Monitor network requests in DevTools
- [ ] Verify no request duplication

---

## ✅ Phase 7: Documentation & Handoff

- [ ] Review API_CLIENT_GUIDE.md with team
- [ ] Share QUICK_START.md with developers
- [ ] Conduct code review
- [ ] Update project README if needed
- [ ] Document any custom implementations
- [ ] Create examples for specific use cases

---

## ✅ Phase 8: Deployment

### Pre-deployment

- [ ] All tests pass
- [ ] No console errors
- [ ] Code review approved
- [ ] Environment variables configured
- [ ] CORS configured on backend

### Production Deployment

- [ ] Deploy frontend updates
- [ ] Verify BACKEND_URL is correct
- [ ] Verify NEXT_PUBLIC_BACKEND_URL is correct
- [ ] Test endpoints work in production
- [ ] Monitor error logs
- [ ] Test with real users

### Post-deployment

- [ ] Verify all endpoints work
- [ ] Monitor error rates
- [ ] Monitor response times
- [ ] Verify token injection works
- [ ] Check user feedback

---

## 📋 Migration Guide by Feature

### If You Have Forms

```typescript
'use client'

import { useApiClient } from '@/hooks/useApiClient'
import { useState } from 'react'

export default function UserForm() {
  const { post } = useApiClient()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData) => {
    try {
      setLoading(true)
      const result = await post('/api/users', formData)
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  )
}
```

### If You Have Data Fetching

```typescript
'use client'

import { useApiClient } from '@/hooks/useApiClient'
import { useEffect, useState } from 'react'

export default function UserList() {
  const { get } = useApiClient()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await get('/api/users')
        setUsers(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [get])

  if (loading) return <div>Loading...</div>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### If You Have API Routes

```typescript
// src/app/api/data/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { backendRequest } from '@/libs/backendApi'

export async function GET(req: NextRequest) {
  try {
    const response = await backendRequest('/api/data', req)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed' },
      { status: 500 }
    )
  }
}
```

---

## 🚀 Quick Start for New Developers

1. **Read** QUICK_START.md
2. **Read** API_CLIENT_GUIDE.md
3. **Review** example code above
4. **Copy** pattern for your feature
5. **Test** with backend
6. **Ask** questions in code review

---

## 📞 Common Questions

**Q: Can I still use fetch directly?**
A: Yes, but it's not recommended. Use the provided hooks/utils for consistency and security.

**Q: What if I need custom headers?**
A: Pass them in the options: `get('/api/data', { headers: { 'X-Custom': 'value' } })`

**Q: How do I handle errors?**
A: Wrap in try-catch. Errors have status property: `error.status`

**Q: How do I disable token injection?**
A: Client: `skipTokenInjection: true` | Server: `skipToken: true`

**Q: What if token expires?**
A: Implement refresh in AuthContext. See API_CLIENT_GUIDE.md

---

## ✅ Final Checklist

- [ ] All files created and updated
- [ ] Environment variables configured
- [ ] Code is linted and formatted
- [ ] Tests pass (if applicable)
- [ ] Documentation reviewed
- [ ] Team is trained
- [ ] Backend is configured
- [ ] Security review done
- [ ] Ready for production deployment

---

**Status:** Ready to integrate ✅

**Last Updated:** April 12, 2026

**Next Step:** Start with Phase 2 (Testing)

