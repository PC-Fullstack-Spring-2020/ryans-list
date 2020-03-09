const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories", (req, res, next) => {
  const sql = `SELECT * FROM categories`

  conn.query(sql, (err, results, fields) => {
    const cats = results
      .filter(c => c.parent_id == null)
      .map(p => ({
        ...p,
        sub: results.filter(c => c.parent_id == p.id)
      }))

    res.json(cats)
  })
})

router.get("/category/:slug", (req, res, next) => {
  const slug = req.params.slug

  const sql = `
  SELECT p.id, p.name, p.posting, p.time_created
  FROM posts p
  LEFT JOIN categories c ON p.category_id = c.id
  WHERE c.slug = ?
  ORDER BY p.time_created DESC
  LIMIT 50
  `

  conn.query(
    "SELECT name FROM categories WHERE slug = ?",
    [slug],
    (err1, results1, fields1) => {
      conn.query(sql, [slug], (err, results, fields) => {
        const categoryName = results1[0].name
        res.json({
          catName: categoryName,
          posts: results
        })
      })
    }
  )
})

module.exports = router
