/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
function buildMap(){var a=[],b=[];for(var c in Config.emoji_data){for(var d=0;d<Config.emoji_data[c][0].length;d++)a.push(Config.escape_rx(":"+Config.emoji_data[c][3][0])+":"),b.push(Config.emoji_data[c][0][0]),Config.map[Config.emoji_data[c][3][0]]=Config.emoji_data[c][0][0],Config.mapcolon[":"+Config.emoji_data[c][3][0]+":"]=Config.emoji_data[c][0][0],Config.reversemap[Config.emoji_data[c][0][0]]=Config.emoji_data[c][3][0];Config.rx_colons=new RegExp("("+a.join("|")+")","g"),Config.rx_codes=new RegExp("("+b.join("|")+")","g")}}function cancelEvent(a){return a=a||window.event,a&&(a=a.originalEvent||a,a.stopPropagation&&a.stopPropagation(),a.preventDefault&&a.preventDefault()),!1}function getGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}!function(a){return"function"==typeof define&&define.amd?define(["jquery"],function(b){return a(b,window,document)}):"object"==typeof exports?module.exports=a(require("jquery"),window,document):a(jQuery,window,document)}(function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H;z={paneClass:"nano-pane",sliderClass:"nano-slider",contentClass:"nano-content",enabledClass:"has-scrollbar",flashedClass:"flashed",activeClass:"active",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null,documentContext:null,windowContext:null},u="scrollbar",t="scroll",l="mousedown",m="mouseenter",n="mousemove",p="mousewheel",o="mouseup",s="resize",h="drag",i="enter",w="up",r="panedown",f="DOMMouseScroll",g="down",x="wheel",j="keydown",k="keyup",v="touchmove",d="Microsoft Internet Explorer"===b.navigator.appName&&/msie 7./i.test(b.navigator.appVersion)&&b.ActiveXObject,e=null,D=b.requestAnimationFrame,y=b.cancelAnimationFrame,F=c.createElement("div").style,H=function(){var a,b,c,d,e,f;for(d=["t","webkitT","MozT","msT","OT"],a=e=0,f=d.length;f>e;a=++e)if(c=d[a],b=d[a]+"ransform",b in F)return d[a].substr(0,d[a].length-1);return!1}(),G=function(a){return H===!1?!1:""===H?a:H+a.charAt(0).toUpperCase()+a.substr(1)},E=G("transform"),B=E!==!1,A=function(){var a,b,d;return a=c.createElement("div"),b=a.style,b.position="absolute",b.width="100px",b.height="100px",b.overflow=t,b.top="-9999px",c.body.appendChild(a),d=a.offsetWidth-a.clientWidth,c.body.removeChild(a),d},C=function(){var a,c,d;return c=b.navigator.userAgent,(a=/(?=.+Mac OS X)(?=.+Firefox)/.test(c))?(d=/Firefox\/\d{2}\./.exec(c),d&&(d=d[0].replace(/\D+/g,"")),a&&+d>23):!1},q=function(){function j(d,f){this.el=d,this.options=f,e||(e=A()),this.$el=a(this.el),this.doc=a(this.options.documentContext||c),this.win=a(this.options.windowContext||b),this.body=this.doc.find("body"),this.$content=this.$el.children("."+this.options.contentClass),this.$content.attr("tabindex",this.options.tabIndex||0),this.content=this.$content[0],this.previousPosition=0,this.options.iOSNativeScrolling&&null!=this.el.style.WebkitOverflowScrolling?this.nativeScrolling():this.generate(),this.createEvents(),this.addEvents(),this.reset()}return j.prototype.preventScrolling=function(a,b){if(this.isActive)if(a.type===f)(b===g&&a.originalEvent.detail>0||b===w&&a.originalEvent.detail<0)&&a.preventDefault();else if(a.type===p){if(!a.originalEvent||!a.originalEvent.wheelDelta)return;(b===g&&a.originalEvent.wheelDelta<0||b===w&&a.originalEvent.wheelDelta>0)&&a.preventDefault()}},j.prototype.nativeScrolling=function(){this.$content.css({WebkitOverflowScrolling:"touch"}),this.iOSNativeScrolling=!0,this.isActive=!0},j.prototype.updateScrollValues=function(){var a,b;a=this.content,this.maxScrollTop=a.scrollHeight-a.clientHeight,this.prevScrollTop=this.contentScrollTop||0,this.contentScrollTop=a.scrollTop,b=this.contentScrollTop>this.previousPosition?"down":this.contentScrollTop<this.previousPosition?"up":"same",this.previousPosition=this.contentScrollTop,"same"!==b&&this.$el.trigger("update",{position:this.contentScrollTop,maximum:this.maxScrollTop,direction:b}),this.iOSNativeScrolling||(this.maxSliderTop=this.paneHeight-this.sliderHeight,this.sliderTop=0===this.maxScrollTop?0:this.contentScrollTop*this.maxSliderTop/this.maxScrollTop)},j.prototype.setOnScrollStyles=function(){var a;B?(a={},a[E]="translate(0, "+this.sliderTop+"px)"):a={top:this.sliderTop},D?(y&&this.scrollRAF&&y(this.scrollRAF),this.scrollRAF=D(function(b){return function(){return b.scrollRAF=null,b.slider.css(a)}}(this))):this.slider.css(a)},j.prototype.createEvents=function(){this.events={down:function(a){return function(b){return a.isBeingDragged=!0,a.offsetY=b.pageY-a.slider.offset().top,a.slider.is(b.target)||(a.offsetY=0),a.pane.addClass(a.options.activeClass),a.doc.bind(n,a.events[h]).bind(o,a.events[w]),a.body.bind(m,a.events[i]),!1}}(this),drag:function(a){return function(b){return a.sliderY=b.pageY-a.$el.offset().top-a.paneTop-(a.offsetY||.5*a.sliderHeight),a.scroll(),a.contentScrollTop>=a.maxScrollTop&&a.prevScrollTop!==a.maxScrollTop?a.$el.trigger("scrollend"):0===a.contentScrollTop&&0!==a.prevScrollTop&&a.$el.trigger("scrolltop"),!1}}(this),up:function(a){return function(b){return a.isBeingDragged=!1,a.pane.removeClass(a.options.activeClass),a.doc.unbind(n,a.events[h]).unbind(o,a.events[w]),a.body.unbind(m,a.events[i]),!1}}(this),resize:function(a){return function(b){a.reset()}}(this),panedown:function(a){return function(b){return a.sliderY=(b.offsetY||b.originalEvent.layerY)-.5*a.sliderHeight,a.scroll(),a.events.down(b),!1}}(this),scroll:function(a){return function(b){a.updateScrollValues(),a.isBeingDragged||(a.iOSNativeScrolling||(a.sliderY=a.sliderTop,a.setOnScrollStyles()),null!=b&&(a.contentScrollTop>=a.maxScrollTop?(a.options.preventPageScrolling&&a.preventScrolling(b,g),a.prevScrollTop!==a.maxScrollTop&&a.$el.trigger("scrollend")):0===a.contentScrollTop&&(a.options.preventPageScrolling&&a.preventScrolling(b,w),0!==a.prevScrollTop&&a.$el.trigger("scrolltop"))))}}(this),wheel:function(a){return function(b){var c;return null!=b?(c=b.delta||b.wheelDelta||b.originalEvent&&b.originalEvent.wheelDelta||-b.detail||b.originalEvent&&-b.originalEvent.detail,c&&(a.sliderY+=-c/3),a.scroll(),!1):void 0}}(this),enter:function(a){return function(b){var c;return a.isBeingDragged&&1!==(b.buttons||b.which)?(c=a.events)[w].apply(c,arguments):void 0}}(this)}},j.prototype.addEvents=function(){var a;this.removeEvents(),a=this.events,this.options.disableResize||this.win.bind(s,a[s]),this.iOSNativeScrolling||(this.slider.bind(l,a[g]),this.pane.bind(l,a[r]).bind(""+p+" "+f,a[x])),this.$content.bind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.removeEvents=function(){var a;a=this.events,this.win.unbind(s,a[s]),this.iOSNativeScrolling||(this.slider.unbind(),this.pane.unbind()),this.$content.unbind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.generate=function(){var a,c,d,f,g,h,i;return f=this.options,h=f.paneClass,i=f.sliderClass,a=f.contentClass,(g=this.$el.children("."+h)).length||g.children("."+i).length||this.$el.append('<div class="'+h+'"><div class="'+i+'" /></div>'),this.pane=this.$el.children("."+h),this.slider=this.pane.find("."+i),0===e&&C()?(d=b.getComputedStyle(this.content,null).getPropertyValue("padding-right").replace(/[^0-9.]+/g,""),c={right:-14,paddingRight:+d+14}):e&&(c={right:-e},this.$el.addClass(f.enabledClass)),null!=c&&this.$content.css(c),this},j.prototype.restore=function(){this.stopped=!1,this.iOSNativeScrolling||this.pane.show(),this.addEvents()},j.prototype.reset=function(){var a,b,c,f,g,h,i,j,k,l,m,n;return this.iOSNativeScrolling?void(this.contentHeight=this.content.scrollHeight):(this.$el.find("."+this.options.paneClass).length||this.generate().stop(),this.stopped&&this.restore(),a=this.content,f=a.style,g=f.overflowY,d&&this.$content.css({height:this.$content.height()}),b=a.scrollHeight+e,l=parseInt(this.$el.css("max-height"),10),l>0&&(this.$el.height(""),this.$el.height(a.scrollHeight>l?l:a.scrollHeight)),i=this.pane.outerHeight(!1),k=parseInt(this.pane.css("top"),10),h=parseInt(this.pane.css("bottom"),10),j=i+k+h,n=Math.round(j/b*i),n<this.options.sliderMinHeight?n=this.options.sliderMinHeight:null!=this.options.sliderMaxHeight&&n>this.options.sliderMaxHeight&&(n=this.options.sliderMaxHeight),g===t&&f.overflowX!==t&&(n+=e),this.maxSliderTop=j-n,this.contentHeight=b,this.paneHeight=i,this.paneOuterHeight=j,this.sliderHeight=n,this.paneTop=k,this.slider.height(n),this.events.scroll(),this.pane.show(),this.isActive=!0,a.scrollHeight===a.clientHeight||this.pane.outerHeight(!0)>=a.scrollHeight&&g!==t?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===a.scrollHeight&&g===t?this.slider.hide():this.slider.show(),this.pane.css({opacity:this.options.alwaysVisible?1:"",visibility:this.options.alwaysVisible?"visible":""}),c=this.$content.css("position"),("static"===c||"relative"===c)&&(m=parseInt(this.$content.css("right"),10),m&&this.$content.css({right:"",marginRight:m})),this)},j.prototype.scroll=function(){return this.isActive?(this.sliderY=Math.max(0,this.sliderY),this.sliderY=Math.min(this.maxSliderTop,this.sliderY),this.$content.scrollTop(this.maxScrollTop*this.sliderY/this.maxSliderTop),this.iOSNativeScrolling||(this.updateScrollValues(),this.setOnScrollStyles()),this):void 0},j.prototype.scrollBottom=function(a){return this.isActive?(this.$content.scrollTop(this.contentHeight-this.$content.height()-a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTop=function(a){return this.isActive?(this.$content.scrollTop(+a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTo=function(a){return this.isActive?(this.scrollTop(this.$el.find(a).get(0).offsetTop),this):void 0},j.prototype.stop=function(){return y&&this.scrollRAF&&(y(this.scrollRAF),this.scrollRAF=null),this.stopped=!0,this.removeEvents(),this.iOSNativeScrolling||this.pane.hide(),this},j.prototype.destroy=function(){return this.stopped||this.stop(),!this.iOSNativeScrolling&&this.pane.length&&this.pane.remove(),d&&this.$content.height(""),this.$content.removeAttr("tabindex"),this.$el.hasClass(this.options.enabledClass)&&(this.$el.removeClass(this.options.enabledClass),this.$content.css({right:""})),this},j.prototype.flash=function(){return!this.iOSNativeScrolling&&this.isActive?(this.reset(),this.pane.addClass(this.options.flashedClass),setTimeout(function(a){return function(){a.pane.removeClass(a.options.flashedClass)}}(this),this.options.flashDelay),this):void 0},j}(),a.fn.nanoScroller=function(b){return this.each(function(){var c,d;if((d=this.nanoscroller)||(c=a.extend({},z,b),this.nanoscroller=d=new q(this,c)),b&&"object"==typeof b){if(a.extend(d.options,b),null!=b.scrollBottom)return d.scrollBottom(b.scrollBottom);if(null!=b.scrollTop)return d.scrollTop(b.scrollTop);if(b.scrollTo)return d.scrollTo(b.scrollTo);if("bottom"===b.scroll)return d.scrollBottom(0);if("top"===b.scroll)return d.scrollTop(0);if(b.scroll&&b.scroll instanceof a)return d.scrollTo(b.scroll);if(b.stop)return d.stop();if(b.destroy)return d.destroy();if(b.flash)return d.flash()}return d.reset()})},a.fn.nanoScroller.Constructor=q}),!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b(require,exports,module):a.Tether=b()}(this,function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(a){var b=getComputedStyle(a),c=b.position;if("fixed"===c)return a;for(var d=a;d=d.parentNode;){var e=void 0;try{e=getComputedStyle(d)}catch(f){}if("undefined"==typeof e||null===e)return d;var g=e.overflow,h=e.overflowX,i=e.overflowY;if(/(auto|scroll)/.test(g+i+h)&&("absolute"!==c||["relative","absolute","fixed"].indexOf(e.position)>=0))return d}return document.body}function f(a){var b=void 0;a===document?(b=document,a=document.documentElement):b=a.ownerDocument;var c=b.documentElement,d={},e=a.getBoundingClientRect();for(var f in e)d[f]=e[f];var g=y(b);return d.top-=g.top,d.left-=g.left,"undefined"==typeof d.width&&(d.width=document.body.scrollWidth-d.left-d.right),"undefined"==typeof d.height&&(d.height=document.body.scrollHeight-d.top-d.bottom),d.top=d.top-c.clientTop,d.left=d.left-c.clientLeft,d.right=b.body.clientWidth-d.width-d.left,d.bottom=b.body.clientHeight-d.height-d.top,d}function g(a){return a.offsetParent||document.documentElement}function h(){var a=document.createElement("div");a.style.width="100%",a.style.height="200px";var b=document.createElement("div");i(b.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),b.appendChild(a),document.body.appendChild(b);var c=a.offsetWidth;b.style.overflow="scroll";var d=a.offsetWidth;c===d&&(d=b.clientWidth),document.body.removeChild(b);var e=c-d;return{width:e,height:e}}function i(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b=[];return Array.prototype.push.apply(b,arguments),b.slice(1).forEach(function(b){if(b)for(var c in b)({}).hasOwnProperty.call(b,c)&&(a[c]=b[c])}),a}function j(a,b){if("undefined"!=typeof a.classList)b.split(" ").forEach(function(b){b.trim()&&a.classList.remove(b)});else{var c=new RegExp("(^| )"+b.split(" ").join("|")+"( |$)","gi"),d=m(a).replace(c," ");n(a,d)}}function k(a,b){if("undefined"!=typeof a.classList)b.split(" ").forEach(function(b){b.trim()&&a.classList.add(b)});else{j(a,b);var c=m(a)+(" "+b);n(a,c)}}function l(a,b){if("undefined"!=typeof a.classList)return a.classList.contains(b);var c=m(a);return new RegExp("(^| )"+b+"( |$)","gi").test(c)}function m(a){return a.className instanceof SVGAnimatedString?a.className.baseVal:a.className}function n(a,b){a.setAttribute("class",b)}function o(a,b,c){c.forEach(function(c){-1===b.indexOf(c)&&l(a,c)&&j(a,c)}),b.forEach(function(b){l(a,b)||k(a,b)})}function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function p(a,b){var c=arguments.length<=2||void 0===arguments[2]?1:arguments[2];return a+c>=b&&b>=a-c}function q(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function r(){for(var a={top:0,left:0},b=arguments.length,c=Array(b),d=0;b>d;d++)c[d]=arguments[d];return c.forEach(function(b){var c=b.top,d=b.left;"string"==typeof c&&(c=parseFloat(c,10)),"string"==typeof d&&(d=parseFloat(d,10)),a.top+=c,a.left+=d}),a}function s(a,b){return"string"==typeof a.left&&-1!==a.left.indexOf("%")&&(a.left=parseFloat(a.left,10)/100*b.width),"string"==typeof a.top&&-1!==a.top.indexOf("%")&&(a.top=parseFloat(a.top,10)/100*b.height),a}function t(a,b){return"scrollParent"===b?b=a.scrollParent:"window"===b&&(b=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),b===document&&(b=b.documentElement),"undefined"!=typeof b.nodeType&&!function(){var a=f(b),c=a,d=getComputedStyle(b);b=[c.left,c.top,a.width+c.left,a.height+c.top],R.forEach(function(a,c){a=a[0].toUpperCase()+a.substr(1),"Top"===a||"Left"===a?b[c]+=parseFloat(d["border"+a+"Width"]):b[c]-=parseFloat(d["border"+a+"Width"])})}(),b}var u=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),v=void 0;"undefined"==typeof v&&(v={modules:[]});var w=function(){var a=0;return function(){return++a}}(),x={},y=function(a){var b=a._tetherZeroElement;"undefined"==typeof b&&(b=a.createElement("div"),b.setAttribute("data-tether-id",w()),i(b.style,{top:0,left:0,position:"absolute"}),a.body.appendChild(b),a._tetherZeroElement=b);var c=b.getAttribute("data-tether-id");if("undefined"==typeof x[c]){x[c]={};var d=b.getBoundingClientRect();for(var e in d)x[c][e]=d[e];A(function(){delete x[c]})}return x[c]},z=[],A=function(a){z.push(a)},B=function(){for(var a=void 0;a=z.pop();)a()},C=function(){function a(){d(this,a)}return u(a,[{key:"on",value:function(a,b,c){var d=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[a]&&(this.bindings[a]=[]),this.bindings[a].push({handler:b,ctx:c,once:d})}},{key:"once",value:function(a,b,c){this.on(a,b,c,!0)}},{key:"off",value:function(a,b){if("undefined"==typeof this.bindings||"undefined"==typeof this.bindings[a])if("undefined"==typeof b)delete this.bindings[a];else for(var c=0;c<this.bindings[a].length;)this.bindings[a][c].handler===b?this.bindings[a].splice(c,1):++c}},{key:"trigger",value:function(a){if("undefined"!=typeof this.bindings&&this.bindings[a])for(var b=0;b<this.bindings[a].length;){var c=this.bindings[a][b],d=c.handler,e=c.ctx,f=c.once,g=e;"undefined"==typeof g&&(g=this);for(var h=arguments.length,i=Array(h>1?h-1:0),j=1;h>j;j++)i[j-1]=arguments[j];d.apply(g,i),f?this.bindings[a].splice(b,1):++b}}}]),a}();v.Utils={getScrollParent:e,getBounds:f,getOffsetParent:g,extend:i,addClass:k,removeClass:j,hasClass:l,updateClasses:o,defer:A,flush:B,uniqueId:w,Evented:C,getScrollBarSize:h};var D=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();if("undefined"==typeof v)throw new Error("You must include the utils.js file before tether.js");var E=v.Utils,e=E.getScrollParent,f=E.getBounds,g=E.getOffsetParent,i=E.extend,k=E.addClass,j=E.removeClass,o=E.updateClasses,A=E.defer,B=E.flush,h=E.getScrollBarSize,F=function(){for(var a=document.createElement("div"),b=["transform","webkitTransform","OTransform","MozTransform","msTransform"],c=0;c<b.length;++c){var d=b[c];if(void 0!==a.style[d])return d}}(),G=[],H=function(){G.forEach(function(a){a.position(!1)}),B()};!function(){var a=null,b=null,c=null,d=function e(){return"undefined"!=typeof b&&b>16?(b=Math.min(b-16,250),void(c=setTimeout(e,250))):void("undefined"!=typeof a&&q()-a<10||("undefined"!=typeof c&&(clearTimeout(c),c=null),a=q(),H(),b=q()-a))};["resize","scroll","touchmove"].forEach(function(a){window.addEventListener(a,d)})}();var I={center:"center",left:"right",right:"left"},J={middle:"middle",top:"bottom",bottom:"top"},K={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},L=function(a,b){var c=a.left,d=a.top;return"auto"===c&&(c=I[b.left]),"auto"===d&&(d=J[b.top]),{left:c,top:d}},M=function(a){var b=a.left,c=a.top;return"undefined"!=typeof K[a.left]&&(b=K[a.left]),"undefined"!=typeof K[a.top]&&(c=K[a.top]),{left:b,top:c}},N=function(a){var b=a.split(" "),c=D(b,2),d=c[0],e=c[1];return{top:d,left:e}},O=N,P=function(){function a(b){var c=this;d(this,a),this.position=this.position.bind(this),G.push(this),this.history=[],this.setOptions(b,!1),v.modules.forEach(function(a){"undefined"!=typeof a.initialize&&a.initialize.call(c)}),this.position()}return u(a,[{key:"getClass",value:function(){var a=arguments.length<=0||void 0===arguments[0]?"":arguments[0],b=this.options.classes;return"undefined"!=typeof b&&b[a]?this.options.classes[a]:this.options.classPrefix?this.options.classPrefix+"-"+a:a}},{key:"setOptions",value:function(a){var b=this,c=arguments.length<=1||void 0===arguments[1]?!0:arguments[1],d={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=i(d,a);var f=this.options,g=f.element,h=f.target,j=f.targetModifier;if(this.element=g,this.target=h,this.targetModifier=j,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(a){if("undefined"==typeof b[a])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof b[a].jquery?b[a]=b[a][0]:"string"==typeof b[a]&&(b[a]=document.querySelector(b[a]))}),k(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&k(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=O(this.options.targetAttachment),this.attachment=O(this.options.attachment),this.offset=N(this.options.offset),this.targetOffset=N(this.options.targetOffset),"undefined"!=typeof this.scrollParent&&this.disable(),this.scrollParent="scroll-handle"===this.targetModifier?this.target:e(this.target),this.options.enabled!==!1&&this.enable(c)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return f(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var a=f(this.target),b={height:a.height,width:a.width,top:a.top,left:a.left};return b.height=Math.min(b.height,a.height-(pageYOffset-a.top)),b.height=Math.min(b.height,a.height-(a.top+a.height-(pageYOffset+innerHeight))),b.height=Math.min(innerHeight,b.height),b.height-=2,b.width=Math.min(b.width,a.width-(pageXOffset-a.left)),b.width=Math.min(b.width,a.width-(a.left+a.width-(pageXOffset+innerWidth))),b.width=Math.min(innerWidth,b.width),b.width-=2,b.top<pageYOffset&&(b.top=pageYOffset),b.left<pageXOffset&&(b.left=pageXOffset),b}if("scroll-handle"===this.targetModifier){var a=void 0,c=this.target;c===document.body?(c=document.documentElement,a={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):a=f(c);var d=getComputedStyle(c),e=c.scrollWidth>c.clientWidth||[d.overflow,d.overflowX].indexOf("scroll")>=0||this.target!==document.body,g=0;e&&(g=15);var h=a.height-parseFloat(d.borderTopWidth)-parseFloat(d.borderBottomWidth)-g,b={width:15,height:.975*h*(h/c.scrollHeight),left:a.left+a.width-parseFloat(d.borderLeftWidth)-15},i=0;408>h&&this.target===document.body&&(i=-11e-5*Math.pow(h,2)-.00727*h+22.58),this.target!==document.body&&(b.height=Math.max(b.height,24));var j=this.target.scrollTop/(c.scrollHeight-h);return b.top=j*(h-b.height-i)+a.top+parseFloat(d.borderTopWidth),this.target===document.body&&(b.height=Math.max(b.height,24)),b}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(a,b){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[a]&&(this._cache[a]=b.call(this)),this._cache[a]}},{key:"enable",value:function(){var a=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this.options.addTargetClasses!==!1&&k(this.target,this.getClass("enabled")),k(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParent!==document&&this.scrollParent.addEventListener("scroll",this.position),a&&this.position()}},{key:"disable",value:function(){j(this.target,this.getClass("enabled")),j(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParent&&this.scrollParent.removeEventListener("scroll",this.position)}},{key:"destroy",value:function(){var a=this;this.disable(),G.forEach(function(b,c){return b===a?void G.splice(c,1):void 0})}},{key:"updateAttachClasses",value:function(a,b){var c=this;a=a||this.attachment,b=b||this.targetAttachment;var d=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var e=this._addAttachClasses;a.top&&e.push(this.getClass("element-attached")+"-"+a.top),a.left&&e.push(this.getClass("element-attached")+"-"+a.left),b.top&&e.push(this.getClass("target-attached")+"-"+b.top),b.left&&e.push(this.getClass("target-attached")+"-"+b.left);var f=[];d.forEach(function(a){f.push(c.getClass("element-attached")+"-"+a),f.push(c.getClass("target-attached")+"-"+a)}),A(function(){"undefined"!=typeof c._addAttachClasses&&(o(c.element,c._addAttachClasses,f),c.options.addTargetClasses!==!1&&o(c.target,c._addAttachClasses,f),delete c._addAttachClasses)})}},{key:"position",value:function(){var a=this,b=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];if(this.enabled){this.clearCache();var c=L(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,c);var d=this.cache("element-bounds",function(){return f(a.element)}),e=d.width,i=d.height;if(0===e&&0===i&&"undefined"!=typeof this.lastSize){var j=this.lastSize;e=j.width,i=j.height}else this.lastSize={width:e,height:i};var k=this.cache("target-bounds",function(){return a.getTargetBounds()}),l=k,m=s(M(this.attachment),{width:e,height:i}),n=s(M(c),l),o=s(this.offset,{width:e,height:i}),p=s(this.targetOffset,l);m=r(m,o),n=r(n,p);for(var q=k.left+n.left-m.left,t=k.top+n.top-m.top,u=0;u<v.modules.length;++u){var w=v.modules[u],x=w.position.call(this,{left:q,top:t,targetAttachment:c,targetPos:k,elementPos:d,offset:m,targetOffset:n,manualOffset:o,manualTargetOffset:p,scrollbarSize:z,attachment:this.attachment});if(x===!1)return!1;"undefined"!=typeof x&&"object"==typeof x&&(t=x.top,q=x.left)}var y={page:{top:t,left:q},viewport:{top:t-pageYOffset,bottom:pageYOffset-t-i+innerHeight,left:q-pageXOffset,right:pageXOffset-q-e+innerWidth}},z=void 0;return document.body.scrollWidth>window.innerWidth&&(z=this.cache("scrollbar-size",h),y.viewport.bottom-=z.height),document.body.scrollHeight>window.innerHeight&&(z=this.cache("scrollbar-size",h),y.viewport.right-=z.width),(-1===["","static"].indexOf(document.body.style.position)||-1===["","static"].indexOf(document.body.parentElement.style.position))&&(y.page.bottom=document.body.scrollHeight-t-i,y.page.right=document.body.scrollWidth-q-e),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var b=a.cache("target-offsetparent",function(){return g(a.target)}),c=a.cache("target-offsetparent-bounds",function(){return f(b)}),d=getComputedStyle(b),e=c,h={};if(["Top","Left","Bottom","Right"].forEach(function(a){h[a.toLowerCase()]=parseFloat(d["border"+a+"Width"])}),c.right=document.body.scrollWidth-c.left-e.width+h.right,c.bottom=document.body.scrollHeight-c.top-e.height+h.bottom,y.page.top>=c.top+h.top&&y.page.bottom>=c.bottom&&y.page.left>=c.left+h.left&&y.page.right>=c.right){var i=b.scrollTop,j=b.scrollLeft;y.offset={top:y.page.top-c.top+i-h.top,left:y.page.left-c.left+j-h.left}}}(),this.move(y),this.history.unshift(y),this.history.length>3&&this.history.pop(),b&&B(),!0}}},{key:"move",value:function(a){var b=this;if("undefined"!=typeof this.element.parentNode){var c={};for(var d in a){c[d]={};for(var e in a[d]){for(var f=!1,h=0;h<this.history.length;++h){var j=this.history[h];if("undefined"!=typeof j[d]&&!p(j[d][e],a[d][e])){f=!0;break}}f||(c[d][e]=!0)}}var k={top:"",left:"",right:"",bottom:""},l=function(a,c){var d="undefined"!=typeof b.options.optimizations,e=d?b.options.optimizations.gpu:null;if(e!==!1){var f=void 0,g=void 0;a.top?(k.top=0,f=c.top):(k.bottom=0,f=-c.bottom),a.left?(k.left=0,g=c.left):(k.right=0,g=-c.right),k[F]="translateX("+Math.round(g)+"px) translateY("+Math.round(f)+"px)","msTransform"!==F&&(k[F]+=" translateZ(0)")}else a.top?k.top=c.top+"px":k.bottom=c.bottom+"px",a.left?k.left=c.left+"px":k.right=c.right+"px"},m=!1;if((c.page.top||c.page.bottom)&&(c.page.left||c.page.right)?(k.position="absolute",l(c.page,a.page)):(c.viewport.top||c.viewport.bottom)&&(c.viewport.left||c.viewport.right)?(k.position="fixed",l(c.viewport,a.viewport)):"undefined"!=typeof c.offset&&c.offset.top&&c.offset.left?!function(){k.position="absolute";var d=b.cache("target-offsetparent",function(){return g(b.target)});g(b.element)!==d&&A(function(){b.element.parentNode.removeChild(b.element),d.appendChild(b.element)}),l(c.offset,a.offset),m=!0}():(k.position="absolute",l({top:!0,left:!0},a.page)),!m){for(var n=!0,o=this.element.parentNode;o&&"BODY"!==o.tagName;){if("static"!==getComputedStyle(o).position){n=!1;break}o=o.parentNode}n||(this.element.parentNode.removeChild(this.element),document.body.appendChild(this.element))}var q={},r=!1;for(var e in k){var s=k[e],t=this.element.style[e];""!==t&&""!==s&&["top","left","bottom","right"].indexOf(e)>=0&&(t=parseFloat(t),s=parseFloat(s)),t!==s&&(r=!0,q[e]=s)}r&&A(function(){i(b.element.style,q)})}}}]),a}();P.modules=[],v.position=H;var Q=i(P,v),D=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),E=v.Utils,f=E.getBounds,i=E.extend,o=E.updateClasses,A=E.defer,R=["left","top","right","bottom"];v.modules.push({position:function(a){var b=this,c=a.top,d=a.left,e=a.targetAttachment;if(!this.options.constraints)return!0;var g=this.cache("element-bounds",function(){return f(b.element)}),h=g.height,j=g.width;if(0===j&&0===h&&"undefined"!=typeof this.lastSize){var k=this.lastSize;j=k.width,h=k.height}var l=this.cache("target-bounds",function(){return b.getTargetBounds()}),m=l.height,n=l.width,p=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(a){var b=a.outOfBoundsClass,c=a.pinnedClass;b&&p.push(b),c&&p.push(c)}),p.forEach(function(a){["left","top","right","bottom"].forEach(function(b){p.push(a+"-"+b)})});var q=[],r=i({},e),s=i({},this.attachment);return this.options.constraints.forEach(function(a){var f=a.to,g=a.attachment,i=a.pin;"undefined"==typeof g&&(g="");var k=void 0,l=void 0;if(g.indexOf(" ")>=0){var o=g.split(" "),p=D(o,2);l=p[0],k=p[1]}else k=l=g;var u=t(b,f);("target"===l||"both"===l)&&(c<u[1]&&"top"===r.top&&(c+=m,r.top="bottom"),c+h>u[3]&&"bottom"===r.top&&(c-=m,r.top="top")),"together"===l&&(c<u[1]&&"top"===r.top&&("bottom"===s.top?(c+=m,r.top="bottom",c+=h,s.top="top"):"top"===s.top&&(c+=m,r.top="bottom",c-=h,s.top="bottom")),c+h>u[3]&&"bottom"===r.top&&("top"===s.top?(c-=m,r.top="top",c-=h,s.top="bottom"):"bottom"===s.top&&(c-=m,r.top="top",c+=h,s.top="top")),"middle"===r.top&&(c+h>u[3]&&"top"===s.top?(c-=h,s.top="bottom"):c<u[1]&&"bottom"===s.top&&(c+=h,s.top="top"))),("target"===k||"both"===k)&&(d<u[0]&&"left"===r.left&&(d+=n,r.left="right"),d+j>u[2]&&"right"===r.left&&(d-=n,r.left="left")),"together"===k&&(d<u[0]&&"left"===r.left?"right"===s.left?(d+=n,r.left="right",d+=j,s.left="left"):"left"===s.left&&(d+=n,r.left="right",d-=j,s.left="right"):d+j>u[2]&&"right"===r.left?"left"===s.left?(d-=n,r.left="left",d-=j,s.left="right"):"right"===s.left&&(d-=n,r.left="left",d+=j,s.left="left"):"center"===r.left&&(d+j>u[2]&&"left"===s.left?(d-=j,s.left="right"):d<u[0]&&"right"===s.left&&(d+=j,s.left="left"))),("element"===l||"both"===l)&&(c<u[1]&&"bottom"===s.top&&(c+=h,s.top="top"),c+h>u[3]&&"top"===s.top&&(c-=h,s.top="bottom")),("element"===k||"both"===k)&&(d<u[0]&&"right"===s.left&&(d+=j,s.left="left"),d+j>u[2]&&"left"===s.left&&(d-=j,s.left="right")),"string"==typeof i?i=i.split(",").map(function(a){return a.trim()}):i===!0&&(i=["top","left","right","bottom"]),i=i||[];var v=[],w=[];c<u[1]&&(i.indexOf("top")>=0?(c=u[1],v.push("top")):w.push("top")),c+h>u[3]&&(i.indexOf("bottom")>=0?(c=u[3]-h,v.push("bottom")):w.push("bottom")),d<u[0]&&(i.indexOf("left")>=0?(d=u[0],v.push("left")):w.push("left")),d+j>u[2]&&(i.indexOf("right")>=0?(d=u[2]-j,v.push("right")):w.push("right")),v.length&&!function(){var a=void 0;a="undefined"!=typeof b.options.pinnedClass?b.options.pinnedClass:b.getClass("pinned"),
q.push(a),v.forEach(function(b){q.push(a+"-"+b)})}(),w.length&&!function(){var a=void 0;a="undefined"!=typeof b.options.outOfBoundsClass?b.options.outOfBoundsClass:b.getClass("out-of-bounds"),q.push(a),w.forEach(function(b){q.push(a+"-"+b)})}(),(v.indexOf("left")>=0||v.indexOf("right")>=0)&&(s.left=r.left=!1),(v.indexOf("top")>=0||v.indexOf("bottom")>=0)&&(s.top=r.top=!1),(r.top!==e.top||r.left!==e.left||s.top!==b.attachment.top||s.left!==b.attachment.left)&&b.updateAttachClasses(s,r)}),A(function(){b.options.addTargetClasses!==!1&&o(b.target,q,p),o(b.element,q,p)}),{top:c,left:d}}});var E=v.Utils,f=E.getBounds,o=E.updateClasses,A=E.defer;v.modules.push({position:function(a){var b=this,c=a.top,d=a.left,e=this.cache("element-bounds",function(){return f(b.element)}),g=e.height,h=e.width,i=this.getTargetBounds(),j=c+g,k=d+h,l=[];c<=i.bottom&&j>=i.top&&["left","right"].forEach(function(a){var b=i[a];(b===d||b===k)&&l.push(a)}),d<=i.right&&k>=i.left&&["top","bottom"].forEach(function(a){var b=i[a];(b===c||b===j)&&l.push(a)});var m=[],n=[],p=["left","top","right","bottom"];return m.push(this.getClass("abutted")),p.forEach(function(a){m.push(b.getClass("abutted")+"-"+a)}),l.length&&n.push(this.getClass("abutted")),l.forEach(function(a){n.push(b.getClass("abutted")+"-"+a)}),A(function(){b.options.addTargetClasses!==!1&&o(b.target,n,m),o(b.element,n,m)}),!0}});var D=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();return v.modules.push({position:function(a){var b=a.top,c=a.left;if(this.options.shift){var d=this.options.shift;"function"==typeof this.options.shift&&(d=this.options.shift.call(this,{top:b,left:c}));var e=void 0,f=void 0;if("string"==typeof d){d=d.split(" "),d[1]=d[1]||d[0];var g=D(d,2);e=g[0],f=g[1],e=parseFloat(e,10),f=parseFloat(f,10)}else e=d.top,f=d.left;return b+=e,c+=f,{top:b,left:c}}}}),Q});var Config={};Config.Emoji={"00a9":["\xa9",["copyright"]],"00ae":["\xae",["registered"]],"203c":["\u203c",["bangbang"]],2049:["\u2049",["interrobang"]],2122:["\u2122",["tm"]],2139:["\u2139",["information_source"]],2194:["\u2194",["left_right_arrow"]],2195:["\u2195",["arrow_up_down"]],2196:["\u2196",["arrow_upper_left"]],2197:["\u2197",["arrow_upper_right"]],2198:["\u2198",["arrow_lower_right"]],2199:["\u2199",["arrow_lower_left"]],"21a9":["\u21a9",["leftwards_arrow_with_hook"]],"21aa":["\u21aa",["arrow_right_hook"]],"231a":["\u231a",["watch"]],"231b":["\u231b",["hourglass"]],"23e9":["\u23e9",["fast_forward"]],"23ea":["\u23ea",["rewind"]],"23eb":["\u23eb",["arrow_double_up"]],"23ec":["\u23ec",["arrow_double_down"]],"23f0":["\u23f0",["alarm_clock"]],"23f3":["\u23f3",["hourglass_flowing_sand"]],"24c2":["\u24c2",["m"]],"25aa":["\u25aa",["black_small_square"]],"25ab":["\u25ab",["white_small_square"]],"25b6":["\u25b6",["arrow_forward"]],"25c0":["\u25c0",["arrow_backward"]],"25fb":["\u25fb",["white_medium_square"]],"25fc":["\u25fc",["black_medium_square"]],"25fd":["\u25fd",["white_medium_small_square"]],"25fe":["\u25fe",["black_medium_small_square"]],2600:["\u2600",["sunny"]],2601:["\u2601",["cloud"]],"260e":["\u260e",["phone","telephone"]],2611:["\u2611",["ballot_box_with_check"]],2614:["\u2614",["umbrella"]],2615:["\u2615",["coffee"]],"261d":["\u261d",["point_up"]],"263a":["\u263a",["relaxed"]],2648:["\u2648",["aries"]],2649:["\u2649",["taurus"]],"264a":["\u264a",["gemini"]],"264b":["\u264b",["cancer"]],"264c":["\u264c",["leo"]],"264d":["\u264d",["virgo"]],"264e":["\u264e",["libra"]],"264f":["\u264f",["scorpius"]],2650:["\u2650",["sagittarius"]],2651:["\u2651",["capricorn"]],2652:["\u2652",["aquarius"]],2653:["\u2653",["pisces"]],2660:["\u2660",["spades"]],2663:["\u2663",["clubs"]],2665:["\u2665",["hearts"]],2666:["\u2666",["diamonds"]],2668:["\u2668",["hotsprings"]],"267b":["\u267b",["recycle"]],"267f":["\u267f",["wheelchair"]],2693:["\u2693",["anchor"]],"26a0":["\u26a0",["warning"]],"26a1":["\u26a1",["zap"]],"26aa":["\u26aa",["white_circle"]],"26ab":["\u26ab",["black_circle"]],"26bd":["\u26bd",["soccer"]],"26be":["\u26be",["baseball"]],"26c4":["\u26c4",["snowman"]],"26c5":["\u26c5",["partly_sunny"]],"26ce":["\u26ce",["ophiuchus"]],"26d4":["\u26d4",["no_entry"]],"26ea":["\u26ea",["church"]],"26f2":["\u26f2",["fountain"]],"26f3":["\u26f3",["golf"]],"26f5":["\u26f5",["boat","sailboat"]],"26fa":["\u26fa",["tent"]],"26fd":["\u26fd",["fuelpump"]],2702:["\u2702",["scissors"]],2705:["\u2705",["white_check_mark"]],2708:["\u2708",["airplane"]],2709:["\u2709",["email","envelope"]],"270a":["\u270a",["fist"]],"270b":["\u270b",["hand","raised_hand"]],"270c":["\u270c",["v"]],"270f":["\u270f",["pencil2"]],2712:["\u2712",["black_nib"]],2714:["\u2714",["heavy_check_mark"]],2716:["\u2716",["heavy_multiplication_x"]],2728:["\u2728",["sparkles"]],2733:["\u2733",["eight_spoked_asterisk"]],2734:["\u2734",["eight_pointed_black_star"]],2744:["\u2744",["snowflake"]],2747:["\u2747",["sparkle"]],"274c":["\u274c",["x"]],"274e":["\u274e",["negative_squared_cross_mark"]],2753:["\u2753",["question"]],2754:["\u2754",["grey_question"]],2755:["\u2755",["grey_exclamation"]],2757:["\u2757",["exclamation","heavy_exclamation_mark"]],2764:["\u2764",["heart"],"<3"],2795:["\u2795",["heavy_plus_sign"]],2796:["\u2796",["heavy_minus_sign"]],2797:["\u2797",["heavy_division_sign"]],"27a1":["\u27a1",["arrow_right"]],"27b0":["\u27b0",["curly_loop"]],"27bf":["\u27bf",["loop"]],2934:["\u2934",["arrow_heading_up"]],2935:["\u2935",["arrow_heading_down"]],"2b05":["\u2b05",["arrow_left"]],"2b06":["\u2b06",["arrow_up"]],"2b07":["\u2b07",["arrow_down"]],"2b1b":["\u2b1b",["black_large_square"]],"2b1c":["\u2b1c",["white_large_square"]],"2b50":["\u2b50",["star"]],"2b55":["\u2b55",["o"]],3030:["\u3030",["wavy_dash"]],"303d":["\u303d",["part_alternation_mark"]],3297:["\u3297",["congratulations"]],3299:["\u3299",["secret"]],"1f004":["\ud83c\udc04",["mahjong"]],"1f0cf":["\ud83c\udccf",["black_joker"]],"1f170":["\ud83c\udd70",["a"]],"1f171":["\ud83c\udd71",["b"]],"1f17e":["\ud83c\udd7e",["o2"]],"1f17f":["\ud83c\udd7f",["parking"]],"1f18e":["\ud83c\udd8e",["ab"]],"1f191":["\ud83c\udd91",["cl"]],"1f192":["\ud83c\udd92",["cool"]],"1f193":["\ud83c\udd93",["free"]],"1f194":["\ud83c\udd94",["id"]],"1f195":["\ud83c\udd95",["new"]],"1f196":["\ud83c\udd96",["ng"]],"1f197":["\ud83c\udd97",["ok"]],"1f198":["\ud83c\udd98",["sos"]],"1f199":["\ud83c\udd99",["up"]],"1f19a":["\ud83c\udd9a",["vs"]],"1f201":["\ud83c\ude01",["koko"]],"1f202":["\ud83c\ude02",["sa"]],"1f21a":["\ud83c\ude1a",["u7121"]],"1f22f":["\ud83c\ude2f",["u6307"]],"1f232":["\ud83c\ude32",["u7981"]],"1f233":["\ud83c\ude33",["u7a7a"]],"1f234":["\ud83c\ude34",["u5408"]],"1f235":["\ud83c\ude35",["u6e80"]],"1f236":["\ud83c\ude36",["u6709"]],"1f237":["\ud83c\ude37",["u6708"]],"1f238":["\ud83c\ude38",["u7533"]],"1f239":["\ud83c\ude39",["u5272"]],"1f23a":["\ud83c\ude3a",["u55b6"]],"1f250":["\ud83c\ude50",["ideograph_advantage"]],"1f251":["\ud83c\ude51",["accept"]],"1f300":["\ud83c\udf00",["cyclone"]],"1f301":["\ud83c\udf01",["foggy"]],"1f302":["\ud83c\udf02",["closed_umbrella"]],"1f303":["\ud83c\udf03",["night_with_stars"]],"1f304":["\ud83c\udf04",["sunrise_over_mountains"]],"1f305":["\ud83c\udf05",["sunrise"]],"1f306":["\ud83c\udf06",["city_sunset"]],"1f307":["\ud83c\udf07",["city_sunrise"]],"1f308":["\ud83c\udf08",["rainbow"]],"1f309":["\ud83c\udf09",["bridge_at_night"]],"1f30a":["\ud83c\udf0a",["ocean"]],"1f30b":["\ud83c\udf0b",["volcano"]],"1f30c":["\ud83c\udf0c",["milky_way"]],"1f30d":["\ud83c\udf0d",["earth_africa"]],"1f30e":["\ud83c\udf0e",["earth_americas"]],"1f30f":["\ud83c\udf0f",["earth_asia"]],"1f310":["\ud83c\udf10",["globe_with_meridians"]],"1f311":["\ud83c\udf11",["new_moon"]],"1f312":["\ud83c\udf12",["waxing_crescent_moon"]],"1f313":["\ud83c\udf13",["first_quarter_moon"]],"1f314":["\ud83c\udf14",["moon","waxing_gibbous_moon"]],"1f315":["\ud83c\udf15",["full_moon"]],"1f316":["\ud83c\udf16",["waning_gibbous_moon"]],"1f317":["\ud83c\udf17",["last_quarter_moon"]],"1f318":["\ud83c\udf18",["waning_crescent_moon"]],"1f319":["\ud83c\udf19",["crescent_moon"]],"1f320":["\ud83c\udf20",["stars"]],"1f31a":["\ud83c\udf1a",["new_moon_with_face"]],"1f31b":["\ud83c\udf1b",["first_quarter_moon_with_face"]],"1f31c":["\ud83c\udf1c",["last_quarter_moon_with_face"]],"1f31d":["\ud83c\udf1d",["full_moon_with_face"]],"1f31e":["\ud83c\udf1e",["sun_with_face"]],"1f31f":["\ud83c\udf1f",["star2"]],"1f330":["\ud83c\udf30",["chestnut"]],"1f331":["\ud83c\udf31",["seedling"]],"1f332":["\ud83c\udf32",["evergreen_tree"]],"1f333":["\ud83c\udf33",["deciduous_tree"]],"1f334":["\ud83c\udf34",["palm_tree"]],"1f335":["\ud83c\udf35",["cactus"]],"1f337":["\ud83c\udf37",["tulip"]],"1f338":["\ud83c\udf38",["cherry_blossom"]],"1f339":["\ud83c\udf39",["rose"]],"1f33a":["\ud83c\udf3a",["hibiscus"]],"1f33b":["\ud83c\udf3b",["sunflower"]],"1f33c":["\ud83c\udf3c",["blossom"]],"1f33d":["\ud83c\udf3d",["corn"]],"1f33e":["\ud83c\udf3e",["ear_of_rice"]],"1f33f":["\ud83c\udf3f",["herb"]],"1f340":["\ud83c\udf40",["four_leaf_clover"]],"1f341":["\ud83c\udf41",["maple_leaf"]],"1f342":["\ud83c\udf42",["fallen_leaf"]],"1f343":["\ud83c\udf43",["leaves"]],"1f344":["\ud83c\udf44",["mushroom"]],"1f345":["\ud83c\udf45",["tomato"]],"1f346":["\ud83c\udf46",["eggplant"]],"1f347":["\ud83c\udf47",["grapes"]],"1f348":["\ud83c\udf48",["melon"]],"1f349":["\ud83c\udf49",["watermelon"]],"1f34a":["\ud83c\udf4a",["tangerine"]],"1f34b":["\ud83c\udf4b",["lemon"]],"1f34c":["\ud83c\udf4c",["banana"]],"1f34d":["\ud83c\udf4d",["pineapple"]],"1f34e":["\ud83c\udf4e",["apple"]],"1f34f":["\ud83c\udf4f",["green_apple"]],"1f350":["\ud83c\udf50",["pear"]],"1f351":["\ud83c\udf51",["peach"]],"1f352":["\ud83c\udf52",["cherries"]],"1f353":["\ud83c\udf53",["strawberry"]],"1f354":["\ud83c\udf54",["hamburger"]],"1f355":["\ud83c\udf55",["pizza"]],"1f356":["\ud83c\udf56",["meat_on_bone"]],"1f357":["\ud83c\udf57",["poultry_leg"]],"1f358":["\ud83c\udf58",["rice_cracker"]],"1f359":["\ud83c\udf59",["rice_ball"]],"1f35a":["\ud83c\udf5a",["rice"]],"1f35b":["\ud83c\udf5b",["curry"]],"1f35c":["\ud83c\udf5c",["ramen"]],"1f35d":["\ud83c\udf5d",["spaghetti"]],"1f35e":["\ud83c\udf5e",["bread"]],"1f35f":["\ud83c\udf5f",["fries"]],"1f360":["\ud83c\udf60",["sweet_potato"]],"1f361":["\ud83c\udf61",["dango"]],"1f362":["\ud83c\udf62",["oden"]],"1f363":["\ud83c\udf63",["sushi"]],"1f364":["\ud83c\udf64",["fried_shrimp"]],"1f365":["\ud83c\udf65",["fish_cake"]],"1f366":["\ud83c\udf66",["icecream"]],"1f367":["\ud83c\udf67",["shaved_ice"]],"1f368":["\ud83c\udf68",["ice_cream"]],"1f369":["\ud83c\udf69",["doughnut"]],"1f36a":["\ud83c\udf6a",["cookie"]],"1f36b":["\ud83c\udf6b",["chocolate_bar"]],"1f36c":["\ud83c\udf6c",["candy"]],"1f36d":["\ud83c\udf6d",["lollipop"]],"1f36e":["\ud83c\udf6e",["custard"]],"1f36f":["\ud83c\udf6f",["honey_pot"]],"1f370":["\ud83c\udf70",["cake"]],"1f371":["\ud83c\udf71",["bento"]],"1f372":["\ud83c\udf72",["stew"]],"1f373":["\ud83c\udf73",["egg"]],"1f374":["\ud83c\udf74",["fork_and_knife"]],"1f375":["\ud83c\udf75",["tea"]],"1f376":["\ud83c\udf76",["sake"]],"1f377":["\ud83c\udf77",["wine_glass"]],"1f378":["\ud83c\udf78",["cocktail"]],"1f379":["\ud83c\udf79",["tropical_drink"]],"1f37a":["\ud83c\udf7a",["beer"]],"1f37b":["\ud83c\udf7b",["beers"]],"1f37c":["\ud83c\udf7c",["baby_bottle"]],"1f380":["\ud83c\udf80",["ribbon"]],"1f381":["\ud83c\udf81",["gift"]],"1f382":["\ud83c\udf82",["birthday"]],"1f383":["\ud83c\udf83",["jack_o_lantern"]],"1f384":["\ud83c\udf84",["christmas_tree"]],"1f385":["\ud83c\udf85",["santa"]],"1f386":["\ud83c\udf86",["fireworks"]],"1f387":["\ud83c\udf87",["sparkler"]],"1f388":["\ud83c\udf88",["balloon"]],"1f389":["\ud83c\udf89",["tada"]],"1f38a":["\ud83c\udf8a",["confetti_ball"]],"1f38b":["\ud83c\udf8b",["tanabata_tree"]],"1f38c":["\ud83c\udf8c",["crossed_flags"]],"1f38d":["\ud83c\udf8d",["bamboo"]],"1f38e":["\ud83c\udf8e",["dolls"]],"1f38f":["\ud83c\udf8f",["flags"]],"1f390":["\ud83c\udf90",["wind_chime"]],"1f391":["\ud83c\udf91",["rice_scene"]],"1f392":["\ud83c\udf92",["school_satchel"]],"1f393":["\ud83c\udf93",["mortar_board"]],"1f3a0":["\ud83c\udfa0",["carousel_horse"]],"1f3a1":["\ud83c\udfa1",["ferris_wheel"]],"1f3a2":["\ud83c\udfa2",["roller_coaster"]],"1f3a3":["\ud83c\udfa3",["fishing_pole_and_fish"]],"1f3a4":["\ud83c\udfa4",["microphone"]],"1f3a5":["\ud83c\udfa5",["movie_camera"]],"1f3a6":["\ud83c\udfa6",["cinema"]],"1f3a7":["\ud83c\udfa7",["headphones"]],"1f3a8":["\ud83c\udfa8",["art"]],"1f3a9":["\ud83c\udfa9",["tophat"]],"1f3aa":["\ud83c\udfaa",["circus_tent"]],"1f3ab":["\ud83c\udfab",["ticket"]],"1f3ac":["\ud83c\udfac",["clapper"]],"1f3ad":["\ud83c\udfad",["performing_arts"]],"1f3ae":["\ud83c\udfae",["video_game"]],"1f3af":["\ud83c\udfaf",["dart"]],"1f3b0":["\ud83c\udfb0",["slot_machine"]],"1f3b1":["\ud83c\udfb1",["8ball"]],"1f3b2":["\ud83c\udfb2",["game_die"]],"1f3b3":["\ud83c\udfb3",["bowling"]],"1f3b4":["\ud83c\udfb4",["flower_playing_cards"]],"1f3b5":["\ud83c\udfb5",["musical_note"]],"1f3b6":["\ud83c\udfb6",["notes"]],"1f3b7":["\ud83c\udfb7",["saxophone"]],"1f3b8":["\ud83c\udfb8",["guitar"]],"1f3b9":["\ud83c\udfb9",["musical_keyboard"]],"1f3ba":["\ud83c\udfba",["trumpet"]],"1f3bb":["\ud83c\udfbb",["violin"]],"1f3bc":["\ud83c\udfbc",["musical_score"]],"1f3bd":["\ud83c\udfbd",["running_shirt_with_sash"]],"1f3be":["\ud83c\udfbe",["tennis"]],"1f3bf":["\ud83c\udfbf",["ski"]],"1f3c0":["\ud83c\udfc0",["basketball"]],"1f3c1":["\ud83c\udfc1",["checkered_flag"]],"1f3c2":["\ud83c\udfc2",["snowboarder"]],"1f3c3":["\ud83c\udfc3",["runner","running"]],"1f3c4":["\ud83c\udfc4",["surfer"]],"1f3c6":["\ud83c\udfc6",["trophy"]],"1f3c7":["\ud83c\udfc7",["horse_racing"]],"1f3c8":["\ud83c\udfc8",["football"]],"1f3c9":["\ud83c\udfc9",["rugby_football"]],"1f3ca":["\ud83c\udfca",["swimmer"]],"1f3e0":["\ud83c\udfe0",["house"]],"1f3e1":["\ud83c\udfe1",["house_with_garden"]],"1f3e2":["\ud83c\udfe2",["office"]],"1f3e3":["\ud83c\udfe3",["post_office"]],"1f3e4":["\ud83c\udfe4",["european_post_office"]],"1f3e5":["\ud83c\udfe5",["hospital"]],"1f3e6":["\ud83c\udfe6",["bank"]],"1f3e7":["\ud83c\udfe7",["atm"]],"1f3e8":["\ud83c\udfe8",["hotel"]],"1f3e9":["\ud83c\udfe9",["love_hotel"]],"1f3ea":["\ud83c\udfea",["convenience_store"]],"1f3eb":["\ud83c\udfeb",["school"]],"1f3ec":["\ud83c\udfec",["department_store"]],"1f3ed":["\ud83c\udfed",["factory"]],"1f3ee":["\ud83c\udfee",["izakaya_lantern","lantern"]],"1f3ef":["\ud83c\udfef",["japanese_castle"]],"1f3f0":["\ud83c\udff0",["european_castle"]],"1f400":["\ud83d\udc00",["rat"]],"1f401":["\ud83d\udc01",["mouse2"]],"1f402":["\ud83d\udc02",["ox"]],"1f403":["\ud83d\udc03",["water_buffalo"]],"1f404":["\ud83d\udc04",["cow2"]],"1f405":["\ud83d\udc05",["tiger2"]],"1f406":["\ud83d\udc06",["leopard"]],"1f407":["\ud83d\udc07",["rabbit2"]],"1f408":["\ud83d\udc08",["cat2"]],"1f409":["\ud83d\udc09",["dragon"]],"1f40a":["\ud83d\udc0a",["crocodile"]],"1f40b":["\ud83d\udc0b",["whale2"]],"1f40c":["\ud83d\udc0c",["snail"]],"1f40d":["\ud83d\udc0d",["snake"]],"1f40e":["\ud83d\udc0e",["racehorse"]],"1f40f":["\ud83d\udc0f",["ram"]],"1f410":["\ud83d\udc10",["goat"]],"1f411":["\ud83d\udc11",["sheep"]],"1f412":["\ud83d\udc12",["monkey"]],"1f413":["\ud83d\udc13",["rooster"]],"1f414":["\ud83d\udc14",["chicken"]],"1f415":["\ud83d\udc15",["dog2"]],"1f416":["\ud83d\udc16",["pig2"]],"1f417":["\ud83d\udc17",["boar"]],"1f418":["\ud83d\udc18",["elephant"]],"1f419":["\ud83d\udc19",["octopus"]],"1f41a":["\ud83d\udc1a",["shell"]],"1f41b":["\ud83d\udc1b",["bug"]],"1f41c":["\ud83d\udc1c",["ant"]],"1f41d":["\ud83d\udc1d",["bee","honeybee"]],"1f41e":["\ud83d\udc1e",["beetle"]],"1f41f":["\ud83d\udc1f",["fish"]],"1f420":["\ud83d\udc20",["tropical_fish"]],"1f421":["\ud83d\udc21",["blowfish"]],"1f422":["\ud83d\udc22",["turtle"]],"1f423":["\ud83d\udc23",["hatching_chick"]],"1f424":["\ud83d\udc24",["baby_chick"]],"1f425":["\ud83d\udc25",["hatched_chick"]],"1f426":["\ud83d\udc26",["bird"]],"1f427":["\ud83d\udc27",["penguin"]],"1f428":["\ud83d\udc28",["koala"]],"1f429":["\ud83d\udc29",["poodle"]],"1f42a":["\ud83d\udc2a",["dromedary_camel"]],"1f42b":["\ud83d\udc2b",["camel"]],"1f42c":["\ud83d\udc2c",["dolphin","flipper"]],"1f42d":["\ud83d\udc2d",["mouse"]],"1f42e":["\ud83d\udc2e",["cow"]],"1f42f":["\ud83d\udc2f",["tiger"]],"1f430":["\ud83d\udc30",["rabbit"]],"1f431":["\ud83d\udc31",["cat"]],"1f432":["\ud83d\udc32",["dragon_face"]],"1f433":["\ud83d\udc33",["whale"]],"1f434":["\ud83d\udc34",["horse"]],"1f435":["\ud83d\udc35",["monkey_face"]],"1f436":["\ud83d\udc36",["dog"]],"1f437":["\ud83d\udc37",["pig"]],"1f438":["\ud83d\udc38",["frog"]],"1f439":["\ud83d\udc39",["hamster"]],"1f43a":["\ud83d\udc3a",["wolf"]],"1f43b":["\ud83d\udc3b",["bear"]],"1f43c":["\ud83d\udc3c",["panda_face"]],"1f43d":["\ud83d\udc3d",["pig_nose"]],"1f43e":["\ud83d\udc3e",["feet","paw_prints"]],"1f440":["\ud83d\udc40",["eyes"]],"1f442":["\ud83d\udc42",["ear"]],"1f443":["\ud83d\udc43",["nose"]],"1f444":["\ud83d\udc44",["lips"]],"1f445":["\ud83d\udc45",["tongue"]],"1f446":["\ud83d\udc46",["point_up_2"]],"1f447":["\ud83d\udc47",["point_down"]],"1f448":["\ud83d\udc48",["point_left"]],"1f449":["\ud83d\udc49",["point_right"]],"1f44a":["\ud83d\udc4a",["facepunch","punch"]],"1f44b":["\ud83d\udc4b",["wave"]],"1f44c":["\ud83d\udc4c",["ok_hand"]],"1f44d":["\ud83d\udc4d",["+1","thumbsup"]],"1f44e":["\ud83d\udc4e",["-1","thumbsdown"]],"1f44f":["\ud83d\udc4f",["clap"]],"1f450":["\ud83d\udc50",["open_hands"]],"1f451":["\ud83d\udc51",["crown"]],"1f452":["\ud83d\udc52",["womans_hat"]],"1f453":["\ud83d\udc53",["eyeglasses"]],"1f454":["\ud83d\udc54",["necktie"]],"1f455":["\ud83d\udc55",["shirt","tshirt"]],"1f456":["\ud83d\udc56",["jeans"]],"1f457":["\ud83d\udc57",["dress"]],"1f458":["\ud83d\udc58",["kimono"]],"1f459":["\ud83d\udc59",["bikini"]],"1f45a":["\ud83d\udc5a",["womans_clothes"]],"1f45b":["\ud83d\udc5b",["purse"]],"1f45c":["\ud83d\udc5c",["handbag"]],"1f45d":["\ud83d\udc5d",["pouch"]],"1f45e":["\ud83d\udc5e",["mans_shoe","shoe"]],"1f45f":["\ud83d\udc5f",["athletic_shoe"]],"1f460":["\ud83d\udc60",["high_heel"]],"1f461":["\ud83d\udc61",["sandal"]],"1f462":["\ud83d\udc62",["boot"]],"1f463":["\ud83d\udc63",["footprints"]],"1f464":["\ud83d\udc64",["bust_in_silhouette"]],"1f465":["\ud83d\udc65",["busts_in_silhouette"]],"1f466":["\ud83d\udc66",["boy"]],"1f467":["\ud83d\udc67",["girl"]],"1f468":["\ud83d\udc68",["man"]],"1f469":["\ud83d\udc69",["woman"]],"1f46a":["\ud83d\udc6a",["family"]],"1f46b":["\ud83d\udc6b",["couple"]],"1f46c":["\ud83d\udc6c",["two_men_holding_hands"]],"1f46d":["\ud83d\udc6d",["two_women_holding_hands"]],"1f46e":["\ud83d\udc6e",["cop"]],"1f46f":["\ud83d\udc6f",["dancers"]],"1f470":["\ud83d\udc70",["bride_with_veil"]],"1f471":["\ud83d\udc71",["person_with_blond_hair"]],"1f472":["\ud83d\udc72",["man_with_gua_pi_mao"]],"1f473":["\ud83d\udc73",["man_with_turban"]],"1f474":["\ud83d\udc74",["older_man"]],"1f475":["\ud83d\udc75",["older_woman"]],"1f476":["\ud83d\udc76",["baby"]],"1f477":["\ud83d\udc77",["construction_worker"]],"1f478":["\ud83d\udc78",["princess"]],"1f479":["\ud83d\udc79",["japanese_ogre"]],"1f47a":["\ud83d\udc7a",["japanese_goblin"]],"1f47b":["\ud83d\udc7b",["ghost"]],"1f47c":["\ud83d\udc7c",["angel"]],"1f47d":["\ud83d\udc7d",["alien"]],"1f47e":["\ud83d\udc7e",["space_invader"]],"1f47f":["\ud83d\udc7f",["imp"]],"1f480":["\ud83d\udc80",["skull"]],"1f481":["\ud83d\udc81",["information_desk_person"]],"1f482":["\ud83d\udc82",["guardsman"]],"1f483":["\ud83d\udc83",["dancer"]],"1f484":["\ud83d\udc84",["lipstick"]],"1f485":["\ud83d\udc85",["nail_care"]],"1f486":["\ud83d\udc86",["massage"]],"1f487":["\ud83d\udc87",["haircut"]],"1f488":["\ud83d\udc88",["barber"]],"1f489":["\ud83d\udc89",["syringe"]],"1f48a":["\ud83d\udc8a",["pill"]],"1f48b":["\ud83d\udc8b",["kiss"]],"1f48c":["\ud83d\udc8c",["love_letter"]],"1f48d":["\ud83d\udc8d",["ring"]],"1f48e":["\ud83d\udc8e",["gem"]],"1f48f":["\ud83d\udc8f",["couplekiss"]],"1f490":["\ud83d\udc90",["bouquet"]],"1f491":["\ud83d\udc91",["couple_with_heart"]],"1f492":["\ud83d\udc92",["wedding"]],"1f493":["\ud83d\udc93",["heartbeat"]],"1f494":["\ud83d\udc94",["broken_heart"],"</3"],"1f495":["\ud83d\udc95",["two_hearts"]],"1f496":["\ud83d\udc96",["sparkling_heart"]],"1f497":["\ud83d\udc97",["heartpulse"]],"1f498":["\ud83d\udc98",["cupid"]],"1f499":["\ud83d\udc99",["blue_heart"],"<3"],"1f49a":["\ud83d\udc9a",["green_heart"],"<3"],"1f49b":["\ud83d\udc9b",["yellow_heart"],"<3"],"1f49c":["\ud83d\udc9c",["purple_heart"],"<3"],"1f49d":["\ud83d\udc9d",["gift_heart"]],"1f49e":["\ud83d\udc9e",["revolving_hearts"]],"1f49f":["\ud83d\udc9f",["heart_decoration"]],"1f4a0":["\ud83d\udca0",["diamond_shape_with_a_dot_inside"]],"1f4a1":["\ud83d\udca1",["bulb"]],"1f4a2":["\ud83d\udca2",["anger"]],"1f4a3":["\ud83d\udca3",["bomb"]],"1f4a4":["\ud83d\udca4",["zzz"]],"1f4a5":["\ud83d\udca5",["boom","collision"]],"1f4a6":["\ud83d\udca6",["sweat_drops"]],"1f4a7":["\ud83d\udca7",["droplet"]],"1f4a8":["\ud83d\udca8",["dash"]],"1f4a9":["\ud83d\udca9",["hankey","poop","shit"]],"1f4aa":["\ud83d\udcaa",["muscle"]],"1f4ab":["\ud83d\udcab",["dizzy"]],"1f4ac":["\ud83d\udcac",["speech_balloon"]],"1f4ad":["\ud83d\udcad",["thought_balloon"]],"1f4ae":["\ud83d\udcae",["white_flower"]],"1f4af":["\ud83d\udcaf",["100"]],"1f4b0":["\ud83d\udcb0",["moneybag"]],"1f4b1":["\ud83d\udcb1",["currency_exchange"]],"1f4b2":["\ud83d\udcb2",["heavy_dollar_sign"]],"1f4b3":["\ud83d\udcb3",["credit_card"]],"1f4b4":["\ud83d\udcb4",["yen"]],"1f4b5":["\ud83d\udcb5",["dollar"]],"1f4b6":["\ud83d\udcb6",["euro"]],"1f4b7":["\ud83d\udcb7",["pound"]],"1f4b8":["\ud83d\udcb8",["money_with_wings"]],"1f4b9":["\ud83d\udcb9",["chart"]],"1f4ba":["\ud83d\udcba",["seat"]],"1f4bb":["\ud83d\udcbb",["computer"]],"1f4bc":["\ud83d\udcbc",["briefcase"]],"1f4bd":["\ud83d\udcbd",["minidisc"]],"1f4be":["\ud83d\udcbe",["floppy_disk"]],"1f4bf":["\ud83d\udcbf",["cd"]],"1f4c0":["\ud83d\udcc0",["dvd"]],"1f4c1":["\ud83d\udcc1",["file_folder"]],"1f4c2":["\ud83d\udcc2",["open_file_folder"]],"1f4c3":["\ud83d\udcc3",["page_with_curl"]],"1f4c4":["\ud83d\udcc4",["page_facing_up"]],"1f4c5":["\ud83d\udcc5",["date"]],"1f4c6":["\ud83d\udcc6",["calendar"]],"1f4c7":["\ud83d\udcc7",["card_index"]],"1f4c8":["\ud83d\udcc8",["chart_with_upwards_trend"]],"1f4c9":["\ud83d\udcc9",["chart_with_downwards_trend"]],"1f4ca":["\ud83d\udcca",["bar_chart"]],"1f4cb":["\ud83d\udccb",["clipboard"]],"1f4cc":["\ud83d\udccc",["pushpin"]],"1f4cd":["\ud83d\udccd",["round_pushpin"]],"1f4ce":["\ud83d\udcce",["paperclip"]],"1f4cf":["\ud83d\udccf",["straight_ruler"]],"1f4d0":["\ud83d\udcd0",["triangular_ruler"]],"1f4d1":["\ud83d\udcd1",["bookmark_tabs"]],"1f4d2":["\ud83d\udcd2",["ledger"]],"1f4d3":["\ud83d\udcd3",["notebook"]],"1f4d4":["\ud83d\udcd4",["notebook_with_decorative_cover"]],"1f4d5":["\ud83d\udcd5",["closed_book"]],"1f4d6":["\ud83d\udcd6",["book","open_book"]],"1f4d7":["\ud83d\udcd7",["green_book"]],"1f4d8":["\ud83d\udcd8",["blue_book"]],"1f4d9":["\ud83d\udcd9",["orange_book"]],"1f4da":["\ud83d\udcda",["books"]],"1f4db":["\ud83d\udcdb",["name_badge"]],"1f4dc":["\ud83d\udcdc",["scroll"]],"1f4dd":["\ud83d\udcdd",["memo","pencil"]],"1f4de":["\ud83d\udcde",["telephone_receiver"]],"1f4df":["\ud83d\udcdf",["pager"]],"1f4e0":["\ud83d\udce0",["fax"]],"1f4e1":["\ud83d\udce1",["satellite"]],"1f4e2":["\ud83d\udce2",["loudspeaker"]],"1f4e3":["\ud83d\udce3",["mega"]],"1f4e4":["\ud83d\udce4",["outbox_tray"]],"1f4e5":["\ud83d\udce5",["inbox_tray"]],"1f4e6":["\ud83d\udce6",["package"]],"1f4e7":["\ud83d\udce7",["e-mail"]],"1f4e8":["\ud83d\udce8",["incoming_envelope"]],"1f4e9":["\ud83d\udce9",["envelope_with_arrow"]],"1f4ea":["\ud83d\udcea",["mailbox_closed"]],"1f4eb":["\ud83d\udceb",["mailbox"]],"1f4ec":["\ud83d\udcec",["mailbox_with_mail"]],"1f4ed":["\ud83d\udced",["mailbox_with_no_mail"]],"1f4ee":["\ud83d\udcee",["postbox"]],"1f4ef":["\ud83d\udcef",["postal_horn"]],"1f4f0":["\ud83d\udcf0",["newspaper"]],"1f4f1":["\ud83d\udcf1",["iphone"]],"1f4f2":["\ud83d\udcf2",["calling"]],"1f4f3":["\ud83d\udcf3",["vibration_mode"]],"1f4f4":["\ud83d\udcf4",["mobile_phone_off"]],"1f4f5":["\ud83d\udcf5",["no_mobile_phones"]],"1f4f6":["\ud83d\udcf6",["signal_strength"]],"1f4f7":["\ud83d\udcf7",["camera"]],"1f4f9":["\ud83d\udcf9",["video_camera"]],"1f4fa":["\ud83d\udcfa",["tv"]],"1f4fb":["\ud83d\udcfb",["radio"]],"1f4fc":["\ud83d\udcfc",["vhs"]],"1f500":["\ud83d\udd00",["twisted_rightwards_arrows"]],"1f501":["\ud83d\udd01",["repeat"]],"1f502":["\ud83d\udd02",["repeat_one"]],"1f503":["\ud83d\udd03",["arrows_clockwise"]],"1f504":["\ud83d\udd04",["arrows_counterclockwise"]],"1f505":["\ud83d\udd05",["low_brightness"]],"1f506":["\ud83d\udd06",["high_brightness"]],"1f507":["\ud83d\udd07",["mute"]],"1f508":["\ud83d\udd09",["speaker"]],"1f509":["\ud83d\udd09",["sound"]],"1f50a":["\ud83d\udd0a",["loud_sound"]],"1f50b":["\ud83d\udd0b",["battery"]],"1f50c":["\ud83d\udd0c",["electric_plug"]],"1f50d":["\ud83d\udd0d",["mag"]],"1f50e":["\ud83d\udd0e",["mag_right"]],"1f50f":["\ud83d\udd0f",["lock_with_ink_pen"]],"1f510":["\ud83d\udd10",["closed_lock_with_key"]],"1f511":["\ud83d\udd11",["key"]],"1f512":["\ud83d\udd12",["lock"]],"1f513":["\ud83d\udd13",["unlock"]],"1f514":["\ud83d\udd14",["bell"]],"1f515":["\ud83d\udd15",["no_bell"]],"1f516":["\ud83d\udd16",["bookmark"]],"1f517":["\ud83d\udd17",["link"]],"1f518":["\ud83d\udd18",["radio_button"]],"1f519":["\ud83d\udd19",["back"]],"1f51a":["\ud83d\udd1a",["end"]],"1f51b":["\ud83d\udd1b",["on"]],"1f51c":["\ud83d\udd1c",["soon"]],"1f51d":["\ud83d\udd1d",["top"]],"1f51e":["\ud83d\udd1e",["underage"]],"1f51f":["\ud83d\udd1f",["keycap_ten"]],"1f520":["\ud83d\udd20",["capital_abcd"]],"1f521":["\ud83d\udd21",["abcd"]],"1f522":["\ud83d\udd22",["1234"]],"1f523":["\ud83d\udd23",["symbols"]],"1f524":["\ud83d\udd24",["abc"]],"1f525":["\ud83d\udd25",["fire"]],"1f526":["\ud83d\udd26",["flashlight"]],"1f527":["\ud83d\udd27",["wrench"]],"1f528":["\ud83d\udd28",["hammer"]],"1f529":["\ud83d\udd29",["nut_and_bolt"]],"1f52a":["\ud83d\udd2a",["hocho"]],"1f52b":["\ud83d\udd2b",["gun"]],"1f52c":["\ud83d\udd2c",["microscope"]],"1f52d":["\ud83d\udd2d",["telescope"]],"1f52e":["\ud83d\udd2e",["crystal_ball"]],"1f52f":["\ud83d\udd2f",["six_pointed_star"]],"1f530":["\ud83d\udd30",["beginner"]],"1f531":["\ud83d\udd31",["trident"]],"1f532":["\ud83d\udd32",["black_square_button"]],"1f533":["\ud83d\udd33",["white_square_button"]],"1f534":["\ud83d\udd34",["red_circle"]],"1f535":["\ud83d\udd35",["large_blue_circle"]],"1f536":["\ud83d\udd36",["large_orange_diamond"]],"1f537":["\ud83d\udd37",["large_blue_diamond"]],"1f538":["\ud83d\udd38",["small_orange_diamond"]],"1f539":["\ud83d\udd39",["small_blue_diamond"]],"1f53a":["\ud83d\udd3a",["small_red_triangle"]],"1f53b":["\ud83d\udd3b",["small_red_triangle_down"]],"1f53c":["\ud83d\udd3c",["arrow_up_small"]],"1f53d":["\ud83d\udd3d",["arrow_down_small"]],"1f550":["\ud83d\udd50",["clock1"]],"1f551":["\ud83d\udd51",["clock2"]],"1f552":["\ud83d\udd52",["clock3"]],"1f553":["\ud83d\udd53",["clock4"]],"1f554":["\ud83d\udd54",["clock5"]],"1f555":["\ud83d\udd55",["clock6"]],"1f556":["\ud83d\udd56",["clock7"]],"1f557":["\ud83d\udd57",["clock8"]],"1f558":["\ud83d\udd58",["clock9"]],"1f559":["\ud83d\udd59",["clock10"]],"1f55a":["\ud83d\udd5a",["clock11"]],"1f55b":["\ud83d\udd5b",["clock12"]],"1f55c":["\ud83d\udd5c",["clock130"]],"1f55d":["\ud83d\udd5d",["clock230"]],"1f55e":["\ud83d\udd5e",["clock330"]],"1f55f":["\ud83d\udd5f",["clock430"]],"1f560":["\ud83d\udd60",["clock530"]],"1f561":["\ud83d\udd61",["clock630"]],"1f562":["\ud83d\udd62",["clock730"]],"1f563":["\ud83d\udd63",["clock830"]],"1f564":["\ud83d\udd64",["clock930"]],"1f565":["\ud83d\udd65",["clock1030"]],"1f566":["\ud83d\udd66",["clock1130"]],"1f567":["\ud83d\udd67",["clock1230"]],"1f5fb":["\ud83d\uddfb",["mount_fuji"]],"1f5fc":["\ud83d\uddfc",["tokyo_tower"]],"1f5fd":["\ud83d\uddfd",["statue_of_liberty"]],"1f5fe":["\ud83d\uddfe",["japan"]],"1f5ff":["\ud83d\uddff",["moyai"]],"1f600":["\ud83d\ude00",["grinning"]],"1f601":["\ud83d\ude01",["grin"]],"1f602":["\ud83d\ude02",["joy"]],"1f603":["\ud83d\ude03",["smiley"],":)"],"1f604":["\ud83d\ude04",["smile"],":)"],"1f605":["\ud83d\ude05",["sweat_smile"]],"1f606":["\ud83d\ude06",["satisfied"]],"1f607":["\ud83d\ude07",["innocent"]],"1f608":["\ud83d\ude08",["smiling_imp"]],"1f609":["\ud83d\ude09",["wink"],";)"],"1f60a":["\ud83d\ude0a",["blush"]],"1f60b":["\ud83d\ude0b",["yum"]],"1f60c":["\ud83d\ude0c",["relieved"]],"1f60d":["\ud83d\ude0d",["heart_eyes"]],"1f60e":["\ud83d\ude0e",["sunglasses"]],"1f60f":["\ud83d\ude0f",["smirk"]],"1f610":["\ud83d\ude10",["neutral_face"]],"1f611":["\ud83d\ude11",["expressionless"]],"1f612":["\ud83d\ude12",["unamused"]],"1f613":["\ud83d\ude13",["sweat"]],"1f614":["\ud83d\ude14",["pensive"]],"1f615":["\ud83d\ude15",["confused"]],"1f616":["\ud83d\ude16",["confounded"]],"1f617":["\ud83d\ude17",["kissing"]],"1f618":["\ud83d\ude18",["kissing_heart"]],"1f619":["\ud83d\ude19",["kissing_smiling_eyes"]],"1f61a":["\ud83d\ude1a",["kissing_closed_eyes"]],"1f61b":["\ud83d\ude1b",["stuck_out_tongue"]],"1f61c":["\ud83d\ude1c",["stuck_out_tongue_winking_eye"],";p"],"1f61d":["\ud83d\ude1d",["stuck_out_tongue_closed_eyes"]],"1f61e":["\ud83d\ude1e",["disappointed"],":("],"1f61f":["\ud83d\ude1f",["worried"]],"1f620":["\ud83d\ude20",["angry"]],"1f621":["\ud83d\ude21",["rage"]],"1f622":["\ud83d\ude22",["cry"],":'("],"1f623":["\ud83d\ude23",["persevere"]],"1f624":["\ud83d\ude24",["triumph"]],"1f625":["\ud83d\ude25",["disappointed_relieved"]],"1f626":["\ud83d\ude26",["frowning"]],"1f627":["\ud83d\ude27",["anguished"]],"1f628":["\ud83d\ude28",["fearful"]],"1f629":["\ud83d\ude29",["weary"]],"1f62a":["\ud83d\ude2a",["sleepy"]],"1f62b":["\ud83d\ude2b",["tired_face"]],"1f62c":["\ud83d\ude2c",["grimacing"]],"1f62d":["\ud83d\ude2d",["sob"],":'("],"1f62e":["\ud83d\ude2e",["open_mouth"]],"1f62f":["\ud83d\ude2f",["hushed"]],"1f630":["\ud83d\ude30",["cold_sweat"]],"1f631":["\ud83d\ude31",["scream"]],"1f632":["\ud83d\ude32",["astonished"]],"1f633":["\ud83d\ude33",["flushed"]],"1f634":["\ud83d\ude34",["sleeping"]],"1f635":["\ud83d\ude35",["dizzy_face"]],"1f636":["\ud83d\ude36",["no_mouth"]],"1f637":["\ud83d\ude37",["mask"]],"1f638":["\ud83d\ude38",["smile_cat"]],"1f639":["\ud83d\ude39",["joy_cat"]],"1f63a":["\ud83d\ude3a",["smiley_cat"]],"1f63b":["\ud83d\ude3b",["heart_eyes_cat"]],"1f63c":["\ud83d\ude3c",["smirk_cat"]],"1f63d":["\ud83d\ude3d",["kissing_cat"]],"1f63e":["\ud83d\ude3e",["pouting_cat"]],"1f63f":["\ud83d\ude3f",["crying_cat_face"]],"1f640":["\ud83d\ude40",["scream_cat"]],"1f645":["\ud83d\ude45",["no_good"]],"1f646":["\ud83d\ude46",["ok_woman"]],"1f647":["\ud83d\ude47",["bow"]],"1f648":["\ud83d\ude48",["see_no_evil"]],"1f649":["\ud83d\ude49",["hear_no_evil"]],"1f64a":["\ud83d\ude4a",["speak_no_evil"]],"1f64b":["\ud83d\ude4b",["raising_hand"]],"1f64c":["\ud83d\ude4c",["raised_hands"]],"1f64d":["\ud83d\ude4d",["person_frowning"]],"1f64e":["\ud83d\ude4e",["person_with_pouting_face"]],"1f64f":["\ud83d\ude4f",["pray"]],"1f680":["\ud83d\ude80",["rocket"]],"1f681":["\ud83d\ude81",["helicopter"]],"1f682":["\ud83d\ude82",["steam_locomotive"]],"1f683":["\ud83d\ude83",["railway_car"]],"1f68b":["\ud83d\ude8b",["train"]],"1f684":["\ud83d\ude84",["bullettrain_side"]],"1f685":["\ud83d\ude85",["bullettrain_front"]],"1f686":["\ud83d\ude86",["train2"]],"1f687":["\ud83d\ude87",["metro"]],"1f688":["\ud83d\ude88",["light_rail"]],"1f689":["\ud83d\ude89",["station"]],"1f68a":["\ud83d\ude8a",["tram"]],"1f68c":["\ud83d\ude8c",["bus"]],"1f68d":["\ud83d\ude8d",["oncoming_bus"]],"1f68e":["\ud83d\ude8e",["trolleybus"]],"1f68f":["\ud83d\ude8f",["busstop"]],"1f690":["\ud83d\ude90",["minibus"]],"1f691":["\ud83d\ude91",["ambulance"]],"1f692":["\ud83d\ude92",["fire_engine"]],"1f693":["\ud83d\ude93",["police_car"]],"1f694":["\ud83d\ude94",["oncoming_police_car"]],"1f695":["\ud83d\ude95",["taxi"]],
"1f696":["\ud83d\ude96",["oncoming_taxi"]],"1f697":["\ud83d\ude97",["car","red_car"]],"1f698":["\ud83d\ude98",["oncoming_automobile"]],"1f699":["\ud83d\ude99",["blue_car"]],"1f69a":["\ud83d\ude9a",["truck"]],"1f69b":["\ud83d\ude9b",["articulated_lorry"]],"1f69c":["\ud83d\ude9c",["tractor"]],"1f69d":["\ud83d\ude9d",["monorail"]],"1f69e":["\ud83d\ude9e",["mountain_railway"]],"1f69f":["\ud83d\ude9f",["suspension_railway"]],"1f6a0":["\ud83d\udea0",["mountain_cableway"]],"1f6a1":["\ud83d\udea1",["aerial_tramway"]],"1f6a2":["\ud83d\udea2",["ship"]],"1f6a3":["\ud83d\udea3",["rowboat"]],"1f6a4":["\ud83d\udea4",["speedboat"]],"1f6a5":["\ud83d\udea5",["traffic_light"]],"1f6a6":["\ud83d\udea6",["vertical_traffic_light"]],"1f6a7":["\ud83d\udea7",["construction"]],"1f6a8":["\ud83d\udea8",["rotating_light"]],"1f6a9":["\ud83d\udea9",["triangular_flag_on_post"]],"1f6aa":["\ud83d\udeaa",["door"]],"1f6ab":["\ud83d\udeab",["no_entry_sign"]],"1f6ac":["\ud83d\udeac",["smoking"]],"1f6ad":["\ud83d\udead",["no_smoking"]],"1f6ae":["\ud83d\udeae",["put_litter_in_its_place"]],"1f6af":["\ud83d\udeaf",["do_not_litter"]],"1f6b0":["\ud83d\udeb0",["potable_water"]],"1f6b1":["\ud83d\udeb1",["non-potable_water"]],"1f6b2":["\ud83d\udeb2",["bike"]],"1f6b3":["\ud83d\udeb3",["no_bicycles"]],"1f6b4":["\ud83d\udeb4",["bicyclist"]],"1f6b5":["\ud83d\udeb5",["mountain_bicyclist"]],"1f6b6":["\ud83d\udeb6",["walking"]],"1f6b7":["\ud83d\udeb7",["no_pedestrians"]],"1f6b8":["\ud83d\udeb8",["children_crossing"]],"1f6b9":["\ud83d\udeb9",["mens"]],"1f6ba":["\ud83d\udeba",["womens"]],"1f6bb":["\ud83d\udebb",["restroom"]],"1f6bc":["\ud83d\udebc",["baby_symbol"]],"1f6bd":["\ud83d\udebd",["toilet"]],"1f6be":["\ud83d\udebe",["wc"]],"1f6bf":["\ud83d\udebf",["shower"]],"1f6c0":["\ud83d\udec0",["bath"]],"1f6c1":["\ud83d\udec1",["bathtub"]],"1f6c2":["\ud83d\udec2",["passport_control"]],"1f6c3":["\ud83d\udec3",["customs"]],"1f6c4":["\ud83d\udec4",["baggage_claim"]],"1f6c5":["\ud83d\udec5",["left_luggage"]],"0023":["#\u20e3",["hash"]],"0030":["0\u20e3",["zero"]],"0031":["1\u20e3",["one"]],"0032":["2\u20e3",["two"]],"0033":["3\u20e3",["three"]],"0034":["4\u20e3",["four"]],"0035":["5\u20e3",["five"]],"0036":["6\u20e3",["six"]],"0037":["7\u20e3",["seven"]],"0038":["8\u20e3",["eight"]],"0039":["9\u20e3",["nine"]],"1f1e8-1f1f3":["\ud83c\udde8\ud83c\uddf3",["cn"]],"1f1e9-1f1ea":["\ud83c\udde9\ud83c\uddea",["de"]],"1f1ea-1f1f8":["\ud83c\uddea\ud83c\uddf8",["es"]],"1f1eb-1f1f7":["\ud83c\uddeb\ud83c\uddf7",["fr"]],"1f1ec-1f1e7":["\ud83c\uddec\ud83c\udde7",["gb","uk"]],"1f1ee-1f1f9":["\ud83c\uddee\ud83c\uddf9",["it"]],"1f1ef-1f1f5":["\ud83c\uddef\ud83c\uddf5",["jp"]],"1f1f0-1f1f7":["\ud83c\uddf0\ud83c\uddf7",["kr"]],"1f1f7-1f1fa":["\ud83c\uddf7\ud83c\uddfa",["ru"]],"1f1fa-1f1f8":["\ud83c\uddfa\ud83c\uddf8",["us"]]},Config.EmojiCategories=[["1f604","1f603","1f600","1f60a","263a","1f609","1f60d","1f618","1f61a","1f617","1f619","1f61c","1f61d","1f61b","1f633","1f601","1f614","1f60c","1f612","1f61e","1f623","1f622","1f602","1f62d","1f62a","1f625","1f630","1f605","1f613","1f629","1f62b","1f628","1f631","1f620","1f621","1f624","1f616","1f606","1f60b","1f637","1f60e","1f634","1f635","1f632","1f61f","1f626","1f627","1f608","1f47f","1f62e","1f62c","1f610","1f615","1f62f","1f636","1f607","1f60f","1f611","1f472","1f473","1f46e","1f477","1f482","1f476","1f466","1f467","1f468","1f469","1f474","1f475","1f471","1f47c","1f478","1f63a","1f638","1f63b","1f63d","1f63c","1f640","1f63f","1f639","1f63e","1f479","1f47a","1f648","1f649","1f64a","1f480","1f47d","1f4a9","1f525","2728","1f31f","1f4ab","1f4a5","1f4a2","1f4a6","1f4a7","1f4a4","1f4a8","1f442","1f440","1f443","1f445","1f444","1f44d","1f44e","1f44c","1f44a","270a","270c","1f44b","270b","1f450","1f446","1f447","1f449","1f448","1f64c","1f64f","261d","1f44f","1f4aa","1f6b6","1f3c3","1f483","1f46b","1f46a","1f46c","1f46d","1f48f","1f491","1f46f","1f646","1f645","1f481","1f64b","1f486","1f487","1f485","1f470","1f64e","1f64d","1f647","1f3a9","1f451","1f452","1f45f","1f45e","1f461","1f460","1f462","1f455","1f454","1f45a","1f457","1f3bd","1f456","1f458","1f459","1f4bc","1f45c","1f45d","1f45b","1f453","1f380","1f302","1f484","1f49b","1f499","1f49c","1f49a","2764","1f494","1f497","1f493","1f495","1f496","1f49e","1f498","1f48c","1f48b","1f48d","1f48e","1f464","1f465","1f4ac","1f463","1f4ad"],["1f436","1f43a","1f431","1f42d","1f439","1f430","1f438","1f42f","1f428","1f43b","1f437","1f43d","1f42e","1f417","1f435","1f412","1f434","1f411","1f418","1f43c","1f427","1f426","1f424","1f425","1f423","1f414","1f40d","1f422","1f41b","1f41d","1f41c","1f41e","1f40c","1f419","1f41a","1f420","1f41f","1f42c","1f433","1f40b","1f404","1f40f","1f400","1f403","1f405","1f407","1f409","1f40e","1f410","1f413","1f415","1f416","1f401","1f402","1f432","1f421","1f40a","1f42b","1f42a","1f406","1f408","1f429","1f43e","1f490","1f338","1f337","1f340","1f339","1f33b","1f33a","1f341","1f343","1f342","1f33f","1f33e","1f344","1f335","1f334","1f332","1f333","1f330","1f331","1f33c","1f310","1f31e","1f31d","1f31a","1f311","1f312","1f313","1f314","1f315","1f316","1f317","1f318","1f31c","1f31b","1f319","1f30d","1f30e","1f30f","1f30b","1f30c","1f320","2b50","2600","26c5","2601","26a1","2614","2744","26c4","1f300","1f301","1f308","1f30a"],["1f38d","1f49d","1f38e","1f392","1f393","1f38f","1f386","1f387","1f390","1f391","1f383","1f47b","1f385","1f384","1f381","1f38b","1f389","1f38a","1f388","1f38c","1f52e","1f3a5","1f4f7","1f4f9","1f4fc","1f4bf","1f4c0","1f4bd","1f4be","1f4bb","1f4f1","260e","1f4de","1f4df","1f4e0","1f4e1","1f4fa","1f4fb","1f50a","1f509","1f508","1f507","1f514","1f515","1f4e3","1f4e2","23f3","231b","23f0","231a","1f513","1f512","1f50f","1f510","1f511","1f50e","1f4a1","1f526","1f506","1f505","1f50c","1f50b","1f50d","1f6c0","1f6c1","1f6bf","1f6bd","1f527","1f529","1f528","1f6aa","1f6ac","1f4a3","1f52b","1f52a","1f48a","1f489","1f4b0","1f4b4","1f4b5","1f4b7","1f4b6","1f4b3","1f4b8","1f4f2","1f4e7","1f4e5","1f4e4","2709","1f4e9","1f4e8","1f4ef","1f4eb","1f4ea","1f4ec","1f4ed","1f4ee","1f4e6","1f4dd","1f4c4","1f4c3","1f4d1","1f4ca","1f4c8","1f4c9","1f4dc","1f4cb","1f4c5","1f4c6","1f4c7","1f4c1","1f4c2","2702","1f4cc","1f4ce","2712","270f","1f4cf","1f4d0","1f4d5","1f4d7","1f4d8","1f4d9","1f4d3","1f4d4","1f4d2","1f4da","1f4d6","1f516","1f4db","1f52c","1f52d","1f4f0","1f3a8","1f3ac","1f3a4","1f3a7","1f3bc","1f3b5","1f3b6","1f3b9","1f3bb","1f3ba","1f3b7","1f3b8","1f47e","1f3ae","1f0cf","1f3b4","1f004","1f3b2","1f3af","1f3c8","1f3c0","26bd","26be","1f3be","1f3b1","1f3c9","1f3b3","26f3","1f6b5","1f6b4","1f3c1","1f3c7","1f3c6","1f3bf","1f3c2","1f3ca","1f3c4","1f3a3","2615","1f375","1f376","1f37c","1f37a","1f37b","1f378","1f379","1f377","1f374","1f355","1f354","1f35f","1f357","1f356","1f35d","1f35b","1f364","1f371","1f363","1f365","1f359","1f358","1f35a","1f35c","1f372","1f362","1f361","1f373","1f35e","1f369","1f36e","1f366","1f368","1f367","1f382","1f370","1f36a","1f36b","1f36c","1f36d","1f36f","1f34e","1f34f","1f34a","1f34b","1f352","1f347","1f349","1f353","1f351","1f348","1f34c","1f350","1f34d","1f360","1f346","1f345","1f33d"],["1f3e0","1f3e1","1f3eb","1f3e2","1f3e3","1f3e5","1f3e6","1f3ea","1f3e9","1f3e8","1f492","26ea","1f3ec","1f3e4","1f307","1f306","1f3ef","1f3f0","26fa","1f3ed","1f5fc","1f5fe","1f5fb","1f304","1f305","1f303","1f5fd","1f309","1f3a0","1f3a1","26f2","1f3a2","1f6a2","26f5","1f6a4","1f6a3","2693","1f680","2708","1f4ba","1f681","1f682","1f68a","1f689","1f69e","1f686","1f684","1f685","1f688","1f687","1f69d","1f683","1f68b","1f68e","1f68c","1f68d","1f699","1f698","1f697","1f695","1f696","1f69b","1f69a","1f6a8","1f693","1f694","1f692","1f691","1f690","1f6b2","1f6a1","1f69f","1f6a0","1f69c","1f488","1f68f","1f3ab","1f6a6","1f6a5","26a0","1f6a7","1f530","26fd","1f3ee","1f3b0","2668","1f5ff","1f3aa","1f3ad","1f4cd","1f6a9","1f1ef-1f1f5","1f1f0-1f1f7","1f1e9-1f1ea","1f1e8-1f1f3","1f1fa-1f1f8","1f1eb-1f1f7","1f1ea-1f1f8","1f1ee-1f1f9","1f1f7-1f1fa","1f1ec-1f1e7"],["0031","0032","0033","0034","0035","0036","0037","0038","0039","0030","1f51f","1f522","0023","1f523","2b06","2b07","2b05","27a1","1f520","1f521","1f524","2197","2196","2198","2199","2194","2195","1f504","25c0","25b6","1f53c","1f53d","21a9","21aa","2139","23ea","23e9","23eb","23ec","2935","2934","1f197","1f500","1f501","1f502","1f195","1f199","1f192","1f193","1f196","1f4f6","1f3a6","1f201","1f22f","1f233","1f235","1f234","1f232","1f250","1f239","1f23a","1f236","1f21a","1f6bb","1f6b9","1f6ba","1f6bc","1f6be","1f6b0","1f6ae","1f17f","267f","1f6ad","1f237","1f238","1f202","24c2","1f6c2","1f6c4","1f6c5","1f6c3","1f251","3299","3297","1f191","1f198","1f194","1f6ab","1f51e","1f4f5","1f6af","1f6b1","1f6b3","1f6b7","1f6b8","26d4","2733","2747","274e","2705","2734","1f49f","1f19a","1f4f3","1f4f4","1f170","1f171","1f18e","1f17e","1f4a0","27bf","267b","2648","2649","264a","264b","264c","264d","264e","264f","2650","2651","2652","2653","26ce","1f52f","1f3e7","1f4b9","1f4b2","1f4b1","00a9","00ae","2122","274c","203c","2049","2757","2753","2755","2754","2b55","1f51d","1f51a","1f519","1f51b","1f51c","1f503","1f55b","1f567","1f550","1f55c","1f551","1f55d","1f552","1f55e","1f553","1f55f","1f554","1f560","1f555","1f556","1f557","1f558","1f559","1f55a","1f561","1f562","1f563","1f564","1f565","1f566","2716","2795","2796","2797","2660","2665","2663","2666","1f4ae","1f4af","2714","2611","1f518","1f517","27b0","3030","303d","1f531","25fc","25fb","25fe","25fd","25aa","25ab","1f53a","1f532","1f533","26ab","26aa","1f534","1f535","1f53b","2b1c","2b1b","1f536","1f537","1f538","1f539"]],Config.EmojiCategorySpritesheetDimens=[[7,27],[4,29],[7,33],[3,34],[7,34]],Config.emoji_data={"00a9":[["\xa9"],"\ue24e","\udbba\udf29",["copyright"],0,0],"00ae":[["\xae"],"\ue24f","\udbba\udf2d",["registered"],0,1],"203c":[["\u203c\ufe0f","\u203c"],"","\udbba\udf06",["bangbang"],0,2],2049:[["\u2049\ufe0f","\u2049"],"","\udbba\udf05",["interrobang"],0,3],2122:[["\u2122"],"\ue537","\udbba\udf2a",["tm"],0,4],2139:[["\u2139\ufe0f","\u2139"],"","\udbba\udf47",["information_source"],0,5],2194:[["\u2194\ufe0f","\u2194"],"","\udbba\udef6",["left_right_arrow"],0,6],2195:[["\u2195\ufe0f","\u2195"],"","\udbba\udef7",["arrow_up_down"],0,7],2196:[["\u2196\ufe0f","\u2196"],"\ue237","\udbba\udef2",["arrow_upper_left"],0,8],2197:[["\u2197\ufe0f","\u2197"],"\ue236","\udbba\udef0",["arrow_upper_right"],0,9],2198:[["\u2198\ufe0f","\u2198"],"\ue238","\udbba\udef1",["arrow_lower_right"],0,10],2199:[["\u2199\ufe0f","\u2199"],"\ue239","\udbba\udef3",["arrow_lower_left"],0,11],"21a9":[["\u21a9\ufe0f","\u21a9"],"","\udbba\udf83",["leftwards_arrow_with_hook"],0,12],"21aa":[["\u21aa\ufe0f","\u21aa"],"","\udbba\udf88",["arrow_right_hook"],0,13],"231a":[["\u231a\ufe0f","\u231a"],"","\udbb8\udc1d",["watch"],0,14],"231b":[["\u231b\ufe0f","\u231b"],"","\udbb8\udc1c",["hourglass"],0,15],"23e9":[["\u23e9"],"\ue23c","\udbba\udefe",["fast_forward"],0,16],"23ea":[["\u23ea"],"\ue23d","\udbba\udeff",["rewind"],0,17],"23eb":[["\u23eb"],"","\udbba\udf03",["arrow_double_up"],0,18],"23ec":[["\u23ec"],"","\udbba\udf02",["arrow_double_down"],0,19],"23f0":[["\u23f0"],"\ue02d","\udbb8\udc2a",["alarm_clock"],0,20],"23f3":[["\u23f3"],"","\udbb8\udc1b",["hourglass_flowing_sand"],0,21],"24c2":[["\u24c2\ufe0f","\u24c2"],"\ue434","\udbb9\udfe1",["m"],0,22],"25aa":[["\u25aa\ufe0f","\u25aa"],"\ue21a","\udbba\udf6e",["black_small_square"],0,23],"25ab":[["\u25ab\ufe0f","\u25ab"],"\ue21b","\udbba\udf6d",["white_small_square"],0,24],"25b6":[["\u25b6\ufe0f","\u25b6"],"\ue23a","\udbba\udefc",["arrow_forward"],0,25],"25c0":[["\u25c0\ufe0f","\u25c0"],"\ue23b","\udbba\udefd",["arrow_backward"],0,26],"25fb":[["\u25fb\ufe0f","\u25fb"],"\ue21b","\udbba\udf71",["white_medium_square"],0,27],"25fc":[["\u25fc\ufe0f","\u25fc"],"\ue21a","\udbba\udf72",["black_medium_square"],0,28],"25fd":[["\u25fd\ufe0f","\u25fd"],"\ue21b","\udbba\udf6f",["white_medium_small_square"],0,29],"25fe":[["\u25fe\ufe0f","\u25fe"],"\ue21a","\udbba\udf70",["black_medium_small_square"],1,0],2600:[["\u2600\ufe0f","\u2600"],"\ue04a","\udbb8\udc00",["sunny"],1,1],2601:[["\u2601\ufe0f","\u2601"],"\ue049","\udbb8\udc01",["cloud"],1,2],"260e":[["\u260e\ufe0f","\u260e"],"\ue009","\udbb9\udd23",["phone","telephone"],1,3],2611:[["\u2611\ufe0f","\u2611"],"","\udbba\udf8b",["ballot_box_with_check"],1,4],2614:[["\u2614\ufe0f","\u2614"],"\ue04b","\udbb8\udc02",["umbrella"],1,5],2615:[["\u2615\ufe0f","\u2615"],"\ue045","\udbba\udd81",["coffee"],1,6],"261d":[["\u261d\ufe0f","\u261d"],"\ue00f","\udbba\udf98",["point_up"],1,7],"263a":[["\u263a\ufe0f","\u263a"],"\ue414","\udbb8\udf36",["relaxed"],1,8],2648:[["\u2648\ufe0f","\u2648"],"\ue23f","\udbb8\udc2b",["aries"],1,9],2649:[["\u2649\ufe0f","\u2649"],"\ue240","\udbb8\udc2c",["taurus"],1,10],"264a":[["\u264a\ufe0f","\u264a"],"\ue241","\udbb8\udc2d",["gemini"],1,11],"264b":[["\u264b\ufe0f","\u264b"],"\ue242","\udbb8\udc2e",["cancer"],1,12],"264c":[["\u264c\ufe0f","\u264c"],"\ue243","\udbb8\udc2f",["leo"],1,13],"264d":[["\u264d\ufe0f","\u264d"],"\ue244","\udbb8\udc30",["virgo"],1,14],"264e":[["\u264e\ufe0f","\u264e"],"\ue245","\udbb8\udc31",["libra"],1,15],"264f":[["\u264f\ufe0f","\u264f"],"\ue246","\udbb8\udc32",["scorpius"],1,16],2650:[["\u2650\ufe0f","\u2650"],"\ue247","\udbb8\udc33",["sagittarius"],1,17],2651:[["\u2651\ufe0f","\u2651"],"\ue248","\udbb8\udc34",["capricorn"],1,18],2652:[["\u2652\ufe0f","\u2652"],"\ue249","\udbb8\udc35",["aquarius"],1,19],2653:[["\u2653\ufe0f","\u2653"],"\ue24a","\udbb8\udc36",["pisces"],1,20],2660:[["\u2660\ufe0f","\u2660"],"\ue20e","\udbba\udf1b",["spades"],1,21],2663:[["\u2663\ufe0f","\u2663"],"\ue20f","\udbba\udf1d",["clubs"],1,22],2665:[["\u2665\ufe0f","\u2665"],"\ue20c","\udbba\udf1a",["hearts"],1,23],2666:[["\u2666\ufe0f","\u2666"],"\ue20d","\udbba\udf1c",["diamonds"],1,24],2668:[["\u2668\ufe0f","\u2668"],"\ue123","\udbb9\udffa",["hotsprings"],1,25],"267b":[["\u267b\ufe0f","\u267b"],"","\udbba\udf2c",["recycle"],1,26],"267f":[["\u267f\ufe0f","\u267f"],"\ue20a","\udbba\udf20",["wheelchair"],1,27],2693:[["\u2693\ufe0f","\u2693"],"\ue202","\udbb9\udcc1",["anchor"],1,28],"26a0":[["\u26a0\ufe0f","\u26a0"],"\ue252","\udbba\udf23",["warning"],1,29],"26a1":[["\u26a1\ufe0f","\u26a1"],"\ue13d","\udbb8\udc04",["zap"],2,0],"26aa":[["\u26aa\ufe0f","\u26aa"],"\ue219","\udbba\udf65",["white_circle"],2,1],"26ab":[["\u26ab\ufe0f","\u26ab"],"\ue219","\udbba\udf66",["black_circle"],2,2],"26bd":[["\u26bd\ufe0f","\u26bd"],"\ue018","\udbb9\udfd4",["soccer"],2,3],"26be":[["\u26be\ufe0f","\u26be"],"\ue016","\udbb9\udfd1",["baseball"],2,4],"26c4":[["\u26c4\ufe0f","\u26c4"],"\ue048","\udbb8\udc03",["snowman"],2,5],"26c5":[["\u26c5\ufe0f","\u26c5"],"\ue04a\ue049","\udbb8\udc0f",["partly_sunny"],2,6],"26ce":[["\u26ce"],"\ue24b","\udbb8\udc37",["ophiuchus"],2,7],"26d4":[["\u26d4\ufe0f","\u26d4"],"\ue137","\udbba\udf26",["no_entry"],2,8],"26ea":[["\u26ea\ufe0f","\u26ea"],"\ue037","\udbb9\udcbb",["church"],2,9],"26f2":[["\u26f2\ufe0f","\u26f2"],"\ue121","\udbb9\udcbc",["fountain"],2,10],"26f3":[["\u26f3\ufe0f","\u26f3"],"\ue014","\udbb9\udfd2",["golf"],2,11],"26f5":[["\u26f5\ufe0f","\u26f5"],"\ue01c","\udbb9\udfea",["boat","sailboat"],2,12],"26fa":[["\u26fa\ufe0f","\u26fa"],"\ue122","\udbb9\udffb",["tent"],2,13],"26fd":[["\u26fd\ufe0f","\u26fd"],"\ue03a","\udbb9\udff5",["fuelpump"],2,14],2702:[["\u2702\ufe0f","\u2702"],"\ue313","\udbb9\udd3e",["scissors"],2,15],2705:[["\u2705"],"","\udbba\udf4a",["white_check_mark"],2,16],2708:[["\u2708\ufe0f","\u2708"],"\ue01d","\udbb9\udfe9",["airplane"],2,17],2709:[["\u2709\ufe0f","\u2709"],"\ue103","\udbb9\udd29",["email","envelope"],2,18],"270a":[["\u270a"],"\ue010","\udbba\udf93",["fist"],2,19],"270b":[["\u270b"],"\ue012","\udbba\udf95",["hand","raised_hand"],2,20],"270c":[["\u270c\ufe0f","\u270c"],"\ue011","\udbba\udf94",["v"],2,21],"270f":[["\u270f\ufe0f","\u270f"],"\ue301","\udbb9\udd39",["pencil2"],2,22],2712:[["\u2712\ufe0f","\u2712"],"","\udbb9\udd36",["black_nib"],2,23],2714:[["\u2714\ufe0f","\u2714"],"","\udbba\udf49",["heavy_check_mark"],2,24],2716:[["\u2716\ufe0f","\u2716"],"\ue333","\udbba\udf53",["heavy_multiplication_x"],2,25],2728:[["\u2728"],"\ue32e","\udbba\udf60",["sparkles"],2,26],2733:[["\u2733\ufe0f","\u2733"],"\ue206","\udbba\udf62",["eight_spoked_asterisk"],2,27],2734:[["\u2734\ufe0f","\u2734"],"\ue205","\udbba\udf61",["eight_pointed_black_star"],2,28],2744:[["\u2744\ufe0f","\u2744"],"","\udbb8\udc0e",["snowflake"],2,29],2747:[["\u2747\ufe0f","\u2747"],"\ue32e","\udbba\udf77",["sparkle"],3,0],"274c":[["\u274c"],"\ue333","\udbba\udf45",["x"],3,1],"274e":[["\u274e"],"\ue333","\udbba\udf46",["negative_squared_cross_mark"],3,2],2753:[["\u2753"],"\ue020","\udbba\udf09",["question"],3,3],2754:[["\u2754"],"\ue336","\udbba\udf0a",["grey_question"],3,4],2755:[["\u2755"],"\ue337","\udbba\udf0b",["grey_exclamation"],3,5],2757:[["\u2757\ufe0f","\u2757"],"\ue021","\udbba\udf04",["exclamation","heavy_exclamation_mark"],3,6],2764:[["\u2764\ufe0f","\u2764"],"\ue022","\udbba\udf0c",["heart"],3,7,"<3"],2795:[["\u2795"],"","\udbba\udf51",["heavy_plus_sign"],3,8],2796:[["\u2796"],"","\udbba\udf52",["heavy_minus_sign"],3,9],2797:[["\u2797"],"","\udbba\udf54",["heavy_division_sign"],3,10],"27a1":[["\u27a1\ufe0f","\u27a1"],"\ue234","\udbba\udefa",["arrow_right"],3,11],"27b0":[["\u27b0"],"","\udbba\udf08",["curly_loop"],3,12],"27bf":[["\u27bf"],"\ue211","\udbba\udc2b",["loop"],3,13],2934:[["\u2934\ufe0f","\u2934"],"\ue236","\udbba\udef4",["arrow_heading_up"],3,14],2935:[["\u2935\ufe0f","\u2935"],"\ue238","\udbba\udef5",["arrow_heading_down"],3,15],"2b05":[["\u2b05\ufe0f","\u2b05"],"\ue235","\udbba\udefb",["arrow_left"],3,16],"2b06":[["\u2b06\ufe0f","\u2b06"],"\ue232","\udbba\udef8",["arrow_up"],3,17],"2b07":[["\u2b07\ufe0f","\u2b07"],"\ue233","\udbba\udef9",["arrow_down"],3,18],"2b1b":[["\u2b1b\ufe0f","\u2b1b"],"\ue21a","\udbba\udf6c",["black_large_square"],3,19],"2b1c":[["\u2b1c\ufe0f","\u2b1c"],"\ue21b","\udbba\udf6b",["white_large_square"],3,20],"2b50":[["\u2b50\ufe0f","\u2b50"],"\ue32f","\udbba\udf68",["star"],3,21],"2b55":[["\u2b55\ufe0f","\u2b55"],"\ue332","\udbba\udf44",["o"],3,22],3030:[["\u3030"],"","\udbba\udf07",["wavy_dash"],3,23],"303d":[["\u303d\ufe0f","\u303d"],"\ue12c","\udbba\udc1b",["part_alternation_mark"],3,24],3297:[["\u3297\ufe0f","\u3297"],"\ue30d","\udbba\udf43",["congratulations"],3,25],3299:[["\u3299\ufe0f","\u3299"],"\ue315","\udbba\udf2b",["secret"],3,26],"1f004":[["\ud83c\udc04\ufe0f","\ud83c\udc04"],"\ue12d","\udbba\udc0b",["mahjong"],3,27],"1f0cf":[["\ud83c\udccf"],"","\udbba\udc12",["black_joker"],3,28],"1f170":[["\ud83c\udd70"],"\ue532","\udbb9\udd0b",["a"],3,29],"1f171":[["\ud83c\udd71"],"\ue533","\udbb9\udd0c",["b"],4,0],"1f17e":[["\ud83c\udd7e"],"\ue535","\udbb9\udd0e",["o2"],4,1],"1f17f":[["\ud83c\udd7f\ufe0f","\ud83c\udd7f"],"\ue14f","\udbb9\udff6",["parking"],4,2],"1f18e":[["\ud83c\udd8e"],"\ue534","\udbb9\udd0d",["ab"],4,3],"1f191":[["\ud83c\udd91"],"","\udbba\udf84",["cl"],4,4],"1f192":[["\ud83c\udd92"],"\ue214","\udbba\udf38",["cool"],4,5],"1f193":[["\ud83c\udd93"],"","\udbba\udf21",["free"],4,6],"1f194":[["\ud83c\udd94"],"\ue229","\udbba\udf81",["id"],4,7],"1f195":[["\ud83c\udd95"],"\ue212","\udbba\udf36",["new"],4,8],"1f196":[["\ud83c\udd96"],"","\udbba\udf28",["ng"],4,9],"1f197":[["\ud83c\udd97"],"\ue24d","\udbba\udf27",["ok"],4,10],"1f198":[["\ud83c\udd98"],"","\udbba\udf4f",["sos"],4,11],"1f199":[["\ud83c\udd99"],"\ue213","\udbba\udf37",["up"],4,12],"1f19a":[["\ud83c\udd9a"],"\ue12e","\udbba\udf32",["vs"],4,13],"1f201":[["\ud83c\ude01"],"\ue203","\udbba\udf24",["koko"],4,14],"1f202":[["\ud83c\ude02"],"\ue228","\udbba\udf3f",["sa"],4,15],"1f21a":[["\ud83c\ude1a\ufe0f","\ud83c\ude1a"],"\ue216","\udbba\udf3a",["u7121"],4,16],"1f22f":[["\ud83c\ude2f\ufe0f","\ud83c\ude2f"],"\ue22c","\udbba\udf40",["u6307"],4,17],"1f232":[["\ud83c\ude32"],"","\udbba\udf2e",["u7981"],4,18],"1f233":[["\ud83c\ude33"],"\ue22b","\udbba\udf2f",["u7a7a"],4,19],"1f234":[["\ud83c\ude34"],"","\udbba\udf30",["u5408"],4,20],"1f235":[["\ud83c\ude35"],"\ue22a","\udbba\udf31",["u6e80"],4,21],"1f236":[["\ud83c\ude36"],"\ue215","\udbba\udf39",["u6709"],4,22],"1f237":[["\ud83c\ude37"],"\ue217","\udbba\udf3b",["u6708"],4,23],"1f238":[["\ud83c\ude38"],"\ue218","\udbba\udf3c",["u7533"],4,24],"1f239":[["\ud83c\ude39"],"\ue227","\udbba\udf3e",["u5272"],4,25],"1f23a":[["\ud83c\ude3a"],"\ue22d","\udbba\udf41",["u55b6"],4,26],"1f250":[["\ud83c\ude50"],"\ue226","\udbba\udf3d",["ideograph_advantage"],4,27],"1f251":[["\ud83c\ude51"],"","\udbba\udf50",["accept"],4,28],"1f300":[["\ud83c\udf00"],"\ue443","\udbb8\udc05",["cyclone"],4,29],"1f301":[["\ud83c\udf01"],"","\udbb8\udc06",["foggy"],5,0],"1f302":[["\ud83c\udf02"],"\ue43c","\udbb8\udc07",["closed_umbrella"],5,1],"1f303":[["\ud83c\udf03"],"\ue44b","\udbb8\udc08",["night_with_stars"],5,2],"1f304":[["\ud83c\udf04"],"\ue04d","\udbb8\udc09",["sunrise_over_mountains"],5,3],"1f305":[["\ud83c\udf05"],"\ue449","\udbb8\udc0a",["sunrise"],5,4],"1f306":[["\ud83c\udf06"],"\ue146","\udbb8\udc0b",["city_sunset"],5,5],"1f307":[["\ud83c\udf07"],"\ue44a","\udbb8\udc0c",["city_sunrise"],5,6],"1f308":[["\ud83c\udf08"],"\ue44c","\udbb8\udc0d",["rainbow"],5,7],"1f309":[["\ud83c\udf09"],"\ue44b","\udbb8\udc10",["bridge_at_night"],5,8],"1f30a":[["\ud83c\udf0a"],"\ue43e","\udbb8\udc38",["ocean"],5,9],"1f30b":[["\ud83c\udf0b"],"","\udbb8\udc3a",["volcano"],5,10],"1f30c":[["\ud83c\udf0c"],"\ue44b","\udbb8\udc3b",["milky_way"],5,11],"1f30d":[["\ud83c\udf0d"],"","",["earth_africa"],5,12],"1f30e":[["\ud83c\udf0e"],"","",["earth_americas"],5,13],"1f30f":[["\ud83c\udf0f"],"","\udbb8\udc39",["earth_asia"],5,14],"1f310":[["\ud83c\udf10"],"","",["globe_with_meridians"],5,15],"1f311":[["\ud83c\udf11"],"","\udbb8\udc11",["new_moon"],5,16],"1f312":[["\ud83c\udf12"],"","",["waxing_crescent_moon"],5,17],"1f313":[["\ud83c\udf13"],"\ue04c","\udbb8\udc13",["first_quarter_moon"],5,18],"1f314":[["\ud83c\udf14"],"\ue04c","\udbb8\udc12",["moon","waxing_gibbous_moon"],5,19],"1f315":[["\ud83c\udf15"],"","\udbb8\udc15",["full_moon"],5,20],"1f316":[["\ud83c\udf16"],"","",["waning_gibbous_moon"],5,21],"1f317":[["\ud83c\udf17"],"","",["last_quarter_moon"],5,22],"1f318":[["\ud83c\udf18"],"","",["waning_crescent_moon"],5,23],"1f319":[["\ud83c\udf19"],"\ue04c","\udbb8\udc14",["crescent_moon"],5,24],"1f31a":[["\ud83c\udf1a"],"","",["new_moon_with_face"],5,25],"1f31b":[["\ud83c\udf1b"],"\ue04c","\udbb8\udc16",["first_quarter_moon_with_face"],5,26],"1f31c":[["\ud83c\udf1c"],"","",["last_quarter_moon_with_face"],5,27],"1f31d":[["\ud83c\udf1d"],"","",["full_moon_with_face"],5,28],"1f31e":[["\ud83c\udf1e"],"","",["sun_with_face"],5,29],"1f31f":[["\ud83c\udf1f"],"\ue335","\udbba\udf69",["star2"],6,0],"1f320":[["\ud83c\udf20"],"","\udbba\udf6a",["stars"],6,1],"1f330":[["\ud83c\udf30"],"","\udbb8\udc4c",["chestnut"],6,2],"1f331":[["\ud83c\udf31"],"\ue110","\udbb8\udc3e",["seedling"],6,3],"1f332":[["\ud83c\udf32"],"","",["evergreen_tree"],6,4],"1f333":[["\ud83c\udf33"],"","",["deciduous_tree"],6,5],"1f334":[["\ud83c\udf34"],"\ue307","\udbb8\udc47",["palm_tree"],6,6],"1f335":[["\ud83c\udf35"],"\ue308","\udbb8\udc48",["cactus"],6,7],"1f337":[["\ud83c\udf37"],"\ue304","\udbb8\udc3d",["tulip"],6,8],"1f338":[["\ud83c\udf38"],"\ue030","\udbb8\udc40",["cherry_blossom"],6,9],"1f339":[["\ud83c\udf39"],"\ue032","\udbb8\udc41",["rose"],6,10],"1f33a":[["\ud83c\udf3a"],"\ue303","\udbb8\udc45",["hibiscus"],6,11],"1f33b":[["\ud83c\udf3b"],"\ue305","\udbb8\udc46",["sunflower"],6,12],"1f33c":[["\ud83c\udf3c"],"\ue305","\udbb8\udc4d",["blossom"],6,13],"1f33d":[["\ud83c\udf3d"],"","\udbb8\udc4a",["corn"],6,14],"1f33e":[["\ud83c\udf3e"],"\ue444","\udbb8\udc49",["ear_of_rice"],6,15],"1f33f":[["\ud83c\udf3f"],"\ue110","\udbb8\udc4e",["herb"],6,16],"1f340":[["\ud83c\udf40"],"\ue110","\udbb8\udc3c",["four_leaf_clover"],6,17],"1f341":[["\ud83c\udf41"],"\ue118","\udbb8\udc3f",["maple_leaf"],6,18],"1f342":[["\ud83c\udf42"],"\ue119","\udbb8\udc42",["fallen_leaf"],6,19],"1f343":[["\ud83c\udf43"],"\ue447","\udbb8\udc43",["leaves"],6,20],"1f344":[["\ud83c\udf44"],"","\udbb8\udc4b",["mushroom"],6,21],"1f345":[["\ud83c\udf45"],"\ue349","\udbb8\udc55",["tomato"],6,22],"1f346":[["\ud83c\udf46"],"\ue34a","\udbb8\udc56",["eggplant"],6,23],"1f347":[["\ud83c\udf47"],"","\udbb8\udc59",["grapes"],6,24],"1f348":[["\ud83c\udf48"],"","\udbb8\udc57",["melon"],6,25],"1f349":[["\ud83c\udf49"],"\ue348","\udbb8\udc54",["watermelon"],6,26],"1f34a":[["\ud83c\udf4a"],"\ue346","\udbb8\udc52",["tangerine"],6,27],"1f34b":[["\ud83c\udf4b"],"","",["lemon"],6,28],"1f34c":[["\ud83c\udf4c"],"","\udbb8\udc50",["banana"],6,29],"1f34d":[["\ud83c\udf4d"],"","\udbb8\udc58",["pineapple"],7,0],"1f34e":[["\ud83c\udf4e"],"\ue345","\udbb8\udc51",["apple"],7,1],"1f34f":[["\ud83c\udf4f"],"\ue345","\udbb8\udc5b",["green_apple"],7,2],"1f350":[["\ud83c\udf50"],"","",["pear"],7,3],"1f351":[["\ud83c\udf51"],"","\udbb8\udc5a",["peach"],7,4],"1f352":[["\ud83c\udf52"],"","\udbb8\udc4f",["cherries"],7,5],"1f353":[["\ud83c\udf53"],"\ue347","\udbb8\udc53",["strawberry"],7,6],"1f354":[["\ud83c\udf54"],"\ue120","\udbba\udd60",["hamburger"],7,7],"1f355":[["\ud83c\udf55"],"","\udbba\udd75",["pizza"],7,8],"1f356":[["\ud83c\udf56"],"","\udbba\udd72",["meat_on_bone"],7,9],"1f357":[["\ud83c\udf57"],"","\udbba\udd76",["poultry_leg"],7,10],"1f358":[["\ud83c\udf58"],"\ue33d","\udbba\udd69",["rice_cracker"],7,11],"1f359":[["\ud83c\udf59"],"\ue342","\udbba\udd61",["rice_ball"],7,12],"1f35a":[["\ud83c\udf5a"],"\ue33e","\udbba\udd6a",["rice"],7,13],"1f35b":[["\ud83c\udf5b"],"\ue341","\udbba\udd6c",["curry"],7,14],"1f35c":[["\ud83c\udf5c"],"\ue340","\udbba\udd63",["ramen"],7,15],"1f35d":[["\ud83c\udf5d"],"\ue33f","\udbba\udd6b",["spaghetti"],7,16],"1f35e":[["\ud83c\udf5e"],"\ue339","\udbba\udd64",["bread"],7,17],"1f35f":[["\ud83c\udf5f"],"\ue33b","\udbba\udd67",["fries"],7,18],"1f360":[["\ud83c\udf60"],"","\udbba\udd74",["sweet_potato"],7,19],"1f361":[["\ud83c\udf61"],"\ue33c","\udbba\udd68",["dango"],7,20],"1f362":[["\ud83c\udf62"],"\ue343","\udbba\udd6d",["oden"],7,21],"1f363":[["\ud83c\udf63"],"\ue344","\udbba\udd6e",["sushi"],7,22],"1f364":[["\ud83c\udf64"],"","\udbba\udd7f",["fried_shrimp"],7,23],"1f365":[["\ud83c\udf65"],"","\udbba\udd73",["fish_cake"],7,24],"1f366":[["\ud83c\udf66"],"\ue33a","\udbba\udd66",["icecream"],7,25],"1f367":[["\ud83c\udf67"],"\ue43f","\udbba\udd71",["shaved_ice"],7,26],"1f368":[["\ud83c\udf68"],"","\udbba\udd77",["ice_cream"],7,27],"1f369":[["\ud83c\udf69"],"","\udbba\udd78",["doughnut"],7,28],"1f36a":[["\ud83c\udf6a"],"","\udbba\udd79",["cookie"],7,29],"1f36b":[["\ud83c\udf6b"],"","\udbba\udd7a",["chocolate_bar"],8,0],"1f36c":[["\ud83c\udf6c"],"","\udbba\udd7b",["candy"],8,1],"1f36d":[["\ud83c\udf6d"],"","\udbba\udd7c",["lollipop"],8,2],"1f36e":[["\ud83c\udf6e"],"","\udbba\udd7d",["custard"],8,3],"1f36f":[["\ud83c\udf6f"],"","\udbba\udd7e",["honey_pot"],8,4],"1f370":[["\ud83c\udf70"],"\ue046","\udbba\udd62",["cake"],8,5],"1f371":[["\ud83c\udf71"],"\ue34c","\udbba\udd6f",["bento"],8,6],"1f372":[["\ud83c\udf72"],"\ue34d","\udbba\udd70",["stew"],8,7],"1f373":[["\ud83c\udf73"],"\ue147","\udbba\udd65",["egg"],8,8],"1f374":[["\ud83c\udf74"],"\ue043","\udbba\udd80",["fork_and_knife"],8,9],"1f375":[["\ud83c\udf75"],"\ue338","\udbba\udd84",["tea"],8,10],"1f376":[["\ud83c\udf76"],"\ue30b","\udbba\udd85",["sake"],8,11],"1f377":[["\ud83c\udf77"],"\ue044","\udbba\udd86",["wine_glass"],8,12],"1f378":[["\ud83c\udf78"],"\ue044","\udbba\udd82",["cocktail"],8,13],"1f379":[["\ud83c\udf79"],"\ue044","\udbba\udd88",["tropical_drink"],8,14],"1f37a":[["\ud83c\udf7a"],"\ue047","\udbba\udd83",["beer"],8,15],"1f37b":[["\ud83c\udf7b"],"\ue30c","\udbba\udd87",["beers"],8,16],"1f37c":[["\ud83c\udf7c"],"","",["baby_bottle"],8,17],"1f380":[["\ud83c\udf80"],"\ue314","\udbb9\udd0f",["ribbon"],8,18],"1f381":[["\ud83c\udf81"],"\ue112","\udbb9\udd10",["gift"],8,19],"1f382":[["\ud83c\udf82"],"\ue34b","\udbb9\udd11",["birthday"],8,20],"1f383":[["\ud83c\udf83"],"\ue445","\udbb9\udd1f",["jack_o_lantern"],8,21],"1f384":[["\ud83c\udf84"],"\ue033","\udbb9\udd12",["christmas_tree"],8,22],"1f385":[["\ud83c\udf85"],"\ue448","\udbb9\udd13",["santa"],8,23],"1f386":[["\ud83c\udf86"],"\ue117","\udbb9\udd15",["fireworks"],8,24],"1f387":[["\ud83c\udf87"],"\ue440","\udbb9\udd1d",["sparkler"],8,25],"1f388":[["\ud83c\udf88"],"\ue310","\udbb9\udd16",["balloon"],8,26],"1f389":[["\ud83c\udf89"],"\ue312","\udbb9\udd17",["tada"],8,27],"1f38a":[["\ud83c\udf8a"],"","\udbb9\udd20",["confetti_ball"],8,28],"1f38b":[["\ud83c\udf8b"],"","\udbb9\udd21",["tanabata_tree"],8,29],"1f38c":[["\ud83c\udf8c"],"\ue143","\udbb9\udd14",["crossed_flags"],9,0],"1f38d":[["\ud83c\udf8d"],"\ue436","\udbb9\udd18",["bamboo"],9,1],"1f38e":[["\ud83c\udf8e"],"\ue438","\udbb9\udd19",["dolls"],9,2],"1f38f":[["\ud83c\udf8f"],"\ue43b","\udbb9\udd1c",["flags"],9,3],"1f390":[["\ud83c\udf90"],"\ue442","\udbb9\udd1e",["wind_chime"],9,4],"1f391":[["\ud83c\udf91"],"\ue446","\udbb8\udc17",["rice_scene"],9,5],"1f392":[["\ud83c\udf92"],"\ue43a","\udbb9\udd1b",["school_satchel"],9,6],"1f393":[["\ud83c\udf93"],"\ue439","\udbb9\udd1a",["mortar_board"],9,7],"1f3a0":[["\ud83c\udfa0"],"","\udbb9\udffc",["carousel_horse"],9,8],"1f3a1":[["\ud83c\udfa1"],"\ue124","\udbb9\udffd",["ferris_wheel"],9,9],"1f3a2":[["\ud83c\udfa2"],"\ue433","\udbb9\udffe",["roller_coaster"],9,10],"1f3a3":[["\ud83c\udfa3"],"\ue019","\udbb9\udfff",["fishing_pole_and_fish"],9,11],"1f3a4":[["\ud83c\udfa4"],"\ue03c","\udbba\udc00",["microphone"],9,12],"1f3a5":[["\ud83c\udfa5"],"\ue03d","\udbba\udc01",["movie_camera"],9,13],"1f3a6":[["\ud83c\udfa6"],"\ue507","\udbba\udc02",["cinema"],9,14],"1f3a7":[["\ud83c\udfa7"],"\ue30a","\udbba\udc03",["headphones"],9,15],"1f3a8":[["\ud83c\udfa8"],"\ue502","\udbba\udc04",["art"],9,16],"1f3a9":[["\ud83c\udfa9"],"\ue503","\udbba\udc05",["tophat"],9,17],"1f3aa":[["\ud83c\udfaa"],"","\udbba\udc06",["circus_tent"],9,18],"1f3ab":[["\ud83c\udfab"],"\ue125","\udbba\udc07",["ticket"],9,19],"1f3ac":[["\ud83c\udfac"],"\ue324","\udbba\udc08",["clapper"],9,20],"1f3ad":[["\ud83c\udfad"],"\ue503","\udbba\udc09",["performing_arts"],9,21],"1f3ae":[["\ud83c\udfae"],"","\udbba\udc0a",["video_game"],9,22],"1f3af":[["\ud83c\udfaf"],"\ue130","\udbba\udc0c",["dart"],9,23],"1f3b0":[["\ud83c\udfb0"],"\ue133","\udbba\udc0d",["slot_machine"],9,24],"1f3b1":[["\ud83c\udfb1"],"\ue42c","\udbba\udc0e",["8ball"],9,25],"1f3b2":[["\ud83c\udfb2"],"","\udbba\udc0f",["game_die"],9,26],"1f3b3":[["\ud83c\udfb3"],"","\udbba\udc10",["bowling"],9,27],"1f3b4":[["\ud83c\udfb4"],"","\udbba\udc11",["flower_playing_cards"],9,28],"1f3b5":[["\ud83c\udfb5"],"\ue03e","\udbba\udc13",["musical_note"],9,29],"1f3b6":[["\ud83c\udfb6"],"\ue326","\udbba\udc14",["notes"],10,0],"1f3b7":[["\ud83c\udfb7"],"\ue040","\udbba\udc15",["saxophone"],10,1],"1f3b8":[["\ud83c\udfb8"],"\ue041","\udbba\udc16",["guitar"],10,2],"1f3b9":[["\ud83c\udfb9"],"","\udbba\udc17",["musical_keyboard"],10,3],"1f3ba":[["\ud83c\udfba"],"\ue042","\udbba\udc18",["trumpet"],10,4],"1f3bb":[["\ud83c\udfbb"],"","\udbba\udc19",["violin"],10,5],"1f3bc":[["\ud83c\udfbc"],"\ue326","\udbba\udc1a",["musical_score"],10,6],"1f3bd":[["\ud83c\udfbd"],"","\udbb9\udfd0",["running_shirt_with_sash"],10,7],"1f3be":[["\ud83c\udfbe"],"\ue015","\udbb9\udfd3",["tennis"],10,8],"1f3bf":[["\ud83c\udfbf"],"\ue013","\udbb9\udfd5",["ski"],10,9],"1f3c0":[["\ud83c\udfc0"],"\ue42a","\udbb9\udfd6",["basketball"],10,10],"1f3c1":[["\ud83c\udfc1"],"\ue132","\udbb9\udfd7",["checkered_flag"],10,11],"1f3c2":[["\ud83c\udfc2"],"","\udbb9\udfd8",["snowboarder"],10,12],"1f3c3":[["\ud83c\udfc3"],"\ue115","\udbb9\udfd9",["runner","running"],10,13],"1f3c4":[["\ud83c\udfc4"],"\ue017","\udbb9\udfda",["surfer"],10,14],"1f3c6":[["\ud83c\udfc6"],"\ue131","\udbb9\udfdb",["trophy"],10,15],"1f3c7":[["\ud83c\udfc7"],"","",["horse_racing"],10,16],"1f3c8":[["\ud83c\udfc8"],"\ue42b","\udbb9\udfdd",["football"],10,17],"1f3c9":[["\ud83c\udfc9"],"","",["rugby_football"],10,18],"1f3ca":[["\ud83c\udfca"],"\ue42d","\udbb9\udfde",["swimmer"],10,19],"1f3e0":[["\ud83c\udfe0"],"\ue036","\udbb9\udcb0",["house"],10,20],
"1f3e1":[["\ud83c\udfe1"],"\ue036","\udbb9\udcb1",["house_with_garden"],10,21],"1f3e2":[["\ud83c\udfe2"],"\ue038","\udbb9\udcb2",["office"],10,22],"1f3e3":[["\ud83c\udfe3"],"\ue153","\udbb9\udcb3",["post_office"],10,23],"1f3e4":[["\ud83c\udfe4"],"","",["european_post_office"],10,24],"1f3e5":[["\ud83c\udfe5"],"\ue155","\udbb9\udcb4",["hospital"],10,25],"1f3e6":[["\ud83c\udfe6"],"\ue14d","\udbb9\udcb5",["bank"],10,26],"1f3e7":[["\ud83c\udfe7"],"\ue154","\udbb9\udcb6",["atm"],10,27],"1f3e8":[["\ud83c\udfe8"],"\ue158","\udbb9\udcb7",["hotel"],10,28],"1f3e9":[["\ud83c\udfe9"],"\ue501","\udbb9\udcb8",["love_hotel"],10,29],"1f3ea":[["\ud83c\udfea"],"\ue156","\udbb9\udcb9",["convenience_store"],11,0],"1f3eb":[["\ud83c\udfeb"],"\ue157","\udbb9\udcba",["school"],11,1],"1f3ec":[["\ud83c\udfec"],"\ue504","\udbb9\udcbd",["department_store"],11,2],"1f3ed":[["\ud83c\udfed"],"\ue508","\udbb9\udcc0",["factory"],11,3],"1f3ee":[["\ud83c\udfee"],"\ue30b","\udbb9\udcc2",["izakaya_lantern","lantern"],11,4],"1f3ef":[["\ud83c\udfef"],"\ue505","\udbb9\udcbe",["japanese_castle"],11,5],"1f3f0":[["\ud83c\udff0"],"\ue506","\udbb9\udcbf",["european_castle"],11,6],"1f400":[["\ud83d\udc00"],"","",["rat"],11,7],"1f401":[["\ud83d\udc01"],"","",["mouse2"],11,8],"1f402":[["\ud83d\udc02"],"","",["ox"],11,9],"1f403":[["\ud83d\udc03"],"","",["water_buffalo"],11,10],"1f404":[["\ud83d\udc04"],"","",["cow2"],11,11],"1f405":[["\ud83d\udc05"],"","",["tiger2"],11,12],"1f406":[["\ud83d\udc06"],"","",["leopard"],11,13],"1f407":[["\ud83d\udc07"],"","",["rabbit2"],11,14],"1f408":[["\ud83d\udc08"],"","",["cat2"],11,15],"1f409":[["\ud83d\udc09"],"","",["dragon"],11,16],"1f40a":[["\ud83d\udc0a"],"","",["crocodile"],11,17],"1f40b":[["\ud83d\udc0b"],"","",["whale2"],11,18],"1f40c":[["\ud83d\udc0c"],"","\udbb8\uddb9",["snail"],11,19],"1f40d":[["\ud83d\udc0d"],"\ue52d","\udbb8\uddd3",["snake"],11,20],"1f40e":[["\ud83d\udc0e"],"\ue134","\udbb9\udfdc",["racehorse"],11,21],"1f40f":[["\ud83d\udc0f"],"","",["ram"],11,22],"1f410":[["\ud83d\udc10"],"","",["goat"],11,23],"1f411":[["\ud83d\udc11"],"\ue529","\udbb8\uddcf",["sheep"],11,24],"1f412":[["\ud83d\udc12"],"\ue528","\udbb8\uddce",["monkey"],11,25],"1f413":[["\ud83d\udc13"],"","",["rooster"],11,26],"1f414":[["\ud83d\udc14"],"\ue52e","\udbb8\uddd4",["chicken"],11,27],"1f415":[["\ud83d\udc15"],"","",["dog2"],11,28],"1f416":[["\ud83d\udc16"],"","",["pig2"],11,29],"1f417":[["\ud83d\udc17"],"\ue52f","\udbb8\uddd5",["boar"],12,0],"1f418":[["\ud83d\udc18"],"\ue526","\udbb8\uddcc",["elephant"],12,1],"1f419":[["\ud83d\udc19"],"\ue10a","\udbb8\uddc5",["octopus"],12,2],"1f41a":[["\ud83d\udc1a"],"\ue441","\udbb8\uddc6",["shell"],12,3],"1f41b":[["\ud83d\udc1b"],"\ue525","\udbb8\uddcb",["bug"],12,4],"1f41c":[["\ud83d\udc1c"],"","\udbb8\uddda",["ant"],12,5],"1f41d":[["\ud83d\udc1d"],"","\udbb8\udde1",["bee","honeybee"],12,6],"1f41e":[["\ud83d\udc1e"],"","\udbb8\udde2",["beetle"],12,7],"1f41f":[["\ud83d\udc1f"],"\ue019","\udbb8\uddbd",["fish"],12,8],"1f420":[["\ud83d\udc20"],"\ue522","\udbb8\uddc9",["tropical_fish"],12,9],"1f421":[["\ud83d\udc21"],"\ue019","\udbb8\uddd9",["blowfish"],12,10],"1f422":[["\ud83d\udc22"],"","\udbb8\udddc",["turtle"],12,11],"1f423":[["\ud83d\udc23"],"\ue523","\udbb8\udddd",["hatching_chick"],12,12],"1f424":[["\ud83d\udc24"],"\ue523","\udbb8\uddba",["baby_chick"],12,13],"1f425":[["\ud83d\udc25"],"\ue523","\udbb8\uddbb",["hatched_chick"],12,14],"1f426":[["\ud83d\udc26"],"\ue521","\udbb8\uddc8",["bird"],12,15],"1f427":[["\ud83d\udc27"],"\ue055","\udbb8\uddbc",["penguin"],12,16],"1f428":[["\ud83d\udc28"],"\ue527","\udbb8\uddcd",["koala"],12,17],"1f429":[["\ud83d\udc29"],"\ue052","\udbb8\uddd8",["poodle"],12,18],"1f42a":[["\ud83d\udc2a"],"","",["dromedary_camel"],12,19],"1f42b":[["\ud83d\udc2b"],"\ue530","\udbb8\uddd6",["camel"],12,20],"1f42c":[["\ud83d\udc2c"],"\ue520","\udbb8\uddc7",["dolphin","flipper"],12,21],"1f42d":[["\ud83d\udc2d"],"\ue053","\udbb8\uddc2",["mouse"],12,22],"1f42e":[["\ud83d\udc2e"],"\ue52b","\udbb8\uddd1",["cow"],12,23],"1f42f":[["\ud83d\udc2f"],"\ue050","\udbb8\uddc0",["tiger"],12,24],"1f430":[["\ud83d\udc30"],"\ue52c","\udbb8\uddd2",["rabbit"],12,25],"1f431":[["\ud83d\udc31"],"\ue04f","\udbb8\uddb8",["cat"],12,26],"1f432":[["\ud83d\udc32"],"","\udbb8\uddde",["dragon_face"],12,27],"1f433":[["\ud83d\udc33"],"\ue054","\udbb8\uddc3",["whale"],12,28],"1f434":[["\ud83d\udc34"],"\ue01a","\udbb8\uddbe",["horse"],12,29],"1f435":[["\ud83d\udc35"],"\ue109","\udbb8\uddc4",["monkey_face"],13,0],"1f436":[["\ud83d\udc36"],"\ue052","\udbb8\uddb7",["dog"],13,1],"1f437":[["\ud83d\udc37"],"\ue10b","\udbb8\uddbf",["pig"],13,2],"1f438":[["\ud83d\udc38"],"\ue531","\udbb8\uddd7",["frog"],13,3],"1f439":[["\ud83d\udc39"],"\ue524","\udbb8\uddca",["hamster"],13,4],"1f43a":[["\ud83d\udc3a"],"\ue52a","\udbb8\uddd0",["wolf"],13,5],"1f43b":[["\ud83d\udc3b"],"\ue051","\udbb8\uddc1",["bear"],13,6],"1f43c":[["\ud83d\udc3c"],"","\udbb8\udddf",["panda_face"],13,7],"1f43d":[["\ud83d\udc3d"],"\ue10b","\udbb8\udde0",["pig_nose"],13,8],"1f43e":[["\ud83d\udc3e"],"\ue536","\udbb8\udddb",["feet","paw_prints"],13,9],"1f440":[["\ud83d\udc40"],"\ue419","\udbb8\udd90",["eyes"],13,10],"1f442":[["\ud83d\udc42"],"\ue41b","\udbb8\udd91",["ear"],13,11],"1f443":[["\ud83d\udc43"],"\ue41a","\udbb8\udd92",["nose"],13,12],"1f444":[["\ud83d\udc44"],"\ue41c","\udbb8\udd93",["lips"],13,13],"1f445":[["\ud83d\udc45"],"\ue409","\udbb8\udd94",["tongue"],13,14],"1f446":[["\ud83d\udc46"],"\ue22e","\udbba\udf99",["point_up_2"],13,15],"1f447":[["\ud83d\udc47"],"\ue22f","\udbba\udf9a",["point_down"],13,16],"1f448":[["\ud83d\udc48"],"\ue230","\udbba\udf9b",["point_left"],13,17],"1f449":[["\ud83d\udc49"],"\ue231","\udbba\udf9c",["point_right"],13,18],"1f44a":[["\ud83d\udc4a"],"\ue00d","\udbba\udf96",["facepunch","punch"],13,19],"1f44b":[["\ud83d\udc4b"],"\ue41e","\udbba\udf9d",["wave"],13,20],"1f44c":[["\ud83d\udc4c"],"\ue420","\udbba\udf9f",["ok_hand"],13,21],"1f44d":[["\ud83d\udc4d"],"\ue00e","\udbba\udf97",["+1","thumbsup"],13,22],"1f44e":[["\ud83d\udc4e"],"\ue421","\udbba\udfa0",["-1","thumbsdown"],13,23],"1f44f":[["\ud83d\udc4f"],"\ue41f","\udbba\udf9e",["clap"],13,24],"1f450":[["\ud83d\udc50"],"\ue422","\udbba\udfa1",["open_hands"],13,25],"1f451":[["\ud83d\udc51"],"\ue10e","\udbb9\udcd1",["crown"],13,26],"1f452":[["\ud83d\udc52"],"\ue318","\udbb9\udcd4",["womans_hat"],13,27],"1f453":[["\ud83d\udc53"],"","\udbb9\udcce",["eyeglasses"],13,28],"1f454":[["\ud83d\udc54"],"\ue302","\udbb9\udcd3",["necktie"],13,29],"1f455":[["\ud83d\udc55"],"\ue006","\udbb9\udccf",["shirt","tshirt"],14,0],"1f456":[["\ud83d\udc56"],"","\udbb9\udcd0",["jeans"],14,1],"1f457":[["\ud83d\udc57"],"\ue319","\udbb9\udcd5",["dress"],14,2],"1f458":[["\ud83d\udc58"],"\ue321","\udbb9\udcd9",["kimono"],14,3],"1f459":[["\ud83d\udc59"],"\ue322","\udbb9\udcda",["bikini"],14,4],"1f45a":[["\ud83d\udc5a"],"\ue006","\udbb9\udcdb",["womans_clothes"],14,5],"1f45b":[["\ud83d\udc5b"],"","\udbb9\udcdc",["purse"],14,6],"1f45c":[["\ud83d\udc5c"],"\ue323","\udbb9\udcf0",["handbag"],14,7],"1f45d":[["\ud83d\udc5d"],"","\udbb9\udcf1",["pouch"],14,8],"1f45e":[["\ud83d\udc5e"],"\ue007","\udbb9\udccc",["mans_shoe","shoe"],14,9],"1f45f":[["\ud83d\udc5f"],"\ue007","\udbb9\udccd",["athletic_shoe"],14,10],"1f460":[["\ud83d\udc60"],"\ue13e","\udbb9\udcd6",["high_heel"],14,11],"1f461":[["\ud83d\udc61"],"\ue31a","\udbb9\udcd7",["sandal"],14,12],"1f462":[["\ud83d\udc62"],"\ue31b","\udbb9\udcd8",["boot"],14,13],"1f463":[["\ud83d\udc63"],"\ue536","\udbb9\udd53",["footprints"],14,14],"1f464":[["\ud83d\udc64"],"","\udbb8\udd9a",["bust_in_silhouette"],14,15],"1f465":[["\ud83d\udc65"],"","",["busts_in_silhouette"],14,16],"1f466":[["\ud83d\udc66"],"\ue001","\udbb8\udd9b",["boy"],14,17],"1f467":[["\ud83d\udc67"],"\ue002","\udbb8\udd9c",["girl"],14,18],"1f468":[["\ud83d\udc68"],"\ue004","\udbb8\udd9d",["man"],14,19],"1f469":[["\ud83d\udc69"],"\ue005","\udbb8\udd9e",["woman"],14,20],"1f46a":[["\ud83d\udc6a"],"","\udbb8\udd9f",["family"],14,21],"1f46b":[["\ud83d\udc6b"],"\ue428","\udbb8\udda0",["couple"],14,22],"1f46c":[["\ud83d\udc6c"],"","",["two_men_holding_hands"],14,23],"1f46d":[["\ud83d\udc6d"],"","",["two_women_holding_hands"],14,24],"1f46e":[["\ud83d\udc6e"],"\ue152","\udbb8\udda1",["cop"],14,25],"1f46f":[["\ud83d\udc6f"],"\ue429","\udbb8\udda2",["dancers"],14,26],"1f470":[["\ud83d\udc70"],"","\udbb8\udda3",["bride_with_veil"],14,27],"1f471":[["\ud83d\udc71"],"\ue515","\udbb8\udda4",["person_with_blond_hair"],14,28],"1f472":[["\ud83d\udc72"],"\ue516","\udbb8\udda5",["man_with_gua_pi_mao"],14,29],"1f473":[["\ud83d\udc73"],"\ue517","\udbb8\udda6",["man_with_turban"],15,0],"1f474":[["\ud83d\udc74"],"\ue518","\udbb8\udda7",["older_man"],15,1],"1f475":[["\ud83d\udc75"],"\ue519","\udbb8\udda8",["older_woman"],15,2],"1f476":[["\ud83d\udc76"],"\ue51a","\udbb8\udda9",["baby"],15,3],"1f477":[["\ud83d\udc77"],"\ue51b","\udbb8\uddaa",["construction_worker"],15,4],"1f478":[["\ud83d\udc78"],"\ue51c","\udbb8\uddab",["princess"],15,5],"1f479":[["\ud83d\udc79"],"","\udbb8\uddac",["japanese_ogre"],15,6],"1f47a":[["\ud83d\udc7a"],"","\udbb8\uddad",["japanese_goblin"],15,7],"1f47b":[["\ud83d\udc7b"],"\ue11b","\udbb8\uddae",["ghost"],15,8],"1f47c":[["\ud83d\udc7c"],"\ue04e","\udbb8\uddaf",["angel"],15,9],"1f47d":[["\ud83d\udc7d"],"\ue10c","\udbb8\uddb0",["alien"],15,10],"1f47e":[["\ud83d\udc7e"],"\ue12b","\udbb8\uddb1",["space_invader"],15,11],"1f47f":[["\ud83d\udc7f"],"\ue11a","\udbb8\uddb2",["imp"],15,12],"1f480":[["\ud83d\udc80"],"\ue11c","\udbb8\uddb3",["skull"],15,13],"1f481":[["\ud83d\udc81"],"\ue253","\udbb8\uddb4",["information_desk_person"],15,14],"1f482":[["\ud83d\udc82"],"\ue51e","\udbb8\uddb5",["guardsman"],15,15],"1f483":[["\ud83d\udc83"],"\ue51f","\udbb8\uddb6",["dancer"],15,16],"1f484":[["\ud83d\udc84"],"\ue31c","\udbb8\udd95",["lipstick"],15,17],"1f485":[["\ud83d\udc85"],"\ue31d","\udbb8\udd96",["nail_care"],15,18],"1f486":[["\ud83d\udc86"],"\ue31e","\udbb8\udd97",["massage"],15,19],"1f487":[["\ud83d\udc87"],"\ue31f","\udbb8\udd98",["haircut"],15,20],"1f488":[["\ud83d\udc88"],"\ue320","\udbb8\udd99",["barber"],15,21],"1f489":[["\ud83d\udc89"],"\ue13b","\udbb9\udd09",["syringe"],15,22],"1f48a":[["\ud83d\udc8a"],"\ue30f","\udbb9\udd0a",["pill"],15,23],"1f48b":[["\ud83d\udc8b"],"\ue003","\udbba\udc23",["kiss"],15,24],"1f48c":[["\ud83d\udc8c"],"\ue103\ue328","\udbba\udc24",["love_letter"],15,25],"1f48d":[["\ud83d\udc8d"],"\ue034","\udbba\udc25",["ring"],15,26],"1f48e":[["\ud83d\udc8e"],"\ue035","\udbba\udc26",["gem"],15,27],"1f48f":[["\ud83d\udc8f"],"\ue111","\udbba\udc27",["couplekiss"],15,28],"1f490":[["\ud83d\udc90"],"\ue306","\udbba\udc28",["bouquet"],15,29],"1f491":[["\ud83d\udc91"],"\ue425","\udbba\udc29",["couple_with_heart"],16,0],"1f492":[["\ud83d\udc92"],"\ue43d","\udbba\udc2a",["wedding"],16,1],"1f493":[["\ud83d\udc93"],"\ue327","\udbba\udf0d",["heartbeat"],16,2],"1f494":[["\ud83d\udc94"],"\ue023","\udbba\udf0e",["broken_heart"],16,3,"</3"],"1f495":[["\ud83d\udc95"],"\ue327","\udbba\udf0f",["two_hearts"],16,4],"1f496":[["\ud83d\udc96"],"\ue327","\udbba\udf10",["sparkling_heart"],16,5],"1f497":[["\ud83d\udc97"],"\ue328","\udbba\udf11",["heartpulse"],16,6],"1f498":[["\ud83d\udc98"],"\ue329","\udbba\udf12",["cupid"],16,7],"1f499":[["\ud83d\udc99"],"\ue32a","\udbba\udf13",["blue_heart"],16,8,"<3"],"1f49a":[["\ud83d\udc9a"],"\ue32b","\udbba\udf14",["green_heart"],16,9,"<3"],"1f49b":[["\ud83d\udc9b"],"\ue32c","\udbba\udf15",["yellow_heart"],16,10,"<3"],"1f49c":[["\ud83d\udc9c"],"\ue32d","\udbba\udf16",["purple_heart"],16,11,"<3"],"1f49d":[["\ud83d\udc9d"],"\ue437","\udbba\udf17",["gift_heart"],16,12],"1f49e":[["\ud83d\udc9e"],"\ue327","\udbba\udf18",["revolving_hearts"],16,13],"1f49f":[["\ud83d\udc9f"],"\ue204","\udbba\udf19",["heart_decoration"],16,14],"1f4a0":[["\ud83d\udca0"],"","\udbba\udf55",["diamond_shape_with_a_dot_inside"],16,15],"1f4a1":[["\ud83d\udca1"],"\ue10f","\udbba\udf56",["bulb"],16,16],"1f4a2":[["\ud83d\udca2"],"\ue334","\udbba\udf57",["anger"],16,17],"1f4a3":[["\ud83d\udca3"],"\ue311","\udbba\udf58",["bomb"],16,18],"1f4a4":[["\ud83d\udca4"],"\ue13c","\udbba\udf59",["zzz"],16,19],"1f4a5":[["\ud83d\udca5"],"","\udbba\udf5a",["boom","collision"],16,20],"1f4a6":[["\ud83d\udca6"],"\ue331","\udbba\udf5b",["sweat_drops"],16,21],"1f4a7":[["\ud83d\udca7"],"\ue331","\udbba\udf5c",["droplet"],16,22],"1f4a8":[["\ud83d\udca8"],"\ue330","\udbba\udf5d",["dash"],16,23],"1f4a9":[["\ud83d\udca9"],"\ue05a","\udbb9\udcf4",["hankey","poop","shit"],16,24],"1f4aa":[["\ud83d\udcaa"],"\ue14c","\udbba\udf5e",["muscle"],16,25],"1f4ab":[["\ud83d\udcab"],"\ue407","\udbba\udf5f",["dizzy"],16,26],"1f4ac":[["\ud83d\udcac"],"","\udbb9\udd32",["speech_balloon"],16,27],"1f4ad":[["\ud83d\udcad"],"","",["thought_balloon"],16,28],"1f4ae":[["\ud83d\udcae"],"","\udbba\udf7a",["white_flower"],16,29],"1f4af":[["\ud83d\udcaf"],"","\udbba\udf7b",["100"],17,0],"1f4b0":[["\ud83d\udcb0"],"\ue12f","\udbb9\udcdd",["moneybag"],17,1],"1f4b1":[["\ud83d\udcb1"],"\ue149","\udbb9\udcde",["currency_exchange"],17,2],"1f4b2":[["\ud83d\udcb2"],"\ue12f","\udbb9\udce0",["heavy_dollar_sign"],17,3],"1f4b3":[["\ud83d\udcb3"],"","\udbb9\udce1",["credit_card"],17,4],"1f4b4":[["\ud83d\udcb4"],"","\udbb9\udce2",["yen"],17,5],"1f4b5":[["\ud83d\udcb5"],"\ue12f","\udbb9\udce3",["dollar"],17,6],"1f4b6":[["\ud83d\udcb6"],"","",["euro"],17,7],"1f4b7":[["\ud83d\udcb7"],"","",["pound"],17,8],"1f4b8":[["\ud83d\udcb8"],"","\udbb9\udce4",["money_with_wings"],17,9],"1f4b9":[["\ud83d\udcb9"],"\ue14a","\udbb9\udcdf",["chart"],17,10],"1f4ba":[["\ud83d\udcba"],"\ue11f","\udbb9\udd37",["seat"],17,11],"1f4bb":[["\ud83d\udcbb"],"\ue00c","\udbb9\udd38",["computer"],17,12],"1f4bc":[["\ud83d\udcbc"],"\ue11e","\udbb9\udd3b",["briefcase"],17,13],"1f4bd":[["\ud83d\udcbd"],"\ue316","\udbb9\udd3c",["minidisc"],17,14],"1f4be":[["\ud83d\udcbe"],"\ue316","\udbb9\udd3d",["floppy_disk"],17,15],"1f4bf":[["\ud83d\udcbf"],"\ue126","\udbba\udc1d",["cd"],17,16],"1f4c0":[["\ud83d\udcc0"],"\ue127","\udbba\udc1e",["dvd"],17,17],"1f4c1":[["\ud83d\udcc1"],"","\udbb9\udd43",["file_folder"],17,18],"1f4c2":[["\ud83d\udcc2"],"","\udbb9\udd44",["open_file_folder"],17,19],"1f4c3":[["\ud83d\udcc3"],"\ue301","\udbb9\udd40",["page_with_curl"],17,20],"1f4c4":[["\ud83d\udcc4"],"\ue301","\udbb9\udd41",["page_facing_up"],17,21],"1f4c5":[["\ud83d\udcc5"],"","\udbb9\udd42",["date"],17,22],"1f4c6":[["\ud83d\udcc6"],"","\udbb9\udd49",["calendar"],17,23],"1f4c7":[["\ud83d\udcc7"],"\ue148","\udbb9\udd4d",["card_index"],17,24],"1f4c8":[["\ud83d\udcc8"],"\ue14a","\udbb9\udd4b",["chart_with_upwards_trend"],17,25],"1f4c9":[["\ud83d\udcc9"],"","\udbb9\udd4c",["chart_with_downwards_trend"],17,26],"1f4ca":[["\ud83d\udcca"],"\ue14a","\udbb9\udd4a",["bar_chart"],17,27],"1f4cb":[["\ud83d\udccb"],"\ue301","\udbb9\udd48",["clipboard"],17,28],"1f4cc":[["\ud83d\udccc"],"","\udbb9\udd4e",["pushpin"],17,29],"1f4cd":[["\ud83d\udccd"],"","\udbb9\udd3f",["round_pushpin"],18,0],"1f4ce":[["\ud83d\udcce"],"","\udbb9\udd3a",["paperclip"],18,1],"1f4cf":[["\ud83d\udccf"],"","\udbb9\udd50",["straight_ruler"],18,2],"1f4d0":[["\ud83d\udcd0"],"","\udbb9\udd51",["triangular_ruler"],18,3],"1f4d1":[["\ud83d\udcd1"],"\ue301","\udbb9\udd52",["bookmark_tabs"],18,4],"1f4d2":[["\ud83d\udcd2"],"\ue148","\udbb9\udd4f",["ledger"],18,5],"1f4d3":[["\ud83d\udcd3"],"\ue148","\udbb9\udd45",["notebook"],18,6],"1f4d4":[["\ud83d\udcd4"],"\ue148","\udbb9\udd47",["notebook_with_decorative_cover"],18,7],"1f4d5":[["\ud83d\udcd5"],"\ue148","\udbb9\udd02",["closed_book"],18,8],"1f4d6":[["\ud83d\udcd6"],"\ue148","\udbb9\udd46",["book","open_book"],18,9],"1f4d7":[["\ud83d\udcd7"],"\ue148","\udbb9\udcff",["green_book"],18,10],"1f4d8":[["\ud83d\udcd8"],"\ue148","\udbb9\udd00",["blue_book"],18,11],"1f4d9":[["\ud83d\udcd9"],"\ue148","\udbb9\udd01",["orange_book"],18,12],"1f4da":[["\ud83d\udcda"],"\ue148","\udbb9\udd03",["books"],18,13],"1f4db":[["\ud83d\udcdb"],"","\udbb9\udd04",["name_badge"],18,14],"1f4dc":[["\ud83d\udcdc"],"","\udbb9\udcfd",["scroll"],18,15],"1f4dd":[["\ud83d\udcdd"],"\ue301","\udbb9\udd27",["memo","pencil"],18,16],"1f4de":[["\ud83d\udcde"],"\ue009","\udbb9\udd24",["telephone_receiver"],18,17],"1f4df":[["\ud83d\udcdf"],"","\udbb9\udd22",["pager"],18,18],"1f4e0":[["\ud83d\udce0"],"\ue00b","\udbb9\udd28",["fax"],18,19],"1f4e1":[["\ud83d\udce1"],"\ue14b","\udbb9\udd31",["satellite"],18,20],"1f4e2":[["\ud83d\udce2"],"\ue142","\udbb9\udd2f",["loudspeaker"],18,21],"1f4e3":[["\ud83d\udce3"],"\ue317","\udbb9\udd30",["mega"],18,22],"1f4e4":[["\ud83d\udce4"],"","\udbb9\udd33",["outbox_tray"],18,23],"1f4e5":[["\ud83d\udce5"],"","\udbb9\udd34",["inbox_tray"],18,24],"1f4e6":[["\ud83d\udce6"],"\ue112","\udbb9\udd35",["package"],18,25],"1f4e7":[["\ud83d\udce7"],"\ue103","\udbba\udf92",["e-mail"],18,26],"1f4e8":[["\ud83d\udce8"],"\ue103","\udbb9\udd2a",["incoming_envelope"],18,27],"1f4e9":[["\ud83d\udce9"],"\ue103","\udbb9\udd2b",["envelope_with_arrow"],18,28],"1f4ea":[["\ud83d\udcea"],"\ue101","\udbb9\udd2c",["mailbox_closed"],18,29],"1f4eb":[["\ud83d\udceb"],"\ue101","\udbb9\udd2d",["mailbox"],19,0],"1f4ec":[["\ud83d\udcec"],"","",["mailbox_with_mail"],19,1],"1f4ed":[["\ud83d\udced"],"","",["mailbox_with_no_mail"],19,2],"1f4ee":[["\ud83d\udcee"],"\ue102","\udbb9\udd2e",["postbox"],19,3],"1f4ef":[["\ud83d\udcef"],"","",["postal_horn"],19,4],"1f4f0":[["\ud83d\udcf0"],"","\udbba\udc22",["newspaper"],19,5],"1f4f1":[["\ud83d\udcf1"],"\ue00a","\udbb9\udd25",["iphone"],19,6],"1f4f2":[["\ud83d\udcf2"],"\ue104","\udbb9\udd26",["calling"],19,7],"1f4f3":[["\ud83d\udcf3"],"\ue250","\udbba\udc39",["vibration_mode"],19,8],"1f4f4":[["\ud83d\udcf4"],"\ue251","\udbba\udc3a",["mobile_phone_off"],19,9],"1f4f5":[["\ud83d\udcf5"],"","",["no_mobile_phones"],19,10],"1f4f6":[["\ud83d\udcf6"],"\ue20b","\udbba\udc38",["signal_strength"],19,11],"1f4f7":[["\ud83d\udcf7"],"\ue008","\udbb9\udcef",["camera"],19,12],"1f4f9":[["\ud83d\udcf9"],"\ue03d","\udbb9\udcf9",["video_camera"],19,13],"1f4fa":[["\ud83d\udcfa"],"\ue12a","\udbba\udc1c",["tv"],19,14],"1f4fb":[["\ud83d\udcfb"],"\ue128","\udbba\udc1f",["radio"],19,15],"1f4fc":[["\ud83d\udcfc"],"\ue129","\udbba\udc20",["vhs"],19,16],"1f500":[["\ud83d\udd00"],"","",["twisted_rightwards_arrows"],19,17],"1f501":[["\ud83d\udd01"],"","",["repeat"],19,18],"1f502":[["\ud83d\udd02"],"","",["repeat_one"],19,19],"1f503":[["\ud83d\udd03"],"","\udbba\udf91",["arrows_clockwise"],19,20],"1f504":[["\ud83d\udd04"],"","",["arrows_counterclockwise"],19,21],"1f505":[["\ud83d\udd05"],"","",["low_brightness"],19,22],"1f506":[["\ud83d\udd06"],"","",["high_brightness"],19,23],"1f507":[["\ud83d\udd07"],"","",["mute"],19,24],"1f508":[["\ud83d\udd08"],"","",["speaker"],19,25],"1f509":[["\ud83d\udd09"],"","",["sound"],19,26],"1f50a":[["\ud83d\udd0a"],"\ue141","\udbba\udc21",["loud_sound"],19,27],"1f50b":[["\ud83d\udd0b"],"","\udbb9\udcfc",["battery"],19,28],"1f50c":[["\ud83d\udd0c"],"","\udbb9\udcfe",["electric_plug"],19,29],"1f50d":[["\ud83d\udd0d"],"\ue114","\udbba\udf85",["mag"],20,0],"1f50e":[["\ud83d\udd0e"],"\ue114","\udbba\udf8d",["mag_right"],20,1],"1f50f":[["\ud83d\udd0f"],"\ue144","\udbba\udf90",["lock_with_ink_pen"],20,2],"1f510":[["\ud83d\udd10"],"\ue144","\udbba\udf8a",["closed_lock_with_key"],20,3],"1f511":[["\ud83d\udd11"],"\ue03f","\udbba\udf82",["key"],20,4],"1f512":[["\ud83d\udd12"],"\ue144","\udbba\udf86",["lock"],20,5],"1f513":[["\ud83d\udd13"],"\ue145","\udbba\udf87",["unlock"],20,6],"1f514":[["\ud83d\udd14"],"\ue325","\udbb9\udcf2",["bell"],20,7],"1f515":[["\ud83d\udd15"],"","",["no_bell"],20,8],"1f516":[["\ud83d\udd16"],"","\udbba\udf8f",["bookmark"],20,9],"1f517":[["\ud83d\udd17"],"","\udbba\udf4b",["link"],20,10],"1f518":[["\ud83d\udd18"],"","\udbba\udf8c",["radio_button"],20,11],"1f519":[["\ud83d\udd19"],"\ue235","\udbba\udf8e",["back"],20,12],"1f51a":[["\ud83d\udd1a"],"","\udbb8\udc1a",["end"],20,13],"1f51b":[["\ud83d\udd1b"],"","\udbb8\udc19",["on"],20,14],"1f51c":[["\ud83d\udd1c"],"","\udbb8\udc18",["soon"],20,15],"1f51d":[["\ud83d\udd1d"],"\ue24c","\udbba\udf42",["top"],20,16],"1f51e":[["\ud83d\udd1e"],"\ue207","\udbba\udf25",["underage"],20,17],"1f51f":[["\ud83d\udd1f"],"","\udbba\udc3b",["keycap_ten"],20,18],"1f520":[["\ud83d\udd20"],"","\udbba\udf7c",["capital_abcd"],20,19],"1f521":[["\ud83d\udd21"],"","\udbba\udf7d",["abcd"],20,20],"1f522":[["\ud83d\udd22"],"","\udbba\udf7e",["1234"],20,21],"1f523":[["\ud83d\udd23"],"","\udbba\udf7f",["symbols"],20,22],"1f524":[["\ud83d\udd24"],"","\udbba\udf80",["abc"],20,23],"1f525":[["\ud83d\udd25"],"\ue11d","\udbb9\udcf6",["fire"],20,24],"1f526":[["\ud83d\udd26"],"","\udbb9\udcfb",["flashlight"],20,25],"1f527":[["\ud83d\udd27"],"","\udbb9\udcc9",["wrench"],20,26],"1f528":[["\ud83d\udd28"],"\ue116","\udbb9\udcca",["hammer"],20,27],"1f529":[["\ud83d\udd29"],"","\udbb9\udccb",["nut_and_bolt"],20,28],"1f52a":[["\ud83d\udd2a"],"","\udbb9\udcfa",["hocho","knife"],20,29],"1f52b":[["\ud83d\udd2b"],"\ue113","\udbb9\udcf5",["gun"],21,0],"1f52c":[["\ud83d\udd2c"],"","",["microscope"],21,1],"1f52d":[["\ud83d\udd2d"],"","",["telescope"],21,2],"1f52e":[["\ud83d\udd2e"],"\ue23e","\udbb9\udcf7",["crystal_ball"],21,3],"1f52f":[["\ud83d\udd2f"],"\ue23e","\udbb9\udcf8",["six_pointed_star"],21,4],"1f530":[["\ud83d\udd30"],"\ue209","\udbb8\udc44",["beginner"],21,5],"1f531":[["\ud83d\udd31"],"\ue031","\udbb9\udcd2",["trident"],21,6],"1f532":[["\ud83d\udd32"],"\ue21a","\udbba\udf64",["black_square_button"],21,7],"1f533":[["\ud83d\udd33"],"\ue21b","\udbba\udf67",["white_square_button"],21,8],"1f534":[["\ud83d\udd34"],"\ue219","\udbba\udf63",["red_circle"],21,9],"1f535":[["\ud83d\udd35"],"\ue21a","\udbba\udf64",["large_blue_circle"],21,10],"1f536":[["\ud83d\udd36"],"\ue21b","\udbba\udf73",["large_orange_diamond"],21,11],"1f537":[["\ud83d\udd37"],"\ue21b","\udbba\udf74",["large_blue_diamond"],21,12],"1f538":[["\ud83d\udd38"],"\ue21b","\udbba\udf75",["small_orange_diamond"],21,13],"1f539":[["\ud83d\udd39"],"\ue21b","\udbba\udf76",["small_blue_diamond"],21,14],"1f53a":[["\ud83d\udd3a"],"","\udbba\udf78",["small_red_triangle"],21,15],"1f53b":[["\ud83d\udd3b"],"","\udbba\udf79",["small_red_triangle_down"],21,16],"1f53c":[["\ud83d\udd3c"],"","\udbba\udf01",["arrow_up_small"],21,17],"1f53d":[["\ud83d\udd3d"],"","\udbba\udf00",["arrow_down_small"],21,18],"1f550":[["\ud83d\udd50"],"\ue024","\udbb8\udc1e",["clock1"],21,19],"1f551":[["\ud83d\udd51"],"\ue025","\udbb8\udc1f",["clock2"],21,20],"1f552":[["\ud83d\udd52"],"\ue026","\udbb8\udc20",["clock3"],21,21],"1f553":[["\ud83d\udd53"],"\ue027","\udbb8\udc21",["clock4"],21,22],"1f554":[["\ud83d\udd54"],"\ue028","\udbb8\udc22",["clock5"],21,23],"1f555":[["\ud83d\udd55"],"\ue029","\udbb8\udc23",["clock6"],21,24],"1f556":[["\ud83d\udd56"],"\ue02a","\udbb8\udc24",["clock7"],21,25],"1f557":[["\ud83d\udd57"],"\ue02b","\udbb8\udc25",["clock8"],21,26],"1f558":[["\ud83d\udd58"],"\ue02c","\udbb8\udc26",["clock9"],21,27],"1f559":[["\ud83d\udd59"],"\ue02d","\udbb8\udc27",["clock10"],21,28],"1f55a":[["\ud83d\udd5a"],"\ue02e","\udbb8\udc28",["clock11"],21,29],"1f55b":[["\ud83d\udd5b"],"\ue02f","\udbb8\udc29",["clock12"],22,0],"1f55c":[["\ud83d\udd5c"],"","",["clock130"],22,1],"1f55d":[["\ud83d\udd5d"],"","",["clock230"],22,2],"1f55e":[["\ud83d\udd5e"],"","",["clock330"],22,3],"1f55f":[["\ud83d\udd5f"],"","",["clock430"],22,4],"1f560":[["\ud83d\udd60"],"","",["clock530"],22,5],"1f561":[["\ud83d\udd61"],"","",["clock630"],22,6],"1f562":[["\ud83d\udd62"],"","",["clock730"],22,7],"1f563":[["\ud83d\udd63"],"","",["clock830"],22,8],"1f564":[["\ud83d\udd64"],"","",["clock930"],22,9],"1f565":[["\ud83d\udd65"],"","",["clock1030"],22,10],"1f566":[["\ud83d\udd66"],"","",["clock1130"],22,11],"1f567":[["\ud83d\udd67"],"","",["clock1230"],22,12],"1f5fb":[["\ud83d\uddfb"],"\ue03b","\udbb9\udcc3",["mount_fuji"],22,13],"1f5fc":[["\ud83d\uddfc"],"\ue509","\udbb9\udcc4",["tokyo_tower"],22,14],"1f5fd":[["\ud83d\uddfd"],"\ue51d","\udbb9\udcc6",["statue_of_liberty"],22,15],"1f5fe":[["\ud83d\uddfe"],"","\udbb9\udcc7",["japan"],22,16],"1f5ff":[["\ud83d\uddff"],"","\udbb9\udcc8",["moyai"],22,17],"1f600":[["\ud83d\ude00"],"","",["grinning"],22,18,":D"],"1f601":[["\ud83d\ude01"],"\ue404","\udbb8\udf33",["grin"],22,19],"1f602":[["\ud83d\ude02"],"\ue412","\udbb8\udf34",["joy"],22,20],"1f603":[["\ud83d\ude03"],"\ue057","\udbb8\udf30",["smiley"],22,21,":)"],"1f604":[["\ud83d\ude04"],"\ue415","\udbb8\udf38",["smile"],22,22,":)"],"1f605":[["\ud83d\ude05"],"\ue415\ue331","\udbb8\udf31",["sweat_smile"],22,23],"1f606":[["\ud83d\ude06"],"\ue40a","\udbb8\udf32",["satisfied"],22,24],"1f607":[["\ud83d\ude07"],"","",["innocent"],22,25],"1f608":[["\ud83d\ude08"],"","",["smiling_imp"],22,26],"1f609":[["\ud83d\ude09"],"\ue405","\udbb8\udf47",["wink"],22,27,";)"],"1f60a":[["\ud83d\ude0a"],"\ue056","\udbb8\udf35",["blush"],22,28],"1f60b":[["\ud83d\ude0b"],"\ue056","\udbb8\udf2b",["yum"],22,29],"1f60c":[["\ud83d\ude0c"],"\ue40a","\udbb8\udf3e",["relieved"],23,0],"1f60d":[["\ud83d\ude0d"],"\ue106","\udbb8\udf27",["heart_eyes"],23,1],"1f60e":[["\ud83d\ude0e"],"","",["sunglasses"],23,2],"1f60f":[["\ud83d\ude0f"],"\ue402","\udbb8\udf43",["smirk"],23,3],"1f610":[["\ud83d\ude10"],"","",["neutral_face"],23,4],"1f611":[["\ud83d\ude11"],"","",["expressionless"],23,5],"1f612":[["\ud83d\ude12"],"\ue40e","\udbb8\udf26",["unamused"],23,6],"1f613":[["\ud83d\ude13"],"\ue108","\udbb8\udf44",["sweat"],23,7],"1f614":[["\ud83d\ude14"],"\ue403","\udbb8\udf40",["pensive"],23,8],"1f615":[["\ud83d\ude15"],"","",["confused"],23,9],"1f616":[["\ud83d\ude16"],"\ue407","\udbb8\udf3f",["confounded"],23,10],"1f617":[["\ud83d\ude17"],"","",["kissing"],23,11],"1f618":[["\ud83d\ude18"],"\ue418","\udbb8\udf2c",["kissing_heart"],23,12],"1f619":[["\ud83d\ude19"],"","",["kissing_smiling_eyes"],23,13],"1f61a":[["\ud83d\ude1a"],"\ue417","\udbb8\udf2d",["kissing_closed_eyes"],23,14],"1f61b":[["\ud83d\ude1b"],"","",["stuck_out_tongue"],23,15,":p"],"1f61c":[["\ud83d\ude1c"],"\ue105","\udbb8\udf29",["stuck_out_tongue_winking_eye"],23,16,";p"],"1f61d":[["\ud83d\ude1d"],"\ue409","\udbb8\udf2a",["stuck_out_tongue_closed_eyes"],23,17],"1f61e":[["\ud83d\ude1e"],"\ue058","\udbb8\udf23",["disappointed"],23,18,":("],"1f61f":[["\ud83d\ude1f"],"","",["worried"],23,19],"1f620":[["\ud83d\ude20"],"\ue059","\udbb8\udf20",["angry"],23,20],"1f621":[["\ud83d\ude21"],"\ue416","\udbb8\udf3d",["rage"],23,21],"1f622":[["\ud83d\ude22"],"\ue413","\udbb8\udf39",["cry"],23,22,":'("],"1f623":[["\ud83d\ude23"],"\ue406","\udbb8\udf3c",["persevere"],23,23],"1f624":[["\ud83d\ude24"],"\ue404","\udbb8\udf28",["triumph"],23,24],"1f625":[["\ud83d\ude25"],"\ue401","\udbb8\udf45",["disappointed_relieved"],23,25],"1f626":[["\ud83d\ude26"],"","",["frowning"],23,26],"1f627":[["\ud83d\ude27"],"","",["anguished"],23,27],"1f628":[["\ud83d\ude28"],"\ue40b","\udbb8\udf3b",["fearful"],23,28],"1f629":[["\ud83d\ude29"],"\ue403","\udbb8\udf21",["weary"],23,29],"1f62a":[["\ud83d\ude2a"],"\ue408","\udbb8\udf42",["sleepy"],24,0],"1f62b":[["\ud83d\ude2b"],"\ue406","\udbb8\udf46",["tired_face"],24,1],"1f62c":[["\ud83d\ude2c"],"","",["grimacing"],24,2],"1f62d":[["\ud83d\ude2d"],"\ue411","\udbb8\udf3a",["sob"],24,3,":'("],"1f62e":[["\ud83d\ude2e"],"","",["open_mouth"],24,4],"1f62f":[["\ud83d\ude2f"],"","",["hushed"],24,5],"1f630":[["\ud83d\ude30"],"\ue40f","\udbb8\udf25",["cold_sweat"],24,6],"1f631":[["\ud83d\ude31"],"\ue107","\udbb8\udf41",["scream"],24,7],"1f632":[["\ud83d\ude32"],"\ue410","\udbb8\udf22",["astonished"],24,8],"1f633":[["\ud83d\ude33"],"\ue40d","\udbb8\udf2f",["flushed"],24,9],"1f634":[["\ud83d\ude34"],"","",["sleeping"],24,10],"1f635":[["\ud83d\ude35"],"\ue406","\udbb8\udf24",["dizzy_face"],24,11],"1f636":[["\ud83d\ude36"],"","",["no_mouth"],24,12],"1f637":[["\ud83d\ude37"],"\ue40c","\udbb8\udf2e",["mask"],24,13],"1f638":[["\ud83d\ude38"],"\ue404","\udbb8\udf49",["smile_cat"],24,14],"1f639":[["\ud83d\ude39"],"\ue412","\udbb8\udf4a",["joy_cat"],24,15],"1f63a":[["\ud83d\ude3a"],"\ue057","\udbb8\udf48",["smiley_cat"],24,16],"1f63b":[["\ud83d\ude3b"],"\ue106","\udbb8\udf4c",["heart_eyes_cat"],24,17],"1f63c":[["\ud83d\ude3c"],"\ue404","\udbb8\udf4f",["smirk_cat"],24,18],"1f63d":[["\ud83d\ude3d"],"\ue418","\udbb8\udf4b",["kissing_cat"],24,19],"1f63e":[["\ud83d\ude3e"],"\ue416","\udbb8\udf4e",["pouting_cat"],24,20],"1f63f":[["\ud83d\ude3f"],"\ue413","\udbb8\udf4d",["crying_cat_face"],24,21],"1f640":[["\ud83d\ude40"],"\ue403","\udbb8\udf50",["scream_cat"],24,22],"1f645":[["\ud83d\ude45"],"\ue423","\udbb8\udf51",["no_good"],24,23],"1f646":[["\ud83d\ude46"],"\ue424","\udbb8\udf52",["ok_woman"],24,24],"1f647":[["\ud83d\ude47"],"\ue426","\udbb8\udf53",["bow"],24,25],"1f648":[["\ud83d\ude48"],"","\udbb8\udf54",["see_no_evil"],24,26],"1f649":[["\ud83d\ude49"],"","\udbb8\udf56",["hear_no_evil"],24,27],"1f64a":[["\ud83d\ude4a"],"","\udbb8\udf55",["speak_no_evil"],24,28],"1f64b":[["\ud83d\ude4b"],"\ue012","\udbb8\udf57",["raising_hand"],24,29],"1f64c":[["\ud83d\ude4c"],"\ue427","\udbb8\udf58",["raised_hands"],25,0],"1f64d":[["\ud83d\ude4d"],"\ue403","\udbb8\udf59",["person_frowning"],25,1],"1f64e":[["\ud83d\ude4e"],"\ue416","\udbb8\udf5a",["person_with_pouting_face"],25,2],"1f64f":[["\ud83d\ude4f"],"\ue41d","\udbb8\udf5b",["pray"],25,3],"1f680":[["\ud83d\ude80"],"\ue10d","\udbb9\udfed",["rocket"],25,4],"1f681":[["\ud83d\ude81"],"","",["helicopter"],25,5],"1f682":[["\ud83d\ude82"],"","",["steam_locomotive"],25,6],"1f683":[["\ud83d\ude83"],"\ue01e","\udbb9\udfdf",["railway_car"],25,7],"1f684":[["\ud83d\ude84"],"\ue435","\udbb9\udfe2",["bullettrain_side"],25,8],"1f685":[["\ud83d\ude85"],"\ue01f","\udbb9\udfe3",["bullettrain_front"],25,9],"1f686":[["\ud83d\ude86"],"","",["train2"],25,10],"1f687":[["\ud83d\ude87"],"\ue434","\udbb9\udfe0",["metro"],25,11],"1f688":[["\ud83d\ude88"],"","",["light_rail"],25,12],"1f689":[["\ud83d\ude89"],"\ue039","\udbb9\udfec",["station"],25,13],"1f68a":[["\ud83d\ude8a"],"","",["tram"],25,14],"1f68b":[["\ud83d\ude8b"],"","",["train"],25,15],"1f68c":[["\ud83d\ude8c"],"\ue159","\udbb9\udfe6",["bus"],25,16],"1f68d":[["\ud83d\ude8d"],"","",["oncoming_bus"],25,17],"1f68e":[["\ud83d\ude8e"],"","",["trolleybus"],25,18],"1f68f":[["\ud83d\ude8f"],"\ue150","\udbb9\udfe7",["busstop"],25,19],"1f690":[["\ud83d\ude90"],"","",["minibus"],25,20],"1f691":[["\ud83d\ude91"],"\ue431","\udbb9\udff3",["ambulance"],25,21],"1f692":[["\ud83d\ude92"],"\ue430","\udbb9\udff2",["fire_engine"],25,22],"1f693":[["\ud83d\ude93"],"\ue432","\udbb9\udff4",["police_car"],25,23],"1f694":[["\ud83d\ude94"],"","",["oncoming_police_car"],25,24],"1f695":[["\ud83d\ude95"],"\ue15a","\udbb9\udfef",["taxi"],25,25],"1f696":[["\ud83d\ude96"],"","",["oncoming_taxi"],25,26],"1f697":[["\ud83d\ude97"],"\ue01b","\udbb9\udfe4",["car","red_car"],25,27],"1f698":[["\ud83d\ude98"],"","",["oncoming_automobile"],25,28],"1f699":[["\ud83d\ude99"],"\ue42e","\udbb9\udfe5",["blue_car"],25,29],"1f69a":[["\ud83d\ude9a"],"\ue42f","\udbb9\udff1",["truck"],26,0],"1f69b":[["\ud83d\ude9b"],"","",["articulated_lorry"],26,1],"1f69c":[["\ud83d\ude9c"],"","",["tractor"],26,2],"1f69d":[["\ud83d\ude9d"],"","",["monorail"],26,3],"1f69e":[["\ud83d\ude9e"],"","",["mountain_railway"],26,4],"1f69f":[["\ud83d\ude9f"],"","",["suspension_railway"],26,5],"1f6a0":[["\ud83d\udea0"],"","",["mountain_cableway"],26,6],"1f6a1":[["\ud83d\udea1"],"","",["aerial_tramway"],26,7],"1f6a2":[["\ud83d\udea2"],"\ue202","\udbb9\udfe8",["ship"],26,8],"1f6a3":[["\ud83d\udea3"],"","",["rowboat"],26,9],"1f6a4":[["\ud83d\udea4"],"\ue135","\udbb9\udfee",["speedboat"],26,10],"1f6a5":[["\ud83d\udea5"],"\ue14e","\udbb9\udff7",["traffic_light"],26,11],"1f6a6":[["\ud83d\udea6"],"","",["vertical_traffic_light"],26,12],"1f6a7":[["\ud83d\udea7"],"\ue137","\udbb9\udff8",["construction"],26,13],"1f6a8":[["\ud83d\udea8"],"\ue432","\udbb9\udff9",["rotating_light"],26,14],"1f6a9":[["\ud83d\udea9"],"","\udbba\udf22",["triangular_flag_on_post"],26,15],"1f6aa":[["\ud83d\udeaa"],"","\udbb9\udcf3",["door"],26,16],"1f6ab":[["\ud83d\udeab"],"","\udbba\udf48",["no_entry_sign"],26,17],"1f6ac":[["\ud83d\udeac"],"\ue30e","\udbba\udf1e",["smoking"],26,18],
"1f6ad":[["\ud83d\udead"],"\ue208","\udbba\udf1f",["no_smoking"],26,19],"1f6ae":[["\ud83d\udeae"],"","",["put_litter_in_its_place"],26,20],"1f6af":[["\ud83d\udeaf"],"","",["do_not_litter"],26,21],"1f6b0":[["\ud83d\udeb0"],"","",["potable_water"],26,22],"1f6b1":[["\ud83d\udeb1"],"","",["non-potable_water"],26,23],"1f6b2":[["\ud83d\udeb2"],"\ue136","\udbb9\udfeb",["bike"],26,24],"1f6b3":[["\ud83d\udeb3"],"","",["no_bicycles"],26,25],"1f6b4":[["\ud83d\udeb4"],"","",["bicyclist"],26,26],"1f6b5":[["\ud83d\udeb5"],"","",["mountain_bicyclist"],26,27],"1f6b6":[["\ud83d\udeb6"],"\ue201","\udbb9\udff0",["walking"],26,28],"1f6b7":[["\ud83d\udeb7"],"","",["no_pedestrians"],26,29],"1f6b8":[["\ud83d\udeb8"],"","",["children_crossing"],27,0],"1f6b9":[["\ud83d\udeb9"],"\ue138","\udbba\udf33",["mens"],27,1],"1f6ba":[["\ud83d\udeba"],"\ue139","\udbba\udf34",["womens"],27,2],"1f6bb":[["\ud83d\udebb"],"\ue151","\udbb9\udd06",["restroom"],27,3],"1f6bc":[["\ud83d\udebc"],"\ue13a","\udbba\udf35",["baby_symbol"],27,4],"1f6bd":[["\ud83d\udebd"],"\ue140","\udbb9\udd07",["toilet"],27,5],"1f6be":[["\ud83d\udebe"],"\ue309","\udbb9\udd08",["wc"],27,6],"1f6bf":[["\ud83d\udebf"],"","",["shower"],27,7],"1f6c0":[["\ud83d\udec0"],"\ue13f","\udbb9\udd05",["bath"],27,8],"1f6c1":[["\ud83d\udec1"],"","",["bathtub"],27,9],"1f6c2":[["\ud83d\udec2"],"","",["passport_control"],27,10],"1f6c3":[["\ud83d\udec3"],"","",["customs"],27,11],"1f6c4":[["\ud83d\udec4"],"","",["baggage_claim"],27,12],"1f6c5":[["\ud83d\udec5"],"","",["left_luggage"],27,13],"0023-20e3":[["#\ufe0f\u20e3","#\u20e3"],"\ue210","\udbba\udc2c",["hash"],27,14],"0030-20e3":[["0\ufe0f\u20e3","0\u20e3"],"\ue225","\udbba\udc37",["zero"],27,15],"0031-20e3":[["1\ufe0f\u20e3","1\u20e3"],"\ue21c","\udbba\udc2e",["one"],27,16],"0032-20e3":[["2\ufe0f\u20e3","2\u20e3"],"\ue21d","\udbba\udc2f",["two"],27,17],"0033-20e3":[["3\ufe0f\u20e3","3\u20e3"],"\ue21e","\udbba\udc30",["three"],27,18],"0034-20e3":[["4\ufe0f\u20e3","4\u20e3"],"\ue21f","\udbba\udc31",["four"],27,19],"0035-20e3":[["5\ufe0f\u20e3","5\u20e3"],"\ue220","\udbba\udc32",["five"],27,20],"0036-20e3":[["6\ufe0f\u20e3","6\u20e3"],"\ue221","\udbba\udc33",["six"],27,21],"0037-20e3":[["7\ufe0f\u20e3","7\u20e3"],"\ue222","\udbba\udc34",["seven"],27,22],"0038-20e3":[["8\ufe0f\u20e3","8\u20e3"],"\ue223","\udbba\udc35",["eight"],27,23],"0039-20e3":[["9\ufe0f\u20e3","9\u20e3"],"\ue224","\udbba\udc36",["nine"],27,24],"1f1e8-1f1f3":[["\ud83c\udde8\ud83c\uddf3"],"\ue513","\udbb9\udced",["cn"],27,25],"1f1e9-1f1ea":[["\ud83c\udde9\ud83c\uddea"],"\ue50e","\udbb9\udce8",["de"],27,26],"1f1ea-1f1f8":[["\ud83c\uddea\ud83c\uddf8"],"\ue511","\udbb9\udceb",["es"],27,27],"1f1eb-1f1f7":[["\ud83c\uddeb\ud83c\uddf7"],"\ue50d","\udbb9\udce7",["fr"],27,28],"1f1ec-1f1e7":[["\ud83c\uddec\ud83c\udde7"],"\ue510","\udbb9\udcea",["gb","uk"],27,29],"1f1ee-1f1f9":[["\ud83c\uddee\ud83c\uddf9"],"\ue50f","\udbb9\udce9",["it"],28,0],"1f1ef-1f1f5":[["\ud83c\uddef\ud83c\uddf5"],"\ue50b","\udbb9\udce5",["jp"],28,1],"1f1f0-1f1f7":[["\ud83c\uddf0\ud83c\uddf7"],"\ue514","\udbb9\udcee",["kr"],28,2],"1f1f7-1f1fa":[["\ud83c\uddf7\ud83c\uddfa"],"\ue512","\udbb9\udcec",["ru"],28,3],"1f1fa-1f1f8":[["\ud83c\uddfa\ud83c\uddf8"],"\ue50c","\udbb9\udce6",["us"],28,4]},Config.smileys={"<3":"heart","</3":"broken_heart",":)":"blush","(:":"blush",":-)":"blush","C:":"smile","c:":"smile",":D":"smile",":-D":"smile",";)":"wink",";-)":"wink","):":"disappointed",":(":"disappointed",":-(":"disappointed",":'(":"cry","=)":"smiley","=-)":"smiley",":*":"kiss",":-*":"kiss",":>":"laughing",":->":"laughing","8)":"sunglasses",":\\\\":"confused",":-\\\\":"confused",":/":"confused",":-/":"confused",":|":"neutral_face",":-|":"neutral_face",":o":"open_mouth",":-o":"open_mouth",">:(":"angry",">:-(":"angry",":p":"stuck_out_tongue",":-p":"stuck_out_tongue",":P":"stuck_out_tongue",":-P":"stuck_out_tongue",":b":"stuck_out_tongue",":-b":"stuck_out_tongue",";p":"stuck_out_tongue_winking_eye",";-p":"stuck_out_tongue_winking_eye",";b":"stuck_out_tongue_winking_eye",";-b":"stuck_out_tongue_winking_eye",";P":"stuck_out_tongue_winking_eye",";-P":"stuck_out_tongue_winking_eye",":o)":"monkey_face","D:":"anguished"},Config.inits={},Config.map={},Config.mapcolon={};var a=[];Config.reversemap={},Config.init_emoticons=function(){if(!Config.inits.emoticons){Config.init_colons(),Config.inits.emoticons=1;var a=[];Config.map.emoticons={};for(var b in Config.emoticons_data){var c=b.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");Config.map.colons[emoji.emoticons_data[b]]&&(Config.map.emoticons[c]=Config.map.colons[Config.emoticons_data[b]],a.push(Config.escape_rx(c)))}Config.rx_emoticons=new RegExp("(^|\\s)("+a.join("|")+")(?=$|[\\s|\\?\\.,!])","g")}},Config.init_colons=function(){if(!Config.inits.colons){Config.inits.colons=1,Config.rx_colons=new RegExp(":[^\\s:]+:","g"),Config.map.colons={};for(var a in Config.data)for(var b=0;b<Config.data[a][3].length;b++)Config.map.colons[emoji.data[a][3][b]]=a}},Config.init_unified=function(){Config.inits.unified||(Config.inits.unified=1,buildMap())},Config.escape_rx=function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},function(a){function b(a){h=a}function c(){i=!0}function d(){return i?(i=!1,""):h}function e(){var a,b,c,e=Array.prototype.slice.call(arguments),f=e.pop(),g=[],h=1==e.length,i=!0,m=d();for(b=0;b<e.length;b++)if(c=e[b]=m+e[b],"xt_"!=c.substr(0,3)&&void 0!==j[c])g.push(j[c]);else if(l){try{a=localStorage.getItem(c)}catch(n){l=!1}try{a=void 0===a||null===a?!1:JSON.parse(a)}catch(n){a=!1}g.push(j[c]=a)}else k?i=!1:g.push(j[c]=!1);return i?f(h?g[0]:g):void chrome.storage.local.get(e,function(a){var d;for(g=[],b=0;b<e.length;b++)c=e[b],d=a[c],d=void 0===d||null===d?!1:JSON.parse(d),g.push(j[c]=d);f(h?g[0]:g)})}function f(a,b){var c,e,f={},g=d();for(c in a)if(a.hasOwnProperty(c))if(e=a[c],c=g+c,j[c]=e,e=JSON.stringify(e),l)try{localStorage.setItem(c,e)}catch(h){l=!1}else f[c]=e;return l||!k?void(b&&b()):void chrome.storage.local.set(f,b)}function g(){var a,b,c,e=Array.prototype.slice.call(arguments),f=d();for("function"==typeof e[e.length-1]&&(c=e.pop()),a=0;a<e.length;a++)if(b=e[a]=f+e[a],delete j[b],l)try{localStorage.removeItem(b)}catch(g){l=!1}k?chrome.storage.local.remove(e,c):c&&c()}var h="",i=!1,j={},k=!!(a.chrome&&chrome.storage&&chrome.storage.local),l=!k&&!!a.localStorage;a.ConfigStorage={prefix:b,noPrefix:c,get:e,set:f,remove:g}}(this),function(a,b,c){var d=1,e=3,f=["p","div","pre","form"],g=27,h=9;a.emojiarea={assetsPath:"",iconSize:25,icons:{}};var i=":joy:,:kissing_heart:,:heart:,:heart_eyes:,:blush:,:grin:,:+1:,:relaxed:,:pensive:,:smile:,:sob:,:kiss:,:unamused:,:flushed:,:stuck_out_tongue_winking_eye:,:see_no_evil:,:wink:,:smiley:,:cry:,:stuck_out_tongue_closed_eyes:,:scream:,:rage:,:smirk:,:disappointed:,:sweat_smile:,:kissing_closed_eyes:,:speak_no_evil:,:relieved:,:grinning:,:yum:,:laughing:,:ok_hand:,:neutral_face:,:confused:".split(",");a.fn.emojiarea=function(b){return b=a.extend({},b),this.each(function(){var d=a(this);if("contentEditable"in c.body&&b.wysiwyg!==!1){var e=getGuid();new m(d,e,a.extend({},b))}else{var e=getGuid();new l(d,e,b)}d.attr({"data-emojiable":"converted","data-id":e,"data-type":"original-input"})})};var j={};j.restoreSelection=function(){return b.getSelection?function(a){var c=b.getSelection();c.removeAllRanges();for(var d=0,e=a.length;e>d;++d)c.addRange(a[d])}:c.selection&&c.selection.createRange?function(a){a&&a.select()}:void 0}(),j.saveSelection=function(){return b.getSelection?function(){var a=b.getSelection(),c=[];if(a.rangeCount)for(var d=0,e=a.rangeCount;e>d;++d)c.push(a.getRangeAt(d));return c}:c.selection&&c.selection.createRange?function(){var a=c.selection;return"none"!==a.type.toLowerCase()?a.createRange():null}:void 0}(),j.replaceSelection=function(){return b.getSelection?function(a){var d,e=b.getSelection(),f="string"==typeof a?c.createTextNode(a):a;e.getRangeAt&&e.rangeCount&&(d=e.getRangeAt(0),d.deleteContents(),d.insertNode(f),d.setStart(f,0),b.setTimeout(function(){d=c.createRange(),d.setStartAfter(f),d.collapse(!0),e.removeAllRanges(),e.addRange(d)},0))}:c.selection&&c.selection.createRange?function(a){var b=c.selection.createRange();"string"==typeof a?b.text=a:b.pasteHTML(a.outerHTML)}:void 0}(),j.insertAtCursor=function(a,b){a=" "+a;var d,e,f,g=b.value;"undefined"!=typeof b.selectionStart&&"undefined"!=typeof b.selectionEnd?(e=b.selectionStart,d=b.selectionEnd,b.value=g.substring(0,e)+a+g.substring(b.selectionEnd),b.selectionStart=b.selectionEnd=e+a.length):"undefined"!=typeof c.selection&&"undefined"!=typeof c.selection.createRange&&(b.focus(),f=c.selection.createRange(),f.text=a,f.select())},j.extend=function(a,b){if("undefined"!=typeof a&&a||(a={}),"object"==typeof b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a},j.escapeRegex=function(a){return(a+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},j.htmlEntities=function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},j.emojiInserted=function(a,b){ConfigStorage.get("emojis_recent",function(b){b=b||i||[];var c=b.indexOf(a);return c?(-1!=c&&b.splice(c,1),b.unshift(a),b.length>42&&(b=b.slice(42)),void ConfigStorage.set({emojis_recent:b})):!1})};var k=function(){};k.prototype.setup=function(){var a=this;this.$editor.on("focus",function(){a.hasFocus=!0}),this.$editor.on("blur",function(){a.hasFocus=!1}),a.emojiMenu=new n(a),this.setupButton()},k.prototype.setupButton=function(){var b=this,c=a("[data-id="+this.id+"][data-type=picker]");c.on("click",function(a){b.emojiMenu.show(b)}),this.$button=c,this.$dontHideOnClick="emoji-picker"},k.createIcon=function(b,c){var d=b[0],e="/assets/emoji_picker/emoji_spritesheet_0-ff6416368a0b344c994727f7b85d7f22f3753b657788f0b5e6b5144c82d23ee5.png",f="/assets/emoji_picker/emoji_spritesheet_1-7ef91a80a62c6d8ff95195f9a08df472c85af35639ac9ddba51ba091030128c4.png",g="/assets/emoji_picker/emoji_spritesheet_2-c38c70d535fff83d9f7958207997972ce2cf128ef34b04425e189fcecaaf7c19.png",h="/assets/emoji_picker/emoji_spritesheet_3-41b52a0290322fea1514a50197b072eef071755d97fa97590630c4610dd68bda.png",i="/assets/emoji_picker/emoji_spritesheet_4-c884b701ca540913c231779c43be90186c2b8cbc683c8932bea5491e3de43387.png",k=b[1],l=b[2],m=b[3],n="/emoji_picker/emoji_spritesheet_!.png",o="/assets/emoji_picker/blank-2f561b02a49376e3679acd5975e3790abdff09ecbadfa1e1858c7ba26e3ffcef.gif",p=c&&Config.Mobile?26:a.emojiarea.iconSize,q=-(p*l),r=-(p*k),s=Config.EmojiCategorySpritesheetDimens[d][1]*p,t=Config.EmojiCategorySpritesheetDimens[d][0]*p,u="display:inline-block;",w=(n.replace("!",d),new RegExp("emoji_spritesheet_"+d)),x=[e,f,g,h,i],y=null,z="";return $.each(x,function(a,b){return y=b.match(w),null!=y?z=y.input:void 0}),u+="width:"+p+"px;",u+="height:"+p+"px;",u+="background:url('"+z+"') "+q+"px "+r+"px no-repeat;",u+="background-size:"+s+"px "+t+"px;",'<img src="'+o+'" class="img" style="'+u+'" alt="'+j.htmlEntities(m)+'">'},a.emojiarea.createIcon=k.createIcon;var l=function(a,b,c){this.options=c,this.$textarea=a,this.$editor=a,this.id=b,this.setup()};l.prototype.insert=function(b){a.emojiarea.icons.hasOwnProperty(b)&&(j.insertAtCursor(b,this.$textarea[0]),j.emojiInserted(b,this.menu),this.$textarea.trigger("change"))},l.prototype.val=function(){return"\n"==this.$textarea?"":this.$textarea.val()},j.extend(l.prototype,k.prototype);var m=function(b,d,e){var f=this;this.options=e||{},"unicode"===a(b).attr("data-emoji-input")?this.options.inputMethod="unicode":this.options.inputMethod="image",this.id=d,this.$textarea=b,this.emojiPopup=e.emojiPopup,this.$editor=a("<div>").addClass("emoji-wysiwyg-editor").addClass(a(b)[0].className),this.$editor.data("self",this),b.attr("maxlength")&&this.$editor.attr("maxlength",b.attr("maxlength"));var g=this.emojiPopup.unicodeToImage(b.val());this.$editor.html(g),this.$editor.attr({"data-id":d,"data-type":"input",placeholder:b.attr("placeholder"),contenteditable:"true"});var h="blur change";this.options.norealTime||(h+=" keyup"),this.$editor.on(h,function(a){return f.onChange.apply(f,[a])}),this.$editor.on("mousedown focus",function(){c.execCommand("enableObjectResizing",!1,!1)}),this.$editor.on("blur",function(){c.execCommand("enableObjectResizing",!0,!0)});var i=this.$editor;this.$editor.on("change keydown keyup resize scroll",function(a){8!=a.which&&i.text().length+i.find("img").length>=i.attr("maxlength")&&a.preventDefault(),f.updateBodyPadding(i)}),b.hide().after(this.$editor),this.$textarea.after("<i class='emoji-picker-icon emoji-picker "+this.options.popupButtonClasses+"' data-id='"+d+"' data-type='picker'></i>"),this.setup(),a(c.body).on("mousedown",function(){f.hasFocus&&(f.selection=j.saveSelection())})};m.prototype.updateBodyPadding=function(b){var c=a("[data-id="+this.id+"][data-type=picker]");a(b).hasScrollbar()?(c.hasClass("parent-has-scroll")||c.addClass("parent-has-scroll"),a(b).hasClass("parent-has-scroll")||a(b).addClass("parent-has-scroll")):(c.hasClass("parent-has-scroll")&&c.removeClass("parent-has-scroll"),a(b).hasClass("parent-has-scroll")&&a(b).removeClass("parent-has-scroll"))},m.prototype.onChange=function(a){this.$textarea.val(this.val()).trigger("change")},m.prototype.insert=function(b){var c="";if("unicode"==this.options.inputMethod)c=this.emojiPopup.colonToUnicode(b);else{var d=a(k.createIcon(a.emojiarea.icons[b]));d[0].attachEvent&&d[0].attachEvent("onresizestart",function(a){a.returnValue=!1},!1),c=d[0]}this.$editor.trigger("focus"),this.selection&&j.restoreSelection(this.selection);try{j.replaceSelection(c)}catch(e){}j.emojiInserted(b,this.menu),this.onChange()},m.prototype.val=function(){for(var a=[],b=[],c=this.emojiPopup,g=function(){a.push(b.join("")),b=[]},h=function(a){if(a.nodeType===e)b.push(a.nodeValue);else if(a.nodeType===d){var c=a.tagName.toLowerCase(),i=-1!==f.indexOf(c);if(i&&b.length&&g(),"img"===c){var j=a.getAttribute("alt")||"";return void(j&&b.push(j))}"br"===c&&g();for(var k=a.childNodes,l=0;l<k.length;l++)h(k[l]);i&&b.length&&g()}},i=this.$editor[0].childNodes,j=0;j<i.length;j++)h(i[j]);b.length&&g();var k=a.join("\n");return c.colonToUnicode(k)},j.extend(m.prototype,k.prototype),jQuery.fn.hasScrollbar=function(){var a=this.get(0).scrollHeight;return this.outerHeight()<a?!0:!1};var n=function(d){var e=this;e.id=d.id;var f=a(c.body),i=a(b);this.visible=!1,this.emojiarea=d,n.menuZIndex=5e3,this.$menu=a("<div>"),this.$menu.addClass("emoji-menu"),this.$menu.attr("data-id",e.id),this.$menu.attr("data-type","menu"),this.$menu.hide(),this.$itemsTailWrap=a('<div class="emoji-items-wrap1"></div>').appendTo(this.$menu),this.$categoryTabs=a('<table class="emoji-menu-tabs"><tr><td><a class="emoji-menu-tab icon-recent" ></a></td><td><a class="emoji-menu-tab icon-smile" ></a></td><td><a class="emoji-menu-tab icon-flower"></a></td><td><a class="emoji-menu-tab icon-bell"></a></td><td><a class="emoji-menu-tab icon-car"></a></td><td><a class="emoji-menu-tab icon-grid"></a></td></tr></table>').appendTo(this.$itemsTailWrap),this.$itemsWrap=a('<div class="emoji-items-wrap nano mobile_scrollable_wrap"></div>').appendTo(this.$itemsTailWrap),this.$items=a('<div class="emoji-items nano-content">').appendTo(this.$itemsWrap),f.append(this.$menu),Config.Mobile||this.$itemsWrap.nanoScroller({preventPageScrolling:!0,tabIndex:-1}),f.on("keydown",function(a){(a.keyCode===g||a.keyCode===h)&&e.hide()}),f.on("message_send",function(a){e.hide()}),f.on("mouseup",function(c){c=c.originalEvent||c;var d=c.originalTarget||c.target||b;if(!a(d).hasClass(e.emojiarea.$dontHideOnClick)){for(;d&&d!=b;)if(d=d.parentNode,d==e.$menu[0]||e.emojiarea&&d==e.emojiarea.$button[0])return;e.hide()}}),i.on("resize",function(){e.visible&&e.reposition()}),this.$menu.on("mouseup","a",function(a){return a.stopPropagation(),!1}),this.$menu.on("click","a",function(c){if(e.emojiarea.updateBodyPadding(e.emojiarea.$editor),a(this).hasClass("emoji-menu-tab"))return e.getTabIndex(this)!==e.currentCategory&&e.selectCategory(e.getTabIndex(this)),!1;var d=a(".label",a(this)).text();return b.setTimeout(function(){e.onItemSelected(d),(c.ctrlKey||c.metaKey)&&e.hide()},0),c.stopPropagation(),!1}),this.selectCategory(0)};n.prototype.getTabIndex=function(a){return this.$categoryTabs.find(".emoji-menu-tab").index(a)},n.prototype.selectCategory=function(a){this.$categoryTabs.find(".emoji-menu-tab").each(function(b){b===a?this.className+="-selected":this.className=this.className.replace("-selected","")}),this.currentCategory=a,this.load(a),Config.Mobile||this.$itemsWrap.nanoScroller({scroll:"top"})},n.prototype.onItemSelected=function(a){this.emojiarea.$editor.text().length+this.emojiarea.$editor.find("img").length>=this.emojiarea.$editor.attr("maxlength")||this.emojiarea.insert(a)},n.prototype.load=function(b){var c=[],d=a.emojiarea.icons,e=a.emojiarea.assetsPath,f=this;e.length&&"/"!==e.charAt(e.length-1)&&(e+="/");var g=function(){f.$items.html(c.join("")),Config.Mobile||setTimeout(function(){f.$itemsWrap.nanoScroller()},100)};if(b>0){for(var h in d)d.hasOwnProperty(h)&&d[h][0]===b-1&&c.push('<a href="javascript:void(0)" title="'+j.htmlEntities(h)+'">'+k.createIcon(d[h],!0)+'<span class="label">'+j.htmlEntities(h)+"</span></a>");g()}else ConfigStorage.get("emojis_recent",function(a){a=a||i||[];var b,e;for(e=0;e<a.length;e++)b=a[e],d[b]&&c.push('<a href="javascript:void(0)" title="'+j.htmlEntities(b)+'">'+k.createIcon(d[b],!0)+'<span class="label">'+j.htmlEntities(b)+"</span></a>");g()})},n.prototype.reposition=function(){this.tether||(this.tether=new Tether({element:'[data-id="'+this.id+'"][data-type="menu"]',target:'[data-id="'+this.id+'"][data-type="picker"]',attachment:"left center",targetAttachment:"bottom left",offset:"0 12px",constraints:[{to:"html",pin:!0}]}))},n.prototype.hide=function(a){this.visible=!1,this.$menu.hide("fast")},n.prototype.show=function(b){return this.visible?this.hide():(this.reposition(),a(this.$menu).css("z-index",++n.menuZIndex),this.$menu.show("fast"),this.currentCategory||this.load(0),void(this.visible=!0))}}(jQuery,window,document),function(){this.EmojiPicker=function(){function a(a){var b,c;null==a&&(a={}),$.emojiarea.iconSize=null!=(b=a.iconSize)?b:25,$.emojiarea.assetsPath=null!=(c=a.assetsPath)?c:"",this.generateEmojiIconSets(a),a.emojiable_selector||(a.emojiable_selector="[data-emojiable=true]"),this.options=a}return a.prototype.discover=function(){var a;return(a=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream)?void 0:$(this.options.emojiable_selector).emojiarea($.extend({emojiPopup:this,norealTime:!0},this.options))},a.prototype.generateEmojiIconSets=function(a){var b,c,d,e,f,g,h,i,j,k;for(f={},i={},e=void 0,g=void 0,d=void 0,h=void 0,c=void 0,j=void 0,b=void 0,k=void 0,g=0;g<Config.EmojiCategories.length;){for(k=Config.EmojiCategorySpritesheetDimens[g][1],e=0;e<Config.EmojiCategories[g].length;)c=Config.Emoji[Config.EmojiCategories[g][e]],h=c[1][0],j=Math.floor(e/k),b=e%k,f[":"+h+":"]=[g,j,b,":"+h+":"],i[h]=c[0],e++;g++}return $.emojiarea.icons=f,$.emojiarea.reverseIcons=i},a.prototype.colonToUnicode=function(a){return a?(Config.rx_colons||Config.init_unified(),a.replace(Config.rx_colons,function(a){var b;return b=Config.mapcolon[a],b?b:""})):""},a.prototype.unicodeToImage=function(a){return a?(Config.rx_codes||Config.init_unified(),a.replace(Config.rx_codes,function(a){var b,c;return c=Config.reversemap[a],c?(c=":"+c+":",b=$.emojiarea.createIcon($.emojiarea.icons[c])):""})):""},a.prototype.colonToImage=function(a){return a?(Config.rx_colons||Config.init_unified(),a.replace(Config.rx_colons,function(a){var b;return a?b=$.emojiarea.createIcon($.emojiarea.icons[a]):""})):""},a}()}.call(this);
$(function () {
  window.emojiPicker = new EmojiPicker({
    emojiable_selector: '[data-emojiable=true]',
    assetsPath: '/assets/emoji_picker',
    popupButtonClasses: 'fa fa-smile-o',
  });
  window.emojiPicker.discover();
});


// Generated by CoffeeScript 1.7.1

/*
jQuery.Turbolinks ~ https://github.com/kossnocorp/jquery.turbolinks
jQuery plugin for drop-in fix binded events problem caused by Turbolinks

The MIT License
Copyright (c) 2012-2013 Sasha Koss & Rico Sta. Cruz
 */


(function() {
  var $, $document;

  $ = window.jQuery || (typeof require === "function" ? require('jquery') : void 0);

  $document = $(document);

  $.turbo = {
    version: '2.1.0',
    isReady: false,
    use: function(load, fetch) {
      return $document.off('.turbo').on("" + load + ".turbo", this.onLoad).on("" + fetch + ".turbo", this.onFetch);
    },
    addCallback: function(callback) {
      if ($.turbo.isReady) {
        callback($);
      }
      return $document.on('turbo:ready', function() {
        return callback($);
      });
    },
    onLoad: function() {
      $.turbo.isReady = true;
      return $document.trigger('turbo:ready');
    },
    onFetch: function() {
      return $.turbo.isReady = false;
    },
    register: function() {
      $(this.onLoad);
      return $.fn.ready = this.addCallback;
    }
  };

  $.turbo.register();

  $.turbo.use('page:load', 'page:fetch');

}).call(this);
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  window.SocialShareButton = {
    openUrl: function(url, width, height) {
      var left, opt, top;
      if (width == null) {
        width = 640;
      }
      if (height == null) {
        height = 480;
      }
      left = (screen.width / 2) - (width / 2);
      top = (screen.height * 0.3) - (height / 2);
      opt = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",menubar=no,status=no,location=no";
      window.open(url, 'popup', opt);
      return false;
    },
    share: function(el) {
      var $parent, appkey, desc, ga, get_tumblr_extra, hashtags, img, site, title, tumblr_params, url, via, via_str;
      site = $(el).data('site');
      appkey = $(el).data('appkey') || '';
      $parent = $(el).parent();
      title = encodeURIComponent($(el).data(site + '-title') || $parent.data('title') || '');
      img = encodeURIComponent($parent.data("img") || '');
      url = encodeURIComponent($parent.data("url") || '');
      via = encodeURIComponent($parent.data("via") || '');
      desc = encodeURIComponent($parent.data("desc") || ' ');
      ga = window[window['GoogleAnalyticsObject'] || 'ga'];
      if (typeof ga === 'function') {
        ga('send', 'event', 'Social Share Button', 'click', site);
      }
      if (url.length === 0) {
        url = encodeURIComponent(location.href);
      }
      switch (site) {
        case "email":
          location.href = "mailto:?to=&subject=" + title + "&body=" + url;
          break;
        case "weibo":
          SocialShareButton.openUrl("http://service.weibo.com/share/share.php?url=" + url + "&type=3&pic=" + img + "&title=" + title + "&appkey=" + appkey, 620, 370);
          break;
        case "twitter":
          hashtags = encodeURIComponent($(el).data(site + '-hashtags') || $parent.data('hashtags') || '');
          via_str = '';
          if (via.length > 0) {
            via_str = "&via=" + via;
          }
          SocialShareButton.openUrl("https://twitter.com/intent/tweet?url=" + url + "&text=" + title + "&hashtags=" + hashtags + via_str, 650, 300);
          break;
        case "douban":
          SocialShareButton.openUrl("http://shuo.douban.com/!service/share?href=" + url + "&name=" + title + "&image=" + img + "&sel=" + desc, 770, 470);
          break;
        case "facebook":
          SocialShareButton.openUrl("http://www.facebook.com/sharer/sharer.php?u=" + url + "&display=popup&title=" + title + "&description=" + desc, 555, 400);
          break;
        case "qq":
          SocialShareButton.openUrl("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + url + "&title=" + title + "&pics=" + img + "&summary=" + desc + "&site=" + appkey);
          break;
        case "google_plus":
          SocialShareButton.openUrl("https://plus.google.com/share?url=" + url);
          break;
        case "google_bookmark":
          SocialShareButton.openUrl("https://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=" + url + "&title=" + title);
          break;
        case "delicious":
          SocialShareButton.openUrl("https://del.icio.us/save?url=" + url + "&title=" + title + "&jump=yes&pic=" + img);
          break;
        case "pinterest":
          SocialShareButton.openUrl("http://www.pinterest.com/pin/create/button/?url=" + url + "&media=" + img + "&description=" + title);
          break;
        case "linkedin":
          SocialShareButton.openUrl("https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title + "&summary=" + desc);
          break;
        case "xing":
          SocialShareButton.openUrl("https://www.xing.com/spi/shares/new?url=" + url);
          break;
        case "vkontakte":
          SocialShareButton.openUrl("http://vk.com/share.php?url=" + url + "&title=" + title + "&image=" + img);
          break;
        case "odnoklassniki":
          SocialShareButton.openUrl("https://connect.ok.ru/offer?url=" + url + "&title=" + title + "&description=" + desc + "&imageUrl=" + img);
          break;
        case "wechat":
          if (!window.SocialShareWeChatButton) {
            throw new Error("You should require social-share-button/wechat to your application.js");
          }
          window.SocialShareWeChatButton.qrcode({
            url: decodeURIComponent(url),
            header: $(el).attr('title'),
            footer: $(el).data('wechat-footer')
          });
          break;
        case "tumblr":
          get_tumblr_extra = function(param) {
            var cutom_data;
            cutom_data = $(el).attr("data-" + param);
            if (cutom_data) {
              return encodeURIComponent(cutom_data);
            }
          };
          tumblr_params = function() {
            var params, path, quote, source;
            path = get_tumblr_extra('type') || 'link';
            params = (function() {
              switch (path) {
                case 'text':
                  title = get_tumblr_extra('title') || title;
                  return "title=" + title;
                case 'photo':
                  title = get_tumblr_extra('caption') || title;
                  source = get_tumblr_extra('source') || img;
                  return "caption=" + title + "&source=" + source;
                case 'quote':
                  quote = get_tumblr_extra('quote') || title;
                  source = get_tumblr_extra('source') || '';
                  return "quote=" + quote + "&source=" + source;
                default:
                  title = get_tumblr_extra('title') || title;
                  url = get_tumblr_extra('url') || url;
                  return "name=" + title + "&url=" + url;
              }
            })();
            return "/" + path + "?" + params;
          };
          SocialShareButton.openUrl("http://www.tumblr.com/share" + (tumblr_params()));
          break;
        case "reddit":
          SocialShareButton.openUrl("http://www.reddit.com/submit?url=" + url + "&newwindow=1", 555, 400);
          break;
        case "hacker_news":
          SocialShareButton.openUrl("http://news.ycombinator.com/submitlink?u=" + url + "&t=" + title, 770, 500);
          break;
        case "telegram":
          SocialShareButton.openUrl("https://telegram.me/share/url?text=" + title + "&url=" + url);
      }
      return false;
    }
  };

}).call(this);
(function() {
  jQuery(document).ready(function($) {
    var ScaleSlider, jssor_1_SlideshowTransitions, jssor_1_options, jssor_1_slider;
    jssor_1_SlideshowTransitions = [
      {
        $Duration: 2200,
        $Zoom: 1,
        $Easing: {
          $Zoom: $Jease$.$InCubic,
          $Opacity: $Jease$.$OutQuad
        },
        $Opacity: 2
      }, {
        $Duration: 2000,
        $Zoom: 11,
        $SlideOut: true,
        $Easing: {
          $Zoom: $Jease$.$InExpo,
          $Opacity: $Jease$.$Linear
        },
        $Opacity: 2
      }, {
        $Duration: 2200,
        $Zoom: 1,
        $Rotate: 1,
        $During: {
          $Zoom: [0.2, 0.8],
          $Rotate: [0.2, 0.8]
        },
        $Easing: {
          $Zoom: $Jease$.$Swing,
          $Opacity: $Jease$.$Linear,
          $Rotate: $Jease$.$Swing
        },
        $Opacity: 2,
        $Round: {
          $Rotate: 0.5
        }
      }, {
        $Duration: 2000,
        $Zoom: 11,
        $Rotate: 1,
        $SlideOut: true,
        $Easing: {
          $Zoom: $Jease$.$InExpo,
          $Opacity: $Jease$.$Linear,
          $Rotate: $Jease$.$InExpo
        },
        $Opacity: 2,
        $Round: {
          $Rotate: 0.8
        }
      }, {
        $Duration: 2200,
        x: 0.5,
        $Cols: 2,
        $Zoom: 1,
        $Assembly: 2049,
        $ChessMode: {
          $Column: 15
        },
        $Easing: {
          $Left: $Jease$.$InCubic,
          $Zoom: $Jease$.$InCubic,
          $Opacity: $Jease$.$Linear
        },
        $Opacity: 2
      }, {
        $Duration: 2200,
        x: 4,
        $Cols: 2,
        $Zoom: 11,
        $SlideOut: true,
        $Assembly: 2049,
        $ChessMode: {
          $Column: 15
        },
        $Easing: {
          $Left: $Jease$.$InExpo,
          $Zoom: $Jease$.$InExpo,
          $Opacity: $Jease$.$Linear
        },
        $Opacity: 2
      }, {
        $Duration: 2200,
        x: 0.6,
        $Zoom: 1,
        $Rotate: 1,
        $During: {
          $Left: [0.2, 0.8],
          $Zoom: [0.2, 0.8],
          $Rotate: [0.2, 0.8]
        },
        $Easing: $Jease$.$Swing,
        $Opacity: 2,
        $Round: {
          $Rotate: 0.5
        }
      }, {
        $Duration: 2000,
        x: -4,
        $Zoom: 11,
        $Rotate: 1,
        $SlideOut: true,
        $Easing: {
          $Left: $Jease$.$InExpo,
          $Zoom: $Jease$.$InExpo,
          $Opacity: $Jease$.$Linear,
          $Rotate: $Jease$.$InExpo
        },
        $Opacity: 2,
        $Round: {
          $Rotate: 0.8
        }
      }, {
        $Duration: 2200,
        x: -0.6,
        $Zoom: 1,
        $Rotate: 1,
        $During: {
          $Left: [0.2, 0.8],
          $Zoom: [0.2, 0.8],
          $Rotate: [0.2, 0.8]
        },
        $Easing: $Jease$.$Swing,
        $Opacity: 2,
        $Round: {
          $Rotate: 0.5
        }
      }, {
        $Duration: 2000,
        x: 4,
        $Zoom: 11,
        $Rotate: 1,
        $SlideOut: true,
        $Easing: {
          $Left: $Jease$.$InExpo,
          $Zoom: $Jease$.$InExpo,
          $Opacity: $Jease$.$Linear,
          $Rotate: $Jease$.$InExpo
        },
        $Opacity: 2,
        $Round: {
          $Rotate: 0.8
        }
      }, {
        $Duration: 2200,
        x: 0.5,
        y: 0.3,
        $Cols: 2,
        $Zoom: 1,
        $Rotate: 1,
        $Assembly: 2049,
        $ChessMode: {
          $Column: 15
        },
        $Easing: {
          $Left: $Jease$.$InCubic,
          $Top: $Jease$.$InCubic,
          $Zoom: $Jease$.$InCubic,
          $Opacity: $Jease$.$OutQuad,
          $Rotate: $Jease$.$InCubic
        },
        $Opacity: 2,
        $Round: {
          $Rotate: 0.7
        }
      }, {
        $Duration: 2000,
        x: 0.5,
        y: 0.3,
        $Cols: 2,
        $Zoom: 1,
        $Rotate: 1,
        $SlideOut: true,
        $Assembly: 2049,
        $ChessMode: {
          $Column: 15
        },
        $Easing: {
          $Left: $Jease$.$InExpo,
          $Top: $Jease$.$InExpo,
          $Zoom: $Jease$.$InExpo,
          $Opacity: $Jease$.$Linear,
          $Rotate: $Jease$.$InExpo
        },
        $Opacity: 2,
        $Round: {
          $Rotate: 0.7
        }
      }, {
        $Duration: 2200,
        x: -4,
        y: 2,
        $Rows: 2,
        $Zoom: 11,
        $Rotate: 1,
        $Assembly: 2049,
        $ChessMode: {
          $Row: 28
        },
        $Easing: {
          $Left: $Jease$.$InCubic,
          $Top: $Jease$.$InCubic,
          $Zoom: $Jease$.$InCubic,
          $Opacity: $Jease$.$OutQuad,
          $Rotate: $Jease$.$InCubic
        },
        $Opacity: 2,
        $Round: {
          $Rotate: 0.7
        }
      }, {
        $Duration: 2200,
        x: 1,
        y: 2,
        $Cols: 2,
        $Zoom: 11,
        $Rotate: 1,
        $Assembly: 2049,
        $ChessMode: {
          $Column: 19
        },
        $Easing: {
          $Left: $Jease$.$InCubic,
          $Top: $Jease$.$InCubic,
          $Zoom: $Jease$.$InCubic,
          $Opacity: $Jease$.$OutQuad,
          $Rotate: $Jease$.$InCubic
        },
        $Opacity: 2,
        $Round: {
          $Rotate: 0.8
        }
      }
    ];
    jssor_1_options = {
      $AutoPlay: 1,
      $SlideshowOptions: {
        $Class: $JssorSlideshowRunner$,
        $Transitions: jssor_1_SlideshowTransitions,
        $TransitionsOrder: 1
      },
      $BulletNavigatorOptions: {
        $Class: $JssorBulletNavigator$
      },
      $ThumbnailNavigatorOptions: {
        $Class: $JssorThumbnailNavigator$,
        $Cols: 4,
        $Orientation: 2,
        $Align: 150
      }
    };
    jssor_1_slider = new $JssorSlider$('jssor_1', jssor_1_options);
    ScaleSlider = function() {
      var MAX_WIDTH, containerElement, containerWidth, expectedWidth;
      containerElement = jssor_1_slider.$Elmt.parentNode;
      containerWidth = containerElement.clientWidth;
      if (containerWidth) {
        MAX_WIDTH = 980;
        expectedWidth = containerWidth;
        if (MAX_WIDTH) {
          expectedWidth = Math.min(MAX_WIDTH, expectedWidth);
        }
        jssor_1_slider.$ScaleWidth(expectedWidth);
      } else {
        window.setTimeout(ScaleSlider, 30);
      }
    };
    ScaleSlider();
    $(window).bind('load', ScaleSlider);
    $(window).bind('resize', ScaleSlider);
    $(window).bind('orientationchange', ScaleSlider);
  });

}).call(this);
/*!
 * Bootstrap v3.3.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.2",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.2",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.2",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.2",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.2",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.2",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()
}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.2",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function(j,h,c,g,d,k,f){/*! Jssor */
new(function(){});var e=j.$Jease$={$Swing:function(a){return-c.cos(a*c.PI)/2+.5},$Linear:function(a){return a},$InQuad:function(a){return a*a},$OutQuad:function(a){return-a*(a-2)},$InOutQuad:function(a){return(a*=2)<1?1/2*a*a:-1/2*(--a*(a-2)-1)},$InCubic:function(a){return a*a*a},$OutCubic:function(a){return(a-=1)*a*a+1},$InOutCubic:function(a){return(a*=2)<1?1/2*a*a*a:1/2*((a-=2)*a*a+2)},$InQuart:function(a){return a*a*a*a},$OutQuart:function(a){return-((a-=1)*a*a*a-1)},$InOutQuart:function(a){return(a*=2)<1?1/2*a*a*a*a:-1/2*((a-=2)*a*a*a-2)},$InQuint:function(a){return a*a*a*a*a},$OutQuint:function(a){return(a-=1)*a*a*a*a+1},$InOutQuint:function(a){return(a*=2)<1?1/2*a*a*a*a*a:1/2*((a-=2)*a*a*a*a+2)},$InSine:function(a){return 1-c.cos(c.PI/2*a)},$OutSine:function(a){return c.sin(c.PI/2*a)},$InOutSine:function(a){return-1/2*(c.cos(c.PI*a)-1)},$InExpo:function(a){return a==0?0:c.pow(2,10*(a-1))},$OutExpo:function(a){return a==1?1:-c.pow(2,-10*a)+1},$InOutExpo:function(a){return a==0||a==1?a:(a*=2)<1?1/2*c.pow(2,10*(a-1)):1/2*(-c.pow(2,-10*--a)+2)},$InCirc:function(a){return-(c.sqrt(1-a*a)-1)},$OutCirc:function(a){return c.sqrt(1-(a-=1)*a)},$InOutCirc:function(a){return(a*=2)<1?-1/2*(c.sqrt(1-a*a)-1):1/2*(c.sqrt(1-(a-=2)*a)+1)},$InElastic:function(a){if(!a||a==1)return a;var b=.3,d=.075;return-(c.pow(2,10*(a-=1))*c.sin((a-d)*2*c.PI/b))},$OutElastic:function(a){if(!a||a==1)return a;var b=.3,d=.075;return c.pow(2,-10*a)*c.sin((a-d)*2*c.PI/b)+1},$InOutElastic:function(a){if(!a||a==1)return a;var b=.45,d=.1125;return(a*=2)<1?-.5*c.pow(2,10*(a-=1))*c.sin((a-d)*2*c.PI/b):c.pow(2,-10*(a-=1))*c.sin((a-d)*2*c.PI/b)*.5+1},$InBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},$OutBack:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},$InOutBack:function(a){var b=1.70158;return(a*=2)<1?1/2*a*a*(((b*=1.525)+1)*a-b):1/2*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},$InBounce:function(a){return 1-e.$OutBounce(1-a)},$OutBounce:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},$InOutBounce:function(a){return a<1/2?e.$InBounce(a*2)*.5:e.$OutBounce(a*2-1)*.5+.5},$GoBack:function(a){return 1-c.abs(2-1)},$InWave:function(a){return 1-c.cos(a*c.PI*2)},$OutWave:function(a){return c.sin(a*c.PI*2)},$OutJump:function(a){return 1-((a*=2)<1?(a=1-a)*a*a:(a-=1)*a*a)},$InJump:function(a){return(a*=2)<1?a*a*a:(a=2-a)*a*a},$Early:c.ceil,$Late:c.floor};var b=j.$Jssor$=new function(){var i=this,zb=/\S+/g,M=1,jb=2,mb=3,lb=4,pb=5,N,t=0,l=0,u=0,B=0,C=0,F=navigator,ub=F.appName,o=F.userAgent,A=h.documentElement,q=parseFloat;function Ib(){if(!N){N={qg:"ontouchstart"in j||"createTouch"in h};var a;if(F.pointerEnabled||(a=F.msPointerEnabled))N.Fd=a?"msTouchAction":"touchAction"}return N}function w(g){if(!t){t=-1;if(ub=="Microsoft Internet Explorer"&&!!j.attachEvent&&!!j.ActiveXObject){var e=o.indexOf("MSIE");t=M;u=q(o.substring(e+5,o.indexOf(";",e)));/*@cc_on B=@_jscript_version@*/;l=h.documentMode||u}else if(ub=="Netscape"&&!!j.addEventListener){var d=o.indexOf("Firefox"),b=o.indexOf("Safari"),f=o.indexOf("Chrome"),c=o.indexOf("AppleWebKit");if(d>=0){t=jb;l=q(o.substring(d+8))}else if(b>=0){var i=o.substring(0,b).lastIndexOf("/");t=f>=0?lb:mb;l=q(o.substring(i+1,b))}else{var a=/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(o);if(a){t=M;l=u=q(a[1])}}if(c>=0)C=q(o.substring(c+12))}else{var a=/(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(o);if(a){t=pb;l=q(a[2])}}}return g==t}function r(){return w(M)}function ib(){return r()&&(l<6||h.compatMode=="BackCompat")}function Ab(){return w(jb)}function kb(){return w(mb)}function Db(){return w(lb)}function ob(){return w(pb)}function eb(){return kb()&&C>534&&C<535}function I(){w();return C>537||l>42||t==M&&l>=11}function gb(){return r()&&l<9}function fb(a){var b,c;return function(g){if(!b){b=d;var e=a.substr(0,1).toUpperCase()+a.substr(1);n([a].concat(["WebKit","ms","Moz","O","webkit"]),function(h,d){var b=a;if(d)b=h+e;if(g.style[b]!=f)return c=b})}return c}}function db(b){var a;return function(c){a=a||fb(b)(c)||b;return a}}var O=db("transform");function tb(a){return{}.toString.call(a)}var qb={};n(["Boolean","Number","String","Function","Array","Date","RegExp","Object"],function(a){qb["[object "+a+"]"]=a.toLowerCase()});function n(b,d){var a,c;if(tb(b)=="[object Array]"){for(a=0;a<b.length;a++)if(c=d(b[a],a,b))return c}else for(a in b)if(c=d(b[a],a,b))return c}function H(a){return a==g?String(a):qb[tb(a)]||"object"}function rb(a){for(var b in a)return d}function D(a){try{return H(a)=="object"&&!a.nodeType&&a!=a.window&&(!a.constructor||{}.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))}catch(b){}}function p(a,b){return{x:a,y:b}}function xb(b,a){setTimeout(b,a||0)}function E(b,d,c){var a=!b||b=="inherit"?"":b;n(d,function(c){var b=c.exec(a);if(b){var d=a.substr(0,b.index),e=a.substr(b.index+b[0].length+1,a.length-1);a=d+e}});a&&(c+=(!a.indexOf(" ")?"":" ")+a);return c}function T(b,a){if(l<9)b.style.filter=a}function Hb(a,b){if(a===f)a=b;return a}i.$Device=Ib;i.$IsBrowserIE=r;i.$IsBrowserIeQuirks=ib;i.$IsBrowserFireFox=Ab;i.$IsBrowserSafari=kb;i.$IsBrowserChrome=Db;i.$IsBrowserOpera=ob;i.Ff=I;fb("transform");i.$BrowserVersion=function(){return l};i.$BrowserEngineVersion=function(){return u||l};i.$WebKitVersion=function(){w();return C};i.$Delay=xb;i.Ef=function(a,b){b.call(a);return G({},a)};function Z(a){a.constructor===Z.caller&&a.gc&&a.gc.apply(a,Z.caller.arguments)}i.gc=Z;i.$GetElement=function(a){if(i.qf(a))a=h.getElementById(a);return a};function v(a){return a||j.event}i.Sd=v;i.$EvtSrc=function(b){b=v(b);var a=b.target||b.srcElement||h;if(a.nodeType==3)a=i.nc(a);return a};i.Rd=function(a){a=v(a);return{x:a.pageX||a.clientX||0,y:a.pageY||a.clientY||0}};i.$WindowSize=function(){var a=h.body;return{x:a.clientWidth||A.clientWidth,y:a.clientHeight||A.clientHeight}};function x(c,d,a){if(a!==f)c.style[d]=a==f?"":a;else{var b=c.currentStyle||c.style;a=b[d];if(a==""&&j.getComputedStyle){b=c.ownerDocument.defaultView.getComputedStyle(c,g);b&&(a=b.getPropertyValue(d)||b[d])}return a}}function bb(b,c,a,d){if(a===f){a=q(x(b,c));isNaN(a)&&(a=g);return a}if(a==g)a="";else d&&(a+="px");x(b,c,a)}function m(c,a){var d=a?bb:x,b;if(a&4)b=db(c);return function(e,f){return d(e,b?b(e):c,f,a&2)}}function Cb(b){if(r()&&u<9){var a=/opacity=([^)]*)/.exec(b.style.filter||"");return a?q(a[1])/100:1}else return q(b.style.opacity||"1")}function Eb(b,a,f){if(r()&&u<9){var h=b.style.filter||"",i=new RegExp(/[\s]*alpha\([^\)]*\)/g),e=c.round(100*a),d="";if(e<100||f)d="alpha(opacity="+e+") ";var g=E(h,[i],d);T(b,g)}else b.style.opacity=a==1?"":c.round(a*100)/100}var P={$Rotate:["rotate"],$RotateX:["rotateX"],$RotateY:["rotateY"],$SkewX:["skewX"],$SkewY:["skewY"]};if(!I())P=G(P,{$ScaleX:["scaleX",2],$ScaleY:["scaleY",2],$TranslateZ:["translateZ",1]});function Q(d,a){var c="";if(a){if(r()&&l&&l<10){delete a.$RotateX;delete a.$RotateY;delete a.$TranslateZ}b.$Each(a,function(d,b){var a=P[b];if(a){var e=a[1]||0;if(R[b]!=d)c+=" "+a[0]+"("+d+(["deg","px",""])[e]+")"}});if(I()){if(a.$TranslateX||a.$TranslateY||a.$TranslateZ!=f)c+=" translate3d("+(a.$TranslateX||0)+"px,"+(a.$TranslateY||0)+"px,"+(a.$TranslateZ||0)+"px)";if(a.$ScaleX==f)a.$ScaleX=1;if(a.$ScaleY==f)a.$ScaleY=1;if(a.$ScaleX!=1||a.$ScaleY!=1)c+=" scale3d("+a.$ScaleX+", "+a.$ScaleY+", 1)"}}d.style[O(d)]=c}i.xf=m("transformOrigin",4);i.vf=m("backfaceVisibility",4);i.tf=m("transformStyle",4);i.uf=m("perspective",6);i.Uf=m("perspectiveOrigin",4);i.Vf=function(b,a){if(r()&&u<9||u<10&&ib())b.style.zoom=a==1?"":a;else{var c=O(b),f=a==1?"":"scale("+a+")",e=b.style[c],g=new RegExp(/[\s]*scale\(.*?\)/g),d=E(e,[g],f);b.style[c]=d}};i.$AddEvent=function(a,c,d,b){a=i.$GetElement(a);if(a.addEventListener){c=="mousewheel"&&a.addEventListener("DOMMouseScroll",d,b);a.addEventListener(c,d,b)}else if(a.attachEvent){a.attachEvent("on"+c,d);b&&a.setCapture&&a.setCapture()}};i.T=function(a,c,d,b){a=i.$GetElement(a);if(a.removeEventListener){c=="mousewheel"&&a.removeEventListener("DOMMouseScroll",d,b);a.removeEventListener(c,d,b)}else if(a.detachEvent){a.detachEvent("on"+c,d);b&&a.releaseCapture&&a.releaseCapture()}};i.$FireEvent=function(c,b){var a;if(h.createEvent){a=h.createEvent("HTMLEvents");a.initEvent(b,k,k);c.dispatchEvent(a)}else{var d="on"+b;a=h.createEventObject();c.fireEvent(d,a)}};i.$CancelEvent=function(a){a=v(a);a.preventDefault&&a.preventDefault();a.cancel=d;a.returnValue=k};i.$StopEvent=function(a){a=v(a);a.stopPropagation&&a.stopPropagation();a.cancelBubble=d};i.$CreateCallback=function(d,c){var a=[].slice.call(arguments,2),b=function(){var b=a.concat([].slice.call(arguments,0));return c.apply(d,b)};return b};i.$InnerText=function(a,b){if(b==f)return a.textContent||a.innerText;var c=h.createTextNode(b);i.sc(a);a.appendChild(c)};i.$InnerHtml=function(a,b){if(b==f)return a.innerHTML;a.innerHTML=b};i.$ClearInnerHtml=function(a){a.innerHTML=""};i.$Children=function(d,c){for(var b=[],a=d.firstChild;a;a=a.nextSibling)(c||a.nodeType==1)&&b.push(a);return b};function sb(a,c,e,b){b=b||"u";for(a=a?a.firstChild:g;a;a=a.nextSibling)if(a.nodeType==1){if(X(a,b)==c)return a;if(!e){var d=sb(a,c,e,b);if(d)return d}}}i.$FindChild=sb;function W(a,d,f,b){b=b||"u";var c=[];for(a=a?a.firstChild:g;a;a=a.nextSibling)if(a.nodeType==1){X(a,b)==d&&c.push(a);if(!f){var e=W(a,d,f,b);if(e.length)c=c.concat(e)}}return c}function nb(a,c,d){for(a=a?a.firstChild:g;a;a=a.nextSibling)if(a.nodeType==1){if(a.tagName==c)return a;if(!d){var b=nb(a,c,d);if(b)return b}}}i.If=nb;i.Qf=function(b,a){return b.getElementsByTagName(a)};i.Gb=function(a,f,d){d=d||"u";var e;do{if(a.nodeType==1){var c=b.$AttributeEx(a,d);if(c&&c==Hb(f,c)){e=a;break}}a=b.nc(a)}while(a&&a!=h.body);return e};function G(){var e=arguments,d,c,b,a,h=1&e[0],g=1+h;d=e[g-1]||{};for(;g<e.length;g++)if(c=e[g])for(b in c){a=c[b];if(a!==f){a=c[b];var i=d[b];d[b]=h&&(D(i)||D(a))?G(h,{},i,a):a}}return d}i.s=G;function ab(f,g){var d={},c,a,b;for(c in f){a=f[c];b=g[c];if(a!==b){var e;if(D(a)&&D(b)){a=ab(a,b);e=!rb(a)}!e&&(d[c]=a)}}return d}i.Xd=function(a){return H(a)=="function"};i.qf=function(a){return H(a)=="string"};i.cc=function(a){return!isNaN(q(a))&&isFinite(a)};i.$Each=n;i.Yd=D;function U(a){return h.createElement(a)}i.$CreateElement=U;i.$CreateDiv=function(){return U("DIV")};i.Of=function(){return U("SPAN")};i.Cd=function(){};function y(b,c,a){if(a==f)return b.getAttribute(c);b.setAttribute(c,a)}function X(a,b){return y(a,b)||y(a,"data-"+b)}i.$Attribute=y;i.$AttributeEx=X;i.ac=function(d,b,c){var a=i.Zc(y(d,b));if(isNaN(a))a=c;return a};function z(b,a){return y(b,"class",a)||""}function wb(b){var a={};n(b,function(b){if(b!=f)a[b]=b});return a}function yb(b,a){return b.match(a||zb)}function S(b,a){return wb(yb(b||"",a))}i.Nf=wb;i.Pf=yb;function cb(b,c){var a="";n(c,function(c){a&&(a+=b);a+=c});return a}function K(a,c,b){z(a,cb(" ",G(ab(S(z(a)),S(c)),S(b))))}i.nc=function(a){return a.parentNode};i.U=function(a){i.nb(a,"none")};i.D=function(a,b){i.nb(a,b?"none":"")};i.Kf=function(b,a){b.removeAttribute(a)};i.Lf=function(){return r()&&l<10};i.Xf=function(d,a){if(a)d.style.clip="rect("+c.round(a.$Top||a.E||0)+"px "+c.round(a.$Right)+"px "+c.round(a.$Bottom)+"px "+c.round(a.$Left||a.B||0)+"px)";else if(a!==f){var h=d.style.cssText,g=[new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),new RegExp(/[\s]*cliptop: .*?[;]?/i),new RegExp(/[\s]*clipright: .*?[;]?/i),new RegExp(/[\s]*clipbottom: .*?[;]?/i),new RegExp(/[\s]*clipleft: .*?[;]?/i)],e=E(h,g,"");b.$CssCssText(d,e)}};i.W=function(){return+new Date};i.$AppendChild=function(b,a){b.appendChild(a)};i.Bb=function(b,a,c){(c||a.parentNode).insertBefore(b,a)};i.Qb=function(b,a){a=a||b.parentNode;a&&a.removeChild(b)};i.wf=function(a,b){n(a,function(a){i.Qb(a,b)})};i.sc=function(a){i.wf(i.$Children(a,d),a)};i.qd=function(a,b){var c=i.nc(a);b&1&&i.z(a,(i.$CssWidth(c)-i.$CssWidth(a))/2);b&2&&i.C(a,(i.$CssHeight(c)-i.$CssHeight(a))/2)};var V={$Top:g,$Right:g,$Bottom:g,$Left:g,u:g,v:g};i.sf=function(a){var b=i.$CreateDiv();s(b,{rf:"block",mb:i.K(a),$Top:0,$Left:0,u:0,v:0});var d=i.pd(a,V);i.Bb(b,a);i.$AppendChild(b,a);var e=i.pd(a,V),c={};n(d,function(b,a){if(b==e[a])c[a]=b});s(b,V);s(b,c);s(a,{$Top:0,$Left:0});return c};i.Oc=function(b,a){return parseInt(b,a||10)};i.Zc=q;function Y(d,c,b){var a=d.cloneNode(!c);!b&&i.Kf(a,"id");return a}i.$CloneNode=Y;i.Ib=function(e,f){var a=new Image;function b(e,d){i.T(a,"load",b);i.T(a,"abort",c);i.T(a,"error",c);f&&f(a,d)}function c(a){b(a,d)}if(ob()&&l<11.6||!e)b(!e);else{i.$AddEvent(a,"load",b);i.$AddEvent(a,"abort",c);i.$AddEvent(a,"error",c);a.src=e}};i.Gf=function(d,a,e){var c=d.length+1;function b(b){c--;if(a&&b&&b.src==a.src)a=b;!c&&e&&e(a)}n(d,function(a){i.Ib(a.src,b)});b()};i.md=function(a,g,i,h){if(h)a=Y(a);var c=W(a,g);if(!c.length)c=b.Qf(a,g);for(var f=c.length-1;f>-1;f--){var d=c[f],e=Y(i);z(e,z(d));b.$CssCssText(e,d.style.cssText);b.Bb(e,d);b.Qb(d)}return a};function Fb(a){var l=this,p="",r=["av","pv","ds","dn"],d=[],q,k=0,g=0,e=0;function j(){K(a,q,(d[e||g&2||g]||"")+" "+(d[k]||""));b.$Css(a,"pointer-events",e?"none":"")}function c(){k=0;j();i.T(h,"mouseup",c);i.T(h,"touchend",c);i.T(h,"touchcancel",c)}function o(a){if(e)i.$CancelEvent(a);else{k=4;j();i.$AddEvent(h,"mouseup",c);i.$AddEvent(h,"touchend",c);i.$AddEvent(h,"touchcancel",c)}}l.id=function(a){if(a===f)return g;g=a&2||a&1;j()};l.$Enable=function(a){if(a===f)return!e;e=a?0:3;j()};l.$Elmt=a=i.$GetElement(a);y(a,"data-jssor-button","1");var m=b.Pf(z(a));if(m)p=m.shift();n(r,function(a){d.push(p+a)});q=cb(" ",d);d.unshift("");i.$AddEvent(a,"mousedown",o);i.$AddEvent(a,"touchstart",o)}i.Rb=function(a){return new Fb(a)};i.$Css=x;i.xb=m("overflow");i.C=m("top",2);i.sg=m("right",2);i.vg=m("bottom",2);i.z=m("left",2);i.$CssWidth=m("width",2);i.$CssHeight=m("height",2);i.Bf=m("marginLeft",2);i.rg=m("marginTop",2);i.K=m("position");i.nb=m("display");i.A=m("zIndex",1);i.Ic=function(b,a,c){if(a!=f)Eb(b,a,c);else return Cb(b)};i.$CssCssText=function(a,b){if(b!=f)a.style.cssText=b;else return a.style.cssText};i.ug=function(b,a){if(a===f){a=x(b,"backgroundImage")||"";var c=/\burl\s*\(\s*["']?([^"'\r\n,]+)["']?\s*\)/gi.exec(a)||[];return c[1]}x(b,"backgroundImage",a?"url('"+a+"')":"")};var L;i.xg=L={$Opacity:i.Ic,$Top:i.C,$Right:i.sg,$Bottom:i.vg,$Left:i.z,u:i.$CssWidth,v:i.$CssHeight,mb:i.K,rf:i.nb,$ZIndex:i.A};i.pd=function(c,b){var a={};n(b,function(d,b){if(L[b])a[b]=L[b](c)});return a};function s(h,l){var e=gb(),b=I(),d=eb(),j=O(h);function k(b,d,a){var e=b.jb(p(-d/2,-a/2)),f=b.jb(p(d/2,-a/2)),g=b.jb(p(d/2,a/2)),h=b.jb(p(-d/2,a/2));b.jb(p(300,300));return p(c.min(e.x,f.x,g.x,h.x)+d/2,c.min(e.y,f.y,g.y,h.y)+a/2)}function a(d,a){a=a||{};var n=a.$TranslateZ||0,p=(a.$RotateX||0)%360,q=(a.$RotateY||0)%360,u=(a.$Rotate||0)%360,l=a.$ScaleX,m=a.$ScaleY,g=a.sh;if(l==f)l=1;if(m==f)m=1;if(g==f)g=1;if(e){n=0;p=0;q=0;g=0}var c=new Bb(a.$TranslateX,a.$TranslateY,n);c.$RotateX(p);c.$RotateY(q);c.gg(u);c.cg(a.$SkewX,a.$SkewY);c.$Scale(l,m,g);if(b){c.$Move(a.B,a.E);d.style[j]=c.eg()}else if(!B||B<9){var o="",h={x:0,y:0};if(a.$OriginalWidth)h=k(c,a.$OriginalWidth,a.$OriginalHeight);i.rg(d,h.y);i.Bf(d,h.x);o=c.ig();var s=d.style.filter,t=new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g),r=E(s,[t],o);T(d,r)}}s=function(e,c){c=c||{};var j=c.B,k=c.E,h;n(L,function(a,b){h=c[b];h!==f&&a(e,h)});i.Xf(e,c.$Clip);if(!b){j!=f&&i.z(e,(c.wd||0)+j);k!=f&&i.C(e,(c.sd||0)+k)}if(c.jg)if(d)xb(i.$CreateCallback(g,Q,e,c));else a(e,c)};if(d);if(e);else if(!b)a=Q;i.G=s;s(h,l)}i.G=s;function Bb(j,k,o){var d=this,b=[1,0,0,0,0,1,0,0,0,0,1,0,j||0,k||0,o||0,1],i=c.sin,h=c.cos,l=c.tan;function f(a){return a*c.PI/180}function n(a,b){return{x:a,y:b}}function m(b,c,f,g,i,l,n,o,q,t,u,w,y,A,C,F,a,d,e,h,j,k,m,p,r,s,v,x,z,B,D,E){return[b*a+c*j+f*r+g*z,b*d+c*k+f*s+g*B,b*e+c*m+f*v+g*D,b*h+c*p+f*x+g*E,i*a+l*j+n*r+o*z,i*d+l*k+n*s+o*B,i*e+l*m+n*v+o*D,i*h+l*p+n*x+o*E,q*a+t*j+u*r+w*z,q*d+t*k+u*s+w*B,q*e+t*m+u*v+w*D,q*h+t*p+u*x+w*E,y*a+A*j+C*r+F*z,y*d+A*k+C*s+F*B,y*e+A*m+C*v+F*D,y*h+A*p+C*x+F*E]}function e(c,a){return m.apply(g,(a||b).concat(c))}d.$Scale=function(a,c,d){if(a!=1||c!=1||d!=1)b=e([a,0,0,0,0,c,0,0,0,0,d,0,0,0,0,1])};d.$Move=function(a,c,d){b[12]+=a||0;b[13]+=c||0;b[14]+=d||0};d.$RotateX=function(c){if(c){a=f(c);var d=h(a),g=i(a);b=e([1,0,0,0,0,d,g,0,0,-g,d,0,0,0,0,1])}};d.$RotateY=function(c){if(c){a=f(c);var d=h(a),g=i(a);b=e([d,0,-g,0,0,1,0,0,g,0,d,0,0,0,0,1])}};d.gg=function(c){if(c){a=f(c);var d=h(a),g=i(a);b=e([d,g,0,0,-g,d,0,0,0,0,1,0,0,0,0,1])}};d.cg=function(a,c){if(a||c){j=f(a);k=f(c);b=e([1,l(k),0,0,l(j),1,0,0,0,0,1,0,0,0,0,1])}};d.jb=function(c){var a=e(b,[1,0,0,0,0,1,0,0,0,0,1,0,c.x,c.y,0,1]);return n(a[12],a[13])};d.eg=function(){return"matrix3d("+b.join(",")+")"};d.ig=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+b[0]+", M12="+b[4]+", M21="+b[1]+", M22="+b[5]+", SizingMethod='auto expand')"}}new(function(){var a=this;function b(d,g){for(var j=d[0].length,i=d.length,h=g[0].length,f=[],c=0;c<i;c++)for(var k=f[c]=[],b=0;b<h;b++){for(var e=0,a=0;a<j;a++)e+=d[c][a]*g[a][b];k[b]=e}return f}a.$ScaleX=function(b,c){return a.vd(b,c,0)};a.$ScaleY=function(b,c){return a.vd(b,0,c)};a.vd=function(a,c,d){return b(a,[[c,0],[0,d]])};a.jb=function(d,c){var a=b(d,[[c.x],[c.y]]);return p(a[0][0],a[1][0])}});var R={wd:0,sd:0,B:0,E:0,$Zoom:1,$ScaleX:1,$ScaleY:1,$Rotate:0,$RotateX:0,$RotateY:0,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0};i.Hc=function(c,d){var a=c||{};if(c)if(b.Xd(c))a={Z:a};else if(b.Xd(c.$Clip))a.$Clip={Z:c.$Clip};a.Z=a.Z||d;if(a.$Clip)a.$Clip.Z=a.$Clip.Z||d;return a};function vb(c,a){var b={};n(c,function(c,d){var e=c;if(a[d]!=f)if(i.cc(c))e=c+a[d];else e=vb(c,a[d]);b[d]=e});return b}i.ae=vb;i.Qc=function(n,j,s,t,B,C,o){var a=j;if(n){a={};for(var i in j){var D=C[i]||1,z=B[i]||[0,1],h=(s-z[0])/z[1];h=c.min(c.max(h,0),1);h=h*D;var x=c.floor(h);if(h!=x)h-=x;var k=t.Z||e.$Linear,m,E=n[i],q=j[i];if(b.cc(q)){k=t[i]||k;var A=k(h);m=E+q*A}else{m=b.s({bc:{}},n[i]);var y=t[i]||{};b.$Each(q.bc||q,function(d,a){k=y[a]||y.Z||k;var c=k(h),b=d*c;m.bc[a]=b;m[a]+=b})}a[i]=m}var w=b.$Each(j,function(b,a){return R[a]!=f});w&&b.$Each(R,function(c,b){if(a[b]==f&&n[b]!==f)a[b]=n[b]});if(w){if(a.$Zoom)a.$ScaleX=a.$ScaleY=a.$Zoom;a.$OriginalWidth=o.$OriginalWidth;a.$OriginalHeight=o.$OriginalHeight;if(r()&&l>=11&&(j.B||j.E)&&s!=0&&s!=1)a.$Rotate=a.$Rotate||1e-8;a.jg=d}}if(j.$Clip&&o.$Move){var p=a.$Clip.bc,v=(p.$Top||0)+(p.$Bottom||0),u=(p.$Left||0)+(p.$Right||0);a.$Left=(a.$Left||0)+u;a.$Top=(a.$Top||0)+v;a.$Clip.$Left-=u;a.$Clip.$Right-=u;a.$Clip.$Top-=v;a.$Clip.$Bottom-=v}if(a.$Clip&&b.Lf()&&!a.$Clip.$Top&&!a.$Clip.$Left&&!a.$Clip.E&&!a.$Clip.B&&a.$Clip.$Right==o.$OriginalWidth&&a.$Clip.$Bottom==o.$OriginalHeight)a.$Clip=g;return a}};function o(){var a=this,d=[];function h(a,b){d.push({zc:a,Ec:b})}function g(a,c){b.$Each(d,function(b,e){b.zc==a&&b.Ec===c&&d.splice(e,1)})}a.$On=a.addEventListener=h;a.$Off=a.removeEventListener=g;a.k=function(a){var c=[].slice.call(arguments,1);b.$Each(d,function(b){b.zc==a&&b.Ec.apply(j,c)})}}var l=function(A,D,g,L,O,J){A=A||0;var a=this,p,m,n,t,B=0,H,I,G,C,z=0,h=0,l=0,y,i,e,f,o,x,v=[],w;function P(a){e+=a;f+=a;i+=a;h+=a;l+=a;z+=a}function s(p){var j=p;if(o)if(!x&&(j>=f||j<e)||x&&j>=e)j=((j-e)%o+o)%o+e;if(!y||t||h!=j){var k=c.min(j,f);k=c.max(k,e);if(!y||t||k!=l){if(J){var m=(k-i)/(D||1);if(g.$Reverse)m=1-m;var n=b.Qc(O,J,m,H,G,I,g);if(w)b.$Each(n,function(b,a){w[a]&&w[a](L,b)});else b.G(L,n)}a.Nc(l-i,k-i);var r=l,q=l=k;b.$Each(v,function(b,c){var a=!y&&x||j<=h?v[v.length-c-1]:b;a.F(l-z)});h=j;y=d;a.dc(r,q)}}}function E(a,b,d){b&&a.$Shift(f);if(!d){e=c.min(e,a.fc()+z);f=c.max(f,a.lb()+z)}v.push(a)}var u=j.requestAnimationFrame||j.webkitRequestAnimationFrame||j.mozRequestAnimationFrame||j.msRequestAnimationFrame;if(b.$IsBrowserSafari()&&b.$BrowserVersion()<7||!u)u=function(a){b.$Delay(a,g.$Interval)};function K(){if(p){var d=b.W(),e=c.min(d-B,g.gd),a=h+e*n;B=d;if(a*n>=m*n)a=m;s(a);if(!t&&a*n>=m*n)M(C);else u(K)}}function r(g,i,j){if(!p){p=d;t=j;C=i;g=c.max(g,e);g=c.min(g,f);m=g;n=m<h?-1:1;a.Yc();B=b.W();u(K)}}function M(b){if(p){t=p=C=k;a.ed();b&&b()}}a.$Play=function(a,b,c){r(a?h+a:f,b,c)};a.Pc=r;a.sb=M;a.Be=function(a){r(a)};a.bb=function(){return h};a.Bd=function(){return m};a.Eb=function(){return l};a.F=s;a.me=function(){s(f,d)};a.$Move=function(a){s(h+a)};a.$IsPlaying=function(){return p};a.fe=function(a){o=a};a.$Shift=P;a.P=function(a,b){E(a,0,b)};a.yc=function(a){E(a,1)};a.hd=function(a){f+=a};a.fc=function(){return e};a.lb=function(){return f};a.dc=a.Yc=a.ed=a.Nc=b.Cd;a.Jc=b.W();g=b.s({$Interval:16,gd:50},g);o=g.Lc;x=g.cf;w=g.Ze;e=i=A;f=A+D;I=g.$Round||{};G=g.$During||{};H=b.Hc(g.$Easing)};var m={Mb:"data-scale",vc:"data-scale-ratio",rb:"data-autocenter"},n=new function(){var a=this;a.R=function(c,a,e,d){(d||!b.$Attribute(c,a))&&b.$Attribute(c,a,e)};a.Xb=function(a){var c=b.ac(a,m.rb);b.qd(a,c)}},q=j.$JssorSlideshowFormations$=new function(){var h=this,b=0,a=1,f=2,e=3,s=1,r=2,t=4,q=8,w=256,x=512,v=1024,u=2048,j=u+s,i=u+r,o=x+s,m=x+r,n=w+t,k=w+q,l=v+t,p=v+q;function y(a){return(a&r)==r}function z(a){return(a&t)==t}function g(b,a,c){c.push(a);b[a]=b[a]||[];b[a].push(c)}h.$FormationStraight=function(f){for(var d=f.$Cols,e=f.$Rows,s=f.$Assembly,t=f.Ob,r=[],a=0,b=0,p=d-1,q=e-1,h=t-1,c,b=0;b<e;b++)for(a=0;a<d;a++){switch(s){case j:c=h-(a*e+(q-b));break;case l:c=h-(b*d+(p-a));break;case o:c=h-(a*e+b);case n:c=h-(b*d+a);break;case i:c=a*e+b;break;case k:c=b*d+(p-a);break;case m:c=a*e+(q-b);break;default:c=b*d+a}g(r,c,[b,a])}return r};h.$FormationSwirl=function(q){var x=q.$Cols,y=q.$Rows,B=q.$Assembly,w=q.Ob,A=[],z=[],u=0,c=0,h=0,r=x-1,s=y-1,t,p,v=0;switch(B){case j:c=r;h=0;p=[f,a,e,b];break;case l:c=0;h=s;p=[b,e,a,f];break;case o:c=r;h=s;p=[e,a,f,b];break;case n:c=r;h=s;p=[a,e,b,f];break;case i:c=0;h=0;p=[f,b,e,a];break;case k:c=r;h=0;p=[a,f,b,e];break;case m:c=0;h=s;p=[e,b,f,a];break;default:c=0;h=0;p=[b,f,a,e]}u=0;while(u<w){t=h+","+c;if(c>=0&&c<x&&h>=0&&h<y&&!z[t]){z[t]=d;g(A,u++,[h,c])}else switch(p[v++%p.length]){case b:c--;break;case f:h--;break;case a:c++;break;case e:h++}switch(p[v%p.length]){case b:c++;break;case f:h++;break;case a:c--;break;case e:h--}}return A};h.$FormationZigZag=function(p){var w=p.$Cols,x=p.$Rows,z=p.$Assembly,v=p.Ob,t=[],u=0,c=0,d=0,q=w-1,r=x-1,y,h,s=0;switch(z){case j:c=q;d=0;h=[f,a,e,a];break;case l:c=0;d=r;h=[b,e,a,e];break;case o:c=q;d=r;h=[e,a,f,a];break;case n:c=q;d=r;h=[a,e,b,e];break;case i:c=0;d=0;h=[f,b,e,b];break;case k:c=q;d=0;h=[a,f,b,f];break;case m:c=0;d=r;h=[e,b,f,b];break;default:c=0;d=0;h=[b,f,a,f]}u=0;while(u<v){y=d+","+c;if(c>=0&&c<w&&d>=0&&d<x&&typeof t[y]=="undefined"){g(t,u++,[d,c]);switch(h[s%h.length]){case b:c++;break;case f:d++;break;case a:c--;break;case e:d--}}else{switch(h[s++%h.length]){case b:c--;break;case f:d--;break;case a:c++;break;case e:d++}switch(h[s++%h.length]){case b:c++;break;case f:d++;break;case a:c--;break;case e:d--}}}return t};h.$FormationStraightStairs=function(q){var u=q.$Cols,v=q.$Rows,e=q.$Assembly,t=q.Ob,r=[],s=0,c=0,d=0,f=u-1,h=v-1,x=t-1;switch(e){case j:case m:case o:case i:var a=0,b=0;break;case k:case l:case n:case p:var a=f,b=0;break;default:e=p;var a=f,b=0}c=a;d=b;while(s<t){if(z(e)||y(e))g(r,x-s++,[d,c]);else g(r,s++,[d,c]);switch(e){case j:case m:c--;d++;break;case o:case i:c++;d--;break;case k:case l:c--;d--;break;case p:case n:default:c++;d++}if(c<0||d<0||c>f||d>h){switch(e){case j:case m:a++;break;case k:case l:case o:case i:b++;break;case p:case n:default:a--}if(a<0||b<0||a>f||b>h){switch(e){case j:case m:a=f;b++;break;case o:case i:b=h;a++;break;case k:case l:b=h;a--;break;case p:case n:default:a=0;b++}if(b>h)b=h;else if(b<0)b=0;else if(a>f)a=f;else if(a<0)a=0}d=b;c=a}}return r};h.$FormationSquare=function(i){var a=i.$Cols||1,b=i.$Rows||1,j=[],d,e,f,h,k;f=a<b?(b-a)/2:0;h=a>b?(a-b)/2:0;k=c.round(c.max(a/2,b/2))+1;for(d=0;d<a;d++)for(e=0;e<b;e++)g(j,k-c.min(d+1+f,e+1+h,a-d+f,b-e+h),[e,d]);return j};h.$FormationRectangle=function(f){var d=f.$Cols||1,e=f.$Rows||1,h=[],a,b,i;i=c.round(c.min(d/2,e/2))+1;for(a=0;a<d;a++)for(b=0;b<e;b++)g(h,i-c.min(a+1,b+1,d-a,e-b),[b,a]);return h};h.$FormationRandom=function(d){for(var e=[],a,b=0;b<d.$Rows;b++)for(a=0;a<d.$Cols;a++)g(e,c.ceil(1e5*c.random())%13,[b,a]);return e};h.$FormationCircle=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,b=0;b<e;b++)for(a=0;a<f;a++)g(h,c.round(c.sqrt(c.pow(b-i,2)+c.pow(a-j,2))),[a,b]);return h};h.$FormationCross=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,b=0;b<e;b++)for(a=0;a<f;a++)g(h,c.round(c.min(c.abs(b-i),c.abs(a-j))),[a,b]);return h};h.$FormationRectangleCross=function(f){for(var h=f.$Cols||1,i=f.$Rows||1,j=[],a,d=h/2-.5,e=i/2-.5,k=c.max(d,e)+1,b=0;b<h;b++)for(a=0;a<i;a++)g(j,c.round(k-c.max(d-c.abs(b-d),e-c.abs(a-e)))-1,[a,b]);return j}};j.$JssorSlideshowRunner$=function(m,s,p,u,z,A){var a=this,v,h,f,y=0,x=u.$TransitionsOrder,r,i=8;function t(a){if(a.$Top)a.E=a.$Top;if(a.$Left)a.B=a.$Left;b.$Each(a,function(a){b.Yd(a)&&t(a)})}function j(h,f,g){var a={$Interval:f,$Duration:1,$Delay:0,$Cols:1,$Rows:1,$Opacity:0,$Zoom:0,$Clip:0,$Move:k,$SlideOut:k,$Reverse:k,$Formation:q.$FormationRandom,$Assembly:1032,$ChessMode:{$Column:0,$Row:0},$Easing:e.$Linear,$Round:{},Yb:[],$During:{}};b.s(a,h);if(a.$Rows==0)a.$Rows=c.round(a.$Cols*g);t(a);a.Ob=a.$Cols*a.$Rows;a.$Easing=b.Hc(a.$Easing,e.$Linear);a.Me=c.ceil(a.$Duration/a.$Interval);a.Le=function(c,b){c/=a.$Cols;b/=a.$Rows;var f=c+"x"+b;if(!a.Yb[f]){a.Yb[f]={u:c,v:b};for(var d=0;d<a.$Cols;d++)for(var e=0;e<a.$Rows;e++)a.Yb[f][e+","+d]={$Top:e*b,$Right:d*c+c,$Bottom:e*b+b,$Left:d*c}}return a.Yb[f]};if(a.$Brother){a.$Brother=j(a.$Brother,f,g);a.$SlideOut=d}return a}function n(z,i,a,v,n,l){var y=this,t,u={},h={},m=[],f,e,r,p=a.$ChessMode.$Column||0,q=a.$ChessMode.$Row||0,g=a.Le(n,l),o=B(a),C=o.length-1,s=a.$Duration+a.$Delay*C,w=v+s,j=a.$SlideOut,x;w+=50;function B(a){var b=a.$Formation(a);return a.$Reverse?b.reverse():b}y.fd=w;y.Zb=function(d){d-=v;var e=d<s;if(e||x){x=e;if(!j)d=s-d;var f=c.ceil(d/a.$Interval);b.$Each(h,function(a,e){var d=c.max(f,a.Oe);d=c.min(d,a.length-1);if(a.ad!=d){if(!a.ad&&!j)b.D(m[e]);else d==a.Ne&&j&&b.U(m[e]);a.ad=d;b.G(m[e],a[d])}})}};i=b.$CloneNode(i);A(i,0,0);b.$Each(o,function(i,m){b.$Each(i,function(G){var I=G[0],H=G[1],v=I+","+H,o=k,s=k,x=k;if(p&&H%2){if(p&3)o=!o;if(p&12)s=!s;if(p&16)x=!x}if(q&&I%2){if(q&3)o=!o;if(q&12)s=!s;if(q&16)x=!x}a.$Top=a.$Top||a.$Clip&4;a.$Bottom=a.$Bottom||a.$Clip&8;a.$Left=a.$Left||a.$Clip&1;a.$Right=a.$Right||a.$Clip&2;var C=s?a.$Bottom:a.$Top,z=s?a.$Top:a.$Bottom,B=o?a.$Right:a.$Left,A=o?a.$Left:a.$Right;a.$Clip=C||z||B||A;r={};e={E:0,B:0,$Opacity:1,u:n,v:l};f=b.s({},e);t=b.s({},g[v]);if(a.$Opacity)e.$Opacity=2-a.$Opacity;if(a.$ZIndex){e.$ZIndex=a.$ZIndex;f.$ZIndex=0}var K=a.$Cols*a.$Rows>1||a.$Clip;if(a.$Zoom||a.$Rotate){var J=d;if(J){e.$Zoom=a.$Zoom?a.$Zoom-1:1;f.$Zoom=1;var N=a.$Rotate||0;e.$Rotate=N*360*(x?-1:1);f.$Rotate=0}}if(K){var i=t.bc={};if(a.$Clip){var w=a.$ScaleClip||1;if(C&&z){i.$Top=g.v/2*w;i.$Bottom=-i.$Top}else if(C)i.$Bottom=-g.v*w;else if(z)i.$Top=g.v*w;if(B&&A){i.$Left=g.u/2*w;i.$Right=-i.$Left}else if(B)i.$Right=-g.u*w;else if(A)i.$Left=g.u*w}r.$Clip=t;f.$Clip=g[v]}var L=o?1:-1,M=s?1:-1;if(a.x)e.B+=n*a.x*L;if(a.y)e.E+=l*a.y*M;b.$Each(e,function(a,c){if(b.cc(a))if(a!=f[c])r[c]=a-f[c]});u[v]=j?f:e;var D=a.Me,y=c.round(m*a.$Delay/a.$Interval);h[v]=new Array(y);h[v].Oe=y;h[v].Ne=y+D-1;for(var F=0;F<=D;F++){var E=b.Qc(f,r,F/D,a.$Easing,a.$During,a.$Round,{$Move:a.$Move,$OriginalWidth:n,$OriginalHeight:l});E.$ZIndex=E.$ZIndex||1;h[v].push(E)}})});o.reverse();b.$Each(o,function(a){b.$Each(a,function(c){var f=c[0],e=c[1],d=f+","+e,a=i;if(e||f)a=b.$CloneNode(i);b.G(a,u[d]);b.xb(a,"hidden");b.K(a,"absolute");z.ge(a);m[d]=a;b.D(a,!j)})})}function w(){var a=this,b=0;l.call(a,0,v);a.dc=function(c,a){if(a-b>i){b=a;f&&f.Zb(a);h&&h.Zb(a)}};a.Kc=r}a.Fe=function(){var a=0,b=u.$Transitions,d=b.length;if(x)a=y++%d;else a=c.floor(c.random()*d);b[a]&&(b[a].tb=a);return b[a]};a.Ce=function(x,y,k,l,b,t){a.ub();r=b;b=j(b,i,t);var g=l.rd,e=k.rd;g["no-image"]=!l.ic;e["no-image"]=!k.ic;var o=g,q=e,w=b,d=b.$Brother||j({},i,t);if(!b.$SlideOut){o=e;q=g}var u=d.$Shift||0;h=new n(m,q,d,c.max(u-d.$Interval,0),s,p);f=new n(m,o,w,c.max(d.$Interval-u,0),s,p);h.Zb(0);f.Zb(0);v=c.max(h.fd,f.fd);a.tb=x};a.ub=function(){m.ub();h=g;f=g};a.Ke=function(){var a=g;if(f)a=new w;return a};if(z&&b.$WebKitVersion()<537)i=16;o.call(a);l.call(a,-1e7,1e7)};var p={kc:1};j.$JssorBulletNavigator$=function(a,E){var f=this;o.call(f);a=b.$GetElement(a);var u,C,B,t,l=0,e,q,j,y,z,i,h,s,r,D=[],A=[];function x(a){a!=-1&&A[a].id(a==l)}function v(a){f.k(p.kc,a*q)}f.$Elmt=a;f.pc=function(a){if(a!=t){var d=l,b=c.floor(a/q);l=b;t=a;x(d);x(b)}};f.qc=function(c){b.D(a,c)};var w;f.Mc=function(x){if(!w){u=c.ceil(x/q);l=0;var n=s+y,o=r+z,m=c.ceil(u/j)-1;C=s+n*(!i?m:j-1);B=r+o*(i?m:j-1);b.$CssWidth(a,C);b.$CssHeight(a,B);for(var f=0;f<u;f++){var t=b.Of();b.$InnerText(t,f+1);var k=b.md(h,"numbertemplate",t,d);b.K(k,"absolute");var p=f%(m+1);b.z(k,!i?n*p:f%j*n);b.C(k,i?o*p:c.floor(f/(m+1))*o);b.$AppendChild(a,k);D[f]=k;e.$ActionMode&1&&b.$AddEvent(k,"click",b.$CreateCallback(g,v,f));e.$ActionMode&2&&b.$AddEvent(k,"mouseenter",b.$CreateCallback(g,v,f));A[f]=b.Rb(k)}w=d}};f.Vb=e=b.s({$SpacingX:10,$SpacingY:10,$Orientation:1,$ActionMode:1},E);h=b.$FindChild(a,"prototype");s=b.$CssWidth(h);r=b.$CssHeight(h);b.Qb(h,a);q=e.$Steps||1;j=e.$Rows||1;y=e.$SpacingX;z=e.$SpacingY;i=e.$Orientation-1;e.$Scale==k&&n.R(a,m.Mb,1);e.$AutoCenter&&n.R(a,m.rb,e.$AutoCenter);n.Xb(a)};j.$JssorArrowNavigator$=function(a,f,i){var c=this;o.call(c);var t,e,h,j;b.$CssWidth(a);b.$CssHeight(a);var r,q;function l(a){c.k(p.kc,a,d)}function v(c){b.D(a,c);b.D(f,c)}function u(){r.$Enable(i.$Loop||e>0);q.$Enable(i.$Loop||e<t-i.$Cols)}c.pc=function(b,a,c){if(c)e=a;else{e=b;u()}};c.qc=v;var s;c.Mc=function(c){t=c;e=0;if(!s){b.$AddEvent(a,"click",b.$CreateCallback(g,l,-j));b.$AddEvent(f,"click",b.$CreateCallback(g,l,j));r=b.Rb(a);q=b.Rb(f);s=d}};c.Vb=h=b.s({$Steps:1},i);j=h.$Steps;if(h.$Scale==k){n.R(a,m.Mb,1);n.R(f,m.Mb,1)}if(h.$AutoCenter){n.R(a,m.rb,h.$AutoCenter);n.R(f,m.rb,h.$AutoCenter)}n.Xb(a);n.Xb(f)};j.$JssorThumbnailNavigator$=function(h,D){var j=this,A,s,a,x=[],B,z,e,t,u,w,v,r,l,f,q;o.call(j);h=b.$GetElement(h);function C(o,f){var h=this,c,n,m;function r(){n.id(s==f)}function i(g){if(g||!l.re()){var a=e-f%e,b=l.bd((f+a)/e-1),c=b*e+e-a;j.k(p.kc,c,k,d)}}h.tb=f;h.dd=r;m=o.oe||o.ic||b.$CreateDiv();h.mc=c=b.md(q,"thumbnailtemplate",m,d);n=b.Rb(c);a.$ActionMode&1&&b.$AddEvent(c,"click",b.$CreateCallback(g,i,0));a.$ActionMode&2&&b.$AddEvent(c,"mouseenter",b.$CreateCallback(g,i,1))}j.pc=function(b,d,f){var a=s;s=b;a!=-1&&x[a].dd();x[b].dd();!f&&l.$PlayTo(l.bd(c.floor(d/e)))};j.qc=function(a){b.D(h,a)};var y;j.Mc=function(G,D){if(!y){A=G;c.ceil(A/e);s=-1;r=c.min(r,D.length);var g=a.$Orientation&1,o=w+(w+t)*(e-1)*(1-g),n=v+(v+u)*(e-1)*g,q=o+(o+t)*(r-1)*g,p=n+(n+u)*(r-1)*(1-g);b.K(f,"absolute");b.xb(f,"hidden");b.z(f,(B-q)/2);b.C(f,(z-p)/2);b.$CssWidth(f,q);b.$CssHeight(f,p);var m=[];b.$Each(D,function(k,h){var i=new C(k,h),d=i.mc,a=c.floor(h/e),j=h%e;b.z(d,(w+t)*j*(1-g));b.C(d,(v+u)*j*g);if(!m[a]){m[a]=b.$CreateDiv();b.$AppendChild(f,m[a])}b.$AppendChild(m[a],d);x.push(i)});var F=b.s({$AutoPlay:0,$NaviQuitDrag:k,$SlideWidth:o,$SlideHeight:n,$SlideSpacing:t*g+u*(1-g),$MinDragOffsetToSlide:12,$SlideDuration:200,$PauseOnHover:1,$PlayOrientation:a.$Orientation,$DragOrientation:a.$NoDrag||a.$DisableDrag?0:a.$Orientation},a);l=new i(h,F);j.Jf=l.Jf;y=d}};j.Vb=a=b.s({$SpacingX:0,$SpacingY:0,$Cols:1,$Orientation:1,$ActionMode:1},D);B=b.$CssWidth(h);z=b.$CssHeight(h);f=b.$FindChild(h,"slides",d);q=b.$FindChild(f,"prototype");w=b.$CssWidth(q);v=b.$CssHeight(q);b.Qb(q,f);e=a.$Rows||1;t=a.$SpacingX;u=a.$SpacingY;r=a.$Cols;a.$Scale==k&&n.R(h,m.Mb,1);a.$AutoCenter&=a.$Orientation;a.$AutoCenter&&n.R(h,m.rb,a.$AutoCenter);n.Xb(h)};function r(e,d,c){var a=this;l.call(a,0,c);a.cd=b.Cd;a.Wc=0;a.Vc=c}j.$JssorCaptionSlideo$=function(v,j,u,E){var a=this,w,o={},p=j.$Transitions,s=j.$Controls,m=new l(0,0),q=[],h=[],D=E,f=D?1e8:0;l.call(a,0,0);function r(d,c){var a={};b.$Each(d,function(d,f){var e=o[f];if(e){if(b.Yd(d))d=r(d,c||f=="e");else if(c)if(b.cc(d))d=w[d];a[e]=d}});return a}function t(d,e){var a=[],c=b.$Children(d);b.$Each(c,function(c){var h=b.$AttributeEx(c,"u")=="caption";if(h){var d=b.$AttributeEx(c,"t"),g=p[b.Oc(d)]||p[d],f={$Elmt:c,Kc:g};a.push(f)}a=a.concat(t(c,e+1))});return a}function n(c,e){var a=q[c];if(a==g){a=q[c]={X:c,wc:[],Ud:[]};var d=0;!b.$Each(h,function(a,b){d=b;return a.X>c})&&d++;h.splice(d,0,a)}return a}function z(t,u,h){var a,e;if(s){var o=b.$AttributeEx(t,"c");if(o){var m=s[b.Oc(o)];if(m){a=n(m.r,0);a.Mf=m.e||0}}}b.$Each(u,function(i){var g=b.s(d,{},r(i)),j=b.Hc(g.$Easing);delete g.$Easing;if(g.$Left){g.B=g.$Left;j.B=j.$Left;delete g.$Left}if(g.$Top){g.E=g.$Top;j.E=j.$Top;delete g.$Top}var o={$Easing:j,$OriginalWidth:h.u,$OriginalHeight:h.v},k=new l(i.b,i.d,o,t,h,g);f=c.max(f,i.b+i.d);if(a){if(!e)e=new l(i.b,0);e.P(k)}else{var m=n(i.b,i.b+i.d);m.wc.push(k)}h=b.ae(h,g)});if(a&&e){e.me();var i=e,k,j=e.fc(),p=e.lb(),q=c.max(p,a.Mf);if(a.X<p){if(a.X>j){i=new l(j,a.X-j);i.P(e,d)}else i=g;k=new l(a.X,q-j,{Lc:q-a.X,cf:d});k.P(e,d)}i&&a.wc.push(i);k&&a.Ud.push(k)}return h}function y(a){b.$Each(a,function(f){var a=f.$Elmt,e=b.$CssWidth(a),d=b.$CssHeight(a),c={$Left:b.z(a),$Top:b.C(a),B:0,E:0,$Opacity:1,$ZIndex:b.A(a)||0,$Rotate:0,$RotateX:0,$RotateY:0,$ScaleX:1,$ScaleY:1,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0,u:e,v:d,$Clip:{$Top:0,$Right:e,$Bottom:d,$Left:0}};c.wd=c.$Left;c.sd=c.$Top;z(a,f.Kc,c)})}function B(f,e,g){var c=f.b-e;if(c){var b=new l(e,c);b.P(m,d);b.$Shift(g);a.P(b)}a.hd(f.d);return c}function A(e){var c=m.fc(),d=0;b.$Each(e,function(e,f){e=b.s({d:u},e);B(e,c,d);c=e.b;d+=e.d;if(!f||e.t==2){a.Wc=c;a.Vc=c+e.d}})}function i(k,d,e){var g=d.length;if(g>4)for(var m=c.ceil(g/4),a=0;a<m;a++){var h=d.slice(a*4,c.min(a*4+4,g)),j=new l(h[0].X,0);i(j,h,e);k.P(j)}else b.$Each(d,function(a){b.$Each(e?a.Ud:a.wc,function(a){e&&a.hd(f-a.lb());k.P(a)})})}a.cd=function(){a.F(-1,d)};w=[e.$Linear,e.$Swing,e.$InQuad,e.$OutQuad,e.$InOutQuad,e.$InCubic,e.$OutCubic,e.$InOutCubic,e.$InQuart,e.$OutQuart,e.$InOutQuart,e.$InQuint,e.$OutQuint,e.$InOutQuint,e.$InSine,e.$OutSine,e.$InOutSine,e.$InExpo,e.$OutExpo,e.$InOutExpo,e.$InCirc,e.$OutCirc,e.$InOutCirc,e.$InElastic,e.$OutElastic,e.$InOutElastic,e.$InBack,e.$OutBack,e.$InOutBack,e.$InBounce,e.$OutBounce,e.$InOutBounce,e.$Early,e.$Late];var C={$Top:"y",$Left:"x",$Bottom:"m",$Right:"t",$Rotate:"r",$RotateX:"rX",$RotateY:"rY",$ScaleX:"sX",$ScaleY:"sY",$TranslateX:"tX",$TranslateY:"tY",$TranslateZ:"tZ",$SkewX:"kX",$SkewY:"kY",$Opacity:"o",$Easing:"e",$ZIndex:"i",$Clip:"c"};b.$Each(C,function(b,a){o[b]=a});y(t(v,1));i(m,h);var x=j.$Breaks||[],k=[].concat(x[b.Oc(b.$AttributeEx(v,"b"))]||[]);k.push({b:f,d:k.length?0:u});A(k);f=c.max(f,a.lb());i(a,h,d);a.F(-1)};var i=j.$JssorSlider$=function(){var a=this;b.Ef(a,o);var ub="data-jssor-slider",Sb="data-jssor-thumb",w,n,X,fb,V,jb,U,eb,H,G,Kb,fc,jc=1,ec=1,Tb=1,Xb={},z,R,sb,Mb,Jb,ib,wb,vb,db,s=-1,N,yb,q,K,I,Gb,ob,pb,qb,t,S,x,P,Ib,Z=[],bc,cc,Yb,kc,Fc,v,gb,F,ac,nb,xb,zb,mb,Ab,L,hb,Q,J=1,T,D,Y,Bb=0,Cb=0,M,kb,lb,Nb,y,bb,A,Db,ab=[],Ob=b.$Device(),Fb=Ob.qg,B=[],C,O,E,tb,Rb,W;function sc(e,n,o){var k=this,h={$Top:2,$Right:1,$Bottom:2,$Left:1},l={$Top:"top",$Right:"right",$Bottom:"bottom",$Left:"left"},g,a,f,i,j={};k.$Elmt=e;k.$ScaleSize=function(q,k){var p,s=q,r=k;if(!f){f=b.sf(e);g=e.parentNode;i={$Scale:b.ac(e,m.Mb,1),$AutoCenter:b.ac(e,m.rb)};b.$Each(l,function(c,a){j[a]=b.ac(e,"data-scale-"+c,1)});a=e;if(n){a=b.$CloneNode(g,d);b.G(a,{$Top:0,$Left:0});b.$AppendChild(a,e);b.$AppendChild(g,a)}}if(o)p=q>k?q:k;else s=r=p=c.pow(H<G?k:q,i.$Scale);b.Vf(a,p);b.$Attribute(a,m.vc,p);b.$CssWidth(g,f.u*s);b.$CssHeight(g,f.v*r);var t=b.$IsBrowserIE()&&b.$BrowserEngineVersion()<9||b.$BrowserEngineVersion()<10&&b.$IsBrowserIeQuirks()?p:1,u=(s-t)*f.u/2,v=(r-t)*f.v/2;b.z(a,u);b.C(a,v);b.$Each(f,function(d,a){if(h[a]&&d){var e=(h[a]&1)*c.pow(q,j[a])*d+(h[a]&2)*c.pow(k,j[a])*d/2;b.xg[a](g,e)}});b.qd(g,i.$AutoCenter)}}function Ec(){var b=this;l.call(b,-1e8,2e8);b.Wf=function(){var a=b.Eb(),d=c.floor(a),f=u(d),e=a-c.floor(a);return{tb:f,Yf:d,mb:e}};b.dc=function(e,b){var f=c.floor(b);if(f!=b&&b>e)f++;dc(f,d);a.k(i.$EVT_POSITION_CHANGE,u(b),u(e),b,e)}}function Dc(){var a=this;l.call(a,0,0,{Lc:q});b.$Each(B,function(b){L&1&&b.fe(q);a.yc(b);b.$Shift(mb/qb)})}function Cc(){var a=this,b=Db.$Elmt;l.call(a,-1,2,{$Easing:e.$Linear,Ze:{mb:ic},Lc:q},b,{mb:1},{mb:-2});a.mc=b}function uc(o,m){var b=this,e,f,h,j,c;l.call(b,-1e8,2e8,{gd:100});b.Yc=function(){T=d;Y=g;a.k(i.$EVT_SWIPE_START,u(y.bb()),y.bb())};b.ed=function(){T=k;j=k;var b=y.Wf();a.k(i.$EVT_SWIPE_END,u(y.bb()),y.bb());!b.mb&&Gc(b.Yf,s)};b.dc=function(g,d){var a;if(j)a=c;else{a=f;if(h){var b=d/h;a=n.$SlideEasing(b)*(f-e)+e}}y.F(a)};b.jc=function(a,d,c,g){e=a;f=d;h=c;y.F(a);b.F(0);b.Pc(c,g)};b.pf=function(a){j=d;c=a;b.$Play(a,g,d)};b.of=function(a){c=a};y=new Ec;y.P(o);y.P(m)}function vc(){var c=this,a=gc();b.A(a,0);b.$Css(a,"pointerEvents","none");c.$Elmt=a;c.ge=function(c){b.$AppendChild(a,c);b.D(a)};c.ub=function(){b.U(a);b.sc(a)}}function Bc(m,f){var e=this,r,L,y,j,z=[],x,D,T,H,P,F,J,h,w,p;l.call(e,-t,t+1,{});function E(a){r&&r.cd();S(m,a,0);F=d;r=new V.$Class(m,V,b.Zc(b.$AttributeEx(m,"idle"))||ac,!v);r.F(0)}function W(){r.Jc<V.Jc&&E()}function N(p,r,o){if(!H){H=d;if(j&&o){var g=o.width,c=o.height,m=g,l=c;if(g&&c&&n.$FillMode){if(n.$FillMode&3&&(!(n.$FillMode&4)||g>K||c>I)){var h=k,q=K/I*c/g;if(n.$FillMode&1)h=q>1;else if(n.$FillMode&2)h=q<1;m=h?g*I/c:K;l=h?I:c*K/g}b.$CssWidth(j,m);b.$CssHeight(j,l);b.C(j,(I-l)/2);b.z(j,(K-m)/2)}b.K(j,"absolute");a.k(i.$EVT_LOAD_END,f)}}b.U(r);p&&p(e)}function U(g,b,c,d){if(d==Y&&s==f&&v)if(!Fc){var a=u(g);C.Ce(a,f,b,e,c,I/K);b.zf();bb.$Shift(a-bb.fc()-1);bb.F(a);A.jc(a,a,0)}}function Z(b){if(b==Y&&s==f){if(!h){var a=g;if(C)if(C.tb==f)a=C.Ke();else C.ub();W();h=new Ac(m,f,a,r);h.Md(p)}!h.$IsPlaying()&&h.Ac()}}function G(a,d,k){if(a==f){if(a!=d)B[d]&&B[d].Qd();else!k&&h&&h.tg();p&&p.$Enable();var l=Y=b.W();e.Ib(b.$CreateCallback(g,Z,l))}else{var j=c.min(f,a),i=c.max(f,a),o=c.min(i-j,j+q-i),m=t+n.$LazyLoading-1;(!P||o<=m)&&e.Ib()}}function ab(){if(s==f&&h){h.sb();p&&p.$Quit();p&&p.$Disable();h.Jd()}}function cb(){s==f&&h&&h.sb()}function X(b){!Q&&a.k(i.$EVT_CLICK,f,b)}function O(){p=w.pInstance;h&&h.Md(p)}e.Ib=function(e,c){c=c||y;if(z.length&&!H){b.D(c);if(!T){T=d;a.k(i.$EVT_LOAD_START,f);b.$Each(z,function(a){if(!b.$Attribute(a,"src")){a.src=b.$AttributeEx(a,"src2")||"";b.nb(a,a["display-origin"])}})}b.Gf(z,j,b.$CreateCallback(g,N,e,c))}else N(e,c)};e.og=function(){if(q==1){e.Qd();G(f,f)}else if(C){var a=C.Fe(q);if(a){var h=Y=b.W(),c=f+gb,d=B[u(c)];return d.Ib(b.$CreateCallback(g,U,c,d,a,h),y)}}else Hb(gb)};e.Bc=function(){G(f,f,d)};e.Qd=function(){p&&p.$Quit();p&&p.$Disable();e.Zd();h&&h.kg();h=g;E()};e.zf=function(){b.U(m)};e.Zd=function(){b.D(m)};e.hg=function(){p&&p.$Enable()};function S(a,f,c,h){if(b.$Attribute(a,ub))return;if(!F){if(a.tagName=="IMG"){z.push(a);if(!b.$Attribute(a,"src")){P=d;a["display-origin"]=b.nb(a);b.U(a)}}var e=b.ug(a);if(e){var g=new Image;b.$AttributeEx(g,"src2",e);z.push(g)}c&&b.A(a,(b.A(a)||0)+1)}var i=b.$Children(a);b.$Each(i,function(a){var e=a.tagName,g=b.$AttributeEx(a,"u");if(g=="player"&&!w){w=a;if(w.pInstance)O();else b.$AddEvent(w,"dataavailable",O)}if(g=="caption"){if(f){b.xf(a,b.$AttributeEx(a,"to"));b.vf(a,b.$AttributeEx(a,"bf"));J&&b.$AttributeEx(a,"3d")&&b.tf(a,"preserve-3d")}}else if(!F&&!c&&!j){if(e=="A"){if(b.$AttributeEx(a,"u")=="image")j=b.If(a,"IMG");else j=b.$FindChild(a,"image",d);if(j){x=a;b.nb(x,"block");b.G(x,db);D=b.$CloneNode(x,d);b.K(x,"relative");b.Ic(D,0);b.$Css(D,"backgroundColor","#000")}}else if(e=="IMG"&&b.$AttributeEx(a,"u")=="image")j=a;if(j){j.border=0;b.G(j,db)}}S(a,f,c+1,h)})}e.Nc=function(c,b){var a=t-b;ic(L,a)};e.tb=f;o.call(e);J=b.$AttributeEx(m,"p");b.uf(m,J);b.Uf(m,b.$AttributeEx(m,"po"));var M=b.$FindChild(m,"thumb",d);if(M){e.oe=b.$CloneNode(M);b.U(M)}b.D(m);y=b.$CloneNode(R);b.A(y,1e3);b.$AddEvent(m,"click",X);E(d);e.ic=j;e.Vd=D;e.rd=m;e.mc=L=m;b.$AppendChild(L,y);a.$On(203,G);a.$On(28,cb);a.$On(24,ab)}function Ac(z,g,p,q){var c=this,n=0,u=0,h,j,f,e,m,t,r,o=B[g];l.call(c,0,0);function w(){b.sc(O);kc&&m&&o.Vd&&b.$AppendChild(O,o.Vd);b.D(O,!m&&o.ic)}function x(){c.Ac()}function y(a){r=a;c.sb();c.Ac()}c.Ac=function(){var b=c.Eb();if(!D&&!T&&!r&&s==g){if(!b){if(h&&!m){m=d;c.Jd(d);a.k(i.$EVT_SLIDESHOW_START,g,n,u,h,e)}w()}var k,p=i.$EVT_STATE_CHANGE;if(b!=e)if(b==f)k=e;else if(b==j)k=f;else if(!b)k=j;else k=c.Bd();a.k(p,g,b,n,j,f,e);var l=v&&(!F||J);if(b==e)(f!=e&&!(F&12)||l)&&o.og();else(l||b!=f)&&c.Pc(k,x)}};c.tg=function(){f==e&&f==c.Eb()&&c.F(j)};c.kg=function(){C&&C.tb==g&&C.ub();var b=c.Eb();b<e&&a.k(i.$EVT_STATE_CHANGE,g,-b-1,n,j,f,e)};c.Jd=function(a){p&&b.xb(S,a&&p.Kc.$Outside?"":"hidden")};c.Nc=function(c,b){if(m&&b>=h){m=k;w();o.Zd();C.ub();a.k(i.$EVT_SLIDESHOW_END,g,n,u,h,e)}a.k(i.$EVT_PROGRESS_CHANGE,g,b,n,j,f,e)};c.Md=function(a){if(a&&!t){t=a;a.$On($JssorPlayer$.kf,y)}};p&&c.yc(p);h=c.lb();c.yc(q);j=h+q.Wc;e=c.lb();f=v?h+q.Vc:e}function Ub(a,c,d){b.z(a,c);b.C(a,d)}function ic(c,b){var a=x>0?x:X,d=ob*b*(a&1),e=pb*b*(a>>1&1);Ub(c,d,e)}function Zb(){tb=T;Rb=A.Bd();E=y.bb()}function mc(){Zb();if(D||!J&&F&12){A.sb();a.k(i.ze)}}function lc(f){if(!D&&(J||!(F&12))&&!A.$IsPlaying()){var b=y.bb(),a=c.ceil(E);if(f&&c.abs(M)>=n.$MinDragOffsetToSlide){a=c.ceil(b);a+=lb}if(!(L&1))a=c.min(q-t,c.max(a,0));var d=c.abs(a-b);if(d<1&&n.$SlideEasing!=e.$Linear)d=1-c.pow(1-d,5);if(!Q&&tb)A.Be(Rb);else if(b==a){yb.hg();yb.Bc()}else A.jc(b,a,d*nb)}}function Qb(a){!b.Gb(b.$EvtSrc(a),"nodrag")&&b.$CancelEvent(a)}function yc(a){hc(a,1)}function hc(c,j){c=b.Sd(c);var e=b.$EvtSrc(c);Ib=k;var l=b.Gb(e,"1",Sb);if((!l||l===w)&&!P&&(!j||c.touches.length==1)&&!b.Gb(e,"nodrag")&&zc()){var n=b.Gb(e,f,m.vc);if(n)Tb=b.$Attribute(n,m.vc);if(j){var p=c.touches[0];Bb=p.clientX;Cb=p.clientY}else{var o=b.Rd(c);Bb=o.x;Cb=o.y}D=d;Y=g;b.$AddEvent(h,j?"touchmove":"mousemove",Lb);b.W();Q=0;mc();if(!tb)x=0;M=0;kb=0;lb=0;a.k(i.$EVT_DRAG_START,u(E),E,c)}}function Lb(a){if(D){a=b.Sd(a);var e;if(a.type!="mousemove")if(a.touches.length==1){var m=a.touches[0];e={x:m.clientX,y:m.clientY}}else cb();else e=b.Rd(a);if(e){var f=e.x-Bb,g=e.y-Cb;if(x||c.abs(f)>1.5||c.abs(g)>1.5){if(c.floor(E)!=E)x=x||X&P;if((f||g)&&!x)if(P==3)if(c.abs(g)>c.abs(f))x=2;else x=1;else{x=P;var n=[0,c.abs(f),c.abs(g)],p=n[x],o=n[~x&3];if(o>p)Ib=d}if(x&&!Ib){var l=g,h=pb;if(x==1){l=f;h=ob}if(M-kb<-1.5)lb=0;else if(M-kb>1.5)lb=-1;kb=M;M=l;W=E-M/h/Tb;if(!(L&1)){var j=0,i=[-E,0,E-q+t];b.$Each(i,function(b,d){if(b>0){var a=c.pow(b,1/1.6);a=c.tan(a*c.PI/2);j=(a-b)*(d-1)}});var k=j+W;i=[-k,0,k-q+t];b.$Each(i,function(a,b){if(a>0){a=c.min(a,h);a=c.atan(a)*2/c.PI;a=c.pow(a,1.6);W=a*(b-1);if(b)W+=q-t}})}b.$CancelEvent(a);if(!T)A.pf(W);else A.of(W)}}}}}function cb(){wc();if(D){D=k;Q=M;b.W();b.T(h,"mousemove",Lb);b.T(h,"touchmove",Lb);Q&&v&8&&(v=0);A.sb();var c=y.bb();a.k(i.$EVT_DRAG_END,u(c),c,u(E),E);F&12&&Zb();lc(d)}}function rc(c){var a=b.$EvtSrc(c),d=b.Gb(a,"1",ub);if(w===d)if(Q){b.$StopEvent(c);while(a&&w!==a){(a.tagName=="A"||b.$Attribute(a,"data-jssor-button"))&&b.$CancelEvent(c);a=a.parentNode}}else v&4&&(v=0)}function nc(a){B[s];s=u(a);yb=B[s];y.F(s);dc(s);return s}function Gc(b,c){x=0;nc(b);if(v&2&&(gb>0&&s==q-1||gb<0&&!s))v=0;a.k(i.$EVT_PARK,s,c)}function dc(a,c){N=a;b.$Each(Z,function(b){b.pc(u(a),a,c)})}function zc(){var b=i.Hd||0,a=hb;if(Fb)a&1&&(a&=1);i.Hd|=a;return P=a&~b}function wc(){if(P){i.Hd&=~hb;P=0}}function gc(){var a=b.$CreateDiv();b.G(a,db);b.K(a,"absolute");return a}function u(b,a){a=a||q||1;return(b%a+a)%a}function rb(c,a,b){v&8&&(v=0);Pb(c,nb,a,b)}function Eb(){b.$Each(Z,function(a){a.qc(a.Vb.$ChanceToShow<=J)})}function pc(){if(!J){J=1;Eb();if(!D){F&12&&lc();F&3&&B[s]&&B[s].Bc()}}a.k(i.$EVT_MOUSE_LEAVE)}function oc(){if(J){J=0;Eb();D||!(F&12)||mc()}a.k(i.$EVT_MOUSE_ENTER)}function qc(){b.$Each(ab,function(a){b.G(a,db);b.K(a,"absolute");b.xb(a,"hidden");b.U(a)});b.G(R,db)}function Hb(b,a){Pb(b,a,d)}function Pb(h,g,m,o){if(Ab&&(!D&&(J||!(F&12))||n.$NaviQuitDrag)){T=d;D=k;A.sb();if(g==f)g=nb;var e=Nb.Eb(),b=h;if(m){b=N+h;if(h>0)b=c.ceil(b);else b=c.floor(b)}var a=b;if(!(L&1))if(o)a=u(a);else if(L&2&&(a<0&&!N||a>q-t&&N>=q-t))a=a<0?q-t:0;else a=c.max(0,c.min(a,q-t));var l=(a-e)%q;a=e+l;var i=e==a?0:g*c.abs(l),j=1;if(t>1)j=(X&1?wb:vb)/qb;i=c.min(i,g*j*1.5);A.jc(e,a,i||1)}}a.$SlidesCount=function(){return ab.length};a.$CurrentIndex=function(){return s};a.$AutoPlay=function(a){if(a==f)return a;if(a!=v){v=a;v&&B[s]&&B[s].Bc()}};a.$IsDragging=function(){return D};a.$IsSliding=function(){return T};a.$IsMouseOver=function(){return!J};a.re=function(){return Q};a.$OriginalWidth=function(){return H};a.$OriginalHeight=function(){return G};a.$ScaleHeight=function(b){if(b==f)return fc||G;a.$ScaleSize(b/G*H,b)};a.$ScaleWidth=function(b){if(b==f)return Kb||H;a.$ScaleSize(b,b/H*G)};a.$ScaleSize=function(c,a){b.$CssWidth(w,c);b.$CssHeight(w,a);jc=c/H;ec=a/G;b.$Each(Xb,function(a){a.$ScaleSize(jc,ec)});if(!Kb){b.Bb(S,z);b.C(S,0);b.z(S,0)}Kb=c;fc=a};a.$PlayTo=Pb;a.$GoTo=function(a){nc(a)};a.$Next=function(){Hb(1)};a.$Prev=function(){Hb(-1)};a.$Pause=function(){v=0};a.$Play=function(){a.$AutoPlay(v||1)};a.$SetSlideshowTransitions=function(a){n.$SlideshowOptions.$Transitions=a};a.$SetCaptionTransitions=function(a){V.$Transitions=a;V.Jc=b.W()};a.bd=function(a){var d=c.ceil(u(mb/qb)),b=u(a-N+d);if(b>t){if(a-N>q/2)a-=q;else if(a-N<=-q/2)a+=q}else a=N+b-d;if(!(L&1))a=u(a);return a};a.gc=function(y,l){a.$Elmt=w=b.$GetElement(y);H=b.$CssWidth(w);G=b.$CssHeight(w);n=b.s({$FillMode:0,$LazyLoading:1,$ArrowKeyNavigation:1,$StartIndex:0,$AutoPlay:0,$Loop:1,$HWA:d,$NaviQuitDrag:d,$AutoPlaySteps:1,$AutoPlayInterval:3e3,$PauseOnHover:1,$SlideDuration:500,$SlideEasing:e.$OutQuad,$MinDragOffsetToSlide:20,$SlideSpacing:0,$Cols:1,$Align:0,$UISearchMode:1,$PlayOrientation:1,$DragOrientation:1},l);n.$HWA=n.$HWA&&b.Ff();if(n.$Idle!=f)n.$AutoPlayInterval=n.$Idle;if(n.$ParkingPosition!=f)n.$Align=n.$ParkingPosition;X=n.$PlayOrientation&3;fb=n.$SlideshowOptions;V=b.s({$Class:r},n.$CaptionSliderOptions);jb=n.$BulletNavigatorOptions;U=n.$ArrowNavigatorOptions;eb=n.$ThumbnailNavigatorOptions;!n.$UISearchMode;var m=b.$Children(w);b.$Each(m,function(a,d){var c=b.$AttributeEx(a,"u");if(c=="loading")R=a;else{if(c=="slides")z=a;if(c=="navigator")sb=a;if(c=="arrowleft")Mb=a;if(c=="arrowright")Jb=a;if(c=="thumbnavigator")ib=a;if(a.tagName=="DIV"||a.tagName=="SPAN")Xb[c||d]=new sc(a,c=="slides",b.Nf(["slides","thumbnavigator"])[c])}});R=R||b.$CreateDiv(h);wb=b.$CssWidth(z);vb=b.$CssHeight(z);K=n.$SlideWidth||wb;I=n.$SlideHeight||vb;db={u:K,v:I,$Top:0,$Left:0};Gb=n.$SlideSpacing;ob=K+Gb;pb=I+Gb;qb=X&1?ob:pb;gb=n.$AutoPlaySteps;F=n.$PauseOnHover;ac=n.$AutoPlayInterval;nb=n.$SlideDuration;Db=new vc;v=n.$AutoPlay&63;a.Vb=l;b.$Attribute(w,ub,"1");b.A(z,b.A(z)||0);b.K(z,"absolute");S=b.$CloneNode(z,d);b.Bb(S,z);bb=new Cc;b.$AppendChild(S,bb.mc);b.xb(z,"hidden");F&=Fb?10:5;var o=b.$Children(z);b.$Each(o,function(a){a.tagName=="DIV"&&!b.$AttributeEx(a,"u")&&ab.push(a);b.A(a,(b.A(a)||0)+1)});O=gc();b.$Css(O,"backgroundColor","#000");b.Ic(O,0);b.A(O,0);b.Bb(O,z.firstChild,z);q=ab.length;t=c.min(n.$Cols,q);Ab=t<q;L=Ab?n.$Loop:0;if(q){qc();if(fb){kc=fb.$ShowLink;xb=fb.$Class;zb=t==1&&q>1&&xb&&(!b.$IsBrowserIE()||b.$BrowserVersion()>=9)}mb=zb||t>=q||!(L&1)?0:n.$Align;hb=(t>1||mb?X:-1)&n.$DragOrientation;Ob.Fd&&b.$Css(z,Ob.Fd,([g,"pan-y","pan-x","none"])[hb]||"");if(zb)C=new xb(Db,K,I,fb,Fb,Ub);for(var k=0;k<ab.length;k++){var s=ab[k],x=new Bc(s,k);B.push(x)}b.U(R);Nb=new Dc;A=new uc(Nb,bb);b.$AddEvent(w,"click",rc,d);b.$AddEvent(w,"mouseleave",pc);b.$AddEvent(w,"mouseenter",oc);if(hb){b.$AddEvent(w,"mousedown",hc);b.$AddEvent(w,"touchstart",yc);b.$AddEvent(w,"dragstart",Qb);b.$AddEvent(w,"selectstart",Qb);b.$AddEvent(j,"mouseup",cb);b.$AddEvent(h,"mouseup",cb);b.$AddEvent(h,"touchend",cb);b.$AddEvent(h,"touchcancel",cb);b.$AddEvent(j,"blur",cb)}if(sb&&jb){bc=new jb.$Class(sb,jb,H,G);Z.push(bc)}if(U&&Mb&&Jb){U.$Loop=L;U.$Cols=t;cc=new U.$Class(Mb,Jb,U,H,G);Z.push(cc)}if(ib&&eb){eb.$StartIndex=n.$StartIndex;Yb=new eb.$Class(ib,eb);b.$Attribute(ib,Sb,"1");Z.push(Yb)}b.$Each(Z,function(a){a.Mc(q,B,R);a.$On(p.kc,rb)});b.$Css(w,"visibility","visible");a.$ScaleSize(H,G);Eb();n.$ArrowKeyNavigation&&b.$AddEvent(h,"keydown",function(a){if(a.keyCode==37)rb(-n.$ArrowKeyNavigation,d);else a.keyCode==39&&rb(n.$ArrowKeyNavigation,d)});var i=n.$StartIndex;i=u(i);A.jc(i,i,0)}};b.gc(a)};i.$EVT_CLICK=21;i.$EVT_DRAG_START=22;i.$EVT_DRAG_END=23;i.$EVT_SWIPE_START=24;i.$EVT_SWIPE_END=25;i.$EVT_LOAD_START=26;i.$EVT_LOAD_END=27;i.ze=28;i.$EVT_MOUSE_ENTER=31;i.$EVT_MOUSE_LEAVE=32;i.$EVT_POSITION_CHANGE=202;i.$EVT_PARK=203;i.$EVT_SLIDESHOW_START=206;i.$EVT_SLIDESHOW_END=207;i.$EVT_PROGRESS_CHANGE=208;i.$EVT_STATE_CHANGE=209})(window,document,Math,null,true,false)
;
(function() {


}).call(this);
/*!
 * Masonry PACKAGED v4.2.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */


!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});
(function() {
  $(function() {
    if ($('.pagination').length && $('#bodypost').length) {
      $(window).scroll(function() {
        var url;
        url = $('.pagination .next_page').attr('href');
        if (url && $(window).scrollTop() > $(document).height() - $(window).height() - 50) {
          $('.pagination').text("Mostrando más posts...");
          return $.getScript(url);
        }
      });
      return $(window).scroll();
    }
  });

  $(function() {
    var closeSearch, openSearch;
    closeSearch = function() {
      $('.search-field').val('');
      $('.search-field').hide();
      $('#search-nav').removeClass('active');
      $('#search-nav button[type="reset"]').hide();
    };
    openSearch = function() {
      $('#search-nav').addClass('active');
      $('.search-field').show();
      $('.search-field').focus();
      $('#search-nav button[type="reset"]').show();
    };
    $('#BB-nav').affix({
      offset: {
        top: $('header').height()
      }
    });
    $(document).keyup(function(e) {
      if (e.which === 27) {
        closeSearch();
      }
    });
    $('#search-nav button[type="submit"]').click(function(event) {
      if (!$('#search-nav').hasClass('active') || $('.search-field').val() === '') {
        event.preventDefault();
        openSearch();
      }
    });
    $('#search-nav button[type="reset"]').click(function(event) {
      closeSearch();
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







$(function(){
  $('#postdiv').masonry({
    itemSelector: '.box',
    columnWidth: 200,
    isAnimated: !Modernizr.csstransitions,
    isFitWidth: true
  });
});

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip(); 
});
/*jQuery ->
 $(window).scroll ->
   if $(window).scrollTop() > $(document).height() — $(window).height() — 50
     alert("Final de la página")
     */ 

;
