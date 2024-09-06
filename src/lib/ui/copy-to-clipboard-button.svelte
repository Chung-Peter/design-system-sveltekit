<script lang="ts">
	import ClipboardCodeIcon from '~icons/fluent/clipboard-code-16-regular'

	import { copyToClipboard } from '$lib/utils/copy-to-clipboard'

	const {
		data,
		class: className = '',
		title = 'Copy to clipboard',
		showIcon = true,
		text = '',
	} = $props()
</script>

<button
	onclick={() => {
		copyToClipboard(JSON.stringify(data))
	}}
	class="copy-to-clipboard button flex items-center gap-1 border bg-white px-1 py-0 text-sm shadow-md {className}"
	{title}
>
	{#if showIcon}
		<ClipboardCodeIcon />
	{/if}
	{#if text}
		{text}
	{/if}
</button>
