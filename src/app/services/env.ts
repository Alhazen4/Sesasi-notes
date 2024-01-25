import { isDevMode } from '@angular/core';

const url = isDevMode() === true ? 'http://localhost:3000' : 'http://62.72.13.124';
// const url = 'http://62.72.13.124';
const webTitle = isDevMode() === true ? 'App Development' : 'dNotes';

export { url, webTitle };