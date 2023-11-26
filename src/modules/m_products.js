const pool = require('../config/db')
module.exports = {
  mAddProduct: (data) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO products SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mAllProduct: (search, sorting, pages) => {
    return new Promise((resolve, reject) => {
      pool.query(`
      SELECT *, products.id AS id, products.name AS name, category.name AS category FROM products LEFT JOIN category ON products.categoryId=category.id
      ${search} ${sorting} ${pages}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mTotalProduct: (search) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT COUNT (*) as total FROM products ${search}`
      ,(error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  mDetailProduct: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT *, products.id AS id, products.name AS name, category.name AS category FROM products LEFT JOIN category ON products.categoryId=category.id WHERE products.id = ?', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mUpdateProduct: (data, id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE products SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mDeleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}