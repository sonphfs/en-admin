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
              <div v-for="question in examination.questions" v-if="question.part == 1 && question.no == 0">
                <p>
                <strong>Example:</strong>
              </p>
              <p>
                <img
                  :src="serverUrl + question.image"
                  alt="Example"
                  width="300px" height="300px"
                />
              </p>
              <p>Statement (C), "They're standing near the table," is the best description of the picture, so you should select answer (C) and mark it on your answer sheet.</p>
              <hr />
              </div>
              <div v-for="question in examination.questions" v-if="question.part == 1 && question.no != 0">
                <h5>{{question.no}}. {{ question.content }}</h5>
                <p v-if="question.image">
                  <img v-bind:src="serverUrl+question.image" alt="img01" width="300px" height="300px"/>
                </p>
                <div class="answer">
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('A', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'A'">{{question.answer_A}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('B', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'B'">{{question.answer_B}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('c', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'C'">{{question.answer_C}}</label>
                  </div>
                  <div class="r0">
                    <div class="icheckbox_flat-green">
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'D'">{{question.answer_D}}</label>
                  </div>
                </div>
                <br />
              </div>
              <hr />
            </div>
          </div>
          <div class="card part-2" v-show="step == 2">
            <div class="card-body" style="padding-left: 80px;">
              <h3>Part 2</h3>
              <p>
                <strong>Directions:</strong> You will hear a question or statement and three responses spoken in English. They will be spoken only one time and will not be printed in your test book. Select the best response to the question or statement and mark the letter (A), (B), or (C) on your answer sheet.
              </p>
              <div v-for="question in examination.questions" v-if="question.part == 2 && question.no == 0">
                <p>
                <strong>Example</strong>
              </p>
              <p>
                You will hear:
                <strong>{{question.content}}</strong>
              </p>
              <p>You will also hear:</p>
              <ul>
                <li>(A) {{question.answer_A}}</li>
                <li>(B) {{question.answer_B}}</li>
                <li>(C) {{question.answer_C}}</li>
              </ul>
              <p>The best response to the question "{{question.content}}" is choice ({{question.correct_answer}}), "I am looking for something," so ({{question.correct_answer}}) is the correct answer. You should mark answer ({{question.correct_answer}}) on you answer sheet.</p>
              <hr />
              </div>
              <p></p>
              <div v-for="question in examination.questions" v-if="question.part == 2 && question.no != 0">
                <h5>{{question.no}}. {{ question.content }}</h5>
                <div class="answer">
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('A', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'A'">{{ question.answer_A}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('B', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'B'">{{question.answer_B}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('C', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'C'">{{question.answer_C}}</label>
                  </div>
                </div>
                <p></p>
              </div>
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
              <div v-for="question in examination.questions" v-if="question.part == 3">
                <h5>{{question.no}}. {{question.content}}</h5>
                <div class="answer">
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('A', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'A'">{{question.answer_A}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('B', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'B'">{{question.answer_B}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('C', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'C'">{{question.answer_C}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('D', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'D'">{{question.answer_D}}</label>
                  </div>
                </div>
                <p></p>
              </div>
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
              <div v-for="question in examination.questions" v-if="question.part == 4">
                <h5>{{question.no}}. {{question.content}}</h5>
                <div class="answer">
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('A', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'A'">{{question.answer_A}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('B', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'B'">{{question.answer_B}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('C', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'C'">{{question.answer_C}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('D', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'D'">{{question.answer_D}}</label>
                  </div>
                </div>
                <p></p>
              </div>
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
              <div v-for="question in examination.questions" v-if="question.part == 5">
                <h5>{{question.no}}. {{question.content}}</h5>
                <div class="answer">
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('A', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'A'">{{question.answer_A}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('B', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'B'">{{question.answer_B}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('C', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'C'">{{question.answer_C}}</label>
                  </div>
                  <div class="r0">
                    <div
                      class="icheckbox_flat-green"
                      :class="getCheckedClass('D', question.correct_answer)"
                    >
                      <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                      <ins class="iCheck-helper"></ins>
                    </div>
                    <label v-bind:for="question.id+'D'">{{question.answer_D}}</label>
                  </div>
                </div>
                <p></p>
              </div>
            </div>
          </div>
          <div class="card part-6" v-show="step == 6">
            <div class="card-body" style="padding-left: 80px;">
              <h3>Part 6</h3>
              <p>
                <strong>Directions:</strong> A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence. Then mark the letter (A), (B), (C), or (D) on your answer sheet.
              </p>
              <hr />
              <div v-for="question in examination.questions" v-if="question.part == 6">
                <div class="paragraph" v-if="question.paragraph">
                  <pre><strong>{{question.content}}</strong></pre>
                  <p v-html="question.paragraph"></p>
                </div>
                <div class="content" v-if="!question.paragraph">
                  <h5>{{question.no}}. {{question.content}}</h5>
                  <div class="answer">
                    <div class="r0">
                      <div
                        class="icheckbox_flat-green"
                        :class="getCheckedClass('A', question.correct_answer)"
                      >
                        <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                        <ins class="iCheck-helper"></ins>
                      </div>
                      <label v-bind:for="question.id+'A'">{{question.answer_A}}</label>
                    </div>
                    <div class="r0">
                      <div
                        class="icheckbox_flat-green"
                        :class="getCheckedClass('B', question.correct_answer)"
                      >
                        <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                        <ins class="iCheck-helper"></ins>
                      </div>
                      <label v-bind:for="question.id+'B'">{{question.answer_B}}</label>
                    </div>
                    <div class="r0">
                      <div
                        class="icheckbox_flat-green"
                        :class="getCheckedClass('C', question.correct_answer)"
                      >
                        <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                        <ins class="iCheck-helper"></ins>
                      </div>
                      <label v-bind:for="question.id+'C'">{{question.answer_C}}</label>
                    </div>
                    <div class="r0">
                      <div
                        class="icheckbox_flat-green"
                        :class="getCheckedClass('D', question.correct_answer)"
                      >
                        <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                        <ins class="iCheck-helper"></ins>
                      </div>
                      <label v-bind:for="question.id+'D'">{{question.answer_D}}</label>
                    </div>
                  </div>
                </div>

                <p></p>
              </div>
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
              <div v-for="question in examination.questions" v-if="question.part == 7">
                <div class="paragraph" v-if="question.paragraph">
                  <pre><strong>Questions 153-154 refer to the following e-mail.</strong></pre>
                  <p>
                    To: All families in our community
                    <br />From: The San Jose Museum of Art
                  </p>
                  <p>It's my pleasure to notify you that we are having our December Kids Art Sunday on December 11, 2007. With the objective of making the artwork on view accessible to young audiences, the Museum's Education Department will present a stimulating range of hands-on art workshops. A speech by the curator Benito Juarez, gallery tours and other activities related to the current exhibitions will be also available to the visitors. There is no admission charge, and no reservations are required. However, you need to be at the Museum no later than 3 P.M. if you do not want to miss a single event.</p>
                  <p>If you are interested in a setting with more one-on-one attention, join us for the members only portion of Kids Art Sunday, Side by Side. It takes place in the SJ annex and includes a gallery discussion and structured hands-on art activities. Pre-registration is required for Side by Side and only one child is allowed per adult. To register or become a member, please call (408) 555-6867.</p>
                  <hr />
                  <p></p>
                </div>

                <div class="content" v-if="!question.paragraph">
                  <h5>{{question.no}}. {{question.content}}</h5>

                  <div class="answer">
                    <div class="r0">
                      <div
                        class="icheckbox_flat-green"
                        :class="getCheckedClass('A', question.correct_answer)"
                      >
                        <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
                        <ins class="iCheck-helper"></ins>
                      </div>
                      <label v-bind:for="question.id+'A'">{{question.answer_A}}</label>
                    </div>
                    <div class="r0">
                      <div
                        class="icheckbox_flat-green"
                        :class="getCheckedClass('B', question.correct_answer)"
                      >
                        <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                        <ins class="iCheck-helper"></ins>
                      </div>
                      <label v-bind:for="question.id+'B'">{{question.answer_B}}</label>
                    </div>
                    <div class="r0">
                      <div
                        class="icheckbox_flat-green"
                        :class="getCheckedClass('C', question.correct_answer)"
                      >
                        <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                        <ins class="iCheck-helper"></ins>
                      </div>
                      <label v-bind:for="question.id+'C'">{{question.answer_C}}</label>
                    </div>
                    <div class="r0">
                      <div
                        class="icheckbox_flat-green"
                        :class="getCheckedClass('D', question.correct_answer)"
                      >
                        <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

                        <ins class="iCheck-helper"></ins>
                      </div>
                      <label v-bind:for="question.id+'D'">{{question.answer_D}}</label>
                    </div>
                  </div>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="btn-toolbar" style="float: right;">
              <div class="btn-group">
                <button
                  class="btn btn-info"
                  :class="{ active: isCurrentStep(1) }"
                  type="button"
                  @click="changeStep(1)"
                >1</button>
                <button
                  class="btn btn-info"
                  :class="{ active: isCurrentStep(2) }"
                  type="button"
                  @click="changeStep(2)"
                >2</button>
                <button
                  class="btn btn-info"
                  :class="{ active: isCurrentStep(3) }"
                  type="button"
                  @click="changeStep(3)"
                >3</button>
                <button
                  class="btn btn-info"
                  :class="{ active: isCurrentStep(4) }"
                  type="button"
                  @click="changeStep(4)"
                >4</button>
                <button
                  class="btn btn-info"
                  :class="{ active: isCurrentStep(5) }"
                  type="button"
                  @click="changeStep(5)"
                >5</button>
                <button
                  class="btn btn-info"
                  :class="{ active: isCurrentStep(6) }"
                  type="button"
                  @click="changeStep(6)"
                >6</button>
                <button
                  class="btn btn-info"
                  :class="{ active: isCurrentStep(7) }"
                  type="button"
                  @click="changeStep(7)"
                >7</button>
              </div>
            </div>
          </div>
          <div class="card button-publish">
            <div class="card-body" style="padding-left: 80px;">
              <button
                class="btn btn-success"
                @click="updateStatus(1)"
                v-if="examination.status == 0"
              >Publish</button>
              <button
                class="btn btn-danger"
                @click="updateStatus(0)"
                v-if="examination.status == 1"
              >UnActive</button>
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
      ],
      examination: {},
      status: {
        0: "unActice",
        1: "Active"
      },
      serverUrl: process.env.VUE_APP_BASE_SERVER_URL
    };
  },
  components: {
    Breadcrumb
  },
  methods: {
    changeStep(step) {
      this.step = step;
    },
    isCurrentStep(step) {
      return step == this.step;
    },
    updateStatus(status) {
      let flag = confirm(" Are you sure change status examination!");
      if (flag == true) {
        this.update(status);
      }
    },
    update(status) {
      let data = {
        status: status
      };
      request({
        url: "backend/examinations/publish/" + this.$route.params.code,
        method: "post",
        data
      })
        .then(res => {
          console.log(res);
          let data = res.data.result_data;
          if (data.updated == true) {
            if (data.status == 1) {
              alert("Examination has been actived!");
            } else {
              alert("Examination has been unactived!");
            }
          }
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    getCheckedClass(answer, correctAnswer) {
      return {
        checked: answer == correctAnswer
      };
    }
  },
  created() {
    request({
      url: "backend/examinations/show/" + this.$route.params.code,
      method: "get"
    }).then(res => {
      this.examination = res.data.result_data;
    });
  }
};
</script>
<style>
div.answer label {
  margin-left: 10px;
}
</style>