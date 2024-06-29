import type { Request, Response } from 'express'

export const req = {
    query: { show: true, tab: '' },
    params: { id: 'id' },
} as unknown as Request

export const res = {
    render: jest.fn(),
    redirect: jest.fn(),
} as unknown as Response
