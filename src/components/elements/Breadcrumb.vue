<template>
  <div class="x_content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li v-for="bread in breads" class="breadcrumb-item">
          <a :href="bread.link">{{ bread.title }}</a>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: ['breads'],
};
</script>