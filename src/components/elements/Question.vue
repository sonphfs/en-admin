<template>
  <div v-for="question in examination.questions">
    <h5>{{question.no}}. {{ question.content }}</h5>
    <p v-if="question.image" v-if="question.part == 1">
      <img v-bind:src="question.image" alt="img01" title="ENZA.VN" />
    </p>
    <div class="answer">
      <div class="r0">
        <div class="icheckbox_flat-green checked">
          <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />
          <ins class="iCheck-helper"></ins>
        </div>
        <label v-bind:for="question.id+'A'">{{question.answer_A}}</label>
      </div>
      <div class="r0">
        <div class="icheckbox_flat-green">
          <input type="radio" name="correct_answer" class="flat" style="opacity: 0" />

          <ins class="iCheck-helper"></ins>
        </div>
        <label v-bind:for="question.id+'B'">{{question.answer_B}}</label>
      </div>
      <div class="r0">
        <div class="icheckbox_flat-green">
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
</template>

<script>
export default {
    name:"Question",
    props: ['question'],
    data() {
        return {

        }
    },
    created() {

    }
}
</script>