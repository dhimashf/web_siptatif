import { createRouter, createWebHistory } from 'vue-router';
import LayoutPage from '@/components/LayoutPage.vue'
import HomePage from '@/components/HomePage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import DosenPembimbing from '@/components/DosenPembimbing.vue';
import KuotaPembimbing from '@/components/KuotaPembimbing.vue';
import DosenPenguji from '@/components/DosenPenguji.vue';
import KuotaPenguji from '@/components/KuotaPenguji.vue';
import FileMahasiswa from '@/components/FileMahasiswa.vue';
import LoginPage from '@/components/LoginPage.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import MahasiswaPage from '@/components/MahasiswaPage.vue';
import RegistrationPage from '@/components/RegistrationPage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
 
  {
    path: '/Forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationPage
  },
  {
    path: '/layout',
    name: 'layout',
    component: LayoutPage,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomePage
      },
      {
        path: '/profile',
        name: 'profile',
        component: ProfilePage 
      },
      {
        path: '/dosen-pembimbing',
        name: 'DosenPembimbing',
        component: DosenPembimbing
      },
      {
        path: '/kuota-pembimbing',
        name: 'KuotaPembimbing',
        component: KuotaPembimbing
      },
      {
        path: '/dosen-penguji',
        name: 'DosenPenguji',
        component: DosenPenguji
      },
      {
        path: '/kuota-penguji',
        name: 'KuotaPenguji',
        component: KuotaPenguji
      },
      {
        path: '/file-mahasiswa',
        name: 'FileMahasiswa',
        component: FileMahasiswa
      },
      {
        path: '/mahasiswa',
        name: 'Mahasiswa',
        component: MahasiswaPage
      },
    ]
  },

  // ... other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
