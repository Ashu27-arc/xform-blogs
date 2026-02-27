export type LeadPayload = {
  name?: string
  email?: string
  phone: string
  course?: string
  consent?: boolean
  source?: string
  page?: string
}

type LeadApiResponse =
  | {
      success: true
      stored: boolean
      message: string
      id?: string
    }
  | {
      success: false
      message: string
      errors?: { field: string; message: string }[]
    }

import axios from 'axios'
import type { AxiosError } from 'axios'

const DEFAULT_API_BASE_URL = 'https://backend-radical.onrender.com'

function getApiBaseUrl() {
  const raw = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined
  return (raw && raw.trim().length > 0 ? raw : DEFAULT_API_BASE_URL).replace(/\/$/, '')
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
})

function errorMessage(err: unknown) {
  const ax = err as AxiosError<any>
  const fromApi = ax?.response?.data?.message
  if (typeof fromApi === 'string' && fromApi.trim()) return fromApi
  if (typeof ax?.message === 'string' && ax.message.trim()) return ax.message
  return 'Request failed'
}

export async function submitLead(payload: LeadPayload) {
  try {
    const res = await api.post<LeadApiResponse>('/api/leads', payload)
    const data = res.data

    if (!data.success) {
      throw new Error(data.message || 'Failed to submit lead')
    }

    return data
  } catch (err) {
    throw new Error(errorMessage(err))
  }
}

