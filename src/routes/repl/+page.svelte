<script lang="ts">
	import { onMount } from 'svelte'
	import appCss from '../../app.css?inline'

	// Define types for our state
	type EditorState = {
		html: string
		css: string
		js: string
	}

	// Initial state
	const initialState: EditorState = {
		html: `<div class="grid gap-4 p-2">
	<div class="card variant-outline primary" style="--card-border-width: 5px; --card-border-radius: 2em;">
		<div class="stretch">
			<img src="https://picsum.photos/id/908/800">
		</div>
		<p>Here's a card with a primary colored border. The div above that holds the image has the 'stretch' class applied. Add class="stretch" to any child elements where you want the inline padding removed. (Technically, a negative margin is applied to offset the padding of the parent.)</p>
		<p>If 'stretch' class is added to the first or last child, the top or bottom padding will also be removed.</p>
		<p class="stretch">This paragraph also has the 'stretch' class.</p>
		<p>This is a normal paragraph.</p>
	</div>

	<div>
		<h2 class="font-bold border-b">Dynamic Grid</h2>
		<p>This grid has a dynamic number of columns based on the screen size. Try resizing the window to see the effect.</p>
	</div>
	<div class="grid dynamic-grid gap-2">
		<a href="#" class="card variant-outline primary hover:!no-underline">
			<div class="stretch">
				<img src="https://picsum.photos/id/918/800/400">
			</div>
			<div class="content prose">
				<p>This is a link card with a primary colored border with the 'prose' class applied to make the typography look nicer (from tailwindcss).</p>
				<p>This is a normal paragraph.</p>
				<p >For good measure, the image below has the 'stretch' class applied to it.</p>
			</div>
			<div class="stretch">
				<img src="https://picsum.photos/id/520/800/400">
			</div>
		</a>
		<div class="card variant-filled secondary">
			<div class="stretch">
				<img src="https://picsum.photos/id/918/800/400">
			</div>
			<div class="content prose">
				<p>This is a card with a secondary variant-filled with the 'prose' class applied to make the typography look nicer (from tailwindcss).</p>
				<p>This is a normal paragraph.</p>
				<p >For good measure, the image below has the 'stretch' class applied to it.</p>
			</div>
			<div class="stretch">
				<img src="https://picsum.photos/id/520/800/400">
			</div>
		</div>
	</div>
</div>`,
		css: `/* Add your CSS here */`,
		js: `// Add your JavaScript here`,
	}

	const html = localStorage.getItem('repl-html') || initialState.html
	const css = localStorage.getItem('repl-css') || initialState.css
	const js = localStorage.getItem('repl-js') || initialState.js
	let repl: EditorState = $state({ html, css, js })
	$effect(() => {
		console.log('store html:', repl.html)
		localStorage.setItem('repl-html', repl.html)
	})
	$effect(() => {
		console.log('store css:', repl.css)
		localStorage.setItem('repl-css', repl.css)
	})
	$effect(() => {
		console.log('store js:', repl.js)
		localStorage.setItem('repl-js', repl.js)
	})

	const srcDoc = $derived(`
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>REPL Preview</title>
					<${'script'}
						src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries"
					></${'script'}>
					<${'style'}>${appCss}</${'style'}>
          
				</head>
				<body>
					${repl.html}
					<${'style'}>${repl.css}</${'style'}>
					<${'script'}>${repl.js}</${'script'}>
				</body>
			</html>
		`)

	let iframe = $state<HTMLIFrameElement | null>(null)

	// Move updatePreview to a separate function for clarity
	function updatePreview() {
		if (!iframe) return

		iframe.srcdoc = srcDoc
	}

	// Debounced update function
	const debouncedUpdate = debounce(updatePreview, 1000)

	// Handle input changes
	function handleInput(event: Event, key: keyof EditorState) {
		const target = event.target as HTMLTextAreaElement
		repl[key] = target.value
		debouncedUpdate()
	}

	function handleTabKeypress(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault()
			const textArea = event.currentTarget as HTMLTextAreaElement
			const start = textArea.selectionStart
			const end = textArea.selectionEnd

			// Insert tab character
			textArea.value = textArea.value.substring(0, start) + '\t' + textArea.value.substring(end)

			// Move cursor to the right position
			textArea.selectionStart = textArea.selectionEnd = start + 1

			textArea.dispatchEvent(new Event('input', { bubbles: true }))
		}
	}

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
	 * have elapsed since the last time the debounced function was invoked.
	 *
	 * @param func The function to debounce
	 * @param wait The number of milliseconds to delay
	 * @returns A debounced version of the original function
	 */
	function debounce<T extends (...args: any[]) => void>(
		func: T,
		wait: number,
	): (...args: Parameters<T>) => void {
		let timeoutId: ReturnType<typeof setTimeout> | null = null

		return (...args: Parameters<T>) => {
			// Clear the previous timeout if it exists
			if (timeoutId !== null) {
				clearTimeout(timeoutId)
			}

			// Set a new timeout
			timeoutId = setTimeout(() => {
				func(...args)
			}, wait)
		}
	}

	onMount(() => {
		updatePreview()
	})
</script>

<div class="flex flex-col gap-4">
	<div class="dynamic-grid grid gap-4">
		<div class="flex flex-col">
			<label for="css-editor">CSS Editor</label>
			<textarea
				id="css-editor"
				bind:value={repl.css}
				onkeydown={handleTabKeypress}
				oninput={updatePreview}
				placeholder="CSS"
				rows="5"
				aria-label="CSS Editor"
			></textarea>
		</div>

		<div class="flex flex-col">
			<label for="js-editor">JavaScript Editor</label>
			<textarea
				id="js-editor"
				bind:value={repl.js}
				onkeydown={handleTabKeypress}
				onblur={(e) => handleInput(e, 'js')}
				placeholder="JavaScript"
				rows="5"
				aria-label="JavaScript Editor"
			></textarea>
		</div>

		<div class="col-span-2 flex flex-col">
			<label for="html-editor">HTML Editor</label>
			<textarea
				id="html-editor"
				bind:value={repl.html}
				onkeydown={handleTabKeypress}
				oninput={updatePreview}
				placeholder="HTML"
				rows="15"
				aria-label="HTML Editor"
			></textarea>
		</div>
	</div>

	<div class="flex flex-col">
		<h2>Output:</h2>
		<iframe
			bind:this={iframe}
			title="REPL Preview"
			sandbox="allow-scripts allow-modals allow-popups"
			width="100%"
			height="100%"
			class="h-[90dvh] w-full border-2 border-black"
		></iframe>
	</div>
</div>

<style lang="postcss">
	textarea {
		@apply border p-2 focus-visible:!outline;
	}
</style>
