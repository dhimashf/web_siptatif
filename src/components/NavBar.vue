<template>
  <div>
    <div class="btn" :class="{ 'click': isSidebarVisible }" @click="toggleSidebar">
      <i :class="isSidebarVisible ? 'pi pi-times' : 'pi pi-bars'"></i>
    </div>

    <nav class="sidebar" :class="{ 'show': isSidebarVisible }">
      <div class="header">
        <img src="@/assets/images/logouin.png" alt="SIPTATIF Logo" class="siptatif-logo" />
        <div class="text">SIPTATIF</div>
      </div>
      <br>
      <ul>
        <li @click="handleMainMenuItemClick('/home')" :class="{ 'active': currentRoute === '/home' && activeDropdown !== 'dosen' }">
          <div class="menu-item">
            <i class="pi pi-home"></i>
            <router-link to="/home">Beranda</router-link>
          </div>
        </li>
        <li @click="handleMainMenuItemClick('/mahasiswa')" :class="{ 'active': currentRoute === '/mahasiswa' && activeDropdown !== 'dosen' }">
          <div class="menu-item">
            <i class="pi pi-user"></i>
            <router-link to="/mahasiswa">Mahasiswa</router-link>
          </div>
        </li>

        <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/dosen' }">
          <div class="menu-item" @click="toggleDropdown('dosen')">
            <i class="pi pi-users"></i>
            <router-link to="/dosen" :class="{ 'active': activeDropdown === 'dosen' }" class="feat-btn">
              Dosen
              <i :class="activeDropdown === 'dosen' ? 'pi pi-sort-up-fill' : 'pi pi-sort-down-fill'"></i>
            </router-link>
          </div>

          <ul class="feat-show" v-if="activeDropdown === 'dosen'">
            <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/dosen-pembimbing' }">
              <router-link to="/dosen-pembimbing">Pembimbing</router-link>
            </li>
            <li @click.stop="handleDosenDropdownClick" :class="{ 'active': currentRoute === '/dosen-penguji' }">
              <router-link to="/dosen-penguji">Penguji</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <nav class="navbar">
      <div class="koordinator-text">
        Koordinator TA
      </div>
      <div class="dropdown" @mouseleave="hideDropdown">
        <img src="@/assets/images/me2.jpg" alt="Profile" class="profile-pic" @click="toggleProfileDropdown" />
        <div class="dropdown-content" v-if="showProfileDropdown">
          <router-link to="/profile" class="profile-option">Profile</router-link>
          <a @click="logout" class="profile-option">Logout</a>
        </div>
      </div>
    </nav>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirmation" class="logout-modal">
      <div class="modal-content">
        <p>Apakah Anda yakin ingin logout?</p>
        <div class="modal-buttons">
          <button @click="confirmLogout">Ya</button>
          <button @click="cancelLogout">Tidak</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarVisible: false,
      activeDropdown: null,
      showProfileDropdown: false,
      isDosenDropdownOpen: false,
      showLogoutConfirmation: false
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  },
  watch: {
    activeDropdown(newValue) {
      if (newValue === 'dosen') {
        this.isDosenDropdownOpen = true;
        // Directly navigate to DosenPage when the Dosen dropdown is clicked
        this.$router.push('/dosen');
      } else {
        this.isDosenDropdownOpen = false;
      }
    },
    '$route.path'() {
      this.checkDropdownStatus();
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    toggleDropdown(dropdown) {
      if (this.activeDropdown === dropdown) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = dropdown;
      }
    },
    handleMainMenuItemClick(route) {
      this.activeDropdown = null;
      this.$router.push(route);
    },
    handleDosenDropdownClick() {
      // Do nothing here, so the dropdown only closes when another main menu item is clicked
    },
    toggleProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown;
    },
    hideDropdown() {
      this.showProfileDropdown = false;
    },
    checkDropdownStatus() {
      if (this.activeDropdown !== 'dosen') {
        this.isDosenDropdownOpen = false;
      }
    },
    logout() {
      this.showLogoutConfirmation = true;
    },
    confirmLogout() {
      this.showLogoutConfirmation = false;
      this.$router.push({ path: '/' }); // Navigate to logout page or login page
    },
    cancelLogout() {
      this.showLogoutConfirmation = false;
    }
  },
  created() {
    this.checkDropdownStatus();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  height: 40px;
}

.siptatif-logo {
  height: 50px;
  margin-right: 10px;
  margin-top: 20px;
}

.btn {
  color: white;
  position: absolute;
  top: 20px;
  left: 50px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  transition: left 0.4s ease;
}

.btn.click {
  left: 270px;
}

.btn span {
  color: white;
  font-size: 28px;
  line-height: 45px;
}

.btn.click span:before {
  content: '\f00d';
}

.sidebar {
  position: fixed;
  width: 250px;
  height: 100%;
  left: -250px;
  background: #2F3F57;
  transition: left 0.4s ease;
}

.show {
  left: 0;
}

.sidebar .text {
  color: white;
  font-size: 25px;
  font-weight: 600;
  line-height: 65px;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 30px;
}

nav ul {
  background: #2F3F57;
  height: 100%;
  width: 100%;
  list-style: none;
}

nav ul li {
  line-height: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

nav ul li:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

nav ul li a {
  position: relative;
  color: white;
  text-decoration: none;
  font-size: 15px;
  padding-left: 20px;
  font-weight: 500;
  display: block;
  width: 100%;
  border-left: 3px solid transparent;
}

nav ul li.active a {
  color: #E6B861;

  border-left-color: #E6B861;
}

nav ul li a:hover {
  background: #E6B861;
}

nav ul li.active-dropdown a {
  color: #E6B861;

  border-left-color: #E6B861;
}

.dropdown {
  float: right;
  overflow: hidden;
}

/* Navbar at the top */
.navbar {
  width: 100%;
  background-color: #2F3F57;
  padding: 8px 20px;
  height: 65px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.koordinator-text {
  color: white;
  font-size: 16px;
  margin-right: 20px;
}

.profile-pic {
  margin-top: 8px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  border: 1px solid black;
  min-width: 160px;
  z-index: 1;
  top: 45px;
  right: 0;
  border-radius: 5px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  text-align: center;
  display: block;
}

.dropdown-content a:hover {
  border-radius: 5px;
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.logout-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
}

.modal-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.menu-item {
  display: flex;
  align-items: center;
  color: white;
}

.menu-item i {
  margin-right: 20px; /* Add margin to the right of the icons */
  margin-left: 20px;  /* Add margin to the left of the icons */
}

nav ul li i {
  margin-right: 10px;
}

nav ul li.active i,
nav ul li.active a {
  color: rgb(211, 186, 26);
}

nav ul li.active-dropdown i,
nav ul li.active-dropdown a {
  color: #E6B861;
}
</style>