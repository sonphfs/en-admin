<template>
  <div>
    <a class="hiddenanchor" id="signup"></a>
    <a class="hiddenanchor" id="signin"></a>

    <div class="login_wrapper">
      <div class="animate form login_form">
        <section class="login_content">
          <form>
            <h1>Admin Login</h1>
            <div>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                required
                v-model="email"
              />
            </div>
            <div>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required
                v-model="password"
              />
            </div>
            <div>
              <a class="btn btn-default submit" @click="login">Log in</a>
              <a class="reset_pass" href="#">Lost your password?</a>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <p class="change_link">
                Go to site?
                <a href="http://localhost:8081/dashboard" class="to_register">EN-C</a>
              </p>

              <div class="clearfix"></div>
              <br />

              <div>
                <h1>
                  <i class="fa fa-paw"></i> EN-C System
                </h1>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { setToken, getToken } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    return {
      email: "phamhungsonk60@gmail.com",
      password: "admin123",
      token: ""
    };
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password,
        site: "backend"
      };
      request({
        url: "/login",
        method: "post",
        data
      })
        .then(res => {
          console.log(res)
          this.token = res.data.result_data.token;
          setToken(this.token)
          request.defaults.headers.common['Authorization'] = 'Bearer '+ getToken()
          this.$router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
};
</script>