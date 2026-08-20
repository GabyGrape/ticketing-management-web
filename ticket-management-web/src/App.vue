<script setup></script>

<template>
  <main>
    <nav style="padding: 10px; background: #f4f4f4; margin-bottom: 20px;">
      <router-link to="/tickets" style="margin-right: 10px;">Daftar Tiket</router-link>
    </nav>

    <!-- Router View ini yang bertugas merender TicketListView -->
    <router-view />
  </main>
</template>