const pool = require('../config/db')

module.exports = {
  mAddCategory: (data) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO category SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mAllCategory: (search, sorting, pages) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM category ${search} ${sorting} ${pages}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mTotalCategory: (search) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT COUNT (*) as total FROM category ${search}`,(err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mDetailCategory: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM category WHERE id = ?', [id], (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mUpdateCategory: (data, id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE category SET ? WHERE id = ?', [data, id], (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mDeleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM category WHERE id = ?', [id], (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}