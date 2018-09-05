let dom = `
<div id="ctrm_">
<style>
.ctrm-clearfix:after {
	visibility: hidden;
	display: block;
	font-size: 0;
	content: " ";
	clear: both;
	height: 0;
}
.ctrm-nowrap {
	white-space: nowrap;
}
.ctrm-break {
	word-break: break-all;
	word-wrap: break-word;
}
#ctrm_ {
	position: fixed;
	z-index: 10001;
	bottom: 0;
	right: 0;
	transition: all 0.3s;
	color: #444;
}
#ctrm_.ctrm-close {
	bottom: -36.8vw;
}
	#ctrm_.ctrm-close.ctrm-mobile {
		bottom: -88.32vw;
	}
#ctrm_ .ctrm-container {
	position: relative;
	width: 35vw;
	height: 40vw;
	max-height: 85vh;
	font-size: 0;
	border-top-left-radius: 2vw;
	overflow: hidden;
	transition: all 0.3s;
}
	#ctrm_.ctrm-mobile .ctrm-container {
		width: 96vw;
		height: 96vw;
	}
#ctrm_.ctrm-close .ctrm-container {
	width: 25vw;
}
	#ctrm_.ctrm-close.ctrm-mobile .ctrm-container {
		width: 65vw;
	}
#ctrm_ .ctrm-title {
	position: relative;
	width: 100%;
	background: rgba(230,230,230,0.85);
	font-size: 1.1vw;
	height: 8%;
}
	#ctrm_.ctrm-mobile .ctrm-title {
		font-size: 2.8vw;
	}
#ctrm_ .ctrm-title-url a {
	font-size: 0.7vw;
	text-decoration: none;
	color: #aaa;
}
#ctrm_.ctrm-close .ctrm-title {
	cursor: pointer;
}
#ctrm_.ctrm-close .ctrm-title-url a:link,
#ctrm_.ctrm-close .ctrm-title-url a:hover {
	text-decoration: underline;
	color: deeppink;
}
#ctrm_ .ctrm-title-span {
	position: absolute;
	display: inline-block;
	top: 0;
	bottom: 0;
	left: 1.6vw;
	margin: auto 0;
	height: 3vw;
	line-height: 3vw;
}
#ctrm_ .ctrm-title-close {
	position: absolute;
	right: 1vw;
	top: 0;
	bottom: 0;
	margin: auto 0;
	width: 2.2vw;
	height: 2.2vw;
	line-height: 2.3vw;
	font-size: 1.5vw;
	text-align: center;
	border-radius: 50%;
	border: 1px solid #999;
	cursor: pointer;
	background: #f4f4f4;
}
#ctrm_ .ctrm-title-reconn {
	position: absolute;
	right: 4vw;
	top: 0;
	bottom: 0;
	margin: auto 0;
	width: 2.2vw;
	height: 2.2vw;
	line-height: 2.3vw;
	font-size: 1.5vw;
	text-align: center;
	border-radius: 50%;
	border: 1px solid #999;
	cursor: pointer;
	background: #f4f4f4;
}
	#ctrm_.ctrm-mobile .ctrm-title-close {
		right: 2vw;
		width: 6vw;
		height: 6vw;
		line-height: 6vw;
		font-size: 3.5vw;
	}
	#ctrm_.ctrm-mobile .ctrm-title-reconn {
		right: 10vw;
		width: 6vw;
		height: 6vw;
		line-height: 6vw;
		font-size: 3.5vw;
	}
#ctrm_ .ctrm-panel {
	position: relative;
	display: inline-block;
	float: left;
	width: 70%;
	height: 92%;
	font-size: 1.2vw;
	background: rgba(252,252,252,0.85);
}
#ctrm_ .ctrm-dialog {
	height: 75%;
	overflow-y: auto;
	padding: 0.4vw 1.2vw;
	box-sizing: border-box;
	text-align: left;
}
	#ctrm_.ctrm-mobile .ctrm-dialog {
		padding: 0.6vw 2.4vw;
	}
.ctrm-dialog-item .ctrm-dialog-sender {
	font-size: 0.8vw;
	margin-top: 0.6vw;
	margin-bottom: 0.1vw;
}
	.ctrm-mobile .ctrm-dialog-item .ctrm-dialog-sender {
		font-size: 2vw;
		margin-top: 1.2vw;
		margin-bottom: 0.2vw;
	}
.ctrm-dialog-item.ctrm-me .ctrm-dialog-sender {
	text-align: right;
}
.ctrm-dialog-item .ctrm-dialog-bubble {
	position: relative;
	display: inline-block;
	font-size: 0.8em;
	padding: 0.8vw 1vw 1.4vw 1vw;
	box-sizing: border-box;
	border-radius: 1vw;
	min-width: 4vw;
	line-height: 1.4;
	overflow: hidden;
}
	.ctrm-mobile .ctrm-dialog-item .ctrm-dialog-bubble {
		font-size: 2.8em;
		padding: 2.4vw 3vw 4vw 3vw;
		border-radius: 2vw;
		min-width: 12vw;
	}
.ctrm-dialog-item.ctrm-me .ctrm-dialog-bubble {
	float: right;
}
.ctrm-dialog-item .ctrm-dialog-time {
	position: absolute;
	bottom: 0.3vw;
	right: 1vw;
	font-size: 0.6vw;
	color: #999;
}
	.ctrm-mobile .ctrm-dialog-item .ctrm-dialog-time {
		font-size: 1.6vw;
		right: 1.6vw;
	}
#ctrm_ .ctrm-textarea {
	position: relative;
	border: 1px solid #eee;
	box-sizing: border-box;
	height: 25%;
	font-size: 1.3vw;
}
#ctrm_ .ctrm-textarea textarea {
	border: none;
	resize: none;
	width: 100%;
	height: 100%;
	outline: none;
	box-shadow: none;
	margin: 0;
	padding: 1vw;
	box-sizing: border-box;
	font-size: 1.02vw !important;
	color: #444;
}
	#ctrm_.ctrm-mobile .ctrm-textarea textarea {
		padding: 2vw;
		font-size: 3.3vw !important;
	}
#ctrm_ .ctrm-textarea textarea::-webkit-input-placeholder {
	color: #ccc;
}
#ctrm_ .ctrm-textarea textarea:-ms-input-placeholder {
	color: #ccc;
}
#ctrm_ .ctrm-textarea textarea:-moz-placeholder {
	color: #ccc;
}
#ctrm_ .ctrm-textarea textarea::-moz-placeholder {
	color: #ccc;
}
#ctrm_ .ctrm-emit {
	position: absolute;
	bottom: 1.2vw;
	right: 1.2vw;
	width: 5vw;
	height: 2.4vw;
	line-height: 2.4vw;
	font-size: 1.2vw;
	color: #666;
	text-align: center;
	background: #eee;
	border-radius: 0.6vw;
	cursor: pointer;
}
	#ctrm_.ctrm-mobile .ctrm-emit {
		bottom: 2.4vw;
		right: 2.4vw;
		width: 14vw;
		height: 7vw;
		line-height: 7vw;
		font-size: 3.1vw;
		border-radius: 1.2vw;
	}
#ctrm_ .ctrm-online {
	position: relative;
	display: inline-block;
	float: left;
	width: 30%;
	height: 92%;
	font-size: 1vw;
	background: rgba(240,240,240,0.85);
}
#ctrm_ .ctrm-online-wrap {
	height: 75%;
	overflow-y: auto;
	padding-top: 2%;
}
#ctrm_ .ctrm-online-item {
	width: 90%;
	height: 2.25vw;
	line-height: 2.25vw;
	border-radius: 1vw;
	text-align: center;
	font-size: 0.85em;
	margin: 0.5vw 0 0.5vw 5%;
	white-space: nowrap;
	cursor: pointer;
	overflow: hidden;
}
	#ctrm_.ctrm-mobile .ctrm-online-item {
		height: 6vw;
		line-height: 6vw;
		font-size: 2.3em;
		margin-top: 1.2vw;
		margin-bottom: 1.2vw;
		border-radius: 2.5vw;
	}
#ctrm_ .ctrm-domain {
	height: 25%;
	font-size: 1.02vw;
	overflow: hidden;
}
#ctrm_ .ctrm-domain-title {
	text-align: center;
	padding: 0.6vw 0 0.4vw;
}
	#ctrm_.ctrm-mobile .ctrm-domain-title {
		padding: 1.5vw 0 1vw;
		font-size: 2.5em;
	}
#ctrm_ .ctrm-domain-item {
	display: block;
	width: 100%;
	text-align: center;
	overflow: hidden;
	white-space: nowrap;
	height: 1.8vw;
	line-height: 1.8vw;
	color: #0099FF;
}
	#ctrm_.ctrm-mobile .ctrm-domain-item {
		font-size: 2.5em;
		height: 4.6vw;
		line-height: 4.6vw;
	}
#ctrm_ .ctrm-domain-item:hover {
	background: rgba(0,0,0,0.1);
}
</style>
<div class="ctrm-container">
	<div class="ctrm-title">
		<span class="ctrm-title-span"><span class="ctrm-title-domain"></span>的聊天室 <span class="ctrm-title-countwrap" style="display: none;">(<span class="ctrm-title-count">0</span>)</span>&nbsp;&nbsp;<span class="ctrm-title-url"><a href="https://hacpai.com/article/1534741351807" target="_blank">powered by TopURL.cn</a></span></span>
		<div class="ctrm-title-close" title="老板出没">▼</div>
		<div class="ctrm-title-reconn" title="重新做人">囧</div>
	</div>
	<div class="ctrm-panel">
		<div class="ctrm-dialog"></div>
		<div class="ctrm-textarea">
			<textarea placeholder="说点什么吧..." maxlength="50"></textarea>
			<div class="ctrm-emit">发送</div>
		</div>
	</div>
	<div class="ctrm-online">
		<div class="ctrm-online-wrap"></div>
		<div class="ctrm-domain">
			<div class="ctrm-domain-title">本周尬聊排行榜</div>
			<div class="ctrm-domain-wrap"></div>
		</div>
	</div>
</div>
</div>
`.replace(/\t/g, '').replace(/\n/g, '');

module.exports = dom;