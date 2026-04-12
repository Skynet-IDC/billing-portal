# API Client with Automatic Token Injection

Hướng dẫn sử dụng hệ thống tự động inject token vào tất cả các request đến BACKEND_URL.

## 📋 Tổng quan

Dự án đã được thiết lập để tự động thêm token xác thực (Authorization header) vào tất cả các request được gửi đến BACKEND_URL. Điều này giảm thiểu lỗi quên thêm token và giúp quản lý xác thực tập trung.

## 🔧 Cấu hình

### 1. Environment Variables (.env)

```dotenv
# API BACKEND
BACKEND_URL=http://localhost:8081
NEXT_PUBLIC_BACKEND_URL=http://localhost:8081
```

- `BACKEND_URL`: URL của backend API (sử dụng trong server-side)
- `NEXT_PUBLIC_BACKEND_URL`: URL công khai (sử dụng trong client-side)

## 📝 Cách sử dụng

### Phía Client (React Components)

#### 1. Sử dụng Hook `useApiClient`

```typescript
'use client'

import { useApiClient } from '@/hooks/useApiClient'

export default function MyComponent() {
  const { get, post, put, patch, delete: deleteRequest } = useApiClient()

  // GET request
  const handleGet = async () => {
    try {
      const data = await get('/api/users')
      console.log('Users:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // POST request
  const handlePost = async () => {
    try {
      const data = await post('/api/users', { name: 'John' })
      console.log('Created:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // PUT request
  const handlePut = async () => {
    try {
      const data = await put('/api/users/1', { name: 'Jane' })
      console.log('Updated:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // PATCH request
  const handlePatch = async () => {
    try {
      const data = await patch('/api/users/1', { status: 'active' })
      console.log('Patched:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // DELETE request
  const handleDelete = async () => {
    try {
      const data = await deleteRequest('/api/users/1')
      console.log('Deleted:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <button onClick={handleGet}>Get</button>
      <button onClick={handlePost}>Post</button>
      <button onClick={handlePut}>Put</button>
      <button onClick={handlePatch}>Patch</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}
```

#### 2. Sử dụng `apiFetch` trực tiếp

```typescript
import { apiFetch, apiFetchJson } from '@/utils/apiClient'

// Tự động thêm token cho BACKEND_URL
const response = await apiFetch('http://localhost:8081/api/users')

// Hoặc parse JSON tự động
const data = await apiFetchJson('http://localhost:8081/api/users')
```

#### 3. Sử dụng `backendFetch`

```typescript
import { backendFetch, backendFetchJson } from '@/utils/apiClient'

// Tự động thêm token, chỉ cần endpoint
const data = await backendFetchJson('/api/users')

// POST request
const newUser = await backendFetchJson('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'John' })
})
```

### Phía Server (API Routes)

#### 1. Sử dụng `backendRequest` trong API routes

```typescript
// src/app/api/users/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { backendRequest } from '@/libs/backendApi'

export async function GET(req: NextRequest) {
  try {
    // Token được tự động inject
    const response = await backendRequest('/api/users', req, {
      method: 'GET'
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Token được tự động inject
    const response = await backendRequest('/api/users', req, {
      method: 'POST',
      body: JSON.stringify(body)
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
```

#### 2. Skip Token Injection nếu cần

```typescript
// Dành cho login endpoint (không cần token)
const response = await backendRequest('/api/auth/login', req, {
  method: 'POST',
  body: JSON.stringify({ email, password }),
  skipToken: true // Bỏ qua injection token
})
```

#### 3. Sử dụng Helper Functions

```typescript
import { 
  backendRequest, 
  getAuthToken, 
  createBackendHeaders,
  handleBackendResponse 
} from '@/libs/backendApi'

// Lấy token từ NextAuth
const token = await getAuthToken(req)

// Tạo headers với token
const headers = createBackendHeaders(req, token)

// Handle response
const result = await handleBackendResponse(response)
```

## 🔐 Token Management

### Lấy Token (Client-side)

```typescript
import { getAccessToken } from '@/utils/authUtils'

const token = getAccessToken()
console.log('Current token:', token)
```

### Lưu Token (Client-side)

```typescript
import { setAccessToken } from '@/utils/authUtils'

setAccessToken('your-token-here')
```

### Lấy Token từ NextAuth (Server-side)

```typescript
import { getToken } from 'next-auth/jwt'

const token = await getToken({ req })
```

## ⚙️ Cấu hình advanced

### Custom Headers

```typescript
// Client-side
const data = await apiFetchJson('http://localhost:8081/api/users', {
  method: 'POST',
  headers: {
    'X-Custom-Header': 'value'
  }
})

// Server-side
const response = await backendRequest('/api/users', req, {
  method: 'POST',
  headers: {
    'X-Custom-Header': 'value'
  }
})
```

### Skip Token Injection

```typescript
// Client-side
const data = await apiFetchJson('http://localhost:8081/api/public', {
  skipTokenInjection: true
})

// Server-side
const response = await backendRequest('/api/public', req, {
  skipToken: true
})
```

## 📚 Ví dụ thực tế

### Lấy danh sách người dùng

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useApiClient } from '@/hooks/useApiClient'

export default function UsersList() {
  const { get } = useApiClient()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const data = await get('/api/users')
        setUsers(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [get])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {users.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Tạo mới người dùng

```typescript
'use client'

import { useState } from 'react'
import { useApiClient } from '@/hooks/useApiClient'

export default function CreateUser() {
  const { post } = useApiClient()
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await post('/api/users', formData)
      console.log('Created:', result)
      setFormData({ name: '', email: '' })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
```

## 🐛 Troubleshooting

### Token không được thêm vào

1. Kiểm tra token có được lưu không: `getAccessToken()`
2. Kiểm tra URL có khớp với BACKEND_URL không
3. Kiểm tra `skipTokenInjection` hoặc `skipToken` không được bật

### CORS Errors

Đảm bảo backend được cấu hình CORS để chấp nhận requests từ frontend URL

### Token Expired

Hãy triển khai token refresh logic trong `AuthContext` hoặc middleware

## 📦 API Reference

### `apiFetch(url, options)`

- **url**: Request URL
- **options**: RequestInit với thêm `skipTokenInjection`
- **Returns**: Promise<Response>

### `apiFetchJson(url, options)`

- **url**: Request URL
- **options**: RequestInit với thêm `skipTokenInjection`
- **Returns**: Promise<any>

### `backendFetch(endpoint, options)`

- **endpoint**: API endpoint (tương đối với BACKEND_URL)
- **options**: RequestInit với thêm `skipTokenInjection`
- **Returns**: Promise<Response>

### `backendFetchJson(endpoint, options)`

- **endpoint**: API endpoint (tương đối với BACKEND_URL)
- **options**: RequestInit với thêm `skipTokenInjection`
- **Returns**: Promise<any>

### `backendRequest(endpoint, request, options)`

- **endpoint**: API endpoint
- **request**: NextRequest
- **options**: RequestInit với thêm `skipToken`
- **Returns**: Promise<Response>

### `useApiClient()`

Hook cung cấp methods: `get`, `post`, `put`, `patch`, `delete`, `fetchApi`, `fetchBackend`

## 🎯 Best Practices

1. ✅ Luôn sử dụng hooks/utils này thay vì gọi fetch trực tiếp
2. ✅ Kiểm tra response.ok trước khi sử dụng data
3. ✅ Implement error handling appropriately
4. ✅ Sử dụng skipToken/skipTokenInjection cho public endpoints
5. ✅ Validate input trước khi gửi request
6. ✅ Use relative endpoints khi có thể

