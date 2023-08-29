
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
	'use strict';

	/** @returns {void} */
	function noop() {}

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

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append(target, node) {
		target.appendChild(node);
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

	const outroing = new Set();

	/**
	 * @type {Outro}
	 */
	let outros;

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

	/**
	 * @returns {void} */
	function validate_slots(name, slot, keys) {
		for (const slot_key of Object.keys(slot)) {
			if (!~keys.indexOf(slot_key)) {
				console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
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
	    Project: {
	        fr: 'Projet'
	    },
	    Skills: {
	        fr: 'Compétences'
	    },
	    Experience: {
	        fr: 'Expérience'
	    },
	    'Education': {
	        fr: 'Éducation'
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
	let jahminSectionFontWeight = writable(400);
	let langStore = writable(localStorage.getItem('lang') || 'en');
	langStore.subscribe(value => {
	    localStorage.setItem('lang', value);
	});

	/* src/Navigation.svelte generated by Svelte v4.2.0 */

	const file$7 = "src/Navigation.svelte";

	function create_fragment$7(ctx) {
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
		let t4_value = getTranslationsFn('Project', /*$langStore*/ ctx[1]) + "";
		let t4;
		let t5;
		let br;
		let t6;
		let t7;
		let button3;
		let t8_value = getTranslationsFn('Skills', /*$langStore*/ ctx[1]) + "";
		let t8;
		let t9;
		let button4;
		let t10_value = getTranslationsFn('Experience', /*$langStore*/ ctx[1]) + "";
		let t10;
		let t11;
		let button5;
		let t12_value = getTranslationsFn('Education', /*$langStore*/ ctx[1]) + "";
		let t12;
		let t13;
		let separator;
		let t14;
		let button6;
		let t16;
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
				br = element("br");
				t6 = text("\n\t\tJahmin");
				t7 = space();
				button3 = element("button");
				t8 = text(t8_value);
				t9 = space();
				button4 = element("button");
				t10 = text(t10_value);
				t11 = space();
				button5 = element("button");
				t12 = text(t12_value);
				t13 = space();
				separator = element("separator");
				t14 = space();
				button6 = element("button");
				button6.textContent = "English";
				t16 = space();
				button7 = element("button");
				button7.textContent = "Français";
				attr_dev(button0, "class", "nostyle svelte-dc72jo");
				set_style(button0, "font-variation-settings", "'wght' " + /*$homeSectionFontWeight*/ ctx[0]);
				add_location(button0, file$7, 19, 1, 445);
				attr_dev(button1, "class", "nostyle svelte-dc72jo");
				set_style(button1, "font-variation-settings", "'wght' " + /*$bioSectionFontWeight*/ ctx[2]);
				add_location(button1, file$7, 26, 1, 647);
				add_location(br, file$7, 39, 2, 1045);
				attr_dev(button2, "class", "nostyle svelte-dc72jo");
				set_style(button2, "font-variation-settings", "'wght' " + /*$jahminSectionFontWeight*/ ctx[3]);
				add_location(button2, file$7, 33, 1, 846);
				attr_dev(button3, "class", "nostyle svelte-dc72jo");
				set_style(button3, "font-variation-settings", "'wght' " + /*$skillsSectionFontWeight*/ ctx[4]);
				add_location(button3, file$7, 42, 1, 1073);
				attr_dev(button4, "class", "nostyle svelte-dc72jo");
				set_style(button4, "font-variation-settings", "'wght' " + /*$experienceSectionFontWeight*/ ctx[5]);
				add_location(button4, file$7, 47, 1, 1276);
				attr_dev(button5, "class", "nostyle svelte-dc72jo");
				set_style(button5, "font-variation-settings", "'wght' " + /*$educationSectionFontWeight*/ ctx[6]);
				add_location(button5, file$7, 54, 1, 1496);
				attr_dev(separator, "class", "svelte-dc72jo");
				add_location(separator, file$7, 62, 1, 1714);
				attr_dev(button6, "class", "nostyle langButton svelte-dc72jo");
				toggle_class(button6, "selected", /*$langStore*/ ctx[1] === 'en');
				add_location(button6, file$7, 64, 1, 1730);
				attr_dev(button7, "class", "nostyle langButton svelte-dc72jo");
				toggle_class(button7, "selected", /*$langStore*/ ctx[1] === 'fr');
				add_location(button7, file$7, 68, 1, 1863);
				set_custom_element_data(navigation_svlt, "class", "svelte-dc72jo");
				add_location(navigation_svlt, file$7, 18, 0, 426);
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
				append_dev(button2, t5);
				append_dev(button2, br);
				append_dev(button2, t6);
				append_dev(navigation_svlt, t7);
				append_dev(navigation_svlt, button3);
				append_dev(button3, t8);
				append_dev(navigation_svlt, t9);
				append_dev(navigation_svlt, button4);
				append_dev(button4, t10);
				append_dev(navigation_svlt, t11);
				append_dev(navigation_svlt, button5);
				append_dev(button5, t12);
				append_dev(navigation_svlt, t13);
				append_dev(navigation_svlt, separator);
				append_dev(navigation_svlt, t14);
				append_dev(navigation_svlt, button6);
				append_dev(navigation_svlt, t16);
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

				if (dirty & /*$langStore*/ 2 && t4_value !== (t4_value = getTranslationsFn('Project', /*$langStore*/ ctx[1]) + "")) set_data_dev(t4, t4_value);

				if (dirty & /*$jahminSectionFontWeight*/ 8) {
					set_style(button2, "font-variation-settings", "'wght' " + /*$jahminSectionFontWeight*/ ctx[3]);
				}

				if (dirty & /*$langStore*/ 2 && t8_value !== (t8_value = getTranslationsFn('Skills', /*$langStore*/ ctx[1]) + "")) set_data_dev(t8, t8_value);

				if (dirty & /*$skillsSectionFontWeight*/ 16) {
					set_style(button3, "font-variation-settings", "'wght' " + /*$skillsSectionFontWeight*/ ctx[4]);
				}

				if (dirty & /*$langStore*/ 2 && t10_value !== (t10_value = getTranslationsFn('Experience', /*$langStore*/ ctx[1]) + "")) set_data_dev(t10, t10_value);

				if (dirty & /*$experienceSectionFontWeight*/ 32) {
					set_style(button4, "font-variation-settings", "'wght' " + /*$experienceSectionFontWeight*/ ctx[5]);
				}

				if (dirty & /*$langStore*/ 2 && t12_value !== (t12_value = getTranslationsFn('Education', /*$langStore*/ ctx[1]) + "")) set_data_dev(t12, t12_value);

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
			id: create_fragment$7.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$7($$self, $$props, $$invalidate) {
		let $homeSectionFontWeight;
		let $langStore;
		let $bioSectionFontWeight;
		let $jahminSectionFontWeight;
		let $skillsSectionFontWeight;
		let $experienceSectionFontWeight;
		let $educationSectionFontWeight;
		validate_store(homeSectionFontWeight, 'homeSectionFontWeight');
		component_subscribe($$self, homeSectionFontWeight, $$value => $$invalidate(0, $homeSectionFontWeight = $$value));
		validate_store(langStore, 'langStore');
		component_subscribe($$self, langStore, $$value => $$invalidate(1, $langStore = $$value));
		validate_store(bioSectionFontWeight, 'bioSectionFontWeight');
		component_subscribe($$self, bioSectionFontWeight, $$value => $$invalidate(2, $bioSectionFontWeight = $$value));
		validate_store(jahminSectionFontWeight, 'jahminSectionFontWeight');
		component_subscribe($$self, jahminSectionFontWeight, $$value => $$invalidate(3, $jahminSectionFontWeight = $$value));
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
		const click_handler_2 = () => scrollToSection('jahmin-section');
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
			jahminSectionFontWeight,
			langStore,
			educationSectionFontWeight,
			skillsSectionFontWeight,
			experienceSectionFontWeight,
			scrollToSection,
			$homeSectionFontWeight,
			$langStore,
			$bioSectionFontWeight,
			$jahminSectionFontWeight,
			$skillsSectionFontWeight,
			$experienceSectionFontWeight,
			$educationSectionFontWeight
		});

		return [
			$homeSectionFontWeight,
			$langStore,
			$bioSectionFontWeight,
			$jahminSectionFontWeight,
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
			init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Navigation",
				options,
				id: create_fragment$7.name
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

	const file$6 = "src/sections/Home.svelte";

	function create_fragment$6(ctx) {
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
				t7 = text(" From start to shipping");
				if (!src_url_equal(img.src, img_src_value = "https://placehold.co/400x400/png")) attr_dev(img, "src", img_src_value);
				attr_dev(img, "alt", "");
				attr_dev(img, "class", "svelte-1lnd9bx");
				add_location(img, file$6, 52, 17, 1476);
				set_custom_element_data(img_container, "class", "svelte-1lnd9bx");
				add_location(img_container, file$6, 52, 2, 1461);
				set_custom_element_data(section_header, "class", "svelte-1lnd9bx");
				add_location(section_header, file$6, 51, 1, 1442);
				attr_dev(h10, "class", "who svelte-1lnd9bx");
				add_location(h10, file$6, 56, 2, 1584);
				attr_dev(separator, "class", "svelte-1lnd9bx");
				add_location(separator, file$6, 57, 2, 1619);
				attr_dev(h11, "class", "what svelte-1lnd9bx");
				add_location(h11, file$6, 58, 2, 1635);
				add_location(br, file$6, 59, 35, 1747);
				attr_dev(p, "class", "svelte-1lnd9bx");
				add_location(p, file$6, 59, 2, 1714);
				set_custom_element_data(section_body, "class", "svelte-1lnd9bx");
				add_location(section_body, file$6, 55, 1, 1567);
				set_custom_element_data(section_svlt, "id", "home-section");
				set_custom_element_data(section_svlt, "class", "svelte-1lnd9bx");
				toggle_class(section_svlt, "isVisible", /*isVisible*/ ctx[1]);
				add_location(section_svlt, file$6, 50, 0, 1368);
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
			id: create_fragment$6.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$6($$self, $$props, $$invalidate) {
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
			init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Home",
				options,
				id: create_fragment$6.name
			});
		}
	}

	/* src/sections/Jahmin.svelte generated by Svelte v4.2.0 */
	const file$5 = "src/sections/Jahmin.svelte";

	function create_fragment$5(ctx) {
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
				if (!src_url_equal(img.src, img_src_value = "./img/jahmin-logo.svg")) attr_dev(img, "src", img_src_value);
				attr_dev(img, "alt", "");
				attr_dev(img, "class", "svelte-1txynpi");
				add_location(img, file$5, 23, 17, 885);
				set_custom_element_data(img_container, "class", "svelte-1txynpi");
				add_location(img_container, file$5, 23, 2, 870);
				add_location(h1, file$5, 26, 3, 1011);
				attr_dev(path, "d", "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z");
				add_location(path, file$5, 28, 4, 1136);
				attr_dev(svg, "height", "32");
				attr_dev(svg, "aria-hidden", "true");
				attr_dev(svg, "viewBox", "0 0 16 16");
				attr_dev(svg, "version", "1.1");
				attr_dev(svg, "width", "28");
				attr_dev(svg, "fill", "currentColor");
				attr_dev(svg, "class", "svelte-1txynpi");
				add_location(svg, file$5, 27, 3, 1030);
				attr_dev(a, "href", "https://github.com/PacoGim/Jahmin");
				attr_dev(a, "target", "_blank");
				attr_dev(a, "class", "svelte-1txynpi");
				add_location(a, file$5, 25, 2, 947);
				set_custom_element_data(section_header, "class", "svelte-1txynpi");
				add_location(section_header, file$5, 22, 1, 851);
				attr_dev(p0, "class", "svelte-1txynpi");
				add_location(p0, file$5, 34, 1, 1767);
				attr_dev(p1, "class", "svelte-1txynpi");
				add_location(p1, file$5, 39, 1, 2024);
				add_location(li0, file$5, 41, 2, 2075);
				add_location(li1, file$5, 42, 2, 2109);
				add_location(li2, file$5, 43, 2, 2127);
				add_location(li3, file$5, 44, 2, 2153);
				add_location(li4, file$5, 45, 2, 2199);
				add_location(li5, file$5, 46, 2, 2232);
				add_location(li6, file$5, 47, 2, 2265);
				add_location(li7, file$5, 48, 2, 2299);
				add_location(li8, file$5, 49, 2, 2322);
				add_location(li9, file$5, 50, 2, 2353);
				add_location(ul, file$5, 40, 1, 2068);
				set_custom_element_data(section_svlt, "id", "jahmin-section");
				set_custom_element_data(section_svlt, "class", "svelte-1txynpi");
				add_location(section_svlt, file$5, 21, 0, 791);
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
			id: create_fragment$5.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$5($$self, $$props, $$invalidate) {
		let $jahminSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(jahminSectionFontWeight, 'jahminSectionFontWeight');
		component_subscribe($$self, jahminSectionFontWeight, $$value => $$invalidate(1, $jahminSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(2, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(3, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Jahmin', slots, []);
		let selfElement = undefined;
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Jahmin> was created with unknown prop '${key}'`);
		});

		function section_svlt_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				selfElement = $$value;
				$$invalidate(0, selfElement);
			});
		}

		$$self.$capture_state = () => ({
			jahminSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
			calculateFontWeightFn,
			fontWeightMaxTreshold,
			fontWeightMinTresholdConst,
			scrollToElementFn,
			selfElement,
			$jahminSectionFontWeight,
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
					set_store_value(jahminSectionFontWeight, $jahminSectionFontWeight = calculateFontWeightFn(selfElement), $jahminSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $jahminSectionFontWeight*/ 6) {
				if ($windowScrollStoppedStore === true) {
					if ($jahminSectionFontWeight <= fontWeightMaxTreshold && $jahminSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#jahmin-section');
					}
				}
			}
		};

		return [
			selfElement,
			$jahminSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class Jahmin extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Jahmin",
				options,
				id: create_fragment$5.name
			});
		}
	}

	/* src/sections/Skills.svelte generated by Svelte v4.2.0 */
	const file$4 = "src/sections/Skills.svelte";

	function create_fragment$4(ctx) {
		let section_svlt;
		let h1;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				h1 = element("h1");
				h1.textContent = "Skills";
				add_location(h1, file$4, 22, 1, 851);
				set_custom_element_data(section_svlt, "id", "skills-section");
				set_custom_element_data(section_svlt, "class", "svelte-gte8wo");
				add_location(section_svlt, file$4, 21, 0, 791);
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
			id: create_fragment$4.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$4($$self, $$props, $$invalidate) {
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
			init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Skills",
				options,
				id: create_fragment$4.name
			});
		}
	}

	/* src/sections/Experience.svelte generated by Svelte v4.2.0 */

	const file$3 = "src/sections/Experience.svelte";

	function create_fragment$3(ctx) {
		let section_svlt;
		let h1;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				h1 = element("h1");
				h1.textContent = "Experience";
				add_location(h1, file$3, 22, 1, 875);
				set_custom_element_data(section_svlt, "id", "experience-section");
				set_custom_element_data(section_svlt, "class", "svelte-1dd888g");
				add_location(section_svlt, file$3, 21, 0, 811);
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
			id: create_fragment$3.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$3($$self, $$props, $$invalidate) {
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
			init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Experience",
				options,
				id: create_fragment$3.name
			});
		}
	}

	/* src/sections/Education.svelte generated by Svelte v4.2.0 */
	const file$2 = "src/sections/Education.svelte";

	function create_fragment$2(ctx) {
		let section_svlt;
		let h1;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				h1 = element("h1");
				h1.textContent = "Education";
				add_location(h1, file$2, 22, 1, 869);
				set_custom_element_data(section_svlt, "id", "education-section");
				set_custom_element_data(section_svlt, "class", "svelte-1dd888g");
				add_location(section_svlt, file$2, 21, 0, 806);
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
			id: create_fragment$2.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$2($$self, $$props, $$invalidate) {
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
			init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Education",
				options,
				id: create_fragment$2.name
			});
		}
	}

	/* src/sections/Bio.svelte generated by Svelte v4.2.0 */
	const file$1 = "src/sections/Bio.svelte";

	function create_fragment$1(ctx) {
		let section_svlt;
		let p;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				p = element("p");
				p.textContent = "Hello, my name is Paco Gimeno and I'm a software engineer with 6 years of experience. I'm passionate about creating innovative solutions to complex problems and enjoy working collaboratively with others. My technical skills include proficiency in Javascript (and Typescript) and Svelte. I'm also a strong communicator and enjoy helping others learn and grow.";
				add_location(p, file$1, 22, 2, 834);
				set_custom_element_data(section_svlt, "id", "bio-section");
				set_custom_element_data(section_svlt, "class", "svelte-1dd888g");
				add_location(section_svlt, file$1, 21, 0, 776);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
				append_dev(section_svlt, p);
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
			id: create_fragment$1.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$1($$self, $$props, $$invalidate) {
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
			init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Bio",
				options,
				id: create_fragment$1.name
			});
		}
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
		let jahmin;
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
		jahmin = new Jahmin({ $$inline: true });
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
				create_component(jahmin.$$.fragment);
				t3 = space();
				create_component(skills.$$.fragment);
				t4 = space();
				create_component(experience.$$.fragment);
				t5 = space();
				create_component(education.$$.fragment);
				add_location(main, file, 27, 0, 872);
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
				mount_component(jahmin, main, null);
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
				transition_in(jahmin.$$.fragment, local);
				transition_in(skills.$$.fragment, local);
				transition_in(experience.$$.fragment, local);
				transition_in(education.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(navigation.$$.fragment, local);
				transition_out(home.$$.fragment, local);
				transition_out(bio.$$.fragment, local);
				transition_out(jahmin.$$.fragment, local);
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
				destroy_component(jahmin);
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
