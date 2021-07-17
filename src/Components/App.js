import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-terminal';
import Capsule from './Capsule';
import './App.css';

class App extends React.Component {
	
	constructor() {
		super();
		this.state = {
			html: '<div class="hello" id="hello">\n\tHello\n</div>\n<div class="button-container">\n\t<input type="button" value="Click me!" onclick="toggleHello()" />\n</div>',
			js: '/*Never leave any brackets or strings unbalanced,\nhot-reloading will throw compilerError*/\nfunction toggleHello() {\n\tdocument.getElementById("hello").innerHTML = "Bye";\n}',
			css: '/*Do not select tags such as html, body, or div;*/\n.hello {\n\tcolor: blue;\n\tfont-size: 2rem;\n}',
			button: 'html'
		};
		document.getElementById('frame').innerHTML = this.state.html;
		this.cssSrc = document.createElement("STYLE");
		this.cssSrc.innerHTML = this.state.css;
		document.head.appendChild(this.cssSrc);
		this.jsSrc = document.createElement("SCRIPT");
		this.jsSrc.innerHTML = this.state.js;
		document.head.appendChild(this.jsSrc);
	}
	
	/*
	Values of all files are stored as state to enable hot-reloading. For CSS and JavaScript,
	style and script elements, respectively, containing the user input are added to the DOM.
	For HTML, a div with id = 'frame' has been created in index.html. Whenever, the user 
	changes the content of these "files" in the editor, the page is reloaded and the div displays
	the desirable content.
	*/
	
	onCapsuleClick = async (event, button) => {
		this.setState({ button });
	};
	
	onHTMLChange = async (value) => {
		await this.setState({
			html: value
		});
		document.getElementById('frame').innerHTML = this.state.html;
	};
	
	onJSChange = async (value) => {
		await this.setState({
			js: value
		});
		document.head.removeChild(this.jsSrc);
		this.jsSrc = document.createElement("SCRIPT");
		this.jsSrc.innerHTML = this.state.js;  
		document.head.appendChild(this.jsSrc);
	};
	//For JavaScript everytime, the user changes the value a new element needs to be created
	
	onCSSChange = async (value) => {
		await this.setState({
			css: value
		});
		this.cssSrc.innerHTML = this.state.css;
	};
	
	getRender = () => {
		switch(this.state.button) {
			case 'html':
				return <div><AceEditor style={{ top: '10px' }} className="ace-editor" height="90vh" width="45vw" mode="html" theme="terminal" onChange={this.onHTMLChange} name="editor-html" value={this.state.html} /></div>;
				break;
			case 'js':
				return <div><AceEditor style={{ top: '10px' }} className="ace-editor" height="90vh" width="45vw" mode="javascript" theme="terminal" onChange={this.onJSChange} name="editor-js" value={this.state.js} /></div>;
				break;
			case 'css':
				return <div><AceEditor style={{ top: '10px' }} className="ace-editor" height="90vh" width="45vw" mode="css" theme="terminal" onChange={this.onCSSChange} name="editor-css" value={this.state.css} /></div>;
		}
	};
	
	render() {
		return (
			<div>
				<Capsule ext="html" onCapsuleClick={() => {this.onCapsuleClick(event, 'html')}} active={this.state.button} />
				<Capsule ext="js" onCapsuleClick={() => {this.onCapsuleClick(event, 'js')}} active={this.state.button} />
				<Capsule ext="css" onCapsuleClick={() => {this.onCapsuleClick(event, 'css')}} active={this.state.button} />
				{this.getRender()}
			</div>
		);
	}
}

export default App;