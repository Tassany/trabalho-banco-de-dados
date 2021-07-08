const express = require('express');
const pool = require('../pool/pool.js')

// PEGAR POSTAGENS DOS SEGUIDOS (FEED)
const getFeed = (request, response) => {
	const id_user = parseInt(request.params.id_user)

	pool.query('WITH post_thumb AS (SELECT ROW_NUMBER() OVER (PARTITION BY id_post ORDER BY pics.id_picture ASC) m, pics.url_picture, pics.id_post FROM pictures pics) SELECT * FROM rel_user_user ruu INNER JOIN posts p ON p.id_user = ruu.id_follow INNER JOIN post_thumb ON post_thumb.id_post = p.id_post WHERE ruu.id_user = $1 AND m = 1;', [id_user], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

// Exporting CRUD functions in a REST API
module.exports = {
	getFeed
}
