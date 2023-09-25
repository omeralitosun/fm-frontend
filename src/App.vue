<template>
  <div>
    <Navbar></Navbar>
    <router-view @alert="alertBox()"/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
export default {
components:{
  Navbar
}
}
</script>
<style>

* {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.btn{
  width: 80px;
  height: 30px;
  font-size: 17px;
  border-radius: 5px;
}
.btn-submit {
  background-color: #44be5f;
  color: aliceblue;
}
.btn-submit:hover {
  background-color: #4e945d;
  cursor: pointer;
}
.btn-submit:active {
  background-color: #8f8f8f;
}
.btn-warning {
  background-color: #d6b74f;
  color: aliceblue;
}
.btn-warning:hover {
  background-color: #92864c;
  cursor: pointer;
}
.btn-warning:active {
  background-color: #8f8f8f;
}
.btn-error {
  background-color: #cf4a4a;
  color: aliceblue;
}
.btn-error:hover {
  background-color: #8f4949;
  cursor: pointer;
}
.btn-error:active {
  background-color: #8f8f8f;
}
.create {
  position: relative;
  min-height: 80vh;
  background-color: #bdf8b1;
  padding: 50px 0px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  max-width: 95vw;
  margin: 0px auto 20px;
  width: 100vw;
}
.item {
  padding: 10px;
}
.item .input{
  width: 300px;
  height: 50px;
  font-size: 15px;
  padding: 0px;
}
.item div{
  width: 300px;
  height: 50px;
  font-size: 15px;
  padding-top: 10px;
}
.item label {
  border-bottom: solid;
}
.detail {
  position: relative;
  min-height: 80vh;
  background-color: #bdf8b1;
}
.item label {
  font-size: 15px;
  font-weight: 700;
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background-color: #bdf8b1;
}

td button{
  padding: 5px;
  border-radius: 5px;
  background-color: #bdf8b1;
}

@media screen and (max-width: 800px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
    height: 20px;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
