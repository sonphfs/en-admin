<template>
  <div class>
    <Breadcrumb :breads="breads"></Breadcrumb>
    <div class="col-md-9" style="display-inline">
      <h3>Examinations</h3>
    </div>
    <div class="clearfix"></div>
    <div class="row">
      <div class="col-md-9 col-sm-9 col-xs-9">
        <div class="x_panel">
          <div class="card part-1" v-show="step == 1">
            <div class="card-body" style="padding-left: 80px;">
              <h2 style="font-size: 30px">Listening Test</h2>
              <p>In the Listening test, you will be asked to demonstrate how well you understand spoken English. The entire Listening test will last approximately 45 minutes. There are four parts, and directions are given for each part. You must mark your answers on the separate answer sheet. Do not write your answers in your test book.</p>
              <h3>Part 1</h3>
              <p>
                <strong>Directions:</strong> For each question in this part, you will hear four statements about a picture in your test book. When you hear the statements, you must select the one statement that best describes what you see in the picture. Then find the number of the question on your answer sheet and mark your answer. The statements will not be printed in your test book and will be spoken only one time. Look at the example item below.
              </p>
              <p>
                <strong>Example:</strong>
              </p>
              <p>
                <img
                  src="https://enza.com.vn/toeic/image/sample/c-they-re-standing-near-the-table.jpg"
                  alt="Image File"
                  title="ENZA.VN"
                />
              </p>
              <p>Statement (C), "They're standing near the table," is the best description of the picture, so you should select answer (C) and mark it on your answer sheet.</p>
              <hr />
              <hr />
            </div>
          </div>
          <div class="card part-2" v-show="step == 2">
            <div class="card-body" style="padding-left: 80px;">
              <h3>Part 2</h3>
              <p>
                <strong>Directions:</strong> You will hear a question or statement and three responses spoken in English. They will be spoken only one time and will not be printed in your test book. Select the best response to the question or statement and mark the letter (A), (B), or (C) on your answer sheet.
              </p>
              <p>
                <strong>Example</strong>
              </p>
              <p>
                You will hear:
                <strong>What are you doing?</strong>
              </p>
              <p>You will also hear:</p>
              <ul>
                <li>(A) I am doing fine.</li>
                <li>(B) I am looking for something.</li>
                <li>(C) I can't do it.</li>
              </ul>
              <p>The best response to the question "What are you doing?" is choice (B), "I am looking for something," so (B) is the correct answer. You should mark answer (B) on you answer sheet.</p>
              <hr />
              <p></p>
              <hr />
            </div>
          </div>
          <div class="card part-3" v-show="step == 3">
            <div class="card-body" style="padding-left: 80px;">
              <h3>Part 3</h3>
              <p>
                <strong>Directions:</strong> You will hear some conversations between two people. You will be asked to answer three questions about what the speakers say in each conversation. Select the best response to each question. The conversations will be spoken only one time.
              </p>
              <hr />
              <p></p>
              <hr />
            </div>
          </div>
          <div class="card part-4" v-show="step == 4">
            <div class="card-body" style="padding-left: 80px;">
              <h3>Part 4</h3>
              <p>
                <strong>Directions:</strong> You will hear some short talks given by a single speaker. You will be asked to answer three questions about what the speaker says in each short talk. Select the best response to each question. The talks will be spoken only one time.
              </p>
              <hr />
              <p></p>
              <hr />
            </div>
          </div>
          <div class="card part-5" v-show="step == 5">
            <div class="card-body" style="padding-left: 80px;">
              <h3>Part 5</h3>
              <p>
                <strong>Directions:</strong> A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.
              </p>
              <hr />
              <p></p>
              <hr />
            </div>
          </div>
          <div class="card part-6" v-show="step == 6">
            <div class="card-body" style="padding-left: 80px;">
              <h3>Part 6</h3>
              <p>
                <strong>Directions:</strong> A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence. Then mark the letter (A), (B), (C), or (D) on your answer sheet.
              </p>
              <hr />
              <hr />
            </div>
          </div>
          <div class="card part-7" v-show="step == 7">
            <div class="card-body" style="padding-left: 80px;">
              <h3>Part 7</h3>
              <p>
                <strong>Directions:</strong> In this part, you will read a selection of texts, such as magazine and newspaper articles, letters, and advertisements. Each text is followed by several questions. Select the best answer for each question.
              </p>
              <hr />
            </div>
          </div>
          <div class="card button-publish" v-show="step == 7">
            <div class="card-body" style="padding-left: 80px;">
              <button class="btn btn-success">Publish</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-3 grid-margin part-navigation">
        <div class="x_panel">
          <div class="card">
            <div class="card-body d-flex flex-column">
              <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand">
                  <div></div>
                </div>
                <div class="chartjs-size-monitor-shrink">
                  <div></div>
                </div>
              </div>
              <div class="wrapper">
                <h4 class="card-title mb-0">PART</h4>
                <p></p>
                <nav aria-label="...">
                  <ul class="pagination pagination-lg">
                    <li class="page-item">
                      <a @click="changeStep(1)" tabindex="-1" class="page-link">1</a>
                    </li>
                    <li class="page-item">
                      <a @click="changeStep(2)" tabindex="-1" class="page-link">2</a>
                    </li>
                    <li class="page-item">
                      <a @click="changeStep(3)" tabindex="-1" class="page-link">3</a>
                    </li>
                    <li class="page-item">
                      <a @click="changeStep(4)" tabindex="-1" class="page-link">4</a>
                    </li>
                  </ul>
                </nav>
                <nav aria-label="...">
                  <ul class="pagination pagination-lg">
                    <li class="page-item">
                      <a @click="changeStep(5)" tabindex="-1" class="page-link">5</a>
                    </li>
                    <li class="page-item">
                      <a @click="changeStep(6)" tabindex="-1" class="page-link">6</a>
                    </li>
                    <li class="page-item">
                      <a @click="changeStep(7)" tabindex="-1" class="page-link">7</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
export default {
  name: "ExaminationShow",
  data() {
    return {
      step: 1,
      breads: [
        {
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          title: "Examinations management",
          link: "/"
        },
        {
          title: "Show",
          link: "/"
        }
      ]
    };
  },
  components: {
    Breadcrumb
  },
  methods: {
    changeStep(step) {
      this.step = step;
    }
  }
};
</script>