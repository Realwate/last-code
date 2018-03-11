
let baseUrl = 'http://localhost:7001/'; // api请求用
let basePath = '/';                     // 路由用

if(process.env.NODE_ENV === 'production'){
	baseUrl = 'https://realwate.com/projects/graduation-project/';
	basePath = '/projects/graduation-project/';
}

export {
  baseUrl,basePath
}

