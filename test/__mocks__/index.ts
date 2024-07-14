import { vi } from 'vitest'
import type { Request, Response } from 'express'

export const req = {
    get: vi.fn(),
    query: { show: true, tab: '' },
    params: { id: 'id' },
} as unknown as Request

export const res = {
    render: vi.fn(),
    redirect: vi.fn(),
} as unknown as Response
