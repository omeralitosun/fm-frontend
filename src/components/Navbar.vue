<template>
  <div class="topnav" id="myTopnav">
    <router-link to="/">Home</router-link>
    <!--Field-->
    <div class="dropdown">
      <button class="dropbtn">
        Tarla
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <router-link to="/field/new">Yeni Tarla</router-link>
        <router-link to="/field">Tarla Listesi</router-link>
      </div>
    </div>
    <!--Equipment-->
    <div class="dropdown">
      <button class="dropbtn">
        Ekipman
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <router-link to="/equipment/new">Yeni Ekipman</router-link>
        <router-link to="/equipment">Ekipman Listesi</router-link>
      </div>
    </div>
    <!--Action Taken-->
    <div class="dropdown">
      <button class="dropbtn">
        Alınan Aksiyonlar
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <router-link to="/action-taken/new">Yeni Aksiyon</router-link>
        <router-link to="/action-taken">Aksiyon Listesi</router-link>
      </div>
    </div>
    <!--Maintenance-->
    <div class="dropdown">
      <button class="dropbtn">
        Bakım
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <router-link to="/maintenance/new">Yeni Bakım</router-link>
        <router-link to="/maintenance">Bakım Listesi</router-link>
      </div>
    </div>
    <!--Received Product-->
    <div class="dropdown">
      <button class="dropbtn">
        Alınan Ürün
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <router-link to="/received-product/new">Yeni Alınan Ürün</router-link>
        <router-link to="/received-product">Alınan Ürün Listesi</router-link>
      </div>
    </div>
    <!--Selled Product-->
    <div class="dropdown">
      <button class="dropbtn">
        Satılan Ürün
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <router-link to="/selled-product/new">Yeni Satılan Ürün</router-link>
        <router-link to="/selled-product">Satılan Ürün Listesi</router-link>
      </div>
    </div>
    <a href="javascript:void(0);" class="icon" @click="func()">&#9776;</a>
  </div>
</template>
  
  <script>
export default {
  name: "Navbar",
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    func: function () {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    },
  },
};
</script>
  
  <style>
.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
  display: none;
}

/* Dropdown container - needed to position the dropdown content */
.dropdown {
  float: left;
  overflow: hidden;
}

/* Style the dropdown button to fit inside the topnav */
.dropdown .dropbtn {
  font-size: 17px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

/* Style the dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #bdf8b1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Style the links inside the dropdown */
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Add a dark background on topnav links and the dropdown button on hover */
.topnav a:hover,
.dropdown:hover .dropbtn {
  background-color: #555555;
  color: white;
}

/* Add a grey background to dropdown links on hover */
.dropdown-content a:hover {
  background-color:  #a2d499;
  color: black;
}

/* Show the dropdown menu when the user moves the mouse over the dropdown button */
.dropdown:hover .dropdown-content {
  display: block;
}

/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media screen and (max-width: 600px) {
  .topnav a:not(:first-child),
  .dropdown .dropbtn {
    display: none;
  }
  .topnav a.icon {
    float: right;
    display: block;
  }
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
  .topnav.responsive .dropdown {
    float: none;
  }
  .topnav.responsive .dropdown-content {
    position: relative;
  }
  .topnav.responsive .dropdown .dropbtn {
    display: block;
    width: 100%;
    text-align: left;
  }
}
</style>