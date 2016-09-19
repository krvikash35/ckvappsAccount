module.exports = new ReqResExtracter();

function ReqResExtracter(){

}

ReqResExtracter.prototype.getRequest = getRequest;
ReqResExtracter.prototype.getResponse = getResponse;

function getRequest(req){
	let reqObj = {
		"host": req.headers['host'],
		"user-agent": req.headers['user-agent'],
		"referer": req.headers['referer'],
		"originalUrl": req['originalUrl'],
		"baseUrl": req['baseUrl'],
		"path": req['path'],
		"query": req['query'],
		"body": req['body']
	}
	return JSON.stringify( reqObj, null, 4 );
}

function getResponse(res){

}
