<template>
  <div>
    <h2>Berkas Mahasiswa</h2>
    
    <ul class="detail-list">
         <li v-for="(mahasiswa, index) in mahasiswaList" :key="index" class="detail-item">
          <div class="mahasiswa-header">
      <span class="detail-no">{{ mahasiswa.no }}</span>
      <span class="detail-nama">{{ mahasiswa.nama }}</span>
          <button class="btttn tombol-detail" @click="showDetail(mahasiswa)">Detail</button>
        </div>


        <div v-if="selectedmahasiswa === mahasiswa" class="mahasiswa-detail">
        <!-- Basic Details in Line -->
        <div class="basic-details">
          <div class="inline-item">
            <p class="detail-info">
              <strong>Nama:</strong>
              <span>{{ mahasiswa.nama }}</span>
            </p>
          </div>
          <div class="inline-item">
            <p class="detail-info">
              <strong>NIM:</strong>
              <span>{{ mahasiswa.nim }}</span>
            </p>
          </div>
          <div class="inline-item">
            <p class="detail-info">
              <strong>Email:</strong>
              <span>{{ mahasiswa.email }}</span>
            </p>
          </div>
        </div>
        
        <!-- Additional Details -->
        <p class="detail-info">
          <strong>Tanggal:</strong>
          <span>{{ mahasiswa.tanggal }}</span>
        </p>
        <p class="detail-info">
          <strong>Judul:</strong>
          <span>{{ mahasiswa.judul }}</span>
        </p>
        <p class="detail-info">
          <strong>Kategori TA:</strong>
          <span>{{ mahasiswa.kategoriTA }}</span>
        </p>
        
        <!-- Calon Dosen Pembimbing -->
        <div class="calon-pembimbing">
          <div class="inline-item">
            <p class="detail-info">
              <strong>Calon Dosen Pembimbing 1:</strong>
              <span>{{ mahasiswa.calonPembimbing1 }}</span>
            </p>
          </div>
          <div class="inline-item">
            <p class="detail-info">
              <strong>Calon Dosen Pembimbing 2:</strong>
              <span>{{ mahasiswa.calonPembimbing2 }}</span>
            </p>
          </div>
        </div>
        
        <!-- Berkas -->
        <div class="berkas-catatan">
          <div class="inline-item">
        <p class="detail-info">
          <strong>Berkas:</strong>
          <span><a :href="getFileUrl(mahasiswa.berkas)" target="_blank">{{ getFileName(mahasiswa.berkas) }}</a></span>
        </p>
      </div>
       <!-- Catatan -->
       <div class="inline-item">
       <p class="detail-info">
        <strong>Catatan:</strong>
         <span> <textarea v-model="mahasiswaList[index].catatan" v-if="!isEditingCatatan[index]" placeholder="Masukkan catatan"></textarea></span>
       </p>
        </div>
      </div>
        
        <!-- Status Dropdown for Editing -->
        <div class="form-group">
          <select v-model="selectedStatus" v-if="!isEditingStatus[index]">
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          
 
          <button class="simpan-button" @click="updateStatus(index)">Simpan</button>

        </div>

      </div>
      </li>
    </ul>
    <button class="btttn back-button" @click="goBack">
      <i class="pi pi-arrow-left icon"></i> Kembali
    </button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedmahasiswa: null,
      mahasiswaList: JSON.parse(localStorage.getItem('mahasiswaList')) || [],
      selectedStatus: '',
      isEditingStatus: {}, // Track editing status for status
      isEditingCatatan: {} // Track editing status for catatan
    };
  },
  computed: {
    statusOptions() {
      return ['Diterima', 'Ditolak'];
    }
  },
  methods: {
    showDetail(mahasiswa) {
      this.selectedmahasiswa = this.selectedmahasiswa === mahasiswa ? null : mahasiswa;
    },
    getFileUrl(file) {
      if (file) {
        return URL.createObjectURL(file);
      }
      return '#';
    },
    getFileName(file) {
      if (file) {
        return file.name;
      }
      return 'Tidak Ada Berkas';
    },
    goBack() {
      this.$router.go(-1);
    },
    updateStatus(index) {
      // Display confirmation dialog
      if (window.confirm('Are you sure that you want to change the status?')) {
        // Set status to "Menunggu" if selectedStatus is empty
        if (!this.selectedStatus) {
          this.selectedStatus = 'Menunggu';
        }

        this.mahasiswaList[index].status = this.selectedStatus;
        localStorage.setItem('mahasiswaList', JSON.stringify(this.mahasiswaList)); // Update localStorage
        
        // Save catatan if it's being edited
        if (this.isEditingCatatan[index]) {
          this.isEditingCatatan[index] = false; // Disable editing
          localStorage.setItem('mahasiswaList', JSON.stringify(this.mahasiswaList)); // Update localStorage
        }
      }
    }
  }
}
</script>


<style scoped>
.mahasiswa-list {
  list-style-type: none;
  padding: 0;
}

.mahasiswa-item {
  border: 1px solid #ddd;
  padding: 10px; /* Reduced padding */
  margin: 0px 100px 50px 100px; /* Reduced margin */
  
}

.mahasiswa-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
  margin-bottom: 20px;
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

.detail-no {
  font-weight: bold;
  margin-right: 10px;
  font-size: 20px; /* Reduced font size */
  margin-bottom: 5px;
}


.detail-nama {
  flex-grow: 1;
  font-weight: bold;
  text-align: left; /* Align text to the left */
  font-size: 25px; /* Reduced font size */
  margin-bottom: 5px;
}

.detail-item {
  border: 1px solid #ddd;
  padding: 20px 15px 20px 15px;
  margin:  20px 150px 20px 150px;
  background: #D9D9D9;
}

.detail-item p.detail-info {
  display: block;
  margin-bottom: 15px;
  text-align: left; /* Align text to the left */
}

.detail-item p.detail-info strong {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.detail-item p.detail-info span {
  display: block;
  padding: 10px;
  
  border: 1px solid #ddd;
  background: white;
}

.basic-details {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping to next line */
  margin-bottom: 15px;
}

.basic-details .inline-item {
  flex: 1;
  margin-right: 20px; /* Space between inline items */
}

.basic-details .inline-item:last-child {
  margin-right: 0; /* Remove margin from last item */
}

.basic-details .inline-item p.detail-info {
  margin: 0; /* Remove default margin */
  text-align: left; /* Align text to the left */
}

.basic-details .inline-item p.detail-info strong {
  margin-right: 10px; /* Space between label and value */
}

.calon-pembimbing {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping to next line */
  margin-bottom: 20px;
}

.calon-pembimbing .inline-item {
  flex: 1;
  margin-right: 20px; /* Space between inline items */
}

.calon-pembimbing .inline-item:last-child {
  margin-right: 0; /* Remove margin from last item */
}

.calon-pembimbing .inline-item p.detail-info {
  margin: 0; /* Remove default margin */
  text-align: left; /* Align text to the left */
}

.calon-pembimbing .inline-item p.detail-info strong {
  margin-right: 10px; /* Space between label and value */
}



.berkas-catatan {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping to next line */
  margin-bottom: 20px;
}
.berkas-catatan a {
  text-decoration: none; /* Remove underline */
  color: #007bff; /* Blue color for the link */
  transition: color 0.3s ease; /* Smooth transition for color change */
}

.berkas-catatan a:hover {
  color: #0056b3; /* Darker blue on hover */
}
.berkas-catatan .inline-item {
  flex: 1;
  margin-right: 20px; /* Space between inline items */
}

.berkas-catatan .inline-item:last-child {
  margin-right: 0; /* Remove margin from last item */
}

.berkas-catatan .inline-item p.detail-info {
  margin: 0; /* Remove default margin */
  text-align: center; /* Align text to the left */

}


.berkas-catatan .inline-item p.detail-info span {
  display: block;
  padding: 10px;
  border: 1px solid #ddd;
  background: white;
  height: 80px;
}


.berkas-catatan .inline-item .detail-info {
  margin: 0; /* Remove default margin */
  text-align: left; /* Align text to the left */
}

.berkas-catatan .inline-item .detail-info strong{
  margin-right: 10px; /* Space between label and value */
}


.berkas-catatan textarea {
  flex: 1; /* Take up available space */
  font-size: 16px; /* Font size */
  height: 80px; /* Increased height for textarea */
  width: 700px;
}

.form-group {
  display: flex;
  align-items: center; /* Align items vertically center */
  margin-bottom: 15px;
}

.form-group select {
  flex: 1; /* Take up available space */
  margin-right: 10px; /* Space between dropdown and buttons */
  font-size: 16px; /* Font size */
  padding: 10px; /* Padding */
  height: 40px; /* Height */
}

.action-buttons {
  display: flex;
  align-items: center; /* Align items vertically center */
}

.simpan-button {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-size: 18px; /* Increased font size */
  text-align: center;
  height: 50px; /* Increased height */
  padding: 15px 25px; /* Increased padding */
  background-color: #007bff; /* Blue background color */
  color: white; /* White text color */
  transition: background-color 0.3s ease; /* Smooth transition for background color */
}

.simpan-button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.container {
  position: relative; /* Make it a positioning context */
  min-height: 100vh; /* Set minimum height to 100% of the viewport height */
}

.back-button {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  padding: 15px 25px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
  margin-bottom: 50px;
  margin-left: 1140px;
}

.back-button:hover {
  background-color: #0056b3;
}

</style>
