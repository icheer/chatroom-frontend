;(function(){
	if(window._hasCtrmInjected){
		document.querySelector('.ctrm-title').click();
		return;
	};
	window._hasCtrmInjected = true;

	let $, ws, isWaiting, isReconnecting, checkTimer, myChatId, myChatName;
	let memberList;
	const wsServer = 'wss://topurl.cn:9001';

	if(!window.jQuery){
		$ = require('jQuery-slim');
	} else {
		$ = window.jQuery;
	}
	const $dom = $(require('./dom.js'));
	const $body = $(document.body);
	$body.append($dom);
	initWs();
	const $ctrm = $('#ctrm_');
	const $title = $ctrm.find('.ctrm-title');
	const $url = $ctrm.find('.ctrm-title-url');
	const $panel = $ctrm.find('.ctrm-panel');
	const $dialog = $ctrm.find('.ctrm-dialog');
	const $textarea = $ctrm.find('.ctrm-textarea textarea');
	const $emit = $ctrm.find('.ctrm-emit');
	const $online = $ctrm.find('.ctrm-online-wrap');
	const $domain = $ctrm.find('.ctrm-domain-wrap');
	const $countwrap = $ctrm.find('.ctrm-title-countwrap');
	const $count = $ctrm.find('.ctrm-title-count');
	const $close = $ctrm.find('.ctrm-title-close');
	const $reconn = $ctrm.find('.ctrm-title-reconn');
	bindEvent();

	function bindEvent(){
		$close.click((e)=>{
			$ctrm.addClass('ctrm-close');
			$close.hide();
			$reconn.hide();
			$url.hide();
			$countwrap.show();
			e.stopPropagation();
		});
		$title.click(()=>{
			if($ctrm.hasClass('ctrm-close')){
				$ctrm.removeClass('ctrm-close');
				$close.show();
				$reconn.show();
				$countwrap.hide();
				onResize();
			}
		});
		$reconn.click(tryToReconnect);
		$emit.click(sendMessage);
		$textarea.on('keydown',function(event) {
			if(event.keyCode===13){
				event.preventDefault();
			}
		});
		$textarea.on('keyup',function(event) {
			if(event.keyCode===13){
				sendMessage();
			}
		});
	}

	function initWs(){
		ws = new WebSocket(wsServer);
		ws.onopen = () => {
			let json = {
				type: 'update',
				data: {
					domainFrom: location.hostname
				}
			}
			ws.send(JSON.stringify(json));
			ws.onmessage = msg => proceedMessage(msg);
			ws.onclose = () => noticeDisconnect();
			clearInterval(checkTimer);
			checkTimer = setInterval(checkIfOnline,15000);
			window.addEventListener('beforeunload', ()=>ws.close());
		}
	}

	function checkIfOnline(){
		if(ws.readyState !== ws.OPEN){
			noticeDisconnect();
		}
	}

	function proceedMessage(raw){
		let json = JSON.parse(raw.data);
		let type = json.type;
		let data = json.data;
		switch(type){
			case 'identity':
				myChatId = data.id;
				myChatName = data.name;
				setDomain(data.domain);
				loadHistory(data.history);
				loadBillboard(data.billboard);
				break;
			case 'memberList':
				renderMemberList(data);
				break;
			case 'chat':
				renderChat(data);
				break;
			case 'ack':
				$textarea.val('');
				break;
		}
	}

	function setDomain(domain){
		domain ? (domain = domain+' ') : (domain = '异次元');
		$('.ctrm-title-domain').text(domain);
	}

	function loadHistory(arr){
		if(!arr || arr.length===0) return;
		arr.forEach(i=>{
			renderChat(i);
		});
	}

	function loadBillboard(arr){
		$domain.empty();
		if(!arr || arr.length===0) return;
		arr.sort((i,j)=>(j.times-i.times));
		arr.forEach(i=>{
			let $item = $(`<a class="ctrm-domain-item" target="_blank" href="http://${i.domainFrom}">${i.domainFrom}</a>`);
			$domain.append($item);
		})
	}

	function renderMemberList(data){
		memberList = data;
		getColor(memberList);
		$online.empty();
		memberList.forEach(i=>{
			let item = $(`<div class="ctrm-online-item" style="background-color: ${i.color}">${i.name}</div>`);
			$online.append(item);
			item.click(function(){
				let name = this.innerText;
				$textarea.val('@'+name+' ');
				$textarea.get(0).focus();
			});
		});
	}

	function getColor(input){
		let f = (id) => {
			let str = id.toString();
			let base = +str.slice(-4,-1);
			let r = base*11%256;
			let g = base*7%256;
			let b = base*5%256;
			return `rgba(${r}, ${g}, ${b}, 0.3)`;
		}
		if(input.id) {
			input.color = f(input.id);
		} else {
			input.forEach(i=>{
				i.color = f(i.id);
			})
		}
	}

	function getPreZero(input, flag){
		let date = new Date(input);
		let output;
		if(flag==='hours'){
			output = ''+date.getHours();
		} else {
			output = ''+date.getMinutes();
		}
		(output === output[0]) && (output = '0'+output);
		return output;
	}

	function renderChat(data){
		getColor(data);
		let dom = `
				<div class="ctrm-dialog-item">
					<div class="ctrm-dialog-sender">
						${data.name}
					</div>
					<div class="ctrm-clearfix">
						<div class="ctrm-dialog-bubble ctrm-break" style="background-color: ${data.color}">
							${data.msg}
							<div class="ctrm-dialog-time">
								${getPreZero(data.time,'hours')}:${getPreZero(data.time,'minutes')}
							</div>
						</div>
					</div>
				</div>
			`.replace(/\t/g, '').replace(/\n/g, '');
		let $dom = $(dom);
		if(myChatId === data.id){
			$dom.addClass('ctrm-me');
			let name = $dom.find('.ctrm-dialog-sender').text();
			$dom.find('.ctrm-dialog-sender').text(name+'（我）');
		};
		$dialog.append($dom);
		scrollToBottom();
	}

	function noticeDisconnect(){
		let time = Date.now();
		let json = {
			time: time,
			id: 111111111211,
			name: 'SYSTEM',
			msg: '您已掉线，点‘囧’重连...'
		}
		if(!isReconnecting){
			renderChat(json);
		}
		renderMemberList([]);
		clearInterval(checkTimer);
	}

	function scrollToBottom(){
		$dialog.scrollTop(9999999);
		let count = $dialog.find('.ctrm-dialog-item').length;
		$count.text(count);
	}

	function sendMessage(){
		let msg = $textarea.val().slice(0,50).trim();
		if(msg.length===0){
			return alert('消息不能为空');
		}
		if(isWaiting) return;
		var json = {
			type: 'chat',
			data: {
				msg: msg
			}
		}
		ws.send(JSON.stringify(json));
		isWaiting = true;
		setTimeout(()=>{
			isWaiting = false;
		},2000);
	}

	function tryToReconnect(){
		if(isReconnecting) return;
		ws.close();
		initWs();
		isReconnecting = true;
		$dialog.find('.ctrm-dialog-item').remove();
		$textarea.val('');
		setTimeout(()=>{
			isReconnecting = false;
		}, 2000);
	}

	function onResize(){
		let w = window.innerWidth;
		let h = window.innerHeight;
		if(w/h<=1.2){
			$ctrm.addClass('ctrm-mobile');
		} else {
			$ctrm.removeClass('ctrm-mobile');
		}
		if(w<=1210 || $ctrm.hasClass('ctrm-mobile')){
			$url.hide();
		} else {
			if(!$ctrm.hasClass('ctrm-mobile')){
				$url.show();
			}
		}
		$dialog.scrollTop(9999999);
	}

	function autoFold(){
		if($ctrm.hasClass('ctrm-mobile')){
			setTimeout(()=>{
				$close.click();
			},500);
		}
	}

	onResize();
	autoFold();
	window.addEventListener('resize',onResize);
})();
