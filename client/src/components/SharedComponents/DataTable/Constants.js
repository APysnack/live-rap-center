// the number of rows fetched for a table on each GQL query
export const CLIENT_MEMORY_LIMIT = 2000;

// number of rows to display each page of the table
export const ROWS_TO_DISPLAY = 10;

// total number of pages that can be accessed with one GQL fetch
export const PAGES_PER_FRAME = CLIENT_MEMORY_LIMIT / ROWS_TO_DISPLAY;
