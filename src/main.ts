import { mount } from 'svelte'
import './styles/global.css';
import './styles/font.css';
import App from './App.svelte'

mount(App, {
	target: document.getElementById('app')
})
