
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
	'use strict';

	/** @returns {void} */
	function noop() {}

	const identity = (x) => x;

	/** @returns {void} */
	function add_location(element, file, line, column, char) {
		element.__svelte_meta = {
			loc: { file, line, column, char }
		};
	}

	function run(fn) {
		return fn();
	}

	function blank_object() {
		return Object.create(null);
	}

	/**
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function run_all(fns) {
		fns.forEach(run);
	}

	/**
	 * @param {any} thing
	 * @returns {thing is Function}
	 */
	function is_function(thing) {
		return typeof thing === 'function';
	}

	/** @returns {boolean} */
	function safe_not_equal(a, b) {
		return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
	}

	let src_url_equal_anchor;

	/**
	 * @param {string} element_src
	 * @param {string} url
	 * @returns {boolean}
	 */
	function src_url_equal(element_src, url) {
		if (element_src === url) return true;
		if (!src_url_equal_anchor) {
			src_url_equal_anchor = document.createElement('a');
		}
		// This is actually faster than doing URL(..).href
		src_url_equal_anchor.href = url;
		return element_src === src_url_equal_anchor.href;
	}

	/** @returns {boolean} */
	function is_empty(obj) {
		return Object.keys(obj).length === 0;
	}

	/** @returns {void} */
	function validate_store(store, name) {
		if (store != null && typeof store.subscribe !== 'function') {
			throw new Error(`'${name}' is not a store with a 'subscribe' method`);
		}
	}

	function subscribe(store, ...callbacks) {
		if (store == null) {
			for (const callback of callbacks) {
				callback(undefined);
			}
			return noop;
		}
		const unsub = store.subscribe(...callbacks);
		return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
	}

	/** @returns {void} */
	function component_subscribe(component, store, callback) {
		component.$$.on_destroy.push(subscribe(store, callback));
	}

	function set_store_value(store, ret, value) {
		store.set(value);
		return ret;
	}

	const is_client = typeof window !== 'undefined';

	/** @type {() => number} */
	let now = is_client ? () => window.performance.now() : () => Date.now();

	let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;

	const tasks = new Set();

	/**
	 * @param {number} now
	 * @returns {void}
	 */
	function run_tasks(now) {
		tasks.forEach((task) => {
			if (!task.c(now)) {
				tasks.delete(task);
				task.f();
			}
		});
		if (tasks.size !== 0) raf(run_tasks);
	}

	/**
	 * Creates a new task that runs on each raf frame
	 * until it returns a falsy value or is aborted
	 * @param {import('./private.js').TaskCallback} callback
	 * @returns {import('./private.js').Task}
	 */
	function loop(callback) {
		/** @type {import('./private.js').TaskEntry} */
		let task;
		if (tasks.size === 0) raf(run_tasks);
		return {
			promise: new Promise((fulfill) => {
				tasks.add((task = { c: callback, f: fulfill }));
			}),
			abort() {
				tasks.delete(task);
			}
		};
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append(target, node) {
		target.appendChild(node);
	}

	/**
	 * @param {Node} node
	 * @returns {ShadowRoot | Document}
	 */
	function get_root_for_style(node) {
		if (!node) return document;
		const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
		if (root && /** @type {ShadowRoot} */ (root).host) {
			return /** @type {ShadowRoot} */ (root);
		}
		return node.ownerDocument;
	}

	/**
	 * @param {Node} node
	 * @returns {CSSStyleSheet}
	 */
	function append_empty_stylesheet(node) {
		const style_element = element('style');
		// For transitions to work without 'style-src: unsafe-inline' Content Security Policy,
		// these empty tags need to be allowed with a hash as a workaround until we move to the Web Animations API.
		// Using the hash for the empty string (for an empty tag) works in all browsers except Safari.
		// So as a workaround for the workaround, when we append empty style tags we set their content to /* empty */.
		// The hash 'sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=' will then work even in Safari.
		style_element.textContent = '/* empty */';
		append_stylesheet(get_root_for_style(node), style_element);
		return style_element.sheet;
	}

	/**
	 * @param {ShadowRoot | Document} node
	 * @param {HTMLStyleElement} style
	 * @returns {CSSStyleSheet}
	 */
	function append_stylesheet(node, style) {
		append(/** @type {Document} */ (node).head || node, style);
		return style.sheet;
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @param {Node} [anchor]
	 * @returns {void}
	 */
	function insert(target, node, anchor) {
		target.insertBefore(node, anchor || null);
	}

	/**
	 * @param {Node} node
	 * @returns {void}
	 */
	function detach(node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	/**
	 * @template {keyof HTMLElementTagNameMap} K
	 * @param {K} name
	 * @returns {HTMLElementTagNameMap[K]}
	 */
	function element(name) {
		return document.createElement(name);
	}

	/**
	 * @template {keyof SVGElementTagNameMap} K
	 * @param {K} name
	 * @returns {SVGElement}
	 */
	function svg_element(name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name);
	}

	/**
	 * @param {string} data
	 * @returns {Text}
	 */
	function text(data) {
		return document.createTextNode(data);
	}

	/**
	 * @returns {Text} */
	function space() {
		return text(' ');
	}

	/**
	 * @returns {Text} */
	function empty() {
		return text('');
	}

	/**
	 * @param {EventTarget} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
	 * @returns {() => void}
	 */
	function listen(node, event, handler, options) {
		node.addEventListener(event, handler, options);
		return () => node.removeEventListener(event, handler, options);
	}

	/**
	 * @param {Element} node
	 * @param {string} attribute
	 * @param {string} [value]
	 * @returns {void}
	 */
	function attr(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
	}

	/**
	 * @returns {void} */
	function set_custom_element_data(node, prop, value) {
		if (prop in node) {
			node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
		} else {
			attr(node, prop, value);
		}
	}

	/**
	 * @param {Element} element
	 * @returns {ChildNode[]}
	 */
	function children(element) {
		return Array.from(element.childNodes);
	}

	/**
	 * @returns {void} */
	function set_style(node, key, value, important) {
		if (value == null) {
			node.style.removeProperty(key);
		} else {
			node.style.setProperty(key, value, important ? 'important' : '');
		}
	}

	/**
	 * @returns {void} */
	function toggle_class(element, name, toggle) {
		// The `!!` is required because an `undefined` flag means flipping the current state.
		element.classList.toggle(name, !!toggle);
	}

	/**
	 * @template T
	 * @param {string} type
	 * @param {T} [detail]
	 * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
	 * @returns {CustomEvent<T>}
	 */
	function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
		return new CustomEvent(type, { detail, bubbles, cancelable });
	}

	/**
	 * @typedef {Node & {
	 * 	claim_order?: number;
	 * 	hydrate_init?: true;
	 * 	actual_end_child?: NodeEx;
	 * 	childNodes: NodeListOf<NodeEx>;
	 * }} NodeEx
	 */

	/** @typedef {ChildNode & NodeEx} ChildNodeEx */

	/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

	/**
	 * @typedef {ChildNodeEx[] & {
	 * 	claim_info?: {
	 * 		last_index: number;
	 * 		total_claimed: number;
	 * 	};
	 * }} ChildNodeArray
	 */

	// we need to store the information for multiple documents because a Svelte application could also contain iframes
	// https://github.com/sveltejs/svelte/issues/3624
	/** @type {Map<Document | ShadowRoot, import('./private.d.ts').StyleInformation>} */
	const managed_styles = new Map();

	let active = 0;

	// https://github.com/darkskyapp/string-hash/blob/master/index.js
	/**
	 * @param {string} str
	 * @returns {number}
	 */
	function hash(str) {
		let hash = 5381;
		let i = str.length;
		while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
		return hash >>> 0;
	}

	/**
	 * @param {Document | ShadowRoot} doc
	 * @param {Element & ElementCSSInlineStyle} node
	 * @returns {{ stylesheet: any; rules: {}; }}
	 */
	function create_style_information(doc, node) {
		const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
		managed_styles.set(doc, info);
		return info;
	}

	/**
	 * @param {Element & ElementCSSInlineStyle} node
	 * @param {number} a
	 * @param {number} b
	 * @param {number} duration
	 * @param {number} delay
	 * @param {(t: number) => number} ease
	 * @param {(t: number, u: number) => string} fn
	 * @param {number} uid
	 * @returns {string}
	 */
	function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
		const step = 16.666 / duration;
		let keyframes = '{\n';
		for (let p = 0; p <= 1; p += step) {
			const t = a + (b - a) * ease(p);
			keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
		}
		const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
		const name = `__svelte_${hash(rule)}_${uid}`;
		const doc = get_root_for_style(node);
		const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
		if (!rules[name]) {
			rules[name] = true;
			stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
		}
		const animation = node.style.animation || '';
		node.style.animation = `${
		animation ? `${animation}, ` : ''
	}${name} ${duration}ms linear ${delay}ms 1 both`;
		active += 1;
		return name;
	}

	/**
	 * @param {Element & ElementCSSInlineStyle} node
	 * @param {string} [name]
	 * @returns {void}
	 */
	function delete_rule(node, name) {
		const previous = (node.style.animation || '').split(', ');
		const next = previous.filter(
			name
				? (anim) => anim.indexOf(name) < 0 // remove specific animation
				: (anim) => anim.indexOf('__svelte') === -1 // remove all Svelte animations
		);
		const deleted = previous.length - next.length;
		if (deleted) {
			node.style.animation = next.join(', ');
			active -= deleted;
			if (!active) clear_rules();
		}
	}

	/** @returns {void} */
	function clear_rules() {
		raf(() => {
			if (active) return;
			managed_styles.forEach((info) => {
				const { ownerNode } = info.stylesheet;
				// there is no ownerNode if it runs on jsdom.
				if (ownerNode) detach(ownerNode);
			});
			managed_styles.clear();
		});
	}

	let current_component;

	/** @returns {void} */
	function set_current_component(component) {
		current_component = component;
	}

	function get_current_component() {
		if (!current_component) throw new Error('Function called outside component initialization');
		return current_component;
	}

	/**
	 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
	 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
	 * it can be called from an external module).
	 *
	 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
	 *
	 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
	 *
	 * https://svelte.dev/docs/svelte#onmount
	 * @template T
	 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
	 * @returns {void}
	 */
	function onMount(fn) {
		get_current_component().$$.on_mount.push(fn);
	}

	const dirty_components = [];
	const binding_callbacks = [];

	let render_callbacks = [];

	const flush_callbacks = [];

	const resolved_promise = /* @__PURE__ */ Promise.resolve();

	let update_scheduled = false;

	/** @returns {void} */
	function schedule_update() {
		if (!update_scheduled) {
			update_scheduled = true;
			resolved_promise.then(flush);
		}
	}

	/** @returns {void} */
	function add_render_callback(fn) {
		render_callbacks.push(fn);
	}

	// flush() calls callbacks in this order:
	// 1. All beforeUpdate callbacks, in order: parents before children
	// 2. All bind:this callbacks, in reverse order: children before parents.
	// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
	//    for afterUpdates called during the initial onMount, which are called in
	//    reverse order: children before parents.
	// Since callbacks might update component values, which could trigger another
	// call to flush(), the following steps guard against this:
	// 1. During beforeUpdate, any updated components will be added to the
	//    dirty_components array and will cause a reentrant call to flush(). Because
	//    the flush index is kept outside the function, the reentrant call will pick
	//    up where the earlier call left off and go through all dirty components. The
	//    current_component value is saved and restored so that the reentrant call will
	//    not interfere with the "parent" flush() call.
	// 2. bind:this callbacks cannot trigger new flush() calls.
	// 3. During afterUpdate, any updated components will NOT have their afterUpdate
	//    callback called a second time; the seen_callbacks set, outside the flush()
	//    function, guarantees this behavior.
	const seen_callbacks = new Set();

	let flushidx = 0; // Do *not* move this inside the flush() function

	/** @returns {void} */
	function flush() {
		// Do not reenter flush while dirty components are updated, as this can
		// result in an infinite loop. Instead, let the inner flush handle it.
		// Reentrancy is ok afterwards for bindings etc.
		if (flushidx !== 0) {
			return;
		}
		const saved_component = current_component;
		do {
			// first, call beforeUpdate functions
			// and update components
			try {
				while (flushidx < dirty_components.length) {
					const component = dirty_components[flushidx];
					flushidx++;
					set_current_component(component);
					update(component.$$);
				}
			} catch (e) {
				// reset dirty state to not end up in a deadlocked state and then rethrow
				dirty_components.length = 0;
				flushidx = 0;
				throw e;
			}
			set_current_component(null);
			dirty_components.length = 0;
			flushidx = 0;
			while (binding_callbacks.length) binding_callbacks.pop()();
			// then, once components are updated, call
			// afterUpdate functions. This may cause
			// subsequent updates...
			for (let i = 0; i < render_callbacks.length; i += 1) {
				const callback = render_callbacks[i];
				if (!seen_callbacks.has(callback)) {
					// ...so guard against infinite loops
					seen_callbacks.add(callback);
					callback();
				}
			}
			render_callbacks.length = 0;
		} while (dirty_components.length);
		while (flush_callbacks.length) {
			flush_callbacks.pop()();
		}
		update_scheduled = false;
		seen_callbacks.clear();
		set_current_component(saved_component);
	}

	/** @returns {void} */
	function update($$) {
		if ($$.fragment !== null) {
			$$.update();
			run_all($$.before_update);
			const dirty = $$.dirty;
			$$.dirty = [-1];
			$$.fragment && $$.fragment.p($$.ctx, dirty);
			$$.after_update.forEach(add_render_callback);
		}
	}

	/**
	 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function flush_render_callbacks(fns) {
		const filtered = [];
		const targets = [];
		render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
		targets.forEach((c) => c());
		render_callbacks = filtered;
	}

	/**
	 * @type {Promise<void> | null}
	 */
	let promise;

	/**
	 * @returns {Promise<void>}
	 */
	function wait() {
		if (!promise) {
			promise = Promise.resolve();
			promise.then(() => {
				promise = null;
			});
		}
		return promise;
	}

	/**
	 * @param {Element} node
	 * @param {INTRO | OUTRO | boolean} direction
	 * @param {'start' | 'end'} kind
	 * @returns {void}
	 */
	function dispatch(node, direction, kind) {
		node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
	}

	const outroing = new Set();

	/**
	 * @type {Outro}
	 */
	let outros;

	/**
	 * @returns {void} */
	function group_outros() {
		outros = {
			r: 0,
			c: [],
			p: outros // parent group
		};
	}

	/**
	 * @returns {void} */
	function check_outros() {
		if (!outros.r) {
			run_all(outros.c);
		}
		outros = outros.p;
	}

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} [local]
	 * @returns {void}
	 */
	function transition_in(block, local) {
		if (block && block.i) {
			outroing.delete(block);
			block.i(local);
		}
	}

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} local
	 * @param {0 | 1} [detach]
	 * @param {() => void} [callback]
	 * @returns {void}
	 */
	function transition_out(block, local, detach, callback) {
		if (block && block.o) {
			if (outroing.has(block)) return;
			outroing.add(block);
			outros.c.push(() => {
				outroing.delete(block);
				if (callback) {
					if (detach) block.d(1);
					callback();
				}
			});
			block.o(local);
		} else if (callback) {
			callback();
		}
	}

	/**
	 * @type {import('../transition/public.js').TransitionConfig}
	 */
	const null_transition = { duration: 0 };

	/**
	 * @param {Element & ElementCSSInlineStyle} node
	 * @param {TransitionFn} fn
	 * @param {any} params
	 * @returns {{ start(): void; invalidate(): void; end(): void; }}
	 */
	function create_in_transition(node, fn, params) {
		/**
		 * @type {TransitionOptions} */
		const options = { direction: 'in' };
		let config = fn(node, params, options);
		let running = false;
		let animation_name;
		let task;
		let uid = 0;

		/**
		 * @returns {void} */
		function cleanup() {
			if (animation_name) delete_rule(node, animation_name);
		}

		/**
		 * @returns {void} */
		function go() {
			const {
				delay = 0,
				duration = 300,
				easing = identity,
				tick = noop,
				css
			} = config || null_transition;
			if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
			tick(0, 1);
			const start_time = now() + delay;
			const end_time = start_time + duration;
			if (task) task.abort();
			running = true;
			add_render_callback(() => dispatch(node, true, 'start'));
			task = loop((now) => {
				if (running) {
					if (now >= end_time) {
						tick(1, 0);
						dispatch(node, true, 'end');
						cleanup();
						return (running = false);
					}
					if (now >= start_time) {
						const t = easing((now - start_time) / duration);
						tick(t, 1 - t);
					}
				}
				return running;
			});
		}
		let started = false;
		return {
			start() {
				if (started) return;
				started = true;
				delete_rule(node);
				if (is_function(config)) {
					config = config(options);
					wait().then(go);
				} else {
					go();
				}
			},
			invalidate() {
				started = false;
			},
			end() {
				if (running) {
					cleanup();
					running = false;
				}
			}
		};
	}

	/**
	 * @param {Element & ElementCSSInlineStyle} node
	 * @param {TransitionFn} fn
	 * @param {any} params
	 * @returns {{ end(reset: any): void; }}
	 */
	function create_out_transition(node, fn, params) {
		/** @type {TransitionOptions} */
		const options = { direction: 'out' };
		let config = fn(node, params, options);
		let running = true;
		let animation_name;
		const group = outros;
		group.r += 1;
		/** @type {boolean} */
		let original_inert_value;

		/**
		 * @returns {void} */
		function go() {
			const {
				delay = 0,
				duration = 300,
				easing = identity,
				tick = noop,
				css
			} = config || null_transition;

			if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);

			const start_time = now() + delay;
			const end_time = start_time + duration;
			add_render_callback(() => dispatch(node, false, 'start'));

			if ('inert' in node) {
				original_inert_value = /** @type {HTMLElement} */ (node).inert;
				node.inert = true;
			}

			loop((now) => {
				if (running) {
					if (now >= end_time) {
						tick(0, 1);
						dispatch(node, false, 'end');
						if (!--group.r) {
							// this will result in `end()` being called,
							// so we don't need to clean up here
							run_all(group.c);
						}
						return false;
					}
					if (now >= start_time) {
						const t = easing((now - start_time) / duration);
						tick(1 - t, t);
					}
				}
				return running;
			});
		}

		if (is_function(config)) {
			wait().then(() => {
				// @ts-ignore
				config = config(options);
				go();
			});
		} else {
			go();
		}

		return {
			end(reset) {
				if (reset && 'inert' in node) {
					node.inert = original_inert_value;
				}
				if (reset && config.tick) {
					config.tick(1, 0);
				}
				if (running) {
					if (animation_name) delete_rule(node, animation_name);
					running = false;
				}
			}
		};
	}

	/** @typedef {1} INTRO */
	/** @typedef {0} OUTRO */
	/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
	/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

	/**
	 * @typedef {Object} Outro
	 * @property {number} r
	 * @property {Function[]} c
	 * @property {Object} p
	 */

	/**
	 * @typedef {Object} PendingProgram
	 * @property {number} start
	 * @property {INTRO|OUTRO} b
	 * @property {Outro} [group]
	 */

	/**
	 * @typedef {Object} Program
	 * @property {number} a
	 * @property {INTRO|OUTRO} b
	 * @property {1|-1} d
	 * @property {number} duration
	 * @property {number} start
	 * @property {number} end
	 * @property {Outro} [group]
	 */

	// general each functions:

	function ensure_array_like(array_like_or_iterator) {
		return array_like_or_iterator?.length !== undefined
			? array_like_or_iterator
			: Array.from(array_like_or_iterator);
	}

	// keyed each functions:

	/** @returns {void} */
	function destroy_block(block, lookup) {
		block.d(1);
		lookup.delete(block.key);
	}

	/** @returns {void} */
	function outro_and_destroy_block(block, lookup) {
		transition_out(block, 1, 1, () => {
			lookup.delete(block.key);
		});
	}

	/** @returns {any[]} */
	function update_keyed_each(
		old_blocks,
		dirty,
		get_key,
		dynamic,
		ctx,
		list,
		lookup,
		node,
		destroy,
		create_each_block,
		next,
		get_context
	) {
		let o = old_blocks.length;
		let n = list.length;
		let i = o;
		const old_indexes = {};
		while (i--) old_indexes[old_blocks[i].key] = i;
		const new_blocks = [];
		const new_lookup = new Map();
		const deltas = new Map();
		const updates = [];
		i = n;
		while (i--) {
			const child_ctx = get_context(ctx, list, i);
			const key = get_key(child_ctx);
			let block = lookup.get(key);
			if (!block) {
				block = create_each_block(key, child_ctx);
				block.c();
			} else if (dynamic) {
				// defer updates until all the DOM shuffling is done
				updates.push(() => block.p(child_ctx, dirty));
			}
			new_lookup.set(key, (new_blocks[i] = block));
			if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
		}
		const will_move = new Set();
		const did_move = new Set();
		/** @returns {void} */
		function insert(block) {
			transition_in(block, 1);
			block.m(node, next);
			lookup.set(block.key, block);
			next = block.first;
			n--;
		}
		while (o && n) {
			const new_block = new_blocks[n - 1];
			const old_block = old_blocks[o - 1];
			const new_key = new_block.key;
			const old_key = old_block.key;
			if (new_block === old_block) {
				// do nothing
				next = new_block.first;
				o--;
				n--;
			} else if (!new_lookup.has(old_key)) {
				// remove old block
				destroy(old_block, lookup);
				o--;
			} else if (!lookup.has(new_key) || will_move.has(new_key)) {
				insert(new_block);
			} else if (did_move.has(old_key)) {
				o--;
			} else if (deltas.get(new_key) > deltas.get(old_key)) {
				did_move.add(new_key);
				insert(new_block);
			} else {
				will_move.add(old_key);
				o--;
			}
		}
		while (o--) {
			const old_block = old_blocks[o];
			if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
		}
		while (n) insert(new_blocks[n - 1]);
		run_all(updates);
		return new_blocks;
	}

	/** @returns {void} */
	function validate_each_keys(ctx, list, get_context, get_key) {
		const keys = new Map();
		for (let i = 0; i < list.length; i++) {
			const key = get_key(get_context(ctx, list, i));
			if (keys.has(key)) {
				let value = '';
				try {
					value = `with value '${String(key)}' `;
				} catch (e) {
					// can't stringify
				}
				throw new Error(
					`Cannot have duplicate keys in a keyed each: Keys at index ${keys.get(
					key
				)} and ${i} ${value}are duplicates`
				);
			}
			keys.set(key, i);
		}
	}

	/** @returns {void} */
	function create_component(block) {
		block && block.c();
	}

	/** @returns {void} */
	function mount_component(component, target, anchor) {
		const { fragment, after_update } = component.$$;
		fragment && fragment.m(target, anchor);
		// onMount happens before the initial afterUpdate
		add_render_callback(() => {
			const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
			// if the component was destroyed immediately
			// it will update the `$$.on_destroy` reference to `null`.
			// the destructured on_destroy may still reference to the old array
			if (component.$$.on_destroy) {
				component.$$.on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});
		after_update.forEach(add_render_callback);
	}

	/** @returns {void} */
	function destroy_component(component, detaching) {
		const $$ = component.$$;
		if ($$.fragment !== null) {
			flush_render_callbacks($$.after_update);
			run_all($$.on_destroy);
			$$.fragment && $$.fragment.d(detaching);
			// TODO null out other refs, including component.$$ (but need to
			// preserve final state?)
			$$.on_destroy = $$.fragment = null;
			$$.ctx = [];
		}
	}

	/** @returns {void} */
	function make_dirty(component, i) {
		if (component.$$.dirty[0] === -1) {
			dirty_components.push(component);
			schedule_update();
			component.$$.dirty.fill(0);
		}
		component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
	}

	/** @returns {void} */
	function init(
		component,
		options,
		instance,
		create_fragment,
		not_equal,
		props,
		append_styles,
		dirty = [-1]
	) {
		const parent_component = current_component;
		set_current_component(component);
		/** @type {import('./private.js').T$$} */
		const $$ = (component.$$ = {
			fragment: null,
			ctx: [],
			// state
			props,
			update: noop,
			not_equal,
			bound: blank_object(),
			// lifecycle
			on_mount: [],
			on_destroy: [],
			on_disconnect: [],
			before_update: [],
			after_update: [],
			context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
			// everything else
			callbacks: blank_object(),
			dirty,
			skip_bound: false,
			root: options.target || parent_component.$$.root
		});
		append_styles && append_styles($$.root);
		let ready = false;
		$$.ctx = instance
			? instance(component, options.props || {}, (i, ret, ...rest) => {
					const value = rest.length ? rest[0] : ret;
					if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
						if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
						if (ready) make_dirty(component, i);
					}
					return ret;
			  })
			: [];
		$$.update();
		ready = true;
		run_all($$.before_update);
		// `false` as a special case of no DOM component
		$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
		if (options.target) {
			if (options.hydrate) {
				const nodes = children(options.target);
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				$$.fragment && $$.fragment.l(nodes);
				nodes.forEach(detach);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				$$.fragment && $$.fragment.c();
			}
			if (options.intro) transition_in(component.$$.fragment);
			mount_component(component, options.target, options.anchor);
			flush();
		}
		set_current_component(parent_component);
	}

	/**
	 * Base class for Svelte components. Used when dev=false.
	 *
	 * @template {Record<string, any>} [Props=any]
	 * @template {Record<string, any>} [Events=any]
	 */
	class SvelteComponent {
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$ = undefined;
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$set = undefined;

		/** @returns {void} */
		$destroy() {
			destroy_component(this, 1);
			this.$destroy = noop;
		}

		/**
		 * @template {Extract<keyof Events, string>} K
		 * @param {K} type
		 * @param {((e: Events[K]) => void) | null | undefined} callback
		 * @returns {() => void}
		 */
		$on(type, callback) {
			if (!is_function(callback)) {
				return noop;
			}
			const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
			callbacks.push(callback);
			return () => {
				const index = callbacks.indexOf(callback);
				if (index !== -1) callbacks.splice(index, 1);
			};
		}

		/**
		 * @param {Partial<Props>} props
		 * @returns {void}
		 */
		$set(props) {
			if (this.$$set && !is_empty(props)) {
				this.$$.skip_bound = true;
				this.$$set(props);
				this.$$.skip_bound = false;
			}
		}
	}

	/**
	 * @typedef {Object} CustomElementPropDefinition
	 * @property {string} [attribute]
	 * @property {boolean} [reflect]
	 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
	 */

	// generated during release, do not modify

	/**
	 * The current version, as set in package.json.
	 *
	 * https://svelte.dev/docs/svelte-compiler#svelte-version
	 * @type {string}
	 */
	const VERSION = '4.2.0';
	const PUBLIC_VERSION = '4';

	/**
	 * @template T
	 * @param {string} type
	 * @param {T} [detail]
	 * @returns {void}
	 */
	function dispatch_dev(type, detail) {
		document.dispatchEvent(custom_event(type, { version: VERSION, ...detail }, { bubbles: true }));
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append_dev(target, node) {
		dispatch_dev('SvelteDOMInsert', { target, node });
		append(target, node);
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @param {Node} [anchor]
	 * @returns {void}
	 */
	function insert_dev(target, node, anchor) {
		dispatch_dev('SvelteDOMInsert', { target, node, anchor });
		insert(target, node, anchor);
	}

	/**
	 * @param {Node} node
	 * @returns {void}
	 */
	function detach_dev(node) {
		dispatch_dev('SvelteDOMRemove', { node });
		detach(node);
	}

	/**
	 * @param {Node} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
	 * @param {boolean} [has_prevent_default]
	 * @param {boolean} [has_stop_propagation]
	 * @param {boolean} [has_stop_immediate_propagation]
	 * @returns {() => void}
	 */
	function listen_dev(
		node,
		event,
		handler,
		options,
		has_prevent_default,
		has_stop_propagation,
		has_stop_immediate_propagation
	) {
		const modifiers =
			options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
		if (has_prevent_default) modifiers.push('preventDefault');
		if (has_stop_propagation) modifiers.push('stopPropagation');
		if (has_stop_immediate_propagation) modifiers.push('stopImmediatePropagation');
		dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
		const dispose = listen(node, event, handler, options);
		return () => {
			dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
			dispose();
		};
	}

	/**
	 * @param {Element} node
	 * @param {string} attribute
	 * @param {string} [value]
	 * @returns {void}
	 */
	function attr_dev(node, attribute, value) {
		attr(node, attribute, value);
		if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
		else dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
	}

	/**
	 * @param {Text} text
	 * @param {unknown} data
	 * @returns {void}
	 */
	function set_data_dev(text, data) {
		data = '' + data;
		if (text.data === data) return;
		dispatch_dev('SvelteDOMSetData', { node: text, data });
		text.data = /** @type {string} */ (data);
	}

	function ensure_array_like_dev(arg) {
		if (
			typeof arg !== 'string' &&
			!(arg && typeof arg === 'object' && 'length' in arg) &&
			!(typeof Symbol === 'function' && arg && Symbol.iterator in arg)
		) {
			throw new Error('{#each} only works with iterable values.');
		}
		return ensure_array_like(arg);
	}

	/**
	 * @returns {void} */
	function validate_slots(name, slot, keys) {
		for (const slot_key of Object.keys(slot)) {
			if (!~keys.indexOf(slot_key)) {
				console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
			}
		}
	}

	function construct_svelte_component_dev(component, props) {
		const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
		try {
			const instance = new component(props);
			if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
				throw new Error(error_message);
			}
			return instance;
		} catch (err) {
			const { message } = err;
			if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
				throw new Error(error_message);
			} else {
				throw err;
			}
		}
	}

	/**
	 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
	 *
	 * Can be used to create strongly typed Svelte components.
	 *
	 * #### Example:
	 *
	 * You have component library on npm called `component-library`, from which
	 * you export a component called `MyComponent`. For Svelte+TypeScript users,
	 * you want to provide typings. Therefore you create a `index.d.ts`:
	 * ```ts
	 * import { SvelteComponent } from "svelte";
	 * export class MyComponent extends SvelteComponent<{foo: string}> {}
	 * ```
	 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
	 * to provide intellisense and to use the component like this in a Svelte file
	 * with TypeScript:
	 * ```svelte
	 * <script lang="ts">
	 * 	import { MyComponent } from "component-library";
	 * </script>
	 * <MyComponent foo={'bar'} />
	 * ```
	 * @template {Record<string, any>} [Props=any]
	 * @template {Record<string, any>} [Events=any]
	 * @template {Record<string, any>} [Slots=any]
	 * @extends {SvelteComponent<Props, Events>}
	 */
	class SvelteComponentDev extends SvelteComponent {
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Props}
		 */
		$$prop_def;
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Events}
		 */
		$$events_def;
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Slots}
		 */
		$$slot_def;

		/** @param {import('./public.js').ComponentConstructorOptions<Props>} options */
		constructor(options) {
			if (!options || (!options.target && !options.$$inline)) {
				throw new Error("'target' is a required option");
			}
			super();
		}

		/** @returns {void} */
		$destroy() {
			super.$destroy();
			this.$destroy = () => {
				console.warn('Component was already destroyed'); // eslint-disable-line no-console
			};
		}

		/** @returns {void} */
		$capture_state() {}

		/** @returns {void} */
		$inject_state() {}
	}

	if (typeof window !== 'undefined')
		// @ts-ignore
		(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

	const full = {
	    'Full Stack Engineer': {
	        fr: 'Développeur Full Stack'
	    },
	    Home: {
	        fr: 'Acceuil'
	    },
	    Projects: {
	        fr: 'Projets'
	    },
	    Skills: {
	        fr: 'Compétences'
	    },
	    Experience: {
	        fr: 'Expérience'
	    },
	    'Education': {
	        fr: 'Éducation'
	    },
	    'Bio': {
	        fr: 'Bio'
	    }
	};
	function getTranslationsFn (key, lang) {
	    var _a, _b;
	    if (lang === 'en') {
	        return key;
	    }
	    else {
	        if (((_a = full === null || full === void 0 ? void 0 : full[key]) === null || _a === void 0 ? void 0 : _a[lang]) === undefined) {
	            console.log('Missing tranlation for: ', key, ' in ', lang, ' lang');
	            return 'null';
	        }
	        else {
	            return (_b = full === null || full === void 0 ? void 0 : full[key]) === null || _b === void 0 ? void 0 : _b[lang];
	        }
	    }
	}

	function scrollToElementFn (query) {
	    let element = document.querySelector(query);
	    if (element) {
	        element.scrollIntoView({
	            behavior: 'smooth'
	        });
	    }
	}

	const subscriber_queue = [];

	/**
	 * Create a `Writable` store that allows both updating and reading by subscription.
	 *
	 * https://svelte.dev/docs/svelte-store#writable
	 * @template T
	 * @param {T} [value] initial value
	 * @param {import('./public.js').StartStopNotifier<T>} [start]
	 * @returns {import('./public.js').Writable<T>}
	 */
	function writable(value, start = noop) {
		/** @type {import('./public.js').Unsubscriber} */
		let stop;
		/** @type {Set<import('./private.js').SubscribeInvalidateTuple<T>>} */
		const subscribers = new Set();
		/** @param {T} new_value
		 * @returns {void}
		 */
		function set(new_value) {
			if (safe_not_equal(value, new_value)) {
				value = new_value;
				if (stop) {
					// store is ready
					const run_queue = !subscriber_queue.length;
					for (const subscriber of subscribers) {
						subscriber[1]();
						subscriber_queue.push(subscriber, value);
					}
					if (run_queue) {
						for (let i = 0; i < subscriber_queue.length; i += 2) {
							subscriber_queue[i][0](subscriber_queue[i + 1]);
						}
						subscriber_queue.length = 0;
					}
				}
			}
		}

		/**
		 * @param {import('./public.js').Updater<T>} fn
		 * @returns {void}
		 */
		function update(fn) {
			set(fn(value));
		}

		/**
		 * @param {import('./public.js').Subscriber<T>} run
		 * @param {import('./private.js').Invalidator<T>} [invalidate]
		 * @returns {import('./public.js').Unsubscriber}
		 */
		function subscribe(run, invalidate = noop) {
			/** @type {import('./private.js').SubscribeInvalidateTuple<T>} */
			const subscriber = [run, invalidate];
			subscribers.add(subscriber);
			if (subscribers.size === 1) {
				stop = start(set, update) || noop;
			}
			run(value);
			return () => {
				subscribers.delete(subscriber);
				if (subscribers.size === 0 && stop) {
					stop();
					stop = null;
				}
			};
		}
		return { set, update, subscribe };
	}

	let windowScrollValueStore = writable(0);
	let windowScrollStoppedStore = writable(true);
	let skillsSectionFontWeight = writable(400);
	let homeSectionFontWeight = writable(400);
	let experienceSectionFontWeight = writable(400);
	let educationSectionFontWeight = writable(400);
	let bioSectionFontWeight = writable(400);
	let projectsSectionFontWeight = writable(400);
	let langStore = writable(localStorage.getItem('lang') || 'en');
	langStore.subscribe(value => {
	    localStorage.setItem('lang', value);
	});

	/* src/Navigation.svelte generated by Svelte v4.2.0 */

	const file$d = "src/Navigation.svelte";

	function create_fragment$d(ctx) {
		let navigation_svlt;
		let button0;
		let t0_value = getTranslationsFn('Home', /*$langStore*/ ctx[1]) + "";
		let t0;
		let t1;
		let button1;
		let t2_value = getTranslationsFn('Bio', /*$langStore*/ ctx[1]) + "";
		let t2;
		let t3;
		let button2;
		let t4_value = getTranslationsFn('Projects', /*$langStore*/ ctx[1]) + "";
		let t4;
		let t5;
		let button3;
		let t6_value = getTranslationsFn('Skills', /*$langStore*/ ctx[1]) + "";
		let t6;
		let t7;
		let button4;
		let t8_value = getTranslationsFn('Experience', /*$langStore*/ ctx[1]) + "";
		let t8;
		let t9;
		let button5;
		let t10_value = getTranslationsFn('Education', /*$langStore*/ ctx[1]) + "";
		let t10;
		let t11;
		let separator;
		let t12;
		let button6;
		let t14;
		let button7;
		let mounted;
		let dispose;

		const block = {
			c: function create() {
				navigation_svlt = element("navigation-svlt");
				button0 = element("button");
				t0 = text(t0_value);
				t1 = space();
				button1 = element("button");
				t2 = text(t2_value);
				t3 = space();
				button2 = element("button");
				t4 = text(t4_value);
				t5 = space();
				button3 = element("button");
				t6 = text(t6_value);
				t7 = space();
				button4 = element("button");
				t8 = text(t8_value);
				t9 = space();
				button5 = element("button");
				t10 = text(t10_value);
				t11 = space();
				separator = element("separator");
				t12 = space();
				button6 = element("button");
				button6.textContent = "English";
				t14 = space();
				button7 = element("button");
				button7.textContent = "Français";
				attr_dev(button0, "class", "nostyle svelte-1gbrdk6");
				set_style(button0, "font-variation-settings", "'wght' " + /*$homeSectionFontWeight*/ ctx[0]);
				set_style(button0, "grid-area", "home-button");
				add_location(button0, file$d, 19, 1, 447);
				attr_dev(button1, "class", "nostyle svelte-1gbrdk6");
				set_style(button1, "font-variation-settings", "'wght' " + /*$bioSectionFontWeight*/ ctx[2]);
				set_style(button1, "grid-area", "bio-button");
				add_location(button1, file$d, 26, 1, 671);
				attr_dev(button2, "class", "nostyle svelte-1gbrdk6");
				set_style(button2, "font-variation-settings", "'wght' " + /*$projectsSectionFontWeight*/ ctx[3]);
				set_style(button2, "grid-area", "projects-button");
				add_location(button2, file$d, 34, 1, 891);
				attr_dev(button3, "class", "nostyle svelte-1gbrdk6");
				set_style(button3, "font-variation-settings", "'wght' " + /*$skillsSectionFontWeight*/ ctx[4]);
				set_style(button3, "grid-area", "skills-button");
				add_location(button3, file$d, 42, 1, 1131);
				attr_dev(button4, "class", "nostyle svelte-1gbrdk6");
				set_style(button4, "font-variation-settings", "'wght' " + /*$experienceSectionFontWeight*/ ctx[5]);
				set_style(button4, "grid-area", "experience-button");
				add_location(button4, file$d, 47, 1, 1357);
				attr_dev(button5, "class", "nostyle svelte-1gbrdk6");
				set_style(button5, "font-variation-settings", "'wght' " + /*$educationSectionFontWeight*/ ctx[6]);
				set_style(button5, "grid-area", "education-button");
				add_location(button5, file$d, 54, 1, 1604);
				set_style(separator, "grid-area", "separator");
				attr_dev(separator, "class", "svelte-1gbrdk6");
				add_location(separator, file$d, 62, 1, 1848);
				attr_dev(button6, "class", "nostyle langButton svelte-1gbrdk6");
				set_style(button6, "grid-area", "lang-eng");
				toggle_class(button6, "selected", /*$langStore*/ ctx[1] === 'en');
				add_location(button6, file$d, 64, 1, 1892);
				attr_dev(button7, "class", "nostyle langButton svelte-1gbrdk6");
				set_style(button7, "grid-area", "lang-fr");
				toggle_class(button7, "selected", /*$langStore*/ ctx[1] === 'fr');
				add_location(button7, file$d, 73, 1, 2062);
				set_custom_element_data(navigation_svlt, "class", "svelte-1gbrdk6");
				add_location(navigation_svlt, file$d, 18, 0, 428);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, navigation_svlt, anchor);
				append_dev(navigation_svlt, button0);
				append_dev(button0, t0);
				append_dev(navigation_svlt, t1);
				append_dev(navigation_svlt, button1);
				append_dev(button1, t2);
				append_dev(navigation_svlt, t3);
				append_dev(navigation_svlt, button2);
				append_dev(button2, t4);
				append_dev(navigation_svlt, t5);
				append_dev(navigation_svlt, button3);
				append_dev(button3, t6);
				append_dev(navigation_svlt, t7);
				append_dev(navigation_svlt, button4);
				append_dev(button4, t8);
				append_dev(navigation_svlt, t9);
				append_dev(navigation_svlt, button5);
				append_dev(button5, t10);
				append_dev(navigation_svlt, t11);
				append_dev(navigation_svlt, separator);
				append_dev(navigation_svlt, t12);
				append_dev(navigation_svlt, button6);
				append_dev(navigation_svlt, t14);
				append_dev(navigation_svlt, button7);

				if (!mounted) {
					dispose = [
						listen_dev(button0, "click", /*click_handler*/ ctx[8], false, false, false, false),
						listen_dev(button1, "click", /*click_handler_1*/ ctx[9], false, false, false, false),
						listen_dev(button2, "click", /*click_handler_2*/ ctx[10], false, false, false, false),
						listen_dev(button3, "click", /*click_handler_3*/ ctx[11], false, false, false, false),
						listen_dev(button4, "click", /*click_handler_4*/ ctx[12], false, false, false, false),
						listen_dev(button5, "click", /*click_handler_5*/ ctx[13], false, false, false, false),
						listen_dev(button6, "click", /*click_handler_6*/ ctx[14], false, false, false, false),
						listen_dev(button7, "click", /*click_handler_7*/ ctx[15], false, false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*$langStore*/ 2 && t0_value !== (t0_value = getTranslationsFn('Home', /*$langStore*/ ctx[1]) + "")) set_data_dev(t0, t0_value);

				if (dirty & /*$homeSectionFontWeight*/ 1) {
					set_style(button0, "font-variation-settings", "'wght' " + /*$homeSectionFontWeight*/ ctx[0]);
				}

				if (dirty & /*$langStore*/ 2 && t2_value !== (t2_value = getTranslationsFn('Bio', /*$langStore*/ ctx[1]) + "")) set_data_dev(t2, t2_value);

				if (dirty & /*$bioSectionFontWeight*/ 4) {
					set_style(button1, "font-variation-settings", "'wght' " + /*$bioSectionFontWeight*/ ctx[2]);
				}

				if (dirty & /*$langStore*/ 2 && t4_value !== (t4_value = getTranslationsFn('Projects', /*$langStore*/ ctx[1]) + "")) set_data_dev(t4, t4_value);

				if (dirty & /*$projectsSectionFontWeight*/ 8) {
					set_style(button2, "font-variation-settings", "'wght' " + /*$projectsSectionFontWeight*/ ctx[3]);
				}

				if (dirty & /*$langStore*/ 2 && t6_value !== (t6_value = getTranslationsFn('Skills', /*$langStore*/ ctx[1]) + "")) set_data_dev(t6, t6_value);

				if (dirty & /*$skillsSectionFontWeight*/ 16) {
					set_style(button3, "font-variation-settings", "'wght' " + /*$skillsSectionFontWeight*/ ctx[4]);
				}

				if (dirty & /*$langStore*/ 2 && t8_value !== (t8_value = getTranslationsFn('Experience', /*$langStore*/ ctx[1]) + "")) set_data_dev(t8, t8_value);

				if (dirty & /*$experienceSectionFontWeight*/ 32) {
					set_style(button4, "font-variation-settings", "'wght' " + /*$experienceSectionFontWeight*/ ctx[5]);
				}

				if (dirty & /*$langStore*/ 2 && t10_value !== (t10_value = getTranslationsFn('Education', /*$langStore*/ ctx[1]) + "")) set_data_dev(t10, t10_value);

				if (dirty & /*$educationSectionFontWeight*/ 64) {
					set_style(button5, "font-variation-settings", "'wght' " + /*$educationSectionFontWeight*/ ctx[6]);
				}

				if (dirty & /*$langStore*/ 2) {
					toggle_class(button6, "selected", /*$langStore*/ ctx[1] === 'en');
				}

				if (dirty & /*$langStore*/ 2) {
					toggle_class(button7, "selected", /*$langStore*/ ctx[1] === 'fr');
				}
			},
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(navigation_svlt);
				}

				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$d.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$d($$self, $$props, $$invalidate) {
		let $homeSectionFontWeight;
		let $langStore;
		let $bioSectionFontWeight;
		let $projectsSectionFontWeight;
		let $skillsSectionFontWeight;
		let $experienceSectionFontWeight;
		let $educationSectionFontWeight;
		validate_store(homeSectionFontWeight, 'homeSectionFontWeight');
		component_subscribe($$self, homeSectionFontWeight, $$value => $$invalidate(0, $homeSectionFontWeight = $$value));
		validate_store(langStore, 'langStore');
		component_subscribe($$self, langStore, $$value => $$invalidate(1, $langStore = $$value));
		validate_store(bioSectionFontWeight, 'bioSectionFontWeight');
		component_subscribe($$self, bioSectionFontWeight, $$value => $$invalidate(2, $bioSectionFontWeight = $$value));
		validate_store(projectsSectionFontWeight, 'projectsSectionFontWeight');
		component_subscribe($$self, projectsSectionFontWeight, $$value => $$invalidate(3, $projectsSectionFontWeight = $$value));
		validate_store(skillsSectionFontWeight, 'skillsSectionFontWeight');
		component_subscribe($$self, skillsSectionFontWeight, $$value => $$invalidate(4, $skillsSectionFontWeight = $$value));
		validate_store(experienceSectionFontWeight, 'experienceSectionFontWeight');
		component_subscribe($$self, experienceSectionFontWeight, $$value => $$invalidate(5, $experienceSectionFontWeight = $$value));
		validate_store(educationSectionFontWeight, 'educationSectionFontWeight');
		component_subscribe($$self, educationSectionFontWeight, $$value => $$invalidate(6, $educationSectionFontWeight = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Navigation', slots, []);

		function scrollToSection(sectionId) {
			scrollToElementFn(`#${sectionId}`);
		}

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navigation> was created with unknown prop '${key}'`);
		});

		const click_handler = () => scrollToSection('home-section');
		const click_handler_1 = () => scrollToSection('bio-section');
		const click_handler_2 = () => scrollToSection('projects-section');
		const click_handler_3 = () => scrollToSection('skills-section');
		const click_handler_4 = () => scrollToSection('experience-section');
		const click_handler_5 = () => scrollToSection('education-section');
		const click_handler_6 = () => set_store_value(langStore, $langStore = 'en', $langStore);
		const click_handler_7 = () => set_store_value(langStore, $langStore = 'fr', $langStore);

		$$self.$capture_state = () => ({
			getTranslationsFn,
			scrollToElementFn,
			bioSectionFontWeight,
			homeSectionFontWeight,
			langStore,
			educationSectionFontWeight,
			skillsSectionFontWeight,
			experienceSectionFontWeight,
			projectsSectionFontWeight,
			scrollToSection,
			$homeSectionFontWeight,
			$langStore,
			$bioSectionFontWeight,
			$projectsSectionFontWeight,
			$skillsSectionFontWeight,
			$experienceSectionFontWeight,
			$educationSectionFontWeight
		});

		return [
			$homeSectionFontWeight,
			$langStore,
			$bioSectionFontWeight,
			$projectsSectionFontWeight,
			$skillsSectionFontWeight,
			$experienceSectionFontWeight,
			$educationSectionFontWeight,
			scrollToSection,
			click_handler,
			click_handler_1,
			click_handler_2,
			click_handler_3,
			click_handler_4,
			click_handler_5,
			click_handler_6,
			click_handler_7
		];
	}

	class Navigation extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Navigation",
				options,
				id: create_fragment$d.name
			});
		}
	}

	var fontWeightMaxTreshold = 850; // Max font value (800) + Treshold (50)

	var fontWeightMinTresholdConst = 750; // Max font value (800) - Treshold (50)

	function calculateFontWeightFn (element) {
	    let elementHeight = element.scrollHeight;
	    let elementScroll = element.getClientRects()[0].top;
	    let absoluteValue = Math.abs(elementScroll / elementHeight);
	    const fontSizeMin = 100;
	    const fontSizeMax = 800;
	    const fontSize = Math.trunc(fontSizeMax + (fontSizeMin - fontSizeMax) * absoluteValue);
	    return fontSize;
	}

	/* src/sections/Home.svelte generated by Svelte v4.2.0 */

	const file$c = "src/sections/Home.svelte";

	function create_fragment$c(ctx) {
		let section_svlt;
		let section_header;
		let img_container;
		let img;
		let img_src_value;
		let t0;
		let section_body;
		let h10;
		let t2;
		let separator;
		let t3;
		let h11;
		let t4_value = getTranslationsFn('Full Stack Engineer', /*$langStore*/ ctx[2]) + "";
		let t4;
		let t5;
		let p;
		let t6;
		let br;
		let t7;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				section_header = element("section-header");
				img_container = element("img-container");
				img = element("img");
				t0 = space();
				section_body = element("section-body");
				h10 = element("h1");
				h10.textContent = "Paco Gimeno";
				t2 = space();
				separator = element("separator");
				t3 = space();
				h11 = element("h1");
				t4 = text(t4_value);
				t5 = space();
				p = element("p");
				t6 = text("I make ideas become a reality ");
				br = element("br");
				t7 = text(" from start to deployement");
				if (!src_url_equal(img.src, img_src_value = "img/my_face.jpg")) attr_dev(img, "src", img_src_value);
				attr_dev(img, "alt", "");
				attr_dev(img, "class", "svelte-el38cz");
				add_location(img, file$c, 52, 17, 1482);
				set_custom_element_data(img_container, "class", "svelte-el38cz");
				add_location(img_container, file$c, 52, 2, 1467);
				set_custom_element_data(section_header, "class", "svelte-el38cz");
				add_location(section_header, file$c, 51, 1, 1448);
				attr_dev(h10, "class", "who svelte-el38cz");
				add_location(h10, file$c, 56, 2, 1573);
				attr_dev(separator, "class", "svelte-el38cz");
				add_location(separator, file$c, 57, 2, 1608);
				attr_dev(h11, "class", "what svelte-el38cz");
				add_location(h11, file$c, 58, 2, 1624);
				add_location(br, file$c, 59, 35, 1736);
				attr_dev(p, "class", "svelte-el38cz");
				add_location(p, file$c, 59, 2, 1703);
				set_custom_element_data(section_body, "class", "svelte-el38cz");
				add_location(section_body, file$c, 55, 1, 1556);
				set_custom_element_data(section_svlt, "id", "home-section");
				set_custom_element_data(section_svlt, "class", "svelte-el38cz");
				toggle_class(section_svlt, "isVisible", /*isVisible*/ ctx[1]);
				add_location(section_svlt, file$c, 50, 0, 1374);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
				append_dev(section_svlt, section_header);
				append_dev(section_header, img_container);
				append_dev(img_container, img);
				append_dev(section_svlt, t0);
				append_dev(section_svlt, section_body);
				append_dev(section_body, h10);
				append_dev(section_body, t2);
				append_dev(section_body, separator);
				append_dev(section_body, t3);
				append_dev(section_body, h11);
				append_dev(h11, t4);
				append_dev(section_body, t5);
				append_dev(section_body, p);
				append_dev(p, t6);
				append_dev(p, br);
				append_dev(p, t7);
				/*section_svlt_binding*/ ctx[6](section_svlt);
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*$langStore*/ 4 && t4_value !== (t4_value = getTranslationsFn('Full Stack Engineer', /*$langStore*/ ctx[2]) + "")) set_data_dev(t4, t4_value);

				if (dirty & /*isVisible*/ 2) {
					toggle_class(section_svlt, "isVisible", /*isVisible*/ ctx[1]);
				}
			},
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(section_svlt);
				}

				/*section_svlt_binding*/ ctx[6](null);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$c.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$c($$self, $$props, $$invalidate) {
		let $homeSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		let $langStore;
		validate_store(homeSectionFontWeight, 'homeSectionFontWeight');
		component_subscribe($$self, homeSectionFontWeight, $$value => $$invalidate(3, $homeSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(4, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(5, $windowScrollValueStore = $$value));
		validate_store(langStore, 'langStore');
		component_subscribe($$self, langStore, $$value => $$invalidate(2, $langStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Home', slots, []);
		let isVisible = false;
		let selfElement = undefined;

		// function foo() {
		// 	let elementObserver: IntersectionObserver
		// 	elementObserver = new IntersectionObserver(
		// 		entries => {
		// 			if (entries[0].isIntersecting === true) {
		// 				isVisible = true
		// 			} else {
		// 				isVisible = false
		// 			}
		// 		},
		// 		{
		// 			threshold: 1
		// 		}
		// 	)
		// 	elementObserver.observe(selfElement.querySelector('#home-section h1.who'))
		// }
		// $: console.log(isVisible)
		onMount(() => {
			$$invalidate(1, isVisible = true);
		});

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
		});

		function section_svlt_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				selfElement = $$value;
				$$invalidate(0, selfElement);
			});
		}

		$$self.$capture_state = () => ({
			onMount,
			fontWeightMaxTreshold,
			fontWeightMinTresholdConst,
			calculateFontWeightFn,
			getTranslationsFn,
			scrollToElementFn,
			homeSectionFontWeight,
			langStore,
			windowScrollStoppedStore,
			windowScrollValueStore,
			isVisible,
			selfElement,
			$homeSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			$langStore
		});

		$$self.$inject_state = $$props => {
			if ('isVisible' in $$props) $$invalidate(1, isVisible = $$props.isVisible);
			if ('selfElement' in $$props) $$invalidate(0, selfElement = $$props.selfElement);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*selfElement, $windowScrollValueStore*/ 33) {
				if (selfElement) {
					set_store_value(homeSectionFontWeight, $homeSectionFontWeight = calculateFontWeightFn(selfElement), $homeSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $homeSectionFontWeight*/ 24) {
				if ($windowScrollStoppedStore === true) {
					if ($homeSectionFontWeight <= fontWeightMaxTreshold && $homeSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#home-section');
					}
				}
			}
		};

		return [
			selfElement,
			isVisible,
			$langStore,
			$homeSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class Home extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Home",
				options,
				id: create_fragment$c.name
			});
		}
	}

	/* src/sections/Jahmin.svelte generated by Svelte v4.2.0 */
	const file$b = "src/sections/Jahmin.svelte";

	function create_fragment$b(ctx) {
		let section_svlt;
		let section_header;
		let img_container;
		let img;
		let img_src_value;
		let t0;
		let a;
		let h1;
		let t2;
		let svg;
		let path;
		let t3;
		let p0;
		let t5;
		let p1;
		let t7;
		let ul;
		let li0;
		let t9;
		let li1;
		let t11;
		let li2;
		let t13;
		let li3;
		let t15;
		let li4;
		let t17;
		let li5;
		let t19;
		let li6;
		let t21;
		let li7;
		let t23;
		let li8;
		let t25;
		let li9;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				section_header = element("section-header");
				img_container = element("img-container");
				img = element("img");
				t0 = space();
				a = element("a");
				h1 = element("h1");
				h1.textContent = "Jahmin";
				t2 = space();
				svg = svg_element("svg");
				path = svg_element("path");
				t3 = space();
				p0 = element("p");
				p0.textContent = "Jahmin, my pride and joy, I have been working on this app for some years now. A cross platform Music player based on\n\t\tElectronJS and Svelte, capable of handling thousands of songs while the app is being used thanks to the use of Web Workers.";
				t5 = space();
				p1 = element("p");
				p1.textContent = "A massive codebase that can handle:";
				t7 = space();
				ul = element("ul");
				li0 = element("li");
				li0.textContent = "Song metadata updating";
				t9 = space();
				li1 = element("li");
				li1.textContent = "Lyrics";
				t11 = space();
				li2 = element("li");
				li2.textContent = "Configurations";
				t13 = space();
				li3 = element("li");
				li3.textContent = "Dynamic colors based on album arts";
				t15 = space();
				li4 = element("li");
				li4.textContent = "Customizable art grid";
				t17 = space();
				li5 = element("li");
				li5.textContent = "A beautiful song list";
				t19 = space();
				li6 = element("li");
				li6.textContent = "Album art optimization";
				t21 = space();
				li7 = element("li");
				li7.textContent = "Song rating";
				t23 = space();
				li8 = element("li");
				li8.textContent = "Animated album arts";
				t25 = space();
				li9 = element("li");
				li9.textContent = "And much, much more";
				if (!src_url_equal(img.src, img_src_value = "./img/jahmin_logo.svg")) attr_dev(img, "src", img_src_value);
				attr_dev(img, "alt", "");
				attr_dev(img, "class", "svelte-1txynpi");
				add_location(img, file$b, 10, 17, 475);
				set_custom_element_data(img_container, "class", "svelte-1txynpi");
				add_location(img_container, file$b, 10, 2, 460);
				add_location(h1, file$b, 13, 3, 601);
				attr_dev(path, "d", "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z");
				add_location(path, file$b, 15, 4, 726);
				attr_dev(svg, "height", "32");
				attr_dev(svg, "aria-hidden", "true");
				attr_dev(svg, "viewBox", "0 0 16 16");
				attr_dev(svg, "version", "1.1");
				attr_dev(svg, "width", "28");
				attr_dev(svg, "fill", "currentColor");
				attr_dev(svg, "class", "svelte-1txynpi");
				add_location(svg, file$b, 14, 3, 620);
				attr_dev(a, "href", "https://github.com/PacoGim/Jahmin");
				attr_dev(a, "target", "_blank");
				attr_dev(a, "class", "svelte-1txynpi");
				add_location(a, file$b, 12, 2, 537);
				set_custom_element_data(section_header, "class", "svelte-1txynpi");
				add_location(section_header, file$b, 9, 1, 441);
				attr_dev(p0, "class", "svelte-1txynpi");
				add_location(p0, file$b, 21, 1, 1357);
				attr_dev(p1, "class", "svelte-1txynpi");
				add_location(p1, file$b, 26, 1, 1614);
				add_location(li0, file$b, 28, 2, 1665);
				add_location(li1, file$b, 29, 2, 1699);
				add_location(li2, file$b, 30, 2, 1717);
				add_location(li3, file$b, 31, 2, 1743);
				add_location(li4, file$b, 32, 2, 1789);
				add_location(li5, file$b, 33, 2, 1822);
				add_location(li6, file$b, 34, 2, 1855);
				add_location(li7, file$b, 35, 2, 1889);
				add_location(li8, file$b, 36, 2, 1912);
				add_location(li9, file$b, 37, 2, 1943);
				add_location(ul, file$b, 27, 1, 1658);
				set_custom_element_data(section_svlt, "id", "jahmin-section");
				set_custom_element_data(section_svlt, "class", "svelte-1txynpi");
				add_location(section_svlt, file$b, 8, 0, 405);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
				append_dev(section_svlt, section_header);
				append_dev(section_header, img_container);
				append_dev(img_container, img);
				append_dev(section_header, t0);
				append_dev(section_header, a);
				append_dev(a, h1);
				append_dev(a, t2);
				append_dev(a, svg);
				append_dev(svg, path);
				append_dev(section_svlt, t3);
				append_dev(section_svlt, p0);
				append_dev(section_svlt, t5);
				append_dev(section_svlt, p1);
				append_dev(section_svlt, t7);
				append_dev(section_svlt, ul);
				append_dev(ul, li0);
				append_dev(ul, t9);
				append_dev(ul, li1);
				append_dev(ul, t11);
				append_dev(ul, li2);
				append_dev(ul, t13);
				append_dev(ul, li3);
				append_dev(ul, t15);
				append_dev(ul, li4);
				append_dev(ul, t17);
				append_dev(ul, li5);
				append_dev(ul, t19);
				append_dev(ul, li6);
				append_dev(ul, t21);
				append_dev(ul, li7);
				append_dev(ul, t23);
				append_dev(ul, li8);
				append_dev(ul, t25);
				append_dev(ul, li9);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(section_svlt);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$b.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$b($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Jahmin', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Jahmin> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({
			windowScrollStoppedStore,
			windowScrollValueStore,
			calculateFontWeightFn,
			fontWeightMaxTreshold,
			fontWeightMinTresholdConst,
			scrollToElementFn
		});

		return [];
	}

	class Jahmin extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Jahmin",
				options,
				id: create_fragment$b.name
			});
		}
	}

	/* src/sections/Skills.svelte generated by Svelte v4.2.0 */
	const file$a = "src/sections/Skills.svelte";

	function create_fragment$a(ctx) {
		let section_svlt;
		let h1;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				h1 = element("h1");
				h1.textContent = "Skills";
				add_location(h1, file$a, 22, 1, 857);
				set_custom_element_data(section_svlt, "id", "skills-section");
				set_custom_element_data(section_svlt, "class", "svelte-gte8wo");
				add_location(section_svlt, file$a, 21, 0, 797);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
				append_dev(section_svlt, h1);
				/*section_svlt_binding*/ ctx[4](section_svlt);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(section_svlt);
				}

				/*section_svlt_binding*/ ctx[4](null);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$a.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$a($$self, $$props, $$invalidate) {
		let $skillsSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(skillsSectionFontWeight, 'skillsSectionFontWeight');
		component_subscribe($$self, skillsSectionFontWeight, $$value => $$invalidate(1, $skillsSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(2, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(3, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Skills', slots, []);
		let selfElement = undefined;
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Skills> was created with unknown prop '${key}'`);
		});

		function section_svlt_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				selfElement = $$value;
				$$invalidate(0, selfElement);
			});
		}

		$$self.$capture_state = () => ({
			skillsSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
			calculateFontWeightFn,
			fontWeightMaxTreshold,
			scrollToElementFn,
			fontWeightMinTresholdConst,
			selfElement,
			$skillsSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore
		});

		$$self.$inject_state = $$props => {
			if ('selfElement' in $$props) $$invalidate(0, selfElement = $$props.selfElement);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*selfElement, $windowScrollValueStore*/ 9) {
				if (selfElement) {
					set_store_value(skillsSectionFontWeight, $skillsSectionFontWeight = calculateFontWeightFn(selfElement), $skillsSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $skillsSectionFontWeight*/ 6) {
				if ($windowScrollStoppedStore === true) {
					if ($skillsSectionFontWeight <= fontWeightMaxTreshold && $skillsSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#skills-section');
					}
				}
			}
		};

		return [
			selfElement,
			$skillsSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class Skills extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Skills",
				options,
				id: create_fragment$a.name
			});
		}
	}

	/* src/sections/Experience.svelte generated by Svelte v4.2.0 */

	const file$9 = "src/sections/Experience.svelte";

	function create_fragment$9(ctx) {
		let section_svlt;
		let h1;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				h1 = element("h1");
				h1.textContent = "Experience";
				add_location(h1, file$9, 22, 1, 881);
				set_custom_element_data(section_svlt, "id", "experience-section");
				set_custom_element_data(section_svlt, "class", "svelte-1dd888g");
				add_location(section_svlt, file$9, 21, 0, 817);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
				append_dev(section_svlt, h1);
				/*section_svlt_binding*/ ctx[4](section_svlt);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(section_svlt);
				}

				/*section_svlt_binding*/ ctx[4](null);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$9.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$9($$self, $$props, $$invalidate) {
		let $experienceSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(experienceSectionFontWeight, 'experienceSectionFontWeight');
		component_subscribe($$self, experienceSectionFontWeight, $$value => $$invalidate(1, $experienceSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(2, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(3, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Experience', slots, []);
		let selfElement = undefined;
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Experience> was created with unknown prop '${key}'`);
		});

		function section_svlt_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				selfElement = $$value;
				$$invalidate(0, selfElement);
			});
		}

		$$self.$capture_state = () => ({
			fontWeightMaxTreshold,
			fontWeightMinTresholdConst,
			calculateFontWeightFn,
			scrollToElementFn,
			experienceSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
			selfElement,
			$experienceSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore
		});

		$$self.$inject_state = $$props => {
			if ('selfElement' in $$props) $$invalidate(0, selfElement = $$props.selfElement);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*selfElement, $windowScrollValueStore*/ 9) {
				if (selfElement) {
					set_store_value(experienceSectionFontWeight, $experienceSectionFontWeight = calculateFontWeightFn(selfElement), $experienceSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $experienceSectionFontWeight*/ 6) {
				if ($windowScrollStoppedStore === true) {
					if ($experienceSectionFontWeight <= fontWeightMaxTreshold && $experienceSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#experience-section');
					}
				}
			}
		};

		return [
			selfElement,
			$experienceSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class Experience extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Experience",
				options,
				id: create_fragment$9.name
			});
		}
	}

	/* src/sections/Education.svelte generated by Svelte v4.2.0 */
	const file$8 = "src/sections/Education.svelte";

	function create_fragment$8(ctx) {
		let section_svlt;
		let h1;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				h1 = element("h1");
				h1.textContent = "Education";
				add_location(h1, file$8, 22, 1, 875);
				set_custom_element_data(section_svlt, "id", "education-section");
				set_custom_element_data(section_svlt, "class", "svelte-1dd888g");
				add_location(section_svlt, file$8, 21, 0, 812);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
				append_dev(section_svlt, h1);
				/*section_svlt_binding*/ ctx[4](section_svlt);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(section_svlt);
				}

				/*section_svlt_binding*/ ctx[4](null);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$8.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$8($$self, $$props, $$invalidate) {
		let $educationSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(educationSectionFontWeight, 'educationSectionFontWeight');
		component_subscribe($$self, educationSectionFontWeight, $$value => $$invalidate(1, $educationSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(2, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(3, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Education', slots, []);
		let selfElement = undefined;
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Education> was created with unknown prop '${key}'`);
		});

		function section_svlt_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				selfElement = $$value;
				$$invalidate(0, selfElement);
			});
		}

		$$self.$capture_state = () => ({
			educationSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
			calculateFontWeightFn,
			fontWeightMinTresholdConst,
			fontWeightMaxTreshold,
			scrollToElementFn,
			selfElement,
			$educationSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore
		});

		$$self.$inject_state = $$props => {
			if ('selfElement' in $$props) $$invalidate(0, selfElement = $$props.selfElement);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*selfElement, $windowScrollValueStore*/ 9) {
				if (selfElement) {
					set_store_value(educationSectionFontWeight, $educationSectionFontWeight = calculateFontWeightFn(selfElement), $educationSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $educationSectionFontWeight*/ 6) {
				if ($windowScrollStoppedStore === true) {
					if ($educationSectionFontWeight <= fontWeightMaxTreshold && $educationSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#education-section');
					}
				}
			}
		};

		return [
			selfElement,
			$educationSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class Education extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Education",
				options,
				id: create_fragment$8.name
			});
		}
	}

	/* src/sections/Bio.svelte generated by Svelte v4.2.0 */
	const file$7 = "src/sections/Bio.svelte";

	function create_fragment$7(ctx) {
		let section_svlt;
		let p;
		let t0;
		let t1_value = calculateYears() + "";
		let t1;
		let t2;
		let br0;
		let t3;
		let br1;
		let t4;
		let br2;
		let t5;
		let br3;
		let t6;
		let br4;
		let t7;
		let br5;
		let t8;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				p = element("p");
				t0 = text("Hello!, my name is Paco Gimeno and I'm a software engineer with ");
				t1 = text(t1_value);
				t2 = text(" years of experience.\n\t\t");
				br0 = element("br");
				t3 = space();
				br1 = element("br");
				t4 = text("\n\t\tI'm passionate about creating innovative solutions to complex problems and enjoy working collaboratively with others.\n\t\t");
				br2 = element("br");
				t5 = space();
				br3 = element("br");
				t6 = text("\n\t\tMy technical skills include proficiency in Javascript/Typescript and Svelte.\n\t\t");
				br4 = element("br");
				t7 = space();
				br5 = element("br");
				t8 = text("\n\t\tI'm also a strong communicator and enjoy helping others learn and grow.");
				add_location(br0, file$7, 32, 2, 1205);
				add_location(br1, file$7, 33, 2, 1214);
				add_location(br2, file$7, 35, 2, 1343);
				add_location(br3, file$7, 36, 2, 1352);
				add_location(br4, file$7, 38, 2, 1440);
				add_location(br5, file$7, 39, 2, 1449);
				attr_dev(p, "class", "svelte-1j4anl5");
				add_location(p, file$7, 30, 1, 1093);
				set_custom_element_data(section_svlt, "id", "bio-section");
				set_custom_element_data(section_svlt, "class", "svelte-1j4anl5");
				add_location(section_svlt, file$7, 29, 0, 1036);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
				append_dev(section_svlt, p);
				append_dev(p, t0);
				append_dev(p, t1);
				append_dev(p, t2);
				append_dev(p, br0);
				append_dev(p, t3);
				append_dev(p, br1);
				append_dev(p, t4);
				append_dev(p, br2);
				append_dev(p, t5);
				append_dev(p, br3);
				append_dev(p, t6);
				append_dev(p, br4);
				append_dev(p, t7);
				append_dev(p, br5);
				append_dev(p, t8);
				/*section_svlt_binding*/ ctx[4](section_svlt);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(section_svlt);
				}

				/*section_svlt_binding*/ ctx[4](null);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$7.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function calculateYears() {
		const dateNow = new Date();
		const dateDegree = new Date(2017, 6, 29);
		const diff = dateNow.getTime() - dateDegree.getTime();
		const years = diff / (1000 * 60 * 60 * 24 * 365.25);
		return Math.floor(years);
	}

	function instance$7($$self, $$props, $$invalidate) {
		let $bioSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(bioSectionFontWeight, 'bioSectionFontWeight');
		component_subscribe($$self, bioSectionFontWeight, $$value => $$invalidate(1, $bioSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(2, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(3, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Bio', slots, []);
		let selfElement = undefined;
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bio> was created with unknown prop '${key}'`);
		});

		function section_svlt_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				selfElement = $$value;
				$$invalidate(0, selfElement);
			});
		}

		$$self.$capture_state = () => ({
			bioSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
			calculateFontWeightFn,
			fontWeightMinTresholdConst,
			fontWeightMaxTreshold,
			scrollToElementFn,
			selfElement,
			calculateYears,
			$bioSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore
		});

		$$self.$inject_state = $$props => {
			if ('selfElement' in $$props) $$invalidate(0, selfElement = $$props.selfElement);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*selfElement, $windowScrollValueStore*/ 9) {
				if (selfElement) {
					set_store_value(bioSectionFontWeight, $bioSectionFontWeight = calculateFontWeightFn(selfElement), $bioSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $bioSectionFontWeight*/ 6) {
				if ($windowScrollStoppedStore === true) {
					if ($bioSectionFontWeight <= fontWeightMaxTreshold && $bioSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#bio-section');
					}
				}
			}
		};

		return [
			selfElement,
			$bioSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class Bio extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Bio",
				options,
				id: create_fragment$7.name
			});
		}
	}

	/* src/projects/AchievementSeekerProject.svelte generated by Svelte v4.2.0 */
	const file$6 = "src/projects/AchievementSeekerProject.svelte";

	function create_fragment$6(ctx) {
		let p;

		const block = {
			c: function create() {
				p = element("p");
				p.textContent = "AchievementSeekerProject";
				add_location(p, file$6, 0, 0, 0);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, p, anchor);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(p);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$6.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$6($$self, $$props) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('AchievementSeekerProject', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AchievementSeekerProject> was created with unknown prop '${key}'`);
		});

		return [];
	}

	class AchievementSeekerProject extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "AchievementSeekerProject",
				options,
				id: create_fragment$6.name
			});
		}
	}

	/* src/projects/GenshinMaterials.svelte generated by Svelte v4.2.0 */
	const file$5 = "src/projects/GenshinMaterials.svelte";

	function create_fragment$5(ctx) {
		let p;

		const block = {
			c: function create() {
				p = element("p");
				p.textContent = "GenshinMaterials";
				add_location(p, file$5, 0, 0, 0);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, p, anchor);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(p);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$5.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$5($$self, $$props) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('GenshinMaterials', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GenshinMaterials> was created with unknown prop '${key}'`);
		});

		return [];
	}

	class GenshinMaterials extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "GenshinMaterials",
				options,
				id: create_fragment$5.name
			});
		}
	}

	/* src/projects/IdGenerator.svelte generated by Svelte v4.2.0 */
	const file$4 = "src/projects/IdGenerator.svelte";

	function create_fragment$4(ctx) {
		let p;

		const block = {
			c: function create() {
				p = element("p");
				p.textContent = "IdGenerator";
				add_location(p, file$4, 0, 0, 0);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, p, anchor);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(p);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$4.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$4($$self, $$props) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('IdGenerator', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IdGenerator> was created with unknown prop '${key}'`);
		});

		return [];
	}

	class IdGenerator extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "IdGenerator",
				options,
				id: create_fragment$4.name
			});
		}
	}

	/* src/projects/JahminProject.svelte generated by Svelte v4.2.0 */
	const file$3 = "src/projects/JahminProject.svelte";

	function create_fragment$3(ctx) {
		let jahmin_project;
		let section_header;
		let img_container;
		let img;
		let img_src_value;
		let t0;
		let a;
		let h1;
		let t2;
		let svg;
		let path;
		let t3;
		let p;
		let t5;
		let ul;
		let li0;
		let t7;
		let li1;
		let t9;
		let li2;
		let t11;
		let li3;
		let t13;
		let li4;
		let t15;
		let li5;
		let t17;
		let li6;
		let t19;
		let li7;
		let t21;
		let li8;
		let t23;
		let li9;

		const block = {
			c: function create() {
				jahmin_project = element("jahmin-project");
				section_header = element("section-header");
				img_container = element("img-container");
				img = element("img");
				t0 = space();
				a = element("a");
				h1 = element("h1");
				h1.textContent = "Jahmin";
				t2 = space();
				svg = svg_element("svg");
				path = svg_element("path");
				t3 = space();
				p = element("p");
				p.textContent = "Jahmin, my pride and joy, I have been working on this app for some years now. A cross platform Music player based on\n\t\tElectronJS and Svelte, capable of handling thousands of songs while the app is being used thanks to the use of Web Workers.";
				t5 = space();
				ul = element("ul");
				li0 = element("li");
				li0.textContent = "Song metadata updating";
				t7 = space();
				li1 = element("li");
				li1.textContent = "Lyrics";
				t9 = space();
				li2 = element("li");
				li2.textContent = "Configurations";
				t11 = space();
				li3 = element("li");
				li3.textContent = "Dynamic colors based on album arts";
				t13 = space();
				li4 = element("li");
				li4.textContent = "Customizable art grid";
				t15 = space();
				li5 = element("li");
				li5.textContent = "A beautiful song list";
				t17 = space();
				li6 = element("li");
				li6.textContent = "Album art optimization";
				t19 = space();
				li7 = element("li");
				li7.textContent = "Song rating";
				t21 = space();
				li8 = element("li");
				li8.textContent = "Animated album arts";
				t23 = space();
				li9 = element("li");
				li9.textContent = "And much, much more";
				if (!src_url_equal(img.src, img_src_value = "./img/jahmin_logo.svg")) attr_dev(img, "src", img_src_value);
				attr_dev(img, "alt", "");
				attr_dev(img, "class", "svelte-10361lj");
				add_location(img, file$3, 2, 17, 52);
				set_custom_element_data(img_container, "class", "svelte-10361lj");
				add_location(img_container, file$3, 2, 2, 37);
				add_location(h1, file$3, 5, 3, 178);
				attr_dev(path, "d", "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z");
				add_location(path, file$3, 7, 4, 303);
				attr_dev(svg, "height", "32");
				attr_dev(svg, "aria-hidden", "true");
				attr_dev(svg, "viewBox", "0 0 16 16");
				attr_dev(svg, "version", "1.1");
				attr_dev(svg, "width", "28");
				attr_dev(svg, "fill", "currentColor");
				attr_dev(svg, "class", "svelte-10361lj");
				add_location(svg, file$3, 6, 3, 197);
				attr_dev(a, "href", "https://github.com/PacoGim/Jahmin");
				attr_dev(a, "target", "_blank");
				attr_dev(a, "class", "svelte-10361lj");
				add_location(a, file$3, 4, 2, 114);
				set_custom_element_data(section_header, "class", "svelte-10361lj");
				add_location(section_header, file$3, 1, 1, 18);
				attr_dev(p, "class", "svelte-10361lj");
				add_location(p, file$3, 13, 1, 934);
				attr_dev(li0, "class", "svelte-10361lj");
				add_location(li0, file$3, 19, 2, 1198);
				attr_dev(li1, "class", "svelte-10361lj");
				add_location(li1, file$3, 20, 2, 1232);
				attr_dev(li2, "class", "svelte-10361lj");
				add_location(li2, file$3, 21, 2, 1250);
				attr_dev(li3, "class", "svelte-10361lj");
				add_location(li3, file$3, 22, 2, 1276);
				attr_dev(li4, "class", "svelte-10361lj");
				add_location(li4, file$3, 23, 2, 1322);
				attr_dev(li5, "class", "svelte-10361lj");
				add_location(li5, file$3, 24, 2, 1355);
				attr_dev(li6, "class", "svelte-10361lj");
				add_location(li6, file$3, 25, 2, 1388);
				attr_dev(li7, "class", "svelte-10361lj");
				add_location(li7, file$3, 26, 2, 1422);
				attr_dev(li8, "class", "svelte-10361lj");
				add_location(li8, file$3, 27, 2, 1445);
				attr_dev(li9, "class", "svelte-10361lj");
				add_location(li9, file$3, 28, 2, 1476);
				attr_dev(ul, "class", "svelte-10361lj");
				add_location(ul, file$3, 18, 1, 1191);
				set_custom_element_data(jahmin_project, "class", "svelte-10361lj");
				add_location(jahmin_project, file$3, 0, 0, 0);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, jahmin_project, anchor);
				append_dev(jahmin_project, section_header);
				append_dev(section_header, img_container);
				append_dev(img_container, img);
				append_dev(section_header, t0);
				append_dev(section_header, a);
				append_dev(a, h1);
				append_dev(a, t2);
				append_dev(a, svg);
				append_dev(svg, path);
				append_dev(jahmin_project, t3);
				append_dev(jahmin_project, p);
				append_dev(jahmin_project, t5);
				append_dev(jahmin_project, ul);
				append_dev(ul, li0);
				append_dev(ul, t7);
				append_dev(ul, li1);
				append_dev(ul, t9);
				append_dev(ul, li2);
				append_dev(ul, t11);
				append_dev(ul, li3);
				append_dev(ul, t13);
				append_dev(ul, li4);
				append_dev(ul, t15);
				append_dev(ul, li5);
				append_dev(ul, t17);
				append_dev(ul, li6);
				append_dev(ul, t19);
				append_dev(ul, li7);
				append_dev(ul, t21);
				append_dev(ul, li8);
				append_dev(ul, t23);
				append_dev(ul, li9);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(jahmin_project);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$3.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$3($$self, $$props) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('JahminProject', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<JahminProject> was created with unknown prop '${key}'`);
		});

		return [];
	}

	class JahminProject extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "JahminProject",
				options,
				id: create_fragment$3.name
			});
		}
	}

	/* src/projects/OtherProjects.svelte generated by Svelte v4.2.0 */
	const file$2 = "src/projects/OtherProjects.svelte";

	function create_fragment$2(ctx) {
		let p;

		const block = {
			c: function create() {
				p = element("p");
				p.textContent = "Other Projects";
				add_location(p, file$2, 0, 0, 0);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, p, anchor);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(p);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$2.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$2($$self, $$props) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('OtherProjects', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<OtherProjects> was created with unknown prop '${key}'`);
		});

		return [];
	}

	class OtherProjects extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "OtherProjects",
				options,
				id: create_fragment$2.name
			});
		}
	}

	var projectsConst = [
	    {
	        name: 'jahmin',
	        component: JahminProject,
	        description: `Jahmin, my pride and joy, I have been working on this app for some years now. A cross platform Music player based on
		ElectronJS and Svelte, capable of handling thousands of songs while the app is being used thanks to the use of Web Workers.`
	    },
	    {
	        name: 'achievement_seeker',
	        component: AchievementSeekerProject,
	        description: 'One of the very first big app I created. It was sadly never done. I began the project with Vue.js project then migrated to Svelte. It is an app the served as a focus on Steam achievements. There was a user authentication based on steam login, and it could fetch users achievements. The big twist is that, thanks to a funky algorithm I created, achievements would be split into : Bronze, Silver, Gold and Platinum to mimic the way PlayStation does it.'
	    },
	    {
	        name: 'id-generator',
	        component: IdGenerator,
	        description: ''
	    },
	    {
	        name: 'genshin-materials',
	        component: GenshinMaterials,
	        description: ''
	    },
	    {
	        name: 'others...',
	        component: OtherProjects,
	        description: ''
	    }
	];

	/*
	Adapted from https://github.com/mattdesl
	Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
	*/

	/**
	 * https://svelte.dev/docs/svelte-easing
	 * @param {number} t
	 * @returns {number}
	 */
	function cubicOut(t) {
		const f = t - 1.0;
		return f * f * f + 1.0;
	}

	/**
	 * Animates the opacity of an element from 0 to the current opacity for `in` transitions and from the current opacity to 0 for `out` transitions.
	 *
	 * https://svelte.dev/docs/svelte-transition#fade
	 * @param {Element} node
	 * @param {import('./public').FadeParams} [params]
	 * @returns {import('./public').TransitionConfig}
	 */
	function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
		const o = +getComputedStyle(node).opacity;
		return {
			delay,
			duration,
			easing,
			css: (t) => `opacity: ${t * o}`
		};
	}

	/**
	 * Slides an element in and out.
	 *
	 * https://svelte.dev/docs/svelte-transition#slide
	 * @param {Element} node
	 * @param {import('./public').SlideParams} [params]
	 * @returns {import('./public').TransitionConfig}
	 */
	function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = 'y' } = {}) {
		const style = getComputedStyle(node);
		const opacity = +style.opacity;
		const primary_property = axis === 'y' ? 'height' : 'width';
		const primary_property_value = parseFloat(style[primary_property]);
		const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
		const capitalized_secondary_properties = secondary_properties.map(
			(e) => `${e[0].toUpperCase()}${e.slice(1)}`
		);
		const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
		const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
		const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
		const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
		const border_width_start_value = parseFloat(
			style[`border${capitalized_secondary_properties[0]}Width`]
		);
		const border_width_end_value = parseFloat(
			style[`border${capitalized_secondary_properties[1]}Width`]
		);
		return {
			delay,
			duration,
			easing,
			css: (t) =>
				'overflow: hidden;' +
				`opacity: ${Math.min(t * 20, 1) * opacity};` +
				`${primary_property}: ${t * primary_property_value}px;` +
				`padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
				`padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
				`margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
				`margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
				`border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
				`border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
		};
	}

	/* src/sections/Projects.svelte generated by Svelte v4.2.0 */
	const file$1 = "src/sections/Projects.svelte";

	function get_each_context(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[12] = list[i];
		child_ctx[14] = i;
		return child_ctx;
	}

	function get_each_context_1(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[12] = list[i];
		child_ctx[14] = i;
		return child_ctx;
	}

	// (55:3) {#if selectedIndex === index}
	function create_if_block(ctx) {
		let div;
		let switch_instance;
		let t;
		let div_intro;
		let div_outro;
		let current;
		var switch_value = /*project*/ ctx[12].component;

		function switch_props(ctx, dirty) {
			return { $$inline: true };
		}

		if (switch_value) {
			switch_instance = construct_svelte_component_dev(switch_value, switch_props());
		}

		const block = {
			c: function create() {
				div = element("div");
				if (switch_instance) create_component(switch_instance.$$.fragment);
				t = space();
				add_location(div, file$1, 65, 4, 2162);
			},
			m: function mount(target, anchor) {
				insert_dev(target, div, anchor);
				if (switch_instance) mount_component(switch_instance, div, null);
				append_dev(div, t);
				current = true;
			},
			i: function intro(local) {
				if (current) return;
				if (switch_instance) transition_in(switch_instance.$$.fragment, local);

				if (local) {
					add_render_callback(() => {
						if (!current) return;
						if (div_outro) div_outro.end(1);
						div_intro = create_in_transition(div, slide, { duration: 500 });
						div_intro.start();
					});
				}

				current = true;
			},
			o: function outro(local) {
				if (switch_instance) transition_out(switch_instance.$$.fragment, local);
				if (div_intro) div_intro.invalidate();

				if (local) {
					div_outro = create_out_transition(div, slide, { duration: 500 });
				}

				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div);
				}

				if (switch_instance) destroy_component(switch_instance);
				if (detaching && div_outro) div_outro.end();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block.name,
			type: "if",
			source: "(55:3) {#if selectedIndex === index}",
			ctx
		});

		return block;
	}

	// (54:2) {#each projectsConst as project, index (index)}
	function create_each_block_1(key_1, ctx) {
		let first;
		let if_block_anchor;
		let current;
		let if_block = /*selectedIndex*/ ctx[1] === /*index*/ ctx[14] && create_if_block(ctx);

		const block = {
			key: key_1,
			first: null,
			c: function create() {
				first = empty();
				if (if_block) if_block.c();
				if_block_anchor = empty();
				this.first = first;
			},
			m: function mount(target, anchor) {
				insert_dev(target, first, anchor);
				if (if_block) if_block.m(target, anchor);
				insert_dev(target, if_block_anchor, anchor);
				current = true;
			},
			p: function update(new_ctx, dirty) {
				ctx = new_ctx;

				if (/*selectedIndex*/ ctx[1] === /*index*/ ctx[14]) {
					if (if_block) {
						if (dirty & /*selectedIndex*/ 2) {
							transition_in(if_block, 1);
						}
					} else {
						if_block = create_if_block(ctx);
						if_block.c();
						transition_in(if_block, 1);
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					group_outros();

					transition_out(if_block, 1, 1, () => {
						if_block = null;
					});

					check_outros();
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(if_block);
				current = true;
			},
			o: function outro(local) {
				transition_out(if_block);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(first);
					detach_dev(if_block_anchor);
				}

				if (if_block) if_block.d(detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block_1.name,
			type: "each",
			source: "(54:2) {#each projectsConst as project, index (index)}",
			ctx
		});

		return block;
	}

	// (65:3) {#each projectsConst as project, index (index)}
	function create_each_block(key_1, ctx) {
		let project_name;

		const block = {
			key: key_1,
			first: null,
			c: function create() {
				project_name = element("project-name");
				project_name.textContent = `${/*project*/ ctx[12].name}`;
				set_custom_element_data(project_name, "data-index", /*index*/ ctx[14]);
				set_custom_element_data(project_name, "class", "svelte-m4acsp");
				toggle_class(project_name, "selected", /*selectedIndex*/ ctx[1] === /*index*/ ctx[14]);
				toggle_class(project_name, "fade1", Math.abs(/*selectedIndex*/ ctx[1] - /*index*/ ctx[14]) === 1);
				toggle_class(project_name, "fade2", Math.abs(/*selectedIndex*/ ctx[1] - /*index*/ ctx[14]) === 2);
				toggle_class(project_name, "fade3", Math.abs(/*selectedIndex*/ ctx[1] - /*index*/ ctx[14]) === 3);
				toggle_class(project_name, "fade4", Math.abs(/*selectedIndex*/ ctx[1] - /*index*/ ctx[14]) > 3);
				add_location(project_name, file$1, 75, 4, 2518);
				this.first = project_name;
			},
			m: function mount(target, anchor) {
				insert_dev(target, project_name, anchor);
			},
			p: function update(new_ctx, dirty) {
				ctx = new_ctx;

				if (dirty & /*selectedIndex*/ 2) {
					toggle_class(project_name, "selected", /*selectedIndex*/ ctx[1] === /*index*/ ctx[14]);
				}

				if (dirty & /*Math, selectedIndex*/ 2) {
					toggle_class(project_name, "fade1", Math.abs(/*selectedIndex*/ ctx[1] - /*index*/ ctx[14]) === 1);
				}

				if (dirty & /*Math, selectedIndex*/ 2) {
					toggle_class(project_name, "fade2", Math.abs(/*selectedIndex*/ ctx[1] - /*index*/ ctx[14]) === 2);
				}

				if (dirty & /*Math, selectedIndex*/ 2) {
					toggle_class(project_name, "fade3", Math.abs(/*selectedIndex*/ ctx[1] - /*index*/ ctx[14]) === 3);
				}

				if (dirty & /*Math, selectedIndex*/ 2) {
					toggle_class(project_name, "fade4", Math.abs(/*selectedIndex*/ ctx[1] - /*index*/ ctx[14]) > 3);
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(project_name);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block.name,
			type: "each",
			source: "(65:3) {#each projectsConst as project, index (index)}",
			ctx
		});

		return block;
	}

	function create_fragment$1(ctx) {
		let section_svlt;
		let project_preview;
		let each_blocks_1 = [];
		let each0_lookup = new Map();
		let t;
		let projects_container;
		let projects_list;
		let each_blocks = [];
		let each1_lookup = new Map();
		let current;
		let mounted;
		let dispose;
		let each_value_1 = ensure_array_like_dev(projectsConst);
		const get_key = ctx => /*index*/ ctx[14];
		validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);

		for (let i = 0; i < each_value_1.length; i += 1) {
			let child_ctx = get_each_context_1(ctx, each_value_1, i);
			let key = get_key(child_ctx);
			each0_lookup.set(key, each_blocks_1[i] = create_each_block_1(key, child_ctx));
		}

		let each_value = ensure_array_like_dev(projectsConst);
		const get_key_1 = ctx => /*index*/ ctx[14];
		validate_each_keys(ctx, each_value, get_each_context, get_key_1);

		for (let i = 0; i < each_value.length; i += 1) {
			let child_ctx = get_each_context(ctx, each_value, i);
			let key = get_key_1(child_ctx);
			each1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
		}

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				project_preview = element("project-preview");

				for (let i = 0; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].c();
				}

				t = space();
				projects_container = element("projects-container");
				projects_list = element("projects-list");

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				set_custom_element_data(project_preview, "class", "svelte-m4acsp");
				add_location(project_preview, file$1, 62, 1, 2057);
				set_custom_element_data(projects_list, "role", "button");
				set_custom_element_data(projects_list, "tabindex", "0");
				set_custom_element_data(projects_list, "class", "svelte-m4acsp");
				add_location(projects_list, file$1, 73, 2, 2353);
				set_custom_element_data(projects_container, "class", "svelte-m4acsp");
				add_location(projects_container, file$1, 72, 1, 2330);
				set_custom_element_data(section_svlt, "id", "projects-section");
				set_custom_element_data(section_svlt, "class", "svelte-m4acsp");
				add_location(section_svlt, file$1, 61, 0, 1995);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
				append_dev(section_svlt, project_preview);

				for (let i = 0; i < each_blocks_1.length; i += 1) {
					if (each_blocks_1[i]) {
						each_blocks_1[i].m(project_preview, null);
					}
				}

				append_dev(section_svlt, t);
				append_dev(section_svlt, projects_container);
				append_dev(projects_container, projects_list);

				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(projects_list, null);
					}
				}

				/*section_svlt_binding*/ ctx[6](section_svlt);
				current = true;

				if (!mounted) {
					dispose = [
						listen_dev(projects_list, "click", /*handleListClickEvent*/ ctx[2], false, false, false, false),
						listen_dev(projects_list, "keypress", /*handleListClickEvent*/ ctx[2], false, false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*selectedIndex*/ 2) {
					each_value_1 = ensure_array_like_dev(projectsConst);
					group_outros();
					validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);
					each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx, each_value_1, each0_lookup, project_preview, outro_and_destroy_block, create_each_block_1, null, get_each_context_1);
					check_outros();
				}

				if (dirty & /*selectedIndex, Math*/ 2) {
					each_value = ensure_array_like_dev(projectsConst);
					validate_each_keys(ctx, each_value, get_each_context, get_key_1);
					each_blocks = update_keyed_each(each_blocks, dirty, get_key_1, 1, ctx, each_value, each1_lookup, projects_list, destroy_block, create_each_block, null, get_each_context);
				}
			},
			i: function intro(local) {
				if (current) return;

				for (let i = 0; i < each_value_1.length; i += 1) {
					transition_in(each_blocks_1[i]);
				}

				current = true;
			},
			o: function outro(local) {
				for (let i = 0; i < each_blocks_1.length; i += 1) {
					transition_out(each_blocks_1[i]);
				}

				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(section_svlt);
				}

				for (let i = 0; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d();
				}

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].d();
				}

				/*section_svlt_binding*/ ctx[6](null);
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$1.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function updateProjectData(project) {
		
	} // if (isMounted === false) return
	// projectTitleElement.style.opacity = '0'

	function instance$1($$self, $$props, $$invalidate) {
		let $projectsSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(projectsSectionFontWeight, 'projectsSectionFontWeight');
		component_subscribe($$self, projectsSectionFontWeight, $$value => $$invalidate(3, $projectsSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(4, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(5, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Projects', slots, []);
		let selfElement = undefined;
		let projectTitleElement = undefined;
		let projectDescriptionElement = undefined;
		let selectedIndex = 0;
		let projectTitle = projectsConst[0].name;
		let projectDescription = projectsConst[0].description;
		let isMounted = false;

		function handleListClickEvent(evt) {
			const eventTarget = evt.target;
			const projectNameElement = eventTarget.closest('project-name');
			if (projectNameElement === null) return;
			$$invalidate(1, selectedIndex = Number(projectNameElement.dataset.index));
		}

		// projectDescriptionElement.style.opacity = '0'
		// setTimeout(() => {
		// 	projectTitle = project.name
		// 	projectDescription = project.description
		// 	projectTitleElement.style.opacity = '1'
		// 	projectDescriptionElement.style.opacity = '1'
		// }, 300)
		onMount(() => {
			// isMounted = true
			setTimeout(
				() => {
					$$invalidate(1, selectedIndex = 1);
				},
				1000
			);
		});

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
		});

		function section_svlt_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				selfElement = $$value;
				$$invalidate(0, selfElement);
			});
		}

		$$self.$capture_state = () => ({
			projectsSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
			calculateFontWeightFn,
			fontWeightMinTresholdConst,
			fontWeightMaxTreshold,
			scrollToElementFn,
			projectsConst,
			onMount,
			fade,
			slide,
			selfElement,
			projectTitleElement,
			projectDescriptionElement,
			selectedIndex,
			projectTitle,
			projectDescription,
			isMounted,
			handleListClickEvent,
			updateProjectData,
			$projectsSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore
		});

		$$self.$inject_state = $$props => {
			if ('selfElement' in $$props) $$invalidate(0, selfElement = $$props.selfElement);
			if ('projectTitleElement' in $$props) projectTitleElement = $$props.projectTitleElement;
			if ('projectDescriptionElement' in $$props) projectDescriptionElement = $$props.projectDescriptionElement;
			if ('selectedIndex' in $$props) $$invalidate(1, selectedIndex = $$props.selectedIndex);
			if ('projectTitle' in $$props) projectTitle = $$props.projectTitle;
			if ('projectDescription' in $$props) projectDescription = $$props.projectDescription;
			if ('isMounted' in $$props) isMounted = $$props.isMounted;
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*selfElement, $windowScrollValueStore*/ 33) {
				if (selfElement) {
					set_store_value(projectsSectionFontWeight, $projectsSectionFontWeight = calculateFontWeightFn(selfElement), $projectsSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $projectsSectionFontWeight*/ 24) {
				if ($windowScrollStoppedStore === true) {
					if ($projectsSectionFontWeight <= fontWeightMaxTreshold && $projectsSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#projects-section');
					}
				}
			}

			if ($$self.$$.dirty & /*selectedIndex*/ 2) {
				updateProjectData(projectsConst[selectedIndex]);
			}
		};

		return [
			selfElement,
			selectedIndex,
			handleListClickEvent,
			$projectsSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class Projects extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Projects",
				options,
				id: create_fragment$1.name
			});
		}
	}

	let htmlElement = selectHTMLElement();

	function mediaQueriesFn () {
		let smallScreenMQ = window.matchMedia('only screen and (min-width: 360px) and (max-width: 640px');

		smallScreenMQ.addEventListener('change', evt => {
			if (evt.matches === true) {
				htmlElement.setAttribute('screen-size', 'small');
			}
		});

		let mediumScreenMQ = window.matchMedia('only screen and (min-width: 641px) and (max-width: 1007px)');

		mediumScreenMQ.addEventListener('change', evt => {
			if (evt.matches === true) {
				htmlElement.setAttribute('screen-size', 'medium');
			}
		});

		let bigScreenMQ = window.matchMedia('only screen and (min-width: 1008px)');

		bigScreenMQ.addEventListener('change', evt => {
			if (evt.matches === true) {
				htmlElement.setAttribute('screen-size', 'big');
			}
		});

		if (smallScreenMQ.matches) {
			htmlElement.setAttribute('screen-size', 'small');
		} else if (mediumScreenMQ.matches) {
			htmlElement.setAttribute('screen-size', 'medium');
		} else if (bigScreenMQ.matches) {
			htmlElement.setAttribute('screen-size', 'big');
		}
	}

	function selectHTMLElement() {
		return document.querySelector('html')
	}

	/* src/App.svelte generated by Svelte v4.2.0 */
	const file = "src/App.svelte";

	function create_fragment(ctx) {
		let main;
		let navigation;
		let t0;
		let home;
		let t1;
		let bio;
		let t2;
		let projects;
		let t3;
		let skills;
		let t4;
		let experience;
		let t5;
		let education;
		let current;
		navigation = new Navigation({ $$inline: true });
		home = new Home({ $$inline: true });
		bio = new Bio({ $$inline: true });
		projects = new Projects({ $$inline: true });
		skills = new Skills({ $$inline: true });
		experience = new Experience({ $$inline: true });
		education = new Education({ $$inline: true });

		const block = {
			c: function create() {
				main = element("main");
				create_component(navigation.$$.fragment);
				t0 = space();
				create_component(home.$$.fragment);
				t1 = space();
				create_component(bio.$$.fragment);
				t2 = space();
				create_component(projects.$$.fragment);
				t3 = space();
				create_component(skills.$$.fragment);
				t4 = space();
				create_component(experience.$$.fragment);
				t5 = space();
				create_component(education.$$.fragment);
				add_location(main, file, 31, 0, 1003);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, main, anchor);
				mount_component(navigation, main, null);
				append_dev(main, t0);
				mount_component(home, main, null);
				append_dev(main, t1);
				mount_component(bio, main, null);
				append_dev(main, t2);
				mount_component(projects, main, null);
				append_dev(main, t3);
				mount_component(skills, main, null);
				append_dev(main, t4);
				mount_component(experience, main, null);
				append_dev(main, t5);
				mount_component(education, main, null);
				current = true;
			},
			p: noop,
			i: function intro(local) {
				if (current) return;
				transition_in(navigation.$$.fragment, local);
				transition_in(home.$$.fragment, local);
				transition_in(bio.$$.fragment, local);
				transition_in(projects.$$.fragment, local);
				transition_in(skills.$$.fragment, local);
				transition_in(experience.$$.fragment, local);
				transition_in(education.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(navigation.$$.fragment, local);
				transition_out(home.$$.fragment, local);
				transition_out(bio.$$.fragment, local);
				transition_out(projects.$$.fragment, local);
				transition_out(skills.$$.fragment, local);
				transition_out(experience.$$.fragment, local);
				transition_out(education.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(main);
				}

				destroy_component(navigation);
				destroy_component(home);
				destroy_component(bio);
				destroy_component(projects);
				destroy_component(skills);
				destroy_component(experience);
				destroy_component(education);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance($$self, $$props, $$invalidate) {
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(1, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(2, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('App', slots, []);
		let windowScrollDebounce = undefined;

		onMount(() => {
			window.addEventListener('scroll', evt => {
				set_store_value(windowScrollValueStore, $windowScrollValueStore = window.scrollY || document.documentElement.scrollTop, $windowScrollValueStore);
				set_store_value(windowScrollStoppedStore, $windowScrollStoppedStore = false, $windowScrollStoppedStore);
				clearTimeout(windowScrollDebounce);

				windowScrollDebounce = setTimeout(
					() => {
						set_store_value(windowScrollStoppedStore, $windowScrollStoppedStore = true, $windowScrollStoppedStore);
					},
					500
				);
			});

			mediaQueriesFn();
		});

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
		});

		$$self.$capture_state = () => ({
			onMount,
			Navigation,
			Home,
			windowScrollStoppedStore,
			windowScrollValueStore,
			Jahmin,
			Skills,
			Experience,
			Education,
			Bio,
			Projects,
			mediaQueriesFn,
			windowScrollDebounce,
			$windowScrollStoppedStore,
			$windowScrollValueStore
		});

		$$self.$inject_state = $$props => {
			if ('windowScrollDebounce' in $$props) windowScrollDebounce = $$props.windowScrollDebounce;
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [];
	}

	class App extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance, create_fragment, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "App",
				options,
				id: create_fragment.name
			});
		}
	}

	// @ts-ignore
	const app = new App({
	    target: document.body
	});

	return app;

})();
//# sourceMappingURL=bundle.js.map
