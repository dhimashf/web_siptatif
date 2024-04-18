<template>
  <div>
    <h2>Data Dosen Pembimbing</h2>

    <!-- Modal for Tambah Data Dosen Pembimbing -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <h3>{{ editingIndex === null ? 'Tambah' : 'Edit' }} Data Dosen Pembimbing</h3>
        <form id="formTambahDosenModal" @submit.prevent="submitForm" class="form-container">
          <div class="form-group">
            <input type="text" v-model="inputNama" placeholder="Nama Dosen">
          </div>
          <div class="form-group">
            <input type="text" v-model="inputNIDN" placeholder="NIDN">
          </div>
          <div class="form-group">
            <select v-model="inputJenisKelamin">
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div class="form-group">
            <input type="text" v-model="inputKeahlian" placeholder="Keahlian">
          </div>
          <div class="form-group">
            <input type="text" v-model="inputKuota" placeholder="Kuota">
          </div>
          <div class="form-group">
            <button type="submit" class="btttn tambah-button">
              {{ editingIndex === null ? 'Tambah' : 'Update' }} Data Dosen
            </button>
          </div>
        </form>
      </div>
    </div>

    <button class="btttn tambah-button" @click="openModal">
      <i class="pi pi-plus-circle icon"></i> Data Dosen
    </button>

    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Dosen</th>
          <th>NIDN</th>
          <th>Jenis Kelamin</th>
          <th>Keahlian</th>
          <th>Kuota</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dosen, index) in dosenList" :key="index">
          <td>{{ dosen.no }}</td>
          <td>{{ dosen.nama }}</td>
          <td>{{ dosen.nidn }}</td>
          <td>{{ dosen.jenisKelamin }}</td>
          <td>{{ dosen.keahlian }}</td>
          <td>{{ dosen.kuota }}</td>
          <td>
            <button class="btttn tombol-edit" @click="editDosen(index)">Edit</button>
            <button class="btttn tombol-delete" @click="() => confirmDelete(index)">Hapus</button>
            <button class="btttn tombol-detail" @click="showDetail">Detail</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: false,
      editingIndex: null,
      inputNo: '',
      inputNama: '',
      inputNIDN: '',
      inputJenisKelamin: 'Laki-laki',
      inputKeahlian: '',
      inputKuota: '',
      dosenList: JSON.parse(localStorage.getItem('dosenList')) || []
    };
  },
  watch: {
    dosenList: {
      handler() {
        this.updateDosenList();
      },
      deep: true
    }
  },
  methods: {
    showDetail() {
      // Navigating to LihatDosen component
      this.$router.push({ name: 'KuotaPembimbing' });
    },
    confirmDelete(index) {
      if (confirm("Apakah Anda yakin ingin menghapus data dosen ini?")) {
        this.dosenList.splice(index, 1);
        console.log("Data dosen dihapus");
        
        // Update No values after deleting a record
        this.updateNoValues();
      } else {
        console.log("Penghapusan data dibatalkan");
      }
    },
    updateNoValues() {
      // Regenerate No values based on the current order
      this.dosenList.forEach((dosen, index) => {
        dosen.no = index + 1;
      });
    },
    submitForm() {
      if (this.editingIndex === null) {
        this.tambahData();
      } else {
        this.updateData();
      }
    },
    tambahData() {
      // Automatically generate No based on the length of dosenList + 1
      const no = this.dosenList.length + 1;

      this.dosenList.push({
        no: no,
        nama: this.inputNama,
        nidn: this.inputNIDN,
        jenisKelamin: this.inputJenisKelamin,
        keahlian: this.inputKeahlian,
        kuota: this.inputKuota
      });

      this.resetForm();
      this.closeModal();
    },
    updateData() {
      this.dosenList[this.editingIndex] = {
        no: this.dosenList[this.editingIndex].no, // Keep the existing No value
        nama: this.inputNama,
        nidn: this.inputNIDN,
        jenisKelamin: this.inputJenisKelamin,
        keahlian: this.inputKeahlian,
        kuota: this.inputKuota
      };

      this.resetForm();
      this.closeModal();
    },
    editDosen(index) {
      this.editingIndex = index;
      const dosen = this.dosenList[index];
      this.inputNama = dosen.nama;
      this.inputNIDN = dosen.nidn;
      this.inputJenisKelamin = dosen.jenisKelamin;
      this.inputKeahlian = dosen.keahlian;
      this.inputKuota = dosen.kuota;
      
      this.openModal();
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editingIndex = null;
    },
    resetForm() {
      this.inputNama = '';
      this.inputNIDN = '';
      this.inputJenisKelamin = 'Laki-laki';
      this.inputKeahlian = '';
      this.inputKuota = '';
    },
    updateDosenList() {
      localStorage.setItem('dosenList', JSON.stringify(this.dosenList));
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

h2 {
  margin-top: 20px;
  margin-left: 20px;
}

table {
  width: 96.5%;
  max-width: 1500px;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

.btttn {
  padding: 8px 12px;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
}

.tambah-button {
  background-color: #36802D;
  color: white;
  float: left;
  margin-bottom: 20px;
  margin-top: 10px;
}

.icon {
  margin-right: 5px;
  font-size: 14px;
  color: white;
}

.tombol-edit {
  background-color: #FFC107;
  color: white;
}

.tombol-detail {
  background-color: #2196F3;
  color: white;
}

.tombol-delete {
  background-color: #f44336;
  color: white;
}

/* Modal Styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal-content {
  position: relative;
  padding: 20px;
  background-color: #fefefe;
  border-radius: 5px;
  width: 60%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  margin-bottom: 7px;
}

#formTambahDosenModal input,
#formTambahDosenModal select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-container > .form-group:last-child {
  margin-bottom: 0;
}

table tbody tr td:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tombol-edit,
.tombol-detail,
.tombol-delete {
  margin: 0 5px;
}
</style>
