
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
	let projectsSectionFontWeight = writable(400);
	let homeSectionFontWeight = writable(400);
	let bioSectionFontWeight = writable(400);
	let skillsSectionFontWeight = writable(400);
	let aboutSectionFontWeight = writable(400);

	/* src/Navigation.svelte generated by Svelte v4.2.0 */

	const file$6 = "src/Navigation.svelte";

	function create_fragment$6(ctx) {
		let navigation_svlt;
		let button0;
		let t0;
		let t1;
		let button1;
		let t2;
		let t3;
		let button2;
		let t4;
		let t5;
		let button3;
		let t6;
		let t7;
		let button4;
		let t8;
		let mounted;
		let dispose;

		const block = {
			c: function create() {
				navigation_svlt = element("navigation-svlt");
				button0 = element("button");
				t0 = text("Home");
				t1 = space();
				button1 = element("button");
				t2 = text("Projects");
				t3 = space();
				button2 = element("button");
				t4 = text("Bio");
				t5 = space();
				button3 = element("button");
				t6 = text("Skills");
				t7 = space();
				button4 = element("button");
				t8 = text("About");
				attr_dev(button0, "class", "nostyle");
				set_style(button0, "font-variation-settings", "'wght' " + /*$homeSectionFontWeight*/ ctx[0]);
				add_location(button0, file$6, 12, 1, 259);
				attr_dev(button1, "class", "nostyle");
				set_style(button1, "font-variation-settings", "'wght' " + /*$projectsSectionFontWeight*/ ctx[1]);
				add_location(button1, file$6, 19, 1, 429);
				attr_dev(button2, "class", "nostyle");
				set_style(button2, "font-variation-settings", "'wght' " + /*$bioSectionFontWeight*/ ctx[2]);
				add_location(button2, file$6, 26, 1, 611);
				attr_dev(button3, "class", "nostyle");
				set_style(button3, "font-variation-settings", "'wght' " + /*$skillsSectionFontWeight*/ ctx[3]);
				add_location(button3, file$6, 31, 1, 773);
				attr_dev(button4, "class", "nostyle");
				set_style(button4, "font-variation-settings", "'wght' " + /*$aboutSectionFontWeight*/ ctx[4]);
				add_location(button4, file$6, 38, 1, 949);
				set_custom_element_data(navigation_svlt, "class", "svelte-x83o9s");
				add_location(navigation_svlt, file$6, 11, 0, 240);
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

				if (!mounted) {
					dispose = [
						listen_dev(button0, "click", /*click_handler*/ ctx[5], false, false, false, false),
						listen_dev(button1, "click", /*click_handler_1*/ ctx[6], false, false, false, false),
						listen_dev(button2, "click", /*click_handler_2*/ ctx[7], false, false, false, false),
						listen_dev(button3, "click", /*click_handler_3*/ ctx[8], false, false, false, false),
						listen_dev(button4, "click", /*click_handler_4*/ ctx[9], false, false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*$homeSectionFontWeight*/ 1) {
					set_style(button0, "font-variation-settings", "'wght' " + /*$homeSectionFontWeight*/ ctx[0]);
				}

				if (dirty & /*$projectsSectionFontWeight*/ 2) {
					set_style(button1, "font-variation-settings", "'wght' " + /*$projectsSectionFontWeight*/ ctx[1]);
				}

				if (dirty & /*$bioSectionFontWeight*/ 4) {
					set_style(button2, "font-variation-settings", "'wght' " + /*$bioSectionFontWeight*/ ctx[2]);
				}

				if (dirty & /*$skillsSectionFontWeight*/ 8) {
					set_style(button3, "font-variation-settings", "'wght' " + /*$skillsSectionFontWeight*/ ctx[3]);
				}

				if (dirty & /*$aboutSectionFontWeight*/ 16) {
					set_style(button4, "font-variation-settings", "'wght' " + /*$aboutSectionFontWeight*/ ctx[4]);
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
			id: create_fragment$6.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$6($$self, $$props, $$invalidate) {
		let $homeSectionFontWeight;
		let $projectsSectionFontWeight;
		let $bioSectionFontWeight;
		let $skillsSectionFontWeight;
		let $aboutSectionFontWeight;
		validate_store(homeSectionFontWeight, 'homeSectionFontWeight');
		component_subscribe($$self, homeSectionFontWeight, $$value => $$invalidate(0, $homeSectionFontWeight = $$value));
		validate_store(projectsSectionFontWeight, 'projectsSectionFontWeight');
		component_subscribe($$self, projectsSectionFontWeight, $$value => $$invalidate(1, $projectsSectionFontWeight = $$value));
		validate_store(bioSectionFontWeight, 'bioSectionFontWeight');
		component_subscribe($$self, bioSectionFontWeight, $$value => $$invalidate(2, $bioSectionFontWeight = $$value));
		validate_store(skillsSectionFontWeight, 'skillsSectionFontWeight');
		component_subscribe($$self, skillsSectionFontWeight, $$value => $$invalidate(3, $skillsSectionFontWeight = $$value));
		validate_store(aboutSectionFontWeight, 'aboutSectionFontWeight');
		component_subscribe($$self, aboutSectionFontWeight, $$value => $$invalidate(4, $aboutSectionFontWeight = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Navigation', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navigation> was created with unknown prop '${key}'`);
		});

		const click_handler = () => scrollToElementFn('#home-section');
		const click_handler_1 = () => scrollToElementFn('#projects-section');
		const click_handler_2 = () => scrollToElementFn('#bio-section');
		const click_handler_3 = () => scrollToElementFn('#skills-section');
		const click_handler_4 = () => scrollToElementFn('#about-section');

		$$self.$capture_state = () => ({
			scrollToElementFn,
			aboutSectionFontWeight,
			bioSectionFontWeight,
			homeSectionFontWeight,
			projectsSectionFontWeight,
			skillsSectionFontWeight,
			$homeSectionFontWeight,
			$projectsSectionFontWeight,
			$bioSectionFontWeight,
			$skillsSectionFontWeight,
			$aboutSectionFontWeight
		});

		return [
			$homeSectionFontWeight,
			$projectsSectionFontWeight,
			$bioSectionFontWeight,
			$skillsSectionFontWeight,
			$aboutSectionFontWeight,
			click_handler,
			click_handler_1,
			click_handler_2,
			click_handler_3,
			click_handler_4
		];
	}

	class Navigation extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Navigation",
				options,
				id: create_fragment$6.name
			});
		}
	}

	var fontWeightMaxTreshold = 720;

	var fontWeightMinTresholdConst = 680;

	function calculateFontWeightFn (element) {
	    let elementHeight = element.scrollHeight;
	    let elementScroll = element.getClientRects()[0].top;
	    let absoluteValue = Math.abs(elementScroll / elementHeight);
	    const fontSizeMin = 400;
	    const fontSizeMax = 700;
	    const fontSize = Math.trunc(fontSizeMax + (fontSizeMin - fontSizeMax) * absoluteValue);
	    return fontSize;
	}

	/* src/sections/Home.svelte generated by Svelte v4.2.0 */

	const file$5 = "src/sections/Home.svelte";

	function create_fragment$5(ctx) {
		let section_svlt;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				set_custom_element_data(section_svlt, "id", "home-section");
				set_custom_element_data(section_svlt, "class", "svelte-19hr5qt");
				add_location(section_svlt, file$5, 21, 0, 781);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
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
		let $homeSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(homeSectionFontWeight, 'homeSectionFontWeight');
		component_subscribe($$self, homeSectionFontWeight, $$value => $$invalidate(1, $homeSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(2, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(3, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Home', slots, []);
		let selfElement = undefined;
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
			fontWeightMaxTreshold,
			fontWeightMinTresholdConst,
			calculateFontWeightFn,
			scrollToElementFn,
			homeSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
			selfElement,
			$homeSectionFontWeight,
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
					set_store_value(homeSectionFontWeight, $homeSectionFontWeight = calculateFontWeightFn(selfElement), $homeSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $homeSectionFontWeight*/ 6) {
				if ($windowScrollStoppedStore === true) {
					if ($homeSectionFontWeight <= fontWeightMaxTreshold && $homeSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#home-section');
					}
				}
			}
		};

		return [
			selfElement,
			$homeSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class Home extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Home",
				options,
				id: create_fragment$5.name
			});
		}
	}

	/* src/sections/Projects.svelte generated by Svelte v4.2.0 */
	const file$4 = "src/sections/Projects.svelte";

	function create_fragment$4(ctx) {
		let section_svlt;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				section_svlt.textContent = "Hello! This is a section of the portfolio!";
				set_custom_element_data(section_svlt, "id", "projects-section");
				set_custom_element_data(section_svlt, "class", "svelte-11rhy0u");
				add_location(section_svlt, file$4, 22, 0, 835);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
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
		let $projectsSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(projectsSectionFontWeight, 'projectsSectionFontWeight');
		component_subscribe($$self, projectsSectionFontWeight, $$value => $$invalidate(1, $projectsSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(2, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(3, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Projects', slots, []);
		let selfElement = undefined;
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
			onMount,
			projectsSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
			calculateFontWeightFn,
			fontWeightMaxTreshold,
			fontWeightMinTresholdConst,
			scrollToElementFn,
			selfElement,
			$projectsSectionFontWeight,
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
					set_store_value(projectsSectionFontWeight, $projectsSectionFontWeight = calculateFontWeightFn(selfElement), $projectsSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $projectsSectionFontWeight*/ 6) {
				if ($windowScrollStoppedStore === true) {
					if ($projectsSectionFontWeight <= fontWeightMaxTreshold && $projectsSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#projects-section');
					}
				}
			}
		};

		return [
			selfElement,
			$projectsSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class Projects extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Projects",
				options,
				id: create_fragment$4.name
			});
		}
	}

	/* src/sections/Bio.svelte generated by Svelte v4.2.0 */

	const file$3 = "src/sections/Bio.svelte";

	function create_fragment$3(ctx) {
		let section_svlt;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				section_svlt.textContent = "Hello! This is a section of the portfolio!";
				set_custom_element_data(section_svlt, "id", "bio-section");
				set_custom_element_data(section_svlt, "class", "svelte-a6xkm2");
				add_location(section_svlt, file$3, 21, 0, 776);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
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
			fontWeightMaxTreshold,
			fontWeightMinTresholdConst,
			calculateFontWeightFn,
			scrollToElementFn,
			bioSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
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
			init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Bio",
				options,
				id: create_fragment$3.name
			});
		}
	}

	/* src/sections/Skills.svelte generated by Svelte v4.2.0 */
	const file$2 = "src/sections/Skills.svelte";

	function create_fragment$2(ctx) {
		let section_svlt;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				section_svlt.textContent = "Hello! This is a section of the portfolio!";
				set_custom_element_data(section_svlt, "id", "skills-section");
				set_custom_element_data(section_svlt, "class", "svelte-11rhy0u");
				add_location(section_svlt, file$2, 21, 0, 791);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
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
			init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Skills",
				options,
				id: create_fragment$2.name
			});
		}
	}

	/* src/sections/About.svelte generated by Svelte v4.2.0 */
	const file$1 = "src/sections/About.svelte";

	function create_fragment$1(ctx) {
		let section_svlt;

		const block = {
			c: function create() {
				section_svlt = element("section-svlt");
				section_svlt.textContent = "Hello! This is a section of the portfolio!";
				set_custom_element_data(section_svlt, "id", "about-section");
				set_custom_element_data(section_svlt, "class", "svelte-11rhy0u");
				add_location(section_svlt, file$1, 21, 0, 813);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, section_svlt, anchor);
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
		let $aboutSectionFontWeight;
		let $windowScrollStoppedStore;
		let $windowScrollValueStore;
		validate_store(aboutSectionFontWeight, 'aboutSectionFontWeight');
		component_subscribe($$self, aboutSectionFontWeight, $$value => $$invalidate(1, $aboutSectionFontWeight = $$value));
		validate_store(windowScrollStoppedStore, 'windowScrollStoppedStore');
		component_subscribe($$self, windowScrollStoppedStore, $$value => $$invalidate(2, $windowScrollStoppedStore = $$value));
		validate_store(windowScrollValueStore, 'windowScrollValueStore');
		component_subscribe($$self, windowScrollValueStore, $$value => $$invalidate(3, $windowScrollValueStore = $$value));
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('About', slots, []);
		let selfElement = undefined;
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
		});

		function section_svlt_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				selfElement = $$value;
				$$invalidate(0, selfElement);
			});
		}

		$$self.$capture_state = () => ({
			aboutSectionFontWeight,
			projectsSectionFontWeight,
			windowScrollStoppedStore,
			windowScrollValueStore,
			calculateFontWeightFn,
			fontWeightMinTresholdConst,
			fontWeightMaxTreshold,
			scrollToElementFn,
			selfElement,
			$aboutSectionFontWeight,
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
					set_store_value(aboutSectionFontWeight, $aboutSectionFontWeight = calculateFontWeightFn(selfElement), $aboutSectionFontWeight);
				}
			}

			if ($$self.$$.dirty & /*$windowScrollStoppedStore, $aboutSectionFontWeight*/ 6) {
				if ($windowScrollStoppedStore === true) {
					if ($aboutSectionFontWeight <= fontWeightMaxTreshold && $aboutSectionFontWeight >= fontWeightMinTresholdConst) {
						scrollToElementFn('#about-section');
					}
				}
			}
		};

		return [
			selfElement,
			$aboutSectionFontWeight,
			$windowScrollStoppedStore,
			$windowScrollValueStore,
			section_svlt_binding
		];
	}

	class About extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "About",
				options,
				id: create_fragment$1.name
			});
		}
	}

	/* src/App.svelte generated by Svelte v4.2.0 */
	const file = "src/App.svelte";

	function create_fragment(ctx) {
		let navigation;
		let t0;
		let main;
		let home;
		let t1;
		let projects;
		let t2;
		let bio;
		let t3;
		let skills;
		let t4;
		let about;
		let current;
		navigation = new Navigation({ $$inline: true });
		home = new Home({ $$inline: true });
		projects = new Projects({ $$inline: true });
		bio = new Bio({ $$inline: true });
		skills = new Skills({ $$inline: true });
		about = new About({ $$inline: true });

		const block = {
			c: function create() {
				create_component(navigation.$$.fragment);
				t0 = space();
				main = element("main");
				create_component(home.$$.fragment);
				t1 = space();
				create_component(projects.$$.fragment);
				t2 = space();
				create_component(bio.$$.fragment);
				t3 = space();
				create_component(skills.$$.fragment);
				t4 = space();
				create_component(about.$$.fragment);
				add_location(main, file, 28, 0, 829);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				mount_component(navigation, target, anchor);
				insert_dev(target, t0, anchor);
				insert_dev(target, main, anchor);
				mount_component(home, main, null);
				append_dev(main, t1);
				mount_component(projects, main, null);
				append_dev(main, t2);
				mount_component(bio, main, null);
				append_dev(main, t3);
				mount_component(skills, main, null);
				append_dev(main, t4);
				mount_component(about, main, null);
				current = true;
			},
			p: noop,
			i: function intro(local) {
				if (current) return;
				transition_in(navigation.$$.fragment, local);
				transition_in(home.$$.fragment, local);
				transition_in(projects.$$.fragment, local);
				transition_in(bio.$$.fragment, local);
				transition_in(skills.$$.fragment, local);
				transition_in(about.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(navigation.$$.fragment, local);
				transition_out(home.$$.fragment, local);
				transition_out(projects.$$.fragment, local);
				transition_out(bio.$$.fragment, local);
				transition_out(skills.$$.fragment, local);
				transition_out(about.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t0);
					detach_dev(main);
				}

				destroy_component(navigation, detaching);
				destroy_component(home);
				destroy_component(projects);
				destroy_component(bio);
				destroy_component(skills);
				destroy_component(about);
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
			Projects,
			windowScrollStoppedStore,
			windowScrollValueStore,
			Bio,
			Skills,
			About,
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
