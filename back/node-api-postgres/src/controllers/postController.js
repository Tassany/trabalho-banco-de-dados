const express = require('express');
const pool = require('../pool/pool.js')

// CRIAR POSTAGEM
const createPost = (request, response) => {
	const { id_user, title, text, url_pic, tag_name } = request.body

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
				results.rows[0]["pictures"] = res.rows;
				getPostComments(id_post);
			})

			function getPostComments(id_post) {
				// Pegar os comentarios do post
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
	const { id_user, text, id_comment, id_comment_father } = request.body

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
    const id_user = parseInt(request.params.id_user)

    pool.query('DELETE FROM users WHERE id_user = $1', [id_user], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id_user}`)
    })
}

// Exporting CRUD functions in a REST API
module.exports = {
		createPost,
		getPostById,
		commentPost,
		deleteComment
}
