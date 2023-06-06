import express from 'express';
import createDocument from '../controllers/documents/createDocument.js';
import deleteDocument from '../controllers/documents/deleteDocument.js';
import getAllUserDocuments from '../controllers/documents/getAllUserDocuments.js';
import getSingleUserDocument from '../controllers/documents/getSingleUserDocument.js';
import updateDocument from '../controllers/documents/updateDocument.js';
import checkAuth from '../middleware/checkAuthMiddleware.js';
import { generatePDF, getPDF, sendDocument } from '../controllers/documents/generatePDF.js';

const router = express.Router();

/* create a new document @ /api/v1/document/create */
router.route('/create').post(checkAuth, createDocument);

/* get all of a users documents @ /api/v1/document/all */
router.route('/all').get(checkAuth, getAllUserDocuments);

/* get,update and delete document @ /api/v1/document/:id */
router
	.route('/:id')
	.patch(checkAuth, updateDocument)
	.get(checkAuth, getSingleUserDocument)
	.delete(checkAuth, deleteDocument);

/* Generate PDF document at /api/v1/document/generate-pdf */
router.route('/generate-pdf').post(generatePDF);
/* Get PDF at /api/v1/document/get-pdf */
router.route('/get-pdf').get(getPDF);
/* Send email with pdf at /api/v1/document/send-document */
router.route('/send-pdf').post(sendDocument);

export default router;
