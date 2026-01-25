import type { CursorPayload } from '../interfaces/cursor.interface';

export function encodeCursor(payload: CursorPayload): string {
  const data = JSON.stringify({
    id: payload.id,
    sortValue:
      payload.sortValue instanceof Date
        ? payload.sortValue.toISOString()
        : payload.sortValue,
  });
  return Buffer.from(data).toString('base64url');
}

export function decodeCursor(cursor: string): CursorPayload | null {
  try {
    const data = Buffer.from(cursor, 'base64url').toString('utf-8');
    return JSON.parse(data) as CursorPayload;
  } catch {
    return null;
  }
}
