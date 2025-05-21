import { PaginatedActionPayload, PaginatedState } from "@/types/utils/state";

/**
 * Updates the paginated state based on the action payload.
 *
 * This function checks if the new page data needs to replace, update, or append
 * to the existing state. It handles cases where the current state is ahead, matches,
 * or is behind the page provided in the payload.
 *
 * @template T
 * @param {PaginatedState<T>} state - The current paginated state.
 * @param {PaginatedActionPayload<T>} actionPayload - The payload containing new data to update the state.
 * @returns {PaginatedState<T>} - The updated paginated state.
 *
 * @example
 * const state = { page: 1, limit: 10, data: [1, 2, 3] };
 * const payload = { page: 2, limit: 10, results: [4, 5, 6] };
 * const updatedState = checkCacheAndUpdatePaginatedState(state, payload);
 * console.log(updatedState);
 * // { page: 2, limit: 10, data: [1, 2, 3, 4, 5, 6] }
 */
export const checkCacheAndUpdatePaginatedState = <T>(
  state: PaginatedState<T>,
  actionPayload: PaginatedActionPayload<T>,
): PaginatedState<T> => {
  const { page: currentPage, limit: currentLimit, data: currentData } = state;
  const { page: newPage, limit: newLimit, results: newResults } = actionPayload;

  // If the state is ahead of the payload, replace with the new page
  if (currentPage > newPage) {
    return {
      page: newPage,
      limit: newLimit,
      data: [...newResults],
    };
  }

  // If the state matches the payload page, update the overlapping portion
  if (currentPage === newPage) {
    const updatedData = [
      ...currentData.slice(0, newLimit * (newPage - 1)),
      ...newResults,
    ];

    return {
      page: newPage,
      limit: newLimit,
      data: updatedData,
    };
  }

  // If the state is behind, append the new results
  return {
    page: newPage,
    limit: newLimit,
    data: [...currentData, ...newResults],
  };
};
