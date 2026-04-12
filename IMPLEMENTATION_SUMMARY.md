# 🔐 Automatic Token Injection - Implementation Summary

Đã triển khai thành công hệ thống tự động thêm token vào tất cả các API request đến BACKEND_URL.

## ✅ Những gì đã được tạo/cập nhật

### 1. **Client-side API Client** (`src/utils/apiClient.ts`)
- `apiFetch()`: Enhanced fetch wrapper với token injection tự động
- `apiFetchJson()`: Fetch với JSON parsing tự động
- `backendFetch()`: Fetch cho BACKEND_URL endpoints
- `backendFetchJson()`: Fetch với JSON parsing cho BACKEND_URL

**Tính năng:**
- ✅ Tự động thêm `Authorization: Bearer <token>` header
- ✅ Hỗ trợ skip token injection với option `skipTokenInjection: true`
- ✅ Error handling và JSON parsing tự động
- ✅ Sử dụng `getAccessToken()` từ authUtils

### 2. **Server-side Backend Helper** (`src/libs/backendApi.ts`)
- `getAuthToken()`: Lấy token từ NextAuth session
- `createBackendHeaders()`: Tạo headers với token
- `backendRequest()`: Wrapper fetch cho BACKEND_URL
- `handleBackendResponse()`: Parse response
- `withBackendAuth()`: Middleware wrapper

**Tính năng:**
- ✅ Tích hợp NextAuth.js
- ✅ Lấy token từ request context
- ✅ Hỗ trợ skip token với option `skipToken: true`
- ✅ Error handling tập trung

### 3. **React Hook** (`src/hooks/useApiClient.ts`)
Cung cấp các method tiện lợi:
- `get(endpoint)`: GET request
- `post(endpoint, data)`: POST request
- `put(endpoint, data)`: PUT request
- `patch(endpoint, data)`: PATCH request
- `delete(endpoint)`: DELETE request
- `fetchApi()`: Generic fetch
- `fetchBackend()`: Backend fetch

### 4. **Environment Variables** (`.env`)
```dotenv
BACKEND_URL=http://localhost:8081
NEXT_PUBLIC_BACKEND_URL=http://localhost:8081
```

### 5. **Updated Login API** (`src/app/api/login/route.ts`)
- Đã update để sử dụng `backendRequest()` helper
- Token injection được skip cho login endpoint (skipToken: true)

### 6. **Documentation** (`API_CLIENT_GUIDE.md`)
Hướng dẫn chi tiết cách sử dụng với ví dụ thực tế

## 🚀 Cách sử dụng

### Client-side
```typescript
'use client'

import { useApiClient } from '@/hooks/useApiClient'

export default function UserList() {
  const { get, post } = useApiClient()

  const fetchUsers = async () => {
    const users = await get('/api/users')
    console.log(users) // Token tự động được thêm
  }

  const createUser = async () => {
    const result = await post('/api/users', { name: 'John' })
    console.log(result) // Token tự động được thêm
  }

  return (
    <div>
      <button onClick={fetchUsers}>Get Users</button>
      <button onClick={createUser}>Create User</button>
    </div>
  )
}
```

### Server-side
```typescript
import { NextResponse, NextRequest } from 'next/server'
import { backendRequest } from '@/libs/backendApi'

export async function GET(req: NextRequest) {
  try {
    // Token tự động được inject
    const response = await backendRequest('/api/users', req)
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
```

## 🔒 Cơ chế hoạt động

### Client-side
1. Gọi `apiFetch()` hoặc `backendFetch()`
2. Nếu URL chứa BACKEND_URL:
   - Lấy token từ `localStorage` via `getAccessToken()`
   - Thêm header `Authorization: Bearer <token>`
3. Gửi request

### Server-side
1. Gọi `backendRequest()` với NextRequest
2. Lấy token từ NextAuth JWT token
3. Tạo headers với `Authorization: Bearer <token>`
4. Gửi request đến BACKEND_URL

## 📝 Best Practices

1. ✅ Luôn sử dụng hooks/utils thay vì gọi fetch trực tiếp
2. ✅ Kiểm tra response.ok trước khi parse data
3. ✅ Implement error handling appropriately
4. ✅ Sử dụng `skipToken`/`skipTokenInjection` cho public endpoints
5. ✅ Validate input trước khi gửi request

## 🔄 Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Component                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
         ┌────────────────────────┐
         │   useApiClient Hook    │
         │  - get, post, put...   │
         └──────────┬─────────────┘
                    │
                    ▼
         ┌────────────────────────┐
         │  apiFetch/backendFetch │
         └──────────┬─────────────┘
                    │
                    ▼
         ┌────────────────────────┐
         │   Check if Backend URL │
         └──────────┬─────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
    YES  ▼                     ▼ NO
      ┌──────────┐         ┌──────────┐
      │Get Token │         │Direct    │
      │from LS   │         │Fetch     │
      └────┬─────┘         └────┬─────┘
           │                     │
           ▼                     ▼
      ┌──────────────┐      ┌──────────┐
      │Add Auth      │      │Response  │
      │Header        │      │from Server
      └────┬─────────┘      └──────────┘
           │
           ▼
      ┌──────────┐
      │ Send     │
      │Request   │
      └────┬─────┘
           │
           ▼
      ┌──────────────┐
      │ Backend API  │
      │   Receives   │
      │ Token in     │
      │ Header       │
      └──────────────┘
```

## 📚 File Structure

```
src/
├── utils/
│   └── apiClient.ts              # Client-side API client
├── libs/
│   └── backendApi.ts             # Server-side backend helper
├── hooks/
│   └── useApiClient.ts           # React hook
└── app/api/login/
    └── route.ts                  # Updated with backendRequest

.env
├── BACKEND_URL                   # Backend URL (server-side)
└── NEXT_PUBLIC_BACKEND_URL       # Backend URL (client-side)

API_CLIENT_GUIDE.md              # Detailed documentation
```

## ⚠️ Notes

- Token được lưu trong `localStorage` (client-side)
- NextAuth JWT token được sử dụng (server-side)
- Tất cả requests đến BACKEND_URL sẽ tự động có token
- Public endpoints cần set `skipToken: true` hoặc `skipTokenInjection: true`
- CORS phải được cấu hình trên backend

## 🔧 Troubleshooting

**Problem**: Token không được thêm
- Check: `getAccessToken()` có trả về token?
- Check: URL có khớp với BACKEND_URL?
- Check: `skipTokenInjection` / `skipToken` có được set?

**Problem**: CORS errors
- Backend cần cấu hình CORS headers
- Frontend origin cần được whitelist

**Problem**: Token expired
- Implement token refresh trong AuthContext
- Hoặc redirect đến login khi token expired

---

**Tạo bởi**: AI Assistant
**Ngày**: April 12, 2026
**Status**: ✅ Ready for use

