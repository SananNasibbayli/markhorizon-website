// This is a simplified auth implementation for demo purposes
// In a real application, you would use NextAuth.js or a similar solution

// Store the auth state in memory (this will reset on server restart)
// In production, you would use cookies, JWT, or a database
let isAuthenticated = false

export async function login(email: string, password: string): Promise<boolean> {
  // For demo purposes, accept any email with this password
  // In production, you would validate against a database
  if (password === "admin123") {
    isAuthenticated = true
    return true
  }
  return false
}

export async function logout(): Promise<void> {
  isAuthenticated = false
}

export async function checkAuth(): Promise<boolean> {
  return isAuthenticated
}
