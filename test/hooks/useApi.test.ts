import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from '../../src/hooks/useApi';

describe('useApi', () => {
  it('starts loading, then exposes the data', async () => {
    const { result } = renderHook(() => useApi(() => Promise.resolve(42)));

    expect(result.current).toEqual({ data: null, isLoading: true, error: null });
    await waitFor(() => expect(result.current).toEqual({ data: 42, isLoading: false, error: null }));
  });

  it('exposes the error message', async () => {
    const { result } = renderHook(() => useApi(() => Promise.reject(new Error('League not found'))));

    await waitFor(() => expect(result.current).toEqual({ data: null, isLoading: false, error: 'League not found' }));
  });

  it('uses a generic message for non-Error rejections', async () => {
    const { result } = renderHook(() => useApi(() => Promise.reject('boom')));

    await waitFor(() => expect(result.current.error).toBe('An error occurred'));
  });

  it('reloads when deps change and ignores the stale response', async () => {
    const pending: Record<string, (value: string) => void> = {};
    const { result, rerender } = renderHook(
      ({ id }) => useApi(() => new Promise<string>((resolve) => { pending[id] = resolve; }), [id]),
      { initialProps: { id: 'a' } }
    );

    rerender({ id: 'b' });
    pending.a('stale');
    expect(result.current.isLoading).toBe(true);

    pending.b('fresh');
    await waitFor(() => expect(result.current.data).toBe('fresh'));
  });
});
