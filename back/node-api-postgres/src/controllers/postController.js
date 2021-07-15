const express = require('express');
const pool = require('../pool/pool.js')

// CRIAR POSTAGEM
const createPost = (request, response) => {
	const { id_user, title, text, url_pic, url_video, tag_name } = request.body

	var resp = 1;
	
	pool.query('INSERT INTO posts (id_user, title, text) VALUES ($1, $2, $3) RETURNING *;',
		[id_user, title, text], (error, results) => {
			if (error) {
				throw error
			}
			
			var id_post = results.rows[0]["id_post"];

			for(let i = 0; i < url_pic.length; i++)
			{
				var sql = 'INSERT INTO pictures (id_post, url_picture) VALUES (' + id_post + ', \'' + url_pic[i] + '\') RETURNING *;';
				pool.query(sql, 
					(error, results) => {
						if (error) {
							throw error
						}
					})
			}

			for(let i = 0; i < url_video.length; i++)
			{
				var sql = 'INSERT INTO videos (id_post, url_video) VALUES (' + id_post + ', \'' + url_video[i] + '\') RETURNING *;';
				pool.query(sql, 
					(error, results) => {
						if (error) {
							throw error
						}
					})
			}

			for(let i = 0; i < tag_name.length; i++)
			{
				var sql = 'INSERT INTO tags (name) SELECT \'' + tag_name[i] +  '\' WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = \'' + tag_name[i] + '\');' + 
									'INSERT INTO rel_tag_post (id_tag, id_post) SELECT id_tag, ' + id_post + ' FROM tags WHERE name = \'' + tag_name[i] + '\'';
				pool.query(sql, 
					(error, results) => {
						if (error) {
							throw error
						}
					})
			}


			response.status(201).send(`Added post: ${results.rows[0].id_post}`)
		})

}

// PEGAR INFORMAÇÕES DO POST PELO ID
const getPostById = (request, response) => {
    const id_post = parseInt(request.params.id_post)
		let  postInfo;

    pool.query('SELECT * FROM posts WHERE id_post = $1;', [id_post], (error, results) => {
        if (error) {
					throw error
				}

			// Pegar as imagens do post
			var sql = 'SELECT * FROM pictures WHERE id_post = ' + id_post + ';';

			pool.query(sql, (error, res) => {
				if (error) throw error;
				console.log(results)
				results.rows[0]["pictures"] = res.rows;
				getPostComments(id_post);
			})

			function getPostComments(id_post) {
				// Pegar os comentarios do post
				// "depth" é utilizado para indicar a profundidade
				// do comentário na "árvore" de respostas.
				// comentários sem pai possuem depth 0. Quanto maior depth, mais afastado
				// para a direita devem ser os comentários. Assim, basta apresentá-los na
				// ordem em que foram retornados
				sql = 'WITH RECURSIVE resp AS (' + 
'SELECT id_comment, array[id_comment] AS path, 0 as depth, text, id_user, create_date, id_post ' +
'FROM comments ' +
'WHERE id_comment_father IS null ' +
'UNION ALL ' +
'SELECT c.id_comment, p.path||c.id_comment, p.depth + 1, c.text, c.id_user, c.create_date, c.id_post ' +
'FROM comments c ' +
'JOIN resp p ON p.id_comment = c.id_comment_father ' +
') ' +
'SELECT resp.text, resp.create_date, resp.depth, resp.id_user, users.name ' +
'FROM resp ' +
'INNER JOIN users ON users.id_user = resp.id_user WHERE resp.id_post = ' + id_post  + ' order by path;';
				pool.query(sql, (error, res) => {
					if (error) {
						throw error
					}

					results.rows[0]["comments"] = res.rows;

					response.status(200).json(results.rows[0])
				})
			}


		})

}


// COMENTAR POSTAGEM
const commentPost = (request, response) => {
	const id_post = parseInt(request.params.id_post);
	const { id_user, text,  id_comment_father } = request.body

	var sql = 'INSERT INTO comments (id_user, id_post, id_comment_father, text)' + 
						'VALUES (' + id_user + ', ' + id_post + ', ' + id_comment_father +
						', \'' + text + '\') RETURNING *;';

	pool.query(sql,
		(error, results) => {
			if (error) {
				throw error
			}

			response.status(201).send(`Added comment: ${results.rows[0].id_comment}`)
		})

}

// Deletar comentário
const deleteComment = (request, response) => {
	const id_comment = parseInt(request.params.id_comment);

	var sql = 'WITH RECURSIVE resp AS ( ' +
		'SELECT id_comment, array[id_comment] AS path ' + 
		'FROM comments ' + 
		'WHERE id_comment = ' + id_comment + ' ' + 
		'UNION ALL ' +
		'SELECT c.id_comment, p.path||c.id_comment ' +
		'FROM comments c ' + 
		'JOIN resp p ON p.id_comment = c.id_comment_father) ' +
		'DELETE FROM comments c WHERE c.id_comment IN (SELECT r.id_comment FROM resp r);';

	pool.query(sql, (error, results) => {
		if (error)  throw error;
		response.status(200).send(`Comentário deletado: ${id_comment}`)
	})
}

//GET ALL POSTS WITH TAG
const getAllWithTag = (req, res) => {

	const {tag_name} = req.body;

	var sql = "WITH post_thumb AS (SELECT ROW_NUMBER() OVER (PARTITION BY id_post ORDER BY pics.id_picture ASC) m, pics.url_picture, pics.id_post FROM pictures pics) SELECT post_thumb.url_picture, p.id_post FROM post_thumb INNER JOIN posts p ON p.id_post = post_thumb.id_post INNER JOIN rel_tag_post rtp ON rtp.id_post = post_thumb.id_post INNER JOIN tags t ON t.id_tag = rtp.id_tag WHERE m = 1 AND name = '" + tag_name + "' ORDER BY p.create_date DESC;"
	pool.query(sql, (error, results) => {
		if(error){
			throw error;
			
		}
		res.status(200).send(results.rows)
	})	
	
}

//GET ALL POSTS
const getAllPosts = (req, res) => {
	
	var sql = "SELECT id_post, id_user, title, text FROM posts ORDER BY id_post ASC"

	pool.query(sql, (error, results) => {
		if(error){
			throw error;
		}
		res.status(200).json(results.rows);
	})
}

//DELETE POST BY ID
const deletePostById = (req, res) => {
	const id_post = parseInt(req.params.id_post)

	var sql = "SELECT DeletaPost(" + id_post + ")";
	pool.query(sql, (error, results) => {
		if(error){
			throw error;
		}
		res.status(200).send(`Post deletado: ${id_post}`)
	})
}

// Exporting CRUD functions in a REST API
module.exports = {
	createPost,
	getPostById,
	commentPost,
	deleteComment,
	getAllWithTag,
	getAllPosts,
	deletePostById
}
