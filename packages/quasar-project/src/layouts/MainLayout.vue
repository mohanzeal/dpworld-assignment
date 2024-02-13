<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> Assignment </q-toolbar-title>
        <q-space />
        Welcome User
        <q-btn round flat icon="face" />
        <q-btn flat icon="logout" label="Exit" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
