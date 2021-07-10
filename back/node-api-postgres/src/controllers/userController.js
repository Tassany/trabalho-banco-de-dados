const express = require('express');
const pool = require('../pool/pool.js')

// GET all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id_user DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// GET a single user by ID
const getUserById = (request, response) => {
    const id_user = parseInt(request.params.id_user)

    pool.query('SELECT * FROM users WHERE id_user = $1', [id_user], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

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

// CRIAR POSTAGEM
const createPost = (request, response) => {
	const { id_user, title, text, url_pic, tag_name } = request.body
	console.log(request.body);

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

			for(let i = 0; i < url_pic.length; i++)
			{
				var sql = 'INSERT INTO tags (name) SELECT \'' + tag_name[i] +  '\' WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = \'' + tag_name[i] + '\');';
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


// POST a new user
const createUser = (request, response) => {
    const { name, email, password } = request.body
    console.log(request.body);

    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id_user}`)
        })

}

// PUT updated data in an existing user
const updateUser = (request, response) => {
    const id_user = parseInt(request.params.id_user)
    const { name, email, password } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id_user = $4',
        [name, email, password, id_user],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id_user}`)
        }
    )
}
// 
// DELETE a user
const deleteUser = (request, response) => {
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
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
		getFeed,
		createPost
}
