import Store from '@/store'

function requireAdminAuth(to, from, next) {

  global.Loading.begin("")
  Store.dispatch('session/check').then((r) => {
    global.Loading.end(); 
    if(r)
      next();
    else
      next({
        path: '/nao-permitido'
        //query: { redirect: to.fullPath }
      })
  }, () => {
    global.Loading.end(); 
    next({
      path: '/login'
    })
  })
}
function requireProdutorAuth(to, from, next) {

  Store.dispatch('session/isAuthed').then((r) => {
    if (r.user.type == 3)
      next();
    else
      next({
        path: '/nao-permitido'
        //query: { redirect: to.fullPath }
      })
  }, () => {
    //not logged redirect to login
    next({
      path: '/login'
      //query: { redirect: to.fullPath }
    })
  })

}
function requireHomeAuth(to, from, next) {

  Store.dispatch('session/isAuthed').then((r) => {
    if (r.user.type == 1) {
      next({
        path: '/admin'
        //query: { redirect: to.fullPath }
      })
    }else if (r.user.type == 2){
      next({
        path: '/investor/meus-investimentos'
        //query: { redirect: to.fullPath }
      })
    }else if (r.user.type == 3){
      if (r.user.completed_profile != 8 && r.user.completed_profile != 15){
        next({
          path: '/producer/perfil'
          //query: { redirect: to.fullPath }
        })
      }else{
        next();
      }
      
    }else
      next();
      
    
  }, () => {
    next({
      path: '/login'
    })
    

  })

}
function requireAuth(to, from, next) {
  global.Loading.begin("")
  Store.dispatch('session/check').then((r) => {
    global.Loading.end();  
    next();
  }, () => {
    global.Loading.end(); 
    next({
      path: '/login'
    })


  })

}
function requireUnauth(to, from, next) {
  global.Loading.begin("")
  Store.dispatch('session/check').then((r) => {
    global.Loading.end();  
    
    next({
      path: '/'
    })
  }, () => {
    global.Loading.end(); 
    next();

  })

}
function updateAuth(to, from, next) {

  Store.dispatch('session/isAuthed').then(() => {
    next();


  }, () => {
    next();
  })

}

function requireLogout(to, from, next) {
  Store.dispatch('session/logout').then(() => {
    next({
      path: '/login'
    })
  }, () => {

  });

}
function activate(to, from, next) {
  Store.dispatch('session/activateAccount', {token: to.query.signature}).then(() => {
      next({
        path: '/login'
      })
    }, () => {
      next({
        path: '/login'
      })
    });

}

export {
  requireAdminAuth,
  requireProdutorAuth,
  requireHomeAuth,
  requireUnauth,
  requireAuth,
  updateAuth,
  activate,
  requireLogout
}