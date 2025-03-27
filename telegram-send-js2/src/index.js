export default {
	async fetch(request, env, ctx) {
	  const url = new URL(request.url);
	  const token = url.searchParams.get('token'); //7625182592:AAGX0jkcydTx7NG2e2X3zkUvnOMmK5DeS9s
	  const id = url.searchParams.get('id'); //-1002192270366  

	  try {
		const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: "POST",
			body: JSON.stringify({ chat_id: id, text: "ok" }),
		});
		const data = await response.json();
		
		return new Response(JSON.stringify(data), {
		  headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		  }
		});
	  } catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
		  status: 500,
		  headers: { 'Content-Type': 'application/json' }	
		});
	  }
	}
  };