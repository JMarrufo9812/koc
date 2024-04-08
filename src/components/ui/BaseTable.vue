<template>
  <table>
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="(header, index) in headers" :key="index">
          {{ item[header.value] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>

const props = defineProps({
  headers: {
    type: Array,
  },
  items: {
    type: Array,
  },
})
</script>

<style scoped>
table {
  width: 100%;
}

table tr {
 display: flex !important;
 flex-wrap: wrap;
 border-bottom: 2.5px solid #D6DFE4;
 font-size: 1.5em;
}

table th {
  margin: 10px 0 10px 0;
 flex-grow: 1;
}
table td {
  margin: 20px 0 20px 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
</style>