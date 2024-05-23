<template>
  <div>
    <h2>Detail Dosen Penguji</h2>
    <div v-if="dosen" class="dosen-detail">
      <p><strong>Nama:</strong> {{ dosen.nama }}</p>
      <p><strong>NIP:</strong> {{ dosen.nip }}</p>
      <p><strong>Jenis Kelamin:</strong> {{ dosen.jk }}</p>
    </div>
    <div v-else>
      <br>
      <p>Loading...</p>
      <br>
    </div>

    <h3>Mahasiswa Mentored:</h3>
    <ul>
      <li v-for="(mahasiswa, index) in mahasiswaList" :key="index">
        <p><strong>Nama Mahasiswa:</strong> {{ mahasiswa.nama }}</p>
        <p><strong>NIM Mahasiswa:</strong> {{ mahasiswa.nim }}</p>
        <!-- Add other mahasiswa details here -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dosen: null, // Initializing dosen object
      mahasiswaList: []
    };
  },

  created() {
    this.fetchDosenDetail();
  },

  methods: {
    async fetchDosenDetail() {
      try {
        const nippenguji = this.$route.params.nip_penguji;
        const response = await axios.get(`/api/dosen/penguji/${nippenguji}`);
        this.dosen = response.data.dosen || null; // Ensure default value if data.dosen is undefined
        this.mahasiswaList = response.data.mahasiswaList || []; // Ensure default value if data.mahasiswaList is undefined
      } catch (error) {
        console.error('Error fetching dosen detail:', error);
      }
    }
  }
};
</script>

<style scoped>
/* ... (existing styles or styles you want to add) ... */

.dosen-list {
  list-style-type: none;
  padding: 0;
}

.dosen-item {
  border: 1px solid #ddd;
  padding: 10px; /* Reduced padding */
  margin: 0px 100px 50px 100px; /* Reduced margin */
  
}

.dosen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dosen-no {
  font-weight: bold;
  margin-right: 10px;
  font-size: 14px; /* Reduced font size */
}

.dosen-nama {
  flex-grow: 1;
  text-align: left; /* Align text to the left */
  font-size: 14px; /* Reduced font size */
}

.btttn {
  padding: 6px 10px; /* Reduced padding */
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 12px; /* Reduced font size */
  text-align: center;
  text-decoration: none;
}

.tombol-detail {
  background-color: #2196F3;
  color: white;
}

.dosen-detail {
  margin-top: 5px; /* Reduced margin */
  border-top: 1px solid #ddd;
  padding-top: 5px; /* Reduced padding */
  text-align: left; /* Align text to the left */
}
</style>
