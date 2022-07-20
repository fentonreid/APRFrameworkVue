<template>
  <section class="navbar">
    <div id="home">
      <ul>
        <li><router-link to="/">Home</router-link></li>
      </ul>
    </div>
    <div id="other">
      <ul>
        <li><router-link to="/patchviewer">Patch Viewer</router-link></li>
        <li>
          <router-link to="/mutationoperators">Mutation Operators</router-link>
        </li>
        <li>
          <router-link to="/generatedpatches">Generated Patches</router-link>
        </li>
        <li>
          <router-link to="/javadoc">Javadoc</router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: black;
}

#home,
#other {
  display: flex;
}

ul {
  display: flex;
  list-style: none;
  gap: 2.5rem;
}

li {
  margin-right: 3rem;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  background-color: gray;
}

a.active {
  background-color: yellow;
}
</style>
