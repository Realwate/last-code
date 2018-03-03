
let baseUrl = 'http://localhost:7001/';
let basePath = '/';

if(process.env.NODE_ENV === 'production'){
	baseUrl = 'https://realwate.com/projects/graduation-project/';
	basePath = '/projects/graduation-project/';
}

export {
  baseUrl,basePath
}

