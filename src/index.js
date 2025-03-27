export default {
	async fetch(request, env, ctx) {
	  if (request.method !== 'GET') {
		return new Response('Method not allowed', { status: 405 });
	  }
  
	  const url = new URL(request.url);
	  const token = url.searchParams.get('token');
	  const id = url.searchParams.get('id');
	  const text = url.searchParams.get('text') || "okpokpokpokpojjpojok";
  
	  if (!token || !id) {
		return new Response(JSON.stringify({ error: 'Token and chat ID are required' }), {
		  status: 400,
		  headers: { 'Content-Type': 'application/json' }
		});
	  }
  
	  try {
		const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
		  method: "POST",
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			chat_id: id,
			text: text,
			parse_mode: 'HTML' 
		  })
		});
		
		const data = await response.json();
		
		return new Response(JSON.stringify(data), {
		  headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		  }
		});
	  } catch (error) {
		return new Response(JSON.stringify({ 
		  error: error.message,
		  stack: error.stack
		}), {
		  status: 500,
		  headers: { 'Content-Type': 'application/json' }	
		});
	  }
	}
  };