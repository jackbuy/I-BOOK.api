import express from 'express';
const router = express.Router();

import * as Search from './search';

// User
router.post('/search', Search.searchBook);

export default router
