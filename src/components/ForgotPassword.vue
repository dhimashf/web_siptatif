<template>
  <div class="login-container">
    <h1>Lupa Password</h1>
    <h5>Anda Lupa dengan Password Anda?</h5>
    <input type="email" v-model="email" class="email-input" placeholder="Masukkan Email">
    <button @click="sendRecoveryLink" class="forgot-password-link">Kirimkan Link Pemulihan</button>
    <p><router-link to="/" class="back-to-login-link">Login Kembali</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    };
  },
  methods: {
    sendRecoveryLink() {
      // Handle sending recovery link logic here, e.g., send email to the provided email
      console.log('Email:', this.email);
      // Redirect or handle recovery link logic
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

body {
  background-color: #1b1b1b;
  font-family: 'Poppins', sans-serif;
}

.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 100px;
  background-color: #77AB59;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 150px;
}

.login-container h1{
  text-align: center;
  margin-bottom: 20px;
  color: white;
}


.login-container h5 {
  text-align: center;
}

.email-input {

  width: 90%;
  padding: 10px;
  margin: 30px 0 30px 0;

}

.forgot-password-link {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}

.forgot-password-link:hover {
  background-color: #0056b3;
}

.back-to-login-link {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: center;
  text-decoration: none;
}
</style>
