<template>
  <q-page :class="`app-demo flex q-pa-${pagePadding}`">
    <app-demo-list ref="listRef" v-show="shown === 'list'" @goto="onGoto" />
    <app-demo-info v-if="shown === 'info'" :id="selectedId" @goto="onGoto" />
  </q-page>
</template>

<script src="./demo.component.js"></script>
