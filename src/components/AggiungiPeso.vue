<template>

  <div class="grid">

    <div class="col-12">

      <div class="card p-fluid">
        <h5>{{ title }}</h5>

        <div class="field">
          <label for="peso">Peso</label>
          <InputNumber id="peso" v-model="selectedPeso" mode="decimal" :minFractionDigits="2" :maxFractionDigits="2"/>
        </div>

        <div class="field">
          <label for="data">Data</label>
          <Calendar id="data" v-model="selectedData" :showButtonBar="true" :touchUI="true" :showIcon="true"
                    dateFormat="dd/mm/yy"/>
        </div>

      </div>

      <div class="field">
        <Button type="button" label="Salva" icon="pi pi-save" @click="submit()"/>
      </div>

    </div>

  </div>

  <Toast position="top-center"/>

</template>

<script>
import useVuelidate from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import voca from 'voca';
import PesiService from '@/service/PesiService';

export default {
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      allId: null,
      dup: null,
      title: "Aggiungi / modifica peso",
      selectedPeso: null,
      selectedData: null,
      pesiService: null
    }
  },
  validations() {
    return {
      selectedPeso: {required},
      selectedData: {required}
    }
  },
  created() {
    this.pesiService = new PesiService();

    this.allId = this.$route.params.id;
    this.dup = this.$route.params.dup;

    // if (!voca.isEmpty(this.allId)) {}

    if (!voca.isEmpty(this.dup)) {
      this.allId = '';
    }
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();

      if (!result) {
        this.$toast.add({
          severity: 'error',
          summary: 'Peso e data sono obbligatori!',
          life: 3000
        });

      } else {

        const dd = new Date(this.selectedData);
        let data = {
          'peso': this.selectedPeso,
          'data': dd.getFullYear() + '-' + (dd.getMonth() + 1) + '-' + dd.getDate()
        };

        if (voca.isEmpty(this.allId)) {

          this.pesiService.add(data)
              .then(res => {
                if (res.res === 'ok') {
                  location.href = '/sport/pesi';
                } else {
                  this.$toast.add({
                    severity: 'error',
                    summary: res.message,
                    life: 3000
                  });
                }
              });

        } else {
          data.id = this.allId;

          // this.allService.upAllenamento(data)
          //     .then(res => {
          //       if (res.res === 'ok') {
          //         location.href = '/sport/pesi';
          //       } else {
          //         this.$toast.add({
          //           severity: 'error',
          //           summary: res.message,
          //           life: 3000
          //         });
          //       }
          //     });

        }

        // console.log(data);

      }
    }
  }
}
</script>
