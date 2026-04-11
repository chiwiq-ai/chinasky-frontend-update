// ============================================================================
// API Service Layer (User Site)
// ============================================================================
// Centralized data access. Toggle `useMockData: false` in
// src/config/app.json (or set VITE_USE_MOCK_DATA=false) and provide
// VITE_API_BASE_URL to switch to a real backend.
//
// Each function returns a Promise so call sites work identically whether the
// data comes from the in-memory mock dataset or a real fetch. The HTTP layer
// (src/lib/api-client.js) handles auth headers, timeouts, content-type
// validation, and structured error reporting.
// ============================================================================

import appConfig from '../config/app.json'
import {
  products as mockProducts,
  categories as mockCategories,
  orders as mockOrders,
  formatPrice as mockFormatPrice,
} from '../data/products'
import { apiGet, apiPost, apiPut, request, tokenStorage } from '../lib/api-client.js'

// Mock toggle: env var wins over the bundled config so deployments don't have
// to rebuild the JSON file to switch to a real backend.
const envFlag = import.meta.env.VITE_USE_MOCK_DATA
const USE_MOCK = envFlag !== undefined ? String(envFlag).toLowerCase() !== 'false' : Boolean(appConfig.useMockData)

const mockResolve = (data) => Promise.resolve(data)

// ---------- Products --------------------------------------------------------
export const fetchProducts = (params = {}) => {
  if (USE_MOCK) {
    let result = [...mockProducts]
    if (params.category) result = result.filter(p => p.category === params.category)
    if (params.subcategory) result = result.filter(p => p.subcategory === params.subcategory)
    return mockResolve(result)
  }
  return apiGet('/products', { query: params, auth: false })
}

export const fetchProduct = (id) => {
  if (USE_MOCK) return mockResolve(mockProducts.find(p => p.id === Number(id)))
  return apiGet(`/products/${encodeURIComponent(id)}`, { auth: false })
}

// ---------- Categories ------------------------------------------------------
export const fetchCategories = () => {
  if (USE_MOCK) return mockResolve(mockCategories)
  return apiGet('/categories', { auth: false })
}

// ---------- Orders ----------------------------------------------------------
export const fetchOrders = () => {
  if (USE_MOCK) return mockResolve(mockOrders)
  return apiGet('/orders')
}

export const fetchOrder = (id) => {
  if (USE_MOCK) return mockResolve(mockOrders.find(o => o.id === id))
  return apiGet(`/orders/${encodeURIComponent(id)}`)
}

export const placeOrder = (orderData) => {
  if (USE_MOCK) return mockResolve({ ...orderData, id: `CS-${Date.now()}` })
  return apiPost('/orders', orderData)
}

// ---------- Auth ------------------------------------------------------------
// Note: when the real backend is enabled these functions return the raw
// response (typically `{ user, token }`). The AuthContext is responsible for
// persisting the token via tokenStorage so subsequent requests carry the
// Authorization header automatically.
export const login = (email, password) => {
  if (USE_MOCK) {
    return mockResolve({ user: { name: email.split('@')[0], email }, token: 'mock-token' })
  }
  return request('/auth/login', { method: 'POST', body: { email, password }, auth: false })
}

export const signup = (data) => {
  if (USE_MOCK) {
    return mockResolve({ user: { name: data.name, email: data.email }, token: 'mock-token' })
  }
  return request('/auth/signup', { method: 'POST', body: data, auth: false })
}

export const logout = () => {
  if (USE_MOCK) {
    tokenStorage.clear()
    return mockResolve({ success: true })
  }
  return apiPost('/auth/logout', undefined).finally(() => tokenStorage.clear())
}

// ---------- User account ----------------------------------------------------
export const fetchProfile = () => {
  if (USE_MOCK) return mockResolve({ name: 'Hawkeye', email: 'hawkeye@example.com', phone: '+234 803 123 4567' })
  return apiGet('/me')
}

export const updateProfile = (data) => {
  if (USE_MOCK) return mockResolve(data)
  return apiPut('/me', data)
}

// ---------- Addresses -------------------------------------------------------
export const fetchAddresses = () => {
  if (USE_MOCK) {
    return mockResolve([
      { id: 1, label: 'Home', name: 'Hawkeye', address: '1068 Johnson St, Apt 432', city: 'Okeogundipe', postal: 'AB1016', country: 'Nigeria', isDefault: true },
      { id: 2, label: 'Office', name: 'Hawkeye', address: '1068 Johnson St, Apt 432', city: 'Okeogundipe', postal: 'AB1016', country: 'Nigeria', isDefault: false },
    ])
  }
  return apiGet('/addresses')
}

export const saveAddress = (data) => {
  if (USE_MOCK) return mockResolve({ ...data, id: Date.now() })
  return apiPost('/addresses', data)
}

// ---------- Cart ------------------------------------------------------------
export const fetchCart = () => {
  if (USE_MOCK) return mockResolve({ items: [] })
  return apiGet('/cart')
}

export const addToCart = (productId, qty = 1) => {
  if (USE_MOCK) return mockResolve({ success: true })
  return apiPost('/cart/items', { productId, qty })
}

// Helper export — kept here so callers can import format helpers from a
// single module regardless of which data source is active.
export const formatPrice = mockFormatPrice
