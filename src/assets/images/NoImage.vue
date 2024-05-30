<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="w"
    :height="h"
    viewBox="0 0 198.4 198.4"
    xml:space="preserve"
  >
    <g>
      <rect x="0" class="st0" width="198.4" height="198.4" />
      <path
        class="st1"
        d="M86,81.9c-3.4,0-6.1,2.7-6.1,6.1c0,3.4,2.7,6.1,6.1,6.1c3.4,0,6.1-2.7,6.1-6.1C92.1,84.6,89.4,81.9,86,81.9z
		 M123.6,70.7h-49c-4.4,0-8,3.7-8,8.2v40.8c0,4.5,3.7,8.2,8,8.2h49c4.5,0,8.2-3.7,8.2-8.2V78.8C131.8,74.3,128.3,70.7,123.6,70.7z
		 M125.7,118.8l-17.4-23.7c-0.3-0.6-1-0.9-1.8-0.9c-0.8,0-1.5,0.4-1.9,0.9l-13.6,18.4l-4.7-5.9c-0.4-0.5-1.1-0.9-1.9-0.9
		c-0.7,0-1.4,0.3-1.9,0.9l-9.6,12c0,0,0,0,0,0l0-40.7c0-1.1,0.9-2,2-2h49c1.1,0,2,0.9,2,2v39.9H125.7z"
      />
    </g>
  </svg>
</template>

<script setup >
  const props = defineProps(["h", "w", "color"],)
</script>

<style type="text/css" scoped>
.st0 {
  fill: #c6d2de;
}
.st1 {
  fill: #a7b8c8;
}
</style>