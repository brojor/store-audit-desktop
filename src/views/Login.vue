<template>
  <div class="backdrop">
    <form @submit.prevent="submit">
      <div class="logo">
        <img src="@/assets/h-logo-w.png" alt="" class="logo" />
      </div>
      <label for="username">
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Uživatelské jméno"
          @focus="removeErrorMessage"
          autofocus
          autocomplete="off"
        />
      </label>
      <label for="password">
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Heslo"
          @keyup.enter="submit"
          @focus="removeErrorMessage"
        />
      </label>
      <div class="error-message" v-if="errorMessage">
        <p :class="{ shake: animation }">{{ errorMessage }}</p>
      </div>
      <button type="submit" class="btn submit">Přihlásit se</button>
    </form>
  </div>
</template>

<script>
// import Api from '@/services/Api';

export default {
  name: 'login',

  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      animation: false,
    };
  },
  computed: {
    credentials() {
      return this.username + this.password;
    },
  },
  watch: {
    credentials() {
      this.removeErrorMessage();
    },
  },
  methods: {
    runAnimation() {
      this.animation = true;
      setTimeout(() => {
        this.animation = false;
      }, 750);
    },
    removeErrorMessage() {
      this.errorMessage = '';
    },
    submit() {
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch((err) => {
          const { message } = err.response.data;
          this.errorMessage = message;
          this.runAnimation();
        });
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-main);
  overflow: hidden;
  color: white;
}

form {
  background-color: #001414;
  border-radius: 1rem;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 80%;
  margin: 2rem auto;
}

input {
  height: 6rem;
  border: none;
  /* width: 85%; */
  margin: 1rem 0;
  border-radius: 0.4rem;
}

label {
  width: 85%;
  position: relative;
}

label:before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 30px;
}
label[for='username']:before {
  background: url('../assets/user.svg') center / contain no-repeat;
}
label[for='password']:before {
  background: url('../assets/lock.svg') center / contain no-repeat;
}

input {
  width: 100%;
  padding: 10px 0;
  padding-left: 5rem;
  color: white;
  font-size: 1.6rem;
  box-shadow: none;
  background-color: #262d2d;
}
.submit {
  background-color: #e60001;
  margin: 5rem;
  padding: 0;
  height: 6rem;
  overflow: visible;
  color: white;
  font-size: 2rem;
  font-family: 'Avenir Next', 'Avenir', sans-serif;
  font-weight: 700;
  width: 85%;
}
.error-message {
  /* border: 1px solid yellow; */
  width: 85%;
  text-align: center;
  font-size: 1.4em;
  color: #e60001;
  margin-top: 1rem;
}
.shake {
  animation: shake 0.75s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
