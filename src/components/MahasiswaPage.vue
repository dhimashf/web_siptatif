<template>
  <div>
    <h2>Data Mahasiswa</h2>

    <!-- Modal for Tambah Data Mahasiswa -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <h3>Tambah Data Mahasiswa</h3>
        <form id="formTambahDataModal" class="form-container">
          <div class="form-group">
            <input type="text" v-model="inputTanggal" placeholder="Tanggal">
          </div>
          <div class="form-group">
            <input type="text" v-model="inputNama" placeholder="Nama">
          </div>
          <div class="form-group">
            <input type="text" v-model="inputNIM" placeholder="NIM">
          </div>
          <div class="form-group">
            <input type="text" v-model="inputEmail" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="text" v-model="inputJudul" placeholder="Judul">
          </div>
          <div class="form-group">
  <label for="calonPembimbing1">Calon Pembimbing 1:</label>
  <select v-model="inputCalonPembimbing1" id="calonPembimbing1">
  <option v-for="dosen in availableDosenList1" :key="dosen.nidn" :value="dosen.nama">{{ dosen.nama }}</option>
</select>
</div>
<div class="form-group">
  <label for="calonPembimbing2">Calon Pembimbing 2:</label>
  <select v-model="inputCalonPembimbing2" id="calonPembimbing2">
  <option v-for="dosen in availableDosenList2" :key="dosen.nidn" :value="dosen.nama">{{ dosen.nama }}</option>
</select>
</div>
          <div class="form-group">
            <input type="file" @change="onFileChange" placeholder="Berkas">
          </div>
          <div class="form-group">
            <select id="kategoriTA" v-model="inputKategoriTA">
              <option value="Penelitian">Penelitian</option>
              <option value="Proyek Desain">Proyek Desain</option>
              <option value="Pengembangan Produk">Pengembangan Produk</option>
            </select>
          </div>
          <div class="form-group">
            <button class="btttn tambah-button" @click="tambahData">Tambah Data Mahasiswa</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Button to open modal -->
    <button class="btttn tambah-button" @click="openModal">
      <i class="pi pi-plus-circle icon"></i> Data Mahasiswa
    </button>

    <!-- Table to display mahasiswa data -->
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tanggal</th>
          <th>Nama</th>
          <th>NIM</th>
          <th>Email</th>
          <th>Judul</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mahasiswa, index) in mahasiswaList" :key="index">
          <td>{{ mahasiswa.no }}</td>
          <td>{{ mahasiswa.tanggal }}</td>
          <td>{{ mahasiswa.nama }}</td>
          <td>{{ mahasiswa.nim }}</td>
          <td>{{ mahasiswa.email }}</td>
          <td>{{ mahasiswa.judul }}</td>
          <td>{{ mahasiswa.status }}</td>
          <td>
            <button class="btttn tombol-detail" @click="showDetail">Detail</button>
            <button class="btttn tombol-delete" @click="() => confirmDelete(index)">Hapus</button>
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
      inputNo:'',
      inputTanggal: '',
      inputNama: '',
      inputNIM: '',
      inputEmail: '',
      inputJudul: '',
      inputCalonPembimbing1: '',
      inputCalonPembimbing2: '',
      inputBerkas: null,
      inputCatatan: '',
      inputStatus: 'menunggu',
      inputKategoriTA: '',
      mahasiswaList: JSON.parse(localStorage.getItem('mahasiswaList')) || [],
      dosenList: JSON.parse(localStorage.getItem('dosenList')) || []
    };
  },
  computed: {
    availableDosenList1() {
      return this.dosenList.filter(dosen => dosen.nama !== this.inputCalonPembimbing2);
    },
    availableDosenList2() {
      return this.dosenList.filter(dosen => dosen.nama !== this.inputCalonPembimbing1);
    }
  },
  watch: {
    mahasiswaList: {
      handler(newVal) {
        localStorage.setItem('mahasiswaList', JSON.stringify(newVal));
      },
      deep: true
    },
    dosenList: {
      handler(newVal) {
        localStorage.setItem('dosenList', JSON.stringify(newVal));
      },
      deep: true
    }
  },
  methods: {
    showDetail() {
      this.$router.push({ name: 'FileMahasiswa', params: { kategoriTA: this.inputKategoriTA } });
    },
    confirmDelete(index) {
      if (confirm("Apakah Anda yakin ingin menghapus data mahasiswa ini?")) {
        this.mahasiswaList.splice(index, 1);
        this.updateNoValues();
      } else {
        console.log("Penghapusan data dibatalkan");
      }
    },
    onFileChange(event) {
      this.inputBerkas = event.target.files[0];
    },
    tambahData() {
      let newMahasiswa = {
        tanggal: this.inputTanggal,
        nama: this.inputNama,
        nim: this.inputNIM,
        email: this.inputEmail,
        judul: this.inputJudul,
        calonPembimbing1: this.inputCalonPembimbing1,
        calonPembimbing2: this.inputCalonPembimbing2,
        berkas: this.inputBerkas ? this.inputBerkas.name : null,
        catatan: this.inputCatatan,
        status: 'menunggu',
        kategoriTA: this.inputKategoriTA
      };

      this.mahasiswaList.push(newMahasiswa);
      this.updateNoValues();
      this.clearInputFields();
      this.closeModal();
    },
    updateNoValues() {
      this.mahasiswaList.forEach((mahasiswa, index) => {
        mahasiswa.no = index + 1;
      });
    },
    clearInputFields() {
      this.inputTanggal = '';
      this.inputNama = '';
      this.inputNIM = '';
      this.inputEmail = '';
      this.inputJudul = '';
      this.inputCalonPembimbing1 = '';
      this.inputCalonPembimbing2 = '';
      this.inputBerkas = null;
      this.inputCatatan = '';
      this.inputKategoriTA = '';
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  mounted() {
    // Parse and set initial values
    if (!localStorage.getItem('mahasiswaList')) {
      localStorage.setItem('mahasiswaList', JSON.stringify(this.mahasiswaList));
    } else {
      this.mahasiswaList = JSON.parse(localStorage.getItem('mahasiswaList'));
    }

    if (!localStorage.getItem('dosenList')) {
      localStorage.setItem('dosenList', JSON.stringify(this.dosenList));
    } else {
      this.dosenList = JSON.parse(localStorage.getItem('dosenList'));
    }
  }
}
</script>


<style scoped>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

h2 {
  margin-top: 20px;
  margin-left: 20px;
}

table {
  width: 96.5%;
  max-width: 2000px;
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

.tombol-detail {
  background-color: #2196F3;
  color: white;
}

.tombol-delete {
  background-color: #f44336;
  color: white;
}

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

.modal-content h3 {
  margin-bottom: 20px;
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

#kategoriTA {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

table tbody tr td:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
