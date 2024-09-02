<script lang="ts">
	import ClipboardCodeIcon from '~icons/fluent/clipboard-code-16-regular';

	const {
		data,
		class: className = '',
		title = 'Copy to clipboard',
		showIcon = true,
		text = ''
	} = $props();
</script>

<button
	onclick={() => {
		navigator.clipboard.writeText(JSON.stringify(data));
	}}
	class="copy-to-clipboard button flex items-center gap-1 border p-1 {className}"
	{title}
>
	{#if showIcon}
		<ClipboardCodeIcon />
	{/if}
	{#if text}
		{text}
	{/if}
</button>
