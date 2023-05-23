import asyncHandler from 'express-async-handler';
import Document from '../../models/documentModel.js';

// $-title   Delete Document
// $-path    DELETE /api/v1/document/:id
// $-auth    Private

const deleteDocument = asyncHandler(async (req, res) => {
	const document = await Document.findById(req.params.id);

	if (!document) {
		res.status(404);
		throw new Error('Document does not exist!');
	}

	if (document.createdBy.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Unauthorized to delete this document; Not yours');
	}

	await document.delete();

	res.json({ success: true, message: 'Document has been deleted' });
});

export default deleteDocument;
