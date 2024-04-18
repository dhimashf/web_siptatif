<template>
  <div>
    <ul class="dosen-list">
      <li v-for="(dosen, index) in dosenList" :key="index" class="dosen-item">
        <div class="dosen-header">
          <span class="dosen-no">{{ dosen.no }}</span>
          <span class="dosen-nama">{{ dosen.nama }}</span>
          <button class="btttn tombol-detail" @click="showDetail(dosen)">Detail</button>
        </div>
        <div v-if="selectedDosen === dosen" class="dosen-detail">
          <p><strong>NIDN:</strong> {{ dosen.nidn }}</p>
          <p><strong>Jenis Kelamin:</strong> {{ dosen.jenisKelamin }}</p>
          <p><strong>Keahlian:</strong> {{ dosen.keahlian }}</p>
          <p><strong>Kuota:</strong> {{ dosen.kuota }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDosen: null,
      dosenList: JSON.parse(localStorage.getItem('dosenPengujiList')) || []
    };
  },
  methods: {
    showDetail(dosen) {
      this.selectedDosen = this.selectedDosen === dosen ? null : dosen;
    }
  }
}
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
