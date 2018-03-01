
let baseUrl = 'http://localhost:7001/';

if(process.env.NODE_ENV === 'production'){
	baseUrl = 'https://realwate.com/projects/graduation-project/';
}

export {
  baseUrl
}

