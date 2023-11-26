const pool = require('../config/db')
module.exports = {
  mCheckEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (!err) {
          console.log(result);
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  mRegister: (data) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO users SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err));
        }
      })
    })
  },
  mCreateActivation: (token, email) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO activation (token, email) VALUES (? , ?)', [token, email], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mActivation: (token, email) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT id FROM activation WHERE token = ? AND email = ?', [token, email], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mActivationUser: (email, position, access) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE users SET position = ?, status = ?, access = ? WHERE email = ?', [position, 1, access, email], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  mDeleteActivation: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM activation WHERE id='${id}'`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mProfileMe: (token) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id, username, firstname, lastname, email, token, expired, phone, gender, position, image, status, access, created, updated FROM users WHERE token='${token}'`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  mGetAllUser: (search, sorting, pages) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users ${search} ${sorting} ${pages}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  modelTotalUser: (search) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT COUNT(*) as total FROM users ${search}`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  mDetailUser: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id, username, firstname, lastname, email, token, expired, phone, gender, position, image, status, access, created, updated FROM users WHERE id='${id}'`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mUpdateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  mDeleteUser: (id) => {
    return new Promise ((resolve, reject) => {
      pool.query(`DELETE FROM users WHERE id='${id}'`, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err));
        }
      })
    })
  }
}