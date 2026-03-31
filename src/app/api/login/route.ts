// Next Imports
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Vars
    const { email, password } = await req.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          message: ['Email and Password are required']
        },
        {
          status: 400,
          statusText: 'Bad Request'
        }
      )
    }

    // Fetch from portal backend API
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    })

    console.log('Response login: => ' + JSON.stringify({ status: res.status, statusText: res.statusText }))

    // Parse response
    const data = await res.json()

    // If response is successful, return the data
    if (res.ok) {
      return NextResponse.json(data, {
        status: res.status,
        statusText: res.statusText
      })
    } else {
      // Return error response from portal
      return NextResponse.json(data, {
        status: res.status,
        statusText: res.statusText
      })
    }
  } catch (error) {
    console.error('Login API Error:', error)

    // Return error response if fetch fails
    return NextResponse.json(
      {
        message: ['Failed to connect to authentication service']
      },
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    )
  }
}
