import express from 'express';
const router = express.Router();

import * as Search from './search';
import * as Book from './book';

// User
router.post('/search', Search.searchBook);
router.post('/bookList', Book.list);
router.post('/bookDetail', Book.detail);

export default router
